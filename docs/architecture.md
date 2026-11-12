# Arquitetura — estado inicial

Atualizado em 11/11/2026. Este documento descreve o estado técnico atual, sem aprovar uma arquitetura completa de produto.

| Área | Estado |
| --- | --- |
| Frontend | Svelte 5, TypeScript, SvelteKit 3 e Vite+ 1.5.1 (Vite 8/Rolldown). A rota inicial ainda exibe a tela de demonstração do template; não há fluxos do marketplace nem integração com backend. O layout, roteamento, renderização e build usam SvelteKit. `adapter-auto` está configurado provisoriamente enquanto a hospedagem não é escolhida. Bun 1.4.4 é fixado em `mise.toml`, dependências em `frontend/bun.lock`. Oxlint e Oxfmt fazem lint e formatação, incluindo `.svelte`; `svelte-check` e TypeScript verificam os componentes. Testes usam Vitest 5.1, Svelte Testing Library e jsdom. |
| Backend | Binário Rust independente, edição 2024, sem dependências. A versão Rust 1.99.1, Cargo, rustfmt e Clippy são declarados em `mise.toml`. `src/main.rs` imprime Hello, world!. Estrutura equivalente ao init, criada manualmente por ausência de Cargo no bootstrap; as verificações do backend ainda precisam ser executadas. |
| Persistência | Diretório reservado, sem banco, schema ou migrações. |
| Comunicação | Ainda não há servidor HTTP, contratos implementados ou chamadas entre frontend e backend. |

## Organização futura

As regras em [docs/rules](rules/README.md) orientam a evolução por funcionalidade. Casos de uso, repositórios, adaptadores e transações serão introduzidos quando houver comportamento aprovado que os justifique; o init não cria camadas vazias.

Framework HTTP e runtime assíncrono do backend, banco, autenticação, hospedagem, pagamentos e ferramentas de IA continuam pendentes. SvelteKit foi escolhido para o frontend (D17); sua inclusão não define o framework HTTP do Rust nem duplica regras de negócio no frontend. O bootstrap não escolhe entre projeto integrador e coleção de estudos nem conclui as tarefas T01–T08 de [decisions.md](decisions.md).

Consulte o [README](../README.md) para requisitos e comandos locais. A configuração é independente por diretório; não há workspace Cargo na raiz.
