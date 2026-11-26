# Frontend — Smart Atelier

O protótipo usa SolidJS 2.0.4, TypeScript com TSX, Solid Router 2.0.1 e Tailwind CSS 4. Vite+ 1.5.1 cuida do servidor de desenvolvimento, build, formatação, lint e testes. As jornadas do artesão e do comprador usam dados locais simulados. Consulte o [design da Fase 2](../docs/phase-2-ux-design.md) para os caminhos da demonstração.

## Desenvolvimento local

Execute `mise install` na raiz para instalar as versões declaradas em [mise.toml](../mise.toml). O plugin do Solid e o Vite+ usam Node.js 24.22.3. Na pasta `frontend/`, use Bun 1.4.4 para instalar as dependências versionadas em `bun.lock` e iniciar o frontend.

```sh
mise exec -- bun install --frozen-lockfile
mise exec -- bun run dev
```

A API padrão é `http://localhost:3000`. Para apontar para outra origem, copie `.env.example` para `.env`, ajuste `VITE_API_BASE_URL` e reinicie o servidor. A variável é pública no navegador. Configure o CORS da API para aceitar a origem em que o frontend roda. O sinal de status consulta `/health/live`. As páginas simuladas continuam navegáveis com a API desligada.

## Comandos

Execute os comandos na pasta `frontend/`. Use o prefixo `mise exec --` se Bun ainda não estiver disponível no terminal.

| Comando                | Função                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `bun run dev`          | Inicia o servidor de desenvolvimento.                                               |
| `bun run check`        | Executa `vp check` e verifica os tipos com TypeScript.                              |
| `bun run test`         | Executa testes de unidade e de componentes com Vitest, DOM Testing Library e jsdom. |
| `bun run test:watch`   | Executa os testes em modo de observação.                                            |
| `bun run lint`         | Executa Oxlint pelo Vite+.                                                          |
| `bun run format`       | Formata TypeScript, TSX, CSS e configuração com Oxfmt.                              |
| `bun run format:check` | Verifica formatação.                                                                |
| `bun run build`        | Gera o build estático em `dist/`.                                                   |
| `bun run preview`      | Abre uma prévia local do build.                                                     |

## Estrutura

- `src/main.tsx` monta a aplicação com `@solidjs/web`.
- `src/App.tsx` registra as rotas no Solid Router. As páginas ficam em `src/routes/` e usam `@solidjs/meta` para metadados do documento.
- `src/lib/components/` reúne componentes compartilhados. Os dados simulados ficam em `src/lib/prototype/` e a consulta à API Rust, em `src/lib/api/`.
- `static/` contém os arquivos públicos, copiados para o build.

## Hospedagem

Sirva `dist/` com um servidor de arquivos estáticos e configure o fallback para `index.html` nas rotas da SPA. Isso permite abrir e recarregar endereços públicos como `/produto/blue-ceramic-vase`. Defina `VITE_API_BASE_URL` no ambiente do build e configure o CORS no backend. A hospedagem permanente ainda está em aberto.

Consulte as [regras de SolidJS](../docs/rules/solid.md) antes de trabalhar no frontend.
