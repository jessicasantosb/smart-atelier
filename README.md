# Smart Atelier

Smart Atelier is a craft marketplace project for learning and portfolio work. The repository currently contains initialized frontend and backend projects; marketplace features have not been implemented.

## Project structure

- `frontend/`: Svelte 5, TypeScript, SvelteKit 3, and Vite+ 1.5.1 application; homepage reports API liveness.
- `backend/`: Rust 2024 API using Axum/Tokio, SQLx/PostgreSQL, and Redis; only health endpoints exist.
- `database/`: reserved; PostgreSQL is approved, but domain schema and migrations are not defined.
- `compose.yaml`: local PostgreSQL and Redis services for development.
- `.github/workflows/ci.yml`: backend and frontend CI checks.
- `docs/decisions.md`: confirmed product decisions, first-demo scope, proposals, and open tasks.
- `docs/architecture.md`: current technical state and approved initial architecture for the demonstration.
- `docs/rules/`: project, Rust, and Svelte development rules.
- `docs/ia-study-plan.md`: technical learning coverage mapped to Rust and Svelte.

Read [AGENTS.md](AGENTS.md) and the relevant [development rules](docs/rules/README.md) before making changes. All source code, identifiers, comments, tests, configuration examples, and user-facing application content must be in English. Project documentation may remain in its current language.

## Tools and technologies

| Area | Technology | Current use |
| --- | --- | --- |
| Tool version management | [mise](https://mise.jdx.dev/) | Reads the root `mise.toml`, which pins Bun 1.4.4 and Rust 1.99.1 with Cargo, rustfmt, and Clippy. |
| Frontend runtime and package manager | [Bun](https://bun.sh/) | Install dependencies and run frontend scripts; `frontend/bun.lock` is the Bun lockfile. |
| Frontend | Svelte 5, TypeScript, SvelteKit 3, Vite 8 | Routing and rendering framework; no marketplace workflows yet. |
| Frontend adapter | `@sveltejs/adapter-auto` | Temporary deployment adapter while hosting remains undecided. |
| UI components | shadcn-svelte, Bits UI, Tailwind CSS 4, Lucide | shadcn-svelte configuration and reusable UI dependencies are present. |
| Frontend toolchain | [Vite+](https://viteplus.dev/) 1.5.1 | Vite/Rolldown, Oxlint, Oxfmt, and Vitest; configured from `frontend/vite.config.ts`. |
| Frontend Svelte checks | `svelte-check`, TypeScript | Validates Svelte components and TypeScript; included in `bun run check`. |
| Frontend tests | Vitest 5.1.0, Svelte Testing Library, jsdom | Unit and component testing; a Counter interaction test demonstrates the setup. |
| Backend | Rust 2024, Axum, Tokio | HTTP API bootstrap with `/health/live` and `/health/ready`; no marketplace features. |
| Security scanning | Not configured | Semgrep is a candidate for SAST across Rust and TypeScript; `cargo-audit` is a candidate for Rust dependency advisory checks. Neither is installed or configured. |
| Demo HTTP API | Axum + Tokio | Implemented API foundation and health endpoints; marketplace routes remain pending. |
| Demo persistence | PostgreSQL + SQLx | Connection pool and readiness check implemented; PostgreSQL remains authoritative for domain state. Schema and migrations are pending. |
| Demo background work | Redis | Connection and readiness check implemented. Queue and retry scheduling remain pending; Redis does not replace PostgreSQL. |
| Demo authentication | Application-owned accounts + Google (planned) | Both login methods resolve to one internal Smart Atelier account; roles and shops remain app-owned. |
| Demo payments | Stripe Checkout + Stripe Connect (test mode) | Hosted card checkout in BRL; after delivery, separate charges and transfers move 100% of the item amount to the artisan's Connect balance. Bank payout follows the account schedule. Production payment model remains open. |
| Demo shipping tracking | Ship24 (free API/webhook tier) | Up to 10 shipments per month with no overage; tracking stops at the cap. Correios is the minimum carrier to validate before integration. |
| Demo AI | Ollama (local) | Approved local multimodal model runtime behind a replaceable provider interface; not integrated yet. Seller approval is required before publishing generated text. |
| Demo media storage | Local filesystem (planned) | Stored outside PostgreSQL behind a replaceable storage interface. |
| Demo webhooks | Temporary HTTPS tunnel (planned) | Exposes local webhook endpoints during development/demonstration; permanent hosting remains undecided. |

Choices marked planned describe the first demonstration architecture and are not implemented product capabilities. Production hosting and payment rules remain undecided.

## Setup

Install [mise](https://mise.jdx.dev/) and then install the Bun and Rust toolchains declared by the repository:

```sh
mise install
```

To run frontend commands through mise, from the repository root:

```sh
mise exec -- bun --cwd frontend install --frozen-lockfile
```

Start local PostgreSQL and Redis from the repository root (Docker Compose required):

```sh
docker compose up -d
```

In PowerShell, create the backend environment file and start the API:

```powershell
Copy-Item backend/.env.example backend/.env
Set-Location backend
mise exec -- cargo run
```

In another terminal, start the frontend from `frontend/` with `mise exec -- bun run dev`. Set `VITE_API_BASE_URL` in `frontend/.env` only if the API is running at a different address. `backend/.env` is ignored by Git.

Alternatively, change into `frontend/` and run `mise exec -- bun install --frozen-lockfile` followed by `mise exec -- bun run dev`.

## Frontend commands

Run from `frontend/` (prefix each command with `mise exec --` if mise's tool environment is not already active):

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run lint
bun run format:check
bun run test
bun run build
```

Use `bun run format` to apply formatting and `bun run preview` to preview a production build. Use `bun run test:watch` for interactive test development. Vite+ formats Svelte components as well as TypeScript, styles, and project configuration. See [frontend/README.md](frontend/README.md) for details.

## Backend commands

Run the Rust commands from `backend/`; `mise install` at the repository root provides the configured Rust toolchain and Cargo tools:

```sh
mise exec -- cargo run
mise exec -- cargo check
mise exec -- cargo fmt --check
mise exec -- cargo test --locked
mise exec -- cargo clippy --all-targets --locked -- -D warnings
```

The committed `backend/Cargo.lock` pins application dependencies. The API requires `DATABASE_URL` and `REDIS_URL`; copy `backend/.env.example` to `backend/.env` for local execution. `/health/live` checks process availability, while `/health/ready` checks PostgreSQL and Redis.

## Product and learning plans

See [product decisions and tasks](docs/decisions.md), the [AI learning plan](docs/ia-study-plan.md), and the [application roadmap](ROADMAP.md). Planned learning exercises do not automatically become marketplace features or authorize external costs.
