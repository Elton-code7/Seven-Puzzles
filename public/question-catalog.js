export const CATNAMES = { gates: 'Portas lógicas', derived: 'Portas derivadas', truth: 'Tabelas-verdade', algebra: 'Álgebra booleana', circuits: 'Circuitos combinacionais', digital: 'Circuitos Digitais' };
export const QUESTION_SOURCES = [
  { file: '100_questoes_logica_digital.md', prefix: 'md-', expected: 96 },
  { file: '50_novas_questoes_logica_digital_101_a_150.md', prefix: 'md-', expected: 46 },
  { file: '20_questoes_circuitos_digitais.md', prefix: 'digital-', expected: 19 }
];
export const questionLabel = q => q.visual ? `Visual · ${q.visual}` : `${q.cat === 'digital' ? 'Circuitos Digitais · ' : ''}Questão ${q.number || q.id.split('-').at(-1)}`;
