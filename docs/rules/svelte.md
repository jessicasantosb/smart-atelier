# Svelte — frontend

Frontend com Svelte 5, TypeScript, SvelteKit 3 e Vite+ 1.5.1. SvelteKit controla rotas, carregamento de páginas, renderização e integração com o backend quando ela for definida. Mantenha regras de negócio e dados autoritativos no backend Rust; não use endpoints ou actions do SvelteKit como uma segunda API de domínio. Consulte `frontend/package.json` e `frontend/bun.lock` para as dependências. A página inicial ainda preserva a tela de demonstração do template. Todo texto visível na interface deve estar em inglês, conforme o [AGENTS.md](../../AGENTS.md); a documentação pode permanecer em português.

## Organização e estado

- Organize por funcionalidade, com componentes focados, repositórios para chamadas HTTP e módulos reutilizáveis para dados/estado. Evite componentes que concentrem tela, persistência e regras de negócio.
- Reutilize componentes existentes sempre que possível. Se o projeto não tiver o componente de interface necessário, adicione-o com `bun x shadcn-svelte@latest add <component>`; inicialize shadcn-svelte com `bun x shadcn-svelte@latest init` somente quando `components.json` ainda não existir.
- Prefira TypeScript na configuração inicial, com props e contratos tipados. Trate respostas externas como dados a validar; tipos estáticos não validam JSON recebido.
- Mantenha estado próximo de quem o utiliza; compartilhe apenas o necessário. Evite estado global mutável para dados privados, especialmente entre requisições se houver renderização no servidor.
- No Svelte 5, use `$state` para estado reativo, `$derived` para valores calculados e `$effect` para efeitos externos. Evite efeitos apenas para copiar ou sincronizar valores que podem ser derivados.
- Respeite ownership das props; comunique alterações por contratos explícitos. Remova listeners, timers e assinaturas ao encerrar seu uso.
- Em listas com identidade, use chaves estáveis. Evite requisições duplicadas e resultados antigos sobrescrevendo consultas mais recentes.

## Experiência e segurança

- Modele carregamento, vazio, sucesso e erro; forneça retorno em ações assíncronas e previna envios duplicados.
- Use HTML semântico, labels, navegação por teclado e foco visível. Trate mensagens de erro e atualização de forma acessível; não silencie avisos de acessibilidade sem justificativa.
- Mantenha layout responsivo e reutilize padrões visuais existentes. Textos de interface, incluindo erros, rótulos e textos alternativos, devem estar em inglês; a documentação pode permanecer em português.
- Validação no cliente ajuda o usuário; regras de negócio, permissões e pagamentos continuam sob validação do backend.
- Não exponha segredos no bundle ou configuração pública. Evite `{@html}` com conteúdo não confiável; quando indispensável, use uma estratégia de sanitização apropriada.
- Considere SSR no carregamento inicial: isole acesso a APIs do navegador e mantenha dados privados no escopo da requisição. Use os mecanismos de rota do SvelteKit para carregamento de página sem transferir regras de negócio do backend.

## Verificação

- Use Bun via mise e os scripts reais de `frontend/package.json`: `bun install --frozen-lockfile`, `bun run check`, `bun run test`, `bun run lint`, `bun run format:check` e `bun run build`. Não introduza ferramentas redundantes.
- Use Vite+ (`vp check`, `vp lint`, `vp fmt`, `vp test`, `vp dev` e `vp build`) conforme os scripts de `frontend/package.json`. Oxlint aplica lint e Oxfmt formata, inclusive `.svelte` com a opção Svelte habilitada.
- O `bun run check` combina `vp check`, `svelte-check` e TypeScript. Mantenha desativados `typeAware` e `typeCheck` do Oxlint: eles reportam falsos erros nos exports de componentes gerados pelo Svelte. Use `svelte-check` e TypeScript como fontes de validação de tipos.
- Use Vitest e Svelte Testing Library para testar comportamento observável de componentes em ambiente jsdom. Nomeie os testes pelo comportamento e cenário; evite verificar detalhes internos do componente.
- Execute os testes direcionados durante a implementação e `bun run test` antes de commit/PR. Não afirme que testes passaram sem executá-los.
- Verifique tipos, acessibilidade e comportamento das jornadas afetadas. Teste estados de falha e permissões relevantes, preferindo interações observáveis a detalhes internos.
- Use testes ponta a ponta para jornadas críticas quando existirem. Não apresente build aprovado como comprovação de todas as regras de negócio.

Referências oficiais: [estado derivado](https://svelte.dev/docs/svelte/$derived), [efeitos](https://svelte.dev/docs/svelte/$effect) e [boas práticas](https://github.com/sveltejs/svelte/blob/main/documentation/docs/07-misc/01-best-practices.md). Consulte a documentação correspondente à versão escolhida.
