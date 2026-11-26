# SolidJS — frontend

O protótipo da Fase 2 usa SolidJS 2.0.4, TypeScript com TSX, Solid Router e Tailwind CSS 4. O Solid Router organiza as rotas da SPA. Chamadas à API Rust ficam em módulos da funcionalidade. Autorização, regras de negócio e dados autoritativos permanecem no backend. Consulte `frontend/package.json` e `frontend/bun.lock` para as dependências e o [guia do frontend](../../frontend/README.md) para os comandos.

## Organização e estado

- Agrupe telas e componentes por funcionalidade. Use componentes compartilhados para os padrões de interface que se repetem e isole chamadas HTTP em módulos como `src/lib/api`.
- Reutilize os componentes do projeto, incluindo `Button`. Use HTML semântico e Tailwind para controles simples. Quando precisar de uma biblioteca de componentes, verifique a compatibilidade com a versão de SolidJS, o comportamento por teclado e a gestão de foco.
- Use TypeScript para tipar props e contratos. Valide dados recebidos da API em tempo de execução.
- Mantenha estado perto de quem o usa. Use `createSignal` para estado reativo, `createMemo` para valores derivados quando houver benefício e efeitos para sincronizar com sistemas externos. Leia as props reativas no ponto de uso e preserve a reatividade ao delegá-las a outro componente.
- Use `onCleanup` para encerrar listeners, temporizadores e assinaturas ligados ao ciclo de vida do componente. Evite requisições duplicadas e impeça respostas antigas de sobrescrever consultas mais recentes.

## Experiência e segurança

- Modele estados de carregamento, vazio, sucesso e erro. Forneça retorno para operações assíncronas e previna envios duplicados.
- Use HTML semântico, rótulos associados aos campos, navegação por teclado e foco visível. Anuncie mudanças de estado e associe mensagens de erro aos campos relevantes.
- Preserve o layout responsivo e a identidade visual da Fase 2. Código, rótulos, erros, textos alternativos e demais textos de interface devem estar em inglês conforme o [AGENTS.md](../../AGENTS.md).
- Use links para navegação e botões para ações. Mantenha as páginas públicas acessíveis por URL direta e ofereça retorno útil em rotas desconhecidas.
- Validação no cliente orienta o usuário. O backend deve validar regras de negócio, permissões e confirmações de pagamento.
- Trate variáveis `VITE_*` como públicas. Mantenha segredos no backend e evite inserir conteúdo externo com `innerHTML`.

## Verificação

- Use Bun via mise e os scripts de `frontend/package.json`. Rode `bun install --frozen-lockfile`, `bun run check`, `bun run lint`, `bun run format:check`, `bun run test` e `bun run build` conforme o [AGENTS.md](../../AGENTS.md).
- Vite+ integra Oxlint, Oxfmt e Vitest. O comando `bun run check` executa `vp check` e o compilador TypeScript para validar arquivos TypeScript e TSX.
- Use Vitest e DOM Testing Library em jsdom para testar comportamento observável. Em mudanças de navegação, cubra entrada direta, links principais, caminhos desconhecidos e os estados afetados.
- Valide em navegador os fluxos alterados, incluindo teclado, foco, acessibilidade e layout responsivo. Registre resultados observados e limites restantes.

Consulte a [referência oficial de SolidJS](https://docs.solidjs.com/reference/) e a [documentação do Solid Router](https://docs.solidjs.com/reference/solid-router/).
