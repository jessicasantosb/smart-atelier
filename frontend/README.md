# Frontend — Smart Atelier

Frontend com Svelte 5, TypeScript e SvelteKit 3, executado pelo Vite+ 1.5.1. A rota inicial mantém a tela de demonstração do template; ainda não há funcionalidades do marketplace. SvelteKit fornece roteamento, carregamento de páginas e renderização. `@sveltejs/adapter-auto` está configurado até que a hospedagem seja definida.

Use Bun 1.4.4 declarado em `mise.toml` e Node.js 22.17 ou superior, requisito mínimo do SvelteKit 3.

```sh
bun install --frozen-lockfile
bun run dev
```

- `bun run check`: sincroniza os tipos do SvelteKit, executa Vite+ check, svelte-check e TypeScript.
- `bun run test`: testes unitários e de componentes com Vitest.
- `bun run test:watch`: executa os testes em modo de observação.
- `bun run lint`: lint com Oxlint, integrado pelo Vite+.
- `bun run format`: formata arquivos do frontend, incluindo componentes Svelte, com Oxfmt.
- `bun run format:check`: verifica formatação sem alterar arquivos.
- `bun run build`: build de produção.
- `bun run preview`: prévia local do build.

As dependências resolvidas estão em `bun.lock`; `package-lock.json` foi removido para manter Bun como único gerenciador de pacotes. Vite+ integra Vite/Rolldown, Oxlint, Oxfmt e Vitest. `svelte-check` e TypeScript complementam `vp check` para verificar os componentes Svelte. Os testes de componentes usam Svelte Testing Library em ambiente jsdom. Consulte as [regras Svelte](../docs/rules/svelte.md) antes de implementar funcionalidades.

Validação da integração SvelteKit: `bun install --frozen-lockfile`, `bun run check`, `bun run test`, `bun run format:check` e `bun run build` passaram. O adapter automático concluiu o build, mas ainda não seleciona um destino de produção porque a hospedagem não foi definida.
