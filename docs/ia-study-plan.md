# Matriz de cobertura — Engenharia de Software em IA Aplicada

Atualização: 10/11/2026.

## Escopo e leitura

Roadmap técnico organizado em 11 áreas de aprendizado e experimentação. A demonstração, documentação e avaliação técnica do projeto integrador fazem parte das entregas. Atividades de carreira não fazem parte do escopo.

Cada linha agrupa tópicos relacionados, explicitados na coluna Tópicos. IDs MC são estáveis e independentes dos IDs D e T de [docs/decisions.md](docs/decisions.md). Uma evidência pode atender várias linhas se comprovar os critérios de cada uma.

- **Projeto:** aplicação no marketplace ou no processo interno de desenvolvimento/operação. Capacidades indicadas como candidatas dependem do recorte da entrega antes da implementação.
- **Exercício:** laboratório separado; não vira funcionalidade obrigatória do marketplace.
- **Teoria:** estudo, comparação ou decisão documentada; não comprova implementação prática.
- **Estado inicial de todas as linhas: planejado; evidência ainda não produzida.** A coluna Evidência descreve o entregável esperado, não um resultado existente.

O pedido autoriza a documentação da cobertura e da adaptação de stack. Não autoriza custos, provisionamento, envio de dados privados a provedores, alterações ERP/Oracle ou implementação imediata de todo o plano. Ainda não há cronograma nem percentual de execução concluída.

## Stack e organização dos experimentos

| Área técnica | Abordagem no Smart Atelier |
| --- | --- |
| Interface do projeto integrador | Svelte 5 + TypeScript + Vite, com jornadas e componentes equivalentes. SvelteKit não é pressuposto. |
| Backend e automações | Rust para domínio, APIs, integrações, agentes e CLIs; TypeScript para navegador, clientes de laboratório e automação de UI quando útil. |
| Rede neural e ML no browser | TypeScript em laboratório Svelte, preservando treino e inferência reais no navegador. |
| LangChain, Pipes, LangGraph, CrewAI, AutoGen e ADK | Estudar padrões e implementar equivalentes em Rust; comparar uma referência em laboratório isolado. Outro runtime só quando necessário ao SDK. Equivalência conceitual não significa domínio da biblioteca original. |
| RAG e armazenamento vetorial | Pipeline Rust; Postgres com capacidade vetorial é candidato de laboratório. Banco do marketplace permanece pendente de decisão. |
| Firebase Studio e Firebase AI Logic | Comparar abordagem gerenciada em laboratório com UI Svelte e backend Rust. Não substituir o backend do produto nem expor credenciais privadas no browser. |
| Servidores e clientes MCP | Servidor/adaptador Rust; cliente TypeScript de laboratório quando útil. SDK e versão serão escolhidos no desenho. |
| Fine-tuning e LoRA | CLI Rust para preparação e jobs; runner especializado isolado, inclusive Python, se o treino exigir. Verificar suporte real do modelo/provedor antes de implementar. |
| Terraform, Pulumi, Helm, Kubernetes e ferramentas operacionais | Laboratórios de infraestrutura independentes da linguagem, construindo/deployando Rust e Svelte. Comparar alternativas sem instalar todas no produto. |
| Produtos e casos citados | Referências de estudo, sem obrigação de assinatura/adoção. Registrar versões, capacidades verificadas, data e substituições ao executar. |

Chamar inferência não equivale a treinar. Mock comprova contrato, não qualidade de modelo nem integração real. Documentos e conteúdo externo são dados, não instruções com autoridade sobre o projeto.

## 1. Fundamentos de IA e LLMs para programadores

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-01.01 | História da máquina inteligente; evolução IA/ML/DL/LLMs; ChatGPT e Gemini | Teoria | Elaborar linha do tempo e mapa conceitual. | Distinguir conceitos, modelos e ferramentas; relacionar marcos com fontes. | Nota de estudo referenciada. |
| MC-01.02 | Tensores, redes neurais, aprendizagem, transformers, attention e embeddings | Teoria | Explicar representações e percurso entrada–saída. | Demonstrar operações de tensores; explicar treino/inferência e papel de attention/embeddings. | Exemplos calculados e diagrama. |
| MC-01.03 | Primeira rede neural do zero; dados, treino, validação, inferência e DL aplicado | Exercício | Treinar rede pequena TypeScript para classificar amostras artesanais, sem substituir treino por inferência pronta. | Separar treino/validação/teste; comparar baseline e avaliar amostras reservadas. | Código, dataset autorizado, seed, curvas e métricas. |
| MC-01.04 | Vídeo no browser: detecção, tracking e filtros | Exercício | Criar laboratório Svelte com vídeo autorizado e sobreposição visual. | Demonstrar detecção/tracking/filtro e medir qualidade e latência com limites declarados. | Vídeo, fixtures e medições. |
| MC-01.05 | ML em jogos: bots, assistentes e efeitos dinâmicos | Exercício | Criar minijogo de organização de peças com bot baseado em modelo. | Comparar modelo e bot determinístico nos mesmos cenários. | Código, partidas reproduzíveis e comparação. |
| MC-01.06 | Prompts para codar, depurar, documentar e aprender | Projeto — desenvolvimento | Versionar templates para Rust/Svelte com restrições e revisão. | Aplicar às quatro finalidades e validar as saídas. | Prompts, diffs revisados e verificações. |
| MC-01.07 | Cursor, VS Code, Windsurf, rules, vibe coding e caso levelsio | Teoria | Comparar ferramentas e traduzir princípios para AGENTS.md; analisar criticamente o caso. | Explicar limites, revisão e rastreabilidade; atribuir alegações comerciais à fonte. | Comparativo e exemplo de regra aplicada. |
| MC-01.08 | MCP para testes, documentação atualizada, navegação/extração; n8n MCP | Exercício | Orquestrar ferramentas em páginas/fixtures autorizadas e revisar testes gerados. | Demonstrar as três operações e falhas; comparar n8n ou equivalente. | Fluxo/código, logs e testes revisados. |
| MC-01.09 | RAG, embeddings, vector databases, similarity search; projeto com Postgres | Exercício | Criar RAG Rust sobre políticas fictícias com armazenamento vetorial de laboratório. | Comparar busca textual/semântica; responder com fontes e abster-se sem base. | Corpus, índice, consultas e avaliação. |
| MC-01.10 | Modelos abertos/fechados, OpenRouter e Ollama | Exercício | Comparar modelo local/remoto e roteador multmodelo na mesma tarefa. | Registrar licença, privacidade, custo, latência e qualidade; executar local/remoto com recursos autorizados. | Configurações sem segredos e benchmark versionado. |
| MC-01.11 | Agentes em etapas e agentes que escrevem código | Exercício | Executar edição assistida em cópia de teste com plano, ações e feedback. | Produzir diff revisável; limitar ferramentas, comandos e iterações. | Trilhas de ações, diff e validação. |

## 2. APIs generativas e prompt engineering

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-02.01 | IA como serviço, wrappers, oportunidades; OpenAI, Anthropic, Hugging Face e Gemini | Teoria | Comparar integrações e proposta de valor para artesãos. | Distinguir valor de produto de revenda de API e comparar contratos/capacidades. | Quadro de alternativas com data. |
| MC-02.02 | Prompt chaining, templates, precisão, alucinações e previsibilidade | Projeto — candidata | Preparar rascunho de anúncio em fluxo Rust com schema e revisão. | Comparar prompt simples/encadeado; não inventar material, medidas ou preço. | Prompts, schema, dataset e análise de erros. |
| MC-02.03 | Custo, tokens, cache e reúso de contexto | Exercício | Medir redução de contexto e cache. | Comparar qualidade/custo antes e depois; testar isolamento e invalidação. | Benchmark e testes entre lojas. |
| MC-02.04 | RAG avançado; LangChain/Pipes; erros, retries, logging e depuração | Exercício | Criar pipeline equivalente Rust e comparar referência isolada. | Recuperar falhas transitórias com limites; distinguir falhas permanentes e observar etapas. | Diagrama, traces e testes de falha. |
| MC-02.05 | LLM no backend, requisições, autenticação, versionamento e testes | Projeto — candidata | Definir adaptador de provedor e endpoint Rust por loja. | Contrato documentado; segredo no servidor; cobrir sucesso, timeout, quota e negação. | Contrato, testes e demo Svelte–Rust. |
| MC-02.06 | Texto/imagem/áudio/vídeo; Vision, Whisper e Gemini multimodal | Exercício | Comparar capacidades com mídia autorizada de peças. | Identificar suporte real e limitações por modalidade/provedor. | Amostras, respostas e comparativo. |
| MC-02.07 | OCR inteligente e compreensão de documentos | Exercício | Extrair atributos de ficha fictícia de encomenda via Rust. | Avaliar campos corretos/ausentes/ambíguos; não preencher fatos incertos. | Dataset rotulado e métricas por campo. |
| MC-02.08 | Análise de mídia e bot multimodal conjunto | Exercício | Combinar texto, imagem, áudio e vídeo em rascunho de solicitação. | Demonstrar todas as modalidades, proveniência e contradições sem publicação automática. | Fixtures, sessão reproduzível e revisão. |

## 3. Model Context Protocol

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-03.01 | Protocolo, contexto, entrada/saída; MCP versus tools/plugins e integração customizada | Teoria | Mapear cliente, servidor e ferramentas sobre APIs Rust. | Explicar escolha MCP/chamada direta sem atribuir regras de negócio ao protocolo. | Nota e mensagens de exemplo. |
| MC-03.02 | Criar/consumir MCP; organização JS/TS adaptada a Rust | Exercício | Criar servidor Rust e cliente de catálogo fictício. | Validar schemas/erros; descobrir e executar operações autorizadas. | Código e testes de contrato. |
| MC-03.03 | Camada AI-ready; CRM/billing/suporte/produto; legado/ERP e casos corporativos | Exercício | Expor adaptadores de sistemas fictícios, sem alterar ERP/Oracle real. | Demonstrar capacidades distintas e autorização no backend; mapear casos corporativos. | Diagrama, fixtures e testes. |
| MC-03.04 | Autenticação, service tokens, rate limiting e WAF | Exercício | Proteger servidor de laboratório com escopos, revogação, quotas e gateway/WAF. | Bloquear token inválido, acesso entre lojas e excesso; registrar eventos sem segredos. | Configuração e testes negativos. |
| MC-03.05 | Agentes, plugins, IDEs, copilots, UI e backend | Projeto — candidata | Conectar IDE/agente às capacidades Rust e resultados Svelte. | Demonstrar jornada autorizada sem autoridade financeira automática. | Demo, contrato e trilha de ações. |
| MC-03.06 | Servidor implantado; múltiplos clientes e composição de MCPs | Exercício | Implantar laboratório, testar dois clientes e segundo servidor. | Demonstrar chamadas, composição, nomes conflitantes e falha parcial. | Guia, compatibilidade e logs. |

## 4. Agentes autônomos

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-04.01 | percepção–raciocínio–ação–feedback; planner/executor/memory/toolbox; task-based/interactive/goal-oriented/autonomous | Teoria | Modelar tipos e responsabilidades no domínio. | Explicar ferramentas, contexto, feedback e término de cada tipo. | Diagramas e exemplos. |
| MC-04.02 | ReAct, Plan-and-Execute, Reflection; LangChain/LangGraph | Exercício | Comparar padrões Rust na mesma solicitação e referência isolada. | Medir sucesso, passos, custo e recuperação; reflexão não altera regras sem revisão. | Código, benchmark e ações/resumos operacionais; não exigir raciocínio interno do modelo. |
| MC-04.03 | function calling/tool use, JSON schemas, REST, banco, automação e MCP | Exercício | Criar agente que executa e ajusta tarefas com ferramentas de teste. | Validar argumentos, permissão e resultado; rejeitar ferramenta fora do escopo. | Schemas, testes e trilhas. |
| MC-04.04 | memória curta/longa/episódica/contextual; embeddings, reflexão e debugging/aprendizado incremental | Exercício | Implementar memória por loja e revisão de resultados. | Comparar com/sem memória; testar expiração, exclusão e isolamento; demonstrar suporte/depuração. | Testes e avaliação de recuperação. |
| MC-04.05 | contexto ativo, pruning/stitching, memória global/local e compartilhamento | Exercício | Montar contexto com orçamento e proveniência. | Medir tokens e informação perdida; preservar separação de conteúdo privado. | Snapshots sanitizados e comparação. |
| MC-04.06 | LangGraph, grafos/dependências, roteamento, fallback/retry, monitoramento/depuração | Exercício | Construir grafo Rust e comparar semântica com referência. | Demonstrar retomada, falha parcial e tentativas limitadas. | Grafo, traces e testes. |
| MC-04.07 | métricas/logs, auditoria, guardrails/HITL, ética, runaway loops e abuso | Projeto — candidata | Definir orçamento, aprovação e encerramento do assistente. | Interromper por custo/tempo/passos; ação sensível aguarda aprovação. | Política, testes e auditoria. |
| MC-04.08 | agente completo, planejamento adaptativo, APIs, feedback, contexto/memória persistente | Exercício | Integrar agente de encomenda sem efetivar pedido/pagamento. | Retomar após falha e avaliar eficácia, autonomia limitada e resiliência. | Demo, dataset e baseline. |
| MC-04.09 | coordenação/negociação; Supervisor, Hierarchical, Group Chat, Delegation, Consensus; comunicação assíncrona | Exercício | Comparar padrões em analista–planejador–executor. | Demonstrar cada padrão, desacordo e falha; comparar com agente único. | Mensagens, configurações e métricas. |
| MC-04.10 | Casos Claude Team, AutoGPTs, CrewAI e Agentarium | Teoria | Mapear casos e padrões para laboratório Rust. | Registrar capacidades verificadas sem alegar execução de ferramenta não usada. | Comparativo com fontes/versões/data. |

## 5. IA para UX/UI

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-05.01 | AI-driven UX/UI, pesquisa/ideação/prototipação/desenvolvimento/teste e casos | Projeto — desenvolvimento | Documentar IA nas etapas de uma jornada artesanal. | Relacionar hipóteses e validação; distinguir opinião do modelo de observação de usuário. | Pesquisa e decisões revisadas. |
| MC-05.02 | text-to-UI, wireframes/mockups, Figma/Firebase Studio e usabilidade | Exercício | Converter referência visual em Svelte e comparar geração assistida/gerenciada. | Avaliar fidelidade, responsividade, teclado e fluxo; registrar substituições de ferramentas. | Design, código, imagens e avaliação. |
| MC-05.03 | agentes, Gemini CLI, scaffolding/componentes/refatoração, prompts HTML/CSS/TS | Exercício | Gerar/refatorar componente em cópia de laboratório com CLI assistida. | Passar tipos/build e interação; registrar ferramenta e revisão do diff. | Prompt, diff e verificações. |
| MC-05.04 | agentes E2E via MCP; mcpui.dev ou equivalente | Exercício | Inspecionar contexto e executar jornada real Svelte com agente. | Distinguir ferramenta backend de interação UI; comprovar estado visual e resultado. | Teste E2E, captura e trace MCP. |
| MC-05.05 | IA cliente/servidor, APIs no frontend, Firebase AI Logic e segurança | Exercício | Comparar gerenciado e navegador→Rust→provedor em PoC isolada. | Demonstrar processamento/controles; nenhuma chave privada no bundle; justificar divisão. | Diagrama, inspeção do bundle e testes. |
| MC-05.06 | Busca semântica, chatbot de suporte e personalização em tempo real | Projeto — candidatas | Definir experiência Svelte/API Rust para cada capacidade. | Avaliar relevância, fontes e controle de personalização; tratar estados e traduções PT/EN. | Aceite, demo e avaliações por capacidade. |

## 6. IA para DevOps

Laboratórios em ambiente descartável/local ou de testes autorizado. Não exigem Kubernetes ou autorremediação na operação do marketplace. Alternativas citadas serão comparadas; executar uma alternativa não comprova uso de todas.

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-06.01 | LLMs; OpenAI/Anthropic/Bedrock; LangChain/CrewAI/AutoGen; RAG técnico, prompts, alucinações/validação | Teoria | Comparar arquiteturas e ferramentas para copilot Rust. | Definir fontes, tarefa e limites; relacionar falhas às escolhas. | Estudo e casos de falha. |
| MC-06.02 | NL→IaC, Terraform/Pulumi/Helm, validate/plan, OPA/Sentinel, PR-first, drift | Exercício | Gerar módulo IaC, validar e propor diff revisável. | Executar validate/plan, negar caso indevido por política e detectar drift; comparar alternativas. | Módulo, plano, política, prompt e diff. |
| MC-06.03 | YAML, HPA/VPA, métricas/workload, Ingress/Services/NetworkPolicy, canary/blue-green/progressive, Argo CD/Flux | Exercício | Implantar Rust/Svelte em cluster de teste com agente. | Demonstrar readiness, rede, scaling por métricas, rollout/rollback e GitOps; comparar estratégias/ferramentas. | Manifests, métricas e execução reproduzível. |
| MC-06.04 | ReAct, CrashLoopBackOff/ImagePullBackOff/OOMKilled, logs/stack traces, Jaeger/Zipkin, latência/5xx, fixes | Exercício | Injetar falhas e gerar diagnóstico/correção revisável. | Identificar as três falhas; correlacionar logs/métricas/traces e validar recuperação. | Fixtures, traces e relatório causal. |
| MC-06.05 | PromQL/LogQL, Grafana, Prophet/Isolation Forest, correlação, alertas/falsos positivos, forecasting | Exercício | Gerar queries/dashboard e comparar detecção/previsão com baseline. | Validar queries; medir falsos positivos/negativos e erro em dados separados; distinguir histórico/previsão. | Dashboard, séries, scripts e métricas. |
| MC-06.06 | Slack/Discord/Teams, deploy/scale/rollback/investigar, diffs, guardrails/circuit breakers, RBAC/auditoria | Exercício | Criar ChatOps em canal de teste ou simulador identificado. | Aprovação vinculada à ação/impacto; testar negação, expiração e duplicação; mock não comprova chat real. | Eventos, testes e demo. |
| MC-06.07 | Snyk/Trivy/Checkov, AI fix, secrets, OPA, CVEs, SOC2/ISO27001/PCI-DSS | Exercício | Escanear IaC/containers e preparar correção por PR. | Detectar fixtures/secret falso, explicar política e validar correção; relatório não equivale a certificação. | Scans antes/depois e diff. |
| MC-06.08 | GitHub Actions/GitLab CI/Jenkins; testes/SAST/DAST/dependências; impacto PR; deploy/cache/rollback | Exercício | Gerar pipeline Rust/Svelte e comparar plataformas. | Gates bloqueiam fixture inválida; medir build frio/quente e rollback orientado por qualidade. | Pipeline, execuções e tempos. |
| MC-06.09 | Infracost, rightsizing, spot/reservadas, recursos ociosos, forecasting, storage/network | Exercício | Analisar custos com preços datados ou dados simulados identificados. | Estimar delta de PR e cada oportunidade; medir erro e restrições de disponibilidade. | Dataset, estimativas e recomendações. |
| MC-06.10 | RAG de runbooks/README/wiki, execução, timelines, lições e post-mortem blameless | Exercício | Indexar documentação fictícia e gerar relatório de incidente. | Citar fontes; execução com allowlist/aprovação; não inventar eventos nem confundir hipótese e fato. | Corpus, consultas, trilha e post-mortem. |
| MC-06.11 | alerta→verificação→mitigação→validação, canary/rollback, circuit breaker/rate limit, dry-run/HITL | Exercício | Automatizar remediação limitada em cluster descartável. | Demonstrar dry-run, ação autorizada, validação e interrupção por limite; humano em ação crítica. | Playbook, falhas e aprovações. |
| MC-06.12 | copilot, IaC+K8s+observabilidade, políticas, simulações, apresentação, viabilidade/ROI | Exercício | Integrar práticas em cenário operacional completo. | Reproduzir incidente/recuperação e comparar baseline; custo/benefício com premissas. | Demo, guia, relatório e ROI estimado. |

## 7. IA para gestão de projetos

Portfólio neste bloco é gestão de iniciativas/OKRs, não carreira. Integrações usam contas de teste/fixtures. Nenhuma mensagem é enviada a terceiros sem autorização específica.

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-07.01 | requisitos, épicos/histórias/mudanças, decomposição e aceite | Projeto — desenvolvimento | Converter solicitação em backlog revisado ligado às decisões. | Cada história tem limites e aceite; proposta não vira confirmação. | Backlog, revisão e IDs. |
| MC-07.02 | RICE/WSJF/MoSCoW, pontuação, impacto e roadmap | Exercício | Priorizar mesmo conjunto por três técnicas com IA. | Reproduzir cálculos, explicitar premissas e comparar cenários/rankings. | Script/planilha e justificativas. |
| MC-07.03 | cronograma, dependências, capacidade, what-if e ajustes | Exercício | Gerar cronograma e simular indisponibilidade/atraso. | Respeitar capacidade/dependências e explicar repercussões. | Modelo e cenários comparados. |
| MC-07.04 | prazo/custo/esforço, históricos, previsões e Monte Carlo | Exercício | Criar simulador Rust com histórico ou dados sintéticos identificados. | Exibir probabilidades/intervalos e baseline; simulação não comprova previsão de equipe real. | Dataset, seed e distribuição. |
| MC-07.05 | AIOps de projeto, riscos de escopo/prazo/recursos, anomalias e mitigação | Exercício | Detectar gargalos em tarefas e sugerir mitigação revisada. | Avaliar alertas rotulados e separar dado/hipótese/recomendação. | Matriz de riscos e métricas. |
| MC-07.06 | reuniões, transcrição/resumo, decisões/ações, calendário/boards | Exercício | Processar conversa fictícia/gravação autorizada e preparar eventos/cards. | Extrair responsáveis/prazos só quando presentes; revisão antes de escrever externamente. | Transcrição, saída e diff. |
| MC-07.07 | relatórios sprint/projeto/portfólio e públicos técnico/gestor/diretoria | Projeto — desenvolvimento | Gerar três versões de status a partir de dados versionados. | Entregas têm fonte; versões preservam os mesmos fatos. | Dados e relatórios revisados. |
| MC-07.08 | conformidade/rastreabilidade, auditoria, documentação de qualidade/versionamento e verificações automatizadas | Projeto — desenvolvimento | Criar verificador Rust/TS de IDs, decisões e evidências. | Detectar fixtures com ID ausente, evidência inválida e inconsistência documental. | Código, testes e auditoria. |
| MC-07.09 | Jira/Asana/Trello/Notion/Slack, bots/cards, NL→workflow, notificações/lembretes/aprovações | Exercício | Criar adaptador com dry-run e integração de teste escolhida. | Criar/atualizar/priorizar sem duplicar efeitos; permissões/aprovações; comparar plataformas restantes. | Payloads, testes e demo identificando mocks. |
| MC-07.10 | OKRs, outcomes, iniciativas/portfólio e impacto | Exercício | Vincular iniciativas de aprendizado a resultados mensuráveis. | Distinguir output/outcome e simular repriorização com dados. | Mapa de OKRs e cenários. |

## 8. Arquitetura de sistemas com IA

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-08.01 | tradicional/AI-first; Prompting, Responsible AI, UX, AI-Ops, Optimization; IA/determinismo; trade-offs | Teoria | Criar decision framework para capacidades artesanais. | Justificar IA/recusa por latência/precisão/custo/performance; finanças continuam determinísticas. | ADR e exemplos dos cinco padrões. |
| MC-08.02 | Reactive, Memory-Enhanced, Tool-Using, ReAct, Self-Reflection; tarefas curtas/baixo custo/latência | Exercício | Comparar agentes simples Rust em interações simuladas. | Demonstrar cada variante e medir qualidade/custo/latência. | Código e métricas; pode reutilizar MC-04. |
| MC-08.03 | Sequential, Parallel, Supervisor, Hierarchical, Group Chat, Handoff; filas/mensagens/estado/falhas/sincronização | Exercício | Implementar padrões de comunicação e recuperação Rust. | Demonstrar cada padrão, duplicação de mensagem, falha de nó e consistência. | Diagramas, logs e testes; pode reutilizar MC-04.09. |
| MC-08.04 | Basic RAG, Hybrid Search, Multi-Index, Agentic RAG | Exercício | Comparar recuperação em corpus fictício fixo. | Avaliar relevância e fundamentação por variante, com isolamento por loja. | Índices, consultas rotuladas e métricas. |
| MC-08.05 | U4/Model Router, Intent-Based Routing e Model Tiering | Exercício | Rotear chamadas Rust por tarefa/orçamento/capacidade. | Medir qualidade/custo/latência; fallback e recusa de intenção indevida. | Política, traces e benchmark. |
| MC-08.06 | Semantic Cache, Prompt Cache e Response Streaming | Exercício | Comparar caches e transmitir Rust→Svelte progressivamente. | Validar isolamento/expiração/invalidação; medir custo; cancelar stream sem corromper estado. | Testes, métricas e demo. |
| MC-08.07 | HITL, Approval Gates, Confidence Thresholds, Audit Trails | Projeto — candidata | Definir revisão e limiares calibrados para saídas. | Baixa confiança pede revisão; aprovação vincula dados/ação e invalida após mudança. | Política, avaliação e testes. |
| MC-08.08 | gateway/orquestração/compartilhados/observabilidade; escala/segurança; loose coupling/interfaces/policies | Teoria | Comparar referência enterprise com monólito modular Rust/Svelte. | Explicitar custo e gatilhos para adotar infraestrutura sem impor complexidade ao init. | Diagramas e ADR. |
| MC-08.09 | traces de prompts/logs/performance; híbrido Kubernetes/serverless/edge | Exercício | Instrumentar laboratório e simular distribuição por ambiente. | Correlacionar execução sem expor dados privados e avaliar restrições/implantação. | Traces, medições e comparação. |

## 9. Dados e fine-tuning

A decisão de fine-tuning considera também a arquitetura, a implantação e a observabilidade descritas em MC-08.08 e MC-08.09.

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-09.01 | Decisão de fine-tuning e contexto arquitetural | Teoria | Comparar prompt, RAG e ajuste para descrição artesanal. | Justificar ajuste/adiamento por dados/custo/privacidade/baseline; arquitetura coberta por MC-08.08/09. | ADR e referências às evidências. |
| MC-09.02 | coleta, limpeza, balanceamento/padronização, JSONL, automação e diversidade | Exercício | Preparar dataset em Rust com procedência/autorização. | Validar schema, deduplicar, separar treino/validação/teste e analisar distribuição sem vazamento. | Dataset versionado, relatório e testes. |
| MC-09.03 | API comercial, upload/treino, hiperparâmetros, monitoramento, automação/versionamento | Exercício | Criar CLI Rust para job em provedor compatível após autorizar custo/dados. | Executar treino real e acompanhar estado/cancelamento; mock não conclui treino. | Manifesto, IDs sanitizados, parâmetros, logs e custo. |
| MC-09.04 | LoRA/PEFT, eficiência e full fine-tuning | Exercício | Treinar adaptador e ajuste completo em modelo pequeno compatível, tarefa fixa. | Comparar qualidade/recursos/parâmetros treináveis; sem hardware, execução permanece pendente. | Runner isolado, manifestos/checkpoints e comparação. |
| MC-09.05 | métricas qualitativas/quantitativas, precisão/consistência/adequação, A/B, performance e overfitting | Exercício | Avaliar base/ajustados em teste reservado e avaliação cega. | Medir generalização/erros por grupo; distinguir comparação offline de A/B real. | Harness, dados, resultados e análise de variação. |
| MC-09.06 | modelo de domínio, chatbot/agente, API, protótipo e documentação | Exercício | Integrar modelo treinado em Svelte/Rust de laboratório. | Demonstrar ponta a ponta e comparar baseline sem publicar automaticamente ou alegar ganho não medido. | Demo, contrato e relatório versionado. |

## 10. Segurança e governança em IA

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-10.01 | Governança, responsabilidades, riscos e aspectos humanos/éticos | Projeto — transversal | Definir inventário de modelos/dados, responsáveis e autonomia. | Cada uso tem finalidade, risco, mitigação e revisão de incidentes rastreável. | Política e registro de riscos. |
| MC-10.02 | Interpretabilidade e explicabilidade | Exercício | Explicar classificador e fundamentar respostas RAG. | Distinguir explicação observável de suposição sobre raciocínio interno; avaliar fidelidade/utilidade. | Casos, método e avaliação. |
| MC-10.03 | Vieses e responsabilidade | Exercício | Avaliar erros por materiais/categorias/estilos em dados autorizados. | Comparar grupos e mitigações sem generalizar além da amostra. | Métricas estratificadas e limitações. |
| MC-10.04 | Segurança e dados | Projeto — transversal | Modelar prompt injection, vazamento, ferramentas indevidas e acesso entre lojas. | Testes negativos, retenção/exclusão e permissões independentes de conteúdo externo. | Modelo de ameaças e evidências de bloqueio. |
| MC-10.05 | Riscos legais/regulatórios | Teoria | Mapear dados, licenças e obrigações das integrações planejadas. | Registrar aplicabilidade/fontes/pendências; estudo não equivale a política jurídica final. | Inventário com data e questões de revisão. |
| MC-10.06 | Custos financeiros de IA | Projeto — transversal | Definir orçamento por execução/loja, alertas, quotas e desligamento. | Medir/bloquear limites incluindo agentes/retries; separar estimativas de cobrança real. | Relatório/painel, política e testes. |

## 11. Projeto integrador / capstone

Planejar um exercício integrador não confirma a organização final de todas as entregas do marketplace. O recorte depende de T01/T02.

| ID | Tópicos | Aplicação | Tarefa adaptada | Critério de conclusão | Evidência esperada |
| --- | --- | --- | --- | --- | --- |
| MC-11.01 | problema/escopo, público/viabilidade/valor, arquitetura, milestones/backlog/stack | Projeto — planejamento | Consolidar recorte demonstrável Svelte/Rust. | Escopo aprovado, critérios mensuráveis, dependências e alternativas. | Especificação, backlog e diagrama. |
| MC-11.02 | RAG, banco vetorial, agente e CLI | Exercício | Integrar corpus/índice e agente em CLI Rust. | Queries complexas com fontes, avaliação e abstenção quando faltam dados. | CLI, corpus, configuração e relatório. |
| MC-11.03 | APIs, MCP, orquestração ADK e UI programática | Exercício | Integrar Rust/Svelte/MCP e comparar orquestração Rust com ADK de referência. | API documentada, capacidades autorizadas e ligação real à UI; MCP não é controle automático de DOM. | Contrato, traces, testes e demo. |
| MC-11.04 | Interface Svelte, APIs de IA, validação MCP, CI/CD e implantação | Exercício | Implantar demonstração em ambiente autorizado com pipeline. | Jornada Svelte→Rust→IA e agente/UI comprovadas; implantação reproduzível. | URL quando existir, gravação, CI e guia. |
| MC-11.05 | apresentação/resultados/defesa, README/arquitetura/instruções e avaliação de qualidade/complexidade | Projeto — documentação | Preparar avaliação técnica reproduzível, sem carreira. | Terceiro executa e confere resultados; alternativas, limitações e complexidade justificadas. | README, diagramas, roteiro e relatório final. |

## Execução, dependências e evidências

1. Definir T01/T02; aplicar T03–T06 quando envolver regras de negócio. T07 orienta a primeira experiência de IA e T08 consolida contratos antes da implementação.
2. Começar por fundamentos, dados e baseline; seguir com RAG/API, MCP e agente simples; comparar multiagentes e ajustes com avaliação reproduzível.
3. Laboratórios de UI, gestão e infraestrutura podem evoluir separadamente. Treinamento depende de dados/baseline; capstone depende das capacidades escolhidas e controles transversais.
4. Cada tarefa de execução referencia IDs MC, dependências, aceite e validação. Nenhuma linha revoga a proteção ERP/Oracle de AGENTS.md.
5. Atualizar estado por linha com data e caminho/URL real: planejado, em andamento, bloqueado ou concluído. Critério não atendido permanece pendente com motivo. Não criar links de evidências inexistentes.

Convenção futura: `docs/evidence/MC-xx.yy/README.md`, com comandos, versões, dados, seed quando aplicável, métricas, custos e limitações. O diretório ainda não foi criado. Não versionar segredos ou datasets/conversas privados sem autorização.

## Limites da cobertura

- Cobertura documental por conceitos e práticas adaptadas não certifica domínio de todas as ferramentas comerciais citadas.
- Teoria não conclui prática; simulação não comprova implantação, treinamento ou integração externa real.
- Custos, ganhos e benchmarks serão medidos na execução, sem registrar metas como resultados.
- Atividades de carreira estão fora do escopo.
