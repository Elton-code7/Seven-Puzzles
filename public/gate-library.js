export const GATES = [
  { id: 'AND', nome: 'AND (E)', ins: 2, f: (a, b) => a & b, math: ['A · B', 'A ∧ B', 'AB'],
    texto: 'A saída só é 1 quando todas as entradas são 1.',
    ex: 'Alarme de casa: a sirene toca somente se o sistema está armado E a porta foi aberta.' },
  { id: 'OR', nome: 'OR (OU)', ins: 2, f: (a, b) => a | b, math: ['A + B', 'A ∨ B'],
    texto: 'A saída é 1 quando pelo menos uma entrada é 1.',
    ex: 'Luz da escada: acende se o interruptor de baixo OU o de cima for acionado.' },
  { id: 'NOT', nome: 'NOT (NÃO)', ins: 1, f: a => 1 - a, math: ['¬A', 'A\u2032', 'Ā'],
    texto: 'Inversor: a saída é o contrário da entrada.',
    ex: 'Poste de rua: o sensor de luz envia 0 quando escurece, e o inversor transforma isso em 1 para ligar a lâmpada.' },
  { id: 'NAND', nome: 'NAND (NÃO-E)', ins: 2, f: (a, b) => 1 - (a & b), math: ['¬(A · B)', '(A · B)\u2032'],
    texto: 'É um AND seguido de NOT: a saída só é 0 quando todas as entradas são 1. Porta universal.',
    ex: 'Luz de aviso de falha: fica acesa sempre, exceto quando os dois sensores confirmam que está tudo certo (1 e 1).' },
  { id: 'NOR', nome: 'NOR (NÃO-OU)', ins: 2, f: (a, b) => 1 - (a | b), math: ['¬(A + B)', '(A + B)\u2032'],
    texto: 'É um OR seguido de NOT: a saída só é 1 quando todas as entradas são 0. Porta universal.',
    ex: 'Luz “sala livre”: acende só quando nenhum dos sensores de presença detecta alguém.' },
  { id: 'XOR', nome: 'XOR (OU exclusivo)', ins: 2, f: (a, b) => a ^ b, math: ['A ⊕ B', 'A\u2032·B + A·B\u2032'],
    texto: 'A saída é 1 quando as entradas são diferentes entre si.',
    ex: 'Interruptor de corredor com dois pontos: apertar qualquer um dos dois inverte o estado da lâmpada.' }
];

export function gateSVG(id, identify = true) {
  if (!GATES.some(g => g.id === id)) return '';
  const two = id !== 'NOT', bubble = ['NAND', 'NOR', 'NOT'].includes(id);
  const bodies = {
    AND: 'M22 8H50A22 22 0 0 1 50 52H22Z', NAND: 'M22 8H50A22 22 0 0 1 50 52H22Z',
    OR: 'M22 8Q50 8 72 30Q50 52 22 52Q36 30 22 8Z', NOR: 'M22 8Q50 8 72 30Q50 52 22 52Q36 30 22 8Z',
    XOR: 'M28 8Q54 8 76 30Q54 52 28 52Q42 30 28 8Z', NOT: 'M26 10L26 50L72 30Z'
  };
  const end = id === 'XOR' ? 76 : 72, ins = two ? [20, 40] : [30];
  return `<svg viewBox="0 0 120 60" role="img" aria-label="${identify ? `Símbolo da porta ${id}` : 'Símbolo lógico para identificação'}">
    ${ins.map((y, i) => `<path class="wire" d="M4 ${y}H34"/><text x="0" y="${y - 3}">${two ? 'AB'[i] : 'A'}</text>`).join('')}
    ${id === 'XOR' ? '<path class="wire" d="M19 8Q33 30 19 52"/>' : ''}
    <path class="stroke" d="${bodies[id]}"/>
    ${bubble ? `<circle class="stroke" cx="${end + 5}" cy="30" r="5"/>` : ''}
    <path class="wire" d="M${end + (bubble ? 10 : 0)} 30H112"/><text x="106" y="26">Y</text></svg>`;
}
