import { GATES, gateSVG } from './public/gate-library.js';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { QUESTION_BANK, buildQuestions, prepareQuestion, individualCapacity } from './public/questions.js';
import { PLAN_MAIN, PLAN_FINAL, speedBonus, MODE_RULES, MODES } from './public/rules.js';
import { CATNAMES } from './public/question-catalog.js';
import { questionMarkup, inline, participantMarkup } from './public/question-view.js';
import { Room } from './src/room.js';
import worker from './src/worker.js';

const rooms = [], env = { ADMIN_USERNAME: 'SevenEltonAdmin', ADMIN_PASSWORD: 'test-password' };
function createRoom(mode = 'groups') {
  const values = new Map();
  const storage = { async get(k) { return values.get(k); }, async put(k,v) { values.set(k, structuredClone(v)); }, async setAlarm(at) { this.alarmAt = at; }, async deleteAlarm() { this.alarmAt = null; }, async delete(keys) { for (const key of Array.isArray(keys) ? keys : [keys]) values.delete(key); }, async deleteAll() { values.clear(); } };
  const room = new Room({ storage }, env); rooms.push(room);
  room.r = room.blank('ABCDE'); room.r.config.mode = mode;
  room.r.admin = 'admin'; room.messages = [];
  room.socks.set('admin', { id: 'admin', data: {}, ws: { send(raw) { room.messages.push({ to: 'admin', ...JSON.parse(raw) }); } } });
  return room;
}
function call(room, event, data, sid = 'admin') {
  let result;
  room.H[event](room.socks.get(sid), data, value => { result = value; });
  return result;
}
function join(room, name, team) {
  const sid = name + '-socket';
  room.socks.set(sid, { id: sid, data: {}, ws: { send(raw) { room.messages.push({ to: sid, ...JSON.parse(raw) }); } } });
  const res = call(room, 'player:join', { name, team }, sid);
  assert.equal(res.ok, true, res.error); return res.pid;
}
function answer(room, pid, correct = true) {
  const st = room.r.contest.states.get(pid), q = room.r.contest.qs.get(pid)[st.qi];
  return call(room, 'player:answer', { idx: correct ? q.ans : (q.ans + 1) % 4, questionId: q.id }, room.r.players.get(pid).sid);
}
function finishPlayers(room, correctPids = []) {
  const c = room.r.contest;
  for (const pid of c.pids) while (c.states.get(pid).status !== 'complete') {
    assert.equal(answer(room, pid, correctPids.includes(pid)).ok, true);
    room.nextQuestionFor(pid);
  }
}
function nextRound(room) {
  const b = room.r.between;
  room.startContest(b.nextStage || 'tiebreak', b.pids, b.plan);
}
function assertUnique(ids) { assert.equal(new Set(ids).size, ids.length, 'Questões repetidas'); }

// Executa os eventos reais do cliente com DOM e transporte mínimos, sem timers de navegador.
function playerPage(room, pid) {
  const html = readFileSync(new URL('./public/index.html', import.meta.url), 'utf8');
  const elements = new Map([...html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)].map(([tag, id]) => [id, {
    id, hidden: /\bhidden\b/.test(tag), textContent: '', innerHTML: '', value: '',
    style: { setProperty() {} }, dataset: {}
  }]));
  const events = new Map(), p = room.r.players.get(pid), storage = new Map([['sp_session', JSON.stringify({ code: room.r.code, pid, token: p.token })]]);
  let closed = false;
  const socket = {
    on(event, fn) { if (!events.has(event)) events.set(event, []); events.get(event).push(fn); },
    open() {}, close() { closed = true; },
    emit(event, data, cb) {
      if (event === 'player:leave') return cb(call(room, event, data, p.sid));
      if (cb) cb({ ok: true, code: room.r.code, name: p.name, team: p.team, config: room.r.config });
    }
  };
  const context = {
    io: () => socket, CAT: CATNAMES, questionMarkup, inline, participantMarkup, MODE_RULES, MODES,
    document: { querySelector: selector => elements.get(selector.slice(1)), querySelectorAll: selector => selector === '.screen' ? [...elements.values()].filter(el => el.id.startsWith('s-')) : [] },
    window: { scrollTo() {} }, location: { search: '?sala=ABCDE', pathname: '/', hash: '', href: '/' }, URLSearchParams,
    history: { replaceState(state, title, url) { context.location.href = url; context.location.search = ''; } },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, val) => storage.set(key, val), removeItem: key => storage.delete(key) },
    setInterval: () => 1, clearInterval() {}, performance: { now: () => 0 }
  };
  const source = readFileSync(new URL('./public/app.js', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');
  vm.runInNewContext(source, context);
  assert.equal(elements.get('sessionLoading').hidden, false, 'A restauração deve aguardar o servidor.');
  assert.equal(elements.get('s-home').hidden, true, 'A página inicial não deve piscar durante a restauração.');
  const receive = (event, data) => { for (const fn of events.get(event) || []) fn(data); };
  receive('connect');
  return { elements, storage, receive, get closed() { return closed; },
    click: id => elements.get(id).onclick(),
    screen: () => [...elements.values()].find(el => el.id.startsWith('s-') && !el.hidden)?.id,
    snapshot() {
      room.sendSnapshot(p);
      const message = room.messages.filter(m => m.to === p.sid).at(-1);
      receive(message.e, message.a[0]);
    }
  };
}

try {
  assert.equal(QUESTION_BANK.length, 167);
  assert.equal(QUESTION_BANK.filter(q => q.visual).length, 6);
  assertUnique(QUESTION_BANK.map(q => q.id));
  assertUnique(QUESTION_BANK.map(q => q.visual || q.text));
  for (const q of QUESTION_BANK) {
    assert.ok(q.d === 0 || q.d === 1); assert.equal(q.time, 90);
    assert.equal(q.options.length, 4); assertUnique(q.options); assert.ok(q.options[q.ans] && q.why && q.text);
    const shuffled = prepareQuestion(q); assert.equal(shuffled.options[shuffled.ans], q.options[q.ans]);
    assert.doesNotMatch(q.text + q.why, /###|Resposta correta|\*\*Explicação/);
    const markup = questionMarkup(q); assert.doesNotMatch(markup, /`/);
    if (q.text.includes('|')) assert.match(markup, /<table/);
  }
  assert.match(questionMarkup(QUESTION_BANK.find(q => q.id === 'md-144')), /<th scope="col">Etapa<\/th>/);
  assert.equal(inline('<script>`A + B`'), '&lt;script&gt;<code>A + B</code>');
  assert.doesNotMatch(participantMarkup([{ name: '<script>', status: 'Respondendo', total: 7 }]), /<script>/);
  const unorderedPlayers = [
    { pid: '3', name: 'Zélia', team: 'or', teamName: 'Team OR' },
    { pid: '2', name: 'Bruno', team: 'and', teamName: 'Team AND' },
    { pid: '1', name: 'Ana', team: 'and', teamName: 'Team AND' }
  ];
  const grouped = participantMarkup(unorderedPlayers, { ownTeam: 'and' });
  assert.equal((grouped.match(/<section /g) || []).length, 2);
  assert.ok(grouped.indexOf('Team AND') < grouped.indexOf('Team OR'));
  assert.ok(grouped.indexOf('Ana') < grouped.indexOf('Bruno'));
  assert.match(grouped, /Sua equipe/); assert.doesNotMatch(grouped, /<button/);
  assert.equal(participantMarkup([...unorderedPlayers].reverse(), { ownTeam: 'and' }), grouped);
  const adminGroups = participantMarkup(unorderedPlayers, { allowRemoval: true, allowGroupRemoval: true });
  assert.equal((adminGroups.match(/class="premove"/g) || []).length, 3);
  assert.equal((adminGroups.match(/class="btn ghost remove-live-team"/g) || []).length, 2);
  const soloGroup = participantMarkup(unorderedPlayers.map(p => ({ ...p, team: null })), { allowGroupRemoval: true });
  assert.equal((soloGroup.match(/<section /g) || []).length, 1);
  assert.match(soloGroup, /<h3>Participantes<\/h3>/); assert.doesNotMatch(soloGroup, /Sua equipe|remove-live-team/);
  assert.throws(() => buildQuestions(PLAN_MAIN, new Set(QUESTION_BANK.map(q => q.id))), /inéditas/);
  assert.equal(speedBonus(0), 50); assert.equal(speedBonus(22500), 25);
  assert.equal(speedBonus(44999), 1); assert.equal(speedBonus(45000), 0); assert.equal(speedBonus(90000), 0);

  // Todas as portas do guia têm uma questão visual e o mesmo desenho, sem revelar o nome no SVG da pergunta.
  assert.deepEqual(new Set(QUESTION_BANK.filter(q=>q.visual).map(q=>q.visual)), new Set(GATES.map(g=>g.id)));
  const seen = new Set(), visualSet = new Set();
  for (let i=0;i<6;i++) {
    const batch = buildQuestions(PLAN_MAIN, seen);
    assert.ok(batch[0].visual); visualSet.add(batch[0].visual);
    if (QUESTION_BANK.some(q=>q.cat==='digital' && q.d===1 && !seen.has(q.id))) assert.ok(batch.some(q=>q.cat==='digital'));
    for(const q of batch) { assert.equal(seen.has(q.id), false); seen.add(q.id); }
  }
  assert.equal(visualSet.size,6);
  for (const gate of GATES) {
    assert.match(gateSVG(gate.id), /<svg/);
    const visual = QUESTION_BANK.find(q=>q.visual===gate.id);
    assert.ok(visual.options.includes(gate.id));
    assert.doesNotMatch(questionMarkup(visual), new RegExp('aria-label="[^"\n]*' + gate.id));
  }
  assert.equal(QUESTION_BANK.filter(q=>q.cat==='digital').length,19);
  assert.equal(individualCapacity(PLAN_MAIN),19);
  const digitalMarkup = questionMarkup(QUESTION_BANK.find(q=>q.id==='digital-006'));
  assert.match(digitalMarkup, /<ul class="q-list">/); assert.match(digitalMarkup, /<strong>A = 0, B = 1 e C = 1<\/strong>/);
  assert.doesNotMatch(digitalMarkup, /\*\*/);
  assert.equal(inline('**<script>**'), '<strong>&lt;script&gt;</strong>');

  const room = createRoom(), a = join(room, 'Ana', 'and'), b = join(room, 'Bia', 'and'), c = join(room, 'Caio', 'or');
  assert.equal(call(room, 'admin:start').ok, true);
  assert.equal(room.r.contest.plan.length, 7);
  assert.equal(room.r.contest.states.get(a).budget, 90000);
  const mainIds = [...room.r.contest.qs].filter(([pid]) => [a,b].includes(pid)).flatMap(([, qs]) => qs.map(q => q.id));
  assertUnique(mainIds);
  assert.equal(answer(room, a).ok, true); room.nextQuestionFor(a);
  assert.equal(room.r.contest.states.get(a).qi, 1); assert.equal(room.r.contest.states.get(b).qi, 0);
  assert.equal(call(room, 'admin:finalStart').ok, false);
  finishPlayers(room, [a,b]);
  assert.equal(room.r.between.kind, 'winner'); assert.equal(room.r.between.team.id, 'and');
  const saved = room.serializable(), restored = createRoom(); restored.r = restored.restore(structuredClone(saved));
  assert.deepEqual(restored.r.history, room.r.history);
  assert.equal(restored.r.players.get(a).sid, null);
  assert.equal(call(room, 'admin:finalStart').ok, true);
  assert.equal(room.r.contest.plan.length, 6);
  assertUnique([...mainIds, ...[...room.r.contest.qs.values()].flatMap(qs => qs.map(q => q.id))]);
  const spectators = room.spectatorState(); assert.deepEqual(new Set(spectators.players.map(p => p.pid)), new Set([a,b]));
  assert.doesNotMatch(JSON.stringify(spectators), /"token"|"ans"|"options"|"why"/);
  assert.equal(call(room, 'admin:stop', {}, 'Caio-socket').ok, false);
  assert.equal(call(room, 'admin:config', { numTeams: 2, min: 1, max: 1 }, 'Caio-socket').ok, false);
  assert.equal(call(room, 'player:answer', { idx: 0 }, 'Caio-socket').ok, false);
  assert.equal(call(room, 'player:rejoin', { pid: a }, 'Caio-socket').ok, false);
  assert.equal(room.r.phase, 'question');
  finishPlayers(room, [a]);
  assert.equal(room.r.phase, 'ended'); assert.equal(room.r.result.player.pid, a);
  assert.equal(room.r.rounds.length, 2);
  assert.equal(call(room, 'admin:newgame').ok, true); assert.deepEqual(room.r.history, {});

  // Tempos, pausa persistida, limite estrito e respostas atrasadas de outra pergunta.
  const secure = createRoom('individual'), x = join(secure, 'Dani'), y = join(secure, 'Eva');
  const realNow = Date.now; let clock = realNow(); Date.now = () => clock;
  try {
    call(secure, 'admin:start');
    const oldQuestion = secure.r.contest.qs.get(x)[0];
    clock += 22500;
    assert.equal(secure.pauseGame(), true);
    const pauseSaved = secure.serializable(), resumed = createRoom('individual'); resumed.r = resumed.restore(pauseSaved);
    assert.equal(resumed.r.phase, 'paused');
    clock += 500000;
    assert.equal(secure.resumeGame(), true);
    assert.equal(answer(secure, x).ok, true); assert.equal(secure.r.scores.get(x).pts, 125);
    secure.nextQuestionFor(x);
    assert.equal(call(secure, 'player:answer', { idx: 0, questionId: oldQuestion.id }, 'Dani-socket').ok, false);
    const newQuestion = secure.r.contest.qs.get(x)[1];
    clock += 45000;
    assert.equal(call(secure, 'player:answer', { idx: newQuestion.ans, questionId: newQuestion.id, points: 99999, elapsedMs: 0 }, 'Dani-socket').ok, true);
    assert.equal(secure.r.scores.get(x).pts, 225);
    secure.nextQuestionFor(x); clock += 90000;
    assert.equal(answer(secure, x).ok, false);
    secure.revealPlayer(x, null); assert.equal(secure.r.scores.get(x).pts, 225);
    const before = secure.r.contest.states.get(y);
    assert.equal(before.budget, 90000);
  } finally { Date.now = realNow; secure.clearAllTimers(); }

  // Individual: inscrição sem equipe, empate real e desempate inédito.
  const solo = createRoom('individual'), u = join(solo, 'Fabi'), v = join(solo, 'Gabi');
  assert.equal(solo.r.players.get(u).team, null);
  assert.equal(call(solo, 'player:switch', { team: 'and' }, 'Fabi-socket').ok, false);
  call(solo, 'admin:start'); const soloFirst = [...solo.r.history.individual]; assertUnique(soloFirst);
  finishPlayers(solo);
  assert.equal(solo.r.between.pids.length, 2);
  assert.equal(solo.pauseGame(), true); assert.equal(solo.resumeGame(), true);
  nextRound(solo); assertUnique([...soloFirst, ...[...solo.r.contest.qs.values()].flatMap(qs => qs.map(q => q.id))]);
  finishPlayers(solo, [v]); assert.equal(solo.r.result.player.pid, v); assert.equal(solo.r.result.team, null);

  // Grupos: empate e final mantêm a reserva e o histórico de todos os colegas.
  const tied = createRoom(), teamIds = ['and','or'].flatMap(t => Array.from({length: 5}, (_, i) => join(tied, t + i, t)));
  call(tied, 'admin:start'); finishPlayers(tied);
  assert.equal(tied.r.between.kind, 'tie'); nextRound(tied);
  finishPlayers(tied, teamIds.slice(0, 5)); call(tied, 'admin:finalStart');
  assert.equal(tied.r.stage, 'final'); assert.equal(tied.r.history.and.length, 100);
  assertUnique(tied.r.history.and);

  // Eliminação: apenas sobreviventes seguem e nunca existe uma final individual.
  const elim = createRoom('elimination'), e1 = join(elim, 'Hugo', 'and'), e2 = join(elim, 'Iara', 'or'), e3 = join(elim, 'Joao', 'xor');
  call(elim, 'admin:start'); finishPlayers(elim, [e1, e2]);
  assert.deepEqual(elim.r.between.eliminated.map(t => t.id), ['xor']);
  assert.equal(elim.r.between.plan.length, 2); nextRound(elim);
  assert.deepEqual(new Set(elim.r.contest.pids), new Set([e1, e2]));
  finishPlayers(elim, [e1]); assert.equal(elim.r.phase, 'ended'); assert.equal(elim.r.result.team.id, 'and'); assert.equal(elim.r.result.player, null);
  const allTie = createRoom('elimination'); join(allTie, 'Lia', 'and'); join(allTie, 'Mia', 'or'); call(allTie, 'admin:start'); finishPlayers(allTie);
  assert.equal(allTie.r.between.eliminated.length, 0); assert.equal(allTie.r.between.pids.length, 2);

  // Dez equipes completas podem passar por nove rodadas sem repetir uma pergunta.
  const large = createRoom('elimination'); large.r.config.numTeams = 10;
  const teams = large.active(); teams.forEach(t => { for (let i=0;i<5;i++) join(large, t.id + '-' + i, t.id); });
  call(large, 'admin:start');
  for (let round=0;round<9;round++) {
    const competing = [...new Set([...large.r.contest.pids].map(pid => large.r.players.get(pid).team))];
    for (const [pid, score] of large.r.scores) { score.pts = (competing.indexOf(large.r.players.get(pid).team) + 1) * 100; score.ok = 1; }
    large.endContest();
    if (large.r.phase === 'ended') break;
    nextRound(large);
  }
  assert.equal(large.r.phase, 'ended'); assert.equal(large.r.round, 9);
  for (const ids of Object.values(large.r.history)) assertUnique(ids);

  // Esgotamento não reinicia o banco nem escolhe um vencedor arbitrário.
  const exhausted = createRoom('individual'); join(exhausted, 'Nina'); join(exhausted, 'Otto'); call(exhausted, 'admin:start');
  exhausted.r.history.individual = QUESTION_BANK.map(q => q.id); finishPlayers(exhausted);
  assert.equal(exhausted.r.phase, 'ended'); assert.equal(exhausted.r.result.tied, true);

  // Configurações, inscrição fechada, balanceamento, limite de lotação e remoções.
  const config = createRoom();
  assert.equal(call(config, 'admin:config', { mode: 'invalid', numTeams: 3, min: 1, max: 5 }).ok, false);
  for (let i=0;i<5;i++) join(config, 'Pessoa' + i, 'and');
  assert.equal(call(config, 'admin:config', { mode: 'individual', numTeams: 3, min: 1, max: 5 }).ok, false);
  assert.equal(call(config, 'admin:balance').ok, true);
  assert.equal(config.active().filter(t => config.members(t.id).length).length, 5);
  assert.equal(call(config, 'admin:config', { mode: 'groups', numTeams: 6, min: 1, max: 5, locked: true }).ok, true);
  assert.equal(config.check().ok, false);
  assert.equal(call(config, 'player:join', { name: 'New', team: 'and' }, 'admin').ok, false);
  assert.equal(call(config, 'player:switch', { team: 'or' }, 'Pessoa0-socket').ok, false);
  call(config, 'admin:start'); for (const pid of [...config.r.players.keys()]) config.removePlayer(pid); config.maybeEndContest();
  assert.equal(config.r.phase, 'lobby');
  const capacity = createRoom('individual'); for (let i=0;i<individualCapacity(PLAN_MAIN);i++) join(capacity, 'Aluno' + i);
  assert.equal(capacity.startCheck(), null);
  assert.equal(call(capacity, 'player:join', { name: 'Extra' }, 'admin').ok, false);

  // O Close precisa ser respondido para o navegador encerrar e reconectar.
  const closed = createRoom(); let closedCode;
  const closingSocket = { id:'closing', data:{}, ws:{ close(code) { closedCode = code; } } };
  closed.socks.set(closingSocket.id, closingSocket); closed.onClose(closingSocket);
  assert.equal(closedCode,1000); assert.equal(closed.socks.has('closing'),false);

  // Autenticação do painel e reconexão vinculada ao token privado.
  assert.equal(call(capacity, 'admin:resume', { username: 'wrong', password: env.ADMIN_PASSWORD, code: 'ABCDE' }).ok, false);
  assert.equal(call(capacity, 'admin:resume', { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD, code: 'ABCDE' }).ok, true);
  const player = [...capacity.r.players.values()][0];
  capacity.socks.set('new', { id: 'new', data: {}, ws: { send() {} } });
  assert.equal(call(capacity, 'player:rejoin', { pid: player.pid, token: player.token }, 'new').ok, true);
  assert.equal(capacity.socks.get('Aluno0-socket').data.pid, null);
  assert.equal(call(capacity, 'player:rejoin', { pid: player.pid, token: player.token }, 'new').config.mode, 'individual');
  await capacity.onMessage(capacity.socks.get('new'), { data: 'null' });
  await capacity.onMessage(capacity.socks.get('new'), { data: JSON.stringify({e:'constructor'}) });
// Rotas HTTP de criação validam credenciais antes de criar o Durable Object.
const workerEnv = {
  ADMIN_USERNAME: 'SevenEltonAdmin', ADMIN_PASSWORD: 'test-password',
  ROOMS: {
    idFromName: code => code,
    get: id => ({ fetch: async () => new Response('ok', { status: 200 }) })
  }
};
const makeRequest = (url, body) => new Request(url, {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
});
const validCreate = await worker.fetch(makeRequest('https://example.test/api/create', {
  username: 'SevenEltonAdmin', password: 'test-password'
}), workerEnv);
const validCreateBody = await validCreate.json();
assert.equal(validCreateBody.ok, true);
assert.match(validCreateBody.code, /^[A-HJ-NP-Z2-9]{5}$/);
const invalidCreate = await worker.fetch(makeRequest('https://example.test/api/create', {
  username: 'SevenEltonAdmin', password: 'wrong'
}), workerEnv);
assert.equal(invalidCreate.status, 401);
const malformed = await worker.fetch(makeRequest('https://example.test/api/create', null), workerEnv);
assert.equal(malformed.status, 400);
const missingSecret = await worker.fetch(makeRequest('https://example.test/api/create', {
  username: 'SevenEltonAdmin', password: 'test-password'
}), { ROOMS: workerEnv.ROOMS });
assert.equal(missingSecret.status, 500);

// O cliente WebSocket tenta novamente e entrega ações enfileiradas após reassociar a sessão.
const retryTimers = [], fakeSockets = [];
class FakeWebSocket {
  constructor(url) { this.url = url; this.readyState = 0; this.sent = []; fakeSockets.push(this); }
  send(raw) { this.sent.push(JSON.parse(raw)); }
  open() { this.readyState = 1; this.onopen?.(); }
  drop() { this.readyState = 3; this.onclose?.(); }
  close() { this.drop(); }
}
const socketContext = {
  WebSocket: FakeWebSocket, location: { protocol: 'https:', host: 'test.local' },
  setTimeout: fn => { retryTimers.push(fn); return retryTimers.length; },
  setInterval: () => 1, clearInterval: () => {}, JSON, Math
};
vm.runInNewContext(readFileSync(new URL('./public/sock.js', import.meta.url), 'utf8') + '\nglobalThis.testIO = io;', socketContext);
const retryClient = socketContext.testIO();
retryClient.on('connect', () => retryClient.emit('admin:resume', { code: 'ABCDE' }));
retryClient.open('ABCDE');
const firstSocket = fakeSockets[0];
retryClient.emit('admin:config', { numTeams: 4 });
firstSocket.open();
assert.deepEqual(firstSocket.sent.map(x => x.e), ['admin:resume', 'admin:config']);
firstSocket.drop();
retryClient.emit('admin:pause');
retryTimers.shift()();
const secondSocket = fakeSockets[1];
secondSocket.open();
assert.deepEqual(secondSocket.sent.map(x => x.e), ['admin:resume', 'admin:pause']);
let staleMessages = 0;
retryClient.on('lobby:update', () => staleMessages++);
retryClient.close();
secondSocket.onmessage({ data: JSON.stringify({ e: 'lobby:update', a: [{}] }) });
assert.equal(staleMessages, 0, 'Mensagens de uma conexão encerrada não podem reabrir a sala.');

  // Terminar antes dos outros não libera a saída em nenhuma modalidade.
  const completeOne = (game, pid, correct = false) => {
    while (game.r.contest.states.get(pid).status !== 'complete') {
      assert.equal(answer(game, pid, correct).ok, true); game.nextQuestionFor(pid);
    }
  };
  for (const mode of ['individual', 'groups', 'elimination']) {
    const game = createRoom(mode), first = join(game, 'Primeiro', 'and'), second = join(game, 'Segundo', mode === 'groups' ? 'and' : 'or');
    const outsider = mode === 'groups' ? join(game, 'Outra equipe', 'or') : null;
    call(game, 'admin:start');
    const page = playerPage(game, first);
    assert.equal(call(game, 'player:leave', {}, game.r.players.get(first).sid).ok, false);
    completeOne(game, first, true); page.snapshot();
    assert.equal(call(game, 'player:leave', {}, game.r.players.get(first).sid).ok, false);
    assert.equal(page.screen(), 's-spectate');
    assert.equal(page.elements.get('leaveSpectate').hidden, true);
    page.click('leaveSpectate'); assert.equal(page.screen(), 's-spectate');
    game.pauseGame(); page.snapshot();
    assert.equal(page.elements.get('leaveSpectate').hidden, true);
    game.resumeGame();
    completeOne(game, second);
    if (outsider) {
      completeOne(game, outsider);
      const observer = playerPage(game, outsider); observer.snapshot();
      assert.equal(observer.screen(), 's-between');
      assert.doesNotMatch(observer.elements.get('bBody').innerHTML, /Sua equipe venceu!/);
      page.snapshot(); assert.match(page.elements.get('bBody').innerHTML, /Sua equipe venceu!/);
      assert.match(page.elements.get('bBody').innerHTML, /Team AND/);
      assert.equal(game.spectatorState(outsider).canReturnHome, false);
      call(game, 'admin:finalStart'); observer.snapshot();
      assert.equal(observer.elements.get('leaveSpectate').hidden, false);
      game.pauseGame(); observer.snapshot(); assert.equal(observer.screen(), 's-spectate');
      game.resumeGame();
      // Reconectar recupera a permissão da equipe espectadora, mas não a dos finalistas.
      const reconnected = playerPage(game, outsider); reconnected.snapshot();
      assert.equal(reconnected.elements.get('leaveSpectate').hidden, false);
      const historyBeforeLeave = structuredClone(game.r.rounds);
      const oldToken = game.r.players.get(outsider).token;
      observer.click('leaveSpectate'); assert.equal(observer.screen(), 's-home');
      assert.equal(observer.closed, true); assert.equal(observer.storage.has('sp_session'), false);
      assert.equal(observer.elements.get('watchAgain').hidden, true);
      assert.equal(game.r.players.has(outsider), false);
      assert.equal(game.socks.has('Outra equipe-socket'), false);
      assert.equal(game.adminState().players.some(p => p.pid === outsider), false);
      assert.deepEqual(game.r.rounds, historyBeforeLeave);
      assert.equal(call(game, 'player:rejoin', { pid: outsider, token: oldToken }, 'admin').ok, false);
      page.snapshot(); completeOne(game, first, true); page.snapshot();
      assert.equal(page.elements.get('leaveSpectate').hidden, true);
      page.click('leaveSpectate'); assert.equal(page.screen(), 's-spectate');
      completeOne(game, second);
    }
    page.snapshot(); assert.equal(page.screen(), 's-end');
    if (mode !== 'individual') assert.match(page.elements.get('eBody').innerHTML, /Sua equipe venceu!/);
    assert.equal(page.elements.get('returnHome').hidden, false);
    const finalBeforeLeave = structuredClone(game.r.result), roundsBeforeLeave = structuredClone(game.r.rounds);
    page.click('returnHome'); assert.equal(page.storage.has('sp_session'), false);
    assert.equal(page.closed, true); assert.equal(page.screen(), 's-home');
    assert.equal(page.elements.get('code').value, '');
    assert.equal(page.elements.get('sessionLoading').hidden, true);
    assert.equal(game.r.players.has(first), false);
    assert.equal(game.socks.has('Primeiro-socket'), false);
    assert.equal(game.adminState().players.some(p => p.pid === first), false);
    assert.deepEqual(game.r.result, finalBeforeLeave); assert.deepEqual(game.r.rounds, roundsBeforeLeave);
  }

  // Eliminados e perdedores de desempates aguardam o vencedor da competição.
  for (const mode of ['individual', 'elimination']) {
    const game = createRoom(mode), loser = join(game, 'Eliminado', 'and'), b = join(game, 'Líder B', 'or'), c = join(game, 'Líder C', 'xor');
    call(game, 'admin:start'); finishPlayers(game, [b, c]); nextRound(game);
    const page = playerPage(game, loser); page.snapshot();
    assert.equal(call(game, 'player:leave', {}, game.r.players.get(loser).sid).ok, false);
    assert.equal(page.elements.get('leaveSpectate').hidden, true);
    page.click('leaveSpectate'); assert.equal(page.screen(), 's-spectate');
  }

  // Parar antes de autorizar a final leva todos ao início, inclusive com lobby já enfileirado.
  const stopped = createRoom(), sa = join(stopped, 'Equipe vencedora', 'and'), sb = join(stopped, 'Equipe perdedora', 'or');
  call(stopped, 'admin:start'); finishPlayers(stopped, [sa]);
  const stoppedPages = [sa, sb].map(pid => playerPage(stopped, pid));
  stoppedPages.forEach(page => { page.snapshot(); assert.equal(page.screen(), 's-between'); });
  call(stopped, 'admin:stop');
  for (const page of stoppedPages) {
    page.receive('game:stopped', { message: 'Encerrada pelo administrador.' });
    page.receive('lobby:update', stopped.lobbyState());
    assert.equal(page.screen(), 's-home'); assert.equal(page.closed, true);
    assert.equal(page.storage.has('sp_session'), false);
    assert.equal(page.elements.get('watchAgain').hidden, true);
    assert.equal(page.elements.get('homeErr').textContent, 'Encerrada pelo administrador.');
  }

  // Equipes no lobby são somente leitura. Troca exige abrir seleção e pode ser cancelada.
  for (const mode of ['groups', 'elimination', 'individual']) {
    const waiting = createRoom(mode), pid = join(waiting, 'Quem sai', 'and');
    join(waiting, 'Quem fica', 'or');
    const page = playerPage(waiting, pid); page.snapshot();
    assert.doesNotMatch(page.elements.get('lTeams').innerHTML, /<button/);
    assert.equal(page.elements.get('changeTeam').hidden, mode === 'individual');
    if (mode !== 'individual') {
      page.click('changeTeam'); assert.equal(page.screen(), 's-join');
      assert.equal(page.elements.get('join').textContent, 'Confirmar troca de equipe');
      assert.equal(page.elements.get('name').hidden, true);
      page.click('back'); assert.equal(page.screen(), 's-lobby');
      assert.equal(waiting.r.players.get(pid).team, 'and');
      page.click('changeTeam'); waiting.r.config.locked = true; page.snapshot();
      assert.equal(page.screen(), 's-lobby'); assert.equal(page.elements.get('changeTeam').disabled, true);
      assert.equal(call(waiting, 'player:switch', { team: 'or' }, 'Quem sai-socket').ok, false);
    }
    waiting.messages.length = 0;
    page.click('leaveLobby'); assert.equal(page.screen(), 's-home'); assert.equal(page.closed, true);
    assert.equal(page.storage.has('sp_session'), false);
    assert.equal(waiting.r.players.has(pid), false); assert.equal(waiting.socks.has('Quem sai-socket'), false);
    const lobbyMessage = waiting.messages.find(m => m.to === 'Quem fica-socket' && m.e === 'lobby:update');
    assert.equal(lobbyMessage.a[0].players.length, 1);
    assert.equal(waiting.messages.filter(m => m.e === 'admin:state').at(-1).a[0].participants, 1);
  }

  // Exclusão definitiva: somente admin no lobby, sem dados de jogadores ou timers restantes.
  const deleted = createRoom(), deletedPid = join(deleted, 'Participante', 'and');
  const deletedPage = playerPage(deleted, deletedPid);
  assert.equal(call(deleted, 'admin:deleteRoom', {}, 'Participante-socket').ok, false);
  join(deleted, 'Outra pessoa', 'or'); call(deleted, 'admin:start');
  let deleteResult;
  await deleted.H['admin:deleteRoom'](deleted.socks.get('admin'), {}, r => { deleteResult = r; });
  assert.equal(deleteResult.ok, false); assert.equal(deleted.r.phase, 'question');
  deleted.stopGame();
  await deleted.ctx.storage.put('init', Date.now());
  await deleted.ctx.storage.setAlarm(Date.now() + 100000);
  await deleted.persist();
  const closedSockets = [];
  for (const s of deleted.socks.values()) s.ws.close = () => closedSockets.push(s.id);
  await deleted.onMessage(deleted.socks.get('admin'), { data: JSON.stringify({ e: 'admin:deleteRoom', a: [{}], id: 99 }) });
  assert.equal(deleted.messages.find(m => m.r === 99)?.d.ok, true);
  assert.equal(closedSockets.length, 3); assert.equal(deleted.socks.size, 0); assert.equal(deleted.r, null);
  assert.equal(await deleted.ctx.storage.get('closed'), true);
  assert.equal(await deleted.ctx.storage.get('init'), undefined);
  assert.equal(await deleted.ctx.storage.get('state'), undefined);
  assert.equal(deleted.ctx.storage.alarmAt, null);
  const notice = deleted.messages.find(m => m.to === 'Participante-socket' && m.e === 'room:closed');
  deletedPage.receive(notice.e, notice.a[0]);
  assert.equal(deletedPage.screen(), 's-home'); assert.equal(deletedPage.closed, true);
  assert.equal(deletedPage.storage.has('sp_session'), false);
  assert.match(deletedPage.elements.get('homeErr').textContent, /encerrada/);
  assert.equal(deletedPage.elements.get('code').value, '');
  const recreated = new Room({ storage: deleted.ctx.storage }, env);
  const closedCheck = await (await recreated.fetch(new Request('https://room/check?code=ABCDE'))).json();
  assert.equal(closedCheck.ok, false); assert.match(closedCheck.error, /encerrada/);
  assert.equal((await recreated.fetch(new Request('https://room/init?code=ABCDE'))).status, 409);
  await recreated.alarm(); assert.equal(await deleted.ctx.storage.get('closed'), true);

  console.log('✅ Banco, formatação, 90s, bônus, três modos, eliminação, desempates, histórico persistido, espectadores, permissões, reconexão, exclusão de salas e controles administrativos passaram.');
} finally { for (const room of rooms) room.clearAllTimers(); }
