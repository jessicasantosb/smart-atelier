# Fase 2 — proposta de UX e protótipo

**Estado:** aprovada pela usuária em 12/11/2026.

**Implementação:** protótipo navegável em SolidJS com Solid Router, disponível nas rotas públicas e de demonstração. A fase permanece em revisão até a usuária percorrer as jornadas e confirmar clareza, responsividade e acessibilidade.

### Rotas implementadas

- `/` — entrada pública com links para a peça de exemplo e para o espaço do artesão.
- `/atelier` e `/atelier/pecas/nova` — área do artesão e editor com rascunho de IA simulado.
- `/loja/:slug` e `/produto/:slug` — loja e peça públicas. Slugs inválidos mostram a página de não encontrado.
- `/checkout/entrar`, `/checkout/endereco` e `/checkout/pagamento` — entrada visual, formulário de endereço e prévia de checkout hospedado.
- `/pedidos/:id` — linha do tempo ilustrativa do pedido pago, entregue e com transferência de teste iniciada.
- Rotas ou registros inexistentes mostram uma página com link de retorno à entrada pública.

Todas as ações usam fixtures locais. Nenhum cadastro, alteração de produto, endereço, pagamento, rastreamento ou repasse é persistido ou enviado a provedores externos.

## Objetivo

Criar um protótipo navegável em SolidJS para avaliar as jornadas da demonstração antes de implementar regras de negócio. O protótipo usará conteúdo e estados simulados, sem autenticação, persistência, Stripe, Ship24 ou chamadas de IA reais.

## Pessoas e jornada

- **Artesão:** cria uma conta e uma loja, prepara uma peça pronta, revisa a sugestão de texto, conclui a etapa visual de Connect de teste e publica a peça.
- **Comprador:** abre a página pública da loja ou peça, autentica-se antes de comprar, informa o endereço, segue para o checkout hospedado simulado e acompanha o pedido até entrega e transferência de teste.

Os caminhos refletem a demonstração aprovada em T02. Encomendas, chat, carrinho, descoberta por busca, pagamento real, devolução e disputa ficam fora do protótipo.

## Telas do protótipo

1. **Entrada pública:** descoberta por links de exemplo e convite para abrir uma loja; sem catálogo de busca.
2. **Espaço do artesão:** estado da loja e acesso claro a cadastrar peça, ver a loja e consultar pedidos.
3. **Cadastro da peça:** fotos ilustrativas, materiais, técnica, medidas, preço e quantidade; rascunho de título/descrição pré-preenchido e editável, identificado como simulado.
4. **Loja e peça públicas:** identidade do artesão, fotos em destaque, detalhes da peça e compra direta de um único item.
5. **Entrada do comprador:** gate visual de autenticação, com opções própria e Google representadas sem autenticação real.
6. **Endereço e revisão:** formulário ilustrativo de entrega e resumo do pedido antes da saída para o provedor.
7. **Checkout hospedado:** tela explicativa que representa a transferência para checkout de teste, sem coletar cartão.
8. **Pedido e entrega:** linha de estados ilustrativa de pago, enviado, entregue e transferência de teste; sem integração com rastreador ou banco.

As telas poderão ser percorridas por links e ações locais com dados demonstrativos. Cada etapa exibirá uma identificação discreta de protótipo quando isso evitar confusão com operação real.

## Direção visual proposta

**Conceito:** catálogo de peças com ritmo editorial e ferramentas de oficina contidas. A imagem principal e a descrição do trabalho ocupam o foco; a área de gestão é simples e densa apenas onde ajuda a cadastrar e acompanhar. Como o repositório não contém fotos de artesanato, o protótipo usará uma ilustração vetorial local para a peça de exemplo.

| Token                 | Cor       | Uso                                             |
| --------------------- | --------- | ----------------------------------------------- |
| Mineral               | `#F4F6F5` | Fundo geral                                     |
| Branco                | `#FFFFFF` | Superfícies e campos                            |
| Tinta azul-esverdeada | `#17242C` | Texto principal e navegação                     |
| Azul cobalto          | `#2856D8` | Ação principal e foco                           |
| Vermelho óxido        | `#C65039` | Destaques pontuais e estados que exigem atenção |
| Verde folha           | `#3A715E` | Confirmações e progresso positivo               |

- **Tipografia:** Inter Variable já instalada no projeto. Pesos 400/500 para leitura e controles; 600/700 para hierarquia. Uma família mantém a interface funcional e deixa as peças trazerem sua própria personalidade.
- **Alinhamento e estrutura:** navegação consistente no topo; conteúdo alinhado à esquerda. Na página da peça, usar grade assimétrica com imagem dominante e painel de compra adjacente; no celular, imagem, informação e ação em coluna.
- **Princípios:** imagens grandes em vez de cartões repetidos; poucas divisórias; ações com rótulos que descrevem o resultado; controles próximos dos dados que alteram. Evitar estética de dashboard SaaS genérico.
- **Tailwind e componentes:** classes utilitárias Tailwind para layout, espaçamento e estados; reutilizar `Button` e componentes Solid compatíveis com a versão do projeto. Não criar blocos extensos de CSS por página.

### Esboço — página pública do produto

```text
┌ Smart Atelier ───────────────── Explorar ────── Entrar ┐
│                                                        │
│  ┌─────────────────────────┐   Blue ceramic vase     │
│  │                         │   by Cera Atelier        │
│  │   imagem da peça        │   Handmade ceramics     │
│  │                         │   R$ 240,00              │
│  └─────────────────────────┘   Peça única disponível  │
│                                 [Comprar esta peça]    │
│                                 Sobre o trabalho ...  │
└────────────────────────────────────────────────────────┘
```

### Esboço — cadastro de peça

```text
┌ Cera Atelier ─── Overview ─ Pieces ─ Orders ──────────┐
│ Nova peça                                               │
│ ┌──────────────────────┐  Título                       │
│ │ fotos da peça        │  [________________________]   │
│ │                      │  Descrição                    │
│ └──────────────────────┘  [________________________]   │
│                         Materiais, técnica, medidas     │
│                         Preço e quantidade             │
│                         [Gerar rascunho — simulado]     │
│                         [Salvar rascunho] [Publicar]    │
└────────────────────────────────────────────────────────┘
```

## Acessibilidade e responsividade

- HTML semântico, labels associados, navegação por teclado, foco visível e alvos de toque confortáveis.
- Contraste mínimo WCAG AA para texto normal; cor não é o único meio de comunicar estados.
- Texto alternativo descritivo para imagens demonstrativas e estados anunciados por leitor de tela.
- Layout funcional em viewport estreito e amplo; formulários mantêm ordem de leitura e mensagens de erro associadas ao campo.

## Critério de revisão

- Completar o percurso demonstrativo usando apenas links e dados simulados, sem telas sem saída.
- Revisar com a usuária a clareza das duas jornadas e a distinção entre protótipo e integrações reais.
- Verificar teclado, foco, rótulos, contraste e largura móvel antes de marcar a fase 2 como concluída.

## Decisões aprovadas

- Direção visual mineral/cobalto e hierarquia fotográfica descritas acima.
- Conjunto das oito telas e escopo dos estados simulados.
- Usar o protótipo para uma avaliação guiada, sem alegar pesquisa com participantes externos.
