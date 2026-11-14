# Mais 50 questões de lógica digital — questões 101 a 150

**Níveis:** questões fáceis e médias.

**Formato:** quatro alternativas por questão, com uma única resposta correta. A resposta aparece imediatamente após as alternativas, seguida de uma explicação breve.

Este volume complementa o arquivo das questões, com novos enunciados, problemas e aplicações dos mesmos cinco conteúdos.

## Convenções

- `0` indica falso ou nível lógico baixo; `1` indica verdadeiro ou nível lógico alto.
- `·` significa AND (E), `+` significa OR (OU inclusivo), `¬` significa NOT (NÃO) e `⊕` significa XOR (OU exclusivo).
- `NAND(A,B) = ¬(A·B)` e `NOR(A,B) = ¬(A+B)`.
- Nas expressões booleanas, `+` representa OR, não adição aritmética. A questão do somador completo identifica explicitamente a soma binária.
- Resolva os parênteses primeiro; depois NOT, AND e OR. O agrupamento das cadeias de XOR está indicado nos enunciados.
- Em operações sobre sequências de bits, combine cada posição com a mesma posição da outra sequência e preserve a ordem da esquerda para a direita. Não há transporte entre posições.
- Em combinações como `100`, a ordem das variáveis é a indicada no enunciado, geralmente (A,B,C).
- Considere circuitos ideais, sem memória e com sinais estabilizados. Uma falha só deve ser considerada quando explicitamente descrita.


## Portas lógicas — AND, OR e NOT

### Questão 101 — Fácil

Cinco portas NOT independentes recebem os bits de `10110`, uma porta por bit. Mantendo a ordem dos bits, qual sequência aparece nas saídas?

- **A)** `01010`
- **B)** `01101`
- **C)** `01001`
- **D)** `10110`

**Resposta correta: C) `01001`**

**Explicação:** Cada posição é invertida separadamente: 1→0, 0→1, 1→0, 1→0 e 0→1.

---

### Questão 102 — Fácil

A sequência `1101` deve passar por uma máscara `1011` usando AND em cada par de bits da mesma posição. Qual é o resultado?

- **A)** `1111`
- **B)** `1000`
- **C)** `0110`
- **D)** `1001`

**Resposta correta: D) `1001`**

**Explicação:** As quatro operações são 1·1, 1·0, 0·1 e 1·1, resultando em 1001.

---

### Questão 103 — Fácil

Dois painéis registram quatro sinais cada: `1001` e `0110`. Cada posição da saída combina os sinais correspondentes por OR. Qual sequência resulta?

- **A)** `0000`
- **B)** `1111`
- **C)** `1001`
- **D)** `0110`

**Resposta correta: B) `1111`**

**Explicação:** Em todas as posições existe pelo menos um bit 1; portanto, todas as saídas são 1.

---

### Questão 104 — Fácil

Uma AND de quatro entradas recebe `0, 0, 1, 0`. Qual é o menor número de entradas que precisam mudar para a saída passar a 1?

- **A)** 2 entradas.
- **B)** 4 entradas.
- **C)** 3 entradas.
- **D)** 1 entrada.

**Resposta correta: C) 3 entradas.**

**Explicação:** Os três zeros precisam mudar para 1; a entrada que já vale 1 pode permanecer como está.

---

### Questão 105 — Fácil

Uma OR de quatro entradas recebe `1, 0, 1, 1`. Qual é o menor número de entradas que precisam mudar para a saída passar a 0?

- **A)** 4 entradas.
- **B)** 3 entradas.
- **C)** 1 entrada.
- **D)** 2 entradas.

**Resposta correta: B) 3 entradas.**

**Explicação:** Os três valores 1 precisam virar 0 para que todas as entradas fiquem em 0.

---

### Questão 106 — Médio

Em um teste de uma AND de duas entradas, A = 1 e a saída Y = 0. O valor de B não foi anotado. Qual conclusão é correta?

- **A)** B só pode ser 1.
- **B)** Nenhum valor binário de B permite esse resultado.
- **C)** B só pode ser 0.
- **D)** B pode ser 0 ou 1.

**Resposta correta: C) B só pode ser 0.**

**Explicação:** Com A = 1, a saída da AND é igual a B; logo, B = 0.

---

### Questão 107 — Médio

Uma OR de duas entradas apresentou Y = 1 enquanto A = 0. Qual conclusão pode ser feita sobre a entrada B?

- **A)** B só pode ser 0.
- **B)** B só pode ser 1.
- **C)** B pode ser 0 ou 1.
- **D)** As observações são incompatíveis com uma porta OR.

**Resposta correta: B) B só pode ser 1.**

**Explicação:** Como A não fornece um nível 1, B precisa estar em 1 para ativar a saída.

---

### Questão 108 — Médio

Você dispõe apenas de portas AND de duas entradas e precisa implementar Y = A · B · C · D, com quatro entradas independentes. Qual é a quantidade mínima de portas necessárias?

- **A)** 2 portas.
- **B)** 1 porta.
- **C)** 3 portas.
- **D)** 4 portas.

**Resposta correta: C) 3 portas.**

**Explicação:** Duas portas calculam A·B e C·D; uma terceira combina esses resultados. Cada porta de duas entradas reúne apenas dois sinais.

---

### Questão 109 — Médio

Um aluno afirma que ¬(A · B) e (¬A) · B são iguais. Qual teste abaixo mostra que a afirmação é falsa?

- **A)** A = 1 e B = 1.
- **B)** A = 0 e B = 1.
- **C)** Nenhum teste pode mostrar diferença.
- **D)** A = 0 e B = 0.

**Resposta correta: D) A = 0 e B = 0.**

**Explicação:** Em 00, ¬(0·0) = 1, mas (¬0)·0 = 0. A posição da NOT altera a função.

---

### Questão 110 — Médio

Uma caixa contém uma única porta de duas entradas, que pode ser AND ou OR. Nos testes 00 e 11, as saídas foram 0 e 1, respectivamente. Qual teste adicional identifica qual porta está na caixa?

- **A)** Aplicar A = 0 e B = 1.
- **B)** Repetir A = 1 e B = 1.
- **C)** Repetir A = 0 e B = 0.
- **D)** Nenhum teste adicional consegue distinguir as duas portas.

**Resposta correta: A) Aplicar A = 0 e B = 1.**

**Explicação:** Com 01, a AND produz 0 e a OR produz 1; os testes já realizados são iguais para ambas.

---

## Portas derivadas — NAND, NOR e XOR

### Questão 111 — Fácil

Aplique XOR, posição por posição, às sequências `1010` e `0110`. Qual é a sequência de saída?

- **A)** `1100`
- **B)** `1110`
- **C)** `0010`
- **D)** `1101`

**Resposta correta: A) `1100`**

**Explicação:** Os bits são diferentes nas duas primeiras posições e iguais nas duas últimas, produzindo 1100.

---

### Questão 112 — Fácil

Durante uma montagem, os fios A e B de uma NAND de duas entradas foram trocados entre si, sem nenhuma inversão dos sinais. Após a estabilização, qual é o efeito dessa troca sobre a função do circuito?

- **A)** A saída passa a ser o complemento da anterior.
- **B)** Nenhum: a saída permanece igual em todas as combinações.
- **C)** A saída passa a acompanhar somente A.
- **D)** A NAND passa a funcionar como NOR.

**Resposta correta: B) Nenhum: a saída permanece igual em todas as combinações.**

**Explicação:** A NAND é simétrica em suas entradas: ¬(A·B) = ¬(B·A). Trocar apenas a posição dos fios não altera sua função.

---

### Questão 113 — Fácil

Quatro portas NOR combinam, posição por posição, as sequências `1001` e `0101`. Qual é a sequência resultante?

- **A)** `0010`
- **B)** `0000`
- **C)** `1101`
- **D)** `0110`

**Resposta correta: A) `0010`**

**Explicação:** A OR das sequências é 1101; sua inversão, realizada pela NOR, é 0010.

---

### Questão 114 — Fácil

Em uma XOR de duas entradas, B permanece fixo e A é invertido. O que acontece com a saída em relação ao valor anterior?

- **A)** A saída passa obrigatoriamente a 0.
- **B)** A saída passa obrigatoriamente a 1.
- **C)** A saída permanece igual.
- **D)** A saída também é invertida.

**Resposta correta: D) A saída também é invertida.**

**Explicação:** Inverter apenas uma entrada troca a condição de igualdade pela de diferença, ou vice-versa.

---

### Questão 115 — Fácil

Uma XOR recebe A e B. Depois, ambos os valores são invertidos ao mesmo tempo. Após a estabilização, como fica a saída em relação à original?

- **A)** É sempre o complemento da saída original.
- **B)** Fica sempre em 0.
- **C)** Permanece igual à saída original.
- **D)** Fica sempre em 1.

**Resposta correta: C) Permanece igual à saída original.**

**Explicação:** Entradas iguais continuam iguais e entradas diferentes continuam diferentes quando ambas são invertidas.

---

### Questão 116 — Médio

Uma NAND recebe ¬A em uma entrada e ¬B na outra. Qual expressão representa sua saída?

- **A)** `A · B`
- **B)** `A + B`
- **C)** `¬(A + B)`
- **D)** `A ⊕ B`

**Resposta correta: B) `A + B`**

**Explicação:** Por De Morgan, ¬(¬A · ¬B) = A + B.

---

### Questão 117 — Médio

Uma NOR recebe ¬A em uma entrada e ¬B na outra. Qual expressão representa sua saída?

- **A)** `¬(A · B)`
- **B)** `A + B`
- **C)** `A ⊕ B`
- **D)** `A · B`

**Resposta correta: D) `A · B`**

**Explicação:** Por De Morgan, ¬(¬A + ¬B) = A · B.

---


### Questão 119 — Médio

Um transmissor gera X = A ⊕ B. O receptor conhece B e calcula Y = X ⊕ B. Qual sinal é recuperado em Y?

- **A)** `A`
- **B)** `¬A`
- **C)** `¬B`
- **D)** `B`

**Resposta correta: A) `A`**

**Explicação:** Aplicar XOR duas vezes com o mesmo bit B cancela seu efeito e recupera A.

---

### Questão 120 — Médio

Um verificador calcula P = ((A ⊕ B) ⊕ C) ⊕ D. Exatamente um dos quatro bits muda de valor. Após a estabilização, o que ocorre com P?

- **A)** P fica obrigatoriamente em 1.
- **B)** P fica obrigatoriamente em 0.
- **C)** P muda para o valor oposto.
- **D)** P permanece igual.

**Resposta correta: C) P muda para o valor oposto.**

**Explicação:** A troca de um único bit altera a paridade da quantidade de bits 1; por isso, o resultado da cadeia de XOR é invertido.

---

## Tabelas-verdade — combinações de entradas e saídas

### Questão 121 — Fácil

Ao montar as entradas de uma tabela com A, B e C, foram escritas as linhas `000, 001, 010, 011, 100, 101, 111`. Qual combinação está faltando?

- **A)** `011`
- **B)** `110`
- **C)** `100`
- **D)** `101`

**Resposta correta: B) `110`**

**Explicação:** A combinação 110 é a única das oito possibilidades que não aparece na lista.

---

### Questão 122 — Fácil

Um relatório apresenta duas linhas com as mesmas entradas A = 1 e B = 0, mas registra Y = 0 em uma e Y = 1 na outra. Para uma mesma função combinacional ideal com sinais estabilizados, como interpretar isso?

- **A)** Isso demonstra que a porta é uma XOR.
- **B)** As duas linhas são válidas porque a função escolhe a saída aleatoriamente.
- **C)** O relatório é inconsistente: a mesma entrada deve ter uma única saída.
- **D)** Isso demonstra que a porta é uma OR.

**Resposta correta: C) O relatório é inconsistente: a mesma entrada deve ter uma única saída.**

**Explicação:** Uma função combinacional atribui um único valor de saída a cada combinação de entradas.

---

### Questão 123 — Fácil

Em uma tabela com linhas na ordem `000, 001, 010, 011, 100, 101, 110, 111`, os bits representam (A,B,C). Qual é a sequência da coluna A?

- **A)** `1, 1, 1, 1, 0, 0, 0, 0`
- **B)** `0, 1, 0, 1, 0, 1, 0, 1`
- **C)** `0, 0, 1, 1, 0, 0, 1, 1`
- **D)** `0, 0, 0, 0, 1, 1, 1, 1`

**Resposta correta: D) `0, 0, 0, 0, 1, 1, 1, 1`**

**Explicação:** A é o primeiro bit de cada linha e só passa a 1 na quinta combinação.

---

### Questão 124 — Fácil

Na tabela completa de três entradas independentes A, B e C, quantas linhas permanecem após selecionar somente aquelas em que A = 1?

- **A)** 2 linhas.
- **B)** 1 linha.
- **C)** 4 linhas.
- **D)** 8 linhas.

**Resposta correta: C) 4 linhas.**

**Explicação:** A fica fixo, enquanto B e C formam os quatro pares 00, 01, 10 e 11.

---

### Questão 125 — Fácil

Na tabela abaixo, qual entrada pode mudar sem alterar Y, desde que a outra entrada seja mantida fixa?

| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

- **A)** Nenhuma das duas.
- **B)** Tanto A quanto B.
- **C)** A.
- **D)** B.

**Resposta correta: D) B.**

**Explicação:** Y acompanha A. Para cada A fixo, trocar B de 0 para 1 não altera a saída.

---

### Questão 126 — Médio

Para Y = A ⊕ (B · C), qual sequência completa a coluna de saída na ordem (A,B,C) = `000, 001, 010, 011, 100, 101, 110, 111`?

- **A)** `0, 0, 0, 1, 1, 1, 1, 0`
- **B)** `0, 0, 0, 1, 1, 1, 1, 1`
- **C)** `1, 1, 1, 0, 0, 0, 0, 1`
- **D)** `0, 1, 1, 0, 1, 0, 0, 1`

**Resposta correta: A) `0, 0, 0, 1, 1, 1, 1, 0`**

**Explicação:** B·C vale 1 somente quando B = C = 1. Nesse caso, a XOR inverte A; nos demais, repete A.

---

### Questão 127 — Médio

Qual expressão corresponde à tabela abaixo?

| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

- **A)** `¬A + B`
- **B)** `A + ¬B`
- **C)** `A · B`
- **D)** `A ⊕ B`

**Resposta correta: A) `¬A + B`**

**Explicação:** A saída só é 0 em 10, quando ¬A e B são ambos 0.

---

### Questão 128 — Médio

Uma função de três entradas produz 1 quando exatamente uma delas é 1. Em quais linhas de (A,B,C) a saída deve ser 1?

- **A)** 000 e 111.
- **B)** 001, 010, 100 e 111.
- **C)** 001, 010 e 100.
- **D)** 011, 101 e 110.

**Resposta correta: C) 001, 010 e 100.**

**Explicação:** Cada uma das combinações 001, 010 e 100 contém um único bit 1; 111 contém três.

---

### Questão 129 — Médio

Considere F = (A + B) · C e G = A + (B · C). Em quais linhas da tabela completa as duas saídas são diferentes?

- **A)** 100 e 110.
- **B)** 001 e 011.
- **C)** 010 e 101.
- **D)** 000 e 111.

**Resposta correta: A) 100 e 110.**

**Explicação:** Quando A = 1 e C = 0, F = 0 e G = 1, independentemente de B. Nas demais linhas, elas coincidem.

---

### Questão 130 — Médio

Uma tabela compacta usa o símbolo “–” para indicar que uma entrada pode ser 0 ou 1 sem mudar a saída daquela linha. Quantas linhas completas estão representadas por A = 0, B = –, C = – e Y = 1?

- **A)** 4 linhas.
- **B)** 1 linha.
- **C)** 8 linhas.
- **D)** 2 linhas.

**Resposta correta: A) 4 linhas.**

**Explicação:** B e C variam de forma independente, formando 00, 01, 10 e 11; A permanece em 0.

---

## Álgebra booleana — expressões e simplificação

### Questão 131 — Fácil

Qual propriedade justifica a igualdade (A + B) + C = A + (B + C)?

- **A)** Associativa da OR.
- **B)** Complementaridade.
- **C)** Comutativa da AND.
- **D)** Lei de De Morgan.

**Resposta correta: A) Associativa da OR.**

**Explicação:** A igualdade altera apenas o agrupamento das operações OR, mantendo a ordem das variáveis.

---

### Questão 132 — Fácil

Na expressão Y = (A · B) + (¬A · C) + (B · ¬C), quantos termos de produto são combinados pela OR principal?

- **A)** 2 termos.
- **B)** 3 termos.
- **C)** 4 termos.
- **D)** 6 termos.

**Resposta correta: B) 3 termos.**

**Explicação:** Os termos são A·B, ¬A·C e B·¬C. Cada termo combina literais por AND.

---

### Questão 133 — Fácil

Na expressão Y = ¬(A · B) + C, sobre qual parte atua a negação indicada antes do parêntese?

- **A)** Sobre toda a expressão (A · B) + C.
- **B)** Somente sobre B.
- **C)** Somente sobre A.
- **D)** Sobre o resultado completo de A · B.

**Resposta correta: D) Sobre o resultado completo de A · B.**

**Explicação:** Os parênteses delimitam o argumento da NOT: primeiro calcula-se A·B e depois esse resultado é invertido.

---

### Questão 134 — Fácil

Para A = 0, B = 0 e C = 0, qual alternativa apresenta a avaliação correta de Y = ¬A · (B + ¬C)?

- **A)** Y = 1, pois B = 1 e C = 1.
- **B)** Y = 0, pois B + ¬C = 0.
- **C)** Y = 1, pois ¬A = 1 e B + ¬C = 1.
- **D)** Y = 0, pois ¬A = 0.

**Resposta correta: C) Y = 1, pois ¬A = 1 e B + ¬C = 1.**

**Explicação:** Com as entradas dadas, a expressão é 1 · (0 + 1), resultando em 1.

---

### Questão 135 — Fácil

Um aluno resolve A + B · C calculando primeiro A + B. Para respeitar a prioridade usual das operações booleanas, qual deve ser a primeira operação?

- **A)** Calcular B · C.
- **B)** Inverter C.
- **C)** Calcular A + B.
- **D)** Calcular A · C.

**Resposta correta: A) Calcular B · C.**

**Explicação:** Sem parênteses que alterem a ordem, AND tem prioridade sobre OR. Assim, a expressão significa A + (B·C).

---

### Questão 136 — Médio

Qual é a forma simplificada de A · (¬A + B)?

- **A)** `¬A · B`
- **B)** `A + B`
- **C)** `A`
- **D)** `A · B`

**Resposta correta: D) `A · B`**

**Explicação:** Distribuindo, obtém-se A·¬A + A·B = 0 + A·B.

---

### Questão 137 — Médio

Qual expressão equivale a (A + B) · (¬A + C), após remover o termo redundante B · C da expansão?

- **A)** `B · C`
- **B)** `(A · C) + ((¬A) · B)`
- **C)** `A + (B · C)`
- **D)** `(A · B) + ((¬A) · C)`

**Resposta correta: B) `(A · C) + ((¬A) · B)`**

**Explicação:** A expansão gera A·C + ¬A·B + B·C. Se B·C = 1, A = 1 ativa A·C e A = 0 ativa ¬A·B; portanto, B·C é redundante.

---

### Questão 138 — Médio

Aplique De Morgan à expressão ¬((A + B) · C). Qual alternativa está correta?

- **A)** `(¬A) · (¬B) · (¬C)`
- **B)** `(A · B) + (¬C)`
- **C)** `((¬A) + (¬B)) · (¬C)`
- **D)** `((¬A) · (¬B)) + (¬C)`

**Resposta correta: D) `((¬A) · (¬B)) + (¬C)`**

**Explicação:** Primeiro, ¬((A+B)·C) = ¬(A+B) + ¬C. Depois, ¬(A+B) = ¬A·¬B.

---

### Questão 139 — Médio

Qual é a simplificação de (A + B) · (A + C)?

- **A)** `A + (B · C)`
- **B)** `A · B · C`
- **C)** `A + B + C`
- **D)** `A · (B + C)`

**Resposta correta: A) `A + (B · C)`**

**Explicação:** A expansão é A + A·C + A·B + B·C. Os termos A·C e A·B são absorvidos por A, restando A + B·C.

---

### Questão 140 — Médio

Qual é a simplificação de (A + B + C) · ¬(A + B)?

- **A)** `(¬A) · (¬B) · C`
- **B)** `(A + B) · C`
- **C)** `A + B + C`
- **D)** `¬(A + B + C)`

**Resposta correta: A) `(¬A) · (¬B) · C`**

**Explicação:** O fator ¬(A+B) exige A = B = 0. Nessas condições, o primeiro fator vale C, produzindo ¬A·¬B·C.

---


### Questão 143 — Fácil

Um comparador de dois números de dois bits já produz E1 = 1 quando os bits mais significativos são iguais e E0 = 1 quando os bits menos significativos são iguais. Como combinar E1 e E0 para indicar igualdade dos números completos?

- **A)** Y = XOR(E1,E0).
- **B)** Y = AND(E1,E0).
- **C)** Y = NOT(E1).
- **D)** Y = OR(E1,E0).

**Resposta correta: B) Y = AND(E1,E0).**

**Explicação:** Os números só são iguais se os dois pares de bits correspondentes forem iguais ao mesmo tempo.

---

### Questão 144 — Fácil

Considere as conexões abaixo. Quais sinais alimentam diretamente a porta que gera Y?

| Etapa | Operação |
|---|---|
| 1 | P = OR(A,B) |
| 2 | Q = NOT(C) |
| 3 | R = AND(P,Q) |
| 4 | Y = XOR(R,D) |

- **A)** A e B.
- **B)** P e Q.
- **C)** C e D.
- **D)** R e D.

**Resposta correta: D) R e D.**

**Explicação:** A última etapa declara Y = XOR(R,D); os outros sinais influenciam Y por etapas anteriores.

---

### Questão 145 — Fácil

Um circuito calcula P = OR(A,B) e Y = XOR(P,C). Para A = 0, B = 1 e C = 1, qual afirmação descreve corretamente o percurso do sinal?

- **A)** P vale 1 e Y vale 1, porque a XOR sempre repete P.
- **B)** P vale 0 e Y vale 0, porque C bloqueia a OR.
- **C)** P vale 0 e Y vale 1, porque a OR exige duas entradas 1.
- **D)** P vale 1 e Y vale 0, porque a XOR recebe duas entradas iguais.

**Resposta correta: D) P vale 1 e Y vale 0, porque a XOR recebe duas entradas iguais.**

**Explicação:** A OR produz P = 1. Em seguida, XOR(1,1) = 0.

---

### Questão 146 — Médio

Um circuito calcula D = XOR(A,B) e W = AND(D,E). Em uma medição, A = 0, B = 1 e W = 1. Qual alternativa reconstrói corretamente D e E?

- **A)** D = 0 e E = 0.
- **B)** D = 1 e E = 1.
- **C)** D = 1 e E = 0.
- **D)** D = 0 e E = 1.

**Resposta correta: B) D = 1 e E = 1.**

**Explicação:** As entradas diferentes geram D = 1. Como W = 1, a outra entrada da AND, E, também precisa ser 1.

---


### Questão 148 — Médio

Um sistema aceita os códigos de quatro bits de `0000` a `1001` (valores de 0 a 9). O detector I = b3 · (b2 + b1) sinaliza códigos inválidos, sendo b3 o primeiro bit à esquerda. Qual código abaixo ativa I?

- **A)** `0000`
- **B)** `1001`
- **C)** `0111`
- **D)** `1010`

**Resposta correta: D) `1010`**

**Explicação:** Em 1010, b3 = 1 e b1 = 1, logo I = 1. Em 1001, b2 = b1 = 0; nos demais códigos, b3 = 0.

---

### Questão 149 — Médio

Um circuito possui P = AND(A,B) e Y = OR(P,C). Uma falha prende o sinal P em 1, independentemente de A e B. Qual passa a ser o comportamento de Y?

- **A)** Y permanece em 1 para qualquer combinação de A, B e C.
- **B)** Y permanece em 0 para qualquer combinação.
- **C)** Y passa a ser a negação de C.
- **D)** Y passa a acompanhar somente C.

**Resposta correta: A) Y permanece em 1 para qualquer combinação de A, B e C.**

**Explicação:** A OR final recebe uma entrada permanentemente em 1, forçando sua saída a 1.

---

### Questão 150 — Médio

Uma ventilação deve ligar se houver emergência E = 1, mesmo com bloqueio B = 1. Fora da emergência, deve ligar apenas se T = 1 (temperatura alta) e B = 0. Qual expressão implementa todas essas condições?

- **A)** `(E + T) · ¬B`
- **B)** `E + (T · ¬B)`
- **C)** `E · T · ¬B`
- **D)** `(E + T) · B`

**Resposta correta: B) `E + (T · ¬B)`**

**Explicação:** E aciona a saída diretamente. O acionamento normal exige T e ¬B, e é combinado com E por OR.

---
