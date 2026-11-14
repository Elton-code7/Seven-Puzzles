import { gateSVG } from './gate-library.js';
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const inline = s => esc(s).replace(/`([^`]+)`|\*\*([^*]+)\*\*/g, (_, code, bold) => code !== undefined ? `<code>${code}</code>` : `<strong>${bold}</strong>`);
export function questionMarkup(q) {
  if (q.visual) return `<div class="q-layout"><p class="q-instruction">${esc(q.text)}</p>${`<div class="q-gate">${gateSVG(q.visual, false)}</div>`}</div>`;
  const blocks = String(q.text || '').trim().split(/\n\s*\n/);
  return '<div class="q-layout">' + (q.title ? `<div class="q-context">${esc(q.title)}</div>` : '') + blocks.map(block => {
    const lines = block.split('\n');
    if (lines.every(line => line.startsWith('- '))) return `<ul class="q-list">${lines.map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    if (lines[0].trim().startsWith('|')) {
      const rows = lines.filter(line => !/^\|[\s:|\-]+\|$/.test(line.trim())).map(line => line.trim().replace(/^\||\|$/g, '').split('|').map(x => x.trim()));
      return `<div class="q-table-wrap"><table class="q-table"><thead><tr>${rows[0].map(x => `<th scope="col">${inline(x)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(x => `<td>${inline(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    return `<p class="q-instruction">${inline(block).replace(/\n/g, '<br>')}</p>`;
  }).join('') + '<p class="q-note">0 significa falso; 1 significa verdadeiro.<br>Leia ¬ como NÃO, · como E, + como OU e ⊕ como OU exclusivo. Nas expressões booleanas, + não é soma aritmética.</p></div>';
}
export function participantMarkup(players, { ownTeam = null, allowRemoval = false, allowGroupRemoval = false } = {}) {
  const groups = new Map();
  for (const p of players) {
    const key = p.team || null;
    if (!groups.has(key)) groups.set(key, { id: key, name: key ? p.teamName : 'Participantes', color: p.teamColor, members: [] });
    groups.get(key).members.push(p);
  }
  const byName = (a, b) => String(a.name).localeCompare(String(b.name), 'pt-BR', { numeric: true, sensitivity: 'base' }) || String(a.pid || a.id || '').localeCompare(String(b.pid || b.id || ''));
  return [...groups.values()].sort(byName).map(group => {
    const mine = !!group.id && group.id === ownTeam;
    return `<section class="participant-group${mine ? ' own-team' : ''}" data-team="${esc(group.id || '')}" style="--team-color:${esc(group.color || 'var(--line)')}">
      <div class="participant-group-head"><div><h3>${esc(group.name)}${mine ? ' <span class="own-team-label">Sua equipe</span>' : ''}</h3><p class="muted">${group.members.length} ${group.members.length === 1 ? 'participante' : 'participantes'}</p></div>
      ${allowGroupRemoval && group.id ? `<button class="btn ghost remove-live-team" data-team="${esc(group.id)}">Remover grupo</button>` : ''}</div>
      <div class="participant-group-members">${group.members.sort(byName).map(p => `<div class="participant-row">
        <div class="pname">${esc(p.name)}<small>${p.online ? 'online' : 'desconectado'}</small></div>
        <div class="pmeta"><span class="pstate">${esc(p.status)}</span><small>${p.total ? `Pergunta ${p.question}/${p.total} · ${p.answered} respondidas` : 'Aguardando partida'}</small></div>
        <div class="pmeta"><small class="elapsed" data-start="${p.elapsedMs}" data-remaining="${p.remainingMs}" data-elapsed="${p.elapsedMs}" data-left="${p.remainingMs}" data-answering="${p.status === 'Respondendo'}">${p.status === 'Respondendo' ? `Tempo: ${(p.elapsedMs / 1000).toFixed(1)}s · Restam ${Math.ceil(p.remainingMs / 1000)}s` : ''}</small><small>Última resposta: ${p.lastResponseMs == null ? '—' : (p.lastResponseMs / 1000).toFixed(1) + 's'}</small><small>${p.points} pts · ${p.correct} acertos</small></div>
        ${allowRemoval ? `<button class="premove" data-pid="${esc(p.pid)}" title="Remover participante">Remover</button>` : ''}
      </div>`).join('')}</div>
    </section>`;
  }).join('');
}
