# Registro de decisões — aplicação de artesanato

Última atualização: 16/11/2026.

Este arquivo acompanha o planejamento da aplicação. As decisões confirmadas estão separadas das propostas e das questões em aberto. Será atualizado conforme a conversa avançar. Ainda não é a especificação final do projeto nem um plano de implementação aprovado.

## Como ler este registro

- **Confirmado:** decisões D01–D17 e definições aprovadas nas tarefas T01, T02 e T08, nos limites descritos abaixo.
- **Proposta:** alternativa para discussão, sem autorização de implementação.
- **Em aberto:** definição necessária antes da entrega correspondente.
- **Pesquisa:** referência histórica com data e fonte; não equivale a decisão.
- **Tarefa de planejamento:** trabalho para esclarecer escopo e critérios, sem funcionalidade entregue.

**Estado atual:** fase 0 concluída no planejamento e fase 1 concluída na base técnica. A API Axum/Tokio, conexões PostgreSQL/Redis, verificações de saúde, conectividade inicial do frontend, configuração de desenvolvimento e CI estão implementadas; as verificações locais de Rust e frontend passaram. O uso do Compose com serviços ativos e uma execução remota do GitHub Actions ainda não foram validados neste ambiente. Ainda não há funcionalidades de domínio, schema de negócio ou fila assíncrona. T01, T02 e T08 estão definidos; operações e entidades candidatas estão registradas em `docs/architecture.md`. O projeto é um integrador modular para construir a aplicação completa. A prioridade aprovada está no [roadmap](../ROADMAP.md). A demonstração percorre o caminho de uma peça pronta, do cadastro à venda e entrega. Além da base acima, a arquitetura definida prevê Stripe em modo de teste, Ship24 no plano grátis de 10 rastreamentos mensais (Correios é a cobertura mínima a validar), Ollama local, armazenamento local de imagens e túnel HTTPS temporário para webhooks. Hospedagem e provedores de produção continuam em aberto.

### Navegação

- [Objetivo](#objetivo)
- [Decisões confirmadas](#decisões-confirmadas)
- [Tarefas de planejamento](#tarefas-de-planejamento)
- [Plano de conteúdos de IA](ia-study-plan.md)
- [Roadmap de fases](../ROADMAP.md)
- [Questões em aberto](#questões-em-aberto)
- [Histórico](#histórico)

## Responsabilidade dos documentos

| Documento                           | Conteúdo autoritativo                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Este registro                       | Decisões confirmadas, recorte da demonstração, propostas e pendências de produto.             |
| [Roadmap](../ROADMAP.md)            | Fases, ordem de entrega, dependências e condições de conclusão.                               |
| [Plano de estudo](ia-study-plan.md) | Todos os assuntos técnicos, tarefas práticas/teóricas, critérios e evidências de aprendizado. |
| [Arquitetura](architecture.md)      | Base implementada, limites técnicos aprovados e desenho a refinar por funcionalidade.         |

Planejamento aprovado, código existente e competência demonstrada são registros distintos. Uma fase de base técnica concluída não encerra o estudo de IA ou a aplicação; um experimento aprovado para estudo não cria uma regra comercial nova.

## Objetivo

Oferecer um lugar onde artesãos possam vender ou apenas mostrar seus trabalhos, funcionando como uma vitrine para receber encomendas. Crochê é um exemplo de trabalho que poderá ser cadastrado.

Elo7 e Shopee foram citadas como referências iniciais. Nenhuma funcionalidade dessas plataformas deve ser considerada parte do escopo sem uma decisão registrada aqui.

Em 10/11/2026, foi acrescentado o objetivo de usar o projeto para desenvolver competências amplas de engenharia de software e IA aplicada. Foi confirmado que a prioridade é aprender e montar portfólio. O domínio de artesanato e as regras de negócio já escolhidas serão usados para dar contexto às entregas técnicas.

## Decisões confirmadas

### D01 — Público e finalidade

A aplicação será uma vitrine e um espaço de venda de trabalhos artesanais, permitindo receber encomendas.

### D02 — Papéis

Haverá os papéis de comprador e vendedor. Toda pessoa começa como compradora e se torna vendedora ao criar uma loja.

### D03 — Loja

A criação da loja habilita a atuação como vendedor.

### D04 — Cadastro de trabalhos

O artesão poderá cadastrar seus trabalhos e selecionar quais deseja colocar à venda.

### D05 — Trabalhos sem venda

Um trabalho poderá permanecer cadastrado apenas para visualização e controle do que foi produzido, sem estar à venda.

### D06 — Pedidos internos

Os pedidos e seu acompanhamento acontecerão dentro da aplicação.

### D07 — Encomendas com orçamento

Será permitido solicitar e negociar um orçamento para trabalhos por encomenda.

### D08 — Chat interno

A aplicação terá um chat interno entre comprador e vendedor.

### D09 — Pagamento integrado

A compra terá pagamento integrado à jornada da aplicação. Na primeira demonstração, foi escolhido checkout hospedado pelo Stripe em modo de teste; o comprador sai para o provedor e retorna ao Smart Atelier. Provedor, modelo financeiro e regras de produção permanecem em aberto.

### D10 — Dashboard

O vendedor terá um dashboard completo, com gráficos de suas vendas. Os indicadores específicos ainda serão definidos.

### D11 — Pagamento das encomendas

O comprador pagará o valor integral após aceitar o orçamento e antes do início da produção. Não haverá divisão em sinal e restante nesse fluxo.

### D12 — Repasse ao vendedor

O vendedor receberá depois da entrega. Na primeira demonstração, um evento de entrega autenticado do Ship24 habilita uma transferência de teste ao saldo Stripe Connect do artesão; o envio ao banco segue o cronograma da conta. Prazo, comprovação e regras de disputas em produção permanecem em aberto, com validação do provedor. Os detalhes do recorte de teste estão em T02.

### D13 — Abrangência de aprendizado

Desenvolver competências de engenharia de software e IA aplicada de forma ampla e coerente com o projeto. A escolha de novas funcionalidades e tecnologias continua em discussão.

### D14 — Finalidade do projeto

O projeto será voltado a aprendizado e construção de portfólio. Operação comercial com clientes reais não é o objetivo atual.

### D15 — Plano de aprendizado técnico

O aprendizado técnico usa Svelte/SvelteKit no frontend e Rust no backend. O plano de estudo cobre integralmente as 11 áreas técnicas por aplicação no projeto, exercícios separados e estudo teórico. Cada assunto exige tarefa, critério de conclusão e evidência; uma comparação não substitui a execução prática prevista. Laboratórios não se tornam funcionalidades obrigatórias do marketplace.

### D16 — Escopo do aprendizado

O plano não inclui atividades de carreira e entrevistas. Documentação, demonstração e avaliação técnica do projeto integrador fazem parte do trabalho; OKRs permanecem como assunto de gestão do projeto.

### D17 — Framework do frontend

O frontend usará SvelteKit 3 sobre Svelte 5 e TypeScript. SvelteKit será responsável por rotas, carregamento e renderização da aplicação. Regras de negócio e dados autoritativos permanecem no backend Rust. `adapter-auto` fica configurado até a hospedagem ser definida.

## Tarefas de planejamento

Organização do planejamento. As definições de T01, T02 e T08 estão confirmadas; isso não significa que as funcionalidades foram implementadas. As demais tarefas continuam em aberto, sem prazo ou responsável aprovados.

| ID  | Tarefa e resultado esperado                                                                                                                           | Dependências                             | Critério de conclusão do planejamento                                                                                                                                                                                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T01 | Organizar o aprendizado em torno de um projeto integrador modular completo, usando laboratórios e teoria para tópicos que não se encaixem no produto. | D13–D16.                                 | **Concluída (planejamento).** Abordagem e limites registrados abaixo.                                                                                                                                                                                                         |
| T02 | Definir a jornada e os limites da primeira demonstração integrada.                                                                                    | T01.                                     | **Concluída (planejamento).** Caminho, inclusões, exclusões e critérios registrados abaixo.                                                                                                                                                                                   |
| T03 | Detalhar regras completas de conta, loja e trabalho além do recorte demonstrável.                                                                     | T02; D02–D05.                            | Demonstração cobre conta, criação de loja e publicação de uma peça pronta; quantidade de lojas, papéis completos, visibilidade e demais estados de trabalho ainda serão definidos.                                                                                            |
| T04 | Detalhar orçamento, chat e pedido: conteúdo, aceite, alterações e acompanhamento.                                                                     | T02 e T03; D06–D08 e D11.                | Fluxo, estados, permissões, erros e critérios de aceite descritos.                                                                                                                                                                                                            |
| T05 | Detalhar entrega, pagamento e repasse para além do caminho de teste da demonstração.                                                                  | T02 e T04; D09, D11 e D12.               | Stripe Connect/Ship24 escolhidos apenas para sandbox; produção, comprovação em disputas, prazos, responsabilidades e tratamento financeiro continuam pendentes. Sete dias segue proposta.                                                                                     |
| T06 | Definir indicadores e necessidades de suporte.                                                                                                        | T02; eventos de pedido e pagamento; D10. | Indicadores têm significado, fonte e exemplos; suporte e permissões descritos.                                                                                                                                                                                                |
| T07 | Selecionar a primeira experiência de IA para a demonstração.                                                                                          | T02; D13 e D14.                          | **Experiência definida:** rascunho de título e descrição a partir de dados e fotos, com revisão do artesão. Métricas de qualidade e limites operacionais ainda devem ser detalhados.                                                                                          |
| T08 | Consolidar a arquitetura modular e a especificação técnica inicial da demonstração.                                                                   | T02 e decisões aplicáveis de T03–T07.    | **Concluída (planejamento).** Componentes, operações candidatas, entidades, estados, consistência, testes e limites externos estão em `docs/architecture.md`. Schemas/rotas finais se refinam antes de cada implementação; Correios será validado antes da integração Ship24. |

### T01 — Construir a aplicação completa como projeto integrador modular

- **Estado:** concluída no planejamento.
- **Decisão:** Smart Atelier será o projeto integrador para construir uma aplicação completa. Os tópicos de IA serão aplicados ao produto quando forem adequados; os demais serão cobertos por exercícios independentes ou estudo teórico, sem virarem funcionalidades artificiais do marketplace.
- **Limite:** atividades de carreira e entrevistas permanecem excluídas (D16). A matriz de cobertura organiza aplicação, laboratório e teoria, mas não autoriza custos nem execução automática de todos os exercícios.
- **Critério de conclusão do planejamento:** abordagem e separação entre produto, laboratórios e teoria aprovadas e registradas.

### T02 — Demonstrar uma venda de peça pronta, da loja à entrega

- **Estado:** concluída no planejamento; detalhes operacionais permanecem nas pendências indicadas.
- **Jornada:** cadastro de conta; criação da loja do artesão; cadastro de uma peça pronta com fotos e informações fornecidas pelo artesão; geração de rascunho de título e descrição pela IA; revisão/edição e aprovação pelo artesão; abertura direta da página pública da loja ou do produto; cadastro/entrada do comprador; checkout direto de um único item; pagamento em ambiente de teste; envio e acompanhamento por rastreamento; evento de entrega; repasse de teste ao vendedor.
- **Identidade e venda:** login próprio e Google resolvem para a mesma conta interna; a conta de comprador precisa estar autenticada antes de iniciar o checkout. O artesão deve concluir o onboarding Stripe Connect de teste antes de publicar itens à venda. Uma conta Smart Atelier pode atuar como compradora e vendedora; a demonstração pode usar contas separadas para representar os dois papéis.
- **Cadastro do produto:** fotos (uma ou mais), categoria/tipo, materiais, técnica, medidas com unidades (ou indicação explícita de não aplicável), preço e moeda, quantidade disponível. Peça única começa com quantidade 1. Cor, acabamento e instruções de cuidado são opcionais. A IA não deduz nem altera preço, materiais, medidas ou estoque.
- **IA:** gerar somente proposta de título e descrição com base nas informações e fotos fornecidas. A publicação depende de revisão e aprovação humana. Na demonstração, o modelo será executado localmente com Ollama por uma interface de provedor substituível.
- **Compra:** uma peça pronta por pedido, compra iniciada diretamente na página pública do item; sem carrinho com múltiplos itens ou lojas nesta demonstração. O endereço de entrega é coletado no Smart Atelier antes de abrir o checkout e fica associado ao pedido.
- **Pagamento:** checkout hospedado pelo Stripe; somente cartão de teste; moeda única BRL. Ao iniciar o checkout, o estoque fica reservado por 30 minutos, alinhado ao prazo mínimo configurável da sessão Stripe ([documentação da Checkout Session](https://docs.stripe.com/api/checkout/sessions/create)). Uma recusa de tentativa mantém sessão, pedido e reserva ativos para que o comprador possa tentar outro cartão; liberar o estoque somente após expiração final confirmada sem pagamento. A confirmação do navegador não é fonte de verdade: o backend confirma o pagamento por evento autenticado do Stripe. Endereço é coletado no Smart Atelier antes do redirecionamento, apagado se a sessão expirar sem pagamento e mantido no pedido pago para envio/acompanhamento.
- **Repasse de demonstração:** usar Stripe Connect em modo de teste com o fluxo _separate charges and transfers_ ([documentação do Stripe Connect](https://docs.stripe.com/connect/separate-charges-and-transfers)). Quando Ship24 confirmar “entregue”, o backend inicia uma única transferência de 100% do valor do item ao saldo Stripe do artesão, sem comissão da plataforma na demonstração. O repasse bancário subsequente segue o cronograma da conta Connect. Eventos repetidos/fora de ordem e retries não podem duplicar ou antecipar a transferência. Esse arranjo é exclusivamente de teste; o modelo de produção segue em aberto.
- **Entrega:** Ship24 foi aprovado como integração da demonstração. O plano gratuito consultado oferece API/webhooks para até 10 rastreamentos por mês, sem excedente faturado; ao atingir a cota, o rastreamento para até a renovação ([planos e cotas do Ship24](https://help.ship24.com/en/article/ship24-pricing-and-plans-explained-425d9d/)). O teste inicial de cobertura será dos Correios; a lista atualizada de transportadoras pode ser consultada na API/dashboard do provedor ([documentação de transportadoras](https://docs.ship24.com/couriers)). Depois do envio, o artesão informa transportadora e código de rastreio, que passam a ser acompanhados no Smart Atelier e no Ship24. Não exceder 10 rastreamentos por mês no demo. Emissão de etiqueta, cálculo de frete e cotação de frete ficam fora deste recorte.
- **Inclui:** cadastro de contas, criação de loja, página pública direta de loja/produto, experiência assistida por IA e venda de ponta a ponta em sandbox/teste.
- **Não inclui nesta demonstração:** encomendas/orçamentos, chat, busca/catálogo para descoberta, carrinho multi-item/multi-loja, produção de peça personalizada, cancelamento após pagamento, reembolsos, disputas, operação de pagamento real ou lançamento comercial. Esses fluxos ficam para as fases de expansão.
- **Fluxo do pedido:** `awaiting_payment` (Checkout ativo; estoque reservado) → `paid` (webhook autenticado do Stripe) → `shipped` (artesão informa transportadora e código) → `delivered` (Ship24) → `transfer_pending` → `transferred`. Recusa de cartão não encerra sessão nem libera estoque; `checkout.session.expired` sem pagamento encerra a tentativa e libera a unidade. A fila Redis agenda o trabalho assíncrono; estado e idempotência permanecem no PostgreSQL/Stripe.
- **Testes:** automação local/CI com serviços simulados para Stripe, Ship24 e Ollama; roteiro manual de sandbox para confirmar integração real, webhooks e transferência, respeitando as credenciais de teste e a cota de 10 rastreamentos/mês. Nenhum teste automatizado de CI deve consumir a quota do Ship24.
- **Critério de conclusão do planejamento:** jornada, fronteiras, fluxo principal, reserva de estoque, tratamento do endereço, exclusões e estratégia de validação aprovados. Cobertura Correios/Ship24 continua como gate antes da integração; se tracking estiver em exceção ou indisponível, não há transferência automática.

### T07 — Validar a experiência de publicação assistida por IA

- **Estado:** experiência de título/descrição definida; avaliação e limites ainda planejados.
- **Objetivo:** apoiar a redação do anúncio com texto e fotos fornecidos, usando Ollama local e revisão do artesão.
- **Dependências:** atributos do produto, dados autorizados, modelo compatível com as modalidades e adaptador no Rust; preservar entrada manual se o modelo falhar.
- **Tarefas de especificação:** preparar casos com dados completos, ausentes, contraditórios e instruções maliciosas; definir baseline manual/template; escolher métricas e limiares de aceite de fidelidade factual, utilidade, latência e recursos antes de avaliar; definir limites de contexto, timeout, retries e orçamento computacional.
- **Critérios de conclusão:** saída tem schema e origem dos atributos; não inventa material, medidas, preço ou estoque; informa dado insuficiente; falha não publica nem apaga edição manual; revisão humana é obrigatória. Avaliação mantém treino/ajuste, inferência, mocks e medições reais separados.
- **Evidência necessária:** conjunto de avaliação autorizado, prompts/modelo/versões, contrato, resultados comparados ao baseline, testes de falha e roteiro de revisão pelo artesão. Os valores de aceite e resultados ainda devem ser registrados na execução.
- **Cobertura ampliada:** APIs remotas, OCR/áudio/vídeo, RAG, MCP, agentes, personalização e fine-tuning seguem as tarefas do [plano de estudo](ia-study-plan.md), em laboratório até haver decisão específica de uso no produto.

### T08 — Arquitetura inicial para a demonstração

- **Estado:** arquitetura inicial aprovada; funcionalidades e contratos detalhados ainda não implementados.
- **Forma:** monólito modular; frontend SvelteKit comunica-se por HTTP/JSON com API Rust. O Rust é a autoridade para regras de negócio, autorização, pedidos, pagamento e integração. Não introduzir microserviços na demonstração.
- **Backend e dados:** Axum + Tokio para HTTP assíncrono; PostgreSQL + SQLx para persistência; Redis para filas e retries de tarefas assíncronas. PostgreSQL mantém o estado autoritativo e o registro/idempotência dos eventos; Redis agenda processamento, não substitui a persistência do domínio.
- **Integrações do demo:** Stripe/Connect em modo de teste com checkout hospedado, cartão e BRL; _separate charges and transfers_ para transferir o valor ao saldo Connect após entrega; Ship24 sujeito à verificação de cobertura e plano gratuito; Ollama local para texto+imagem; armazenamento de imagens no filesystem local por interface substituível.
- **Identidade:** login próprio da aplicação e login por Google coexistem e resolvem para a mesma conta interna. O Connect onboarding é obrigatório antes de publicar item para venda. Papéis e lojas pertencem ao Smart Atelier.
- **Webhooks:** executar localmente e expor temporariamente endpoints via túnel HTTPS para receber eventos externos durante o desenvolvimento/demonstração. A solução permanente de hospedagem permanece em aberto.
- **Segurança financeira:** entrega confirmada pelo Ship24 pode iniciar uma única transferência de teste ao saldo conectado, pelo valor integral do item. Eventos repetidos ou fora de ordem não antecipam nem duplicam o efeito; falhas temporárias do Stripe geram novas tentativas idempotentes. O banco do artesão recebe segundo o cronograma Connect.
- **Ainda precisa ser detalhado na implementação:** schemas JSON e schema/migrações finais; segredos e validação de webhooks conforme os provedores; backoff, métricas/alertas e detalhes de autorização; cenários de falha de rastreio; hospedagem permanente. Verificar Correios no plano grátis Ship24 antes de iniciar essa integração.
- **Critério de conclusão da tarefa:** arquitetura modular e limites do demo registrados, com operações, entidades, estados, consistência e testes planejados; refinar schemas/rotas em tarefas de implementação. Manter dependências externas/produção explicitamente pendentes. A aprovação não adiciona dependências ao bootstrap, não autoriza custos e não aprova arquitetura de produção.

Para detalhar uma tarefa de implementação, use o modelo abaixo. Preencha somente o que estiver definido e mantenha o restante como pendência.

```markdown
### Txx — Título com ação e resultado

- Estado: proposta | pronta | em andamento | bloqueada | concluída
- Objetivo: problema ou capacidade demonstrada.
- Base: decisões Dxx e aprovações relacionadas.
- Escopo: comportamento incluído e limites da tarefa.
- Dependências: definições, contratos, dados e serviços necessários.
- Critérios de aceite: cenários observáveis de sucesso, erro e autorização.
- Validação: verificações proporcionais à mudança e como reproduzi-las.
- Evidências: demonstração, resultados e limitações; preencher ao concluir.
```

## Propostas em discussão — ainda não confirmadas

- Separar a visibilidade de um trabalho da sua disponibilidade para venda: registro privado, portfólio público sem venda e anúncio disponível para compra.
- Vincular cada conversa ao produto ou à encomenda correspondente.
- Permitir ao vendedor enviar um orçamento estruturado no chat, com descrição da peça, personalizações, valor e prazo de produção.
- Transformar o orçamento em pedido quando o comprador aceitar a proposta, preservando os termos combinados no histórico.
- Incluir no dashboard o acompanhamento de orçamentos enviados, conversão em pedidos e vendas concluídas.

## Proteção dos usuários — proposta em discussão

As medidas abaixo foram elaboradas em resposta à pergunta sobre proteção dos usuários. O repasse após a entrega foi confirmado na D12; as demais medidas continuam como propostas. A análise considera uma operação no Brasil como hipótese de planejamento; a abrangência geográfica precisa ser confirmada. Não constitui uma política jurídica pronta para publicação.

### Pagamento e repasse

- Conforme a D12, a confirmação do pagamento integral pelo comprador será separada da liberação dos recursos ao vendedor, que ocorrerá após a entrega.
- Preferir um provedor de pagamentos que permita implementar a D12, com uma janela de conferência e regras de disputa previamente informadas. Isso depende de validar funcionalidades, limites e prazos do provedor, especialmente em encomendas com produção longa.
- A plataforma não deve assumir que pode custodiar dinheiro por conta própria. O arranjo será definido com o provedor e validado juridicamente.
- Não iniciar a produção apenas com uma imagem de comprovante: a confirmação deve vir da integração de pagamentos.
- Se houver disputa antes da liberação, solicitar a suspensão do repasse referente ao pedido, quando suportada pelo provedor. A devolução ao comprador não deve ficar dependente de uma retenção ainda disponível: o modelo precisa prever recursos e responsabilidades para reembolsos e contestações posteriores.
- Explicitar ao artesão que o recebimento após a entrega exige financiar materiais e produção com recursos próprios. O modelo após a entrega foi escolhido depois de essa consequência ter sido apresentada na conversa.

### Proteção do comprador

- Disponibilizar no pedido um canal para informar não recebimento, atraso, defeito ou divergência em relação ao que foi contratado.
- Exibir antes do pagamento as condições da compra, a identificação exigível do fornecedor, os valores totais e os prazos.
- Registrar a solicitação, fornecer protocolo e permitir acompanhar a resposta e a solução, com acesso ao suporte da plataforma além do chat com o vendedor.
- Prever correção, substituição, cancelamento ou reembolso conforme a situação e os direitos aplicáveis, sem impor um único desfecho a todos os casos.

### Proteção do vendedor

- Preservar o orçamento aceito e o histórico relevante do chat, incluindo especificações, materiais, cores, medidas, valores e prazos.
- Exigir novo acordo para mudanças na peça após o aceite, registrando eventual ajuste de preço ou prazo.
- Permitir comprovar produção, envio e entrega, e apresentar sua versão em uma disputa.
- Prever análise humana e possibilidade de revisão das decisões da plataforma, além de medidas proporcionais contra fraude e abuso de compradores ou vendedores.
- Definir os responsáveis pelos custos de devolução, contestações de pagamento e prejuízos, respeitando a legislação. O repasse concluído não será tratado como garantia de ausência de contestações posteriores.

### Cancelamento, devolução e direitos legais

- O art. 49 do CDC prevê arrependimento em contratações fora do estabelecimento no prazo de sete dias, conforme o marco aplicável. Há direitos sobre vícios e descumprimento da oferta que não se encerram com essa janela.
- O art. 49 não traz uma exceção expressa para personalizados; existem orientações e decisões divergentes sobre a aplicação. A proposta é não bloquear automaticamente a solicitação por ser uma encomenda ou porque a produção começou, e submeter a regra específica à revisão jurídica antes do lançamento.
- Confirmar o recebimento ou concluir o pedido não deve ser apresentado como renúncia a direitos legais.
- O comércio eletrônico exige atendimento eletrônico, confirmação imediata de recebimento da demanda e manifestação em até cinco dias. Esse prazo de manifestação não significa resolução obrigatória de todos os casos em cinco dias. A operação de suporte deve ser dimensionada para cumprir a obrigação.

### Segurança, privacidade e convivência

- Verificar os dados do vendedor e a titularidade de recebimento conforme o arranjo com o provedor.
- Oferecer denúncia e bloqueio para assédio, golpes e conteúdo indevido, preservando o acesso à resolução de pedidos em andamento.
- Tratar os dados de cartão no provedor de pagamentos e limitar os dados pessoais compartilhados ao necessário para a transação e às exigências legais.
- Informar finalidades, compartilhamentos e retenção de dados; oferecer um canal para exercer direitos sobre dados pessoais. Pedidos de exclusão devem respeitar as hipóteses legais de conservação de registros.

### Documentos e operação a preparar

- Termos de uso e condições de venda.
- Política de cancelamento, devolução e reembolso, incluindo encomendas personalizadas.
- Política de proteção de compradores e vendedores, repasses e disputas.
- Política de privacidade e regras de convivência no chat.
- Operação interna de suporte e mediação. Isso pode exigir permissões administrativas internas; os papéis comerciais definidos continuam sendo comprador e vendedor.

### Fontes consultadas em 06/11/2026

- [Código de Defesa do Consumidor — Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html): arts. 18, 26, 35, 49 e 51.
- [Decreto nº 7.962/2013 — Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html): informação, atendimento, segurança e arrependimento no comércio eletrônico.
- [Direito dos titulares — ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).
- [Orientação do Procon-SC sobre compras online](https://www.procon.sc.gov.br/veja-4-direitos-do-consumidor-em-compras-online/): exemplo de orientação que exclui personalizados sem possibilidade de revenda do arrependimento.
- [Revista oficial do TJDFT, v. 107, n. 1](https://www.tjdft.jus.br/consultas/jurisprudencia/revistas/doutrina-juridica/revista-v-107-n-1): Acórdão 898398, páginas impressas 221–222; exemplo de caso concreto de 2015 que reconheceu arrependimento em venda domiciliar de material fotográfico personalizado. Não é uma regra vinculante geral para toda encomenda.

## Referências de mercado — pesquisa em 06/11/2026

As observações abaixo são referências externas, não decisões de funcionalidade da aplicação. Regras de terceiros podem mudar.

| Plataforma e período                                        | Modelo encontrado                                                                                                                                                                                                                        | Fonte                                                                                                                                                                              |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elo7 — material de 06/06/2023                               | O modelo documentado usava Moip. O valor ficava disponível para saque em até dois dias, e o conteúdo destaca o uso desse dinheiro para iniciar a produção. A disponibilidade para saque é distinta do crédito efetivo na conta bancária. | [Recebimentos no Elo7 — parceria Elo7/Itaú](https://www.itau.com.br/sustentabilidade/itaumulherempreendedora/plataforma/conteudos/como-receber-pelos-seus-pedidos-no-eo7/)         |
| Shopee — termos consultados em 06/11/2026                   | Os recebíveis estão sujeitos à Garantia Shopee. A liberação considera a confirmação do recebimento, os prazos da garantia e as regras de reembolso.                                                                                      | [Termos de serviço, itens 12.2 e 12.3](https://help.shopee.com.br/portal/4/article/77113)                                                                                          |
| Mercado Livre — orientação oficial consultada em 06/11/2026 | Com Envios do Mercado Livre, a orientação descreve a disponibilidade do dinheiro alguns dias após a entrega. Não foi adotado um prazo único para todas as modalidades.                                                                   | [Central de aprendizagem do Mercado Livre](https://vendedores.mercadolivre.com.br/aprender/nota/confirme-que-sua-venda-no-mercado-livre-foi-realizada-com-sucesso?guideKeyId=GE53) |

O Itaú identifica o Elo7 como criador da trilha de conteúdo em sua [apresentação da parceria, de 12/05/2023](https://www.itau.com.br/sustentabilidade/itaumulherempreendedora/plataforma/conteudos/parceria-com-elo7-como-vender-seu-trabalho-criativo-na-internet/). O registro de 2023 comprova o modelo daquele período; não deve ser generalizado a toda a história da plataforma.

O [fato relevante da Enjoei de 11/05/2026](https://api.mziq.com/mzfilemanager/v2/d/fd9cac18-f9b9-4ee5-876f-ac38c316a8bc/506fa401-0672-40ad-3905-8d2425e2e0ca?origin=2) informa a descontinuidade do Elo7 e o encerramento do recebimento de novos pedidos nessa data. O Elo7 é, portanto, uma referência histórica neste planejamento.

**Leitura para o projeto (análise):** a D12 se aproxima da lógica de proteção do pagamento após entrega usada pela Shopee. O modelo Elo7 documentado em 2023 favorecia o financiamento da produção com o valor recebido pela venda.

### Encerramento do Elo7: fatos e aprendizados

Pesquisa registrada em 06/11/2026. Os documentos públicos mostram as justificativas da administração e resultados divulgados; não permitem atribuir o encerramento a uma funcionalidade específica.

**Motivos declarados:** a Enjoei apontou concorrência de grandes multinacionais, aumento do custo de aquisição de clientes e perda de escala. As tentativas de melhorar a eficiência e reduzir a dependência de publicidade paga foram insuficientes. A receita do Elo7 caiu 39,5% no quarto trimestre de 2025 frente ao mesmo período de 2024. A administração decidiu concentrar recursos na plataforma Enjoei. [Fato relevante de 11/05/2026](https://api.mziq.com/mzfilemanager/v2/d/fd9cac18-f9b9-4ee5-876f-ac38c316a8bc/506fa401-0672-40ad-3905-8d2425e2e0ca?origin=2).

**Sinal de continuidade da queda:** no primeiro trimestre de 2026, comparado ao primeiro trimestre de 2025, o Elo7 teve receita líquida de R$ 13,0 milhões (-33,5%), volume vendido de R$ 66,8 milhões (-23,6%) e 410 mil itens transacionados, contra 610 mil (-32,8%). Dados específicos do Elo7, distintos dos números consolidados do grupo. [Release oficial de resultados do 1T26, seção Plataforma Elo7, arquivado na CVM](https://www.rad.cvm.gov.br/ENETCONSULTA/frmDownloadDocumento.aspx?CodigoInstituicao=1&Tela=99&descTipo=IPE&numProtocolo=1520933&numSequencia=1045639&numVersao=1).

O repasse antes da entrega não aparece como causa declarada do encerramento nos documentos consultados. A decisão de repasse D12 continua baseada na proteção desejada para esta aplicação.

**Aprendizados propostos para o projeto, ainda não aprovados como estratégia:**

- Validar demanda e a capacidade de gerar pedidos para os artesãos antes de ampliar o escopo.
- Diferenciar a experiência por personalização, portfólio e encomendas, em vez de depender de competir apenas em preço e frete com marketplaces generalistas.
- Acompanhar o custo para conquistar compradores, a frequência de retorno e a margem por pedido depois dos custos de pagamento, suporte e aquisição.
- Testar canais de aquisição e retorno de compradores para reduzir dependência exclusiva de anúncios pagos.
- Tratar o dashboard e as ferramentas de gestão como apoio ao artesão; a capacidade de gerar negócios precisa ser validada separadamente.

## Questões em aberto

### Definições ainda necessárias antes de implementar as jornadas

T01, T02 e a arquitetura inicial de T08 estão definidas. Isso não conclui a especificação funcional nem autoriza a implementação de todas as fases. As pendências abaixo devem ser detalhadas nas tarefas correspondentes e no plano de entrega.

| Área                                      | Pendências                                                                                                                                                                                                                                                                                                  | Referência |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Conta e loja no produto completo          | Quantidade de lojas por conta, regras completas de perfil e autorização, recuperação de conta e cenários de segurança. A demonstração cobre cadastro, login próprio/Google e criação de loja.                                                                                                               | T03        |
| Cadastro e publicação no produto completo | Estados de visibilidade, quantidade, edição e retirada de trabalhos; na demonstração, somente item pronto publicado e disponível para compra.                                                                                                                                                               | T03        |
| Encomendas e chat                         | Conteúdo e validade dos orçamentos, aceite, alterações, prazos, estados, notificações e permissões. Fora da primeira demonstração.                                                                                                                                                                          | T04        |
| Pagamento em produção                     | Provedor e modelo de produção, disputas, estornos, prazos e obrigações legais. Stripe Connect fica restrito ao modo de teste neste recorte.                                                                                                                                                                 | T05        |
| Rastreamento                              | Validar com a lista atual da API/dashboard Ship24 se Correios está coberto e testar um rastreio de sandbox; se não estiver coberto ou exigir um plano pago, voltar à escolha do provedor. Definir como tratar rastreio não reconhecido. O vendedor informa transportadora e código. A cota aceita é 10/mês. | T02/T05    |
| Dashboard e suporte                       | Indicadores, fontes, filtros, papéis administrativos, mediação e operação de suporte.                                                                                                                                                                                                                       | T06        |
| Avaliação da IA                           | Baseline, casos de avaliação, qualidade esperada, latência, limites computacionais e tratamento de falha do Ollama.                                                                                                                                                                                         | T07        |
| Especificação técnica e operação          | Contratos API, schema/migrações, segredos, assinaturas, idempotência, retries, observabilidade, cobertura Ship24, hospedagem e túnel escolhido. Estratégia de testes definida; aplicação ainda precisa implementá-la.                                                                                       | T08        |

A base técnica contém a API Axum/Tokio, pool PostgreSQL/SQLx, conexão Redis, health checks, frontend de conectividade e configuração de CI. Domínio, schema/migrações, fila de processamento e integrações da jornada ainda não estão implementados nesta cópia do projeto. O registro histórico de verificações não equivale a uma nova execução nesta revisão.

### Pendência de produção: prazo e confirmação da entrega para repasse

- Fora do recorte de teste de T02, proposta de produção ainda não aprovada: disponibilizar o repasse sete dias após a entrega confirmada, se não houver disputa aberta que impeça a liberação, conforme as regras informadas e a capacidade do provedor.
- Definir como a entrega será comprovada e como contestar uma confirmação incorreta.
- Esse prazo operacional de repasse não será tratado como prazo final para todos os direitos de reclamação, devolução ou reembolso.

## Histórico

- **16/11/2026 — Revisão das especificações e do aprendizado:** matriz reorganizada com as 11 áreas, 89 linhas estáveis, modalidades, critérios detalhados, estados e contrato de evidências. Stack alinhada às decisões já aprovadas; demonstração, aplicação completa e cobertura de estudo têm encerramentos distintos. Nenhuma funcionalidade, laboratório, integração ou treino foi implementado por esta revisão.

- **12/11/2026 — Fase 0 concluída no planejamento:** confirmação do projeto integrador modular (T01), da jornada de peça pronta até transferência após entrega (T02), da arquitetura modular com Axum/Tokio, PostgreSQL/SQLx, Redis, Stripe Connect de teste, Ship24 (10 rastreamentos/mês grátis; Correios como cobertura mínima a validar), Ollama local e túnel HTTPS temporário (T08), e da ordem de marcos do roadmap. Foram definidos checkout hospedado, cartão de teste/BRL, reserva de estoque, endereço, Connect onboarding, testes simulados/manual e exclusão de cancelamentos, reembolsos e disputas da demonstração. A implementação de produto não começou; validar cobertura dos Correios antes de integrar Ship24. Produção e custos externos seguem pendentes.
- **12/11/2026 — Fase 1 concluída:** API inicial Axum/Tokio, conexões PostgreSQL/Redis e health checks, frontend consultando a API, configuração local, verificações automatizadas locais e workflow de CI implementados sem regras de negócio. Docker Compose e execução remota da CI seguem como verificações operacionais; infraestrutura de domínio e integrações externas continuam pendentes.

- **11/11/2026 — Framework do frontend:** confirmação da adoção de SvelteKit 3. A decisão estabelece o framework de aplicação do frontend sem definir hospedagem, backend HTTP ou funcionalidades de produto.

- **10/11/2026 — Roadmap independente:** apresentação do planejamento como documento técnico próprio do projeto, preservando tarefas, critérios e IDs.

- **10/11/2026 — Roadmap técnico:** confirmação de D15 e D16 por pedido da usuária: 11 áreas técnicas com Svelte/Rust, separando projeto, laboratórios e teoria; carreira excluída. Matriz criada em docs/ia-study-plan.md, sem marcar entregas como implementadas.

- **10/11/2026 — Bootstrap autorizado:** inicialização técnica solicitada pela usuária, com template Svelte + TypeScript + Vite e binário Rust mínimo, sem funcionalidades. Estrutura Rust criada manualmente por ausência de Cargo. Documentação e comandos atualizados; decisões de produto D01–D14 e tarefas T01–T08 preservadas.

- **10/11/2026 — Organização documental:** decisões D01–D14 preservadas, navegação e tarefas de planejamento acrescentadas, repetição de conversa removida e regras organizadas em docs/rules/. Nenhuma proposta de produto foi promovida a decisão.

- **06/11/2026 — Registro inicial:** consolidação das decisões D01 a D10, incluindo orçamento para encomendas, chat interno e pagamento integrado. Propostas ainda não confirmadas foram mantidas em uma seção própria.
- **06/11/2026 — Pagamento integral:** confirmação da decisão D11. Inclusão de uma proposta de proteção para compradores e vendedores, com fontes brasileiras e pendências sobre repasse, disputas e regras para personalizados. As políticas seguem em discussão.
- **06/11/2026 — Repasse após entrega:** confirmação da decisão D12 e inclusão da comparação entre Shopee, Mercado Livre e o modelo histórico do Elo7 documentado em 2023. Janela de sete dias para repasse apresentada como proposta, ainda não aprovada.
- **06/11/2026 — Pesquisa sobre o encerramento do Elo7:** inclusão dos motivos declarados pela Enjoei, indicadores do Elo7 e aprendizados propostos para o projeto. Nenhuma nova decisão de produto foi confirmada nessa pesquisa.
- **06/11/2026 — Revisão das lacunas:** organização das pendências em seis grupos e proposta de começar pela definição da primeira versão. O prazo de sete dias para repasse permanece sem confirmação.
- **10/11/2026 — Aprendizado de IA aplicada:** inclusão da D13 e da visão geral das áreas técnicas, com funcionalidades candidatas, aplicações no desenvolvimento e experimentos. Nenhuma funcionalidade adicional de IA ou stack foi aprovada nesta etapa.
- **10/11/2026 — Aprendizado e portfólio:** confirmação da D14. Apresentação de duas abordagens de organização, com recomendação de projeto integrador modular. Sandbox financeiro, entregas simuladas e evidências técnicas seguem como propostas.

## Regra para atualização

Registrar novas decisões com ID estável após confirmação na conversa. Não renumerar decisões existentes nem concluir tarefas sem evidências. Manter objetivo, dependências e critérios de aceite atualizados. Quando uma decisão mudar, atualizar seu conteúdo e anotar a mudança no histórico. Manter hipóteses e propostas identificadas até serem confirmadas.
