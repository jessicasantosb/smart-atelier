# Fases para a construção completa do Smart Atelier

Atualizado em 26/11/2026.

O Smart Atelier é um projeto integrador modular para construir um marketplace de artesanato e estudar engenharia de software com IA aplicada. A construção da aplicação, os laboratórios independentes e o estudo teórico avançam em trilhas coordenadas. Atividades de carreira e entrevistas ficam fora do plano.

Este arquivo organiza a sequência, as dependências e os critérios das entregas. O [registro de decisões da aplicação](docs/decisions.md) define o comportamento aprovado e suas pendências; a [arquitetura](docs/architecture.md) descreve componentes e limites; o [plano de estudo e matriz de cobertura](docs/ia-study-plan.md) detalha todos os tópicos, tarefas e evidências de aprendizado.

## Como acompanhar o trabalho

- **Aplicação no projeto:** desenvolvimento do marketplace ou de seu processo interno de engenharia, conforme o escopo aprovado.
- **Exercício separado:** laboratório com dados autorizados ou sintéticos, fora das rotas e dos dados operacionais do marketplace.
- **Estudo teórico:** análise, comparação ou decisão fundamentada. Uma leitura não comprova execução de um treinamento, integração ou implantação.
- Cada tarefa registra objetivo, pré-requisitos, comportamento incluído, critérios de conclusão, validação e evidência. Estados aceitos: planejado, em andamento, bloqueado e concluído.
- Uma capacidade experimental só entra no produto após avaliação e decisão explícita. A escolha de uma ferramenta para um laboratório não muda a stack da aplicação.
- Documentar cobertura não autoriza custos, provisionamento, envio de dados privados, alterações em integrações protegidas ou execução automática de todos os exercícios.
- A numeração organiza os assuntos; a execução segue as dependências dos marcos. Segurança, acessibilidade, gestão, qualidade e observabilidade começam nas primeiras entregas.

## Estado conhecido e três critérios de entrega

As fases de escopo e de base técnica têm conclusão histórica registrada em 12/11/2026. A base técnica inclui a API Rust, conexões PostgreSQL/Redis, health checks, o indicador de conectividade do frontend e o workflow de CI. A execução com serviços do Compose e a execução remota da CI permanecem como verificações operacionais pendentes. Este documento não declara novas verificações executadas.

A fase de UX tem um protótipo navegável em SolidJS para as jornadas simuladas de artesão e comprador. A revisão guiada e a validação em navegador ainda fazem parte do aceite. As demais fases estão planejadas e exigem evidências de entrega.

| Entrega                                   | Critério para considerar concluída                                                                                                                                                   | Evidência necessária                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Primeira demonstração integrada           | Percorrer cadastro, loja, publicação assistida, compra de peça pronta, pagamento de teste, entrega rastreada e transferência Connect de teste; cobrir as falhas críticas do recorte. | Roteiro reproduzível, verificações automatizadas com serviços simulados e roteiro manual com evidência no app e nos provedores. |
| Marketplace completo do escopo aprovado   | Completar também encomendas/orçamentos, chat, gestão dos trabalhos, acompanhamento e dashboard; fechar as regras pendentes antes de cada implementação.                              | Critérios funcionais, contratos, testes de permissão e falha, jornadas avaliadas e documentação da operação.                    |
| Cobertura integral do aprendizado técnico | Atender todos os tópicos do plano de estudo por aplicação no projeto, exercício separado ou teoria, respeitando o nível prático exigido em cada tarefa.                              | Matriz atualizada com resultados reais, caminhos de evidência, medições, limites e pendências explícitas.                       |

Uma demonstração concluída não conclui os laboratórios. Concluir os laboratórios não comprova que o marketplace está completo. Pagamentos reais e operação comercial não são requisitos desses critérios; qualquer mudança depende de decisão própria.

## Primeira demonstração integrada

### Jornada do artesão

1. Criar uma conta e a loja. Login próprio e Google resolvem para uma conta interna; a mesma conta pode comprar e vender.
2. Concluir o onboarding do Stripe Connect em modo de teste antes de publicar um item à venda.
3. Cadastrar uma peça pronta com uma ou mais fotos, categoria/tipo, materiais, técnica, medidas e unidades ou indicação de não aplicável, preço, BRL e quantidade disponível. Peça única começa com quantidade 1; cor, acabamento e cuidados são opcionais.
4. Solicitar ao Ollama local uma proposta de título e descrição a partir das informações e fotos. A IA não inventa nem altera preço, materiais, medidas ou estoque.
5. Revisar, editar e aprovar o texto antes da publicação. Abrir diretamente a página pública da loja ou da peça.

### Jornada do comprador e entrega

1. Abrir o link público e autenticar-se antes de iniciar a compra de um único item.
2. Informar o endereço no Smart Atelier e revisar o pedido antes do redirecionamento.
3. Iniciar a Checkout Session hospedada pelo Stripe, somente com cartão de teste em BRL. Reservar o estoque por 30 minutos. A recusa de uma tentativa mantém sessão e reserva ativas para outra tentativa; liberar a quantidade após expiração final confirmada sem pagamento.
4. Confirmar o pagamento exclusivamente por evento autenticado do Stripe. O retorno do navegador não muda o pedido para pago. Apagar o endereço quando a sessão expirar sem pagamento; manter o endereço no pedido pago para envio e acompanhamento.
5. O artesão registra transportadora e código após enviar o pacote. O rastreamento aparece no app e no Ship24.
6. Quando um evento Ship24 autenticado e válido indicar entrega, iniciar uma única transferência de teste de 100% do valor do item ao saldo Stripe Connect do artesão, sem comissão da plataforma na demonstração. O envio posterior ao banco segue o cronograma Connect.

O fluxo usa _separate charges and transfers_ apenas em teste. PostgreSQL guarda estado e registros de idempotência; Redis agenda processamento e retries. Eventos repetidos, fora de ordem ou em falha não antecipam nem duplicam efeitos. O fluxo de referência é `awaiting_payment` → `paid` → `shipped` → `delivered` → `transfer_pending` → `transferred`; a expiração sem pagamento encerra a tentativa pendente. Rastreamento indisponível ou em exceção não libera transferência.

Antes de integrar o rastreamento, validar a cobertura dos Correios e as condições atuais do Ship24. O limite aceito para o demo é de até 10 rastreamentos por mês no plano gratuito, sem excedente cobrado; a cota não deve ser consumida pela CI. Se a cobertura ou gratuidade não atender ao recorte, registrar o bloqueio e rever a escolha antes de executar a integração.

O primeiro ambiente é local: SolidJS/TypeScript/Tailwind no frontend, Rust/Axum/Tokio para a API, PostgreSQL/SQLx, Redis, Ollama, imagens no filesystem por interface substituível e túnel HTTPS temporário para webhooks. Provedores e hospedagem de produção permanecem em aberto.

Ficam fora da primeira demonstração: encomendas e negociação de orçamento, chat, descoberta por busca de catálogo, carrinho com múltiplos itens ou lojas, produção personalizada, cotação/cálculo de frete, emissão de etiqueta, cancelamento após pagamento, reembolso, disputa, pagamento real e lançamento comercial. Os itens aprovados para o produto completo entram depois do refinamento das regras correspondentes.

## Prioridade aprovada dos marcos

A ordem abaixo foi aprovada em 12/11/2026 e permanece sem datas ou estimativas de duração. As fases são executadas parcialmente quando isso permite completar a jornada vertical; pagamento de peça pronta não depende da implementação de encomendas ou chat.

| Marco                                           | Resultado esperado                                                                                                      | Trabalho necessário                                                                            | Limites e dependências                                                                                                                |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Base de desenvolvimento                         | API Rust inicial, PostgreSQL, Redis, ambiente local e verificações automatizadas.                                       | Base técnica, configuração, qualidade e segurança inicial.                                     | Conclusão histórica registrada; verificar Compose ativo e CI remota antes de depender dessas execuções.                               |
| Artesão e publicação assistida                  | Conta, loja, Connect onboarding de teste, peça/imagens, rascunho Ollama revisado e página pública.                      | UX, identidade, lojas, cadastro de trabalhos e primeira integração de IA.                      | Regras de publicação, armazenamento local, isolamento por conta e avaliação do rascunho.                                              |
| Compra e pagamento de teste                     | Comprador autenticado, endereço, reserva e Checkout hospedado com confirmação por webhook.                              | Identidade, página da peça, contrato de pedido de item pronto e pagamentos.                    | Cartão de teste, BRL, reserva de 30 minutos; sem carrinho, encomendas ou frete calculado.                                             |
| Entrega e transferência                         | Transportadora/código, tracking, entrega e transferência Connect de teste.                                              | Rastreamento, eventos, fila/retries, idempotência e validação ponta a ponta.                   | Correios validado no Ship24, até 10 rastreamentos mensais e credenciais de teste.                                                     |
| Marketplace completo                            | Gestão completa de trabalhos, descoberta selecionada, encomendas/orçamentos, chat, acompanhamento, dashboard e suporte. | Refinamento de regras e expansão das jornadas já aprovadas.                                    | Fechar detalhes de conta, visibilidade, encomendas, suporte e pagamentos antes de cada entrega. Novas funcionalidades exigem decisão. |
| IA aplicada ampliada e cobertura do aprendizado | Estudar e avaliar todos os tópicos técnicos, integrando ao produto apenas capacidades aprovadas.                        | APIs multimodais, RAG, MCP, agentes, ML, fine-tuning, gestão, arquitetura, segurança e DevOps. | Dados autorizados, baseline, limites e evidências; laboratórios independentes e custos autorizados quando necessários.                |

## Visão geral das fases

| Fase                                          | Resultado esperado                                                   | Pré-requisitos principais                                        | Estado                                                         |
| --------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Escopo, arquitetura e plano de entrega        | Projeto integrador, primeira demonstração e prioridades registrados. | Decisões da aplicação.                                           | Concluída no planejamento, historicamente.                     |
| Base técnica e fluxo de desenvolvimento       | Ambiente, API inicial, serviços e verificações disponíveis.          | Escopo e arquitetura inicial.                                    | Concluída historicamente; verificações operacionais pendentes. |
| UX, protótipos e acessibilidade               | Jornadas navegáveis avaliadas.                                       | Recorte demonstrável e linguagem do domínio.                     | Protótipo em revisão.                                   |
| Contas, autenticação e lojas                  | Identidade e permissões validadas no Rust.                           | Base técnica, UX e regras de conta/loja.                         | Planejada.                                                     |
| Catálogo e descoberta                         | Trabalhos e páginas públicas; descoberta posterior selecionada.      | Identidade, loja, mídia e regras de publicação.                  | Planejada.                                                     |
| Encomendas, chat e pedidos                    | Orçamento negociado, aceite, histórico e acompanhamento.             | Contas/lojas, trabalhos e regras de encomenda.                   | Planejada; expansão após a primeira demonstração.              |
| Pagamento, entrega e repasse                  | Compra de item pronto e transferência de teste após entrega.         | Conta, peça pública, contrato de pedido e integração de eventos. | Planejada; independe de encomendas/chat para o demo.           |
| Dashboard, suporte e operação                 | Indicadores rastreáveis e ferramentas de acompanhamento.             | Eventos de negócio e definições de suporte.                      | Planejada.                                                     |
| IA generativa e multimodal                    | Rascunho aprovado no demo e experimentos avaliados.                  | Dados autorizados, baseline e limites.                           | Planejada.                                                     |
| Busca semântica e RAG                         | Recuperação com fontes e avaliação de relevância.                    | Corpus autorizado, esquema de acesso e baseline.                 | Planejada; laboratório primeiro.                               |
| MCP e integração programática                 | Servidor/cliente e composição demonstrados com segurança.            | Contratos de laboratório e autenticação.                         | Planejada; laboratório primeiro.                               |
| Agentes e orquestração                        | Agentes limitados comparados a alternativas determinísticas.         | Ferramentas, contexto, avaliação e controles de autonomia.       | Planejada; laboratório primeiro.                               |
| Laboratórios de ML no navegador               | Treino real, vídeo e jogos avaliados.                                | Fundamentos, dados e recursos locais.                            | Planejada.                                                     |
| Dataset, fine-tuning e avaliação              | Dados e treinamento real avaliados contra baseline.                  | Dados autorizados, modelo compatível e recursos aprovados.       | Planejada.                                                     |
| Segurança, privacidade e governança           | Controles, responsabilidades e riscos verificáveis.                  | Transversal desde o planejamento.                                | Planejada, aplicada progressivamente.                          |
| Infraestrutura, observabilidade e resiliência | Ambiente reproduzível e operação avaliada.                           | Necessidade concreta do demo ou laboratório isolado.             | Planejada, aplicada progressivamente.                          |
| Qualidade ponta a ponta                       | Contratos, jornadas, acessibilidade e falhas comprovados.            | Comportamentos implementados no recorte avaliado.                | Planejada, aplicada progressivamente.                          |
| Implantação e demonstração integradora        | Entrega reproduzível e avaliação dos três critérios de conclusão.    | Recorte correspondente implementado e validado.                  | Planejada.                                                     |

## Fases detalhadas

### Fase 0 — Escopo, arquitetura e plano de entrega

**Estado:** concluída no planejamento em 12/11/2026, conforme o registro histórico. A conclusão cobre a definição do projeto integrador, da primeira demonstração, da arquitetura inicial e da ordem dos marcos; não comprova entrega de produto nem cobertura de todos os estudos.

**Aplicação e pré-requisitos:** planejamento do projeto; decisões confirmadas de público, papéis, vendas e aprendizado.

**Trabalho e assuntos:** definir proposta de valor, limites da demonstração, histórias e critérios; separar aplicação, exercícios e teoria; usar IA com revisão para decomposição e priorização; decidir IA versus lógica determinística, considerando latência, precisão, custo e desempenho; manter backlog e riscos. As simulações de cronograma e capacidade pertencem à trilha transversal de gestão e não criam datas aprovadas.

**Critério de conclusão:** decisões e pendências identificáveis, marcos ordenados, fronteiras da arquitetura e critérios da demonstração descritos. Novas revisões mantêm o histórico e não apresentam propostas como decisões.

**Evidência:** [decisões da aplicação](docs/decisions.md), [arquitetura inicial](docs/architecture.md) e marcos deste roadmap. Registrar alterações futuras com contexto e consequências.

### Fase 1 — Base técnica e fluxo de desenvolvimento

**Estado:** concluída historicamente em 12/11/2026. O registro informa verificações locais de Rust/frontend aprovadas na ocasião; não representa uma nova execução nesta revisão. Compose com PostgreSQL/Redis ativos e CI remota ainda precisam de evidência operacional.

**Aplicação e pré-requisitos:** engenharia do projeto; escopo e arquitetura inicial aprovados.

**Trabalho e assuntos:** manter SolidJS, TypeScript, Solid Router, Tailwind, Vite+ e Bun; Rust/Axum/Tokio, SQLx/PostgreSQL e Redis; configuração por ambiente e segredos no servidor; health checks, documentação e CI. Estudar prompts para codar, depurar, documentar e aprender; regras de IDEs/agentes; scaffolding, revisão de código e refatoração assistida. Comparações de Cursor, VS Code, Windsurf e outros assistentes ficam como estudo, sem exigir adoção de todos.

**Critério de conclusão:** ambiente descrito, lockfiles versionados, API inicial e conectividade disponíveis; checks reais documentados. Verificar `/health/ready` com os serviços ativos e observar uma execução remota da CI antes de declarar esses cenários validados.

**Evidência:** arquivos de configuração, código de health, workflow e instruções do [README](README.md). Logs/URLs de novas execuções entram no registro de evidências quando existirem.

### Fase 2 — UX, protótipos e acessibilidade

**Estado:** protótipo navegável portado para SolidJS. A revisão guiada e a validação em navegador, incluindo acessibilidade e responsividade, continuam pendentes. Consulte o [design da Fase 2](docs/phase-2-ux-design.md).

**Aplicação e pré-requisitos:** protótipo do projeto e exercícios de ferramentas de design; recorte da demonstração e regras de idioma. Toda interface e código permanecem em inglês.

**Trabalho e assuntos:** mapear artesão e comprador, telas e estados; usar IA para pesquisa/ideação como hipótese, wireframes, mockups e text-to-UI; converter design em SolidJS e revisar componentes. Comparar Figma, Firebase Studio, ferramentas de prototipação e CLI assistida em laboratório; estudar prompts HTML/CSS/TypeScript, geração de componentes e refatoração. Planejar automação E2E com agentes/MCP, distinguindo chamadas de ferramenta de interação real com a UI.

**Critério de conclusão:** protótipo navegável das jornadas demonstrativas, estados de carregamento/erro/vazio/sucesso, rascunho explicitamente simulado, checkout sem coleta real de cartão e navegação sem telas sem saída; revisão guiada com a usuária; teclado, foco, labels, contraste e largura móvel verificados. Conteúdo gerado não conta como pesquisa com participantes.

**Evidência:** design, protótipo integrado à branch de trabalho, capturas móvel/desktop, roteiro de avaliação e problemas encontrados/corrigidos. A existência de um protótipo não comprova autenticação ou integração financeira.

### Fase 3 — Contas, autenticação e lojas

**Estado:** planejada.

**Aplicação e pré-requisitos:** produto; base técnica e UX, contrato de identidade, regras de perfil, sessão, loja e recuperação de conta antes das operações afetadas.

**Trabalho e assuntos:** cadastro e login próprio/Google para uma conta interna, criação de loja e papéis; a mesma conta pode comprar e vender; onboarding Stripe Connect de teste antes da venda; autorização no Rust e isolamento entre contas/lojas. Estudar autenticação de ferramentas, tokens de serviço, revogação, quotas e governança usando contratos separados de laboratório.

**Critério de conclusão:** comprador autentica antes do checkout; artesão cria e gerencia somente sua loja; publicação à venda depende do onboarding; permissões continuam efetivas com requisição HTTP direta; sessões inválidas, expiradas e acesso a outra loja são negados. Quantidade de lojas e demais regras pendentes são decididas antes de sua implementação.

**Evidência:** contratos, migrações correspondentes, testes de autorização, jornadas de conta/loja e roteiro de onboarding de teste; nenhum segredo em logs ou frontend.

### Fase 4 — Catálogo e descoberta

**Estado:** planejada.

**Aplicação e pré-requisitos:** produto para cadastro/páginas públicas; exercícios de recuperação e personalização. Identidade, loja, autorização, mídia e regras de publicação.

**Trabalho e assuntos:** cadastrar/editar peças com dados fornecidos e imagens; separar existência, visibilidade, estoque e disponibilidade. No demo, peça pronta e abertura direta por link público; busca/filtros e demais estados completos entram após refinamento. Em laboratório, comparar busca textual, embeddings, similarity search, busca semântica/híbrida, múltiplos índices e personalização com controles do usuário.

**Critério de conclusão:** edição/publicação autorizadas, preço/moeda/quantidade explícitos, página pública coerente com disponibilidade e ausência de dados; arquivo de mídia validado e protegido por limite/autorizações. Cada forma de descoberta selecionada tem baseline e relevância avaliada antes de entrar no produto.

**Evidência:** contratos de trabalho/mídia, migrações, testes de acesso e validação, páginas públicas, consultas de avaliação e resultados de recuperação quando executados.

### Fase 5 — Encomendas, chat e pedidos

**Estado:** planejada para expansão; não bloqueia o checkout de peça pronta da primeira demonstração.

**Aplicação e pré-requisitos:** produto; contas/lojas, trabalhos e definição de conteúdo, validade, aceite, alterações, prazos, estados, notificações e permissões da encomenda.

**Trabalho e assuntos:** solicitação e negociação de orçamento, chat humano e acompanhamento interno; preservar os termos aceitos; pagamento integral após aceite e antes da produção; definir histórico e transições. Resumo assistido, extração de ações e chatbot de suporte são estudos/candidatos com avaliação e decisão própria.

**Critério de conclusão:** comprador/vendedor negociam e acompanham sem acessar conversa/pedido alheio; mudanças de orçamento preservam histórico e aceite; transições respeitam pagamento/produção; falhas e reconexão não duplicam mensagens ou pedidos. As sugestões de IA, quando aprovadas, não aceitam orçamento nem alteram finanças por conta própria.

**Evidência:** especificação dos fluxos, schemas/contratos, testes de estados/permissões, jornadas avaliadas e histórico reproduzível.

### Fase 6 — Pagamento, entrega e repasse

**Estado:** planejada.

**Aplicação e pré-requisitos:** produto no recorte de teste; conta autenticada, loja habilitada no Connect, peça disponível, contrato de pedido de item pronto, endereço, eventos e idempotência. A encomenda exige regras adicionais apenas na expansão correspondente.

**Trabalho e assuntos:** executar a jornada financeira e de entrega definida neste roadmap: Stripe Checkout hospedado, cartão de teste/BRL, reserva de 30 minutos, webhook autenticado, transportadora/código, Ship24 e transferência após entrega. Estudar integrações seguras, permissões, auditoria, execução idempotente e ações com aprovação em exercícios próprios; a automação financeira do demo segue regras determinísticas.

**Critério de conclusão:** pagamento confirmado só pelo backend; tentativa recusada mantém reserva; expiração final sem pagamento libera quantidade e remove endereço; concorrência não vende a mesma unidade duas vezes; webhook inválido não produz efeito; duplicação, desordem, falha temporária e retomada não duplicam cobrança/transferência. Entrega válida inicia uma transferência de 100% do item; tracking incerto não inicia transferência.

**Evidência:** testes automatizados com Stripe/Ship24 simulados, testes de persistência/fila, trilhas sanitizadas de eventos e roteiro manual de sandbox com estado no app e no dashboard dos provedores. Registrar verificação de Correios/cota; não alegar integração externa real a partir de mock.

### Fase 7 — Dashboard, suporte e operação

**Estado:** planejada.

**Aplicação e pré-requisitos:** produto e processo interno; eventos de pedidos/pagamentos e definição dos indicadores, filtros, fontes e permissões de suporte.

**Trabalho e assuntos:** dashboard do vendedor e acompanhamento operacional; diferenciar valor vendido, recebido, transferido e períodos; definir suporte e responsabilidades. Estudar síntese de dados, relatórios para públicos diferentes, métricas de outcome/OKRs, RAG de documentação e personalização de suporte. Assistência de IA depende de avaliação e aprovação própria.

**Critério de conclusão:** cada indicador tem definição, fonte e exemplo verificável; acesso respeita conta/loja; status e relatórios reproduzem os mesmos fatos; valores não são inventados quando faltam dados. Limites de suporte e ações administrativas são definidos antes de implementar.

**Evidência:** catálogo de métricas, consultas e testes, dashboard demonstrável, relatórios confrontados com eventos e roteiro das permissões operacionais.

### Fase 8 — IA generativa e multimodal

**Estado:** planejada; a geração de título/descrição integra o recorte inicial, os demais tópicos são estudos ou exercícios até seleção.

**Aplicação e pré-requisitos:** rascunho de anúncio no projeto, comparações e multimodalidade em laboratório; dados autorizados, baseline, limites de recursos e interface de provedor no Rust.

**Trabalho e assuntos:** estudar IA como serviço, wrappers e valor de produto; modelos abertos/proprietários, OpenAI, Anthropic, Hugging Face, Gemini, OpenRouter e Ollama; APIs, autenticação, versionamento e testes; prompt templates/chaining, previsibilidade, alucinações, tokens e custo; semantic/prompt cache, reúso de contexto, roteamento de modelos/intenções e streaming. Comparar LangChain/Pipes e equivalentes Rust para retries/logging/debug. Em exercícios, texto/imagem/áudio/vídeo, Vision, transcrição com Whisper ou alternativa, OCR/compreensão de documentos, análise de mídia e bot multimodal combinado. Comparar cliente/servidor e Firebase AI Logic em laboratório sem deslocar regras do produto para o frontend.

**Critério de conclusão:** para o demo, Ollama rascunha apenas título/descrição fundamentados em atributos/fotos; artesão revisa e aprova, e a falha do modelo permite continuidade manual. Comparações têm dados fixos, qualidade, latência, custo/recursos e análise de erros; cada modalidade tem entrada e resultado real identificáveis. Caches preservam isolamento e invalidação, stream pode ser cancelado, retries têm limite e segredos ficam no servidor. Substituições de ferramentas registram o aprendizado realizado e o que permaneceu sem execução.

**Evidência:** prompts/schemas versionados, contrato e adaptador, conjunto de avaliação, baseline, resultados por modalidade, benchmark, testes e limitações. Uma chamada de inferência não comprova treinamento.

### Fase 9 — Busca semântica e RAG

**Estado:** planejada; laboratório primeiro, integração ao produto condicionada à seleção da capacidade.

**Aplicação e pré-requisitos:** exercício separado com políticas/documentos fictícios ou autorizados; corpus, acesso, baseline de busca textual, critério de relevância e ambiente vetorial de laboratório. PostgreSQL é a base do produto; capacidade vetorial específica depende de escolha e validação no exercício.

**Trabalho e assuntos:** embeddings, vector databases, similarity search, ingestão/chunking/indexação; RAG básico, Hybrid Search, Multi-Index e Agentic RAG; recuperação de políticas, documentação, runbooks e README/wiki; pipeline Rust com comparação de referência quando útil; falhas, observabilidade, avaliação e atualização do corpus.

**Critério de conclusão:** comparar variantes em consultas rotuladas, medir recuperação e fundamentação, manter fontes consultáveis, abster-se sem evidência, respeitar isolamento e remover conteúdo excluído; separar fonte factual de prompt injection. Execução de runbook recuperado exige ferramenta e política próprias, sem dar autoridade ao texto recuperado.

**Evidência:** corpus e procedência, parâmetros/índices, consultas, avaliações, respostas com fontes, testes de acesso/injeção e análise de erros. A evidência pode ser compartilhada com o laboratório operacional se cobrir os critérios de ambos.

### Fase 10 — MCP e integração programática

**Estado:** planejada; servidor e clientes de laboratório antes de qualquer exposição de dados do produto.

**Aplicação e pré-requisitos:** exercícios separados de catálogo, CRM, billing, suporte, analytics e legado fictícios; contratos, dados autorizados e controles de autenticação. Uma integração com o marketplace depende de escopo específico aprovado.

**Trabalho e assuntos:** protocolo, entrada/saída/contexto, cliente/servidor, recursos e ferramentas; MCP versus tools/plugins e API direta; servidor Rust, cliente TypeScript quando útil, organização e schemas; camada AI-ready; IDEs, copilots, agentes, UI/backend e composição de servidores. Estudar tokens de serviço, escopos, revogação, rate limiting, WAF e exposição segura; comparar múltiplos LLM clients e inspeção programática de contexto/interface.

**Critério de conclusão:** descobrir e chamar capacidades autorizadas com entradas/erros validados; testar dois clientes, composição, nomes conflitantes e falha parcial; bloquear token inválido, excesso e acesso indevido. Demonstrar integração de UI com contrato real; MCP não comprova controle do DOM. Sistemas ERP/Oracle reais continuam sujeitos à proteção das instruções do projeto.

**Evidência:** servidor/cliente, contratos, configuração sem segredos, testes negativos e de compatibilidade, traces e demonstração implantada em ambiente de laboratório autorizado.

### Fase 11 — Agentes e orquestração

**Estado:** planejada; exercícios com autonomia limitada.

**Aplicação e pré-requisitos:** laboratório; ferramentas e schemas, fontes, limites, avaliação e casos de tarefa. Comparações que consumam RAG ou MCP dependem apenas dos contratos correspondentes, sem obrigar todos os agentes a usar ambos.

**Trabalho e assuntos:** loop percepção–raciocínio–ação–feedback; planner/executor/memory/toolbox; tipos task-based, interactive, goal-oriented e autonomous; Reactive, Memory-Enhanced e Tool-Using; ReAct, Plan-and-Execute e Self-Reflection. Function calling, JSON schemas e ferramentas REST/banco/automação/MCP; memória curta, longa, episódica/contextual, embeddings e revisão; context pruning/stitching, contexto ativo, global/local e compartilhamento. Grafos, dependências, roteamento, fallback, retries e retomada; colaboração, coordenação, negociação, comunicação assíncrona, estado/sincronização e padrões Sequential, Parallel, Supervisor, Hierarchical, Group Chat, Handoff, Delegation e Consensus. Comparar LangGraph, CrewAI, AutoGen, ADK e outros casos/frameworks em referências isoladas, preservando adaptação Rust explícita.

**Critério de conclusão:** comparar agente único, padrões de execução e multiagentes na mesma tarefa e baseline determinístico; medir sucesso, passos, custo, latência e resiliência; demonstrar memória persistente/isolada e recuperação após falha, duplicação de mensagens e desacordo. Orçamento de tempo/passos/custo, tool allowlist, confidence thresholds calibrados, approval gates e circuit breakers interrompem loops/ações indevidas. Aprovação perde validade se ação/dados mudarem; nenhuma ferramenta financeira recebe autonomia aberta.

**Evidência:** código/grafos, schemas, cenários, mensagens e resumos operacionais observáveis, traces sanitizados, testes de falha e comparação. Não exigir nem inventar acesso ao raciocínio interno do modelo.

### Fase 12 — Laboratórios de ML no navegador

**Estado:** planejada.

**Aplicação e pré-requisitos:** exercícios SolidJS/TypeScript isolados; fundamentos, dataset autorizado, separação treino/validação/teste e recursos locais.

**Trabalho e assuntos:** história da máquina inteligente e evolução IA/ML/DL/LLMs; tensores, redes neurais e aprendizado; transformers, attention e embeddings; primeira rede treinada em TypeScript, sem trocar treino por API de inferência. Aplicar detecção/tracking/filtros em vídeo autorizado no browser e bot/assistente/efeito dinâmico em minijogo; estudar deep learning em cenários reais, explicabilidade e vieses.

**Critério de conclusão:** explicar fundamentos com exemplos; reproduzir treino com seed/configuração, curvas e avaliação reservada; vídeo comprova detecção, tracking e filtro com latência/qualidade medidas; bot baseado em modelo é comparado a um determinístico nos mesmos cenários. Explicações e resultados por grupo reconhecem limites da amostra.

**Evidência:** notas e diagramas, código, datasets/fixtures, seeds, curvas, métricas, vídeo autorizado, partidas reproduzíveis e limitações de hardware/navegador.

### Fase 13 — Dataset, fine-tuning e avaliação

**Estado:** planejada; execução depende de dados e recursos autorizados.

**Aplicação e pré-requisitos:** estudo de decisão e laboratório de treinamento; baseline de prompt/RAG, procedência e autorização dos dados, modelo compatível, orçamento e hardware/runner adequados.

**Trabalho e assuntos:** escolher entre prompt, RAG e fine-tuning; coleta, limpeza, diversidade, balanceamento/padronização, deduplicação e JSONL; CLI Rust para preparação e jobs; API comercial com upload, hiperparâmetros, monitoramento e cancelamento; LoRA/PEFT versus full fine-tuning, com runner especializado isolado quando necessário; versionamento, implantação e observabilidade. Comparar modelos de domínio em chatbot/agente e API SolidJS/Rust de laboratório.

**Critério de conclusão:** dados sem vazamento entre treino/validação/teste; treino real e checkpoints/manifestos comprovados; comparação base/ajustados com precisão, consistência, adequação, performance, custo, generalização, vieses e overfitting; avaliação qualitativa cega e quantitativa. Executar A/B de laboratório com hipótese, variantes, alocação reproduzível, métrica e incerteza; dados offline/simulados não comprovam resultado com tráfego real. Falta de hardware/crédito ou suporte é pendência, não substituição silenciosa por mock.

**Evidência:** inventário/versões de dados, testes de preparação, parâmetros, jobs/checkpoints sanitizados, métricas, avaliação A/B quando executada, contrato/demonstração e justificativa de ajuste ou adiamento.

### Fase 14 — Segurança, privacidade e governança

**Estado:** planejada e transversal; cada incremento aplica controles proporcionais antes de sua validação.

**Aplicação e pré-requisitos:** projeto, exercícios de ataques/mitigações e estudo teórico; inventário de dados/modelos/integrações e ameaças do recorte.

**Trabalho e assuntos:** responsabilidade humana, ética, riscos e limites de autonomia; interpretabilidade/explicabilidade e vieses; autorização e isolamento por loja, prompt injection, ferramentas indevidas, vazamento de segredos, retenção/exclusão, proveniência/licenças e questões legais; audit trails, políticas e controles de custo/tempo/tokens. Estudar os padrões Prompting, Responsible AI, UX, AI-Ops e Optimization nas decisões de arquitetura.

**Critério de conclusão:** cada uso de IA tem finalidade, dados, responsável, risco, mitigação e avaliação; ações sensíveis obedecem política; permissões não dependem de conteúdo externo; testes negativos comprovam bloqueios e limites. Explicações distinguem fatos observáveis de hipóteses; auditorias legais/compliance registram aplicabilidade e questões pendentes sem alegar certificação.

**Evidência:** modelo de ameaças, inventário, políticas, testes negativos, avaliação de vieses/explicações, registro de custos/limites e plano de resposta a incidentes. Revalidar regras externas quando forem utilizadas em uma implementação.

### Fase 15 — Infraestrutura, observabilidade e resiliência

**Estado:** planejada; operação local do demo e laboratório avançado são entregas diferentes.

**Aplicação e pré-requisitos:** ambiente local necessário ao projeto; cluster/ambiente descartável para práticas avançadas; necessidade concreta, dados e recursos autorizados. Não exigir Kubernetes, serverless ou autorremediação em produção para concluir a primeira demonstração.

**Trabalho do demo:** PostgreSQL/Redis disponíveis, imagens persistidas fora do banco, fila e retries recuperáveis, logs estruturados e identificadores de correlação, health/readiness e túnel HTTPS temporário; procedimento de início, parada, recuperação e tratamento de quota indisponível.

**Laboratórios e critérios por assunto:**

| Assunto                               | Trabalho e critério de conclusão                                                                                                                                              | Evidência esperada                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Fundamentos de IA para infraestrutura | Comparar LLMs/APIs, OpenAI/Anthropic/Bedrock, LangChain/CrewAI/AutoGen, prompting/RAG técnico e validação de alucinações.                                                     | Arquitetura, comparação e casos de falha.                                |
| Copilot de infraestrutura como código | NL→Terraform/Pulumi/Helm; executar validação/plan, OPA/Sentinel, revisão por PR e detecção de drift em módulo de teste.                                                       | IaC, planos, políticas, diffs e resultados antes/depois.                 |
| Kubernetes e GitOps                   | YAML, readiness, HPA/VPA, métricas de workload, Ingress/Services/NetworkPolicy; comparar canary, blue-green/progressive delivery e Argo CD/Flux; demonstrar rollout/rollback. | Manifests, métricas e implantação reproduzível.                          |
| Diagnóstico assistido                 | Usar fluxo ReAct e evidências para CrashLoopBackOff, ImagePullBackOff e OOMKilled; correlacionar logs/stack traces, Jaeger/Zipkin, latência e 5xx; validar correção.          | Cenários injetados, traces e relatório causal.                           |
| AIOps e previsão                      | Gerar/validar PromQL e LogQL, dashboard Grafana, anomalias com Prophet/Isolation Forest ou comparação justificada, correlação e forecasting; medir erro e falsos alertas.     | Séries separadas, queries, dashboard, baseline e métricas.               |
| ChatOps com aprovação                 | Laboratório Slack/Discord/Teams ou simulador identificado; comandos deploy/scale/rollback/investigar, diffs/impacto, RBAC, aprovação, circuit breakers e auditoria.           | Mensagens, políticas, testes de negação/expiração/duplicação e demo.     |
| Segurança e compliance assistidos     | Comparar Snyk/Trivy/Checkov; scan IaC/container, segredo fictício, CVEs, política OPA e correção revisável; mapear SOC2/ISO27001/PCI-DSS sem alegar certificação.             | Scans antes/depois, PR/diff, política e relatório com limites.           |
| CI/CD copilot                         | Comparar GitHub Actions/GitLab CI/Jenkins; gates de testes/SAST/DAST/dependências, impacto de PR, cache/build e rollback por qualidade.                                       | Pipelines, fixtures inválidas bloqueadas, tempos frio/quente e rollback. |
| FinOps                                | Estimar delta de PR com Infracost, rightsizing, spot/reservadas, ociosidade, custos futuros e storage/networking; separar preços datados e dados simulados de cobrança real.  | Dataset, premissas, estimativas e erro/viabilidade.                      |
| RAG de runbooks e incidentes          | Indexar playbooks/README/wiki; recuperar fontes, executar só comandos autorizados; gerar timeline, lições e post-mortem blameless sem inventar fatos.                         | Corpus, respostas, trilha e relatório de incidente.                      |
| Remediação com guardrails             | Alerta→verificação→mitigação→validação, canary/rollback, circuit breaker/rate limiting, dry-run e aprovação para ações críticas.                                              | Playbooks e simulações de ação, recuperação e interrupção.               |
| Copilot operacional integrado         | Combinar IaC, Kubernetes, observabilidade e políticas; reproduzir incidente/recuperação, apresentar resultados e analisar viabilidade/ROI com premissas.                      | Demo integrada, guia, métricas e custo/benefício estimado.               |

**Critério de conclusão:** ambiente do demo reproduzível e recuperação testada; para cada laboratório, validações e limites registrados. Comparar arquiteturas enterprise/gateway/orquestração, serviços compartilhados e distribuição Kubernetes/serverless/edge sem introduzi-los automaticamente no monólito modular.

**Evidência:** configuração local, runbook operacional, métricas/logs/traces sanitizados e artefatos específicos da tabela. Executar uma alternativa não comprova uso de todas as ferramentas comparadas.

### Fase 16 — Qualidade ponta a ponta

**Estado:** planejada e incremental.

**Aplicação e pré-requisitos:** projeto e laboratório de automação com agentes; contratos e comportamentos do recorte em validação. A validação da primeira demonstração usa apenas as jornadas incluídas; a expansão adiciona encomendas/chat/dashboard.

**Trabalho e assuntos:** contratos frontend/backend, schema e migrações, autorização, concorrência, eventos duplicados/fora de ordem, fila/retries, pagamento/estoque e falhas da IA; acessibilidade e estados de UI; testes gerados por IA com revisão; E2E por ferramentas/agentes/MCP, auditoria documental e gates CI. Provedores externos são simulados na automação; sandbox manual confirma a integração real.

**Critério de conclusão:** cenários críticos de sucesso/erro/permissão executados e evidenciados; nenhuma duplicação financeira ou venda indevida em testes de concorrência; testes observam comportamento relevante; confirmação externa não depende de retorno do navegador; limites de recursos/custo comprovados; regressões corrigidas. Build isolado não comprova jornada ou qualidade de modelo.

**Evidência:** resultados de checks/testes por revisão, contratos, roteiros E2E, capturas/traces quando úteis, testes de falha e roteiro manual sanitizado de Stripe/Connect/Ship24 com quota respeitada; lista de cenários não executados.

### Fase 17 — Implantação e demonstração integradora

**Estado:** planejada; executada por recorte, conforme os três critérios de entrega definidos no início.

**Aplicação e pré-requisitos:** demonstração do produto e apresentação técnica dos laboratórios; funcionalidades do recorte implementadas/validadas, ambiente escolhido e instruções reproduzíveis. A primeira demonstração local não depende de finalizar todos os laboratórios de IA.

**Trabalho e assuntos:** executar/implantar o recorte no ambiente autorizado, apresentar cadastro→venda→entrega e demais jornadas selecionadas; consolidar API documentada, frontend SolidJS, arquitetura e CI/CD; demonstrar separadamente CLI, RAG, agente, MCP, UI programática e modelo ajustado quando os exercícios correspondentes forem concluídos. Explicar complexidade, alternativas, resultados, custos e limites.

**Critério de conclusão:** outra pessoa segue o guia e reproduz a entrega; ambiente, dados, versões, comandos, contratos e recuperação documentados; resultados conferíveis contra baseline. Avaliar separadamente a primeira demonstração, o marketplace e a cobertura técnica; qualquer pendência permanece registrada. A implantação permanente depende de decisão de hospedagem e recursos, sem ser inferida do túnel local.

**Evidência:** README, diagramas, documentação de API, configuração/CI, roteiro e gravação, URL quando existir, relatórios e matriz de cobertura com evidências reais. Apresentação e avaliação técnica fazem parte do projeto; atividades de carreira permanecem excluídas.

## Trilha transversal — Gestão de projetos com IA

Esta trilha acompanha o desenvolvimento e também usa exercícios para técnicas que precisem de histórico/equipe ou de integrações ainda inexistentes. Não cria cronograma, estimativa, cargo ou plataforma obrigatória. Dados sintéticos são identificados; saídas da IA são revisadas antes de alterar decisões ou escrever em serviços externos.

| Assunto                                  | Aplicação e tarefa                                                                                                                        | Critério de conclusão                                                                      | Evidência esperada                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Requisitos e escopo                      | Projeto: converter pedidos em épicos, histórias, mudanças e critérios; manter limites e dependências.                                     | Cada requisito preserva a decisão de origem e deixa propostas identificadas.               | Backlog e revisão das histórias.             |
| Priorização do backlog                   | Exercício: aplicar RICE, WSJF e MoSCoW ao mesmo conjunto com apoio de IA; simular impactos.                                               | Cálculos reproduzíveis, premissas e diferenças de ranking explicadas.                      | Script/planilha e cenários.                  |
| Cronograma, capacidade e alocação        | Exercício: modelar dependências, capacidade e cenários what-if de atraso/indisponibilidade.                                               | Cronograma respeita restrições e mostra repercussões; cenário não vira prazo aprovado.     | Modelo e comparações.                        |
| Estimativas e previsões                  | Exercício: estimar esforço/custo/prazo com dados históricos ou sintéticos; simulação Monte Carlo.                                         | Distribuições, intervalos, seed e baseline; incerteza e origem dos dados explícitas.       | Dataset, simulador e relatório.              |
| Riscos e mitigação                       | Projeto/exercício: detectar riscos de escopo, prazo e recursos, gargalos/anomalias e planos de mitigação.                                 | Cada alerta separa fato/hipótese/recomendação e tem avaliação de acerto/erro.              | Registro de riscos e métricas.               |
| Reuniões, notas e follow-ups             | Exercício: transcrever conversa autorizada/fictícia; extrair decisões, pendências e ações; preparar calendário/board.                     | Não inventar responsável/prazo; revisar antes de publicar eventos/cards.                   | Transcrição, saída e diff.                   |
| Relatórios de status e síntese executiva | Projeto: produzir relatos de sprint/projeto/portfólio para públicos técnico, gestor e diretoria.                                          | Os três relatos preservam os mesmos fatos e fontes, sem progresso inventado.               | Dados de entrada e relatórios revisados.     |
| Governança, conformidade e qualidade     | Projeto: verificar rastreabilidade, versões, IDs, evidências e documentação de qualidade com Rust/TypeScript.                             | Detectar inconsistências de fixtures e não marcar evidência esperada como realizada.       | Auditoria e verificador quando implementado. |
| Automação de plataformas de gestão       | Exercício: comparar Jira/Asana/Trello/Notion/Slack e integrar uma opção autorizada; bots para cards, NL→workflow, lembretes e aprovações. | Dry-run, autorização, idempotência e revisão antes de efeitos externos; mock identificado. | Payloads, testes e demonstração.             |
| Portfólio de iniciativas e OKRs          | Exercício: relacionar iniciativas a outcomes, metas e resultados-chave; simular repriorização baseada em impacto.                         | Distinguir output de outcome e justificar ajustes com dados.                               | Mapa de objetivos e cenários.                |

## Encerramento de tarefas e atualização do roadmap

Uma tarefa só muda para concluída quando seus critérios tiverem evidência real. Registrar data, revisão do código, comandos/versões, dados e seeds quando aplicáveis, métricas, custo/recursos e limites. Um mesmo artefato pode comprovar vários assuntos se os resultados atenderem aos critérios de cada um; a conclusão não se propaga automaticamente.

Atualizar o [plano de estudo e matriz de cobertura](docs/ia-study-plan.md) quando houver evidência técnica e o [registro de decisões](docs/decisions.md) quando o comportamento aprovado mudar. Manter os títulos e descrições das fases legíveis por assunto. Novos detalhes de implementação entram em tarefas próprias com dependências, sucesso, falhas e autorização descritos.

Na próxima entrega, conferir a base operacional e construir/avaliar o protótipo da primeira demonstração. A publicação assistida, a compra de teste e a entrega continuam seguindo a ordem aprovada dos marcos.
