# Seven Puzzles

Quiz de lógica e circuitos digitais para jogar em sala de aula, com perguntas no celular, placar ao vivo e controle pelo professor. O projeto usa **HTML, CSS e JavaScript**, **Cloudflare Workers**, **Durable Objects com SQLite** e **WebSocket**.

A interface inclui um guia de portas lógicas, entrada por código ou QR code, três modos de competição e um simulador que funciona sem criar sala.

## Recursos

- **167 questões:** 161 importadas de documentos e 6 de identificação visual.
- **Seis categorias**, com níveis fácil e médio.
- **90 segundos por pergunta**, avanço individual e explicação após a resposta.
- Placar calculado no servidor, pausa e retomada com preservação do tempo.
- Histórico de questões que impede repetições na mesma disputa, conforme o modo.
- Painel do professor com configuração da sala, distribuição de equipes, remoções e exportação CSV.
- Acompanhamento dos participantes ativos por espectadores, sem controles administrativos. Participantes organizados por equipe e por nome nas telas de acompanhamento e do administrador, com identificação da sua equipe e aviso personalizado de vitória.
- Reconexão autenticada por token privado do participante.
- Modo teste com consulta por número e simulação completa das competições.

## Modos de competição

| Modo | Funcionamento | Encerramento |
| --- | --- | --- |
| Individual | Cada participante responde a 7 perguntas, sem equipe. | Pontos e acertos definem o vencedor. Persistindo o empate, os líderes recebem uma pergunta média adicional por rodada. |
| Em grupo | A equipe soma os pontos de seus integrantes em 7 perguntas por pessoa. | A equipe vencedora avança a uma final individual de 6 médias, iniciada somente após autorização do professor. |
| Competição entre grupos | Primeira rodada com 7 perguntas por pessoa; seguintes com 2, uma fácil e uma média. | A pior equipe é eliminada a cada rodada, até restar uma. Não há final individual. |

As rodadas começam com placar zerado. Pontos são o primeiro critério; quantidade de acertos é o segundo. Tempo total não determina um vencedor quando esses dois critérios empatam.

Na eliminação, equipes empatadas na última posição saem juntas. Se todas empatarem, ninguém sai e uma nova rodada é disputada. Nos grupos com final individual, um empate entre equipes líderes gera outra rodada de 7 perguntas.

### Tempo e pontuação

- Rodada principal: **3 fáceis + 4 médias**.
- Final individual: **6 médias**.
- Tempo: **90 segundos em qualquer questão**.
- Acerto: **100 pontos**.
- Acerto antes de 45 segundos: **1 a 50 pontos extras**, diminuindo conforme o tempo gasto.
- A partir de 45 segundos: sem bônus. Erro ou prazo encerrado: zero.
- Exemplo: um acerto em 22,5 segundos vale **125 pontos**.
- Pausar congela o prazo e o tempo usado no cálculo do bônus.

Cada pessoa avança ao terminar sua própria resposta e explicação; não precisa esperar os colegas.

## Banco de questões

| Categoria | Conteúdo |
| --- | --- |
| Portas lógicas | AND, OR e NOT |
| Portas derivadas | NAND, NOR e XOR |
| Tabelas-verdade | Entradas, saídas e combinações |
| Álgebra booleana | Expressões e simplificação |
| Circuitos combinacionais | Interpretação de conexões entre portas |
| **Circuitos Digitais** | Aplicações, sinais, falhas, autorização, prioridade e análise de circuitos |

As seis portas do guia — **AND, OR, NOT, NAND, NOR e XOR** — também têm questões visuais. Guia e perguntas usam a mesma definição de símbolos. Rodadas completas priorizam uma questão visual quando houver uma fácil inédita disponível, além da nova categoria quando houver uma média inédita disponível. As demais perguntas variam entre as categorias disponíveis.

### Documentos de origem

| Arquivo em `data/` | Questões presentes |
| --- | ---: |
| [100_questoes_logica_digital.md](data/100_questoes_logica_digital.md) | 96 |
| [50_novas_questoes_logica_digital_101_a_150.md](data/50_novas_questoes_logica_digital_101_a_150.md) | 46 |
| [20_questoes_circuitos_digitais.md](data/20_questoes_circuitos_digitais.md) | 19 |
| Identificação visual das portas do guia | 6 |
| **Total** | **167** |

São **88 fáceis e 79 médias**. Os dois primeiros documentos não contêm os números 057, 090, 091, 092, 118, 141, 142 e 147. O terceiro termina na questão 19: não contém a questão 20. Seu cabeçalho menciona atrasos de propagação na questão 19, mas o enunciado correspondente trata de controle com prioridade. Os documentos foram preservados; questões ausentes não foram inventadas.

As perguntas da nova categoria usam IDs `digital-001` a `digital-019`, distintos de `md-001` a `md-150`. Enunciados, alternativas, gabaritos, justificativas e níveis são preservados. Listas, destaques, expressões e tabelas recebem formatação HTML legível.

### Distribuição sem repetição

- Em equipes, o histórico é compartilhado pelos integrantes, incluindo desempates e final. Uma pergunta distribuída a um colega não será reutilizada na mesma equipe.
- Equipes diferentes podem receber a mesma questão.
- No modo individual, o histórico é compartilhado por todos os participantes da sala.
- Embaralhar alternativas não cria uma nova questão.
- O histórico é persistido e sobrevive à reconstrução do Durable Object. Uma nova partida reinicia o histórico.
- O banco é finito. Se desempates sucessivos impedirem uma rodada inédita completa, o jogo registra empate em vez de repetir perguntas. No modo em grupo, o servidor reserva questões médias para a final.

Com o banco atual, o modo individual aceita **até 19 participantes**. Esse limite é calculado a partir das questões disponíveis por nível e atualizado no painel. Nos modos em grupo, configure de **2 a 10 equipes**, com **1 a 5 integrantes por equipe**.

## Executar localmente

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

Não use os valores de exemplo em produção. `.dev.vars` é apenas local, está no `.gitignore` e não deve ser incluído no GitHub. O modelo `.dev.vars.example` pode ser versionado.

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

## Usar o painel

1. Informe usuário e senha; o botão de olho permite mostrar ou ocultar a senha digitada.
2. Crie a sala e escolha o modo **antes de receber os participantes**.
3. Ajuste equipes e limites, quando aplicável. Compartilhe o código ou QR code.
4. Opcionalmente, distribua os participantes equilibradamente ou bloqueie inscrições e trocas de equipe.
5. Inicie a partida. Acompanhe progresso, conexão, pontuação e tempo de resposta.
6. Use pausar, retomar, avançar ou parar conforme necessário. “Avançar todos” encerra as perguntas atuais sem resposta ou avança quem já está na explicação.
7. No modo em grupo, autorize a final individual quando os integrantes estiverem prontos.
8. Ao terminar, baixe o CSV de resultados ou inicie outra partida na mesma sala.

Parar retorna todos à sala de espera. Remoções ficam disponíveis no lobby e durante as perguntas; algumas etapas bloqueiam remoções para manter o resultado consistente. O modo da sala só pode mudar enquanto estiver vazia.

Quem está fora da disputa acompanha apenas os participantes ativos, sem acesso aos controles do professor. O retorno à página inicial fica disponível após o resultado final. No modo em grupo, integrantes das outras equipes também podem voltar ao início e retornar ao acompanhamento depois que o administrador inicia a final individual; os finalistas aguardam o resultado. Se o administrador encerrar a partida, todos voltam automaticamente à página inicial. Salas expiram após **8 horas** de sua criação.

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

## Publicar na Cloudflare

A publicação é de um **Worker com Static Assets e Durable Objects**, não de uma pasta HTML isolada. O `wrangler.toml` já contém:

- Entrada do servidor: `src/worker.js`.
- Arquivos estáticos: `public/`.
- Rotas `/api/*` e `/ws` atendidas pelo Worker.
- Binding `ROOMS` para a classe `Room`.
- Migração `v1` com `new_sqlite_classes = ["Room"]`.

Execute na raiz do projeto:

```bash
npm ci
npm run check
npm run deploy:check
npx wrangler login
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
npm run deploy
```

Cada comando `secret put` solicita o valor pelo terminal. As credenciais de `.dev.vars` **não substituem** os Secrets de produção.

O nome do Worker está em `wrangler.toml`. Ao atualizar uma publicação existente, preserve a migração já aplicada; não reutilize o nome de uma migração para outra alteração. Evite publicar durante uma partida ativa, pois conexões podem precisar ser restabelecidas.

O `deploy:check` valida o empacotamento e os bindings sem publicar. A primeira publicação ainda depende da autenticação, das permissões e dos recursos disponíveis na conta Cloudflare; somente um deploy real confirma esses pontos. Depois de publicar, faça uma partida curta com dois dispositivos e confira a reconexão. O servidor responde explicitamente ao fechamento WebSocket, como necessário para a data de compatibilidade configurada.

Referências oficiais: [configuração de Static Assets](https://developers.cloudflare.com/workers/static-assets/binding/), [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/), [fechamento WebSocket](https://developers.cloudflare.com/workers/runtime-apis/websockets/) e [comandos do Wrangler, incluindo dry-run](https://developers.cloudflare.com/workers/wrangler/commands/workers/).

## Preparar o repositório no GitHub

Versione código, `data/`, `scripts/`, testes, `README.md`, `.gitignore`, `.dev.vars.example`, `package.json`, `package-lock.json` e `wrangler.toml`.

Mantenha fora do Git os arquivos de credenciais, `node_modules/`, `.wrangler/` e `dist/`. O `.gitignore` já cobre esses caminhos. Não é necessário publicar os arquivos de banco local gerados pelo Wrangler.

Se o repositório contiver esta pasta dentro de outra, configure `seven-puzzles-cloudflare` como diretório raiz na integração de publicação. Para um repositório contendo somente o projeto, use a raiz do repositório.

## Estrutura

```text
public/                    páginas, estilos, módulos e banco público das questões
  gate-library.js          símbolos e definições compartilhados com o guia
  question-catalog.js       categorias, origens e identificação das questões
  question-bank.js          banco gerado a partir dos documentos
  questions.js              seleção e distribuição sem repetição
  question-view.js          formatação de listas, fórmulas e tabelas
  competition-rules.js      decisão de classificação real e simulada
  test-competition.js       participantes e estado das simulações
src/
  worker.js                 rotas HTTP, autenticação e encaminhamento WebSocket
  room.js                   sala persistente, cronômetros, regras e pontuação
scripts/
  import-questions.mjs      importação dos documentos
  audit-questions.mjs       comparação de conteúdo com os documentos
  check-source.mjs          sintaxe, imports e referências das páginas
data/                       documentos originais
test.js                    testes do servidor e do banco
test-competition.js        testes das simulações
wrangler.toml               configuração da Cloudflare
.dev.vars.example           modelo de credenciais locais
```

## Problemas comuns

| Sintoma | O que conferir |
| --- | --- |
| Falha ao instalar ou iniciar o Wrangler | Versão do Node.js: use 22.12.0 ou superior e execute `npm ci`. |
| Porta 8787 ocupada | Encerre seu servidor anterior ou use `npm run dev -- --port 8791`. |
| Admin não consegue criar sala | `.dev.vars` no ambiente local; Secrets `ADMIN_USERNAME` e `ADMIN_PASSWORD` em produção. |
| Celular não abre a sala local | Mesmo Wi-Fi, IP do computador, firewall e `npm run dev:rede`. Não use `localhost` no celular. |
| Câmera indisponível | Permissão da câmera e HTTPS; use a entrada manual como alternativa. |
| QR não aparece | Verifique acesso à biblioteca externa; o código da sala continua disponível. |
| Questão parece diferente do documento | Confira o número e desmarque o embaralhamento no modo teste. |
| Sala cheia no individual | O limite depende do banco disponível por nível; o painel mostra a capacidade atual. |
| Empate por falta de perguntas inéditas | Inicie uma nova partida. O histórico não é apagado no meio de uma disputa. |
