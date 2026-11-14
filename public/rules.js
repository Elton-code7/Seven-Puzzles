export const PLAN_MAIN = [0, 0, 0, 1, 1, 1, 1];
export const PLAN_FINAL = [1, 1, 1, 1, 1, 1];
export const MODES = {
  individual: { name: 'Partida individual', description: 'Todos disputam por conta própria, sem equipes: 7 perguntas por pessoa. Vence quem somar mais pontos; acertos desempatam. Persistindo o empate, apenas os líderes disputam novas questões.' },
  groups: { name: 'Partida em grupo', description: 'As equipes somam os pontos de seus integrantes em 7 perguntas por pessoa. Pontos e acertos definem a equipe vencedora; empates geram outra rodada. Depois, o admin libera 6 perguntas de nível médio entre os integrantes da equipe campeã para definir o vencedor individual.' },
  elimination: { name: 'Competição entre grupos', description: 'A primeira rodada tem 7 perguntas por pessoa; as seguintes têm 2 (uma fácil e uma média), sempre com placar zerado. A equipe com menos pontos é eliminada; acertos desempatam. Equipes empatadas na última posição saem juntas, exceto se todas empatarem: nesse caso, todas jogam novamente. A última equipe restante vence, sem final individual.' }
};
export const MODE_RULES = mode => MODES[mode]?.description || MODES.groups.description;
export function speedBonus(ms, budget = 90000) {
  return ms < budget / 2 ? Math.max(1, Math.round(50 * (1 - Math.max(0, ms) / (budget / 2)))) : 0;
}
