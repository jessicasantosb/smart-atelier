# Frontend — Smart Atelier

Template oficial `svelte-ts` do create-vite 9.3.4: Svelte 5, TypeScript e Vite 8, sem SvelteKit. Tela, estilos e contador originais preservados; ainda não há funcionalidades do marketplace.

Use Node compatível com Vite 8 (20.19+ ou 22.12+ nas linhas suportadas) e npm.

```sh
npm ci
npm run dev
```

- `npm run check`: svelte-check e TypeScript.
- `npm run build`: build de produção.
- `npm run preview`: prévia local do build.

As dependências resolvidas estão em package-lock.json. Não há lint ou testes automatizados configurados. Consulte as [regras Svelte](../docs/rules/svelte.md) antes de implementar funcionalidades.

Na inicialização, svelte-check retornou zero erros e avisos, TypeScript passou e o build foi concluído. Os executáveis locais foram chamados via Node, pois npm só estava disponível temporariamente. A instalação reportou dois alertas de vulnerabilidade de baixa severidade; nenhuma atualização automática foi aplicada.
