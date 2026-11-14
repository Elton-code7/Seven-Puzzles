import { PLAN_MAIN, PLAN_FINAL } from './rules.js';

// Decisão compartilhada entre a sala real e o simulador local.
export function decideRound(mode, stage, ranking) {
  const individual = mode === 'individual' || stage === 'final';
  const kind = individual ? 'players' : 'teams';
  const rk = [...ranking].sort((a, b) => b.pts - a.pts || b.ok - a.ok || a.ms - b.ms);
  if (!rk.length) throw new Error('A disputa não tem participantes.');
  const top = rk.filter(t => t.pts === rk[0].pts && t.ok === rk[0].ok);
  const ids = entries => entries.map(t => individual ? t.pid : t.id);
  const result = { kind, ranking: rk, leaders: top, eliminated: [] };
  if (individual) return top.length === 1
    ? { ...result, type: 'winner', winner: top[0] }
    : { ...result, type: 'next', ids: ids(top), plan: [1], nextStage: stage === 'final' ? 'final' : 'tiebreak' };
  if (mode === 'elimination') {
    const last = rk.at(-1), losers = rk.filter(t => t.pts === last.pts && t.ok === last.ok);
    const eliminated = losers.length === rk.length ? [] : losers;
    const survivors = rk.filter(t => !eliminated.includes(t));
    return survivors.length === 1
      ? { ...result, type: 'winner', winner: survivors[0], eliminated }
      : { ...result, type: 'next', ids: ids(survivors), leaders: survivors, eliminated, plan: [0, 1], nextStage: 'elimination' };
  }
  return top.length === 1
    ? { ...result, type: 'final', winner: top[0], ids: ids(top), plan: PLAN_FINAL, nextStage: 'final' }
    : { ...result, type: 'next', ids: ids(top), plan: PLAN_MAIN, nextStage: 'tiebreak' };
}
