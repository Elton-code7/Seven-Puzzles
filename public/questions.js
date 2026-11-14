import { DOCUMENT_QUESTIONS } from './question-bank.js';
import { GATES } from './gate-library.js';
export { CATNAMES } from './question-catalog.js';
import { CATNAMES } from './question-catalog.js';
export const shuffle = source => {
  const list = [...source];
  for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
  return list;
};
const visuals = GATES.map((gate, i) => ({
  id: 'visual-' + gate.id, cat: ['AND', 'OR', 'NOT'].includes(gate.id) ? 'gates' : 'derived', d: 0, visual: gate.id,
  text: 'Observe o símbolo lógico abaixo. Qual conectivo ele representa?',
  options: [gate.id, ...[1, 2, 3].map(offset => GATES[(i + offset) % GATES.length].id)], ans: 0,
  why: `${gate.id}: ${gate.texto} O símbolo identifica a função lógica dessa porta.`, time: 90
}));
export const QUESTION_BANK = [...DOCUMENT_QUESTIONS, ...visuals];
export const individualCapacity = plan => Math.min(...[0, 1].filter(d => plan.includes(d)).map(d => Math.floor(QUESTION_BANK.filter(q => q.d === d).length / plan.filter(level => level === d).length)));
export function prepareQuestion(q) {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map(i => q.options[i]), ans: order.indexOf(q.ans) };
}
// A exclusão usa a identidade da questão, independente da ordem das alternativas.
// Nunca completa uma sequência repetindo itens quando o banco se esgota.
export function buildQuestions(plan, excluded = new Set(), category = null) {
  const used = new Set(excluded), list = [];
  for (const [i, d] of plan.entries()) {
    const pool = QUESTION_BANK.filter(q => q.d === d && !used.has(q.id) && (!category || q.cat === category));
    // Nas rodadas completas, dê espaço explícito aos símbolos e à nova categoria.
    // O histórico continua soberano: nunca repita uma questão para preencher a cota.
    const visual = !category && plan.length >= 6 && i === plan.indexOf(0) ? pool.filter(q => q.visual) : [];
    const digital = !category && plan.length >= 6 && i === plan.indexOf(1) ? pool.filter(q => q.cat === 'digital') : [];
    const written = !category && plan.length >= 6 && list.some(q => q.visual) ? pool.filter(q => !q.visual) : [];
    const preferred = visual.length ? visual : digital.length ? digital : written.length ? written : pool;
    const counts = q => list.filter(item => item.cat === q.cat).length;
    const minimum = Math.min(...preferred.map(counts));
    const q = shuffle(preferred.filter(q => counts(q) === minimum))[0];
    if (!q) throw new Error('Não há questões inéditas suficientes para esta rodada.');
    used.add(q.id); list.push(prepareQuestion(q));
  }
  return list;
}
export const GEN = Object.fromEntries(Object.keys(CATNAMES).map(cat => [cat, d => buildQuestions([d], new Set(), cat)[0]]));
