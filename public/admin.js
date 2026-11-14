import { MODES, MODE_RULES } from './rules.js';
import { participantMarkup } from './question-view.js';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const socket = io();
socket.on('disconnect', () => { $('#connectionStatus').hidden = false; });
socket.on('connect', () => { $('#connectionStatus').hidden = true; });
const STAGE = { main: 'Partida principal', tiebreak: 'Desempate', final: 'Final individual', elimination: 'Eliminação entre equipes' };
let latestState;
let username = '', pw = '', code = '', tick, lastQR = '';
const panels = ['login', 'lobby', 'game', 'between', 'end'];
const view = id => panels.forEach(p => $('#' + p).hidden = p !== id);

let creating = false;
function setPasswordVisible(visible) {
  $('#pw').type = visible ? 'text' : 'password';
  $('#togglePassword').setAttribute('aria-pressed', String(visible));
  $('#togglePassword').setAttribute('aria-label', visible ? 'Ocultar senha' : 'Mostrar senha');
  $('#togglePassword').title = visible ? 'Ocultar senha' : 'Mostrar senha';
  $('#passwordSlash').style.display = visible ? '' : 'none';
  $('#passwordSlash').removeAttribute('hidden');
}
$('#togglePassword').onclick = () => setPasswordVisible($('#pw').type === 'password');
setPasswordVisible(false);
async function createRoom() {
  if (creating) return;
  username = $('#username').value.trim(); pw = $('#pw').value;
  if (!username || !pw) { $('#loginErr').textContent = 'Informe o usuário e a senha.'; return; }
  creating = true; $('#create').disabled = true; $('#loginErr').textContent = '';
  try {
    const response = await fetch('/api/create', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password: pw })
    });
    const r = await response.json();
    if (!r.ok) { $('#loginErr').textContent = r.error; return; }
    code = r.code; setPasswordVisible(false);
    sessionStorage.setItem('sp_admin', JSON.stringify({ username, pw, code }));
    socket.open(code);
  } catch (e) { $('#loginErr').textContent = 'Sem conexão com o servidor.'; }
  finally { creating = false; $('#create').disabled = false; }
}
$('#create').onclick = createRoom;
$('#pw').onkeydown = e => { if (e.key === 'Enter') createRoom(); };
$('#username').onkeydown = e => { if (e.key === 'Enter') $('#pw').focus(); };

socket.on('connect', () => {
  if (username && pw && code) socket.emit('admin:resume', { username, password: pw, code }, r => {
    if (!r.ok) {
      sessionStorage.removeItem('sp_admin'); socket.close(); view('login');
      $('#loginErr').textContent = 'Não foi possível autenticar o painel administrativo.';
    }
  });
});
socket.on('failed', () => {
  $('#loginErr').textContent = 'Conexão instável. O painel está tentando se reconectar automaticamente; mantenha esta aba aberta.';
});
try {
  const saved = JSON.parse(sessionStorage.getItem('sp_admin'));
  if (saved) {
    username = saved.username || ''; pw = saved.pw || ''; code = saved.code || '';
    $('#username').value = username; $('#pw').value = pw;
    if (username && pw && code) socket.open(code);
  }
} catch (e) { sessionStorage.removeItem('sp_admin'); }

$('#cApply').onclick = () => socket.emit('admin:config', {
  mode: $('#cMode').value, locked: $('#cLocked').checked, numTeams: +$('#cTeams').value, min: +$('#cMin').value, max: +$('#cMax').value
}, r => { $('#cMsg').textContent = r.ok ? 'Configuração aplicada ✓' : r.error; });
function modePreview() {
  const solo = $('#cMode').value === 'individual';
  $('#cModeRules').textContent = MODE_RULES($('#cMode').value);
  $('#groupConfig').hidden = solo; $('#balance').hidden = solo;
}
$('#cMode').onchange = modePreview;
$('#balance').onclick = () => socket.emit('admin:balance', r => { $('#cMsg').textContent = r.ok ? 'Participantes distribuídos.' : r.error; });
$('#exportResults').onclick = () => {
  if (!latestState) return;
  const cell = v => '"' + String(v ?? '').replace(/^[=+@\-]/, "'$&").replace(/"/g, '""') + '"';
  const rows = [['Rodada', 'Etapa', 'Tipo', 'Nome', 'Pontos', 'Acertos']];
  for (const round of latestState.rounds || []) for (const entry of round.ranking) rows.push([round.round, STAGE[round.stage], round.kind === 'teams' ? 'Equipe' : 'Participante', entry.name, entry.pts, entry.ok]);
  const blob = new Blob(['\uFEFF' + rows.map(row => row.map(cell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = `seven-${code}-resultados.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$('#start').onclick = () => socket.emit('admin:start', r => { if (!r.ok) $('#startMsg').textContent = r.error; });
$('#skip').onclick = () => socket.emit('admin:skip');
$('#pause').onclick = () => socket.emit('admin:pause');
$('#resume').onclick = () => socket.emit('admin:resumeGame');
$('#pauseBetween').onclick = () => socket.emit('admin:pause');
$('#resumeBetween').onclick = () => socket.emit('admin:resumeGame');
$('#stop').onclick = () => { if (confirm('Parar a partida e voltar todos para a sala de espera?')) socket.emit('admin:stop'); };
$('#stopBetween').onclick = () => { if (confirm('Encerrar esta disputa e voltar para a sala de espera?')) socket.emit('admin:stop'); };
$('#finalStart').onclick = () => socket.emit('admin:finalStart', r => { if (r && !r.ok) alert(r.error); });
$('#again').onclick = () => socket.emit('admin:newgame');

function rank(r) {
  if (!r?.list?.length) return '<p class="muted">Ainda não há pontuação registrada.</p>';
  const max = Math.max(1, ...r.list.map(x => x.pts));
  return r.list.map((x, i) => {
    const title = r.kind === 'teams' ? x.name : x.name;
    return `<div class="rk" style="--c:${x.color}"><i class="bar" style="width:${x.pts / max * 100}%"></i><span class="pos">${i + 1}º</span><span>${esc(title)} <small class="muted">· ${x.ok} acertos${x.n ? ' · ' + x.n + ' jogadores' : ''}</small></span><span class="pts">${x.pts}</span></div>`;
  }).join('');
}
function fmt(ms) {
  if (ms == null || !Number.isFinite(ms)) return '—';
  return `${(ms / 1000).toFixed(1).replace('.', ',')} s`;
}
function renderLobby(s) {
  $('#code').textContent = s.code; $('#url').textContent = location.host;
  if (lastQR !== s.code) {
    lastQR = s.code; $('#qr').innerHTML = '';
    if (typeof QRCode !== 'undefined') new QRCode($('#qr'), {
      text: `${location.origin}/?sala=${s.code}`, width: 256, height: 256, correctLevel: QRCode.CorrectLevel.M
    });
    else $('#qr').textContent = 'QR indisponível. Compartilhe o código acima.';
  }
  const total = s.lobby.players.length;
  $('#count').textContent = `· ${total} jogadores`;
  const c = s.lobby.config;
  if (!['cTeams', 'cMin', 'cMax', 'cMode', 'cLocked'].includes(document.activeElement.id)) {
    $('#cMode').value = c.mode; $('#cLocked').checked = c.locked;
    $('#cTeams').value = c.numTeams; $('#cMin').value = c.min; $('#cMax').value = c.max;
  }
  modePreview(); $('#cMode').disabled = total > 0;
  $('#capacity').textContent = `${s.bankSize} questões no banco. ${c.mode === 'individual' ? `Até ${c.maxIndividual} participantes com perguntas diferentes entre todos.` : 'Até 5 por equipe; perguntas inéditas na equipe até o fim da partida.'}`;
  $('#teams').innerHTML = c.mode === 'individual' ? s.lobby.players.map(p => `<div class="card">${esc(p.name)} <small class="muted">${p.online ? 'online' : 'desconectado'}</small><button class="kick" data-pid="${esc(p.pid)}" title="Remover participante">✕</button></div>`).join('') : s.lobby.teams.map(t => `<div class="card" style="border-left:6px solid ${t.color};padding:12px">
    <b>${esc(t.name)}</b> <small class="muted">${t.members.length}/${s.lobby.config.max}</small>
    <ul class="mlist">${t.members.map(m => `<li class="${m.online ? '' : 'off'}">${esc(m.name)} <button class="kick" data-pid="${esc(m.pid)}" title="Remover participante">✕</button></li>`).join('') || '<li>—</li>'}</ul>
    <button class="remove-team btn ghost block" data-team="${t.id}" ${t.members.length ? '' : 'disabled'} style="margin-top:8px">Remover grupo</button>
  </div>`).join('');
  document.querySelectorAll('.kick').forEach(b => b.onclick = () => socket.emit('admin:kick', { pid: b.dataset.pid }, r => { if (r && !r.ok) $('#startMsg').textContent = r.error; }));
  document.querySelectorAll('.remove-team').forEach(b => b.onclick = () => {
    if (confirm('Remover todos os participantes deste grupo?')) socket.emit('admin:removeTeam', { team: b.dataset.team }, r => { if (r && !r.ok) $('#startMsg').textContent = r.error; });
  });
  $('#start').disabled = !!s.check; $('#startMsg').textContent = s.check || '';
}

function renderParticipants(players, allowRemoval, allowGroupRemoval) {
  if (!players?.length) { $('#gParticipants').innerHTML = '<p class="muted">Nenhum participante conectado à sala.</p>'; return; }
  $('#gParticipants').innerHTML = participantMarkup(players, { allowRemoval, allowGroupRemoval });
  document.querySelectorAll('.premove').forEach(b => b.onclick = () => {
    if (confirm('Remover este participante da sala?')) socket.emit('admin:kick', { pid: b.dataset.pid }, r => { if (r && !r.ok) alert(r.error); });
  });
  document.querySelectorAll('.remove-live-team').forEach(b => b.onclick = () => {
    if (confirm('Remover todos os participantes deste grupo da partida?')) socket.emit('admin:removeTeam', { team: b.dataset.team }, r => { if (r && !r.ok) alert(r.error); });
  });
}
function updateLiveTimers() {
  if (window.__adminPaused) return;
  document.querySelectorAll('.elapsed[data-start]').forEach(el => {
    const start = Number(el.dataset.start), remaining = Number(el.dataset.remaining);
    if (el.closest('.participant-row')?.querySelector('.pstate')?.textContent === 'Respondendo') el.textContent = `Tempo: ${fmt(start + (Date.now() - window.__adminStateAt))} · Restam ${fmt(Math.max(0, remaining - (Date.now() - window.__adminStateAt)))}`;
  });
}
tick = setInterval(updateLiveTimers, 500);

socket.on('admin:state', s => {
  latestState = s; window.__adminStateAt = Date.now();
  if (s.phase !== 'between') clearInterval(window.__adminBetweenTick);
  if (s.phase === 'lobby') {
    window.__adminPaused = false; view('lobby'); renderLobby(s); clearInterval(window.__adminBetweenTick); return;
  }
  if (s.phase === 'paused' && s.pausedFrom === 'between') {
    window.__adminPaused = true; view('between'); const b = s.between;
    $('#bBody').innerHTML = `<div class="big">⏸ Transição pausada</div><p class="muted">O tempo da transição está congelado. Retome quando estiver pronto.</p>${b?.kind === 'tie' ? `<p>${b.teams.map(t => esc(t.name)).join(' e ')} continuam empatados.</p>` : ''}`;
    $('#finalStart').hidden = true; $('#pauseBetween').hidden = true; $('#resumeBetween').hidden = false; $('#stopBetween').hidden = false;
    return;
  }
  if (s.phase === 'question' || (s.phase === 'paused' && s.pausedFrom === 'question')) {
    view('game');
    const paused = s.phase === 'paused'; window.__adminPaused = paused;
    $('#gStatus').textContent = `${paused ? '⏸ Pausada · ' : ''}${MODES[s.mode].name} · ${STAGE[s.stage]} · rodada ${s.round}`;
    $('#gTimer').textContent = paused ? 'PAUSADA' : 'TEMPO INDIVIDUAL';
    $('#gInfo').textContent = `${s.participants} participantes na sala. Cada jogador avança ao terminar a própria pergunta.`;
    $('#pause').hidden = paused; $('#resume').hidden = !paused;
    $('#skip').hidden = paused; $('#stop').hidden = false;
    $('#gRankTitle').textContent = s.ranking?.kind === 'players' ? 'Ranking individual' : 'Ranking das equipes';
    $('#gRank').innerHTML = s.ranking ? rank(s.ranking) : '';
    renderParticipants(s.players, true, s.stage !== 'final' && s.mode !== 'individual');
    return;
  }
  if (s.phase === 'between') {
    clearInterval(window.__adminBetweenTick);
    window.__adminPaused = false; view('between'); const b = s.between;
    $('#bBody').innerHTML = b.kind === 'tie'
      ? `<div class="big">${b.elimination ? 'Próxima rodada' : '⚔️ Empate'}</div><p>${b.teams.map(t => `<b>${esc(t.name)}</b>`).join(' · ')}</p><p>${b.elimination ? (b.eliminated.length ? `Eliminadas: ${b.eliminated.map(t => esc(t.name)).join(', ')}.` : 'Todas empataram; ninguém sai nesta rodada.') : 'Empate em pontos e acertos.'} A próxima rodada terá ${b.plan.length} pergunta(s) inédita(s) por participante.</p><p class="muted" id="tieSeconds" style="margin-top:8px"></p>`
      : `<div class="big">🏆 ${esc(b.team.name)} venceu!</div><p>A final individual terá 6 perguntas médias e inéditas para esta equipe. Libere a disputa quando os participantes estiverem prontos.</p>`;
    $('#finalStart').hidden = !s.canAuthorizeFinal;
    $('#pauseBetween').hidden = b.kind !== 'tie'; $('#resumeBetween').hidden = true;
    $('#stopBetween').hidden = false;
    if (b.kind === 'tie') {
      const end = Date.now() + s.remaining;
      clearInterval(window.__adminBetweenTick);
      window.__adminBetweenTick = setInterval(() => {
        const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
        const el = $('#tieSeconds'); if (el) el.textContent = `Nova rodada em ${left}s`; $('#bBody').dataset.countdown = String(left);
      }, 250);
    }
    return;
  }
  if (s.phase === 'ended') {
    clearInterval(window.__adminBetweenTick);
    window.__adminPaused = false; view('end'); const r = s.result;
    $('#eBody').innerHTML = r.tied ? `<div class="big">Disputa empatada</div><p>${esc(r.reason)}</p>` : `${r.team ? `<p class="muted">Equipe campeã</p><div class="big" style="color:${r.team.color}">🏆 ${esc(r.team.name)}</div>` : ''}${r.player ? `<div class="big">👑 ${esc(r.player.name)}</div><p>Campeão individual · ${r.player.pts} pontos</p>` : '<p>Competição entre grupos concluída.</p>'}`;
    $('#eRank').innerHTML = rank({ kind: r.kind, list: r.ranking });
  }
});
