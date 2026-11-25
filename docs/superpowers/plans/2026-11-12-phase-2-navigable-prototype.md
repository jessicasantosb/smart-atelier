# Protótipo navegável da fase 2 — plano de implementação

> **Para agentes de implementação:** SUB-SKILL OBRIGATÓRIA: use `superpowers:executing-plans` e execute as tarefas em ordem. Acompanhe cada passo com caixas de seleção.

**Objetivo:** entregar no Svelte um protótipo navegável e responsivo das jornadas demonstrativas do artesão e do comprador, usando somente dados locais simulados.

**Arquitetura:** o SvelteKit terá rotas para a entrada, área do artesão, loja/produto públicos e etapas simuladas do comprador. Componentes compartilhados cuidam de navegação, aviso de protótipo e saúde da API; dados fixos ficam em módulo local, sem persistência nem integração financeira.

**Stack:** Svelte 5, TypeScript, SvelteKit 3, Tailwind CSS 4, Vite+ 1.5.1, Vitest 5.1, Testing Library e o shadcn-svelte Button existente.

**Especificação:** [docs/phase-2-ux-design.md](../../phase-2-ux-design.md)

## Restrições globais

- Todo texto da aplicação, identificadores, código, comentários e testes permanecem em inglês.
- Use Tailwind para estilos das páginas; não adicione blocos `<style>` nem dependências.
- Reutilize Button de `frontend/src/lib/components/ui/button/`; não crie componentes shadcn duplicados.
- Cadastro, publicação, checkout, rastreamento e transferência são simulados; não faça chamadas externas nem grave dados.
- A prévia de pagamento não coleta dados de cartão.
- Preserve a checagem de saúde da API da fase 1 no shell compartilhado.
- Preserve alterações existentes em `frontend/src/lib/Counter.svelte` e arquivos fora do escopo.

## Foco de revisão

1. Slug de loja, produto ou pedido desconhecido: apresentar estado de não encontrado com retorno à entrada; testar as funções de busca e as rotas.
2. API indisponível: o shell continua navegável e mostra `Backend is unavailable`; testar falha de rede.
3. Rascunho sugerido: identificá-lo como simulado e exigir ação explícita para abrir a prévia; testar o aviso e a ação.
4. Checkout: deixar claro que é apenas uma prévia e não solicitar dados de pagamento; testar aviso e ausência de campos de cartão.
5. Teclado e viewport estreito: manter ordem de foco, foco visível e conteúdo sem rolagem horizontal; revisar no navegador móvel e desktop.

---

### Tarefa 1: Dados de demonstração e shell compartilhado

**Arquivos:**

- Criar: `frontend/src/lib/prototype/mock-data.ts`, `frontend/src/lib/prototype/mock-data.test.ts`
- Criar: `frontend/src/lib/components/prototype/PrototypeShell.svelte`, `ApiStatus.svelte`, `ApiStatus.test.ts`, `DemoNotice.svelte`
- Criar: `frontend/static/prototype/blue-ceramic-vase.svg`
- Modificar: `frontend/src/routes/+layout.svelte`, `frontend/src/routes/+page.svelte`, `frontend/src/app.css`
- Remover: `frontend/src/App.svelte` depois de confirmar que não há outros imports.

**Interfaces:** `findShopBySlug(slug: string): Shop | undefined`, `findProductBySlug(slug: string): Product | undefined`, `findOrderById(id: string): DemoOrder | undefined`. O produto usa preço em centavos `24000`, moeda `BRL` e quantidade `1`; o pedido usa os estados de T02. `PrototypeShell` recebe e renderiza `children` de SvelteKit e contém navegação, aviso de protótipo e `ApiStatus`.

- [x] **Passo 1: teste RED dos dados** — testar loja `cera-atelier`, produto `blue-ceramic-vase` com `24000`, `BRL`, quantidade `1`, e retorno `undefined` para chaves desconhecidas. O teste falhou inicialmente pela ausência do módulo.
- [x] **Passo 2: implementar fixtures e buscas** sem dependências externas; os testes direcionados passaram.
- [x] **Passo 3: teste do estado de API indisponível** — simular falha de `fetch` e verificar `Backend is unavailable` em região acessível.
- [x] **Passo 4: implementar `ApiStatus`, `DemoNotice` e shell** — reutilizar `getBackendHealth`, Button e Tailwind; incluir links de entrada, loja e espaço do artesão.
- [x] **Passo 5: substituir a página inicial e remover estilos obsoletos do template em `app.css`**; preservar imports de Tailwind, shadcn e tokens globais.
- [x] **Passo 6: testar** — os testes passaram; verificações de formato e lint passaram nos 28 arquivos da alteração, e `svelte-check` não reportou problemas. O `bun run check` global continua encontrando arquivos do starter fora deste escopo com problemas de formatação preexistentes.

### Tarefa 2: Jornada do artesão e páginas públicas

**Arquivos:**

- Criar: `frontend/src/routes/atelier/+page.svelte`, `frontend/src/routes/atelier/pecas/nova/+page.svelte`
- Criar: `frontend/src/routes/loja/[slug]/+page.svelte`, `frontend/src/routes/produto/[slug]/+page.svelte`
- Testar: `frontend/src/routes/atelier/atelier.test.ts`, `frontend/src/routes/atelier/pecas/nova/new-piece.test.ts`, `frontend/src/routes/produto/[slug]/product-page.test.ts`

**Interfaces:** páginas consultam as funções de busca da tarefa 1. A loja aponta para a página pública da peça; `Buy this piece` leva a `/checkout/entrar`. A ilustração local substitui imagens de produto externas.

- [x] **Passo 1: teste da área do artesão** — afirmar caminhos para cadastrar peça e abrir loja.
- [x] **Passo 2: implementar área do artesão** com próxima ação clara e resumo usando dados fixos.
- [x] **Passo 3: teste do editor** — afirmar que o rascunho está identificado como `Simulated AI draft` e que as ações não alegam persistência real.
- [x] **Passo 4: implementar editor** com campos rotulados para imagem, título, descrição, materiais, técnica, medidas, preço e quantidade; ações locais apenas para abrir a prévia.
- [x] **Passo 5: teste da página pública** — afirmar título, descrição, preço BRL e link `Buy this piece` para `/checkout/entrar`; buscas de slug desconhecido retornam `undefined`.
- [x] **Passo 6: implementar páginas públicas** de loja e peça, hierarquia editorial e fallback útil para slug inválido.
- [x] **Passo 7: executar testes direcionados e verificações por arquivo alterado.**

### Tarefa 3: Jornada do comprador e pedido demonstrativo

**Arquivos:**

- Criar: `frontend/src/routes/checkout/entrar/+page.svelte`, `endereco/+page.svelte`, `pagamento/+page.svelte`
- Criar: `frontend/src/routes/pedidos/[id]/+page.svelte`
- Testar: `frontend/src/routes/checkout/checkout.test.ts`, `frontend/src/routes/pedidos/[id]/order-page.test.ts`

**Interfaces:** endereço mostra resumo da fixture e campos obrigatórios; checkout não aceita dados de cartão nem chama Stripe; `View sample order` leva a `/pedidos/pedido-demo`; pedido apresenta estados simulados pago, enviado, entregue e transferência de teste.

- [x] **Passo 1: testes do fluxo** — entrada identifica autenticação simulada e oferece continuidade ao endereço; formulário tem labels/campos obrigatórios; prévia explica que não há cobrança e não contém campos de cartão; pedido indica entrega e transferência simuladas.
- [x] **Passo 2: implementar entrada e endereço** com navegação local, sem autenticar, gravar ou enviar dados.
- [x] **Passo 3: teste da navegação** — confirmar que a ação local da prévia abre o pedido demonstrativo.
- [x] **Passo 4: implementar prévia de checkout, linha de estados e fallback para pedido desconhecido.**
- [x] **Passo 5: executar suíte completa (13 testes), `svelte-check`, TypeScript, build e verificações direcionadas.**

### Tarefa 4: Revisão visual, acessibilidade e documentação

**Arquivos:** modificar `docs/phase-2-ux-design.md`; atualizar `ROADMAP.md` somente depois da avaliação e confirmação da usuária.

- [x] **Passo 1: executar a suíte** — `cd frontend; bun run test`; os 13 testes passaram, inclusive Counter.
- [ ] **Passo 2: executar verificações completas** — build, lint, TypeScript e Svelte passaram; o check global permanece com falha de formatação em arquivos de starter fora da mudança.
- [ ] **Passo 3: revisar no navegador** em larguras móvel e desktop; percorrer por teclado; conferir foco, labels e contraste; verificar rota desconhecida e API offline; corrigir problemas encontrados no protótipo.
- [ ] **Passo 4: registrar evidências e limites** — informar que não houve pesquisa com participantes externos; não marcar a fase 2 concluída antes da usuária revisar a experiência.

## Revisão do plano

- Todos os modelos de tela e estados simulados da especificação estão cobertos pelas tarefas 1–3.
- Busca sem resultado, API offline, rascunho simulado, checkout sem coleta de cartão e teclado/viewport têm verificações explícitas.
- Não há dependências novas, integração de negócio, mudanças em `Counter.svelte` ou gravação de estado.
- As tarefas são sequenciais e compartilham fixture e shell; a execução nativa nesta sessão preserva a revisão etapa a etapa.
