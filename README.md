# Smart Atelier

Aplicação de artesanato voltada a aprendizado e portfólio. O repositório contém somente a inicialização técnica; funcionalidades de produto ainda não foram implementadas.

- `frontend/`: template oficial Svelte 5 + TypeScript + Vite, gerado com create-vite 9.3.4.
- `backend/`: binário Rust, edição 2024, sem dependências, servidor ou rotas.
- `database/`: reservado; banco e migrações ainda não definidos.
- [Decisões e planejamento](docs/decisions.md), [estado da arquitetura](docs/architecture.md) e [regras](docs/rules/README.md).

## Frontend

Use Node compatível com Vite 8 (20.19+ ou 22.12+ nas linhas suportadas) e npm. O init foi preparado com Node 24.22.1.

```sh
cd frontend
npm ci
npm run dev
```

Verificações: `npm run check` e `npm run build`. Prévia do build: `npm run preview`. A tela e o contador são exemplos originais do template; não representam funcionalidades do marketplace. SvelteKit não foi adicionado.

## Backend

Instale uma toolchain Rust com suporte à edição 2024 (Rust 1.85+), Cargo, rustfmt e Clippy.

```sh
cd backend
cargo run
```

O programa imprime `Hello, world!`. Na primeira execução, Cargo gera `Cargo.lock`; versione esse arquivo por se tratar de uma aplicação. Depois use `cargo check --locked`, `cargo test --locked`, `cargo fmt --check` e `cargo clippy --all-targets --locked -- -D warnings`.

Cargo não estava disponível no ambiente de inicialização: a estrutura mínima foi criada manualmente, equivalente a um `cargo init --bin`. Compilação e execução do backend ainda precisam ser verificadas em um ambiente com Rust.

## Cobertura de IA aplicada

A [plano de conteúdos de IA](docs/ia-study-plan.md) organiza os tópicos de engenharia de software e IA aplicada em aplicação no projeto, exercícios separados e teoria, com tarefas, critérios e evidências esperadas. Stack adaptada para Svelte/Rust; carreira excluída. Estado inicial: planejado, sem entregas de IA concluídas.

