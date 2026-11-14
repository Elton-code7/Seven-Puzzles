// Gerado por scripts/import-questions.mjs a partir dos documentos em data/.
export const DOCUMENT_QUESTIONS = [
  {
    "id": "md-001",
    "source": "100_questoes_logica_digital.md",
    "number": 1,
    "cat": "gates",
    "d": 0,
    "text": "Em uma porta AND de duas entradas, quando a saída é igual a 1?",
    "options": [
      "Quando as duas entradas são 1.",
      "Quando as entradas são diferentes.",
      "Quando pelo menos uma entrada é 1.",
      "Quando as duas entradas são 0."
    ],
    "ans": 0,
    "why": "A AND exige que todas as suas entradas sejam 1.",
    "time": 90
  },
  {
    "id": "md-002",
    "source": "100_questoes_logica_digital.md",
    "number": 2,
    "cat": "gates",
    "d": 0,
    "text": "Qual porta de duas entradas produz saída 1 quando pelo menos uma entrada é 1, inclusive quando ambas são 1?",
    "options": [
      "OR",
      "NOT",
      "XOR",
      "AND"
    ],
    "ans": 0,
    "why": "A OR representa o OU inclusivo.",
    "time": 90
  },
  {
    "id": "md-003",
    "source": "100_questoes_logica_digital.md",
    "number": 3,
    "cat": "gates",
    "d": 0,
    "text": "Qual é a função de uma porta NOT?",
    "options": [
      "Inverter o valor lógico da entrada.",
      "Repetir o valor lógico da entrada.",
      "Somar dois números binários completos.",
      "Manter sempre a saída em 1."
    ],
    "ans": 0,
    "why": "A NOT transforma 0 em 1 e 1 em 0.",
    "time": 90
  },
  {
    "id": "md-004",
    "source": "100_questoes_logica_digital.md",
    "number": 4,
    "cat": "gates",
    "d": 0,
    "text": "Para A = 1 e B = 0, quais são, nessa ordem, as saídas de AND(A,B) e OR(A,B)?",
    "options": [
      "`1, 0`",
      "`0, 0`",
      "`1, 1`",
      "`0, 1`"
    ],
    "ans": 3,
    "why": "A AND resulta em 0 e a OR resulta em 1.",
    "time": 90
  },
  {
    "id": "md-005",
    "source": "100_questoes_logica_digital.md",
    "number": 5,
    "cat": "gates",
    "d": 0,
    "text": "Uma NOT recebe, em três instantes consecutivos, os valores 0, 1 e 0. Qual é a sequência de saídas?",
    "options": [
      "`1, 1, 0`",
      "`0, 0, 1`",
      "`1, 0, 1`",
      "`0, 1, 0`"
    ],
    "ans": 2,
    "why": "Cada valor da entrada é invertido.",
    "time": 90
  },
  {
    "id": "md-006",
    "source": "100_questoes_logica_digital.md",
    "number": 6,
    "cat": "gates",
    "d": 0,
    "text": "Uma lâmpada deve acender somente quando dois interruptores lógicos, A e B, estiverem em 1. Qual porta implementa essa regra?",
    "options": [
      "OR",
      "NOT",
      "NOR",
      "AND"
    ],
    "ans": 3,
    "why": "A condição exige A = 1 e B = 1 simultaneamente.",
    "time": 90
  },
  {
    "id": "md-007",
    "source": "100_questoes_logica_digital.md",
    "number": 7,
    "cat": "gates",
    "d": 0,
    "text": "Um aviso deve ligar quando o sensor A ou o sensor B estiver em 1, inclusive se os dois estiverem em 1. Qual porta deve ser usada?",
    "options": [
      "NOT",
      "AND",
      "OR",
      "NAND"
    ],
    "ans": 2,
    "why": "Basta uma das entradas ser 1 para a OR ativar a saída.",
    "time": 90
  },
  {
    "id": "md-008",
    "source": "100_questoes_logica_digital.md",
    "number": 8,
    "cat": "gates",
    "d": 0,
    "text": "Qual alternativa descreve corretamente a quantidade de entradas e saídas de uma porta NOT convencional?",
    "options": [
      "Duas entradas e uma saída.",
      "Uma entrada e uma saída.",
      "Uma entrada e duas saídas.",
      "Duas entradas e duas saídas."
    ],
    "ans": 1,
    "why": "A NOT opera sobre uma única entrada lógica.",
    "time": 90
  },
  {
    "id": "md-009",
    "source": "100_questoes_logica_digital.md",
    "number": 9,
    "cat": "gates",
    "d": 0,
    "text": "Uma porta AND de três entradas recebe A = 1, B = 1 e C = 0. Qual alternativa apresenta o resultado e sua justificativa?",
    "options": [
      "Saída 1, porque pelo menos uma entrada é 1.",
      "Saída 1, porque a maioria das entradas é 1.",
      "Saída 0, porque existe uma entrada em 0.",
      "Saída 0, porque as três entradas são 1."
    ],
    "ans": 2,
    "why": "Na AND, uma única entrada 0 já força a saída a 0.",
    "time": 90
  },
  {
    "id": "md-010",
    "source": "100_questoes_logica_digital.md",
    "number": 10,
    "cat": "gates",
    "d": 0,
    "text": "Em qual combinação uma porta OR de três entradas apresenta saída 0?",
    "options": [
      "A = 0, B = 1 e C = 0.",
      "A = 1, B = 0 e C = 0.",
      "A = 0, B = 0 e C = 0.",
      "A = 0, B = 0 e C = 1."
    ],
    "ans": 2,
    "why": "A OR só apresenta saída 0 quando todas as entradas são 0.",
    "time": 90
  },
  {
    "id": "md-011",
    "source": "100_questoes_logica_digital.md",
    "number": 11,
    "cat": "gates",
    "d": 1,
    "text": "A saída de uma NOT é conectada à entrada de outra NOT. Qual é o efeito sobre o sinal original A?",
    "options": [
      "A saída final é igual a A.",
      "A saída final é sempre 0.",
      "A saída final é sempre ¬A.",
      "A saída final é sempre 1."
    ],
    "ans": 0,
    "why": "Duas inversões se anulam: ¬(¬A) = A.",
    "time": 90
  },
  {
    "id": "md-012",
    "source": "100_questoes_logica_digital.md",
    "number": 12,
    "cat": "gates",
    "d": 1,
    "text": "Uma porta AND recebe A e uma entrada fixa em 1. Como sua saída se comporta?",
    "options": [
      "A saída é sempre ¬A.",
      "A saída é sempre 1.",
      "A saída acompanha A.",
      "A saída é sempre 0."
    ],
    "ans": 2,
    "why": "Na álgebra booleana, A · 1 = A.",
    "time": 90
  },
  {
    "id": "md-013",
    "source": "100_questoes_logica_digital.md",
    "number": 13,
    "cat": "gates",
    "d": 1,
    "text": "Uma porta OR recebe A e uma entrada fixa em 0. Como sua saída se comporta?",
    "options": [
      "A saída acompanha A.",
      "A saída é sempre 1.",
      "A saída é sempre ¬A.",
      "A saída é sempre 0."
    ],
    "ans": 0,
    "why": "Na álgebra booleana, A + 0 = A.",
    "time": 90
  },
  {
    "id": "md-014",
    "source": "100_questoes_logica_digital.md",
    "number": 14,
    "cat": "gates",
    "d": 1,
    "text": "Em Y = A · B, sabe-se que Y = 1. O que é possível concluir?",
    "options": [
      "Apenas uma das entradas é 1.",
      "A = 1 e B = 1.",
      "As entradas são necessariamente diferentes.",
      "A = 0 e B = 0."
    ],
    "ans": 1,
    "why": "A única combinação que ativa uma AND de duas entradas é 11.",
    "time": 90
  },
  {
    "id": "md-015",
    "source": "100_questoes_logica_digital.md",
    "number": 15,
    "cat": "gates",
    "d": 1,
    "text": "Em Y = A + B, sabe-se que Y = 0. O que é possível concluir?",
    "options": [
      "A e B são necessariamente diferentes.",
      "A = 0 e B = 0.",
      "A = 1 e B = 1.",
      "B = 1, independentemente de A."
    ],
    "ans": 1,
    "why": "Para uma OR produzir 0, nenhuma entrada pode ser 1.",
    "time": 90
  },
  {
    "id": "md-016",
    "source": "100_questoes_logica_digital.md",
    "number": 16,
    "cat": "gates",
    "d": 1,
    "text": "Uma OR recebe A e B. A permanece em 1 enquanto B muda de 0 para 1. O que acontece com a saída?",
    "options": [
      "Muda de 1 para 0.",
      "Permanece em 1.",
      "Muda de 0 para 1.",
      "Permanece em 0."
    ],
    "ans": 1,
    "why": "A entrada A = 1 já garante a saída 1 da OR.",
    "time": 90
  },
  {
    "id": "md-017",
    "source": "100_questoes_logica_digital.md",
    "number": 17,
    "cat": "gates",
    "d": 1,
    "text": "Uma AND recebe A e B. B permanece em 0 enquanto A muda de 0 para 1. O que acontece com a saída?",
    "options": [
      "Muda de 0 para 1.",
      "Permanece em 0.",
      "Muda de 1 para 0.",
      "Permanece em 1."
    ],
    "ans": 1,
    "why": "A entrada B = 0 bloqueia a saída da AND.",
    "time": 90
  },
  {
    "id": "md-018",
    "source": "100_questoes_logica_digital.md",
    "number": 18,
    "cat": "gates",
    "d": 1,
    "text": "Um equipamento deve ligar quando A = 1 e B = 0. Qual expressão representa essa condição?",
    "options": [
      "`¬A · B`",
      "`¬(A · B)`",
      "`A · ¬B`",
      "`A + B`"
    ],
    "ans": 2,
    "why": "É necessário combinar A com a negação de B usando AND.",
    "time": 90
  },
  {
    "id": "md-019",
    "source": "100_questoes_logica_digital.md",
    "number": 19,
    "cat": "gates",
    "d": 1,
    "text": "Um sensor fornece A = 1 quando uma porta física está fechada. Qual expressão faz um aviso Y ligar somente quando essa porta está aberta?",
    "options": [
      "Y = ¬A.",
      "Y = A + 1.",
      "Y = A.",
      "Y = A · 0."
    ],
    "ans": 0,
    "why": "Porta aberta corresponde a A = 0; a NOT converte esse valor em Y = 1.",
    "time": 90
  },
  {
    "id": "md-020",
    "source": "100_questoes_logica_digital.md",
    "number": 20,
    "cat": "gates",
    "d": 1,
    "text": "Duas portas recebem as mesmas entradas A e B: uma AND e uma OR. Em quais combinações suas saídas são iguais?",
    "options": [
      "Em 00 e 11.",
      "Em todas as combinações.",
      "Em 01 e 10.",
      "Somente em 00."
    ],
    "ans": 0,
    "why": "Em 00, ambas produzem 0; em 11, ambas produzem 1.",
    "time": 90
  },
  {
    "id": "md-021",
    "source": "100_questoes_logica_digital.md",
    "number": 21,
    "cat": "derived",
    "d": 0,
    "text": "A porta NAND equivale a qual composição?",
    "options": [
      "Uma NOT seguida de outra NOT.",
      "Uma XOR seguida de uma NOT.",
      "Uma OR seguida de uma NOT.",
      "Uma AND seguida de uma NOT."
    ],
    "ans": 3,
    "why": "NAND significa a negação da operação AND.",
    "time": 90
  },
  {
    "id": "md-022",
    "source": "100_questoes_logica_digital.md",
    "number": 22,
    "cat": "derived",
    "d": 0,
    "text": "A porta NOR equivale a qual composição?",
    "options": [
      "Uma AND seguida de outra AND.",
      "Uma AND seguida de uma NOT.",
      "Uma OR seguida de uma NOT.",
      "Uma NOT seguida de outra NOT."
    ],
    "ans": 2,
    "why": "NOR significa a negação da operação OR.",
    "time": 90
  },
  {
    "id": "md-023",
    "source": "100_questoes_logica_digital.md",
    "number": 23,
    "cat": "derived",
    "d": 0,
    "text": "Quando uma XOR de duas entradas produz saída 1?",
    "options": [
      "Quando as duas entradas são 1.",
      "Quando as duas entradas são 0.",
      "Quando as duas entradas são diferentes.",
      "Quando as duas entradas são iguais."
    ],
    "ans": 2,
    "why": "A XOR representa o OU exclusivo entre duas entradas.",
    "time": 90
  },
  {
    "id": "md-024",
    "source": "100_questoes_logica_digital.md",
    "number": 24,
    "cat": "derived",
    "d": 0,
    "text": "Qual combinação faz uma NAND de duas entradas produzir 0?",
    "options": [
      "A = 0 e B = 1.",
      "A = 0 e B = 0.",
      "A = 1 e B = 0.",
      "A = 1 e B = 1."
    ],
    "ans": 3,
    "why": "A NAND só produz 0 quando a AND correspondente produziria 1.",
    "time": 90
  },
  {
    "id": "md-025",
    "source": "100_questoes_logica_digital.md",
    "number": 25,
    "cat": "derived",
    "d": 0,
    "text": "Qual combinação faz uma NOR de duas entradas produzir 1?",
    "options": [
      "A = 1 e B = 1.",
      "A = 1 e B = 0.",
      "A = 0 e B = 0.",
      "A = 0 e B = 1."
    ],
    "ans": 2,
    "why": "A NOR só produz 1 quando a OR correspondente produziria 0.",
    "time": 90
  },
  {
    "id": "md-026",
    "source": "100_questoes_logica_digital.md",
    "number": 26,
    "cat": "derived",
    "d": 0,
    "text": "Para A = 1 e B = 1, quais são as saídas de NAND, NOR e XOR, nessa ordem?",
    "options": [
      "`0, 1, 1`",
      "`1, 0, 1`",
      "`1, 1, 0`",
      "`0, 0, 0`"
    ],
    "ans": 3,
    "why": "NAND e NOR negam resultados iguais a 1; a XOR de entradas iguais resulta em 0.",
    "time": 90
  },
  {
    "id": "md-027",
    "source": "100_questoes_logica_digital.md",
    "number": 27,
    "cat": "derived",
    "d": 0,
    "text": "Para A = 0 e B = 0, quais são as saídas de NAND, NOR e XOR, nessa ordem?",
    "options": [
      "`1, 1, 0`",
      "`0, 1, 1`",
      "`0, 0, 0`",
      "`1, 0, 1`"
    ],
    "ans": 0,
    "why": "NAND e NOR negam resultados iguais a 0; a XOR de entradas iguais resulta em 0.",
    "time": 90
  },
  {
    "id": "md-028",
    "source": "100_questoes_logica_digital.md",
    "number": 28,
    "cat": "derived",
    "d": 0,
    "text": "Para A = 1 e B = 0, quais são as saídas de NAND, NOR e XOR, nessa ordem?",
    "options": [
      "`1, 0, 1`",
      "`1, 1, 0`",
      "`0, 0, 1`",
      "`0, 1, 1`"
    ],
    "ans": 0,
    "why": "A AND resulta em 0, a OR em 1 e as entradas são diferentes.",
    "time": 90
  },
  {
    "id": "md-029",
    "source": "100_questoes_logica_digital.md",
    "number": 29,
    "cat": "derived",
    "d": 0,
    "text": "Um indicador deve acender quando dois sensores apresentam valores diferentes. Qual porta implementa diretamente essa comparação?",
    "options": [
      "AND",
      "OR",
      "NOR",
      "XOR"
    ],
    "ans": 3,
    "why": "A XOR detecta diferença entre dois bits.",
    "time": 90
  },
  {
    "id": "md-030",
    "source": "100_questoes_logica_digital.md",
    "number": 30,
    "cat": "derived",
    "d": 0,
    "text": "Qual é a diferença entre OR e XOR de duas entradas quando A = 1 e B = 1?",
    "options": [
      "As duas produzem 1.",
      "As duas produzem 0.",
      "A OR produz 1 e a XOR produz 0.",
      "A OR produz 0 e a XOR produz 1."
    ],
    "ans": 2,
    "why": "A OR aceita ambas as entradas em 1; a XOR exige entradas diferentes.",
    "time": 90
  },
  {
    "id": "md-031",
    "source": "100_questoes_logica_digital.md",
    "number": 31,
    "cat": "derived",
    "d": 1,
    "text": "As duas entradas de uma NAND são conectadas ao mesmo sinal A. Qual é a saída?",
    "options": [
      "A.",
      "Sempre 1.",
      "¬A.",
      "Sempre 0."
    ],
    "ans": 2,
    "why": "¬(A · A) = ¬A; a NAND pode funcionar como inversor.",
    "time": 90
  },
  {
    "id": "md-032",
    "source": "100_questoes_logica_digital.md",
    "number": 32,
    "cat": "derived",
    "d": 1,
    "text": "As duas entradas de uma NOR são conectadas ao mesmo sinal A. Qual é a saída?",
    "options": [
      "A.",
      "¬A.",
      "Sempre 0.",
      "Sempre 1."
    ],
    "ans": 1,
    "why": "¬(A + A) = ¬A; a NOR também pode funcionar como inversor.",
    "time": 90
  },
  {
    "id": "md-033",
    "source": "100_questoes_logica_digital.md",
    "number": 33,
    "cat": "derived",
    "d": 1,
    "text": "Uma XOR recebe A e uma entrada fixa em 0. Qual é a saída?",
    "options": [
      "Sempre 1.",
      "A.",
      "¬A.",
      "Sempre 0."
    ],
    "ans": 1,
    "why": "A ⊕ 0 = A.",
    "time": 90
  },
  {
    "id": "md-034",
    "source": "100_questoes_logica_digital.md",
    "number": 34,
    "cat": "derived",
    "d": 1,
    "text": "Uma XOR recebe A e uma entrada fixa em 1. Qual é a saída?",
    "options": [
      "¬A.",
      "A.",
      "Sempre 1.",
      "Sempre 0."
    ],
    "ans": 0,
    "why": "A ⊕ 1 = ¬A.",
    "time": 90
  },
  {
    "id": "md-035",
    "source": "100_questoes_logica_digital.md",
    "number": 35,
    "cat": "derived",
    "d": 1,
    "text": "Uma NAND recebe A e uma entrada fixa em 0. Qual é a saída?",
    "options": [
      "A.",
      "Sempre 0.",
      "¬A.",
      "Sempre 1."
    ],
    "ans": 3,
    "why": "Como A · 0 = 0, sua negação é sempre 1.",
    "time": 90
  },
  {
    "id": "md-036",
    "source": "100_questoes_logica_digital.md",
    "number": 36,
    "cat": "derived",
    "d": 1,
    "text": "Uma NOR recebe A e uma entrada fixa em 1. Qual é a saída?",
    "options": [
      "Sempre 0.",
      "¬A.",
      "A.",
      "Sempre 1."
    ],
    "ans": 0,
    "why": "Como A + 1 = 1, sua negação é sempre 0.",
    "time": 90
  },
  {
    "id": "md-037",
    "source": "100_questoes_logica_digital.md",
    "number": 37,
    "cat": "derived",
    "d": 1,
    "text": "A saída de uma NAND(A,B) passa por uma NOT. A qual porta de duas entradas o conjunto equivale?",
    "options": [
      "XOR",
      "NOR",
      "OR",
      "AND"
    ],
    "ans": 3,
    "why": "A NOT cancela a inversão da NAND: ¬(¬(A · B)) = A · B.",
    "time": 90
  },
  {
    "id": "md-038",
    "source": "100_questoes_logica_digital.md",
    "number": 38,
    "cat": "derived",
    "d": 1,
    "text": "A saída de uma NOR(A,B) passa por uma NOT. A qual porta de duas entradas o conjunto equivale?",
    "options": [
      "NAND",
      "OR",
      "XOR",
      "AND"
    ],
    "ans": 1,
    "why": "A NOT cancela a inversão da NOR: ¬(¬(A + B)) = A + B.",
    "time": 90
  },
  {
    "id": "md-039",
    "source": "100_questoes_logica_digital.md",
    "number": 39,
    "cat": "derived",
    "d": 1,
    "text": "Quais portas são universais, isto é, permitem implementar qualquer função booleana usando apenas cópias de uma delas?",
    "options": [
      "NAND e NOR.",
      "AND e XOR.",
      "AND e OR.",
      "XOR e NOT."
    ],
    "ans": 0,
    "why": "Cada uma das portas NAND e NOR, isoladamente como tipo de porta, permite construir NOT, AND e OR.",
    "time": 90
  },
  {
    "id": "md-040",
    "source": "100_questoes_logica_digital.md",
    "number": 40,
    "cat": "derived",
    "d": 1,
    "text": "Um detector deve ativar Y quando dois bits forem iguais. Qual composição atende a essa regra?",
    "options": [
      "OR seguida de NOT.",
      "AND seguida de NOT.",
      "XOR seguida de NOT.",
      "Duas NOT em sequência aplicadas apenas a A."
    ],
    "ans": 2,
    "why": "A XOR detecta diferença; inverter sua saída detecta igualdade, operação chamada XNOR.",
    "time": 90
  },
  {
    "id": "md-041",
    "source": "100_questoes_logica_digital.md",
    "number": 41,
    "cat": "truth",
    "d": 0,
    "text": "Quantas linhas de combinações possui a tabela-verdade de uma função com duas entradas binárias independentes?",
    "options": [
      "4 linhas.",
      "2 linhas.",
      "8 linhas.",
      "3 linhas."
    ],
    "ans": 0,
    "why": "Cada entrada tem duas possibilidades: 2² = 4 combinações.",
    "time": 90
  },
  {
    "id": "md-042",
    "source": "100_questoes_logica_digital.md",
    "number": 42,
    "cat": "truth",
    "d": 0,
    "text": "Quantas linhas de combinações possui a tabela-verdade de uma função com três entradas binárias independentes?",
    "options": [
      "6 linhas.",
      "8 linhas.",
      "9 linhas.",
      "3 linhas."
    ],
    "ans": 1,
    "why": "O número de combinações é 2³ = 8.",
    "time": 90
  },
  {
    "id": "md-043",
    "source": "100_questoes_logica_digital.md",
    "number": 43,
    "cat": "truth",
    "d": 0,
    "text": "Qual sequência contém todas as combinações de duas entradas A e B, sem repetição?",
    "options": [
      "00, 01, 01, 11.",
      "00, 01, 10, 11.",
      "01, 10, 11, 12.",
      "00, 10, 11."
    ],
    "ans": 1,
    "why": "Os quatro pares binários possíveis são 00, 01, 10 e 11.",
    "time": 90
  },
  {
    "id": "md-044",
    "source": "100_questoes_logica_digital.md",
    "number": 44,
    "cat": "truth",
    "d": 0,
    "text": "Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta AND?",
    "options": [
      "`0, 1, 1, 0`",
      "`0, 0, 0, 1`",
      "`0, 1, 1, 1`",
      "`1, 1, 1, 0`"
    ],
    "ans": 1,
    "why": "A AND só produz 1 na combinação 11.",
    "time": 90
  },
  {
    "id": "md-045",
    "source": "100_questoes_logica_digital.md",
    "number": 45,
    "cat": "truth",
    "d": 0,
    "text": "Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta OR?",
    "options": [
      "`0, 0, 0, 1`",
      "`0, 1, 1, 1`",
      "`0, 1, 1, 0`",
      "`1, 0, 0, 0`"
    ],
    "ans": 1,
    "why": "A OR só produz 0 na combinação 00.",
    "time": 90
  },
  {
    "id": "md-046",
    "source": "100_questoes_logica_digital.md",
    "number": 46,
    "cat": "truth",
    "d": 0,
    "text": "Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta XOR?",
    "options": [
      "`0, 1, 1, 1`",
      "`1, 0, 0, 1`",
      "`0, 1, 1, 0`",
      "`0, 0, 0, 1`"
    ],
    "ans": 2,
    "why": "A XOR produz 1 nas combinações 01 e 10.",
    "time": 90
  },
  {
    "id": "md-047",
    "source": "100_questoes_logica_digital.md",
    "number": 47,
    "cat": "truth",
    "d": 0,
    "text": "Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta NAND?",
    "options": [
      "`1, 0, 0, 0`",
      "`0, 0, 0, 1`",
      "`0, 1, 1, 0`",
      "`1, 1, 1, 0`"
    ],
    "ans": 3,
    "why": "A NAND é a inversão da AND.",
    "time": 90
  },
  {
    "id": "md-048",
    "source": "100_questoes_logica_digital.md",
    "number": 48,
    "cat": "truth",
    "d": 0,
    "text": "Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta NOR?",
    "options": [
      "`1, 1, 1, 0`",
      "`1, 0, 0, 1`",
      "`1, 0, 0, 0`",
      "`0, 1, 1, 1`"
    ],
    "ans": 2,
    "why": "A NOR só produz 1 na combinação 00.",
    "time": 90
  },
  {
    "id": "md-049",
    "source": "100_questoes_logica_digital.md",
    "number": 49,
    "cat": "truth",
    "d": 0,
    "text": "Observe a tabela. Qual porta corresponde à saída Y?\n\n| A | B | Y |\n|---|---|---|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |",
    "options": [
      "OR",
      "NOR",
      "AND",
      "XOR"
    ],
    "ans": 2,
    "why": "Somente a combinação 11 ativa a saída.",
    "time": 90
  },
  {
    "id": "md-050",
    "source": "100_questoes_logica_digital.md",
    "number": 50,
    "cat": "truth",
    "d": 0,
    "text": "Complete a tabela de uma NOT. Quais valores substituem X e Z, respectivamente?\n\n| A | Y = ¬A |\n|---|---|\n| 0 | X |\n| 1 | Z |",
    "options": [
      "X = 1 e Z = 1.",
      "X = 1 e Z = 0.",
      "X = 0 e Z = 0.",
      "X = 0 e Z = 1."
    ],
    "ans": 1,
    "why": "A NOT sempre inverte a entrada.",
    "time": 90
  },
  {
    "id": "md-051",
    "source": "100_questoes_logica_digital.md",
    "number": 51,
    "cat": "truth",
    "d": 1,
    "text": "Uma função tem quatro entradas binárias independentes e duas saídas. Quantas linhas de combinações de entrada sua tabela-verdade completa possui?",
    "options": [
      "32 linhas.",
      "8 linhas.",
      "16 linhas.",
      "64 linhas."
    ],
    "ans": 2,
    "why": "A quantidade de linhas depende das entradas: 2⁴ = 16. Ter duas saídas acrescenta colunas, não combinações de entrada.",
    "time": 90
  },
  {
    "id": "md-052",
    "source": "100_questoes_logica_digital.md",
    "number": 52,
    "cat": "truth",
    "d": 1,
    "text": "Na tabela-verdade completa de uma OR de três entradas, em quantas linhas a saída é 1?",
    "options": [
      "1 linha.",
      "3 linhas.",
      "7 linhas.",
      "4 linhas."
    ],
    "ans": 2,
    "why": "Das oito combinações, apenas 000 produz saída 0.",
    "time": 90
  },
  {
    "id": "md-053",
    "source": "100_questoes_logica_digital.md",
    "number": 53,
    "cat": "truth",
    "d": 1,
    "text": "Na tabela-verdade completa de uma AND de três entradas, em quantas linhas a saída é 1?",
    "options": [
      "7 linhas.",
      "1 linha.",
      "3 linhas.",
      "4 linhas."
    ],
    "ans": 1,
    "why": "Somente a combinação 111 produz saída 1.",
    "time": 90
  },
  {
    "id": "md-054",
    "source": "100_questoes_logica_digital.md",
    "number": 54,
    "cat": "truth",
    "d": 1,
    "text": "Para Y = ¬A · B, qual é a sequência de saídas na ordem (A,B) = 00, 01, 10, 11?",
    "options": [
      "`0, 1, 1, 1`",
      "`1, 0, 1, 0`",
      "`0, 0, 1, 0`",
      "`0, 1, 0, 0`"
    ],
    "ans": 3,
    "why": "A saída só é 1 quando A = 0 e B = 1.",
    "time": 90
  },
  {
    "id": "md-055",
    "source": "100_questoes_logica_digital.md",
    "number": 55,
    "cat": "truth",
    "d": 1,
    "text": "Para Y = A + ¬B, qual é a sequência de saídas na ordem (A,B) = 00, 01, 10, 11?",
    "options": [
      "`1, 1, 0, 1`",
      "`1, 0, 1, 1`",
      "`0, 0, 1, 1`",
      "`0, 1, 1, 1`"
    ],
    "ans": 1,
    "why": "A única combinação que produz 0 é A = 0 e B = 1.",
    "time": 90
  },
  {
    "id": "md-056",
    "source": "100_questoes_logica_digital.md",
    "number": 56,
    "cat": "truth",
    "d": 1,
    "text": "Para Y = (A + B) · C, complete X e Z na tabela parcial abaixo.\n\n| A | B | C | Y |\n|---|---|---|---|\n| 0 | 0 | 1 | X |\n| 0 | 1 | 1 | Z |",
    "options": [
      "X = 0 e Z = 1.",
      "X = 1 e Z = 1.",
      "X = 0 e Z = 0.",
      "X = 1 e Z = 0."
    ],
    "ans": 0,
    "why": "Na primeira linha, (0 + 0) · 1 = 0; na segunda, (0 + 1) · 1 = 1.",
    "time": 90
  },
  {
    "id": "md-058",
    "source": "100_questoes_logica_digital.md",
    "number": 58,
    "cat": "truth",
    "d": 1,
    "text": "Para Y = (A · B) + C, qual das combinações abaixo produz saída 0?",
    "options": [
      "A = 0, B = 1, C = 1.",
      "A = 1, B = 1, C = 0.",
      "A = 0, B = 0, C = 1.",
      "A = 1, B = 0, C = 0."
    ],
    "ans": 3,
    "why": "Em 100, A · B = 0 e C = 0; nas outras alternativas, pelo menos um termo da OR vale 1.",
    "time": 90
  },
  {
    "id": "md-059",
    "source": "100_questoes_logica_digital.md",
    "number": 59,
    "cat": "truth",
    "d": 1,
    "text": "Observe a tabela. Qual expressão representa a saída Y?\n\n| A | B | Y |\n|---|---|---|\n| 0 | 0 | 1 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |",
    "options": [
      "Y = A ⊕ B.",
      "Y = ¬(A · B).",
      "Y = A + B.",
      "Y = ¬(A ⊕ B)."
    ],
    "ans": 3,
    "why": "A saída vale 1 quando A e B são iguais, correspondendo à negação da XOR.",
    "time": 90
  },
  {
    "id": "md-060",
    "source": "100_questoes_logica_digital.md",
    "number": 60,
    "cat": "truth",
    "d": 1,
    "text": "Duas expressões usam as mesmas três entradas. Qual procedimento comprova, por tabela-verdade, que são equivalentes?",
    "options": [
      "Comparar somente a combinação 111.",
      "Comparar suas saídas nas oito combinações e verificar que são iguais em todas.",
      "Comparar somente a combinação 000.",
      "Verificar apenas se possuem o mesmo número de operações."
    ],
    "ans": 1,
    "why": "Equivalência exige saídas iguais para todas as combinações possíveis de entradas.",
    "time": 90
  },
  {
    "id": "md-061",
    "source": "100_questoes_logica_digital.md",
    "number": 61,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A + 0?",
    "options": [
      "`1`",
      "`¬A`",
      "`0`",
      "`A`"
    ],
    "ans": 3,
    "why": "O elemento neutro da OR é 0.",
    "time": 90
  },
  {
    "id": "md-062",
    "source": "100_questoes_logica_digital.md",
    "number": 62,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A · 1?",
    "options": [
      "`1`",
      "`0`",
      "`A`",
      "`¬A`"
    ],
    "ans": 2,
    "why": "O elemento neutro da AND é 1.",
    "time": 90
  },
  {
    "id": "md-063",
    "source": "100_questoes_logica_digital.md",
    "number": 63,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A + 1?",
    "options": [
      "`A`",
      "`¬A`",
      "`0`",
      "`1`"
    ],
    "ans": 3,
    "why": "Uma entrada 1 força a saída da OR a 1.",
    "time": 90
  },
  {
    "id": "md-064",
    "source": "100_questoes_logica_digital.md",
    "number": 64,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A · 0?",
    "options": [
      "`A`",
      "`1`",
      "`¬A`",
      "`0`"
    ],
    "ans": 3,
    "why": "Uma entrada 0 força a saída da AND a 0.",
    "time": 90
  },
  {
    "id": "md-065",
    "source": "100_questoes_logica_digital.md",
    "number": 65,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A + A?",
    "options": [
      "`¬A`",
      "`A`",
      "`0`",
      "`1`"
    ],
    "ans": 1,
    "why": "Pela idempotência, repetir a mesma variável na OR não altera o resultado.",
    "time": 90
  },
  {
    "id": "md-066",
    "source": "100_questoes_logica_digital.md",
    "number": 66,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A · A?",
    "options": [
      "`A`",
      "`0`",
      "`1`",
      "`¬A`"
    ],
    "ans": 0,
    "why": "Pela idempotência, repetir a mesma variável na AND não altera o resultado.",
    "time": 90
  },
  {
    "id": "md-067",
    "source": "100_questoes_logica_digital.md",
    "number": 67,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A + ¬A?",
    "options": [
      "`A`",
      "`1`",
      "`¬A`",
      "`0`"
    ],
    "ans": 1,
    "why": "Entre A e ¬A, um dos valores é sempre 1.",
    "time": 90
  },
  {
    "id": "md-068",
    "source": "100_questoes_logica_digital.md",
    "number": 68,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de A · ¬A?",
    "options": [
      "`1`",
      "`¬A`",
      "`0`",
      "`A`"
    ],
    "ans": 2,
    "why": "A e ¬A nunca são 1 simultaneamente.",
    "time": 90
  },
  {
    "id": "md-069",
    "source": "100_questoes_logica_digital.md",
    "number": 69,
    "cat": "algebra",
    "d": 0,
    "text": "Qual é a simplificação de ¬(¬A)?",
    "options": [
      "`A`",
      "`¬A`",
      "`0`",
      "`1`"
    ],
    "ans": 0,
    "why": "A dupla negação recupera o valor original.",
    "time": 90
  },
  {
    "id": "md-070",
    "source": "100_questoes_logica_digital.md",
    "number": 70,
    "cat": "algebra",
    "d": 0,
    "text": "Qual igualdade expressa a propriedade comutativa da operação OR?",
    "options": [
      "A + B = ¬A + ¬B.",
      "A + B = A.",
      "A + B = A · B.",
      "A + B = B + A."
    ],
    "ans": 3,
    "why": "Na propriedade comutativa, trocar a ordem dos operandos não muda o resultado.",
    "time": 90
  },
  {
    "id": "md-071",
    "source": "100_questoes_logica_digital.md",
    "number": 71,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de A + (A · B)?",
    "options": [
      "`A · B`",
      "`A + B`",
      "`A`",
      "`B`"
    ],
    "ans": 2,
    "why": "Pela absorção, A + A · B = A.",
    "time": 90
  },
  {
    "id": "md-072",
    "source": "100_questoes_logica_digital.md",
    "number": 72,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de A · (A + B)?",
    "options": [
      "`A + B`",
      "`A · B`",
      "`B`",
      "`A`"
    ],
    "ans": 3,
    "why": "Pela absorção, A · (A + B) = A.",
    "time": 90
  },
  {
    "id": "md-073",
    "source": "100_questoes_logica_digital.md",
    "number": 73,
    "cat": "algebra",
    "d": 1,
    "text": "Aplicando a lei de De Morgan, qual expressão equivale a ¬(A · B)?",
    "options": [
      "`A · B`",
      "`A + B`",
      "`(¬A) · (¬B)`",
      "`(¬A) + (¬B)`"
    ],
    "ans": 3,
    "why": "Negar uma AND transforma a operação em OR e nega cada entrada.",
    "time": 90
  },
  {
    "id": "md-074",
    "source": "100_questoes_logica_digital.md",
    "number": 74,
    "cat": "algebra",
    "d": 1,
    "text": "Aplicando a lei de De Morgan, qual expressão equivale a ¬(A + B)?",
    "options": [
      "`(¬A) · (¬B)`",
      "`A + B`",
      "`(¬A) + (¬B)`",
      "`A · B`"
    ],
    "ans": 0,
    "why": "Negar uma OR transforma a operação em AND e nega cada entrada.",
    "time": 90
  },
  {
    "id": "md-075",
    "source": "100_questoes_logica_digital.md",
    "number": 75,
    "cat": "algebra",
    "d": 1,
    "text": "Qual expressão resulta da distribuição em A · (B + C)?",
    "options": [
      "`A · B · C`",
      "`(A · B) + (A · C)`",
      "`(A + B) · C`",
      "`A + (B · C)`"
    ],
    "ans": 1,
    "why": "Distribui-se A pelos dois termos: A · B + A · C.",
    "time": 90
  },
  {
    "id": "md-076",
    "source": "100_questoes_logica_digital.md",
    "number": 76,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de (A · B) + (A · ¬B)?",
    "options": [
      "`A`",
      "`B`",
      "`¬A`",
      "`A · B`"
    ],
    "ans": 0,
    "why": "Colocando A em evidência, obtém-se A · (B + ¬B) = A · 1 = A.",
    "time": 90
  },
  {
    "id": "md-077",
    "source": "100_questoes_logica_digital.md",
    "number": 77,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de (A + B) · (A + ¬B)?",
    "options": [
      "`B`",
      "`A · B`",
      "`A`",
      "`A + B`"
    ],
    "ans": 2,
    "why": "Pela distributividade booleana, o resultado é A + B · ¬B = A + 0 = A.",
    "time": 90
  },
  {
    "id": "md-078",
    "source": "100_questoes_logica_digital.md",
    "number": 78,
    "cat": "algebra",
    "d": 1,
    "text": "Qual expressão simplifica A + (¬A · B)?",
    "options": [
      "`A`",
      "`A + B`",
      "`A · B`",
      "`¬A + B`"
    ],
    "ans": 1,
    "why": "Usando a distributividade: (A + ¬A) · (A + B) = 1 · (A + B).",
    "time": 90
  },
  {
    "id": "md-079",
    "source": "100_questoes_logica_digital.md",
    "number": 79,
    "cat": "algebra",
    "d": 1,
    "text": "Qual expressão equivale a (A · ¬B) + (¬A · B)?",
    "options": [
      "`A + B`",
      "`¬(A + B)`",
      "`A · B`",
      "`A ⊕ B`"
    ],
    "ans": 3,
    "why": "Os dois termos cobrem exatamente os casos em que A e B são diferentes.",
    "time": 90
  },
  {
    "id": "md-080",
    "source": "100_questoes_logica_digital.md",
    "number": 80,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de ¬(¬A + B)?",
    "options": [
      "`A + ¬B`",
      "`A · ¬B`",
      "`¬A · B`",
      "`A · B`"
    ],
    "ans": 1,
    "why": "Por De Morgan, ¬(¬A + B) = ¬(¬A) · ¬B = A · ¬B.",
    "time": 90
  },
  {
    "id": "md-081",
    "source": "100_questoes_logica_digital.md",
    "number": 81,
    "cat": "circuits",
    "d": 0,
    "text": "Em um circuito combinacional ideal, após a estabilização dos sinais, de que dependem as saídas?",
    "options": [
      "Somente dos valores anteriores das entradas.",
      "Somente dos valores atuais das entradas.",
      "De um estado armazenado obrigatoriamente em memória.",
      "Exclusivamente de pulsos de relógio."
    ],
    "ans": 1,
    "why": "Um circuito combinacional não mantém estado; sua saída é uma função das entradas atuais.",
    "time": 90
  },
  {
    "id": "md-082",
    "source": "100_questoes_logica_digital.md",
    "number": 82,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito tem as etapas X = AND(A,B) e Y = OR(X,C). Para A = 1, B = 0 e C = 1, quais são X e Y?",
    "options": [
      "X = 0 e Y = 0.",
      "X = 1 e Y = 0.",
      "X = 0 e Y = 1.",
      "X = 1 e Y = 1."
    ],
    "ans": 2,
    "why": "Primeiro, X = 1 · 0 = 0; depois, Y = 0 + 1 = 1.",
    "time": 90
  },
  {
    "id": "md-083",
    "source": "100_questoes_logica_digital.md",
    "number": 83,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito tem as etapas X = OR(A,B) e Y = AND(X,C). Para A = 0, B = 1 e C = 0, quais são X e Y?",
    "options": [
      "X = 1 e Y = 1.",
      "X = 0 e Y = 1.",
      "X = 0 e Y = 0.",
      "X = 1 e Y = 0."
    ],
    "ans": 3,
    "why": "Primeiro, X = 0 + 1 = 1; depois, Y = 1 · 0 = 0.",
    "time": 90
  },
  {
    "id": "md-084",
    "source": "100_questoes_logica_digital.md",
    "number": 84,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito tem as etapas X = NOT(A) e Y = AND(X,B). Para A = 0 e B = 1, quais são X e Y?",
    "options": [
      "X = 0 e Y = 1.",
      "X = 1 e Y = 1.",
      "X = 0 e Y = 0.",
      "X = 1 e Y = 0."
    ],
    "ans": 1,
    "why": "A NOT fornece X = 1; a AND recebe 1 e 1, produzindo Y = 1.",
    "time": 90
  },
  {
    "id": "md-085",
    "source": "100_questoes_logica_digital.md",
    "number": 85,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito tem as etapas X = AND(A,B) e Y = NOT(X). Para A = 1 e B = 1, quais são X e Y?",
    "options": [
      "X = 1 e Y = 0.",
      "X = 1 e Y = 1.",
      "X = 0 e Y = 0.",
      "X = 0 e Y = 1."
    ],
    "ans": 0,
    "why": "A AND gera X = 1 e a NOT inverte esse valor para Y = 0.",
    "time": 90
  },
  {
    "id": "md-086",
    "source": "100_questoes_logica_digital.md",
    "number": 86,
    "cat": "circuits",
    "d": 0,
    "text": "A e B alimentam uma OR; a saída dessa OR entra em uma AND junto com C. Qual expressão representa a saída final Y?",
    "options": [
      "`(A · B) + C`",
      "`A + (B · C)`",
      "`¬(A + B)`",
      "`(A + B) · C`"
    ],
    "ans": 3,
    "why": "A primeira etapa calcula A + B; a segunda aplica AND entre esse resultado e C.",
    "time": 90
  },
  {
    "id": "md-087",
    "source": "100_questoes_logica_digital.md",
    "number": 87,
    "cat": "circuits",
    "d": 0,
    "text": "A saída de uma OR(A,B) alimenta uma NOT. Qual porta única produz a mesma saída final?",
    "options": [
      "AND",
      "NOR",
      "NAND",
      "XOR"
    ],
    "ans": 1,
    "why": "Uma OR seguida de inversão equivale a uma NOR.",
    "time": 90
  },
  {
    "id": "md-088",
    "source": "100_questoes_logica_digital.md",
    "number": 88,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito tem as etapas X = XOR(A,B) e Y = NOT(X). Para A = 1 e B = 0, quais são X e Y?",
    "options": [
      "X = 1 e Y = 1.",
      "X = 1 e Y = 0.",
      "X = 0 e Y = 0.",
      "X = 0 e Y = 1."
    ],
    "ans": 1,
    "why": "As entradas diferentes geram X = 1; a NOT gera Y = 0.",
    "time": 90
  },
  {
    "id": "md-089",
    "source": "100_questoes_logica_digital.md",
    "number": 89,
    "cat": "circuits",
    "d": 0,
    "text": "Um motor deve funcionar somente se o botão A estiver em 1 e o sensor B indicar proteção fechada com valor 1. Qual circuito representa essa regra?",
    "options": [
      "Uma OR recebendo A e B.",
      "Uma XOR recebendo A e B.",
      "Uma NOT recebendo somente B.",
      "Uma AND recebendo A e B."
    ],
    "ans": 3,
    "why": "As duas condições precisam ser satisfeitas simultaneamente.",
    "time": 90
  },
  {
    "id": "md-093",
    "source": "100_questoes_logica_digital.md",
    "number": 93,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito tem X = NAND(A,B) e Y = NAND(X,X). Qual é a função equivalente entre A e B?",
    "options": [
      "AND(A,B).",
      "OR(A,B).",
      "NOR(A,B).",
      "XOR(A,B)."
    ],
    "ans": 0,
    "why": "A segunda NAND, com entradas interligadas, inverte X e cancela a inversão da primeira NAND.",
    "time": 90
  },
  {
    "id": "md-094",
    "source": "100_questoes_logica_digital.md",
    "number": 94,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito tem X = NOR(A,B) e Y = NOR(X,X). Qual é a função equivalente entre A e B?",
    "options": [
      "OR(A,B).",
      "AND(A,B).",
      "XOR(A,B).",
      "NAND(A,B)."
    ],
    "ans": 0,
    "why": "A segunda NOR inverte X, cancelando a inversão da primeira NOR.",
    "time": 90
  },
  {
    "id": "md-095",
    "source": "100_questoes_logica_digital.md",
    "number": 95,
    "cat": "circuits",
    "d": 1,
    "text": "Um seletor tem Y = (¬S · A) + (S · B). Qual entrada aparece em Y para S = 0 e para S = 1, respectivamente?",
    "options": [
      "A e B.",
      "B e A.",
      "A e A.",
      "B e B."
    ],
    "ans": 0,
    "why": "Com S = 0, apenas o termo A permanece; com S = 1, apenas o termo B permanece.",
    "time": 90
  },
  {
    "id": "md-096",
    "source": "100_questoes_logica_digital.md",
    "number": 96,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito tem X = XOR(A,B) e Y = XOR(X,C). Para A = 1, B = 1 e C = 1, quais são X e Y?",
    "options": [
      "X = 0 e Y = 0.",
      "X = 1 e Y = 0.",
      "X = 1 e Y = 1.",
      "X = 0 e Y = 1."
    ],
    "ans": 3,
    "why": "Primeiro, 1 ⊕ 1 = 0; depois, 0 ⊕ 1 = 1.",
    "time": 90
  },
  {
    "id": "md-097",
    "source": "100_questoes_logica_digital.md",
    "number": 97,
    "cat": "circuits",
    "d": 1,
    "text": "Um alarme é definido por Y = (P + J) · ¬D. P = 1 indica porta aberta, J = 1 indica janela aberta e D = 1 indica alarme desativado. Em qual situação Y = 1?",
    "options": [
      "P = 0, J = 1 e D = 0.",
      "P = 0, J = 0 e D = 0.",
      "P = 1, J = 1 e D = 1.",
      "P = 1, J = 0 e D = 1."
    ],
    "ans": 0,
    "why": "O alarme liga se houver alguma abertura e D = 0, isto é, se não estiver desativado.",
    "time": 90
  },
  {
    "id": "md-098",
    "source": "100_questoes_logica_digital.md",
    "number": 98,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito de maioria de três entradas tem Y = (A · B) + (A · C) + (B · C). Qual regra descreve sua saída?",
    "options": [
      "Y = 1 quando exatamente uma entrada é 1.",
      "Y = 1 somente quando as três entradas são 0.",
      "Y = 1 quando pelo menos duas entradas são 1.",
      "Y = 1 somente quando as três entradas são 1."
    ],
    "ans": 2,
    "why": "Cada termo detecta um par em 1; qualquer par ativo liga a saída, inclusive na combinação 111.",
    "time": 90
  },
  {
    "id": "md-099",
    "source": "100_questoes_logica_digital.md",
    "number": 99,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito possui X = OR(A,B), Z = OR(A,¬B) e Y = AND(X,Z). Qual substituição preserva a saída para todas as entradas?",
    "options": [
      "`A ⊕ B`",
      "`B`",
      "`A`",
      "`¬A`"
    ],
    "ans": 2,
    "why": "A expressão (A + B) · (A + ¬B) simplifica para A.",
    "time": 90
  },
  {
    "id": "md-100",
    "source": "100_questoes_logica_digital.md",
    "number": 100,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito correto deveria implementar Y = (A · B) + C, mas a AND foi substituída por OR, produzindo Y = (A + B) + C. Qual teste abaixo distingue os dois circuitos?",
    "options": [
      "A = 0, B = 0 e C = 0.",
      "A = 1, B = 1 e C = 0.",
      "A = 1, B = 0 e C = 0.",
      "A = 0, B = 0 e C = 1."
    ],
    "ans": 2,
    "why": "Em 100, o circuito correto produz 0 e o alterado produz 1; nos demais testes listados, as saídas coincidem.",
    "time": 90
  },
  {
    "id": "md-101",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 101,
    "cat": "gates",
    "d": 0,
    "text": "Cinco portas NOT independentes recebem os bits de `10110`, uma porta por bit. Mantendo a ordem dos bits, qual sequência aparece nas saídas?",
    "options": [
      "`01010`",
      "`01101`",
      "`01001`",
      "`10110`"
    ],
    "ans": 2,
    "why": "Cada posição é invertida separadamente: 1→0, 0→1, 1→0, 1→0 e 0→1.",
    "time": 90
  },
  {
    "id": "md-102",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 102,
    "cat": "gates",
    "d": 0,
    "text": "A sequência `1101` deve passar por uma máscara `1011` usando AND em cada par de bits da mesma posição. Qual é o resultado?",
    "options": [
      "`1111`",
      "`1000`",
      "`0110`",
      "`1001`"
    ],
    "ans": 3,
    "why": "As quatro operações são 1·1, 1·0, 0·1 e 1·1, resultando em 1001.",
    "time": 90
  },
  {
    "id": "md-103",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 103,
    "cat": "gates",
    "d": 0,
    "text": "Dois painéis registram quatro sinais cada: `1001` e `0110`. Cada posição da saída combina os sinais correspondentes por OR. Qual sequência resulta?",
    "options": [
      "`0000`",
      "`1111`",
      "`1001`",
      "`0110`"
    ],
    "ans": 1,
    "why": "Em todas as posições existe pelo menos um bit 1; portanto, todas as saídas são 1.",
    "time": 90
  },
  {
    "id": "md-104",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 104,
    "cat": "gates",
    "d": 0,
    "text": "Uma AND de quatro entradas recebe `0, 0, 1, 0`. Qual é o menor número de entradas que precisam mudar para a saída passar a 1?",
    "options": [
      "2 entradas.",
      "4 entradas.",
      "3 entradas.",
      "1 entrada."
    ],
    "ans": 2,
    "why": "Os três zeros precisam mudar para 1; a entrada que já vale 1 pode permanecer como está.",
    "time": 90
  },
  {
    "id": "md-105",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 105,
    "cat": "gates",
    "d": 0,
    "text": "Uma OR de quatro entradas recebe `1, 0, 1, 1`. Qual é o menor número de entradas que precisam mudar para a saída passar a 0?",
    "options": [
      "4 entradas.",
      "3 entradas.",
      "1 entrada.",
      "2 entradas."
    ],
    "ans": 1,
    "why": "Os três valores 1 precisam virar 0 para que todas as entradas fiquem em 0.",
    "time": 90
  },
  {
    "id": "md-106",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 106,
    "cat": "gates",
    "d": 1,
    "text": "Em um teste de uma AND de duas entradas, A = 1 e a saída Y = 0. O valor de B não foi anotado. Qual conclusão é correta?",
    "options": [
      "B só pode ser 1.",
      "Nenhum valor binário de B permite esse resultado.",
      "B só pode ser 0.",
      "B pode ser 0 ou 1."
    ],
    "ans": 2,
    "why": "Com A = 1, a saída da AND é igual a B; logo, B = 0.",
    "time": 90
  },
  {
    "id": "md-107",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 107,
    "cat": "gates",
    "d": 1,
    "text": "Uma OR de duas entradas apresentou Y = 1 enquanto A = 0. Qual conclusão pode ser feita sobre a entrada B?",
    "options": [
      "B só pode ser 0.",
      "B só pode ser 1.",
      "B pode ser 0 ou 1.",
      "As observações são incompatíveis com uma porta OR."
    ],
    "ans": 1,
    "why": "Como A não fornece um nível 1, B precisa estar em 1 para ativar a saída.",
    "time": 90
  },
  {
    "id": "md-108",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 108,
    "cat": "gates",
    "d": 1,
    "text": "Você dispõe apenas de portas AND de duas entradas e precisa implementar Y = A · B · C · D, com quatro entradas independentes. Qual é a quantidade mínima de portas necessárias?",
    "options": [
      "2 portas.",
      "1 porta.",
      "3 portas.",
      "4 portas."
    ],
    "ans": 2,
    "why": "Duas portas calculam A·B e C·D; uma terceira combina esses resultados. Cada porta de duas entradas reúne apenas dois sinais.",
    "time": 90
  },
  {
    "id": "md-109",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 109,
    "cat": "gates",
    "d": 1,
    "text": "Um aluno afirma que ¬(A · B) e (¬A) · B são iguais. Qual teste abaixo mostra que a afirmação é falsa?",
    "options": [
      "A = 1 e B = 1.",
      "A = 0 e B = 1.",
      "Nenhum teste pode mostrar diferença.",
      "A = 0 e B = 0."
    ],
    "ans": 3,
    "why": "Em 00, ¬(0·0) = 1, mas (¬0)·0 = 0. A posição da NOT altera a função.",
    "time": 90
  },
  {
    "id": "md-110",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 110,
    "cat": "gates",
    "d": 1,
    "text": "Uma caixa contém uma única porta de duas entradas, que pode ser AND ou OR. Nos testes 00 e 11, as saídas foram 0 e 1, respectivamente. Qual teste adicional identifica qual porta está na caixa?",
    "options": [
      "Aplicar A = 0 e B = 1.",
      "Repetir A = 1 e B = 1.",
      "Repetir A = 0 e B = 0.",
      "Nenhum teste adicional consegue distinguir as duas portas."
    ],
    "ans": 0,
    "why": "Com 01, a AND produz 0 e a OR produz 1; os testes já realizados são iguais para ambas.",
    "time": 90
  },
  {
    "id": "md-111",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 111,
    "cat": "derived",
    "d": 0,
    "text": "Aplique XOR, posição por posição, às sequências `1010` e `0110`. Qual é a sequência de saída?",
    "options": [
      "`1100`",
      "`1110`",
      "`0010`",
      "`1101`"
    ],
    "ans": 0,
    "why": "Os bits são diferentes nas duas primeiras posições e iguais nas duas últimas, produzindo 1100.",
    "time": 90
  },
  {
    "id": "md-112",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 112,
    "cat": "derived",
    "d": 0,
    "text": "Durante uma montagem, os fios A e B de uma NAND de duas entradas foram trocados entre si, sem nenhuma inversão dos sinais. Após a estabilização, qual é o efeito dessa troca sobre a função do circuito?",
    "options": [
      "A saída passa a ser o complemento da anterior.",
      "Nenhum: a saída permanece igual em todas as combinações.",
      "A saída passa a acompanhar somente A.",
      "A NAND passa a funcionar como NOR."
    ],
    "ans": 1,
    "why": "A NAND é simétrica em suas entradas: ¬(A·B) = ¬(B·A). Trocar apenas a posição dos fios não altera sua função.",
    "time": 90
  },
  {
    "id": "md-113",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 113,
    "cat": "derived",
    "d": 0,
    "text": "Quatro portas NOR combinam, posição por posição, as sequências `1001` e `0101`. Qual é a sequência resultante?",
    "options": [
      "`0010`",
      "`0000`",
      "`1101`",
      "`0110`"
    ],
    "ans": 0,
    "why": "A OR das sequências é 1101; sua inversão, realizada pela NOR, é 0010.",
    "time": 90
  },
  {
    "id": "md-114",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 114,
    "cat": "derived",
    "d": 0,
    "text": "Em uma XOR de duas entradas, B permanece fixo e A é invertido. O que acontece com a saída em relação ao valor anterior?",
    "options": [
      "A saída passa obrigatoriamente a 0.",
      "A saída passa obrigatoriamente a 1.",
      "A saída permanece igual.",
      "A saída também é invertida."
    ],
    "ans": 3,
    "why": "Inverter apenas uma entrada troca a condição de igualdade pela de diferença, ou vice-versa.",
    "time": 90
  },
  {
    "id": "md-115",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 115,
    "cat": "derived",
    "d": 0,
    "text": "Uma XOR recebe A e B. Depois, ambos os valores são invertidos ao mesmo tempo. Após a estabilização, como fica a saída em relação à original?",
    "options": [
      "É sempre o complemento da saída original.",
      "Fica sempre em 0.",
      "Permanece igual à saída original.",
      "Fica sempre em 1."
    ],
    "ans": 2,
    "why": "Entradas iguais continuam iguais e entradas diferentes continuam diferentes quando ambas são invertidas.",
    "time": 90
  },
  {
    "id": "md-116",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 116,
    "cat": "derived",
    "d": 1,
    "text": "Uma NAND recebe ¬A em uma entrada e ¬B na outra. Qual expressão representa sua saída?",
    "options": [
      "`A · B`",
      "`A + B`",
      "`¬(A + B)`",
      "`A ⊕ B`"
    ],
    "ans": 1,
    "why": "Por De Morgan, ¬(¬A · ¬B) = A + B.",
    "time": 90
  },
  {
    "id": "md-117",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 117,
    "cat": "derived",
    "d": 1,
    "text": "Uma NOR recebe ¬A em uma entrada e ¬B na outra. Qual expressão representa sua saída?",
    "options": [
      "`¬(A · B)`",
      "`A + B`",
      "`A ⊕ B`",
      "`A · B`"
    ],
    "ans": 3,
    "why": "Por De Morgan, ¬(¬A + ¬B) = A · B.",
    "time": 90
  },
  {
    "id": "md-119",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 119,
    "cat": "derived",
    "d": 1,
    "text": "Um transmissor gera X = A ⊕ B. O receptor conhece B e calcula Y = X ⊕ B. Qual sinal é recuperado em Y?",
    "options": [
      "`A`",
      "`¬A`",
      "`¬B`",
      "`B`"
    ],
    "ans": 0,
    "why": "Aplicar XOR duas vezes com o mesmo bit B cancela seu efeito e recupera A.",
    "time": 90
  },
  {
    "id": "md-120",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 120,
    "cat": "derived",
    "d": 1,
    "text": "Um verificador calcula P = ((A ⊕ B) ⊕ C) ⊕ D. Exatamente um dos quatro bits muda de valor. Após a estabilização, o que ocorre com P?",
    "options": [
      "P fica obrigatoriamente em 1.",
      "P fica obrigatoriamente em 0.",
      "P muda para o valor oposto.",
      "P permanece igual."
    ],
    "ans": 2,
    "why": "A troca de um único bit altera a paridade da quantidade de bits 1; por isso, o resultado da cadeia de XOR é invertido.",
    "time": 90
  },
  {
    "id": "md-121",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 121,
    "cat": "truth",
    "d": 0,
    "text": "Ao montar as entradas de uma tabela com A, B e C, foram escritas as linhas `000, 001, 010, 011, 100, 101, 111`. Qual combinação está faltando?",
    "options": [
      "`011`",
      "`110`",
      "`100`",
      "`101`"
    ],
    "ans": 1,
    "why": "A combinação 110 é a única das oito possibilidades que não aparece na lista.",
    "time": 90
  },
  {
    "id": "md-122",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 122,
    "cat": "truth",
    "d": 0,
    "text": "Um relatório apresenta duas linhas com as mesmas entradas A = 1 e B = 0, mas registra Y = 0 em uma e Y = 1 na outra. Para uma mesma função combinacional ideal com sinais estabilizados, como interpretar isso?",
    "options": [
      "Isso demonstra que a porta é uma XOR.",
      "As duas linhas são válidas porque a função escolhe a saída aleatoriamente.",
      "O relatório é inconsistente: a mesma entrada deve ter uma única saída.",
      "Isso demonstra que a porta é uma OR."
    ],
    "ans": 2,
    "why": "Uma função combinacional atribui um único valor de saída a cada combinação de entradas.",
    "time": 90
  },
  {
    "id": "md-123",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 123,
    "cat": "truth",
    "d": 0,
    "text": "Em uma tabela com linhas na ordem `000, 001, 010, 011, 100, 101, 110, 111`, os bits representam (A,B,C). Qual é a sequência da coluna A?",
    "options": [
      "`1, 1, 1, 1, 0, 0, 0, 0`",
      "`0, 1, 0, 1, 0, 1, 0, 1`",
      "`0, 0, 1, 1, 0, 0, 1, 1`",
      "`0, 0, 0, 0, 1, 1, 1, 1`"
    ],
    "ans": 3,
    "why": "A é o primeiro bit de cada linha e só passa a 1 na quinta combinação.",
    "time": 90
  },
  {
    "id": "md-124",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 124,
    "cat": "truth",
    "d": 0,
    "text": "Na tabela completa de três entradas independentes A, B e C, quantas linhas permanecem após selecionar somente aquelas em que A = 1?",
    "options": [
      "2 linhas.",
      "1 linha.",
      "4 linhas.",
      "8 linhas."
    ],
    "ans": 2,
    "why": "A fica fixo, enquanto B e C formam os quatro pares 00, 01, 10 e 11.",
    "time": 90
  },
  {
    "id": "md-125",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 125,
    "cat": "truth",
    "d": 0,
    "text": "Na tabela abaixo, qual entrada pode mudar sem alterar Y, desde que a outra entrada seja mantida fixa?\n\n| A | B | Y |\n|---|---|---|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |",
    "options": [
      "Nenhuma das duas.",
      "Tanto A quanto B.",
      "A.",
      "B."
    ],
    "ans": 3,
    "why": "Y acompanha A. Para cada A fixo, trocar B de 0 para 1 não altera a saída.",
    "time": 90
  },
  {
    "id": "md-126",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 126,
    "cat": "truth",
    "d": 1,
    "text": "Para Y = A ⊕ (B · C), qual sequência completa a coluna de saída na ordem (A,B,C) = `000, 001, 010, 011, 100, 101, 110, 111`?",
    "options": [
      "`0, 0, 0, 1, 1, 1, 1, 0`",
      "`0, 0, 0, 1, 1, 1, 1, 1`",
      "`1, 1, 1, 0, 0, 0, 0, 1`",
      "`0, 1, 1, 0, 1, 0, 0, 1`"
    ],
    "ans": 0,
    "why": "B·C vale 1 somente quando B = C = 1. Nesse caso, a XOR inverte A; nos demais, repete A.",
    "time": 90
  },
  {
    "id": "md-127",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 127,
    "cat": "truth",
    "d": 1,
    "text": "Qual expressão corresponde à tabela abaixo?\n\n| A | B | Y |\n|---|---|---|\n| 0 | 0 | 1 |\n| 0 | 1 | 1 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |",
    "options": [
      "`¬A + B`",
      "`A + ¬B`",
      "`A · B`",
      "`A ⊕ B`"
    ],
    "ans": 0,
    "why": "A saída só é 0 em 10, quando ¬A e B são ambos 0.",
    "time": 90
  },
  {
    "id": "md-128",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 128,
    "cat": "truth",
    "d": 1,
    "text": "Uma função de três entradas produz 1 quando exatamente uma delas é 1. Em quais linhas de (A,B,C) a saída deve ser 1?",
    "options": [
      "000 e 111.",
      "001, 010, 100 e 111.",
      "001, 010 e 100.",
      "011, 101 e 110."
    ],
    "ans": 2,
    "why": "Cada uma das combinações 001, 010 e 100 contém um único bit 1; 111 contém três.",
    "time": 90
  },
  {
    "id": "md-129",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 129,
    "cat": "truth",
    "d": 1,
    "text": "Considere F = (A + B) · C e G = A + (B · C). Em quais linhas da tabela completa as duas saídas são diferentes?",
    "options": [
      "100 e 110.",
      "001 e 011.",
      "010 e 101.",
      "000 e 111."
    ],
    "ans": 0,
    "why": "Quando A = 1 e C = 0, F = 0 e G = 1, independentemente de B. Nas demais linhas, elas coincidem.",
    "time": 90
  },
  {
    "id": "md-130",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 130,
    "cat": "truth",
    "d": 1,
    "text": "Uma tabela compacta usa o símbolo “–” para indicar que uma entrada pode ser 0 ou 1 sem mudar a saída daquela linha. Quantas linhas completas estão representadas por A = 0, B = –, C = – e Y = 1?",
    "options": [
      "4 linhas.",
      "1 linha.",
      "8 linhas.",
      "2 linhas."
    ],
    "ans": 0,
    "why": "B e C variam de forma independente, formando 00, 01, 10 e 11; A permanece em 0.",
    "time": 90
  },
  {
    "id": "md-131",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 131,
    "cat": "algebra",
    "d": 0,
    "text": "Qual propriedade justifica a igualdade (A + B) + C = A + (B + C)?",
    "options": [
      "Associativa da OR.",
      "Complementaridade.",
      "Comutativa da AND.",
      "Lei de De Morgan."
    ],
    "ans": 0,
    "why": "A igualdade altera apenas o agrupamento das operações OR, mantendo a ordem das variáveis.",
    "time": 90
  },
  {
    "id": "md-132",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 132,
    "cat": "algebra",
    "d": 0,
    "text": "Na expressão Y = (A · B) + (¬A · C) + (B · ¬C), quantos termos de produto são combinados pela OR principal?",
    "options": [
      "2 termos.",
      "3 termos.",
      "4 termos.",
      "6 termos."
    ],
    "ans": 1,
    "why": "Os termos são A·B, ¬A·C e B·¬C. Cada termo combina literais por AND.",
    "time": 90
  },
  {
    "id": "md-133",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 133,
    "cat": "algebra",
    "d": 0,
    "text": "Na expressão Y = ¬(A · B) + C, sobre qual parte atua a negação indicada antes do parêntese?",
    "options": [
      "Sobre toda a expressão (A · B) + C.",
      "Somente sobre B.",
      "Somente sobre A.",
      "Sobre o resultado completo de A · B."
    ],
    "ans": 3,
    "why": "Os parênteses delimitam o argumento da NOT: primeiro calcula-se A·B e depois esse resultado é invertido.",
    "time": 90
  },
  {
    "id": "md-134",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 134,
    "cat": "algebra",
    "d": 0,
    "text": "Para A = 0, B = 0 e C = 0, qual alternativa apresenta a avaliação correta de Y = ¬A · (B + ¬C)?",
    "options": [
      "Y = 1, pois B = 1 e C = 1.",
      "Y = 0, pois B + ¬C = 0.",
      "Y = 1, pois ¬A = 1 e B + ¬C = 1.",
      "Y = 0, pois ¬A = 0."
    ],
    "ans": 2,
    "why": "Com as entradas dadas, a expressão é 1 · (0 + 1), resultando em 1.",
    "time": 90
  },
  {
    "id": "md-135",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 135,
    "cat": "algebra",
    "d": 0,
    "text": "Um aluno resolve A + B · C calculando primeiro A + B. Para respeitar a prioridade usual das operações booleanas, qual deve ser a primeira operação?",
    "options": [
      "Calcular B · C.",
      "Inverter C.",
      "Calcular A + B.",
      "Calcular A · C."
    ],
    "ans": 0,
    "why": "Sem parênteses que alterem a ordem, AND tem prioridade sobre OR. Assim, a expressão significa A + (B·C).",
    "time": 90
  },
  {
    "id": "md-136",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 136,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a forma simplificada de A · (¬A + B)?",
    "options": [
      "`¬A · B`",
      "`A + B`",
      "`A`",
      "`A · B`"
    ],
    "ans": 3,
    "why": "Distribuindo, obtém-se A·¬A + A·B = 0 + A·B.",
    "time": 90
  },
  {
    "id": "md-137",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 137,
    "cat": "algebra",
    "d": 1,
    "text": "Qual expressão equivale a (A + B) · (¬A + C), após remover o termo redundante B · C da expansão?",
    "options": [
      "`B · C`",
      "`(A · C) + ((¬A) · B)`",
      "`A + (B · C)`",
      "`(A · B) + ((¬A) · C)`"
    ],
    "ans": 1,
    "why": "A expansão gera A·C + ¬A·B + B·C. Se B·C = 1, A = 1 ativa A·C e A = 0 ativa ¬A·B; portanto, B·C é redundante.",
    "time": 90
  },
  {
    "id": "md-138",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 138,
    "cat": "algebra",
    "d": 1,
    "text": "Aplique De Morgan à expressão ¬((A + B) · C). Qual alternativa está correta?",
    "options": [
      "`(¬A) · (¬B) · (¬C)`",
      "`(A · B) + (¬C)`",
      "`((¬A) + (¬B)) · (¬C)`",
      "`((¬A) · (¬B)) + (¬C)`"
    ],
    "ans": 3,
    "why": "Primeiro, ¬((A+B)·C) = ¬(A+B) + ¬C. Depois, ¬(A+B) = ¬A·¬B.",
    "time": 90
  },
  {
    "id": "md-139",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 139,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de (A + B) · (A + C)?",
    "options": [
      "`A + (B · C)`",
      "`A · B · C`",
      "`A + B + C`",
      "`A · (B + C)`"
    ],
    "ans": 0,
    "why": "A expansão é A + A·C + A·B + B·C. Os termos A·C e A·B são absorvidos por A, restando A + B·C.",
    "time": 90
  },
  {
    "id": "md-140",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 140,
    "cat": "algebra",
    "d": 1,
    "text": "Qual é a simplificação de (A + B + C) · ¬(A + B)?",
    "options": [
      "`(¬A) · (¬B) · C`",
      "`(A + B) · C`",
      "`A + B + C`",
      "`¬(A + B + C)`"
    ],
    "ans": 0,
    "why": "O fator ¬(A+B) exige A = B = 0. Nessas condições, o primeiro fator vale C, produzindo ¬A·¬B·C.",
    "time": 90
  },
  {
    "id": "md-143",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 143,
    "cat": "circuits",
    "d": 0,
    "text": "Um comparador de dois números de dois bits já produz E1 = 1 quando os bits mais significativos são iguais e E0 = 1 quando os bits menos significativos são iguais. Como combinar E1 e E0 para indicar igualdade dos números completos?",
    "options": [
      "Y = XOR(E1,E0).",
      "Y = AND(E1,E0).",
      "Y = NOT(E1).",
      "Y = OR(E1,E0)."
    ],
    "ans": 1,
    "why": "Os números só são iguais se os dois pares de bits correspondentes forem iguais ao mesmo tempo.",
    "time": 90
  },
  {
    "id": "md-144",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 144,
    "cat": "circuits",
    "d": 0,
    "text": "Considere as conexões abaixo. Quais sinais alimentam diretamente a porta que gera Y?\n\n| Etapa | Operação |\n|---|---|\n| 1 | P = OR(A,B) |\n| 2 | Q = NOT(C) |\n| 3 | R = AND(P,Q) |\n| 4 | Y = XOR(R,D) |",
    "options": [
      "A e B.",
      "P e Q.",
      "C e D.",
      "R e D."
    ],
    "ans": 3,
    "why": "A última etapa declara Y = XOR(R,D); os outros sinais influenciam Y por etapas anteriores.",
    "time": 90
  },
  {
    "id": "md-145",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 145,
    "cat": "circuits",
    "d": 0,
    "text": "Um circuito calcula P = OR(A,B) e Y = XOR(P,C). Para A = 0, B = 1 e C = 1, qual afirmação descreve corretamente o percurso do sinal?",
    "options": [
      "P vale 1 e Y vale 1, porque a XOR sempre repete P.",
      "P vale 0 e Y vale 0, porque C bloqueia a OR.",
      "P vale 0 e Y vale 1, porque a OR exige duas entradas 1.",
      "P vale 1 e Y vale 0, porque a XOR recebe duas entradas iguais."
    ],
    "ans": 3,
    "why": "A OR produz P = 1. Em seguida, XOR(1,1) = 0.",
    "time": 90
  },
  {
    "id": "md-146",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 146,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito calcula D = XOR(A,B) e W = AND(D,E). Em uma medição, A = 0, B = 1 e W = 1. Qual alternativa reconstrói corretamente D e E?",
    "options": [
      "D = 0 e E = 0.",
      "D = 1 e E = 1.",
      "D = 1 e E = 0.",
      "D = 0 e E = 1."
    ],
    "ans": 1,
    "why": "As entradas diferentes geram D = 1. Como W = 1, a outra entrada da AND, E, também precisa ser 1.",
    "time": 90
  },
  {
    "id": "md-148",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 148,
    "cat": "circuits",
    "d": 1,
    "text": "Um sistema aceita os códigos de quatro bits de `0000` a `1001` (valores de 0 a 9). O detector I = b3 · (b2 + b1) sinaliza códigos inválidos, sendo b3 o primeiro bit à esquerda. Qual código abaixo ativa I?",
    "options": [
      "`0000`",
      "`1001`",
      "`0111`",
      "`1010`"
    ],
    "ans": 3,
    "why": "Em 1010, b3 = 1 e b1 = 1, logo I = 1. Em 1001, b2 = b1 = 0; nos demais códigos, b3 = 0.",
    "time": 90
  },
  {
    "id": "md-149",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 149,
    "cat": "circuits",
    "d": 1,
    "text": "Um circuito possui P = AND(A,B) e Y = OR(P,C). Uma falha prende o sinal P em 1, independentemente de A e B. Qual passa a ser o comportamento de Y?",
    "options": [
      "Y permanece em 1 para qualquer combinação de A, B e C.",
      "Y permanece em 0 para qualquer combinação.",
      "Y passa a ser a negação de C.",
      "Y passa a acompanhar somente C."
    ],
    "ans": 0,
    "why": "A OR final recebe uma entrada permanentemente em 1, forçando sua saída a 1.",
    "time": 90
  },
  {
    "id": "md-150",
    "source": "50_novas_questoes_logica_digital_101_a_150.md",
    "number": 150,
    "cat": "circuits",
    "d": 1,
    "text": "Uma ventilação deve ligar se houver emergência E = 1, mesmo com bloqueio B = 1. Fora da emergência, deve ligar apenas se T = 1 (temperatura alta) e B = 0. Qual expressão implementa todas essas condições?",
    "options": [
      "`(E + T) · ¬B`",
      "`E + (T · ¬B)`",
      "`E · T · ¬B`",
      "`(E + T) · B`"
    ],
    "ans": 1,
    "why": "E aciona a saída diretamente. O acionamento normal exige T e ¬B, e é combinado com E por OR.",
    "time": 90
  },
  {
    "id": "digital-001",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 1,
    "title": "Circuito de iluminação",
    "cat": "digital",
    "d": 0,
    "text": "Uma sala possui três botões: A, B e C. A iluminação deve ligar quando **A e B estiverem acionados simultaneamente, ou quando C estiver acionado sozinho**. Qual circuito realiza essa função?",
    "options": [
      "Uma AND combina A e B; uma OR combina esse resultado com C.",
      "Uma OR combina A e B; uma AND combina esse resultado com C.",
      "Uma AND combina os três botões.",
      "Uma XOR combina A e B; uma AND combina esse resultado com C."
    ],
    "ans": 0,
    "why": "A AND verifica se A e B estão acionados juntos. A OR permite que C também ligue a iluminação, independentemente dos outros botões. A expressão é `Y = (A · B) + C`.",
    "time": 90
  },
  {
    "id": "digital-002",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 2,
    "title": "Duas saídas independentes",
    "cat": "digital",
    "d": 0,
    "text": "Um circuito recebe A e B e possui duas saídas:\n\n- Uma luz verde recebe o resultado de `AND(A,B)`.\n- Uma luz vermelha recebe o resultado de `NOR(A,B)`.\n\nQuando **A = 0 e B = 1**, como ficam as luzes?",
    "options": [
      "As duas ficam acesas.",
      "Apenas a verde fica acesa.",
      "Apenas a vermelha fica acesa.",
      "As duas ficam apagadas."
    ],
    "ans": 3,
    "why": "A AND produz 0 porque uma das entradas é 0. A NOR também produz 0 porque existe uma entrada em 1. Portanto, nenhuma luz acende.",
    "time": 90
  },
  {
    "id": "digital-003",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 3,
    "title": "Entrada desconhecida",
    "cat": "digital",
    "d": 0,
    "text": "Um circuito inverte A com uma porta NOT e combina o resultado com B usando uma OR:\n\n`Y = ¬A + B`\n\nSabendo que **A = 1 e Y = 0**, qual deve ser o valor de B?",
    "options": [
      "B deve ser 1.",
      "B deve ser 0.",
      "B pode ser 0 ou 1.",
      "Não existe valor de B que produza essa saída."
    ],
    "ans": 1,
    "why": "Como A = 1, a NOT produz 0. Para a OR produzir Y = 0, sua outra entrada também precisa ser 0. Logo, B = 0.",
    "time": 90
  },
  {
    "id": "digital-004",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 4,
    "title": "Quantidade de componentes",
    "cat": "digital",
    "d": 0,
    "text": "Um projeto utiliza as seguintes etapas, **sem simplificar ou substituir nenhuma delas**:\n\n- P = NOT(A)\n- Q = NOT(B)\n- R = AND(P,C)\n- Y = OR(R,Q)\n\nQuantas portas lógicas aparecem nessa implementação?",
    "options": [
      "Duas portas.",
      "Três portas.",
      "Quatro portas.",
      "Cinco portas."
    ],
    "ans": 2,
    "why": "Existem duas portas NOT, uma AND e uma OR, totalizando quatro portas. A reutilização de um sinal não exige uma nova porta.",
    "time": 90
  },
  {
    "id": "digital-005",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 5,
    "title": "Circuito de autorização",
    "cat": "digital",
    "d": 0,
    "text": "Uma máquina possui uma entrada de autorização H e um botão de partida P. Seu funcionamento é definido por:\n\n`Y = H · P`\n\nSe o botão P estiver acionado, mas a autorização H estiver desligada, qual será o comportamento da máquina?",
    "options": [
      "Permanecerá desligada porque falta autorização.",
      "Ligará porque o botão de partida é suficiente.",
      "Alternará automaticamente entre ligada e desligada.",
      "Ligará porque as entradas são diferentes."
    ],
    "ans": 0,
    "why": "Com H = 0 e P = 1, temos `Y = 0 · 1 = 0`. A AND exige que as duas condições sejam atendidas.",
    "time": 90
  },
  {
    "id": "digital-006",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 6,
    "title": "Dois caminhos de processamento",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito possui três etapas:\n\n- P = OR(A,B)\n- Q = AND(B,C)\n- Y = XOR(P,Q)\n\nPara **A = 0, B = 1 e C = 1**, quais são os valores de P, Q e Y, respectivamente?",
    "options": [
      "0, 1 e 1.",
      "1, 0 e 1.",
      "1, 1 e 1.",
      "1, 1 e 0."
    ],
    "ans": 3,
    "why": "A OR produz `P = 0 + 1 = 1`. A AND produz `Q = 1 · 1 = 1`. Como a XOR recebe duas entradas iguais, sua saída é Y = 0.",
    "time": 90
  },
  {
    "id": "digital-007",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 7,
    "title": "Identificação da porta que falta",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito possui duas etapas conhecidas:\n\n- P = OR(A,B)\n- Q = AND(A,B)\n\nUma terceira porta recebe P e Q. A saída final deve ser 1 **somente quando exatamente uma das entradas originais A e B for 1**.\n\nQual porta deve ser colocada na terceira etapa?",
    "options": [
      "AND.",
      "XOR.",
      "OR.",
      "NOR."
    ],
    "ans": 1,
    "why": "Para A e B iguais a 00, P e Q são 00. Para 01 ou 10, P e Q são 10. Para 11, P e Q são 11. A XOR entre P e Q produz 1 somente nos dois casos desejados.",
    "time": 90
  },
  {
    "id": "digital-008",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 8,
    "title": "Detecção de falha",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito deveria funcionar assim:\n\n- P = NOT(A)\n- Y = AND(P,B)\n\nEntretanto, a porta NOT apresentou uma falha e passou a **repetir A sem invertê-lo**.\n\nQual teste faz o circuito correto produzir **Y = 1** e o circuito defeituoso produzir **Y = 0**?",
    "options": [
      "A = 0 e B = 0.",
      "A = 1 e B = 0.",
      "A = 0 e B = 1.",
      "A = 1 e B = 1."
    ],
    "ans": 2,
    "why": "No circuito correto, A = 0 é invertido para 1, então `Y = 1 · 1 = 1`. No defeituoso, A permanece em 0, resultando em `Y = 0 · 1 = 0`.",
    "time": 90
  },
  {
    "id": "digital-009",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 9,
    "title": "Alteração de uma entrada",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito possui:\n\n- P = NAND(A,B)\n- Y = AND(P,C)\n\nInicialmente, **A = 1, B = 0 e C = 1**. Depois, apenas B muda para 1.\n\nComo a saída Y se comporta, comparando os valores estabilizados antes e depois da mudança?",
    "options": [
      "Passa de 1 para 0.",
      "Passa de 0 para 1.",
      "Permanece em 0.",
      "Permanece em 1."
    ],
    "ans": 0,
    "why": "Inicialmente, `NAND(1,0) = 1`, então Y = 1. Depois, `NAND(1,1) = 0`, então Y = 0, mesmo com C permanecendo em 1.",
    "time": 90
  },
  {
    "id": "digital-010",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 10,
    "title": "Interpretação de um circuito completo",
    "cat": "digital",
    "d": 1,
    "text": "Um sistema recebe três sinais:\n\n- A = 1 indica presença de uma pessoa.\n- B = 1 indica presença de um veículo.\n- C = 1 indica que o monitoramento está habilitado.\n\nO circuito calcula:\n\n- P = OR(A,B)\n- Q = AND(P,C)\n- Y = NOT(Q)\n\nEm qual situação a saída **Y será 0**?",
    "options": [
      "Quando o monitoramento estiver desabilitado, independentemente dos sensores.",
      "Quando não houver pessoa nem veículo, mesmo com o monitoramento habilitado.",
      "Somente quando pessoa e veículo forem detectados juntos, com o monitoramento desabilitado.",
      "Quando o monitoramento estiver habilitado e pelo menos um dos sensores detectar presença."
    ],
    "ans": 3,
    "why": "Para Y = 0, a entrada da NOT deve ser Q = 1. Isso exige C = 1 e P = 1. Como P é a OR entre A e B, basta que um dos sensores detecte presença.",
    "time": 90
  },
  {
    "id": "digital-011",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 11,
    "title": "Sinais digitais",
    "cat": "digital",
    "d": 0,
    "text": "Um circuito digital binário trabalha com níveis lógicos representados por 0 e 1. O que esses valores representam?",
    "options": [
      "Obrigatoriamente, tensões de 0 volt e 1 volt.",
      "Dois estados lógicos distintos, associados a níveis físicos de sinal.",
      "A quantidade de portas presentes no circuito.",
      "A velocidade de funcionamento do circuito."
    ],
    "ans": 1,
    "why": "Os valores 0 e 1 representam dois estados lógicos. As tensões utilizadas para representar esses estados dependem da tecnologia do circuito.",
    "time": 90
  },
  {
    "id": "digital-012",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 12,
    "title": "Bloqueio de funcionamento",
    "cat": "digital",
    "d": 0,
    "text": "Um ventilador deve funcionar quando o comando L estiver em 1, desde que o bloqueio B esteja em 0.\n\nQual expressão representa esse funcionamento?",
    "options": [
      "`Y = L + B`",
      "`Y = L · B`",
      "`Y = L · ¬B`",
      "`Y = ¬L · B`"
    ],
    "ans": 2,
    "why": "O ventilador exige o comando L ativo e o bloqueio B desativado. Por isso, combina-se L com a negação de B usando AND.",
    "time": 90
  },
  {
    "id": "digital-013",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 13,
    "title": "Reutilização de um sinal",
    "cat": "digital",
    "d": 0,
    "text": "A saída P de uma porta lógica é conectada às entradas de outras duas portas. Em um circuito ideal, o que acontece com o valor lógico de P?",
    "options": [
      "O valor é dividido: cada ligação recebe metade.",
      "Uma ligação recebe P e a outra recebe ¬P.",
      "P passa automaticamente a valer 0.",
      "As duas ligações recebem o mesmo valor lógico de P."
    ],
    "ans": 3,
    "why": "Conectar um sinal a duas entradas distribui seu valor lógico para ambas. Isso não divide nem inverte o bit.",
    "time": 90
  },
  {
    "id": "digital-014",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 14,
    "title": "Saídas complementares",
    "cat": "digital",
    "d": 0,
    "text": "Um circuito possui duas luzes:\n\n- Luz azul: `Y1 = A + B`\n- Luz amarela: `Y2 = ¬Y1`\n\nQual afirmação é correta após a estabilização dos sinais?",
    "options": [
      "Exatamente uma das luzes estará acesa.",
      "As duas luzes estarão sempre acesas.",
      "As duas luzes estarão sempre apagadas.",
      "As duas luzes terão sempre o mesmo estado."
    ],
    "ans": 0,
    "why": "Y2 é o complemento de Y1. Quando uma saída vale 1, a outra vale 0.",
    "time": 90
  },
  {
    "id": "digital-015",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 15,
    "title": "Dois caminhos para ativação",
    "cat": "digital",
    "d": 0,
    "text": "Um sistema possui dois pares de sensores. A saída deve ligar quando **A e B estiverem ativos juntos ou quando C e D estiverem ativos juntos**.\n\nQual expressão atende a essa regra?",
    "options": [
      "`Y = A · B · C · D`",
      "`Y = (A · B) + (C · D)`",
      "`Y = (A + B) · (C + D)`",
      "`Y = A + B + C + D`"
    ],
    "ans": 1,
    "why": "Cada par é verificado por uma AND. A OR combina os dois resultados, permitindo que qualquer um dos pares completos ative a saída.",
    "time": 90
  },
  {
    "id": "digital-016",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 16,
    "title": "Circuito com NOR e XOR",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito possui:\n\n- `P = NOR(A,B)`\n- `Y = XOR(P,C)`\n\nPara **A = 0, B = 0 e C = 1**, quais são os valores de P e Y?",
    "options": [
      "P = 0 e Y = 0.",
      "P = 0 e Y = 1.",
      "P = 1 e Y = 0.",
      "P = 1 e Y = 1."
    ],
    "ans": 2,
    "why": "A NOR recebe duas entradas 0 e produz P = 1. Depois, a XOR recebe 1 e 1, produzindo Y = 0.",
    "time": 90
  },
  {
    "id": "digital-017",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 17,
    "title": "Saída constante",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito calcula:\n\n- `P = AND(A,B)`\n- `Q = NAND(A,B)`\n- `Y = OR(P,Q)`\n\nComo a saída Y se comporta?",
    "options": [
      "É sempre igual a A.",
      "É sempre igual a B.",
      "Permanece sempre em 0.",
      "Permanece sempre em 1."
    ],
    "ans": 3,
    "why": "Q é a negação de P. Portanto, a saída final é `Y = P + ¬P`, que sempre vale 1.",
    "time": 90
  },
  {
    "id": "digital-018",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 18,
    "title": "Reconstrução das entradas",
    "cat": "digital",
    "d": 1,
    "text": "Um circuito possui duas saídas:\n\n- `P = XOR(A,B)`\n- `Q = AND(A,B)`\n\nDurante um teste, foram observados **P = 1 e Q = 0**. Quais combinações de entrada são compatíveis com essa observação?",
    "options": [
      "Apenas A = 0 e B = 0.",
      "A = 0 e B = 1, ou A = 1 e B = 0.",
      "Apenas A = 1 e B = 1.",
      "A = 0 e B = 0, ou A = 1 e B = 1."
    ],
    "ans": 1,
    "why": "P = 1 indica que as entradas são diferentes. Tanto 01 quanto 10 também produzem Q = 0 na AND.",
    "time": 90
  },
  {
    "id": "digital-019",
    "source": "20_questoes_circuitos_digitais.md",
    "number": 19,
    "title": "Controle com prioridade",
    "cat": "digital",
    "d": 1,
    "text": "Uma bomba possui três entradas:\n\n- A: solicitação automática.\n- M: solicitação manual.\n- S: condição de segurança, sendo 1 quando a operação é permitida.\n\nA bomba deve ligar se houver solicitação automática ou manual, mas **nenhuma solicitação pode ligar a bomba quando S = 0**.\n\nQual expressão implementa essa regra?",
    "options": [
      "`Y = A + (M · S)`",
      "`Y = (A · M) + S`",
      "`Y = (A + M) · S`",
      "`Y = A + M + S`"
    ],
    "ans": 2,
    "why": "A OR reúne as duas formas de solicitação. A AND com S garante que a condição de segurança seja obrigatória para qualquer acionamento.",
    "time": 90
  }
];
