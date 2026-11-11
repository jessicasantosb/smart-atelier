# Fases para a construção completa do Smart Atelier

Este roadmap descreve as fases de evolução do Smart Atelier, da definição do escopo à implantação e demonstração. Decisões ainda propostas em [docs/decisions.md](docs/decisions.md) precisam ser confirmadas antes de virarem funcionalidades. Atividades de carreira ficam fora do plano.

## Como usar

- Divida cada fase em tarefas com objetivo, dependências, critérios de aceite, validação e evidência reproduzível.
- Fases de ML, agentes, gestão e DevOps podem ocorrer em laboratórios separados. Um exercício não se torna requisito do marketplace automaticamente.
- A ordem é indicativa. Use as dependências e decisões registradas para priorizar.
- Marque uma fase como concluída somente após registrar resultados e evidências correspondentes.

## Visão geral

| Fase | Resultado esperado | Dependências |
| --- | --- | --- |
| 0. Escopo e arquitetura | Recorte de produto, roadmap priorizado e arquitetura inicial aprovados. | T01, T02 e T08. |
| 1. Base técnica | Ambiente Svelte/Rust, integração contínua e padrões de qualidade prontos. | Fase 0. |
| 2. UX e protótipos | Jornadas e interface acessível validadas. | Fase 0. |
| 3. Contas e lojas | Usuários autenticados e papéis/permissões definidos. | Fases 1–2; T03. |
| 4. Catálogo e descoberta | Artesãos cadastram trabalhos e compradores os encontram. | Fase 3; T03. |
| 5. Encomendas e pedidos | Orçamentos, chat e acompanhamento funcionam. | Fases 3–4; T04. |
| 6. Pagamento e entrega | Cobrança e repasse seguem regras definidas e integração validada. | Fase 5; T05. |
| 7. Dashboard e suporte | Vendedor acompanha indicadores e operação atende usuários. | Fases 5–6; T06. |
| 8. IA generativa e multimodal | Capacidades selecionadas são testadas e, se aprovadas, integradas. | T07; controles de segurança. |
| 9. Busca semântica e RAG | Busca ou assistência recupera informação com fontes verificáveis. | Corpus autorizado e baseline. |
| 10. MCP | Ferramentas autorizadas podem ser descobertas e chamadas por clientes. | Contratos estáveis e segurança. |
| 11. Agentes | Agente de escopo limitado executa fluxo com aprovação e auditoria. | Fases 8–10. |
| 12. Laboratórios de ML | Treino/inferência no browser, vídeo e jogo avaliados. | Exercícios isolados. |
| 13. Fine-tuning | Dataset autorizado e modelos ajustados avaliados. | Dados, baseline, orçamento aprovado. |
| 14. Segurança e governança | Riscos, privacidade, limites e auditoria tratados. | Transversal; iniciar desde a fase 0. |
| 15. Infraestrutura e operação | Build, deploy, observabilidade, resiliência e custos mensuráveis. | Arquitetura e ambiente de teste definidos. |
| 16. Qualidade ponta a ponta | Jornadas, contratos, falhas e permissões validados. | Fases funcionais selecionadas. |
| 17. Implantação e demonstração | Aplicação demonstrável, documentação técnica e resultados reproduzíveis. | Fases anteriores e T08. |

## Fases detalhadas

### Fase 0 — Escopo, arquitetura e plano de entrega

Decidir se o marketplace será o projeto integrador ou se haverá estudos modulares; definir público, proposta de valor, primeira versão, marcos, backlog, stack, riscos e critérios. Usar IA para apoiar requisitos, decomposição e priorização, com revisão humana.

**Tópicos relacionados:** definição de escopo e proposta de valor; requisitos, histórias e critérios de aceite; decomposição, priorização, cronograma e capacidade; escolha entre IA e regras determinísticas; arquitetura modular e plano do projeto integrador.

**Saída:** escopo aprovado, decisões registradas, dependências e arquitetura inicial documentadas.

### Fase 1 — Base técnica e fluxo de desenvolvimento

Manter o monorepo com Svelte 5, TypeScript, Vite e Rust. Definir contratos, módulos por funcionalidade, ambientes, CI e padrões de documentação. Usar ferramentas de desenvolvimento assistidas somente com revisão de mudanças e verificações.

**Tópicos relacionados:** engenharia de prompts para desenvolvimento; ferramentas de programação assistida; agentes de código; scaffolding e refatoração; automação de qualidade e pipelines de integração contínua.

**Saída:** builds repetíveis, verificações automatizadas e instruções de desenvolvimento.

### Fase 2 — UX, protótipos e acessibilidade

Pesquisar jornadas de comprador e vendedor, criar wireframes e protótipos, avaliar usabilidade e implementar interface responsiva em Svelte. Planejar acessibilidade, navegação e estados de carregamento, erro e ausência de dados.

**Tópicos relacionados:** pesquisa e ideação assistidas; geração de wireframes por texto; prototipação visual; conversão de design em interface; avaliação de usabilidade e acessibilidade.

**Saída:** jornadas priorizadas, protótipos avaliados e componentes iniciais validados.

### Fase 3 — Contas, autenticação e lojas

Definir cadastro, sessão, papéis, criação de loja, permissões e isolamento dos dados. Validar autorização no backend Rust para cada operação, sem depender de controles da interface.

**Tópicos relacionados:** autenticação para ferramentas e MCP; tokens de serviço e controle de acesso; governança, responsabilidade, riscos, privacidade e segurança dos dados.

**Saída:** fluxos de conta e loja testados, inclusive tentativas de acesso indevido.

### Fase 4 — Catálogo e descoberta

Implementar cadastro de trabalhos, imagens, visibilidade e disponibilidade conforme as decisões aprovadas. Criar busca e filtros. Avaliar busca semântica em laboratório antes de selecioná-la para o produto.

**Tópicos relacionados:** embeddings e busca por similaridade; busca híbrida e múltiplos índices; personalização e busca semântica na interface.

**Saída:** artesão gerencia trabalhos e comprador encontra itens com atributos confirmados.

### Fase 5 — Encomendas, chat e pedidos

Definir estados e histórico; construir solicitação e negociação de orçamento, chat humano e acompanhamento do pedido. Preservar os termos aceitos e validar autorização em cada transição.

**Tópicos relacionados:** integração de IA pelo backend; chat de suporte; resumo de conversas e extração de ações; integração de interface com APIs.

**Saída:** jornada de encomenda e pedido coberta por testes de sucesso, alteração, erro e permissão.

### Fase 6 — Pagamento, entrega e repasse

Escolher provedor após análise. Implementar cobrança integral após aceite e antes da produção, confirmação autenticada, entrega, disputas e repasse posterior. Tratar eventos duplicados, fora de ordem e falhas sem repetir efeitos financeiros.

**Tópicos relacionados:** APIs autenticadas no servidor; permissões e segurança MCP; comandos com aprovação humana, auditoria e proteção de dados.

**Saída:** contratos e transições validados em ambiente de teste, respeitando as decisões financeiras.

### Fase 7 — Dashboard, suporte e operação

Definir indicadores, fontes e permissões; construir acompanhamento de vendas e ferramentas de suporte. Avaliar respostas assistidas por IA com referências e revisão humana, se aprovadas.

**Tópicos relacionados:** assistente e personalização de suporte; RAG sobre documentação; relatórios de status; métricas de resultados e objetivos.

**Saída:** indicadores definidos e demonstráveis, com origem dos dados explicada.

### Fase 8 — IA generativa e multimodal

Avaliar rascunhos de anúncios e assistência a encomendas com texto, imagem, áudio, vídeo ou OCR. Manter credenciais no servidor. Pedir confirmação para atributos incertos e medir qualidade, custo e latência.

**Tópicos relacionados:** provedores de modelos e engenharia de prompts; encadeamento, custo e cache; análise de texto, imagem, áudio e vídeo; OCR; bots multimodais; roteamento entre modelos e streaming.

**Saída:** comparações reproduzíveis; somente capacidades aprovadas passam ao produto.

### Fase 9 — Busca semântica e RAG

Criar laboratório de embeddings, armazenamento vetorial e recuperação. Se escolhido, conectar políticas e documentos autorizados à busca ou ao suporte; citar fontes e abster-se quando não houver evidência.

**Tópicos relacionados:** embeddings, banco vetorial e busca por similaridade; RAG básico, híbrido, multi índice e agentic; recuperação de documentação e runbooks; agente com fontes consultáveis.

**Saída:** corpus autorizado, avaliação contra baseline, respostas fundamentadas e controle de acesso.

### Fase 10 — MCP e integração programática

Expor ferramentas autorizadas do catálogo e dos pedidos por servidor MCP em Rust. Testar schemas, clientes, composição, autenticação, quotas e ligação à interface. Regras de negócio e autorização permanecem no backend.

**Tópicos relacionados:** conceitos e arquitetura MCP; MCP versus tools; servidores, clientes e composição; integração com APIs e interface; autenticação, tokens, rate limiting e segurança; testes com clientes diferentes.

**Saída:** chamadas documentadas, testes de contrato e demonstração com cliente compatível.

### Fase 11 — Agentes e orquestração

Começar com agente de escopo limitado, ferramentas validadas, orçamento de execução, auditoria e aprovação humana. Comparar ReAct, planejamento, reflexão, memória e padrões multiagente com fluxos determinísticos.

**Tópicos relacionados:** ciclos de agente, planejamento, execução, ferramentas e memória; ReAct, Plan-and-Execute e reflexão; function calling e schemas; gestão de contexto; grafos, retries e fallback; agentes únicos e multiagentes; roteamento, limites de autonomia, aprovação e auditoria.

**Saída:** avaliações contra baseline, limites de autonomia testados e histórico auditável.

### Fase 12 — Laboratórios de ML no navegador

Em exercícios independentes, treinar uma pequena rede em TypeScript, separar dados de treino/validação/teste e avaliar inferência. Criar também demonstrações de visão em vídeo e de bot para jogo.

**Tópicos relacionados:** história e fundamentos de IA, ML e DL; tensores, redes neurais e transformers; treino, validação e inferência em JavaScript; machine learning em vídeo e jogos; explicabilidade e avaliação de vieses.

**Saída:** código, dados autorizados, resultados reproduzíveis e limitações documentadas.

### Fase 13 — Dataset, fine-tuning e avaliação

Após definir dados autorizados e baseline, preparar conjuntos JSONL, avaliar a necessidade de ajuste, executar fine-tuning compatível e estudar LoRA/PEFT em ambiente isolado. Medir generalização, vieses e custos.

**Tópicos relacionados:** decisão entre prompt, RAG e fine-tuning; preparação, balanceamento e versionamento de dados; ajuste via API; LoRA e PEFT; avaliação, testes A/B, overfitting e análise de vieses.

**Saída:** pipeline e comparação reproduzíveis; treinamento real distinguido de mocks e chamadas de inferência.

### Fase 14 — Segurança, privacidade e governança

Tratar modelagem de ameaças, isolamento entre lojas, prompt injection, segredos, retenção, revisão humana, auditoria, limites de custo e riscos aplicáveis desde o desenho até a operação.

**Tópicos relacionados:** governança e responsabilidade; interpretabilidade; vieses; gerenciamento de riscos; segurança e privacidade de dados; aspectos legais; revisão humana e custos financeiros.

**Saída:** controles testados, responsáveis definidos e riscos/limitações registrados.

### Fase 15 — Infraestrutura, observabilidade e resiliência

Em ambiente de teste, estudar IaC, pipelines, containers, Kubernetes/GitOps, métricas, logs, traces, diagnóstico, FinOps e remediação com dry-run e aprovação. Dimensionar a infraestrutura a partir de necessidades verificadas.

**Tópicos relacionados:** observabilidade e retries para IA; infraestrutura como código; políticas e detecção de drift; Kubernetes, autoscaling, GitOps e estratégias de deploy; troubleshooting; métricas, logs, traces, alertas e anomalias; ChatOps; scanners e segurança de containers; CI/CD; FinOps; RAG de runbooks e autorremediação com dry-run e aprovação.

**Saída:** implantação reproduzível, alertas avaliados e procedimento de recuperação demonstrado.

### Fase 16 — Qualidade ponta a ponta

Validar regras, contratos, permissões, eventos duplicados/fora de ordem, jornadas de compra e encomenda, falhas de IA e acessibilidade. Usar automação E2E com resultados revisáveis.

**Tópicos relacionados:** geração e revisão de testes; contratos backend/frontend; automação E2E com agentes e MCP; pipelines e gates de qualidade; auditoria documental; segurança, autorização e testes de falha.

**Saída:** evidências dos cenários críticos e lista explícita de limitações restantes.

### Fase 17 — Implantação e demonstração integradora

Implantar a versão demonstrável no ambiente escolhido. Apresentar as jornadas e capacidades selecionadas, documentar arquitetura, configuração, métricas, custos, limitações e instruções para reproduzir a demonstração.

**Tópicos relacionados:** planejamento e arquitetura do projeto integrador; RAG e agentes; API backend documentada; MCP ligado à interface; CI/CD e implantação; demonstração, documentação, avaliação de resultados e justificativa das escolhas técnicas.

**Saída:** aplicação implantada, demonstração técnica e documentação reproduzível.

## Cobertura dos tópicos

Os títulos e descrições abaixo explicam os assuntos e resultados de cada fase.

| Fase | Tópicos descritivos cobertos |
| --- | --- |
| 0 — Escopo e arquitetura | História e fundamentos de IA; engenharia de prompts para desenvolvimento; ferramentas de programação assistida; levantamento e decomposição de requisitos; histórias e critérios de aceite; priorização de backlog; cronograma, capacidade e estimativas; decisão entre IA e lógica determinística; arquitetura modular e proposta de valor. |
| 1 — Base técnica | Regras para ferramentas de IA no desenvolvimento; agentes que geram código; scaffolding e refatoração assistidos; testes automatizados; integração contínua e qualidade de código. |
| 2 — UX | Pesquisa e ideação com IA; geração de wireframes e interfaces por texto; prototipação visual; conversão de designs em Svelte; validação de usabilidade e acessibilidade. |
| 3 — Contas e lojas | Autenticação e autorização; tokens de serviço; controle de acesso; governança, privacidade e segurança de dados. |
| 4 — Catálogo | Dados e atributos de trabalhos; embeddings; busca por similaridade e busca semântica; recuperação híbrida; personalização da experiência. |
| 5 — Encomendas | APIs backend para IA; chat de suporte; resumo de conversas; extração de decisões e ações; integração entre interface e backend. |
| 6 — Pagamentos | Integrações seguras no servidor; permissões de ferramentas; comandos com aprovação; auditoria e proteção contra ações indevidas. |
| 7 — Dashboard | Indicadores e objetivos; relatórios de status; síntese de informações para diferentes públicos; assistência de suporte baseada em documentação. |
| 8 — IA generativa | Provedores e modelos; templates e encadeamento de prompts; controle de alucinações; custo, tokens e cache; entradas multimodais; OCR; processamento de imagem, áudio e vídeo; roteamento de modelos e streaming. |
| 9 — RAG | Embeddings e armazenamento vetorial; RAG básico, híbrido, multi índice e agentic; busca em políticas, documentação e runbooks; respostas com fontes e abstenção quando necessário. |
| 10 — MCP | Conceitos e arquitetura MCP; comparação com ferramentas tradicionais; criação e consumo de servidores; schemas; composição entre servidores e clientes; integração com APIs e UI; tokens, quotas e segurança. |
| 11 — Agentes | Ciclo de percepção, decisão, ação e feedback; planejamento e execução; ReAct e reflexão; function calling; schemas JSON; memória e contexto; grafos, fallback e retries; colaboração multiagente; roteamento, limites e aprovação humana. |
| 12 — ML no navegador | História de IA, ML e deep learning; tensores, redes neurais, transformers e attention; ciclo de treino/validação/inferência; classificação no browser; análise de vídeo e tracking; bots para jogos; avaliação de vieses e explicabilidade. |
| 13 — Fine-tuning | Preparação e balanceamento de dados; formato JSONL; critérios para ajustar modelos; treinamento via API; LoRA e PEFT; avaliação quantitativa e qualitativa; testes A/B; generalização e overfitting. |
| 14 — Segurança e governança | Gestão de riscos e responsabilidades; interpretabilidade; vieses; ética; segurança e privacidade; questões legais; governança de modelos; revisão humana e custos de IA. |
| 15 — Infraestrutura | IaC e políticas como código; detecção de drift; Kubernetes, autoscaling e GitOps; estratégias de deploy e rollback; logs, métricas e traces; diagnóstico de incidentes; ChatOps; scanners de segurança; CI/CD; FinOps; RAG de runbooks; remediação segura. |
| 16 — Qualidade ponta a ponta | Geração e validação de testes; contratos entre frontend e backend; automação E2E via ferramentas; auditoria de mudanças; gates de CI; segurança, permissões e testes de falha. |
| 17 — Demonstração final | Ideação e arquitetura; RAG e agente; API documentada; MCP integrado; interface Svelte; implantação e CI/CD; resultados, documentação técnica e apresentação reproduzível. |

Alguns assuntos aparecem em fases diferentes porque primeiro são estudados, depois praticados e, quando fizer sentido, integrados ao produto. As fases representam trabalho planejado; registre resultados e evidências ao concluí-las.

