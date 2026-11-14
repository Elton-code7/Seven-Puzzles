import assert from 'node:assert/strict';
import { TestCompetition } from './public/test-competition.js';
import { decideRound } from './public/competition-rules.js';
import { auditQuestions } from './scripts/audit-questions.mjs';

assert.equal(auditQuestions().checked, 161);
const winManual = session => { while (session.current()) session.answer('p0', session.current().ans, 22500); session.simulateRemaining(); };
const unique = session => { for (const ids of Object.values(session.history)) assert.equal(new Set(ids).size, ids.length); };
const solo = new TestCompetition('individual', 0);
winManual(solo); assert.equal(solo.phase, 'ended'); assert.equal(solo.outcome.winner.pid, 'p0'); assert.equal(solo.scores.get('p0').pts, 7 * 125);
const groups = new TestCompetition('groups', 0);
winManual(groups); assert.equal(groups.phase, 'between'); assert.equal(groups.outcome.type, 'final'); assert.equal(groups.stage, 'main');
groups.advance(); assert.equal(groups.stage, 'final'); assert.deepEqual(groups.active, ['p0','p1']); assert.equal(groups.plan.length, 6);
winManual(groups); assert.equal(groups.phase, 'ended'); assert.equal(groups.outcome.winner.pid, 'p0'); unique(groups);
const elimination = new TestCompetition('elimination', 0);
// Uma equipe sai, duas continuam e há uma vencedora sem final individual.
for (const pid of elimination.active) while(elimination.current(pid)) elimination.answer(pid, pid === 'p0' || pid === 'p2' ? elimination.current(pid).ans : -1, 45000);
elimination.endRound(); assert.equal(elimination.outcome.eliminated.length, 1); assert.equal(elimination.phase, 'between');
elimination.advance(); assert.equal(elimination.plan.length, 2); assert.equal(elimination.active.length, 4);
winManual(elimination); assert.equal(elimination.phase, 'ended'); assert.equal(elimination.outcome.winner.id, 'AND'); assert.equal(elimination.stage, 'elimination'); unique(elimination);
// Quem foi eliminado acompanha a simulação dos sobreviventes.
const spectator = new TestCompetition('elimination', 0);
for (const pid of spectator.active) while(spectator.current(pid)) spectator.answer(pid, ['p2','p4'].includes(pid) ? spectator.current(pid).ans : -1, 45000);
spectator.endRound(); spectator.advance(); assert.equal(spectator.active.includes('p0'), false);
assert.equal(spectator.current(), null); spectator.simulateRemaining(); assert.equal(spectator.phase, 'between');
const tied = new TestCompetition('individual', 0); tied.simulateRemaining(true);
assert.equal(tied.outcome.type, 'next'); assert.equal(tied.outcome.plan.length, 1);
tied.advance(); assert.equal(tied.stage, 'tiebreak'); winManual(tied); assert.equal(tied.outcome.winner.pid, 'p0'); unique(tied);
const groupTie = new TestCompetition('groups', 0); groupTie.simulateRemaining(true); groupTie.advance();
assert.equal(groupTie.stage, 'tiebreak'); winManual(groupTie); groupTie.advance(); assert.equal(groupTie.stage, 'final'); unique(groupTie);
const final = new TestCompetition('final', 0); assert.equal(final.stage, 'final'); assert.equal(final.active.length, 2); winManual(final); assert.equal(final.phase, 'ended');
const exhausted = new TestCompetition('elimination', 0); let rounds = 0;
while (exhausted.phase !== 'ended' && rounds++ < 100) { exhausted.simulateRemaining(true); exhausted.advance(); }
assert.equal(exhausted.outcome.type, 'exhausted'); unique(exhausted);
const late = new TestCompetition('individual',0);const q=late.current();assert.equal(late.answer('p0',q.ans,90000).pts,0);
assert.equal(late.answer('p0',late.current().ans,45000).pts,100);
const result = decideRound('individual','main',[{pid:'a',pts:100,ok:1,ms:1},{pid:'b',pts:100,ok:1,ms:99}]);
assert.equal(result.type,'next');
console.log('✅ Simulador: modos, ranking, final autorizada, eliminação, plateia, desempates, bônus, esgotamento e identidade das questões passaram.');
