import { CATNAMES as CAT } from './question-catalog.js';
import { questionMarkup, inline, participantMarkup } from './question-view.js';
import { MODE_RULES, MODES } from './rules.js';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const socket = io();
socket.on('disconnect', () => { $('#connectionStatus').hidden = false; });
socket.on('connect', () => { $('#connectionStatus').hidden = true; });
const S = { code: null, pid: null, name: null, team: null, pick: null, teams: [], cfg: { min: 2, max: 5 } };
const rules = c => c.mode === 'individual' ? `Entre com seu nome. A disputa é individual, sem equipes (até ${c.maxIndividual} participantes).` : `Máximo de ${c.max} por equipe. Cada equipe precisa de pelo menos ${c.min} ${c.min === 1 ? 'pessoa' : 'pessoas'} para jogar.`;
const DIFF = [['Fácil', '😄', '#34d399'], ['Médio', '🤔', '#fbbf24']];

const STAGE = { main: 'Partida principal', tiebreak: 'Desempate', final: 'Final individual', elimination: 'Eliminação entre equipes' };
const save = () => localStorage.setItem('sp_session', JSON.stringify({ code: S.code, pid: S.pid, token: S.token, name: S.name, team: S.team }));
const show = id => { if (!['s-lobby', 's-join'].includes(id)) { S.editingTeam = false; S.lobby = null; } $$('.screen').forEach(e => e.hidden = e.id !== id); $('#sessionLoading').hidden = true; window.scrollTo(0, 0); };
function clearRoomLink() {
  const params = new URLSearchParams(location.search); params.delete('sala');
  history.replaceState(null, '', location.pathname + (params.size ? '?' + params.toString() : '') + location.hash);
}
let tick;

/* ---------- entrar na sala ---------- */
async function checkCode(code) {
  code = String(code || '').trim().toUpperCase();
  if (code.length !== 5) { show('s-home'); return ($('#homeErr').textContent = 'O código tem 5 caracteres.'); }
  let res; try { res = await (await fetch('/api/check?code=' + encodeURIComponent(code))).json(); } catch (e) { show('s-home'); return ($('#homeErr').textContent = 'Sem conexão com o servidor. Tente de novo.'); }
  if (!res.ok) {
    if (res.closed) return returnToHome(res.error);
    clearRoomLink(); show('s-home'); return ($('#homeErr').textContent = res.error);
  }
  if (S.pid) { socket.close(); localStorage.removeItem('sp_session'); S.pid = null; S.resume = null; }
  $('#homeErr').textContent = ''; S.code = res.code; S.teams = res.teams; S.cfg = res.config; S.pick = null; $('#jRules').textContent = rules(S.cfg);
  $('#jCode').textContent = res.code; renderJoinTeams(); show('s-join'); socket.open(res.code);
}
function teamBtn(t, opts = {}) {
  const n = t.members.length, full = n >= S.cfg.max && !opts.mine;
  const need = n > 0 && n < S.cfg.min ? ` · faltam ${S.cfg.min - n}` : '';
  const tag = opts.readonly ? 'div' : 'button';
  return `<${tag} class="team ${opts.readonly ? 'team-summary' : ''} ${opts.sel ? 'sel' : ''}" data-id="${t.id}" style="--c:${t.color}" ${!opts.readonly && full ? 'disabled' : ''}>
    <b>${t.name}</b><small>${n}/${S.cfg.max}${need}</small>
    ${opts.list ? `<ul class="mlist">${t.members.map(m => `<li class="${m.name === S.name ? 'me' : ''} ${m.online ? '' : 'off'}">${esc(m.name)}</li>`).join('')}</ul>` : ''}</${tag}>`;
}
function renderJoinTeams() {
  $('#jMode').textContent = MODES[S.cfg.mode]?.name || ''; $('#jModeRules').textContent = MODE_RULES(S.cfg.mode);
  $('#jTeamTitle').hidden = S.cfg.mode === 'individual'; $('#jTeams').hidden = S.cfg.mode === 'individual';
  $('#nameLabel').hidden = $('#name').hidden = !!S.editingTeam;
  $('#back').textContent = S.editingTeam ? 'Cancelar troca' : 'Voltar';
  $('#join').textContent = S.editingTeam ? 'Confirmar troca de equipe' : S.cfg.mode === 'individual' ? 'Entrar na disputa' : 'Entrar na equipe';
  $('#jTeams').innerHTML = S.teams.map(t => teamBtn(t, { sel: S.pick === t.id, mine: !!S.pid && t.id === S.team })).join('');
  $$('#jTeams .team').forEach(b => b.onclick = () => { S.pick = b.dataset.id; renderJoinTeams(); });
}
$('#go').onclick = () => checkCode($('#code').value);
$('#code').onkeydown = e => { if (e.key === 'Enter') checkCode(e.target.value); };
$('#back').onclick = () => {
  if (S.editingTeam && S.lobby) { S.editingTeam = false; S.pick = S.team; renderLobby(S.lobby); }
  else returnToHome();
};
$('#join').onclick = () => {
  if (S.editingTeam) {
    if ($('#join').disabled) return;
    $('#join').disabled = true;
    return socket.emit('player:switch', { team: S.pick }, res => {
      $('#join').disabled = false;
      if (!res?.ok) { $('#joinErr').textContent = res?.error || 'Não foi possível trocar de equipe.'; return; }
      S.editingTeam = false; S.team = res.team; save();
    });
  }
  socket.emit('player:join', { code: S.code, name: $('#name').value, team: S.pick }, res => {
    if (!res.ok) { $('#joinErr').textContent = res.error; return socket.emit('room:check', S.code, r => { if (r.ok) { S.teams = r.teams; S.cfg = r.config; if (!S.teams.some(t => t.id === S.pick)) S.pick = null; $('#jRules').textContent = rules(S.cfg); renderJoinTeams(); } }); }
    Object.assign(S, { pid: res.pid, token: res.token, name: res.name, team: res.team }); save();
  });
};

/* ---------- leitor de QR ---------- */
let qr;
$('#scan').onclick = async () => {
  if (typeof Html5Qrcode === 'undefined') return ($('#homeErr').textContent = 'Leitor indisponível. Digite o código manualmente.');
  $('#modal').hidden = false; $('#scanErr').textContent = ''; qr = new Html5Qrcode('reader');
  try {
    await qr.start({ facingMode: 'environment' }, { fps: 10, qrbox: 230 }, txt => {
      let c = txt; try { c = new URL(txt).searchParams.get('sala') || txt; } catch (e) { }
      stopScan(); checkCode(c);
    });
  } catch (e) { $('#scanErr').textContent = 'Não foi possível abrir a câmera. Permita o acesso ou digite o código.'; }
};
async function stopScan() { $('#modal').hidden = true; try { await qr.stop(); qr.clear(); } catch (e) { } }
$('#stopScan').onclick = stopScan;

/* ---------- sala de espera ---------- */
function renderLobby(st) {
  S.lobby = st;
  S.cfg = st.config; S.teams = st.teams;
  if (!S.pid) { $('#jRules').textContent = rules(S.cfg); renderJoinTeams(); return; }
  const me = S.cfg.mode === 'individual' ? st.players.find(p => p.pid === S.pid) : st.teams.flatMap(t => t.members.map(m => ({ ...m, t: t.id }))).find(m => m.pid === S.pid);
  if (!me) return;
  S.team = me.t || null; save(); S.spectatorHome = false; spectator = null; finalResult = null; $('#watchAgain').hidden = true;
  $('#lCode').textContent = S.code; $('#lName').textContent = S.name; clearInterval(tick);
  $('#lMode').textContent = MODES[S.cfg.mode].name; $('#lModeRules').textContent = MODE_RULES(S.cfg.mode);
  $('#lHint').textContent = S.cfg.mode === 'individual' ? 'Todos disputam individualmente.' : S.cfg.locked ? 'As inscrições e trocas de equipe estão fechadas.' : 'Equipe confirmada. Para mudar, use “Trocar de equipe” e confirme sua nova escolha.';
  $('#changeTeam').hidden = S.cfg.mode === 'individual'; $('#changeTeam').disabled = S.cfg.locked;
  $('#lTeams').innerHTML = S.cfg.mode === 'individual' ? st.players.map(p => `<div class="card">${esc(p.name)} <small class="muted">${p.online ? 'online' : 'desconectado'}</small></div>`).join('') : st.teams.map(t => teamBtn(t, { sel: t.id === S.team, list: true, readonly: true })).join('');
  if (S.editingTeam && !S.cfg.locked && S.cfg.mode !== 'individual') { renderJoinTeams(); show('s-join'); return; }
  S.editingTeam = false;
  show('s-lobby');
}
socket.on('lobby:update', renderLobby);
$('#changeTeam').onclick = () => {
  if (!S.pid || !S.lobby || S.cfg.locked || S.cfg.mode === 'individual') return;
  S.editingTeam = true; S.pick = S.team;
  $('#jCode').textContent = S.code; $('#jRules').textContent = rules(S.cfg); $('#joinErr').textContent = ''; $('#join').disabled = false;
  renderJoinTeams(); show('s-join');
};
$('#leaveLobby').onclick = () => { if (S.pid && S.lobby) leaveRoom(); };
socket.on('player:kicked', () => { localStorage.removeItem('sp_session'); alert('Você foi removido da sala pelo professor.'); location.href = '/'; });

/* ---------- perguntas ---------- */
function countdown(ms, total) {
  clearInterval(tick); const end = performance.now() + ms;
  const upd = () => { const left = Math.max(0, end - performance.now()); $('#qBar').style.width = (left / (total * 1000) * 100) + '%'; $('#qSecs').textContent = Math.ceil(left / 1000) + 's'; if (!left) clearInterval(tick); };
  upd(); tick = setInterval(upd, 100);
}
socket.on('game:question', q => {
  const [dn, face, col] = DIFF[q.d];
  S.spectatorHome = false; spectator = null; finalResult = null; $('#watchAgain').hidden = true;
  $('#qStage').textContent = S.cfg.mode === 'individual' && q.stage === 'main' ? 'Partida individual' : STAGE[q.stage]; $('#qCount').textContent = `Pergunta ${q.n} de ${q.total}`;
  $('#qCat').textContent = CAT[q.cat]; $('#qDiff').textContent = `${face} ${dn}`; $('#qDiff').style.setProperty('--c', col);
  $('#qText').innerHTML = questionMarkup(q); $('#qMsg').textContent = '';
  $('#qOpts').innerHTML = q.options.map((o, i) => `<button class="opt" data-i="${i}"><b>${'ABCD'[i]}</b><span>${inline(o)}</span></button>`).join('');
  const lock = idx => { $$('.opt').forEach(b => { b.disabled = true; if (+b.dataset.i === idx) b.classList.add('picked'); }); };
  $$('.opt').forEach(b => b.onclick = () => {
    const idx = +b.dataset.i; lock(idx);
    socket.emit('player:answer', { idx, questionId: q.id }, r => { $('#qMsg').textContent = r.ok ? 'Resposta enviada! Veja a explicação.' : (r.error || 'Não deu tempo de registrar.'); });
  });
  if (q.picked !== null) { lock(q.picked); $('#qMsg').textContent = 'Resposta enviada! Veja a explicação.'; }
  else if (q.remaining <= 0) { lock(-1); $('#qMsg').textContent = 'Tempo esgotado.'; }
  countdown(q.remaining, q.time); show('s-q');
});
let spectateAt = 0, spectator, finalResult;
function renderSpectator(s) {
  spectator = s; finalResult = null; $('#watchAgain').textContent = 'Voltar a acompanhar a disputa'; spectateAt = Date.now(); clearInterval(tick);
  $('#leaveSpectate').hidden = !s.canReturnHome;
  $('#spWait').hidden = !!s.canReturnHome;
  if (!s.canReturnHome) S.spectatorHome = false;
  $('#spTitle').textContent = `${STAGE[s.stage]} · rodada ${s.round}${s.phase === 'paused' ? ' · Pausada' : ''}`;
  $('#spPlayers').innerHTML = participantMarkup(s.players, { ownTeam: S.team });
  $('#spRank').innerHTML = rankHTML(s.ranking);
  $('#watchAgain').hidden = !S.spectatorHome;
  if (!S.spectatorHome) show('s-spectate');
  tick = setInterval(() => {
    if (spectator.phase === 'paused') return;
    $$('#spPlayers [data-answering="true"]').forEach(el => { el.textContent = `Tempo: ${((Number(el.dataset.elapsed) + Date.now() - spectateAt) / 1000).toFixed(1)}s · Restam ${Math.max(0, Math.ceil((Number(el.dataset.left) - (Date.now() - spectateAt)) / 1000))}s`; });
  }, 250);
}
socket.on('game:spectate', renderSpectator);
$('#leaveSpectate').onclick = () => { if (spectator?.canReturnHome) leaveRoom(); };
$('#watchAgain').onclick = () => { S.spectatorHome = false; if (finalResult) { $('#watchAgain').hidden = true; show('s-end'); } else if (spectator) renderSpectator(spectator); };
socket.on('game:paused', p => { clearInterval(tick); if (!S.spectatorHome) show('s-pause'); });
socket.on('game:complete', p => {
  clearInterval(tick);
  $('#rBody').innerHTML = `<div class="center"><div class="big">✅ Etapa concluída</div><p class="muted">Você respondeu às ${p.total} perguntas desta etapa. Aguarde o restante da disputa.</p></div>`;
  $('#rRankTitle').textContent = ''; $('#rRank').innerHTML = ''; show('s-reveal');
});
function returnToHome(message = '') {
  clearInterval(tick); localStorage.removeItem('sp_session'); socket.close();
  clearRoomLink();
  Object.assign(S, { pid: null, token: null, resume: null, code: null, name: null, team: null, pick: null, teams: [], spectatorHome: false });
  $('#code').value = ''; $('#name').value = '';
  for (const id of ['jCode', 'lCode', 'lName', 'jTeams', 'lTeams', 'spPlayers', 'spRank', 'eBody', 'eRank', 'bBody', 'rBody', 'rRank', 'qText', 'qOpts']) $('#' + id).innerHTML = '';
  spectator = null; finalResult = null;
  $('#watchAgain').hidden = true; $('#connectionStatus').hidden = true;
  $('#homeErr').textContent = message;
  show('s-home');
}
socket.on('game:stopped', p => returnToHome(p?.message || 'A partida foi encerrada.'));
socket.on('room:closed', p => returnToHome(p?.message || 'Esta sala foi encerrada pelo administrador.'));

let leaving = false;
function leaveRoom() {
  if (leaving) return;
  leaving = true;
  const buttons = [$('#leaveSpectate'), $('#returnHome'), $('#leaveLobby')];
  buttons.forEach(b => { b.disabled = true; b.textContent = 'Saindo da sala…'; });
  socket.emit('player:leave', {}, r => {
    leaving = false;
    buttons.forEach(b => { b.disabled = false; b.textContent = b.id === 'leaveLobby' ? 'Sair da sala' : 'Voltar à página inicial'; });
    if (r?.ok) returnToHome();
    else alert(r?.error || 'Não foi possível sair da sala. Tente novamente.');
  });
}

/* ---------- resultado ---------- */
function rankHTML(r) {
  const max = Math.max(1, ...r.list.map(x => x.pts));
  return r.list.map((x, i) => {
    const mine = r.kind === 'teams' ? x.id === S.team : x.name === S.name;
    const label = r.kind === 'teams' ? `${esc(x.name)} <small class="muted">· ${x.ok} acertos</small>` : `${esc(x.name)} <small class="muted">· ${x.ok} acertos</small>`;
    return `<div class="rk ${mine ? 'me' : ''}" style="--c:${x.color}"><i class="bar" style="width:${x.pts / max * 100}%"></i><span class="pos">${i + 1}º</span><span>${label}${mine ? ' (você)' : ''}</span><span class="pts">${x.pts}</span></div>`;
  }).join('');
}
socket.on('game:reveal', p => {
  clearInterval(tick);
  let h = '';
  if (p.inGame) {
    if (p.result === 'ok') h = `<div class="res ok">✅ Correto!</div><p class="center">+${p.gained} pontos${p.bonus ? ` (inclui +${p.bonus} de bônus de velocidade ⚡)` : ''}</p>`;
    else h = `<div class="res ${p.result}">${p.result === 'none' ? '⏰ Sem resposta' : '❌ Errou'}</div>
      <div class="why"><b>Resposta correta: ${inline(p.correctText)}</b><p style="margin-top:6px">${inline(p.why)}</p></div>`;
    if (p.result === 'ok') h += `<div class="why">${inline(p.why)}</div>`;
    h += `<p class="center muted">Seus pontos: <b style="color:var(--text)">${p.total}</b></p>`;
  }
  $('#rBody').innerHTML = h;
  $('#rRankTitle').textContent = p.ranking.kind === 'teams' ? 'Ranking das equipes' : 'Ranking individual';
  $('#rRank').innerHTML = rankHTML(p.ranking); show('s-reveal');
});

/* ---------- empate / vencedora / final ---------- */
socket.on('game:between', b => {
  clearInterval(tick);
  $('#bBody').innerHTML = b.kind === 'tie'
    ? `<div class="big">${b.elimination ? 'Próxima rodada' : '⚔️ Empate!'}</div><p>${b.teams.map(t => `<b>${esc(t.name)}</b>`).join(' · ')}</p>
       <p class="muted">${b.elimination ? (b.eliminated.length ? `Eliminadas: ${b.eliminated.map(t => esc(t.name)).join(', ')}.` : 'Todas as equipes empataram. Ninguém foi eliminado.') : 'Empate em pontos e acertos.'} A próxima rodada terá ${b.plan.length} pergunta(s) inédita(s) por participante, com placar zerado.</p>`
    : `<div class="big">🏆 ${b.team.id === S.team ? 'Sua equipe venceu!' : `<span style="color:${b.team.color}">${esc(b.team.name)}</span> venceu!`}</div>
       ${b.team.id === S.team ? `<h2 style="color:${b.team.color}">${esc(b.team.name)}</h2>` : ''}
       <p class="muted">A final terá 6 perguntas médias e inéditas para os integrantes desta equipe. O professor precisa autorizar o início.</p>`;
  if (!S.spectatorHome) show('s-between');
});
socket.on('game:end', r => {
  clearInterval(tick); finalResult = r; $('#watchAgain').hidden = !S.spectatorHome; $('#watchAgain').textContent = 'Ver resultado da disputa';
  $('#eBody').innerHTML = r.tied ? `<div class="big">Disputa empatada</div><p>${esc(r.reason)}</p>` :
    `${r.team ? `<p class="${r.team.id === S.team ? 'big' : 'muted'}">${r.team.id === S.team ? 'Sua equipe venceu!' : 'Equipe campeã'}</p><div class="big" style="color:${r.team.color}">🏆 ${esc(r.team.name)}</div>` : ''}
    ${r.player ? `<div class="card glow" style="margin:18px 0"><div class="big">👑 ${esc(r.player.name)}</div><p class="muted">Campeão individual · ${r.player.pts} pontos · ${r.player.ok} acertos</p></div>` : '<p class="muted">Competição concluída, sem disputa individual.</p>'}`;
  $('#eRank').innerHTML = rankHTML({ kind: r.kind, list: r.ranking }); if (!S.spectatorHome) show('s-end');
});

$('#returnHome').onclick = () => { if (finalResult) leaveRoom(); };

/* ---------- conexão e reconexão ---------- */
function expiredSession() {
  returnToHome('Sua sessão expirou ou foi removida. Entre novamente com o código da sala.');
}
const sala = new URLSearchParams(location.search).get('sala');
socket.on('connect', () => {
  $('#homeErr').textContent = '';
  if (S.pid) socket.emit('player:rejoin', { code: S.code, pid: S.pid, token: S.token }, r => { if (r.ok) S.cfg = r.config; else expiredSession(); });
  else if (S.resume) {
    const ses = S.resume;
    socket.emit('player:rejoin', { code: ses.code, pid: ses.pid, token: ses.token }, r => {
      S.resume = null;
      if (r.ok) Object.assign(S, { code: r.code, pid: ses.pid, token: ses.token, name: r.name, team: r.team, cfg: r.config });
      else expiredSession();
    });
  }
});
socket.on('failed', () => {
  $('#loadingText').textContent = 'Conexão instável. Tentando recuperar sua sessão…';
  $('#homeErr').textContent = 'Conexão instável. Tentando reconectar à sala automaticamente; mantenha esta aba aberta.';
});
(function init() {
  let ses = null; try { ses = JSON.parse(localStorage.getItem('sp_session')); } catch (e) { }
  if (ses && ses.pid && ses.code && ses.token && (!sala || sala.toUpperCase() === ses.code)) { $('#loadingText').textContent = 'Restaurando sua partida…'; S.resume = ses; socket.open(ses.code); }
  else if (sala) { $('#code').value = sala.toUpperCase(); checkCode(sala); }
  else { localStorage.removeItem('sp_session'); show('s-home'); }
})();
