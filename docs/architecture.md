# Arquitetura — estado inicial

Atualizado em 10/11/2026. Este documento descreve o bootstrap existente, sem aprovar uma arquitetura completa de produto.

| Área | Estado |
| --- | --- |
| Frontend | Svelte 5, TypeScript e Vite 8; template oficial `svelte-ts`, sem SvelteKit, rotas de produto ou integração com backend. Faixas de versões em `frontend/package.json`, resolução no lockfile. |
| Backend | Binário Rust independente, edição 2024, sem dependências. `src/main.rs` imprime Hello, world!. Estrutura equivalente ao init, criada manualmente por ausência de Cargo. |
| Persistência | Diretório reservado, sem banco, schema ou migrações. |
| Comunicação | Ainda não há servidor HTTP, contratos implementados ou chamadas entre frontend e backend. |

## Organização futura

As regras em [docs/rules](rules/README.md) orientam a evolução por funcionalidade. Casos de uso, repositórios, adaptadores e transações serão introduzidos quando houver comportamento aprovado que os justifique; o init não cria camadas vazias.

Framework HTTP, runtime assíncrono, banco, autenticação, hospedagem, pagamentos e ferramentas de IA continuam pendentes. O bootstrap não escolhe entre projeto integrador e coleção de estudos nem conclui as tarefas T01–T08 de [docs/decisions.md](docs/decisions.md).

Consulte o [README](../README.md) para requisitos e comandos locais. A configuração é independente por diretório; não há workspace Cargo na raiz.
