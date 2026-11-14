import { questionLabel } from './question-catalog.js';
import { questionMarkup, inline, esc } from './question-view.js';
import { MODES, MODE_RULES } from './rules.js';
import { QUESTION_BANK, prepareQuestion, CATNAMES } from './questions.js';
import { TestCompetition } from './test-competition.js';
const $ = s => document.querySelector(s);
const DIFF = [['Fácil', '😄', '#34d399'], ['Médio', '🤔', '#fbbf24']];
let run = null, tick;
const questionName = questionLabel;
const filtered = () => QUESTION_BANK.filter(q =>
  (!$('#tCat').value || q.cat === $('#tCat').value) &&
  ($('#tDiff').value === '' || q.d === +$('#tDiff').value) &&
  ($('#tTypeFilter').value === 'all' || ($('#tTypeFilter').value === 'text' ? !q.visual : !!q.visual)));
$('#tTypeFilter').innerHTML = `<option value="text">Questões em texto (${QUESTION_BANK.filter(q => !q.visual).length})</option><option value="visual">Identificação de símbolos</option><option value="all">Todas as ${QUESTION_BANK.length} questões</option>`;
$('#tCat').innerHTML = '<option value="">Todas as categorias</option>' + Object.entries(CATNAMES).map(([k,v]) => `<option value="${k}">${v}</option>`).join('');
$('#tDiff').innerHTML = '<option value="">Todos os níveis</option>' + DIFF.map((d,i) => `<option value="${i}">${d[0]}</option>`).join('');
function filterQuestions() {
  const old = $('#tQuestion').value, list = filtered();
  $('#tQuestion').innerHTML = '<option value="">Sortear uma questão</option>' + list.map(q => `<option value="${q.id}">${questionName(q)} · ${CATNAMES[q.cat]} · ${DIFF[q.d][0]}</option>`).join('');
  if (list.some(q => q.id === old)) $('#tQuestion').value = old;
  sync();
}
function sync() {
  const mode = $('#tMode').value, single = mode === 'single';
  $('#tSingle').hidden = !single; $('#tRivals').hidden = single;
  $('#tRivalInfo').textContent = mode === 'final' ? 'Você e um colega fictício do Team AND. As respostas e os tempos do colega são simulados ao concluir a rodada.' : mode === 'individual' ? 'Você e 2 rivais fictícios, sem equipes. As respostas e os tempos dos rivais são simulados ao concluir a rodada.' : '3 equipes de 2 pessoas. Você pertence ao Team AND. As respostas e os tempos dos demais participantes são simulados ao concluir a rodada.';
  $('#tModeRules').textContent = single ? 'Confira uma questão específica ou sorteie entre os filtros abaixo.' : mode === 'final' ? 'Teste isolado da final: você e um colega do Team AND respondem a 6 perguntas médias. O modo em grupo permite testar também a classificação e a autorização da final.' : MODE_RULES(mode);
  $('#tStart').textContent = single ? 'Abrir questão' : 'Começar nova simulação';
  $('#tStart').disabled = single && !filtered().length;
  $('#tError').textContent = single && !filtered().length ? 'Não há questões com esses filtros.' : '';
}
for (const id of ['tCat','tDiff']) $('#' + id).onchange = filterQuestions;
$('#tTypeFilter').onchange = () => { $('#tCat').value = ''; $('#tDiff').value = ''; filterQuestions(); };
$('#tVisuals').onclick = () => { $('#tMode').value = 'single'; $('#tTypeFilter').value = 'visual'; $('#tCat').value = ''; $('#tDiff').value = ''; $('#tQuestion').value = ''; filterQuestions(); $('#tStart').click(); };
$('#tMode').onchange = sync; filterQuestions();

$('#tStart').onclick = () => {
  clearInterval(tick); $('#tSum').hidden = true; $('#tPlay').hidden = true; $('#tError').textContent = '';
  const mode = $('#tMode').value;
  run = { mode, session: mode === 'single' ? null : new TestCompetition(mode, +$('#tAccuracy').value), seen: new Set() };
  $('#tCompetition').hidden = mode === 'single';
  next();
};
function singleQuestion() {
  const list = filtered(), id = $('#tQuestion').value;
  let q = list.find(q => q.id === id);
  if (!q) {
    let fresh = list.filter(q => !run.seen.has(q.id));
    if (!fresh.length) { run.seen.clear(); fresh = list; }
    q = fresh[Math.floor(Math.random() * fresh.length)];
  }
  if (!q) return null;
  run.seen.add(q.id);
  return $('#tShuffle').checked ? prepareQuestion(q) : { ...q, options: [...q.options] };
}
function next() {
  clearInterval(tick); $('#tSum').hidden = true;
  const session = run.session;
  if (session && !session.current()) {
    session.simulateRemaining(); renderCompetition();
    if (session.phase !== 'playing') return summary();
    $('#tPlay').hidden = true; return;
  }
  const q = session ? session.current() : singleQuestion();
  if (!q) { $('#tPlay').hidden = true; $('#tError').textContent = 'Não há questões com esses filtros.'; return; }
  run.q = q; run.done = false; run.paused = false; run.elapsed = 0; run.t0 = performance.now();
  const [dn, face, color] = DIFF[q.d];
  $('#tPlay').dataset.questionId = q.id; $('#tPlay').hidden = false; $('#tPause').hidden = !session; $('#tPause').textContent = 'Pausar';
  $('#tStage').textContent = session ? session.stage === 'final' ? 'Final individual' : MODES[session.mode].name : 'Consulta de questão';
  $('#tCount').textContent = session ? `Pergunta ${session.states.get('p0').answers.length + 1} de ${session.plan.length} · ${session.scores.get('p0').pts} pts` : questionName(q);
  $('#tCatLine').textContent = CATNAMES[q.cat]; $('#tDiffBadge').textContent = `${face} ${dn} · 90s`; $('#tDiffBadge').style.setProperty('--c', color);
  $('#tText').innerHTML = questionMarkup(q); $('#tWhy').hidden = true; $('#tNext').hidden = true; $('#tShow').hidden = !!session; $('#tTimer').hidden = !session;
  $('#tOpts').innerHTML = q.options.map((o,i) => `<button class="opt" data-i="${i}"><b>${'ABCD'[i]}</b><span>${inline(o)}</span></button>`).join('');
  document.querySelectorAll('#tOpts .opt').forEach(b => b.onclick = () => finish(+b.dataset.i));
  if (session) { renderCompetition(); updateTimer(); tick = setInterval(updateTimer, 100); }
  $('#tPlay').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function elapsed() { return run.elapsed + (run.paused ? 0 : performance.now() - run.t0); }
function updateTimer() {
  const left = Math.max(0, 90000 - elapsed());
  $('#tBar').style.width = left / 900 + '%'; $('#tSecs').textContent = run.paused ? `Pausado · ${Math.ceil(left / 1000)}s` : Math.ceil(left / 1000) + 's';
  if (!left) finish(-2);
}
$('#tPause').onclick = () => {
  if (!run?.session || run.done) return;
  if (!run.paused) { run.elapsed = elapsed(); run.paused = true; } else { run.paused = false; run.t0 = performance.now(); }
  document.querySelectorAll('#tOpts .opt').forEach(b => b.disabled = run.paused);
  $('#tPause').textContent = run.paused ? 'Retomar' : 'Pausar'; $('#tSimulate').disabled = run.paused; updateTimer();
};
function finish(index) {
  if (!run || run.done || run.paused) return;
  const ms = elapsed(); if (run.session && ms >= 90000) index = -2;
  run.done = true; clearInterval(tick);
  const q = run.q, result = run.session?.answer('p0', index, ms), ok = result ? result.ok : index === q.ans;
  const message = ok ? `✅ Correto!${result ? ` +${result.pts} pontos (bônus: ${result.bonus})` : ''}` : index === -1 ? 'Resposta revelada' : index === -2 ? '⏰ Tempo esgotado' : '❌ Errou';
  document.querySelectorAll('#tOpts .opt').forEach((b,i) => { b.disabled = true; if (i === q.ans) b.classList.add('good'); else if (i === index) b.classList.add('bad'); });
  $('#tWhy').hidden = false; $('#tWhy').innerHTML = `<b>${message}</b><br>Gabarito: <b>${'ABCD'[q.ans]}) ${inline(q.options[q.ans])}</b><p style="margin-top:6px">${inline(q.why)}</p>`;
  $('#tNext').hidden = false; $('#tShow').hidden = true; $('#tPause').hidden = true;
  $('#tNext').textContent = run.session ? run.session.current() ? 'Próxima pergunta' : 'Concluir rodada e ver ranking' : $('#tTypeFilter').value === 'visual' ? 'Próximo símbolo' : 'Abrir outra questão';
  if (run.session) renderCompetition();
}
$('#tNext').onclick = next;
$('#tShow').onclick = () => finish(-1);
const rankingHTML = list => list.map((entry,i) => `<div class="rk"><span class="pos">${i+1}º</span><span>${esc(entry.name)} <small class="muted">· ${entry.ok} acertos</small></span><span class="pts">${entry.pts}</span></div>`).join('');
function renderCompetition() {
  const session = run.session;
  $('#tCompetitionTitle').textContent = `${MODES[session.mode].name} · rodada ${session.round}`;
  const playing = session.active.includes('p0');
  $('#tCompetitionStatus').textContent = `${session.stage === 'final' ? 'Final individual. ' : ''}${playing ? 'Você participa desta rodada.' : 'Você está na plateia desta rodada.'} Os demais participantes são fictícios.`;
  $('#tRoster').innerHTML = session.players.filter(p => session.active.includes(p.pid)).map(p => `<span class="chip">${esc(p.name)}${p.team ? ' · Team ' + p.team : ''}</span>`).join('');
  $('#tRanking').innerHTML = rankingHTML(session.ranking());
  $('#tSimulateHint').hidden = session.phase !== 'playing'; $('#tSimulate').hidden = session.phase !== 'playing'; $('#tSimulate').disabled = !!run.paused;
}
$('#tSimulate').onclick = () => {
  if (!run?.session || run.paused) return;
  clearInterval(tick); run.done = true; run.session.simulateRemaining(true); renderCompetition(); summary();
};
function summary() {
  clearInterval(tick); $('#tPlay').hidden = true; $('#tSum').hidden = false;
  const session = run.session, o = session.outcome;
  let title, text;
  if (o.type === 'winner') { title = `🏆 ${esc(o.winner.name)} venceu!`; text = session.stage === 'final' ? 'Final individual concluída.' : session.mode === 'elimination' ? 'A última equipe venceu. Não há disputa individual neste modo.' : 'Disputa individual concluída.'; }
  else if (o.type === 'exhausted') { title = 'Empate registrado'; text = 'Não há questões inéditas suficientes para continuar. O simulador mantém o empate sem repetir perguntas.'; }
  else if (o.type === 'final') { title = `🏆 ${esc(o.winner.name)} venceu a fase em equipes`; text = 'A final começa apenas após sua autorização: 6 perguntas médias entre os integrantes da equipe vencedora.'; }
  else if (session.mode === 'elimination') { title = 'Rodada de eliminação concluída'; text = o.eliminated.length ? `Eliminadas: ${o.eliminated.map(t=>t.name).join(', ')}. As equipes restantes seguem com 2 perguntas por pessoa.` : 'Todas as equipes empataram. Ninguém foi eliminado; a próxima rodada terá 2 perguntas por pessoa.'; }
  else { title = '⚔️ Empate em pontos e acertos'; text = `Somente os líderes continuam. A próxima rodada terá ${o.plan.length} pergunta(s) inédita(s) por pessoa.`; }
  $('#tSummaryBody').innerHTML = `<h2>${title}</h2><p class="muted" style="margin-top:12px">${esc(text)}</p><p class="muted" style="margin-top:12px">${session.rounds.length} rodada(s) concluída(s). ${session.phase === 'ended' ? 'Escolha um modo acima para começar outra simulação.' : 'O placar será zerado na próxima etapa.'}</p>`;
  $('#tContinue').hidden = session.phase === 'ended'; $('#tContinue').textContent = o.type === 'final' ? 'Autorizar final individual' : 'Continuar para a próxima rodada';
  $('#tSum').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
$('#tContinue').onclick = () => { run.session.advance(); run.paused = false; run.done = false; renderCompetition(); next(); };
