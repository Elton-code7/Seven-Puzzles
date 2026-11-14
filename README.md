<h1 align="center"> Seven Puzzles </h1>

<p align="center">
  Sete enigmas de circuitos digitais, três formas de jogar e uma sala cheia de rivais. Quem decifra mais rápido leva a glória.
  
</p>

<p align="center">
  <img src="https://iconic-api.onrender.com/dark/js" width="64px" />
  <img src="https://iconic-api.onrender.com/dark/css" width="64px" />
  <img src="https://iconic-api.onrender.com/dark/html" width="64px" />
</p>

---

## 📌 Sobre o Projeto

Quiz de lógica e circuitos digitais para jogar em sala de aula, com perguntas no celular, placar ao vivo e controle pelo professor. O projeto usa **HTML, CSS e JavaScript**, **Cloudflare Workers**, **Durable Objects com SQLite** e **WebSocket**.

A interface inclui um guia de portas lógicas, entrada por código ou QR code, três modos de competição e um simulador que funciona sem criar sala.

## ✨ Recursos

- **Seis categorias**, com níveis fácil e médio.
- **90 segundos por pergunta**, avanço individual e explicação após a resposta.
- Placar calculado, pausa e retomada com preservação do tempo.
- Histórico de questões que impede repetições na mesma disputa, conforme o modo.
- Painel do professor com configuração da sala, distribuição de equipes, remoções e exportação CSV.
- Acompanhamento dos participantes ativos por espectadores, sem controles administrativos. Participantes organizados por equipe e por nome nas telas de acompanhamento e do administrador, com identificação da sua equipe e aviso personalizado de vitória.
- Modo teste com consulta por número e simulação completa das competições.

## Modos de competição

| Modo | Funcionamento | Encerramento |
| --- | --- | --- |
| Individual | Cada participante responde a 7 perguntas, sem equipe. | Pontos e acertos definem o vencedor. Persistindo o empate, os líderes recebem uma pergunta média adicional por rodada. |
| Em grupo | A equipe soma os pontos de seus integrantes em 7 perguntas por pessoa. | A equipe vencedora avança a uma final individual de 6 médias, iniciada somente após autorização do professor. |
| Competição entre grupos | Primeira rodada com 7 perguntas por pessoa; seguintes com 2, uma fácil e uma média. | A pior equipe é eliminada a cada rodada, até restar uma. Não há final individual. |

As rodadas começam com placar zerado. Pontos são o primeiro critério; quantidade de acertos é o segundo. Tempo total não determina um vencedor quando esses dois critérios empatam.

Na eliminação, equipes empatadas na última posição saem juntas. Se todas empatarem, ninguém sai e uma nova rodada é disputada. Nos grupos com final individual, um empate entre equipes líderes gera outra rodada de 7 perguntas.

### ⏰ Tempo e pontuação

- Rodada principal: **3 fáceis + 4 médias**.
- Final individual: **6 médias**.
- Tempo: **90 segundos em qualquer questão**.
- Acerto: **100 pontos**.
- Acerto antes de 45 segundos: **1 a 50 pontos extras**, diminuindo conforme o tempo gasto.
- A partir de 45 segundos: sem bônus. Erro ou prazo encerrado: zero.
- Exemplo: um acerto em 22,5 segundos vale **125 pontos**.
- Pausar congela o prazo e o tempo usado no cálculo do bônus.


## Banco de questões

| Categoria | Conteúdo |
| --- | --- |
| Portas lógicas | AND, OR e NOT |
| Portas derivadas | NAND, NOR e XOR |
| Tabelas-verdade | Entradas, saídas e combinações |
| Álgebra booleana | Expressões e simplificação |
| Circuitos combinacionais | Interpretação de conexões entre portas |
| Circuitos Digitais | Aplicações, sinais, falhas, autorização, prioridade e análise de circuitos |

As seis portas do guia — **AND, OR, NOT, NAND, NOR e XOR** — também têm questões visuais. Guia e perguntas usam a mesma definição de símbolos. Rodadas completas priorizam uma questão visual quando houver uma fácil inédita disponível, além da nova categoria quando houver uma média inédita disponível. As demais perguntas variam entre as categorias disponíveis.


### Distribuição sem repetição

- Em equipes, o histórico é compartilhado pelos integrantes, incluindo desempates e final. Uma pergunta distribuída a um colega não será reutilizada na mesma equipe.
- Equipes diferentes podem receber a mesma questão.
- No modo individual, o histórico é compartilhado por todos os participantes da sala.
- O banco é finito. Se desempates sucessivos impedirem uma rodada inédita completa, o jogo registra empate em vez de repetir perguntas. No modo em grupo, o servidor reserva questões médias para a final.

Com o banco atual, o modo individual aceita **até 19 participantes**. Esse limite é calculado a partir das questões disponíveis por nível e atualizado no painel. Nos modos em grupo, configure de **2 a 10 equipes**, com **1 a 5 integrantes por equipe**.

## 🚀 Como Executar localmente

### Requisitos

- **Node.js 22.12.0 ou superior**, conforme o Wrangler fixado no `package-lock.json`.
- npm.
- Para publicar: uma conta Cloudflare com acesso a Workers e Durable Objects.

Na pasta que contém `package.json` e `wrangler.toml`:

```bash
npm ci
cp .dev.vars.example .dev.vars
```

Edite `.dev.vars` com suas credenciais de administrador:

```dotenv
ADMIN_USERNAME=seu_usuario
ADMIN_PASSWORD=sua_senha
```

Não use os valores de exemplo em produção. `.dev.vars` é apenas local, está no `.gitignore` e não foi incluído no GitHub. O modelo `.dev.vars.example` pode ser versionado.

Inicie o servidor:

```bash
npm run dev
```

| Endereço local | Uso |
| --- | --- |
| `http://localhost:8787/` | Entrada dos participantes e guia de portas |
| `http://localhost:8787/admin.html` | Criar e administrar salas |
| `http://localhost:8787/teste.html` | Consultar questões e simular competições |

O Wrangler pode redirecionar `/admin.html` e `/teste.html` para os endereços sem extensão; ambos os formatos funcionam.

### Testar com celulares

```bash
npm run dev:rede
```

Conecte os dispositivos à mesma rede Wi-Fi. No computador, abra a aplicação pelo seu IP da rede, por exemplo `http://192.168.0.10:8787/admin.html`, antes de gerar o QR code. Assim, o QR apontará para um endereço acessível aos celulares, em vez de `localhost`.

A câmera pode ser bloqueada pelo navegador em HTTP local. Nesse caso, use o código digitado. Para câmera em produção, use o endereço HTTPS da publicação.

## 🖥️ Usar o painel

1. Informe usuário e senha; o botão de olho permite mostrar ou ocultar a senha digitada.
2. Crie a sala e escolha o modo **antes de receber os participantes**.
3. Ajuste equipes e limites, quando aplicável. Compartilhe o código ou QR code.
4. Opcionalmente, distribua os participantes equilibradamente ou bloqueie inscrições e trocas de equipe.
5. Inicie a partida. Acompanhe progresso, conexão, pontuação e tempo de resposta.
6. Use pausar, retomar, avançar ou parar conforme necessário. “Avançar todos” encerra as perguntas atuais sem resposta ou avança quem já está na explicação.
7. No modo em grupo, autorize a final individual quando os integrantes estiverem prontos.

Parar retorna todos à sala de espera. Remoções ficam disponíveis no lobby e durante as perguntas; algumas etapas bloqueiam remoções para manter o resultado consistente. O modo da sala só pode mudar enquanto estiver vazia.

Quem está fora da disputa acompanha apenas os participantes ativos. O retorno à página inicial fica disponível após o resultado final. No modo em grupo, integrantes das outras equipes também podem voltar ao início depois que o administrador inicia a final individual; os finalistas aguardam o resultado. Ao voltar ao início, o participante sai da sala, tem a sessão encerrada e é removido imediatamente da lista de participantes do administrador. Os resultados e o histórico das rodadas concluídas são preservados. Se o administrador encerrar a partida, todos voltam automaticamente à página inicial. Salas expiram após **8 horas** de sua criação.

Na tela de espera com QR code, o botão **Excluir sala**, no canto superior direito, encerra a sala definitivamente após confirmação. Todos são desconectados; dados de participantes, histórico, temporizadores e alarme são removidos. Permanece apenas uma marca de encerramento para que o código antigo exiba **“Esta sala foi encerrada pelo administrador”** e não seja reutilizado. A ação é exclusiva do administrador e fica indisponível durante partidas.

## Modo teste

Acesse `/teste.html` para:

- Filtrar por categoria, nível ou tipo de questão, incluindo **Circuitos Digitais**.
- Consultar uma questão pelo número, com alternativas em ordem fixa por padrão.
- Ativar o embaralhamento das alternativas, se desejar.
- Revisar os **seis símbolos** sem restringir a consulta às portas básicas.
- Simular individual, grupos com final, eliminação ou uma final isolada.
- Jogar contra participantes fictícios, ajustar a taxa de acerto deles e simular respostas restantes.
- Conferir rankings, empates e eliminações antes de continuar para a próxima etapa.

O teste é local ao navegador e não salva pontos em salas reais. Os critérios de classificação são compartilhados com o servidor. As transições aguardam o botão “Continuar” para facilitar a inspeção. Durante uma consulta avulsa, o tempo exibido indica o prazo usado no jogo; a consulta não tem contagem regressiva.

## Verificação e manutenção

```bash
# Sintaxe de todos os módulos, arquivos e referências das páginas,
# auditoria dos documentos e testes de comportamento
npm run check

# Conferir apenas o banco contra os documentos originais em data/
npm run audit:questions

# Regenerar o banco após uma alteração intencional nos documentos
npm run import:questions

# Preparar o pacote da Cloudflare, sem publicar
npm run deploy:check
```

Para auditar arquivos em outro local:

```bash
node scripts/audit-questions.mjs /caminho/100_questoes_logica_digital.md /caminho/50_novas_questoes_logica_digital_101_a_150.md /caminho/20_questoes_circuitos_digitais.md
```

Ao adicionar documentos, cadastre origem e contagem em `public/question-catalog.js`, adapte o importador se o formato for diferente e atualize os testes. Não altere manualmente o arquivo gerado `public/question-bank.js`.

Os testes verificam o banco, símbolos, formatação, pontuação, tempo, pausas, avanço independente, permissões, reconexão, persistência, limites de inscrição, remoções, os três modos, desempates e esgotamento das perguntas. O simulador também tem testes próprios.

## 🤝 Contribuição

 **Amanda Chiavini** — [LinkedIn](https://www.linkedin.com/in/amanda-chiavini-2a4a3828a)
 
 **Ana Livia Breviglieri** — [LinkedIn](https://www.linkedin.com/in/ana-livia-lima-breviglieri-6a3105308)
 
 **Elton Henrique** — [LinkedIn](https://www.linkedin.com/in/elton-henrique-da-silva-335aa8244/)
