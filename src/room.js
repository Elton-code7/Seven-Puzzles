import { decideRound } from '../public/competition-rules.js';
import { buildQuestions, QUESTION_BANK, shuffle, individualCapacity } from '../public/questions.js';

const TEAMS = [
  { id: 'and', name: 'Team AND', color: '#22d3ee' }, { id: 'or', name: 'Team OR', color: '#a78bfa' },
  { id: 'xor', name: 'Team XOR', color: '#f472b6' }, { id: 'nand', name: 'Team NAND', color: '#fbbf24' },
  { id: 'nor', name: 'Team NOR', color: '#34d399' }, { id: 'not', name: 'Team NOT', color: '#fb7185' },
  { id: 'xnor', name: 'Team XNOR', color: '#60a5fa' }, { id: 'buf', name: 'Team BUFFER', color: '#a3e635' },
  { id: 'mux', name: 'Team MUX', color: '#fb923c' }, { id: 'latch', name: 'Team LATCH', color: '#e2e8f0' }
];
import { PLAN_MAIN, PLAN_FINAL, MODES, speedBonus } from '../public/rules.js';
const DEFAULTS = { numTeams: 6, min: 1, max: 5, mode: 'groups', locked: false };
const REVEAL_OK = 4500, REVEAL_MISS = 7500, BETWEEN = 5000;

const norm = c => String(c || '').trim().toUpperCase();
const team = id => TEAMS.find(t => t.id === id);
const json = o => new Response(JSON.stringify(o), { headers: { 'content-type': 'application/json' } });
const rid = () => [...crypto.getRandomValues(new Uint8Array(8))].map(b => b.toString(16).padStart(2, '0')).join('');
const questionTime = () => 90000;

/* A sala usa um Durable Object e mantém uma linha do tempo independente para cada jogador.
   O estado serializável também é gravado no armazenamento do Durable Object para sobreviver
   à recriação da instância; os timers são rearmados a partir dos prazos salvos. */
export class Room {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env; this.r = null; this.socks = new Map();
    this.initHandlers();
  }

  blank(code) {
    return {
      code, config: { ...DEFAULTS }, admin: null, phase: 'lobby', stage: 'main',
      players: new Map(), plan: [], scores: new Map(), contest: null,
      between: null, betweenUntil: 0, betweenTimer: null, result: null,
      pausedFrom: null, pausedAt: 0, betweenRemaining: 0, history: {}, round: 0, rounds: []
    };
  }

  async ensure(code) {
    if (this.r) return true;
    if (!(await this.ctx.storage.get('init'))) return false;
    const saved = await this.ctx.storage.get('state');
    this.r = saved ? this.restore(saved) : this.blank(code);
    this.armRestoredTimers();
    return true;
  }

  restore(saved) {
    const r = { history: {}, round: 0, rounds: [], ...saved, config: { ...DEFAULTS, ...saved.config }, players: new Map(saved.players || []), scores: new Map(saved.scores || []), admin: null };
    if (saved.contest) {
      r.contest = {
        ...saved.contest,
        pids: new Set(saved.contest.pids || []),
        qs: new Map(saved.contest.qs || []),
        states: new Map(saved.contest.states || []),
        timers: new Map()
      };
    } else r.contest = null;
    for (const p of r.players.values()) p.sid = null;
    return r;
  }

  serializable() {
    const r = this.r;
    if (!r) return null;
    const contest = r.contest ? {
      stage: r.contest.stage, plan: [...r.contest.plan], pids: [...r.contest.pids], qs: [...r.contest.qs], states: [...r.contest.states]
    } : null;
    const players = [...r.players].map(([id, p]) => { const { dc, ...safe } = p; return [id, { ...safe, sid: null }]; });
    return { ...r, admin: null, players, scores: [...r.scores], contest, betweenTimer: null };
  }

  async persist() {
    if (!this.r || this.closed) return;
    try { await this.ctx.storage.put('state', this.serializable()); } catch (e) { console.error('Falha ao persistir a sala:', e); }
  }

  armRestoredTimers() {
    const r = this.r;
    if (r.phase === 'question' && r.contest) {
      for (const [pid, st] of r.contest.states) {
        if (st.status === 'question' || st.status === 'reveal') this.schedulePlayer(pid);
      }
    } else if (r.phase === 'between' && r.between?.kind === 'tie') {
      this.scheduleBetween(Math.max(0, r.betweenUntil - Date.now()));
    } else if (r.phase === 'paused' && r.contest) {
      // A pausa é persistida sem consumir tempo. Os prazos continuam congelados.
    }
  }

  async fetch(req) {
    const url = new URL(req.url), code = norm(url.searchParams.get('room') || url.searchParams.get('code'));
    if (this.closed || await this.ctx.storage.get('closed')) {
      this.closed = true;
      if (req.headers.get('Upgrade') === 'websocket') {
        const [client, server] = Object.values(new WebSocketPair()); server.accept();
        server.send(JSON.stringify({ e: 'room:closed', a: [{ message: 'Esta sala foi encerrada pelo administrador.' }] }));
        server.close(1000, 'Sala encerrada');
        return new Response(null, { status: 101, webSocket: client });
      }
      if (url.pathname === '/check') return json({ ok: false, error: 'Esta sala foi encerrada pelo administrador.' });
      return new Response('Sala encerrada', { status: url.pathname === '/init' ? 409 : 410 });
    }
    if (url.pathname === '/init') {
      if (await this.ctx.storage.get('init')) return new Response('exists', { status: 409 });
      await this.ctx.storage.put('init', Date.now());
      await this.ctx.storage.setAlarm(Date.now() + 8 * 3600e3);
      this.r = this.blank(code); await this.persist();
      return new Response('ok');
    }
    if (!(await this.ensure(code))) return url.pathname === '/check' ? json({ ok: false, error: 'Sala não encontrada. Confira o código.' }) : new Response('not found', { status: 404 });
    if (url.pathname === '/check') return json(this.check());
    if (req.headers.get('Upgrade') === 'websocket') {
      const [client, server] = Object.values(new WebSocketPair()); server.accept();
      const s = { id: crypto.randomUUID(), ws: server, data: {} }; this.socks.set(s.id, s);
      server.addEventListener('message', ev => this.onMessage(s, ev));
      server.addEventListener('close', () => this.onClose(s));
      server.addEventListener('error', () => this.onClose(s));
      return new Response(null, { status: 101, webSocket: client });
    }
    return new Response('not found', { status: 404 });
  }

  async alarm() {
    if (this.closed || await this.ctx.storage.get('closed')) return;
    if (this.r?.contest) for (const timer of this.r.contest.timers.values()) clearTimeout(timer);
    if (this.r?.betweenTimer) clearTimeout(this.r.betweenTimer);
    for (const s of this.socks.values()) try { s.ws.close(1000, 'sala encerrada'); } catch (e) { }
    this.socks.clear(); this.r = null; await this.ctx.storage.deleteAll();
  }

  /* ---------- mensagens ---------- */
  send(id, ev, data) {
    const s = this.socks.get(id);
    if (s) try { s.ws.send(JSON.stringify({ e: ev, a: [data] })); } catch (e) { }
  }
  toPlayers(ev, data) { for (const p of this.r.players.values()) if (p.sid) this.send(p.sid, ev, data); }

  async onMessage(s, ev) {
    let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
    if (!m || typeof m !== 'object' || !Object.hasOwn(this.H, m.e) || !this.r || this.closed) return;
    const h = this.H[m.e];
    const cb = m.id ? res => { try { s.ws.send(JSON.stringify({ r: m.id, d: res })); } catch (e) { } } : () => { };
    try { await h(s, Array.isArray(m.a) ? m.a[0] : undefined, cb); }
    catch (e) { console.error(e); cb({ ok: false, error: 'Ocorreu um erro interno ao processar a ação.' }); }
    await this.persist();
  }

  onClose(s) {
    if (!this.socks.delete(s.id) || !this.r) return;
    // A data de compatibilidade desta aplicação exige a resposta explícita ao Close.
    // Sem ela, o navegador pode ficar em CLOSING e atrasar a reconexão.
    try { s.ws.close(1000, 'Conexão encerrada'); } catch (e) { }
    const r = this.r, p = r.players.get(s.data.pid);
    if (p && p.sid === s.id) {
      p.sid = null;
      if (r.phase === 'lobby') {
        p.dc = setTimeout(() => {
          if (!p.sid && r.phase === 'lobby' && r.players.has(p.pid)) { r.players.delete(p.pid); this.broadcastLobby(); void this.persist(); }
        }, 20000);
        this.broadcastLobby();
      } else this.pushAdmin();
    }
    if (r.admin === s.id) r.admin = null;
    void this.persist();
  }

  /* ---------- estado e rankings ---------- */
  active() { return TEAMS.slice(0, this.r.config.numTeams); }
  members(id) { return [...this.r.players.values()].filter(p => p.team === id); }
  lobbyState() {
    return {
      phase: this.r.phase, config: { ...this.r.config, maxIndividual: individualCapacity(PLAN_MAIN) },
      players: [...this.r.players.values()].map(p => ({ pid: p.pid, name: p.name, online: !!p.sid })),
      teams: this.active().map(t => ({ ...t, members: this.members(t.id).map(p => ({ pid: p.pid, name: p.name, online: !!p.sid })) }))
    };
  }
  check() {
    if (this.r.phase !== 'lobby') return { ok: false, error: 'Essa partida já começou.' };
    if (this.r.config.locked) return { ok: false, error: 'As inscrições desta sala estão fechadas.' };
    const l = this.lobbyState(); return { ok: true, code: this.r.code, teams: l.teams, config: l.config };
  }
  startCheck() {
    if (this.r.config.mode === 'individual') {
      if (this.r.players.size < 2) return 'São necessários pelo menos 2 participantes.';
      return this.capacityError([...this.r.players.keys()], PLAN_MAIN, true);
    }
    const { min } = this.r.config, used = this.active().filter(t => this.members(t.id).length > 0);
    const small = used.filter(t => this.members(t.id).length < min);
    if (small.length) return `${small.map(t => t.name).join(', ')} ${small.length > 1 ? 'têm' : 'tem'} menos de ${min} ${min === 1 ? 'integrante' : 'integrantes'}.`;
    if (used.length < 2) return 'São necessárias pelo menos 2 equipes com jogadores.';
    return null;
  }

  teamRank() {
    const m = new Map();
    for (const [pid, s] of this.r.scores) {
      const p = this.r.players.get(pid); if (!p) continue;
      const base = team(p.team); if (!base) continue;
      const t = m.get(p.team) || { ...base, pts: 0, ok: 0, n: 0, ms: 0 };
      t.pts += s.pts; t.ok += s.ok; t.n++; t.ms += s.ms; m.set(p.team, t);
    }
    return [...m.values()].sort((a, b) => b.pts - a.pts || b.ok - a.ok || a.ms - b.ms);
  }
  playerRank() {
    return [...this.r.scores].map(([pid, s]) => {
      const p = this.r.players.get(pid); if (!p) return null;
      const t = team(p.team);
      return { pid, name: p.name, team: p.team, color: t?.color || '#929bc8', pts: s.pts, ok: s.ok, ms: s.ms };
    }).filter(Boolean).sort((a, b) => b.pts - a.pts || b.ok - a.ok || a.ms - b.ms);
  }
  publicRanking() { return (this.r.stage === 'final' || this.r.config.mode === 'individual') ? { kind: 'players', list: this.playerRank() } : { kind: 'teams', list: this.teamRank() }; }

  participantDetails() {
    const r = this.r, c = r.contest;
    return [...r.players.values()].map(p => {
      const st = c?.states.get(p.pid), score = r.scores.get(p.pid);
      const status = !c || !c.pids.has(p.pid) ? (r.phase === 'lobby' ? 'Na sala' : 'Espectador')
        : st?.status === 'question' ? 'Respondendo' : st?.status === 'reveal' ? 'Vendo explicação' : st?.status === 'complete' ? 'Concluiu' : 'Aguardando';
      return {
        pid: p.pid, name: p.name, team: p.team, teamName: team(p.team)?.name || 'Individual', teamColor: team(p.team)?.color || null,
        online: !!p.sid, status, question: st ? Math.min(st.qi + 1, c.plan.length) : 0,
        total: c?.plan.length || 0, answered: st?.answers.length || 0,
        points: score?.pts || 0, correct: score?.ok || 0, lastResponseMs: st?.lastResponseMs ?? null,
        elapsedMs: st?.status === 'question' ? (r.phase === 'paused' ? (st.elapsedBeforePause || 0) : Math.max(0, Date.now() - st.startedAt)) : 0,
        remainingMs: st?.status === 'question' ? (r.phase === 'paused' ? (st.pauseRemaining || 0) : Math.max(0, st.until - Date.now())) : 0
      };
    });
  }

  adminState() {
    const r = this.r;
    return {
      code: r.code, mode: r.config.mode, round: r.round, rounds: r.rounds, bankSize: QUESTION_BANK.length, phase: r.phase, pausedFrom: r.pausedFrom, stage: r.stage,
      n: r.contest ? Math.max(0, ...[...r.contest.states.values()].map(s => s.qi + 1)) : 0,
      total: r.plan.length, lobby: this.lobbyState(), check: r.phase === 'lobby' ? this.startCheck() : null,
      remaining: r.phase === 'between' ? Math.max(0, r.betweenUntil - Date.now()) : 0,
      participants: r.players.size, ranking: r.scores.size ? this.publicRanking() : null,
      players: this.participantDetails(), between: r.between, result: r.result,
      canAuthorizeFinal: r.phase === 'between' && r.between?.kind === 'winner'
    };
  }
  pushAdmin() {
    if (this.r.admin) this.send(this.r.admin, 'admin:state', this.adminState());
    this.pushSpectators();
  }
  spectatorState(pid) {
    const r = this.r, c = r.contest;
    const viewer = r.players.get(pid);
    const canReturnHome = !!viewer && !!c && r.config.mode === 'groups' && r.stage === 'final' &&
      ![...c.pids].some(id => r.players.get(id)?.team === viewer.team);
    return { stage: r.stage, phase: r.phase, round: r.round, mode: r.config.mode,
      canReturnHome, players: this.participantDetails().filter(p => c?.pids.has(p.pid)), ranking: this.publicRanking() };
  }
  pushSpectators() {
    const r = this.r;
    if (!r.contest || !['question', 'paused'].includes(r.phase)) return;
    for (const p of r.players.values()) if (p.sid && (!r.contest.pids.has(p.pid) || r.contest.states.get(p.pid)?.status === 'complete')) this.send(p.sid, 'game:spectate', this.spectatorState(p.pid));
  }
  broadcastLobby() { this.toPlayers('lobby:update', this.lobbyState()); this.pushAdmin(); }

  /* ---------- timers por participante ---------- */
  clearPlayerTimer(pid) {
    const c = this.r?.contest, timer = c?.timers?.get(pid);
    if (timer) clearTimeout(timer);
    c?.timers?.delete(pid);
  }
  schedulePlayer(pid) {
    const c = this.r?.contest, st = c?.states.get(pid);
    if (!c || !st || (st.status !== 'question' && st.status !== 'reveal') || this.r.phase === 'paused') return;
    this.clearPlayerTimer(pid);
    const delay = Math.max(0, st.until - Date.now());
    const timer = setTimeout(() => {
      if (!this.r || this.r.phase !== 'question') return;
      if (st.status === 'question') this.revealPlayer(pid, null);
      else this.nextQuestionFor(pid);
    }, delay);
    c.timers.set(pid, timer);
  }
  clearAllTimers() {
    const c = this.r?.contest;
    if (c?.timers) for (const t of c.timers.values()) clearTimeout(t);
    if (c?.timers) c.timers.clear();
    if (this.r?.betweenTimer) clearTimeout(this.r.betweenTimer);
    if (this.r) this.r.betweenTimer = null;
  }
  scheduleBetween(delay) {
    const r = this.r;
    if (r.betweenTimer) clearTimeout(r.betweenTimer);
    r.betweenUntil = Date.now() + delay;
    r.betweenTimer = setTimeout(() => {
      if (!this.r || this.r.phase !== 'between' || r.between?.kind !== 'tie') return;
      const ids = r.between.pids.filter(pid => r.players.has(pid));
      const stage = r.between.nextStage || 'tiebreak';
      const plan = r.between.plan || PLAN_MAIN;
      const error = this.capacityError(ids, plan);
      if (error) { this.finishExhausted(ids); return; }
      this.startContest(stage, ids, plan);
      void this.persist();
    }, delay);
  }

  historyKey(pid) { return this.r.config.mode === 'individual' ? 'individual' : this.r.players.get(pid)?.team; }

  capacityError(pids, plan, fresh = false) {
    const groups = new Map();
    for (const pid of pids) { const key = this.historyKey(pid); groups.set(key, (groups.get(key) || 0) + 1); }
    for (const [key, count] of groups) {
      const used = new Set(fresh ? [] : this.r.history[key] || []);
      for (const d of [0, 1]) {
        const available = QUESTION_BANK.filter(q => q.d === d && !used.has(q.id)).length;
        const needed = count * plan.filter(level => level === d).length;
        if (available < needed) return `Questões inéditas insuficientes: são necessárias ${needed} de nível ${d ? 'médio' : 'fácil'}, mas restam ${available}. Reduza os participantes ou inicie uma nova partida.`;
      }
    }
    return null;
  }

  makeQuestionSets(pids, plan) {
    const error = this.capacityError(pids, plan);
    if (error) throw new Error(error);
    const qs = new Map(), history = structuredClone(this.r.history);
    for (const pid of shuffle(pids)) {
      const key = this.historyKey(pid), used = new Set(history[key] || []);
      const list = buildQuestions(plan, used);
      list.forEach(q => used.add(q.id)); history[key] = [...used]; qs.set(pid, list);
    }
    this.r.history = history;
    return qs;
  }

  startContest(stage, pids, plan) {
    const r = this.r;
    const eligible = [...new Set(pids)].filter(pid => r.players.has(pid));
    const qs = this.makeQuestionSets(eligible, plan);
    this.clearAllTimers(); r.round++;
    r.stage = stage; r.plan = [...plan]; r.phase = 'question'; r.between = null; r.result = null; r.pausedFrom = null;
    r.scores = new Map(eligible.map(pid => [pid, { pts: 0, ok: 0, ms: 0 }]));
    const states = new Map(), timers = new Map();
    const now = Date.now();
    for (const pid of eligible) {
      const q = qs.get(pid)[0], budget = questionTime(q);
      states.set(pid, { qi: 0, status: 'question', startedAt: now, until: now + budget, budget, answers: [], lastResponseMs: null, last: null });
    }
    r.contest = { stage, plan: [...plan], pids: new Set(eligible), qs, states, timers };
    for (const p of r.players.values()) {
      if (r.contest.pids.has(p.pid)) this.sendQuestion(p.pid);
      else if (p.sid) this.send(p.sid, 'game:spectate', this.spectatorState(p.pid));
    }
    for (const pid of eligible) this.schedulePlayer(pid);
    this.pushAdmin(); void this.persist();
    if (!eligible.length) this.stopGame('Não há participantes ativos para continuar.');
  }

  sendQuestion(pid) {
    const r = this.r, c = r.contest, p = r.players.get(pid), st = c?.states.get(pid);
    if (!p?.sid || !c || !st || st.status !== 'question') return;
    const q = c.qs.get(pid)?.[st.qi]; if (!q) return;
    this.send(p.sid, 'game:question', {
      id: q.id, n: st.qi + 1, total: c.plan.length, stage: c.stage, cat: q.cat, d: q.d,
      text: q.text, title: q.title || null, visual: q.visual || null, options: q.options,
      time: q.time, remaining: Math.max(0, st.until - Date.now()), picked: null
    });
  }

  sendSnapshot(p) {
    const r = this.r, c = r.contest, st = c?.states.get(p.pid);
    if (!p.sid) return;
    if (r.phase === 'lobby') return this.send(p.sid, 'lobby:update', this.lobbyState());
    if (['question', 'paused'].includes(r.phase) && c && (!c.pids.has(p.pid) || st?.status === 'complete')) return this.send(p.sid, 'game:spectate', this.spectatorState(p.pid));
    if (r.phase === 'paused') return this.send(p.sid, 'game:paused', { stage: r.stage, n: st ? st.qi + 1 : 0, total: r.plan.length });
    if (r.phase === 'between') return this.send(p.sid, 'game:between', r.between);
    if (r.phase === 'ended') return this.send(p.sid, 'game:end', r.result);
    if (st?.status === 'question') return this.sendQuestion(p.pid);
    if (st?.status === 'reveal' && st.last) return this.send(p.sid, 'game:reveal', st.last);
    if (st?.status === 'complete') return this.send(p.sid, 'game:complete', { stage: r.stage, total: c.plan.length });
    this.send(p.sid, 'game:spectate', this.spectatorState(p.pid));
  }

  revealPlayer(pid, idx) {
    const r = this.r, c = r.contest, st = c?.states.get(pid), p = r.players.get(pid);
    if (!c || r.phase !== 'question' || !st || st.status !== 'question') return;
    this.clearPlayerTimer(pid);
    const q = c.qs.get(pid)[st.qi], now = Date.now();
    const hasAnswer = Number.isInteger(idx) && idx >= 0 && idx < q.options.length;
    const ms = Math.min(Math.max(0, now - st.startedAt), st.budget);
    const ok = hasAnswer && now <= st.until && idx === q.ans;
    const bonus = ok ? speedBonus(ms, st.budget) : 0;
    const pts = ok ? 100 + bonus : 0;
    const result = hasAnswer ? (ok ? 'ok' : 'bad') : 'none';
    const score = r.scores.get(pid);
    if (score) { score.ms += ms; if (ok) { score.pts += pts; score.ok++; } }
    st.lastResponseMs = hasAnswer ? ms : null;
    st.answers.push({ idx: hasAnswer ? idx : null, ok, ms, pts, bonus });
    const pay = {
      ranking: this.publicRanking(), stage: r.stage, inGame: true,
      result, picked: hasAnswer ? idx : null, correctText: q.options[q.ans], why: q.why,
      gained: pts, bonus, total: score?.pts || 0, responseMs: hasAnswer ? ms : null
    };
    st.last = pay; st.status = 'reveal';
    const wait = ok ? REVEAL_OK : REVEAL_MISS;
    st.until = now + wait;
    if (p?.sid) this.send(p.sid, 'game:reveal', pay);
    this.schedulePlayer(pid); this.pushAdmin(); void this.persist();
  }

  nextQuestionFor(pid) {
    const r = this.r, c = r.contest, st = c?.states.get(pid), p = r.players.get(pid);
    if (!c || r.phase !== 'question' || !st || st.status !== 'reveal') return;
    this.clearPlayerTimer(pid);
    st.qi++;
    if (st.qi >= c.plan.length) {
      st.status = 'complete'; st.until = 0;
      if (p?.sid) this.send(p.sid, 'game:complete', { stage: r.stage, total: c.plan.length });
      this.pushAdmin(); void this.persist(); this.maybeEndContest(); return;
    }
    const q = c.qs.get(pid)[st.qi], budget = questionTime(q);
    st.status = 'question'; st.startedAt = Date.now(); st.budget = budget; st.until = st.startedAt + budget; st.last = null;
    this.sendQuestion(pid); this.schedulePlayer(pid); this.pushAdmin(); void this.persist();
  }

  maybeEndContest() {
    const c = this.r.contest;
    if (!c) return;
    if (!c.pids.size) return this.stopGame('Não há participantes ativos para continuar.');
    if ([...c.pids].every(pid => !this.r.players.has(pid) || c.states.get(pid)?.status === 'complete')) this.endContest();
  }

  finishResult(result) {
    const r = this.r; this.clearAllTimers();
    r.result = { mode: r.config.mode, round: r.round, ...result };
    r.phase = 'ended'; this.toPlayers('game:end', r.result); this.pushAdmin(); void this.persist();
  }
  finishExhausted(pids) {
    const individual = this.r.stage === 'final' || this.r.config.mode === 'individual';
    const ranking = individual ? this.playerRank().filter(p => pids.includes(p.pid)) : this.teamRank().filter(t => pids.some(pid => this.r.players.get(pid)?.team === t.id));
    this.finishResult({ tied: true, reason: 'O banco de questões inéditas desta disputa se esgotou. O resultado fica empatado; nenhuma pergunta será repetida.', ranking, kind: individual ? 'players' : 'teams' });
  }
  queueRound(pids, plan, details = {}) {
    const r = this.r;
    if (this.capacityError(pids, plan)) return this.finishExhausted(pids);
    r.phase = 'between';
    r.between = { kind: 'tie', pids, plan, seconds: BETWEEN / 1000, ...details };
    this.scheduleBetween(BETWEEN);
    this.toPlayers('game:between', r.between); this.pushAdmin(); void this.persist();
  }
  endContest() {
    const r = this.r, c = r.contest;
    if (!c) return;
    this.clearAllTimers();
    const individual = r.stage === 'final' || r.config.mode === 'individual';
    const rk = individual ? this.playerRank() : this.teamRank();
    if (!rk.length) return this.stopGame('A disputa terminou sem participantes válidos.');
    r.rounds.push({ round: r.round, stage: r.stage, kind: individual ? 'players' : 'teams', ranking: rk });
    const outcome = decideRound(r.config.mode, r.stage, rk);
    if (outcome.type === 'winner') {
      const w = outcome.winner;
      return this.finishResult({ team: individual ? (team(w.team) || null) : w, player: individual ? w : null, ranking: outcome.ranking, kind: outcome.kind });
    }
    if (outcome.type === 'next') {
      const pids = [...c.pids].filter(pid => outcome.ids.includes(individual ? pid : r.players.get(pid)?.team));
      if (r.config.mode === 'groups' && !individual && this.capacityError(pids, [...outcome.plan, ...PLAN_FINAL])) return this.finishExhausted(pids);
      return this.queueRound(pids, outcome.plan, { teams: outcome.leaders, pts: outcome.leaders[0].pts, ok: outcome.leaders[0].ok,
        nextStage: outcome.nextStage, elimination: r.config.mode === 'elimination', eliminated: outcome.eliminated });
    }
    r.phase = 'between';
    r.between = { kind: 'winner', team: outcome.winner, pts: outcome.winner.pts, ok: outcome.winner.ok };
    r.betweenUntil = 0;
    this.toPlayers('game:between', r.between); this.pushAdmin(); void this.persist();
  }

  pauseGame() {
    const r = this.r;
    if (r.phase !== 'question' && !(r.phase === 'between' && r.between?.kind === 'tie')) return false;
    const now = Date.now(); r.pausedFrom = r.phase; r.pausedAt = now;
    if (r.phase === 'question' && r.contest) {
      for (const [pid, st] of r.contest.states) {
        if (st.status === 'question' || st.status === 'reveal') {
          st.pauseRemaining = Math.max(0, st.until - now);
          if (st.status === 'question') st.elapsedBeforePause = Math.min(st.budget, Math.max(0, now - st.startedAt));
          this.clearPlayerTimer(pid);
        }
      }
    } else if (r.phase === 'between') {
      r.betweenRemaining = Math.max(0, r.betweenUntil - now);
      if (r.betweenTimer) clearTimeout(r.betweenTimer);
      r.betweenTimer = null;
    }
    r.phase = 'paused';
    this.toPlayers('game:paused', { stage: r.stage, total: r.plan.length });
    this.pushAdmin(); void this.persist(); return true;
  }

  resumeGame() {
    const r = this.r;
    if (r.phase !== 'paused' || !r.pausedFrom) return false;
    const now = Date.now(), previous = r.pausedFrom;
    r.phase = previous; r.pausedFrom = null;
    if (previous === 'question' && r.contest) {
      for (const [pid, st] of r.contest.states) {
        if (st.status === 'question' || st.status === 'reveal') {
          const remaining = Math.max(0, st.pauseRemaining ?? 0);
          st.until = now + remaining;
          if (st.status === 'question') st.startedAt = now - (st.elapsedBeforePause || 0);
          delete st.pauseRemaining; delete st.elapsedBeforePause;
          this.schedulePlayer(pid);
        }
      }
      for (const p of r.players.values()) this.sendSnapshot(p);
    } else if (previous === 'between') {
      this.scheduleBetween(Math.max(0, r.betweenRemaining));
      this.toPlayers('game:between', r.between);
    }
    this.pushAdmin(); void this.persist(); return true;
  }

  stopGame(message = 'A partida foi encerrada pelo professor.') {
    const r = this.r; this.clearAllTimers();
    r.phase = 'lobby'; r.stage = 'main'; r.plan = []; r.contest = null; r.scores = new Map();
    r.between = null; r.betweenUntil = 0; r.result = null; r.pausedFrom = null; r.pausedAt = 0; r.history = {}; r.round = 0; r.rounds = [];
    for (const p of r.players.values()) p.last = null;
    this.toPlayers('game:stopped', { message }); this.broadcastLobby(); void this.persist();
  }

  removePlayer(pid, notify = true) {
    const r = this.r, p = r.players.get(pid); if (!p) return false;
    clearTimeout(p.dc); this.clearPlayerTimer(pid);
    if (r.contest) { r.contest.pids.delete(pid); r.contest.states.delete(pid); }
    r.scores.delete(pid); r.players.delete(pid);
    if (notify && p.sid) this.send(p.sid, 'player:kicked', 1);
    return true;
  }

  /* ---------- eventos recebidos ---------- */
  async deleteRoom(cb) {
    if (this.closed || this.r.phase !== 'lobby') return cb({ ok: false, error: 'Exclua a sala na tela de espera, antes de iniciar uma partida.' });
    this.closed = true;
    try { await this.ctx.storage.put('closed', true); }
    catch (error) { this.closed = false; throw error; }
    this.clearAllTimers();
    for (const p of this.r.players.values()) clearTimeout(p.dc);
    // Preserva somente a marca de encerramento para impedir a reutilização do código.
    await this.ctx.storage.delete(['init', 'state']);
    await this.ctx.storage.deleteAlarm();
    cb({ ok: true });
    for (const s of this.socks.values()) this.send(s.id, 'room:closed', { message: 'Esta sala foi encerrada pelo administrador.' });
    this.r = null;
    for (const s of this.socks.values()) try { s.ws.close(1000, 'Sala encerrada'); } catch (e) { }
    this.socks.clear();
  }

  initHandlers() {
    const adm = fn => (s, d, cb) => { if (this.r.admin === s.id) return fn(s, d, cb); else cb({ ok: false, error: 'Ação exclusiva do admin.' }); };
    this.H = {
      'admin:deleteRoom': adm((s, d, cb) => this.deleteRoom(cb)),
      'admin:resume': (s, d, cb) => {
        const r = this.r;
        if (!this.env.ADMIN_PASSWORD || !this.env.ADMIN_USERNAME || !d || d.username !== this.env.ADMIN_USERNAME || d.password !== this.env.ADMIN_PASSWORD || norm(d.code) !== r.code) return cb({ ok: false });
        r.admin = s.id; cb({ ok: true, code: r.code }); this.pushAdmin();
      },
      'admin:start': adm((s, d, cb) => {
        const r = this.r; if (r.phase !== 'lobby') return cb({ ok: false, error: 'A sala já está em andamento.' });
        const err = this.startCheck(); if (err) return cb({ ok: false, error: err });
        r.history = {}; r.round = 0; r.rounds = [];
        this.startContest(r.config.mode === 'elimination' ? 'elimination' : 'main', [...r.players.keys()], PLAN_MAIN); cb({ ok: true });
      }),
      'admin:skip': adm(() => {
        const r = this.r, c = r.contest;
        if (r.phase !== 'question' || !c) return;
        for (const pid of c.pids) {
          const st = c.states.get(pid);
          if (st?.status === 'question') this.revealPlayer(pid, null);
          else if (st?.status === 'reveal') { this.clearPlayerTimer(pid); this.nextQuestionFor(pid); }
        }
      }),
      'admin:pause': adm(() => this.pauseGame()),
      'admin:resumeGame': adm(() => this.resumeGame()),
      'admin:stop': adm(() => this.stopGame()),
      'admin:finalStart': adm((s, d, cb) => {
        const r = this.r;
        if (r.phase !== 'between' || r.between?.kind !== 'winner') return cb({ ok: false, error: 'A final individual ainda não está liberada.' });
        const winner = r.between.team.id;
        const pids = [...r.players.values()].filter(p => p.team === winner).map(p => p.pid);
        if (!pids.length) return cb({ ok: false, error: 'A equipe vencedora não tem participantes ativos.' });
        const error = this.capacityError(pids, PLAN_FINAL); if (error) return cb({ ok: false, error });
        this.startContest('final', pids, PLAN_FINAL); cb({ ok: true });
      }),
      'admin:kick': adm((s, d, cb) => {
        const pid = typeof d === 'string' ? [...this.r.players.values()].find(p => p.name === d)?.pid : d?.pid;
        if (!pid || !this.r.players.has(pid)) return cb?.({ ok: false, error: 'Participante não encontrado.' });
        if (this.r.phase === 'between' || this.r.phase === 'ended' || (this.r.phase === 'paused' && this.r.pausedFrom === 'between')) return cb?.({ ok: false, error: 'Não é possível remover participantes nesta etapa.' });
        this.removePlayer(pid);
        if (this.r.phase === 'lobby') this.broadcastLobby(); else { this.pushAdmin(); this.maybeEndContest(); }
        cb?.({ ok: true });
      }),
      'admin:removeTeam': adm((s, d, cb) => {
        const r = this.r, id = d?.team;
        if (r.config.mode === 'individual') return cb({ ok: false, error: 'Esta sala não usa equipes.' });
        if (!team(id) || !this.active().some(t => t.id === id)) return cb({ ok: false, error: 'Equipe não encontrada.' });
        if (r.phase === 'between' || r.phase === 'ended' || (r.phase === 'paused' && r.pausedFrom === 'between')) return cb({ ok: false, error: 'Não é possível remover equipes nesta etapa.' });
        if (r.phase === 'question' || r.phase === 'paused') {
          if (r.stage === 'final') return cb({ ok: false, error: 'Não é possível remover a equipe durante a final individual.' });
          const competing = new Set([...r.contest.pids].map(pid => r.players.get(pid)?.team).filter(Boolean));
          if (competing.size <= 2 && competing.has(id)) return cb({ ok: false, error: 'Mantenha pelo menos duas equipes na disputa.' });
        }
        const ids = this.members(id).map(p => p.pid);
        ids.forEach(pid => this.removePlayer(pid));
        if (r.phase === 'lobby') this.broadcastLobby(); else { this.pushAdmin(); this.maybeEndContest(); }
        cb({ ok: true, removed: ids.length });
      }),
      'admin:newgame': adm((s, d, cb) => {
        const r = this.r; if (r.phase !== 'ended') return cb?.({ ok: false, error: 'A partida ainda não terminou.' });
        this.clearAllTimers();
        Object.assign(r, { phase: 'lobby', stage: 'main', plan: [], scores: new Map(), contest: null, between: null, betweenUntil: 0, result: null, pausedFrom: null, history: {}, round: 0, rounds: [] });
        for (const p of r.players.values()) p.last = null;
        this.broadcastLobby(); cb?.({ ok: true });
      }),
      'admin:config': adm((s, d, cb) => {
        const r = this.r; d = d || {};
        if (r.phase !== 'lobby') return cb({ ok: false, error: 'As configurações só podem mudar antes de iniciar.' });
        const mode = d.mode || r.config.mode;
        if (!MODES[mode]) return cb({ ok: false, error: 'Modo de partida inválido.' });
        if (mode !== r.config.mode && r.players.size) return cb({ ok: false, error: 'Escolha o modo antes de receber participantes. Esvazie a sala para mudar.' });
        const n = Math.trunc(+d.numTeams), mn = Math.trunc(+d.min), mx = Math.trunc(+d.max);
        if (!(n >= 2 && n <= TEAMS.length)) return cb({ ok: false, error: `O número de equipes deve ficar entre 2 e ${TEAMS.length}.` });
        if (!(mn >= 1 && mn <= 5 && mx >= 1 && mx <= 5)) return cb({ ok: false, error: 'Mínimo e máximo por equipe devem ficar entre 1 e 5.' });
        if (mn > mx) return cb({ ok: false, error: 'O mínimo por equipe não pode ser maior que o máximo.' });
        const cheia = TEAMS.slice(0, n).find(t => this.members(t.id).length > mx);
        if (cheia) return cb({ ok: false, error: `${cheia.name} já tem ${this.members(cheia.id).length} jogadores. Remova alguém antes de reduzir o máximo.` });
        const fora = TEAMS.slice(n).find(t => this.members(t.id).length > 0);
        if (fora) return cb({ ok: false, error: `${fora.name} tem jogadores. Remova-os antes de reduzir o número de equipes.` });
        r.config = { numTeams: n, min: mn, max: mx, mode, locked: d.locked === true }; cb({ ok: true }); this.broadcastLobby();
      }),
      'admin:balance': adm((s, d, cb) => {
        const r = this.r;
        if (r.phase !== 'lobby' || r.config.mode === 'individual') return cb({ ok: false, error: 'Distribuição disponível apenas antes de partidas em equipes.' });
        const players = shuffle([...r.players.values()]);
        const count = Math.min(r.config.numTeams, Math.floor(players.length / r.config.min));
        if (count < 2 || players.length > count * r.config.max) return cb({ ok: false, error: 'Quantidade de participantes incompatível com os limites das equipes.' });
        players.forEach((p, i) => { p.team = this.active()[i % count].id; });
        this.broadcastLobby(); cb({ ok: true });
      }),
      'room:check': (s, d, cb) => cb(this.check()),
      'player:join': (s, d, cb) => {
        const r = this.r; d = d || {};
        if (r.phase !== 'lobby' || r.config.locked) return cb({ ok: false, error: 'Inscrições fechadas.' });
        if (s.data.pid) return cb({ ok: false, error: 'Você já entrou na sala.' });
        const name = String(d.name || '').trim().replace(/\s+/g, ' ').slice(0, 16);
        if (name.length < 2) return cb({ ok: false, error: 'Digite um nome com pelo menos 2 letras.' });
        if (r.config.mode === 'individual') d.team = null;
        if (r.config.mode === 'individual' && r.players.size >= individualCapacity(PLAN_MAIN)) return cb({ ok: false, error: 'Sala cheia para uma partida sem questões repetidas.' });
        if (r.config.mode !== 'individual' && !this.active().some(t => t.id === d.team)) return cb({ ok: false, error: 'Escolha uma equipe.' });
        if (r.config.mode !== 'individual' && this.members(d.team).length >= r.config.max) return cb({ ok: false, error: `Equipe cheia (máximo ${r.config.max}). Escolha outra.` });
        if ([...r.players.values()].some(p => p.name.toLowerCase() === name.toLowerCase())) return cb({ ok: false, error: 'Já existe alguém com esse nome na sala.' });
        const p = { pid: rid(), token: rid() + rid(), name, team: d.team, sid: s.id, last: null }; r.players.set(p.pid, p); s.data.pid = p.pid;
        cb({ ok: true, pid: p.pid, token: p.token, name, team: d.team, code: r.code }); this.broadcastLobby();
      },
      'player:rejoin': (s, d, cb) => {
        const r = this.r, p = d && r.players.get(d.pid);
        if (!p || !p.token || d.token !== p.token) return cb({ ok: false });
        clearTimeout(p.dc);
        const old = this.socks.get(p.sid); if (old && old.id !== s.id) old.data.pid = null;
        p.sid = s.id; s.data.pid = p.pid;
        cb({ ok: true, name: p.name, team: p.team, code: r.code, config: this.lobbyState().config }); this.sendSnapshot(p); this.pushAdmin();
      },
      'player:leave': (s, d, cb) => {
        const r = this.r, p = r.players.get(s.data.pid);
        if (!p || p.sid !== s.id) return cb({ ok: false, error: 'Sessão de participante inválida.' });
        if (r.phase !== 'ended' && !this.spectatorState(p.pid).canReturnHome)
          return cb({ ok: false, error: 'Aguarde o resultado da disputa para sair da sala.' });
        // Resultados e rodadas concluídas são snapshots e permanecem no histórico.
        this.removePlayer(p.pid, false); s.data.pid = null;
        cb({ ok: true });
        this.onClose(s);
        this.pushAdmin(); void this.persist();
      },
      'player:switch': (s, d, cb) => {
        const r = this.r, p = r.players.get(s.data.pid);
        if (r.config.mode === 'individual' || r.config.locked) return cb({ ok: false, error: 'Troca de equipes indisponível.' });
        if (!p || p.sid !== s.id || r.phase !== 'lobby' || !d || !this.active().some(t => t.id === d.team)) return cb({ ok: false, error: 'Troca de equipe indisponível.' });
        if (p.team !== d.team && this.members(d.team).length >= r.config.max) return cb({ ok: false, error: 'Equipe cheia.' });
        p.team = d.team; cb({ ok: true, team: d.team }); this.broadcastLobby();
      },
      'player:answer': (s, d, cb) => {
        const r = this.r, pid = s.data.pid, idx = d && d.idx, c = r.contest, st = c?.states.get(pid);
        if (r.players.get(pid)?.sid !== s.id || r.phase !== 'question' || !c?.pids.has(pid) || !st || st.status !== 'question') return cb({ ok: false, error: 'Esta pergunta não está mais ativa.' });
        const q = c.qs.get(pid)?.[st.qi], ms = Date.now() - st.startedAt;
        if (!Number.isInteger(idx) || idx < 0 || idx >= q.options.length || ms >= st.budget || d.questionId !== q.id) return cb({ ok: false, error: 'O tempo acabou ou a resposta é inválida.' });
        cb({ ok: true }); this.revealPlayer(pid, idx);
      }
    };
  }
}
