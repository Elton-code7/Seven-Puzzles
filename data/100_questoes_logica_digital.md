# 100 questões de lógica digital — níveis fácil e médio

**Formato:** múltipla escolha, com quatro alternativas e uma única resposta correta por questão. A resposta e uma explicação breve aparecem imediatamente após as alternativas.

**Distribuição:** questões por categoria, sendo  fáceis e  médias.

## Convenções de leitura

- `0` representa falso ou nível lógico baixo; `1` representa verdadeiro ou nível lógico alto.
- `A · B` significa AND (E); `A + B` significa OR (OU inclusivo); `¬A` significa NOT (NÃO); `A ⊕ B` significa XOR (OU exclusivo).
- `NAND(A,B) = ¬(A · B)` e `NOR(A,B) = ¬(A + B)`.
- O símbolo `+` representa OR nas expressões booleanas, não soma aritmética. A questão sobre meio somador identifica explicitamente a soma binária.
- Parênteses são resolvidos primeiro. Sem parênteses, a ordem é NOT, AND e OR. As expressões com XOR têm seu agrupamento indicado quando necessário.
- Em `00, 01, 10, 11`, o primeiro bit corresponde a A e o segundo a B. Sequências de saídas seguem exatamente a ordem de entradas indicada no enunciado.
- Nos circuitos, X, Z, S, T e Y são sinais identificados no próprio enunciado. Considere portas ideais e sinais já estabilizados.
- Nas tabelas, X e Z podem representar valores a completar quando o enunciado assim indicar.



---

## Portas lógicas — AND, OR e NOT

### Questão 001 — Fácil

Em uma porta AND de duas entradas, quando a saída é igual a 1?

- **A)** Quando as duas entradas são 1.
- **B)** Quando as entradas são diferentes.
- **C)** Quando pelo menos uma entrada é 1.
- **D)** Quando as duas entradas são 0.

**Resposta correta: A) Quando as duas entradas são 1.**

**Explicação:** A AND exige que todas as suas entradas sejam 1.

---

### Questão 002 — Fácil

Qual porta de duas entradas produz saída 1 quando pelo menos uma entrada é 1, inclusive quando ambas são 1?

- **A)** OR
- **B)** NOT
- **C)** XOR
- **D)** AND

**Resposta correta: A) OR**

**Explicação:** A OR representa o OU inclusivo.

---

### Questão 003 — Fácil

Qual é a função de uma porta NOT?

- **A)** Inverter o valor lógico da entrada.
- **B)** Repetir o valor lógico da entrada.
- **C)** Somar dois números binários completos.
- **D)** Manter sempre a saída em 1.

**Resposta correta: A) Inverter o valor lógico da entrada.**

**Explicação:** A NOT transforma 0 em 1 e 1 em 0.

---

### Questão 004 — Fácil

Para A = 1 e B = 0, quais são, nessa ordem, as saídas de AND(A,B) e OR(A,B)?

- **A)** `1, 0`
- **B)** `0, 0`
- **C)** `1, 1`
- **D)** `0, 1`

**Resposta correta: D) `0, 1`**

**Explicação:** A AND resulta em 0 e a OR resulta em 1.

---

### Questão 005 — Fácil

Uma NOT recebe, em três instantes consecutivos, os valores 0, 1 e 0. Qual é a sequência de saídas?

- **A)** `1, 1, 0`
- **B)** `0, 0, 1`
- **C)** `1, 0, 1`
- **D)** `0, 1, 0`

**Resposta correta: C) `1, 0, 1`**

**Explicação:** Cada valor da entrada é invertido.

---

### Questão 006 — Fácil

Uma lâmpada deve acender somente quando dois interruptores lógicos, A e B, estiverem em 1. Qual porta implementa essa regra?

- **A)** OR
- **B)** NOT
- **C)** NOR
- **D)** AND

**Resposta correta: D) AND**

**Explicação:** A condição exige A = 1 e B = 1 simultaneamente.

---

### Questão 007 — Fácil

Um aviso deve ligar quando o sensor A ou o sensor B estiver em 1, inclusive se os dois estiverem em 1. Qual porta deve ser usada?

- **A)** NOT
- **B)** AND
- **C)** OR
- **D)** NAND

**Resposta correta: C) OR**

**Explicação:** Basta uma das entradas ser 1 para a OR ativar a saída.

---

### Questão 008 — Fácil

Qual alternativa descreve corretamente a quantidade de entradas e saídas de uma porta NOT convencional?

- **A)** Duas entradas e uma saída.
- **B)** Uma entrada e uma saída.
- **C)** Uma entrada e duas saídas.
- **D)** Duas entradas e duas saídas.

**Resposta correta: B) Uma entrada e uma saída.**

**Explicação:** A NOT opera sobre uma única entrada lógica.

---

### Questão 009 — Fácil

Uma porta AND de três entradas recebe A = 1, B = 1 e C = 0. Qual alternativa apresenta o resultado e sua justificativa?

- **A)** Saída 1, porque pelo menos uma entrada é 1.
- **B)** Saída 1, porque a maioria das entradas é 1.
- **C)** Saída 0, porque existe uma entrada em 0.
- **D)** Saída 0, porque as três entradas são 1.

**Resposta correta: C) Saída 0, porque existe uma entrada em 0.**

**Explicação:** Na AND, uma única entrada 0 já força a saída a 0.

---

### Questão 010 — Fácil

Em qual combinação uma porta OR de três entradas apresenta saída 0?

- **A)** A = 0, B = 1 e C = 0.
- **B)** A = 1, B = 0 e C = 0.
- **C)** A = 0, B = 0 e C = 0.
- **D)** A = 0, B = 0 e C = 1.

**Resposta correta: C) A = 0, B = 0 e C = 0.**

**Explicação:** A OR só apresenta saída 0 quando todas as entradas são 0.

---

### Questão 011 — Médio

A saída de uma NOT é conectada à entrada de outra NOT. Qual é o efeito sobre o sinal original A?

- **A)** A saída final é igual a A.
- **B)** A saída final é sempre 0.
- **C)** A saída final é sempre ¬A.
- **D)** A saída final é sempre 1.

**Resposta correta: A) A saída final é igual a A.**

**Explicação:** Duas inversões se anulam: ¬(¬A) = A.

---

### Questão 012 — Médio

Uma porta AND recebe A e uma entrada fixa em 1. Como sua saída se comporta?

- **A)** A saída é sempre ¬A.
- **B)** A saída é sempre 1.
- **C)** A saída acompanha A.
- **D)** A saída é sempre 0.

**Resposta correta: C) A saída acompanha A.**

**Explicação:** Na álgebra booleana, A · 1 = A.

---

### Questão 013 — Médio

Uma porta OR recebe A e uma entrada fixa em 0. Como sua saída se comporta?

- **A)** A saída acompanha A.
- **B)** A saída é sempre 1.
- **C)** A saída é sempre ¬A.
- **D)** A saída é sempre 0.

**Resposta correta: A) A saída acompanha A.**

**Explicação:** Na álgebra booleana, A + 0 = A.

---

### Questão 014 — Médio

Em Y = A · B, sabe-se que Y = 1. O que é possível concluir?

- **A)** Apenas uma das entradas é 1.
- **B)** A = 1 e B = 1.
- **C)** As entradas são necessariamente diferentes.
- **D)** A = 0 e B = 0.

**Resposta correta: B) A = 1 e B = 1.**

**Explicação:** A única combinação que ativa uma AND de duas entradas é 11.

---

### Questão 015 — Médio

Em Y = A + B, sabe-se que Y = 0. O que é possível concluir?

- **A)** A e B são necessariamente diferentes.
- **B)** A = 0 e B = 0.
- **C)** A = 1 e B = 1.
- **D)** B = 1, independentemente de A.

**Resposta correta: B) A = 0 e B = 0.**

**Explicação:** Para uma OR produzir 0, nenhuma entrada pode ser 1.

---

### Questão 016 — Médio

Uma OR recebe A e B. A permanece em 1 enquanto B muda de 0 para 1. O que acontece com a saída?

- **A)** Muda de 1 para 0.
- **B)** Permanece em 1.
- **C)** Muda de 0 para 1.
- **D)** Permanece em 0.

**Resposta correta: B) Permanece em 1.**

**Explicação:** A entrada A = 1 já garante a saída 1 da OR.

---

### Questão 017 — Médio

Uma AND recebe A e B. B permanece em 0 enquanto A muda de 0 para 1. O que acontece com a saída?

- **A)** Muda de 0 para 1.
- **B)** Permanece em 0.
- **C)** Muda de 1 para 0.
- **D)** Permanece em 1.

**Resposta correta: B) Permanece em 0.**

**Explicação:** A entrada B = 0 bloqueia a saída da AND.

---

### Questão 018 — Médio

Um equipamento deve ligar quando A = 1 e B = 0. Qual expressão representa essa condição?

- **A)** `¬A · B`
- **B)** `¬(A · B)`
- **C)** `A · ¬B`
- **D)** `A + B`

**Resposta correta: C) `A · ¬B`**

**Explicação:** É necessário combinar A com a negação de B usando AND.

---

### Questão 019 — Médio

Um sensor fornece A = 1 quando uma porta física está fechada. Qual expressão faz um aviso Y ligar somente quando essa porta está aberta?

- **A)** Y = ¬A.
- **B)** Y = A + 1.
- **C)** Y = A.
- **D)** Y = A · 0.

**Resposta correta: A) Y = ¬A.**

**Explicação:** Porta aberta corresponde a A = 0; a NOT converte esse valor em Y = 1.

---

### Questão 020 — Médio

Duas portas recebem as mesmas entradas A e B: uma AND e uma OR. Em quais combinações suas saídas são iguais?

- **A)** Em 00 e 11.
- **B)** Em todas as combinações.
- **C)** Em 01 e 10.
- **D)** Somente em 00.

**Resposta correta: A) Em 00 e 11.**

**Explicação:** Em 00, ambas produzem 0; em 11, ambas produzem 1.

---

## Portas derivadas — NAND, NOR e XOR

### Questão 021 — Fácil

A porta NAND equivale a qual composição?

- **A)** Uma NOT seguida de outra NOT.
- **B)** Uma XOR seguida de uma NOT.
- **C)** Uma OR seguida de uma NOT.
- **D)** Uma AND seguida de uma NOT.

**Resposta correta: D) Uma AND seguida de uma NOT.**

**Explicação:** NAND significa a negação da operação AND.

---

### Questão 022 — Fácil

A porta NOR equivale a qual composição?

- **A)** Uma AND seguida de outra AND.
- **B)** Uma AND seguida de uma NOT.
- **C)** Uma OR seguida de uma NOT.
- **D)** Uma NOT seguida de outra NOT.

**Resposta correta: C) Uma OR seguida de uma NOT.**

**Explicação:** NOR significa a negação da operação OR.

---

### Questão 023 — Fácil

Quando uma XOR de duas entradas produz saída 1?

- **A)** Quando as duas entradas são 1.
- **B)** Quando as duas entradas são 0.
- **C)** Quando as duas entradas são diferentes.
- **D)** Quando as duas entradas são iguais.

**Resposta correta: C) Quando as duas entradas são diferentes.**

**Explicação:** A XOR representa o OU exclusivo entre duas entradas.

---

### Questão 024 — Fácil

Qual combinação faz uma NAND de duas entradas produzir 0?

- **A)** A = 0 e B = 1.
- **B)** A = 0 e B = 0.
- **C)** A = 1 e B = 0.
- **D)** A = 1 e B = 1.

**Resposta correta: D) A = 1 e B = 1.**

**Explicação:** A NAND só produz 0 quando a AND correspondente produziria 1.

---

### Questão 025 — Fácil

Qual combinação faz uma NOR de duas entradas produzir 1?

- **A)** A = 1 e B = 1.
- **B)** A = 1 e B = 0.
- **C)** A = 0 e B = 0.
- **D)** A = 0 e B = 1.

**Resposta correta: C) A = 0 e B = 0.**

**Explicação:** A NOR só produz 1 quando a OR correspondente produziria 0.

---

### Questão 026 — Fácil

Para A = 1 e B = 1, quais são as saídas de NAND, NOR e XOR, nessa ordem?

- **A)** `0, 1, 1`
- **B)** `1, 0, 1`
- **C)** `1, 1, 0`
- **D)** `0, 0, 0`

**Resposta correta: D) `0, 0, 0`**

**Explicação:** NAND e NOR negam resultados iguais a 1; a XOR de entradas iguais resulta em 0.

---

### Questão 027 — Fácil

Para A = 0 e B = 0, quais são as saídas de NAND, NOR e XOR, nessa ordem?

- **A)** `1, 1, 0`
- **B)** `0, 1, 1`
- **C)** `0, 0, 0`
- **D)** `1, 0, 1`

**Resposta correta: A) `1, 1, 0`**

**Explicação:** NAND e NOR negam resultados iguais a 0; a XOR de entradas iguais resulta em 0.

---

### Questão 028 — Fácil

Para A = 1 e B = 0, quais são as saídas de NAND, NOR e XOR, nessa ordem?

- **A)** `1, 0, 1`
- **B)** `1, 1, 0`
- **C)** `0, 0, 1`
- **D)** `0, 1, 1`

**Resposta correta: A) `1, 0, 1`**

**Explicação:** A AND resulta em 0, a OR em 1 e as entradas são diferentes.

---

### Questão 029 — Fácil

Um indicador deve acender quando dois sensores apresentam valores diferentes. Qual porta implementa diretamente essa comparação?

- **A)** AND
- **B)** OR
- **C)** NOR
- **D)** XOR

**Resposta correta: D) XOR**

**Explicação:** A XOR detecta diferença entre dois bits.

---

### Questão 030 — Fácil

Qual é a diferença entre OR e XOR de duas entradas quando A = 1 e B = 1?

- **A)** As duas produzem 1.
- **B)** As duas produzem 0.
- **C)** A OR produz 1 e a XOR produz 0.
- **D)** A OR produz 0 e a XOR produz 1.

**Resposta correta: C) A OR produz 1 e a XOR produz 0.**

**Explicação:** A OR aceita ambas as entradas em 1; a XOR exige entradas diferentes.

---

### Questão 031 — Médio

As duas entradas de uma NAND são conectadas ao mesmo sinal A. Qual é a saída?

- **A)** A.
- **B)** Sempre 1.
- **C)** ¬A.
- **D)** Sempre 0.

**Resposta correta: C) ¬A.**

**Explicação:** ¬(A · A) = ¬A; a NAND pode funcionar como inversor.

---

### Questão 032 — Médio

As duas entradas de uma NOR são conectadas ao mesmo sinal A. Qual é a saída?

- **A)** A.
- **B)** ¬A.
- **C)** Sempre 0.
- **D)** Sempre 1.

**Resposta correta: B) ¬A.**

**Explicação:** ¬(A + A) = ¬A; a NOR também pode funcionar como inversor.

---

### Questão 033 — Médio

Uma XOR recebe A e uma entrada fixa em 0. Qual é a saída?

- **A)** Sempre 1.
- **B)** A.
- **C)** ¬A.
- **D)** Sempre 0.

**Resposta correta: B) A.**

**Explicação:** A ⊕ 0 = A.

---

### Questão 034 — Médio

Uma XOR recebe A e uma entrada fixa em 1. Qual é a saída?

- **A)** ¬A.
- **B)** A.
- **C)** Sempre 1.
- **D)** Sempre 0.

**Resposta correta: A) ¬A.**

**Explicação:** A ⊕ 1 = ¬A.

---

### Questão 035 — Médio

Uma NAND recebe A e uma entrada fixa em 0. Qual é a saída?

- **A)** A.
- **B)** Sempre 0.
- **C)** ¬A.
- **D)** Sempre 1.

**Resposta correta: D) Sempre 1.**

**Explicação:** Como A · 0 = 0, sua negação é sempre 1.

---

### Questão 036 — Médio

Uma NOR recebe A e uma entrada fixa em 1. Qual é a saída?

- **A)** Sempre 0.
- **B)** ¬A.
- **C)** A.
- **D)** Sempre 1.

**Resposta correta: A) Sempre 0.**

**Explicação:** Como A + 1 = 1, sua negação é sempre 0.

---

### Questão 037 — Médio

A saída de uma NAND(A,B) passa por uma NOT. A qual porta de duas entradas o conjunto equivale?

- **A)** XOR
- **B)** NOR
- **C)** OR
- **D)** AND

**Resposta correta: D) AND**

**Explicação:** A NOT cancela a inversão da NAND: ¬(¬(A · B)) = A · B.

---

### Questão 038 — Médio

A saída de uma NOR(A,B) passa por uma NOT. A qual porta de duas entradas o conjunto equivale?

- **A)** NAND
- **B)** OR
- **C)** XOR
- **D)** AND

**Resposta correta: B) OR**

**Explicação:** A NOT cancela a inversão da NOR: ¬(¬(A + B)) = A + B.

---

### Questão 039 — Médio

Quais portas são universais, isto é, permitem implementar qualquer função booleana usando apenas cópias de uma delas?

- **A)** NAND e NOR.
- **B)** AND e XOR.
- **C)** AND e OR.
- **D)** XOR e NOT.

**Resposta correta: A) NAND e NOR.**

**Explicação:** Cada uma das portas NAND e NOR, isoladamente como tipo de porta, permite construir NOT, AND e OR.

---

### Questão 040 — Médio

Um detector deve ativar Y quando dois bits forem iguais. Qual composição atende a essa regra?

- **A)** OR seguida de NOT.
- **B)** AND seguida de NOT.
- **C)** XOR seguida de NOT.
- **D)** Duas NOT em sequência aplicadas apenas a A.

**Resposta correta: C) XOR seguida de NOT.**

**Explicação:** A XOR detecta diferença; inverter sua saída detecta igualdade, operação chamada XNOR.

---

## Tabelas-verdade — combinações de entradas e saídas

### Questão 041 — Fácil

Quantas linhas de combinações possui a tabela-verdade de uma função com duas entradas binárias independentes?

- **A)** 4 linhas.
- **B)** 2 linhas.
- **C)** 8 linhas.
- **D)** 3 linhas.

**Resposta correta: A) 4 linhas.**

**Explicação:** Cada entrada tem duas possibilidades: 2² = 4 combinações.

---

### Questão 042 — Fácil

Quantas linhas de combinações possui a tabela-verdade de uma função com três entradas binárias independentes?

- **A)** 6 linhas.
- **B)** 8 linhas.
- **C)** 9 linhas.
- **D)** 3 linhas.

**Resposta correta: B) 8 linhas.**

**Explicação:** O número de combinações é 2³ = 8.

---

### Questão 043 — Fácil

Qual sequência contém todas as combinações de duas entradas A e B, sem repetição?

- **A)** 00, 01, 01, 11.
- **B)** 00, 01, 10, 11.
- **C)** 01, 10, 11, 12.
- **D)** 00, 10, 11.

**Resposta correta: B) 00, 01, 10, 11.**

**Explicação:** Os quatro pares binários possíveis são 00, 01, 10 e 11.

---

### Questão 044 — Fácil

Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta AND?

- **A)** `0, 1, 1, 0`
- **B)** `0, 0, 0, 1`
- **C)** `0, 1, 1, 1`
- **D)** `1, 1, 1, 0`

**Resposta correta: B) `0, 0, 0, 1`**

**Explicação:** A AND só produz 1 na combinação 11.

---

### Questão 045 — Fácil

Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta OR?

- **A)** `0, 0, 0, 1`
- **B)** `0, 1, 1, 1`
- **C)** `0, 1, 1, 0`
- **D)** `1, 0, 0, 0`

**Resposta correta: B) `0, 1, 1, 1`**

**Explicação:** A OR só produz 0 na combinação 00.

---

### Questão 046 — Fácil

Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta XOR?

- **A)** `0, 1, 1, 1`
- **B)** `1, 0, 0, 1`
- **C)** `0, 1, 1, 0`
- **D)** `0, 0, 0, 1`

**Resposta correta: C) `0, 1, 1, 0`**

**Explicação:** A XOR produz 1 nas combinações 01 e 10.

---

### Questão 047 — Fácil

Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta NAND?

- **A)** `1, 0, 0, 0`
- **B)** `0, 0, 0, 1`
- **C)** `0, 1, 1, 0`
- **D)** `1, 1, 1, 0`

**Resposta correta: D) `1, 1, 1, 0`**

**Explicação:** A NAND é a inversão da AND.

---

### Questão 048 — Fácil

Na ordem de entradas (A,B) = 00, 01, 10, 11, qual é a sequência de saídas de uma porta NOR?

- **A)** `1, 1, 1, 0`
- **B)** `1, 0, 0, 1`
- **C)** `1, 0, 0, 0`
- **D)** `0, 1, 1, 1`

**Resposta correta: C) `1, 0, 0, 0`**

**Explicação:** A NOR só produz 1 na combinação 00.

---

### Questão 049 — Fácil

Observe a tabela. Qual porta corresponde à saída Y?

| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

- **A)** OR
- **B)** NOR
- **C)** AND
- **D)** XOR

**Resposta correta: C) AND**

**Explicação:** Somente a combinação 11 ativa a saída.

---

### Questão 050 — Fácil

Complete a tabela de uma NOT. Quais valores substituem X e Z, respectivamente?

| A | Y = ¬A |
|---|---|
| 0 | X |
| 1 | Z |

- **A)** X = 1 e Z = 1.
- **B)** X = 1 e Z = 0.
- **C)** X = 0 e Z = 0.
- **D)** X = 0 e Z = 1.

**Resposta correta: B) X = 1 e Z = 0.**

**Explicação:** A NOT sempre inverte a entrada.

---

### Questão 051 — Médio

Uma função tem quatro entradas binárias independentes e duas saídas. Quantas linhas de combinações de entrada sua tabela-verdade completa possui?

- **A)** 32 linhas.
- **B)** 8 linhas.
- **C)** 16 linhas.
- **D)** 64 linhas.

**Resposta correta: C) 16 linhas.**

**Explicação:** A quantidade de linhas depende das entradas: 2⁴ = 16. Ter duas saídas acrescenta colunas, não combinações de entrada.

---

### Questão 052 — Médio

Na tabela-verdade completa de uma OR de três entradas, em quantas linhas a saída é 1?

- **A)** 1 linha.
- **B)** 3 linhas.
- **C)** 7 linhas.
- **D)** 4 linhas.

**Resposta correta: C) 7 linhas.**

**Explicação:** Das oito combinações, apenas 000 produz saída 0.

---

### Questão 053 — Médio

Na tabela-verdade completa de uma AND de três entradas, em quantas linhas a saída é 1?

- **A)** 7 linhas.
- **B)** 1 linha.
- **C)** 3 linhas.
- **D)** 4 linhas.

**Resposta correta: B) 1 linha.**

**Explicação:** Somente a combinação 111 produz saída 1.

---

### Questão 054 — Médio

Para Y = ¬A · B, qual é a sequência de saídas na ordem (A,B) = 00, 01, 10, 11?

- **A)** `0, 1, 1, 1`
- **B)** `1, 0, 1, 0`
- **C)** `0, 0, 1, 0`
- **D)** `0, 1, 0, 0`

**Resposta correta: D) `0, 1, 0, 0`**

**Explicação:** A saída só é 1 quando A = 0 e B = 1.

---

### Questão 055 — Médio

Para Y = A + ¬B, qual é a sequência de saídas na ordem (A,B) = 00, 01, 10, 11?

- **A)** `1, 1, 0, 1`
- **B)** `1, 0, 1, 1`
- **C)** `0, 0, 1, 1`
- **D)** `0, 1, 1, 1`

**Resposta correta: B) `1, 0, 1, 1`**

**Explicação:** A única combinação que produz 0 é A = 0 e B = 1.

---

### Questão 056 — Médio

Para Y = (A + B) · C, complete X e Z na tabela parcial abaixo.

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 1 | X |
| 0 | 1 | 1 | Z |

- **A)** X = 0 e Z = 1.
- **B)** X = 1 e Z = 1.
- **C)** X = 0 e Z = 0.
- **D)** X = 1 e Z = 0.

**Resposta correta: A) X = 0 e Z = 1.**

**Explicação:** Na primeira linha, (0 + 0) · 1 = 0; na segunda, (0 + 1) · 1 = 1.

---


### Questão 058 — Médio

Para Y = (A · B) + C, qual das combinações abaixo produz saída 0?

- **A)** A = 0, B = 1, C = 1.
- **B)** A = 1, B = 1, C = 0.
- **C)** A = 0, B = 0, C = 1.
- **D)** A = 1, B = 0, C = 0.

**Resposta correta: D) A = 1, B = 0, C = 0.**

**Explicação:** Em 100, A · B = 0 e C = 0; nas outras alternativas, pelo menos um termo da OR vale 1.

---

### Questão 059 — Médio

Observe a tabela. Qual expressão representa a saída Y?

| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

- **A)** Y = A ⊕ B.
- **B)** Y = ¬(A · B).
- **C)** Y = A + B.
- **D)** Y = ¬(A ⊕ B).

**Resposta correta: D) Y = ¬(A ⊕ B).**

**Explicação:** A saída vale 1 quando A e B são iguais, correspondendo à negação da XOR.

---

### Questão 060 — Médio

Duas expressões usam as mesmas três entradas. Qual procedimento comprova, por tabela-verdade, que são equivalentes?

- **A)** Comparar somente a combinação 111.
- **B)** Comparar suas saídas nas oito combinações e verificar que são iguais em todas.
- **C)** Comparar somente a combinação 000.
- **D)** Verificar apenas se possuem o mesmo número de operações.

**Resposta correta: B) Comparar suas saídas nas oito combinações e verificar que são iguais em todas.**

**Explicação:** Equivalência exige saídas iguais para todas as combinações possíveis de entradas.

---

## Álgebra booleana — expressões e simplificação

### Questão 061 — Fácil

Qual é a simplificação de A + 0?

- **A)** `1`
- **B)** `¬A`
- **C)** `0`
- **D)** `A`

**Resposta correta: D) `A`**

**Explicação:** O elemento neutro da OR é 0.

---

### Questão 062 — Fácil

Qual é a simplificação de A · 1?

- **A)** `1`
- **B)** `0`
- **C)** `A`
- **D)** `¬A`

**Resposta correta: C) `A`**

**Explicação:** O elemento neutro da AND é 1.

---

### Questão 063 — Fácil

Qual é a simplificação de A + 1?

- **A)** `A`
- **B)** `¬A`
- **C)** `0`
- **D)** `1`

**Resposta correta: D) `1`**

**Explicação:** Uma entrada 1 força a saída da OR a 1.

---

### Questão 064 — Fácil

Qual é a simplificação de A · 0?

- **A)** `A`
- **B)** `1`
- **C)** `¬A`
- **D)** `0`

**Resposta correta: D) `0`**

**Explicação:** Uma entrada 0 força a saída da AND a 0.

---

### Questão 065 — Fácil

Qual é a simplificação de A + A?

- **A)** `¬A`
- **B)** `A`
- **C)** `0`
- **D)** `1`

**Resposta correta: B) `A`**

**Explicação:** Pela idempotência, repetir a mesma variável na OR não altera o resultado.

---

### Questão 066 — Fácil

Qual é a simplificação de A · A?

- **A)** `A`
- **B)** `0`
- **C)** `1`
- **D)** `¬A`

**Resposta correta: A) `A`**

**Explicação:** Pela idempotência, repetir a mesma variável na AND não altera o resultado.

---

### Questão 067 — Fácil

Qual é a simplificação de A + ¬A?

- **A)** `A`
- **B)** `1`
- **C)** `¬A`
- **D)** `0`

**Resposta correta: B) `1`**

**Explicação:** Entre A e ¬A, um dos valores é sempre 1.

---

### Questão 068 — Fácil

Qual é a simplificação de A · ¬A?

- **A)** `1`
- **B)** `¬A`
- **C)** `0`
- **D)** `A`

**Resposta correta: C) `0`**

**Explicação:** A e ¬A nunca são 1 simultaneamente.

---

### Questão 069 — Fácil

Qual é a simplificação de ¬(¬A)?

- **A)** `A`
- **B)** `¬A`
- **C)** `0`
- **D)** `1`

**Resposta correta: A) `A`**

**Explicação:** A dupla negação recupera o valor original.

---

### Questão 070 — Fácil

Qual igualdade expressa a propriedade comutativa da operação OR?

- **A)** A + B = ¬A + ¬B.
- **B)** A + B = A.
- **C)** A + B = A · B.
- **D)** A + B = B + A.

**Resposta correta: D) A + B = B + A.**

**Explicação:** Na propriedade comutativa, trocar a ordem dos operandos não muda o resultado.

---

### Questão 071 — Médio

Qual é a simplificação de A + (A · B)?

- **A)** `A · B`
- **B)** `A + B`
- **C)** `A`
- **D)** `B`

**Resposta correta: C) `A`**

**Explicação:** Pela absorção, A + A · B = A.

---

### Questão 072 — Médio

Qual é a simplificação de A · (A + B)?

- **A)** `A + B`
- **B)** `A · B`
- **C)** `B`
- **D)** `A`

**Resposta correta: D) `A`**

**Explicação:** Pela absorção, A · (A + B) = A.

---

### Questão 073 — Médio

Aplicando a lei de De Morgan, qual expressão equivale a ¬(A · B)?

- **A)** `A · B`
- **B)** `A + B`
- **C)** `(¬A) · (¬B)`
- **D)** `(¬A) + (¬B)`

**Resposta correta: D) `(¬A) + (¬B)`**

**Explicação:** Negar uma AND transforma a operação em OR e nega cada entrada.

---

### Questão 074 — Médio

Aplicando a lei de De Morgan, qual expressão equivale a ¬(A + B)?

- **A)** `(¬A) · (¬B)`
- **B)** `A + B`
- **C)** `(¬A) + (¬B)`
- **D)** `A · B`

**Resposta correta: A) `(¬A) · (¬B)`**

**Explicação:** Negar uma OR transforma a operação em AND e nega cada entrada.

---

### Questão 075 — Médio

Qual expressão resulta da distribuição em A · (B + C)?

- **A)** `A · B · C`
- **B)** `(A · B) + (A · C)`
- **C)** `(A + B) · C`
- **D)** `A + (B · C)`

**Resposta correta: B) `(A · B) + (A · C)`**

**Explicação:** Distribui-se A pelos dois termos: A · B + A · C.

---

### Questão 076 — Médio

Qual é a simplificação de (A · B) + (A · ¬B)?

- **A)** `A`
- **B)** `B`
- **C)** `¬A`
- **D)** `A · B`

**Resposta correta: A) `A`**

**Explicação:** Colocando A em evidência, obtém-se A · (B + ¬B) = A · 1 = A.

---

### Questão 077 — Médio

Qual é a simplificação de (A + B) · (A + ¬B)?

- **A)** `B`
- **B)** `A · B`
- **C)** `A`
- **D)** `A + B`

**Resposta correta: C) `A`**

**Explicação:** Pela distributividade booleana, o resultado é A + B · ¬B = A + 0 = A.

---

### Questão 078 — Médio

Qual expressão simplifica A + (¬A · B)?

- **A)** `A`
- **B)** `A + B`
- **C)** `A · B`
- **D)** `¬A + B`

**Resposta correta: B) `A + B`**

**Explicação:** Usando a distributividade: (A + ¬A) · (A + B) = 1 · (A + B).

---

### Questão 079 — Médio

Qual expressão equivale a (A · ¬B) + (¬A · B)?

- **A)** `A + B`
- **B)** `¬(A + B)`
- **C)** `A · B`
- **D)** `A ⊕ B`

**Resposta correta: D) `A ⊕ B`**

**Explicação:** Os dois termos cobrem exatamente os casos em que A e B são diferentes.

---

### Questão 080 — Médio

Qual é a simplificação de ¬(¬A + B)?

- **A)** `A + ¬B`
- **B)** `A · ¬B`
- **C)** `¬A · B`
- **D)** `A · B`

**Resposta correta: B) `A · ¬B`**

**Explicação:** Por De Morgan, ¬(¬A + B) = ¬(¬A) · ¬B = A · ¬B.

---

## Circuitos combinacionais — interpretação de circuitos completos

### Questão 081 — Fácil

Em um circuito combinacional ideal, após a estabilização dos sinais, de que dependem as saídas?

- **A)** Somente dos valores anteriores das entradas.
- **B)** Somente dos valores atuais das entradas.
- **C)** De um estado armazenado obrigatoriamente em memória.
- **D)** Exclusivamente de pulsos de relógio.

**Resposta correta: B) Somente dos valores atuais das entradas.**

**Explicação:** Um circuito combinacional não mantém estado; sua saída é uma função das entradas atuais.

---

### Questão 082 — Fácil

Um circuito tem as etapas X = AND(A,B) e Y = OR(X,C). Para A = 1, B = 0 e C = 1, quais são X e Y?

- **A)** X = 0 e Y = 0.
- **B)** X = 1 e Y = 0.
- **C)** X = 0 e Y = 1.
- **D)** X = 1 e Y = 1.

**Resposta correta: C) X = 0 e Y = 1.**

**Explicação:** Primeiro, X = 1 · 0 = 0; depois, Y = 0 + 1 = 1.

---

### Questão 083 — Fácil

Um circuito tem as etapas X = OR(A,B) e Y = AND(X,C). Para A = 0, B = 1 e C = 0, quais são X e Y?

- **A)** X = 1 e Y = 1.
- **B)** X = 0 e Y = 1.
- **C)** X = 0 e Y = 0.
- **D)** X = 1 e Y = 0.

**Resposta correta: D) X = 1 e Y = 0.**

**Explicação:** Primeiro, X = 0 + 1 = 1; depois, Y = 1 · 0 = 0.

---

### Questão 084 — Fácil

Um circuito tem as etapas X = NOT(A) e Y = AND(X,B). Para A = 0 e B = 1, quais são X e Y?

- **A)** X = 0 e Y = 1.
- **B)** X = 1 e Y = 1.
- **C)** X = 0 e Y = 0.
- **D)** X = 1 e Y = 0.

**Resposta correta: B) X = 1 e Y = 1.**

**Explicação:** A NOT fornece X = 1; a AND recebe 1 e 1, produzindo Y = 1.

---

### Questão 085 — Fácil

Um circuito tem as etapas X = AND(A,B) e Y = NOT(X). Para A = 1 e B = 1, quais são X e Y?

- **A)** X = 1 e Y = 0.
- **B)** X = 1 e Y = 1.
- **C)** X = 0 e Y = 0.
- **D)** X = 0 e Y = 1.

**Resposta correta: A) X = 1 e Y = 0.**

**Explicação:** A AND gera X = 1 e a NOT inverte esse valor para Y = 0.

---

### Questão 086 — Fácil

A e B alimentam uma OR; a saída dessa OR entra em uma AND junto com C. Qual expressão representa a saída final Y?

- **A)** `(A · B) + C`
- **B)** `A + (B · C)`
- **C)** `¬(A + B)`
- **D)** `(A + B) · C`

**Resposta correta: D) `(A + B) · C`**

**Explicação:** A primeira etapa calcula A + B; a segunda aplica AND entre esse resultado e C.

---

### Questão 087 — Fácil

A saída de uma OR(A,B) alimenta uma NOT. Qual porta única produz a mesma saída final?

- **A)** AND
- **B)** NOR
- **C)** NAND
- **D)** XOR

**Resposta correta: B) NOR**

**Explicação:** Uma OR seguida de inversão equivale a uma NOR.

---

### Questão 088 — Fácil

Um circuito tem as etapas X = XOR(A,B) e Y = NOT(X). Para A = 1 e B = 0, quais são X e Y?

- **A)** X = 1 e Y = 1.
- **B)** X = 1 e Y = 0.
- **C)** X = 0 e Y = 0.
- **D)** X = 0 e Y = 1.

**Resposta correta: B) X = 1 e Y = 0.**

**Explicação:** As entradas diferentes geram X = 1; a NOT gera Y = 0.

---

### Questão 089 — Fácil

Um motor deve funcionar somente se o botão A estiver em 1 e o sensor B indicar proteção fechada com valor 1. Qual circuito representa essa regra?

- **A)** Uma OR recebendo A e B.
- **B)** Uma XOR recebendo A e B.
- **C)** Uma NOT recebendo somente B.
- **D)** Uma AND recebendo A e B.

**Resposta correta: D) Uma AND recebendo A e B.**

**Explicação:** As duas condições precisam ser satisfeitas simultaneamente.

---


### Questão 093 — Médio

Um circuito tem X = NAND(A,B) e Y = NAND(X,X). Qual é a função equivalente entre A e B?

- **A)** AND(A,B).
- **B)** OR(A,B).
- **C)** NOR(A,B).
- **D)** XOR(A,B).

**Resposta correta: A) AND(A,B).**

**Explicação:** A segunda NAND, com entradas interligadas, inverte X e cancela a inversão da primeira NAND.

---

### Questão 094 — Médio

Um circuito tem X = NOR(A,B) e Y = NOR(X,X). Qual é a função equivalente entre A e B?

- **A)** OR(A,B).
- **B)** AND(A,B).
- **C)** XOR(A,B).
- **D)** NAND(A,B).

**Resposta correta: A) OR(A,B).**

**Explicação:** A segunda NOR inverte X, cancelando a inversão da primeira NOR.

---

### Questão 095 — Médio

Um seletor tem Y = (¬S · A) + (S · B). Qual entrada aparece em Y para S = 0 e para S = 1, respectivamente?

- **A)** A e B.
- **B)** B e A.
- **C)** A e A.
- **D)** B e B.

**Resposta correta: A) A e B.**

**Explicação:** Com S = 0, apenas o termo A permanece; com S = 1, apenas o termo B permanece.

---

### Questão 096 — Médio

Um circuito tem X = XOR(A,B) e Y = XOR(X,C). Para A = 1, B = 1 e C = 1, quais são X e Y?

- **A)** X = 0 e Y = 0.
- **B)** X = 1 e Y = 0.
- **C)** X = 1 e Y = 1.
- **D)** X = 0 e Y = 1.

**Resposta correta: D) X = 0 e Y = 1.**

**Explicação:** Primeiro, 1 ⊕ 1 = 0; depois, 0 ⊕ 1 = 1.

---

### Questão 097 — Médio

Um alarme é definido por Y = (P + J) · ¬D. P = 1 indica porta aberta, J = 1 indica janela aberta e D = 1 indica alarme desativado. Em qual situação Y = 1?

- **A)** P = 0, J = 1 e D = 0.
- **B)** P = 0, J = 0 e D = 0.
- **C)** P = 1, J = 1 e D = 1.
- **D)** P = 1, J = 0 e D = 1.

**Resposta correta: A) P = 0, J = 1 e D = 0.**

**Explicação:** O alarme liga se houver alguma abertura e D = 0, isto é, se não estiver desativado.

---

### Questão 098 — Médio

Um circuito de maioria de três entradas tem Y = (A · B) + (A · C) + (B · C). Qual regra descreve sua saída?

- **A)** Y = 1 quando exatamente uma entrada é 1.
- **B)** Y = 1 somente quando as três entradas são 0.
- **C)** Y = 1 quando pelo menos duas entradas são 1.
- **D)** Y = 1 somente quando as três entradas são 1.

**Resposta correta: C) Y = 1 quando pelo menos duas entradas são 1.**

**Explicação:** Cada termo detecta um par em 1; qualquer par ativo liga a saída, inclusive na combinação 111.

---

### Questão 099 — Médio

Um circuito possui X = OR(A,B), Z = OR(A,¬B) e Y = AND(X,Z). Qual substituição preserva a saída para todas as entradas?

- **A)** `A ⊕ B`
- **B)** `B`
- **C)** `A`
- **D)** `¬A`

**Resposta correta: C) `A`**

**Explicação:** A expressão (A + B) · (A + ¬B) simplifica para A.

---

### Questão 100 — Médio

Um circuito correto deveria implementar Y = (A · B) + C, mas a AND foi substituída por OR, produzindo Y = (A + B) + C. Qual teste abaixo distingue os dois circuitos?

- **A)** A = 0, B = 0 e C = 0.
- **B)** A = 1, B = 1 e C = 0.
- **C)** A = 1, B = 0 e C = 0.
- **D)** A = 0, B = 0 e C = 1.

**Resposta correta: C) A = 1, B = 0 e C = 0.**

**Explicação:** Em 100, o circuito correto produz 0 e o alterado produz 1; nos demais testes listados, as saídas coincidem.

---
