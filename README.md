# Smart Atelier

Smart Atelier is a craft marketplace project for learning and portfolio work. The frontend includes a navigable prototype of the maker and buyer journeys using local sample data. It does not create accounts, publish products, process payments, track shipments, or initiate transfers. The Rust backend provides an Axum API with liveness and readiness endpoints.

## Project structure

- `frontend/`: SolidJS 2.0.4 and TypeScript application with Solid Router and Vite+ 1.5.1. The prototype includes a shared API status indicator.
- `backend/`: Rust 2024 API using Axum/Tokio, SQLx/PostgreSQL, and Redis; only health endpoints exist.
- `database/`: reserved; PostgreSQL is approved, but domain schema and migrations are not defined.
- `compose.yaml`: local PostgreSQL and Redis services for development.
- `.github/workflows/ci.yml`: backend and frontend CI checks.
- `docs/decisions.md`: confirmed product decisions, first-demo scope, proposals, and open tasks.
- `docs/architecture.md`: current technical state and approved initial architecture for the demonstration.
- `docs/rules/`: project, Rust, and SolidJS development rules.
- `docs/ia-study-plan.md`: topic coverage across 11 technical areas, with tasks, prerequisites, acceptance criteria, evidence, and learning status mapped to Rust and SolidJS.

Read [AGENTS.md](AGENTS.md) and the relevant [development rules](docs/rules/README.md) before making changes. All source code, identifiers, comments, tests, configuration examples, and user-facing application content must be in English. Project documentation may remain in its current language.

## Delivery and study specifications

| Document                                       | Purpose                                                                                                                 |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Construction roadmap](ROADMAP.md)             | Delivery phases, dependencies, milestones, and completion gates.                                                        |
| [Product decisions](docs/decisions.md)         | Confirmed rules, first-demo boundaries, proposals, and open product questions.                                          |
| [Architecture](docs/architecture.md)           | Implemented foundation, approved technical boundaries, and contracts to refine.                                         |
| [Applied AI study plan](docs/ia-study-plan.md) | All learning topics, classified as project work, separate exercise, or theory, with measurable completion and evidence. |

The study plan covers foundations and LLMs, generative APIs and multimodality, MCP, autonomous agents, UX/UI, DevOps, project management, AI architecture, datasets and fine-tuning, security/governance, and integrative delivery. The first marketplace demo, the complete application, and full learning coverage have separate completion criteria. Career and interview preparation are excluded.

Experiments use isolated labs when the topic does not belong in the marketplace. Named tools are study or comparison targets unless marked as approved/implemented in the architecture. Tool comparisons, simulated services, actual integrations, and trained models require distinct evidence. No extra runtime, cloud service, or paid experiment is installed or provisioned by this documentation.

## Tools and technologies

| Area                                 | Technology                                     | Current use                                                                                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tool version management              | [mise](https://mise.jdx.dev/)                  | Reads the root `mise.toml`, which pins Bun 1.4.4, Node.js 24.22.3, and Rust 1.99.1 with Cargo, rustfmt, and Clippy.                                                                                                                           |
| Frontend runtime and package manager | [Bun](https://bun.sh/)                         | Install dependencies and run frontend scripts; `frontend/bun.lock` is the Bun lockfile.                                                                                                                                     |
| Frontend | SolidJS 2.0.4, TypeScript, Solid Router | Browser rendering and navigation for the prototype. |
| Frontend build | Vite+ static SPA | Serves `frontend/dist/` with an `index.html` fallback for application routes. Hosting is undecided. |
| UI components | Tailwind CSS 4, Inter Variable, shared Solid components | Responsive styling, typography, and reusable UI. |
| Frontend toolchain                   | [Vite+](https://viteplus.dev/) 1.5.1           | Vite/Rolldown, Oxlint, Oxfmt, and Vitest; configured from `frontend/vite.config.ts`.                                                                                                                                        |
| Frontend types | TypeScript | Checks TypeScript and TSX as part of `bun run check`. |
| Frontend tests | Vitest, DOM Testing Library, jsdom | Unit and component tests cover the prototype routes and states. |
| Backend                              | Rust 2024, Axum, Tokio                         | HTTP API bootstrap with `/health/live` and `/health/ready`; no marketplace features.                                                                                                                                        |
| Security scanning                    | Not configured                                 | Semgrep is a candidate for SAST across Rust and TypeScript; `cargo-audit` is a candidate for Rust dependency advisory checks. Neither is installed or configured.                                                           |
| Demo HTTP API                        | Axum + Tokio                                   | Implemented API foundation and health endpoints; marketplace routes remain pending.                                                                                                                                         |
| Demo persistence                     | PostgreSQL + SQLx                              | Connection pool and readiness check implemented; PostgreSQL remains authoritative for domain state. Schema and migrations are pending.                                                                                      |
| Demo background work                 | Redis                                          | Connection and readiness check implemented. Queue and retry scheduling remain pending; Redis does not replace PostgreSQL.                                                                                                   |
| Demo authentication                  | Application-owned accounts + Google (planned)  | Both login methods resolve to one internal Smart Atelier account; roles and shops remain app-owned.                                                                                                                         |
| Demo payments                        | Stripe Checkout + Stripe Connect (test mode)   | Hosted card checkout in BRL; after delivery, separate charges and transfers move 100% of the item amount to the artisan's Connect balance. Bank payout follows the account schedule. Production payment model remains open. |
| Demo shipping tracking               | Ship24 (free API/webhook tier)                 | Up to 10 shipments per month with no overage; tracking stops at the cap. Correios is the minimum carrier to validate before integration.                                                                                    |
| Demo AI                              | Ollama (local)                                 | Approved local multimodal model runtime behind a replaceable provider interface; not integrated yet. Seller approval is required before publishing generated text.                                                          |
| Demo media storage                   | Local filesystem (planned)                     | Stored outside PostgreSQL behind a replaceable storage interface.                                                                                                                                                           |
| Demo webhooks                        | Temporary HTTPS tunnel (planned)               | Exposes local webhook endpoints during development/demonstration; permanent hosting remains undecided.                                                                                                                      |

Choices marked planned describe the first demonstration architecture and are not implemented product capabilities. Production hosting and payment rules remain undecided.

## Setup

Install the Bun, Node.js, and Rust toolchains declared by the repository with [mise](https://mise.jdx.dev/).

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

Use `bun run format` to apply formatting and `bun run preview` to preview a production build. Use `bun run test:watch` for interactive test development. Vite+ formats TypeScript, TSX, styles, and project configuration. See [frontend/README.md](frontend/README.md) for details.

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
