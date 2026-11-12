# Registro de decisões — aplicação de artesanato

Última atualização: 11/11/2026.

Este arquivo acompanha o planejamento da aplicação. As decisões confirmadas estão separadas das propostas e das questões em aberto. Será atualizado conforme a conversa avançar. Ainda não é a especificação final do projeto nem um plano de implementação aprovado.

## Como ler este registro

- **Confirmado:** decisões D01–D17, que orientam o produto e a arquitetura aprovada.
- **Proposta:** alternativa para discussão, sem autorização de implementação.
- **Em aberto:** definição necessária antes da entrega correspondente.
- **Pesquisa:** referência histórica com data e fonte; não equivale a decisão.
- **Tarefa de planejamento:** trabalho para esclarecer escopo e critérios, sem funcionalidade entregue.

**Estado atual:** planejamento do produto, com bootstrap técnico autorizado em 10/11/2026: Svelte 5 + TypeScript + SvelteKit 3 + Vite+ 1.5.1 e binário Rust edição 2024. Não há funcionalidades de domínio. Framework HTTP, banco e provedores ainda precisam ser escolhidos. O projeto integrador modular permanece uma recomendação não confirmada.

### Navegação

- [Objetivo](#objetivo)
- [Decisões confirmadas](#decisões-confirmadas)
- [Tarefas de planejamento](#tarefas-de-planejamento)
- [Plano de conteúdos de IA](ia-study-plan.md)
- [Roadmap de fases](../ROADMAP.md)
- [Questões em aberto](#questões-em-aberto)
- [Histórico](#histórico)

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

O pagamento acontecerá dentro da aplicação, por meio de uma integração de pagamentos. O provedor ainda não foi escolhido.

### D10 — Dashboard

O vendedor terá um dashboard completo, com gráficos de suas vendas. Os indicadores específicos ainda serão definidos.

### D11 — Pagamento das encomendas

O comprador pagará o valor integral após aceitar o orçamento e antes do início da produção. Não haverá divisão em sinal e restante nesse fluxo.

### D12 — Repasse ao vendedor

O vendedor receberá depois da entrega. O prazo exato, a comprovação da entrega e as regras para disputas ainda serão definidos, com validação do provedor de pagamentos.

### D13 — Abrangência de aprendizado

Desenvolver competências de engenharia de software e IA aplicada de forma ampla e coerente com o projeto. A escolha de novas funcionalidades e tecnologias continua em discussão.

### D14 — Finalidade do projeto

O projeto será voltado a aprendizado e construção de portfólio. Operação comercial com clientes reais não é o objetivo atual.

### D15 — Plano de aprendizado técnico

O aprendizado técnico usa Svelte no frontend e Rust no backend. O plano de conteúdos organiza aplicação no produto, exercícios independentes e estudo teórico. Laboratórios não se tornam funcionalidades obrigatórias do marketplace.

### D16 — Escopo do aprendizado

O plano não inclui atividades de carreira e entrevistas. Documentação, demonstração e avaliação técnica do projeto integrador fazem parte do trabalho; OKRs permanecem como assunto de gestão do projeto.

### D17 — Framework do frontend

O frontend usará SvelteKit 3 sobre Svelte 5 e TypeScript. SvelteKit será responsável por rotas, carregamento e renderização da aplicação. Regras de negócio e dados autoritativos permanecem no backend Rust; a escolha do framework HTTP do backend continua em aberto. `adapter-auto` fica configurado até a hospedagem ser definida.

## Tarefas de planejamento

Organização proposta das pendências existentes, sem prazo, responsável ou implementação aprovados. Todas estão **a definir**. A sequência orienta a discussão; não é compromisso de execução.

| ID | Tarefa e resultado esperado | Dependências | Critério de conclusão do planejamento |
| --- | --- | --- | --- |
| T01 | Escolher projeto integrador modular ou estudos independentes. | D13 e D14. | Escolha confirmada, com justificativa e consequências registradas. |
| T02 | Delimitar a primeira demonstração e seus objetivos de aprendizado. | T01. | Jornada, escopo incluído/excluído, dados e evidências esperadas definidos. |
| T03 | Definir conta, loja e trabalho: papéis, quantidade de lojas, visibilidade e disponibilidade. | T02; D02–D05. | Regras e cenários de aceite revisados, distinguindo registro, vitrine e venda. |
| T04 | Detalhar orçamento, chat e pedido: conteúdo, aceite, alterações e acompanhamento. | T02 e T03; D06–D08 e D11. | Fluxo, estados, permissões, erros e critérios de aceite descritos. |
| T05 | Definir entrega, pagamento e repasse, avaliando a viabilidade do provedor. | T02 e T04; D09, D11 e D12. | Provedor, ambiente, comprovação, prazos, disputas e responsabilidades definidos. Sete dias segue proposta. |
| T06 | Definir indicadores e necessidades de suporte. | T02; eventos de pedido e pagamento; D10. | Indicadores têm significado, fonte e exemplos; suporte e permissões descritos. |
| T07 | Selecionar a primeira experiência de IA, se incluída na demonstração. | T02; D13 e D14. | Tarefa, dados autorizados, revisão humana, baseline, métricas e limites de custo definidos. |
| T08 | Consolidar arquitetura e especificação da entrega para revisão. | T02 e definições T03–T07 aplicáveis ao recorte. | Contratos frontend/backend, persistência, versões, testes e integrações documentados; pendências explícitas e aprovação registrada antes de implementar. |

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

- Quem cria uma loja continua podendo comprar usando a mesma conta.
- Separar a visibilidade de um trabalho da sua disponibilidade para venda: registro privado, portfólio público sem venda e anúncio disponível para compra.
- Oferecer compra direta para peças prontas, com preço e quantidade disponíveis cadastrados pelo vendedor.
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

### Próxima etapa proposta: escolher a organização e definir a primeira entrega

Escolher entre projeto integrador modular e coleção de projetos menores. Depois, definir a primeira entrega demonstrável e seus critérios de conclusão para aprendizado e portfólio. A ordem abaixo organiza a discussão; não confirma funcionalidades adicionais.

| Grupo                          | Definições que faltam                                                                                                                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primeira versão e demonstração | Casos demonstrados, categorias usadas no catálogo de exemplo, site ou aplicativo, prioridades, prazo, recursos disponíveis e critérios para avaliar o aprendizado e a qualidade da entrega.                                                           |
| Loja e catálogo                | Requisitos para criar loja, uma ou várias lojas por pessoa, continuidade do papel de comprador, visibilidade dos trabalhos, dados das peças e controle de estoque das peças prontas.                                                                  |
| Descoberta e compra            | Como encontrar trabalhos e lojas, busca e filtros necessários, necessidade de favoritos e avaliações, compra direta e pedido de uma loja por vez ou carrinho com várias lojas. O carrinho afeta frete, divisão do pagamento e disputas.               |
| Encomendas e chat              | Conteúdo e validade dos orçamentos, aceite, mudanças no combinado, prazos de produção, estados do pedido e recursos essenciais da conversa e das notificações.                                                                                        |
| Entrega, pagamentos e receita  | Cotação e cobrança do frete, rastreamento, possibilidade de retirada, prova de entrega, prazo de repasse, regras de disputa, provedor de pagamentos e forma de cobrança da plataforma.                                                                |
| Operação e dashboard           | Responsáveis pelo suporte e pela mediação, permissões administrativas internas, moderação, cancelamentos, indicadores e filtros do dashboard. Lucro do artesão exigiria registrar custos; receita e saldo a receber precisam ter definições próprias. |

Depois dessas definições, comparar abordagens de construção, propor a arquitetura e as integrações, e consolidar a especificação para revisão e aprovação. O registro de decisões não substitui essa especificação. Somente o bootstrap técnico foi criado; a implementação das funcionalidades não foi iniciada.

### Pendência: prazo e confirmação da entrega para repasse

- Proposta ainda não aprovada: disponibilizar o repasse sete dias após a entrega confirmada, se não houver disputa aberta que impeça a liberação, conforme as regras informadas e a capacidade do provedor.
- Definir como a entrega será comprovada e como contestar uma confirmação incorreta.
- Esse prazo operacional de repasse não será tratado como prazo final para todos os direitos de reclamação, devolução ou reembolso.

## Histórico

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


