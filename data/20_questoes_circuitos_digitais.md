# 20 questões sobre circuitos digitais

**Níveis:** 10 questões fáceis e 10 médias.

**Formato:** quatro alternativas por questão, com uma única resposta correta e sua justificativa logo após as alternativas.

**Símbolos:** `·` = AND, `+` = OR, `¬` = NOT e `⊕` = XOR.

Considere `0` como desligado e `1` como ligado. Os circuitos são ideais e os sinais já estão estabilizados, exceto na questão 19, que apresenta explicitamente os atrasos de propagação.

---

## 1. Circuito de iluminação — Fácil

Uma sala possui três botões: A, B e C. A iluminação deve ligar quando **A e B estiverem acionados simultaneamente, ou quando C estiver acionado sozinho**. Qual circuito realiza essa função?

- **A)** Uma AND combina A e B; uma OR combina esse resultado com C.
- **B)** Uma OR combina A e B; uma AND combina esse resultado com C.
- **C)** Uma AND combina os três botões.
- **D)** Uma XOR combina A e B; uma AND combina esse resultado com C.

**Resposta correta: A.**

**Justificativa:** A AND verifica se A e B estão acionados juntos. A OR permite que C também ligue a iluminação, independentemente dos outros botões. A expressão é `Y = (A · B) + C`.

---

## 2. Duas saídas independentes — Fácil

Um circuito recebe A e B e possui duas saídas:

- Uma luz verde recebe o resultado de `AND(A,B)`.
- Uma luz vermelha recebe o resultado de `NOR(A,B)`.

Quando **A = 0 e B = 1**, como ficam as luzes?

- **A)** As duas ficam acesas.
- **B)** Apenas a verde fica acesa.
- **C)** Apenas a vermelha fica acesa.
- **D)** As duas ficam apagadas.

**Resposta correta: D.**

**Justificativa:** A AND produz 0 porque uma das entradas é 0. A NOR também produz 0 porque existe uma entrada em 1. Portanto, nenhuma luz acende.

---

## 3. Entrada desconhecida — Fácil

Um circuito inverte A com uma porta NOT e combina o resultado com B usando uma OR:

`Y = ¬A + B`

Sabendo que **A = 1 e Y = 0**, qual deve ser o valor de B?

- **A)** B deve ser 1.
- **B)** B deve ser 0.
- **C)** B pode ser 0 ou 1.
- **D)** Não existe valor de B que produza essa saída.

**Resposta correta: B.**

**Justificativa:** Como A = 1, a NOT produz 0. Para a OR produzir Y = 0, sua outra entrada também precisa ser 0. Logo, B = 0.

---

## 4. Quantidade de componentes — Fácil

Um projeto utiliza as seguintes etapas, **sem simplificar ou substituir nenhuma delas**:

- P = NOT(A)
- Q = NOT(B)
- R = AND(P,C)
- Y = OR(R,Q)

Quantas portas lógicas aparecem nessa implementação?

- **A)** Duas portas.
- **B)** Três portas.
- **C)** Quatro portas.
- **D)** Cinco portas.

**Resposta correta: C.**

**Justificativa:** Existem duas portas NOT, uma AND e uma OR, totalizando quatro portas. A reutilização de um sinal não exige uma nova porta.

---

## 5. Circuito de autorização — Fácil

Uma máquina possui uma entrada de autorização H e um botão de partida P. Seu funcionamento é definido por:

`Y = H · P`

Se o botão P estiver acionado, mas a autorização H estiver desligada, qual será o comportamento da máquina?

- **A)** Permanecerá desligada porque falta autorização.
- **B)** Ligará porque o botão de partida é suficiente.
- **C)** Alternará automaticamente entre ligada e desligada.
- **D)** Ligará porque as entradas são diferentes.

**Resposta correta: A.**

**Justificativa:** Com H = 0 e P = 1, temos `Y = 0 · 1 = 0`. A AND exige que as duas condições sejam atendidas.

---

## 6. Dois caminhos de processamento — Médio

Um circuito possui três etapas:

- P = OR(A,B)
- Q = AND(B,C)
- Y = XOR(P,Q)

Para **A = 0, B = 1 e C = 1**, quais são os valores de P, Q e Y, respectivamente?

- **A)** 0, 1 e 1.
- **B)** 1, 0 e 1.
- **C)** 1, 1 e 1.
- **D)** 1, 1 e 0.

**Resposta correta: D.**

**Justificativa:** A OR produz `P = 0 + 1 = 1`. A AND produz `Q = 1 · 1 = 1`. Como a XOR recebe duas entradas iguais, sua saída é Y = 0.

---

## 7. Identificação da porta que falta — Médio

Um circuito possui duas etapas conhecidas:

- P = OR(A,B)
- Q = AND(A,B)

Uma terceira porta recebe P e Q. A saída final deve ser 1 **somente quando exatamente uma das entradas originais A e B for 1**.

Qual porta deve ser colocada na terceira etapa?

- **A)** AND.
- **B)** XOR.
- **C)** OR.
- **D)** NOR.

**Resposta correta: B.**

**Justificativa:** Para A e B iguais a 00, P e Q são 00. Para 01 ou 10, P e Q são 10. Para 11, P e Q são 11. A XOR entre P e Q produz 1 somente nos dois casos desejados.

---

## 8. Detecção de falha — Médio

Um circuito deveria funcionar assim:

- P = NOT(A)
- Y = AND(P,B)

Entretanto, a porta NOT apresentou uma falha e passou a **repetir A sem invertê-lo**.

Qual teste faz o circuito correto produzir **Y = 1** e o circuito defeituoso produzir **Y = 0**?

- **A)** A = 0 e B = 0.
- **B)** A = 1 e B = 0.
- **C)** A = 0 e B = 1.
- **D)** A = 1 e B = 1.

**Resposta correta: C.**

**Justificativa:** No circuito correto, A = 0 é invertido para 1, então `Y = 1 · 1 = 1`. No defeituoso, A permanece em 0, resultando em `Y = 0 · 1 = 0`.

---

## 9. Alteração de uma entrada — Médio

Um circuito possui:

- P = NAND(A,B)
- Y = AND(P,C)

Inicialmente, **A = 1, B = 0 e C = 1**. Depois, apenas B muda para 1.

Como a saída Y se comporta, comparando os valores estabilizados antes e depois da mudança?

- **A)** Passa de 1 para 0.
- **B)** Passa de 0 para 1.
- **C)** Permanece em 0.
- **D)** Permanece em 1.

**Resposta correta: A.**

**Justificativa:** Inicialmente, `NAND(1,0) = 1`, então Y = 1. Depois, `NAND(1,1) = 0`, então Y = 0, mesmo com C permanecendo em 1.

---

## 10. Interpretação de um circuito completo — Médio

Um sistema recebe três sinais:

- A = 1 indica presença de uma pessoa.
- B = 1 indica presença de um veículo.
- C = 1 indica que o monitoramento está habilitado.

O circuito calcula:

- P = OR(A,B)
- Q = AND(P,C)
- Y = NOT(Q)

Em qual situação a saída **Y será 0**?

- **A)** Quando o monitoramento estiver desabilitado, independentemente dos sensores.
- **B)** Quando não houver pessoa nem veículo, mesmo com o monitoramento habilitado.
- **C)** Somente quando pessoa e veículo forem detectados juntos, com o monitoramento desabilitado.
- **D)** Quando o monitoramento estiver habilitado e pelo menos um dos sensores detectar presença.

**Resposta correta: D.**

**Justificativa:** Para Y = 0, a entrada da NOT deve ser Q = 1. Isso exige C = 1 e P = 1. Como P é a OR entre A e B, basta que um dos sensores detecte presença.

---

## 11. Sinais digitais — Fácil

Um circuito digital binário trabalha com níveis lógicos representados por 0 e 1. O que esses valores representam?

- **A)** Obrigatoriamente, tensões de 0 volt e 1 volt.
- **B)** Dois estados lógicos distintos, associados a níveis físicos de sinal.
- **C)** A quantidade de portas presentes no circuito.
- **D)** A velocidade de funcionamento do circuito.

**Resposta correta: B.**

**Justificativa:** Os valores 0 e 1 representam dois estados lógicos. As tensões utilizadas para representar esses estados dependem da tecnologia do circuito.

---

## 12. Bloqueio de funcionamento — Fácil

Um ventilador deve funcionar quando o comando L estiver em 1, desde que o bloqueio B esteja em 0.

Qual expressão representa esse funcionamento?

- **A)** `Y = L + B`
- **B)** `Y = L · B`
- **C)** `Y = L · ¬B`
- **D)** `Y = ¬L · B`

**Resposta correta: C.**

**Justificativa:** O ventilador exige o comando L ativo e o bloqueio B desativado. Por isso, combina-se L com a negação de B usando AND.

---

## 13. Reutilização de um sinal — Fácil

A saída P de uma porta lógica é conectada às entradas de outras duas portas. Em um circuito ideal, o que acontece com o valor lógico de P?

- **A)** O valor é dividido: cada ligação recebe metade.
- **B)** Uma ligação recebe P e a outra recebe ¬P.
- **C)** P passa automaticamente a valer 0.
- **D)** As duas ligações recebem o mesmo valor lógico de P.

**Resposta correta: D.**

**Justificativa:** Conectar um sinal a duas entradas distribui seu valor lógico para ambas. Isso não divide nem inverte o bit.

---

## 14. Saídas complementares — Fácil

Um circuito possui duas luzes:

- Luz azul: `Y1 = A + B`
- Luz amarela: `Y2 = ¬Y1`

Qual afirmação é correta após a estabilização dos sinais?

- **A)** Exatamente uma das luzes estará acesa.
- **B)** As duas luzes estarão sempre acesas.
- **C)** As duas luzes estarão sempre apagadas.
- **D)** As duas luzes terão sempre o mesmo estado.

**Resposta correta: A.**

**Justificativa:** Y2 é o complemento de Y1. Quando uma saída vale 1, a outra vale 0.

---

## 15. Dois caminhos para ativação — Fácil

Um sistema possui dois pares de sensores. A saída deve ligar quando **A e B estiverem ativos juntos ou quando C e D estiverem ativos juntos**.

Qual expressão atende a essa regra?

- **A)** `Y = A · B · C · D`
- **B)** `Y = (A · B) + (C · D)`
- **C)** `Y = (A + B) · (C + D)`
- **D)** `Y = A + B + C + D`

**Resposta correta: B.**

**Justificativa:** Cada par é verificado por uma AND. A OR combina os dois resultados, permitindo que qualquer um dos pares completos ative a saída.

---

## 16. Circuito com NOR e XOR — Médio

Um circuito possui:

- `P = NOR(A,B)`
- `Y = XOR(P,C)`

Para **A = 0, B = 0 e C = 1**, quais são os valores de P e Y?

- **A)** P = 0 e Y = 0.
- **B)** P = 0 e Y = 1.
- **C)** P = 1 e Y = 0.
- **D)** P = 1 e Y = 1.

**Resposta correta: C.**

**Justificativa:** A NOR recebe duas entradas 0 e produz P = 1. Depois, a XOR recebe 1 e 1, produzindo Y = 0.

---

## 17. Saída constante — Médio

Um circuito calcula:

- `P = AND(A,B)`
- `Q = NAND(A,B)`
- `Y = OR(P,Q)`

Como a saída Y se comporta?

- **A)** É sempre igual a A.
- **B)** É sempre igual a B.
- **C)** Permanece sempre em 0.
- **D)** Permanece sempre em 1.

**Resposta correta: D.**

**Justificativa:** Q é a negação de P. Portanto, a saída final é `Y = P + ¬P`, que sempre vale 1.

---

## 18. Reconstrução das entradas — Médio

Um circuito possui duas saídas:

- `P = XOR(A,B)`
- `Q = AND(A,B)`

Durante um teste, foram observados **P = 1 e Q = 0**. Quais combinações de entrada são compatíveis com essa observação?

- **A)** Apenas A = 0 e B = 0.
- **B)** A = 0 e B = 1, ou A = 1 e B = 0.
- **C)** Apenas A = 1 e B = 1.
- **D)** A = 0 e B = 0, ou A = 1 e B = 1.

**Resposta correta: B.**

**Justificativa:** P = 1 indica que as entradas são diferentes. Tanto 01 quanto 10 também produzem Q = 0 na AND.

---

## 19. Controle com prioridade — Médio

Uma bomba possui três entradas:

- A: solicitação automática.
- M: solicitação manual.
- S: condição de segurança, sendo 1 quando a operação é permitida.

A bomba deve ligar se houver solicitação automática ou manual, mas **nenhuma solicitação pode ligar a bomba quando S = 0**.

Qual expressão implementa essa regra?

- **A)** `Y = A + (M · S)`
- **B)** `Y = (A · M) + S`
- **C)** `Y = (A + M) · S`
- **D)** `Y = A + M + S`

**Resposta correta: C.**

**Justificativa:** A OR reúne as duas formas de solicitação. A AND com S garante que a condição de segurança seja obrigatória para qualquer acionamento.
