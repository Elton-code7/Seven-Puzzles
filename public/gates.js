import { GATES, gateSVG } from './gate-library.js';
function gateTable(g) {
  const rows = g.ins === 1 ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  const head = g.ins === 1 ? '<th>A</th>' : '<th>A</th><th>B</th>';
  return `<table class="tt"><tr>${head}<th>Y</th></tr>${rows.map(r => `<tr>${r.map(v => `<td>${v}</td>`).join('')}<td class="${g.f(...r) ? 'o1' : ''}">${g.f(...r)}</td></tr>`).join('')}</table>`;
}
document.getElementById('gates').innerHTML = GATES.map(g => `
  <article class="card gate">
    <h3>${g.nome}</h3>
    ${gateSVG(g.id)}
    <p>${g.texto}</p>
    <div><span class="muted" style="font-size:.85rem">Matemática:</span> ${g.math.map(m => `<code>${m}</code>`).join(' ')}</div>
    ${gateTable(g)}
    <p class="ex"><b>Exemplo:</b> ${g.ex}</p>
  </article>`).join('');
