import { QUESTION_BANK, buildQuestions } from './questions.js';
import { PLAN_MAIN, PLAN_FINAL, speedBonus } from './rules.js';
import { decideRound } from './competition-rules.js';

const TEAMS = ['AND', 'OR', 'XOR'];
export class TestCompetition {
  constructor(mode, accuracy = 0.5, random = Math.random) {
    if (!['individual', 'groups', 'elimination', 'final'].includes(mode)) throw new Error('Modo inválido.');
    this.mode = mode === 'final' ? 'groups' : mode;
    this.random = random; this.accuracy = accuracy; this.history = {}; this.rounds = [];
    this.players = this.mode === 'individual'
      ? Array.from({ length: 3 }, (_, i) => ({ pid: 'p' + i, name: i ? `Rival ${i}` : 'Você', team: null }))
      : TEAMS.slice(0, mode === 'final' ? 1 : 3).flatMap((team, i) => Array.from({ length: 2 }, (_, j) => ({ pid: 'p' + (i * 2 + j), name: i || j ? `Participante ${i * 2 + j + 1}` : 'Você', team })));
    this.round = 0;
    this.startRound(this.players.map(p => p.pid), mode === 'final' ? PLAN_FINAL : PLAN_MAIN, mode === 'final' ? 'final' : this.mode === 'elimination' ? 'elimination' : 'main');
  }
  key(pid) { return this.mode === 'individual' ? 'individual' : this.players.find(p => p.pid === pid).team; }
  capacity(pids, plan) {
    for (const key of new Set(pids.map(pid => this.key(pid)))) {
      const n = pids.filter(pid => this.key(pid) === key).length;
      const seen = new Set(this.history[key] || []);
      for (const d of [0, 1]) if (QUESTION_BANK.filter(q => q.d === d && !seen.has(q.id)).length < n * plan.filter(level => level === d).length) return false;
    }
    return true;
  }
  startRound(pids, plan, stage) {
    if (!this.capacity(pids, plan)) { this.phase = 'ended'; this.outcome = { ...this.outcome, type: 'exhausted' }; return; }
    this.active = pids; this.plan = [...plan]; this.stage = stage; this.round++; this.phase = 'playing';
    this.states = new Map(); this.scores = new Map();
    for (const pid of pids) {
      const key = this.key(pid), seen = new Set(this.history[key] || []), questions = buildQuestions(plan, seen);
      questions.forEach(q => seen.add(q.id)); this.history[key] = [...seen];
      this.states.set(pid, { questions, answers: [] }); this.scores.set(pid, { pts: 0, ok: 0, ms: 0 });
    }
  }
  current(pid = 'p0') {
    const state = this.states.get(pid);
    return this.phase === 'playing' ? state?.questions[state.answers.length] || null : null;
  }
  answer(pid, index, ms) {
    const q = this.current(pid); if (!q) return null;
    const elapsed = Math.min(90000, Math.max(0, ms));
    const ok = index === q.ans && ms < 90000;
    const bonus = ok ? speedBonus(elapsed) : 0, pts = ok ? 100 + bonus : 0;
    const score = this.scores.get(pid); score.pts += pts; score.ok += Number(ok); score.ms += elapsed;
    const result = { q, ok, index, ms: elapsed, pts, bonus }; this.states.get(pid).answers.push(result);
    return result;
  }
  ranking() {
    const players = [...this.scores].map(([pid, score]) => ({ ...this.players.find(p => p.pid === pid), ...score }));
    if (this.mode === 'individual' || this.stage === 'final') return players.sort((a,b) => b.pts-a.pts || b.ok-a.ok || a.ms-b.ms);
    return [...new Set(players.map(p => p.team))].map(id => {
      const members = players.filter(p => p.team === id);
      return { id, name: 'Team ' + id, pts: members.reduce((sum,p)=>sum+p.pts,0), ok: members.reduce((sum,p)=>sum+p.ok,0), ms: members.reduce((sum,p)=>sum+p.ms,0) };
    }).sort((a,b) => b.pts-a.pts || b.ok-a.ok || a.ms-b.ms);
  }
  simulateRemaining(includeYou = false) {
    if (this.phase !== 'playing') return;
    for (const pid of this.active) {
      if (pid === 'p0' && !includeYou) continue;
      let q;
      while ((q = this.current(pid))) {
        const hit = this.random() < this.accuracy;
        this.answer(pid, hit ? q.ans : (q.ans + 1) % q.options.length, 5000 + Math.floor(this.random() * 70000));
      }
    }
    if (this.active.every(pid => !this.current(pid))) this.endRound();
  }
  endRound() {
    if (this.phase !== 'playing' || this.active.some(pid => this.current(pid))) return;
    this.outcome = decideRound(this.mode, this.stage, this.ranking());
    this.rounds.push({ round: this.round, stage: this.stage, ...this.outcome });
    this.phase = this.outcome.type === 'winner' ? 'ended' : 'between';
    if (this.outcome.type === 'next') {
      const ids = this.nextIds(), reserve = this.mode === 'groups' && this.stage !== 'final' ? [...this.outcome.plan, ...PLAN_FINAL] : this.outcome.plan;
      if (!this.capacity(ids, reserve)) { this.phase = 'ended'; this.outcome = { ...this.outcome, type: 'exhausted' }; }
    }
  }
  nextIds() {
    return this.active.filter(pid => this.outcome.ids.includes(this.mode === 'individual' || this.stage === 'final' ? pid : this.players.find(p => p.pid === pid).team));
  }
  advance() {
    if (this.phase !== 'between') return;
    this.startRound(this.nextIds(), this.outcome.plan, this.outcome.nextStage);
  }
}
