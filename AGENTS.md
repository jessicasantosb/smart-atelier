# Smart Atelier — Agent Instructions

## Project context and sources

Smart Atelier is a craft marketplace project for learning and portfolio work, with storefronts, shops, sales, and custom orders. Read [docs/decisions.md](docs/decisions.md) before proposing product features. Decisions D01–D16 and D18 and planning definitions T01, T02, and the initial architecture in T08 are confirmed. The framework decision in D18 supersedes D17. A planning decision is not evidence that a feature is implemented; proposals, research, and planning tasks do not authorize unrelated features.

Rust is used for the backend and SolidJS for the frontend. `mise.toml` pins Bun 1.4.4, Node.js 24.22.3, and Rust 1.99.1. The Rust default profile includes Cargo, rustfmt, and Clippy. `frontend/` uses SolidJS 2.0.4, TypeScript with TSX, Solid Router, Tailwind CSS 4, and Vite+ 1.5.1. The browser renders the SPA and calls the Rust API over HTTP/JSON. Business rules and authoritative data belong to the Rust API. The frontend build outputs static files in `frontend/dist/`, with an `index.html` fallback required for direct navigation to app routes. Permanent hosting is undecided. `backend/` has an Axum/Tokio HTTP API, SQLx PostgreSQL pool, Redis connection, tracing, CORS, and liveness/readiness endpoints. The Phase 2 prototype uses local sample data for the maker and buyer journeys and shows API connectivity. No marketplace behavior, domain schema, migrations, or background queue has been implemented. `compose.yaml` provides local PostgreSQL and Redis. The approved demo architecture also includes Stripe Connect in test mode, Ship24 subject to validating Brazilian carrier coverage and free-plan limits, local Ollama for multimodal AI, local filesystem storage behind an interface, and a temporary HTTPS tunnel for external webhooks. Those integrations remain unimplemented. Production providers and hosting remain open. See `docs/architecture.md` and the detailed boundaries in `docs/decisions.md`. `docs/database.md` does not exist yet.

The [AI learning plan](docs/ia-study-plan.md) covers all topics in 11 technical areas through project work, separate labs, and theory adapted to SolidJS and Rust. Preserve existing MC identifiers. For every study task, identify the topic, prerequisites, modality, observable acceptance criteria, and real evidence. All subtopics in a grouped row must be accounted for before completion. Track theoretical comparison, simulation, real integration, and actual training separately; expected evidence is not a completed result. New product features, paid experiments, external writes, and private-data sharing still require authorization appropriate to the action.

## Language requirements

- Write all source code, identifiers, comments, tests, configuration examples, and application content in English.
- Keep all user-facing application text in English. Do not add Portuguese UI translations unless the user changes this requirement.
- Existing product and planning documents may remain in their current language unless the user asks to translate them.

## Branch naming

- Name branches with `<type>/<short-kebab-case-description>`.
- Use `feat/` for a new capability, `fix/` for a bug fix, and `refactor/` for a code restructuring that does not change behavior.
- For other work, use an accurate prefix such as `docs/`, `test/`, `chore/`, `build/`, `ci/`, `perf/`, or `style/`.
- Keep branch names lowercase, concise, and descriptive; for example, `feat/hosted-checkout`, `refactor/order-workflow`, and `fix/stock-reservation`.

## Required practices

- Read and follow the [project development rules](docs/rules/README.md) for the domain, Rust, and SolidJS. This file is the entry point; keep detailed guidance in the corresponding rule documents.
- Preserve existing local changes and limit edits to the request. Do not revert existing work or update dependencies without need.
- Organize by feature and keep frontend and backend contracts aligned. Routes translate input and output; use cases hold business rules; persistence and integrations sit behind explicit interfaces.
- Use `UnitOfWork`/`UnitOfService` for persistence and shared services when these abstractions have been defined. Do not create empty layers solely to satisfy naming conventions.
- Keep API calls in feature repositories and reusable data/state behavior in dedicated modules. Split large interfaces into components with clear responsibilities.
- In the frontend, reuse existing UI components and extract shared patterns when useful. Use semantic HTML and Tailwind for simple controls. Choose primitives compatible with the installed SolidJS version when an interaction needs additional accessibility or behavior.
- Keep secrets on the server.
- Do not turn AI suggestions, benchmarks, or reference-platform features into approved requirements. Record decision changes and completion evidence.

## Specification and learning workflow

- Read [ROADMAP.md](ROADMAP.md) for delivery phases, [docs/decisions.md](docs/decisions.md) for product decisions, [docs/architecture.md](docs/architecture.md) for technical boundaries, and the learning plan for topic-level tasks and evidence. Update each document in its own role.
- Keep roadmap phases and cross-references descriptive. Use MC identifiers for learning traceability and D/T identifiers for decisions/planning without replacing meaningful titles.
- Preserve the approved first-demo scope and the modular monolith. Cover other learning topics in isolated labs or theory; do not turn every technique into a marketplace feature.
- Use `labs/<descriptive-topic>/` when starting separate exercises. Keep their dependencies, data, and specialized runners isolated. Implement application behavior in Rust and SolidJS; document any SDK-specific runtime used by a lab.
- Plan all listed topics, including neural network training, remote APIs, multimodal processing, RAG, MCP, single/multiagent patterns, UX/UI, DevOps, project management, architecture, fine-tuning, and governance. A tool comparison alone cannot complete a practical requirement.
- Before a model experiment, define the authorized dataset, baseline, metrics, resource budget, failure behavior, and evidence. Log versions and limitations; never claim a benchmark, deployment, external integration, or model training that was not executed.
- Track three completion gates independently: the first integrated demo, the full application, and complete learning coverage. Preserve the career/interview exclusion.

## Integration safeguards

- Preserve full payment after quote acceptance and before production (D11), and seller payout after delivery (D12). In the first demo only, use Stripe/Connect test mode with hosted card checkout in BRL and separate charges and transfers. A Ship24 `delivered` event triggers one transfer of the item amount to the artisan's connected Stripe balance; the connected account's bank payout follows its Stripe schedule. Enforce idempotency across repeated/out-of-order events and retries. Production funds flow, payout timing, delivery proof, and dispute rules remain undecided. The Ship24 free tier is limited to 10 tracked shipments per month; validate Correios coverage before integration and keep external provider calls out of automated CI.
- Preserve the existing ERP/Oracle safeguard: before changing the behavior, contracts, persistence, retries, statuses, or synchronization of any such integration, explain the change and its impact, ask the user for confirmation, and wait before implementing it.
- Before changing a quote or purchase order shared with that integration, inspect consumers and payloads; ask the user if there may be an impact. This safeguard does not mean ERP/Oracle is part of Smart Atelier's approved scope.

## Validation and delivery

The technical foundation is in place, but the application has no marketplace features yet. Do not invent scripts or claim checks passed unless they were run.

In `backend/`, use the Rust toolchain from `mise.toml` and keep `Cargo.lock` committed. Run appropriate checks: `mise exec -- cargo fmt --check`, `mise exec -- cargo check --locked`, `mise exec -- cargo test --locked` (prefer the affected target), and `mise exec -- cargo clippy --all-targets --locked -- -D warnings`. Use `--all-features` only when features are compatible with each other and the environment. For the Windows-friendly Linux backend, run `docker compose up --build backend` from the repository root; Compose starts PostgreSQL and Redis and the API on port 3000. For native execution, copy `backend/.env.example` to `backend/.env` and start PostgreSQL/Redis with `docker compose up -d postgres redis`.

In `frontend/`, use Bun through mise: `mise exec -- bun install --frozen-lockfile`, `mise exec -- bun run check`, `mise exec -- bun run lint`, `mise exec -- bun run format:check`, `mise exec -- bun run test`, and `mise exec -- bun run build`. For development, use `mise exec -- bun run dev`; for a local production preview, use `mise exec -- bun run preview`. Vite+ provides Vite/Rolldown, Vitest, Oxlint, and Oxfmt commands. The project `check` script combines `vp check` with the TypeScript compiler. Oxfmt formats TypeScript, TSX, and configuration; unit and component tests use Vitest, DOM Testing Library, and jsdom. See the README for requirements.

During frontend development, run `bun run check` and the relevant `bun run test` after each coherent set of source changes and before committing or opening a pull request. `bun run check` runs Vite+ formatting and linting plus TypeScript validation. Run `bun run format` to format when needed; run `bun run format:check` before committing or opening a pull request. Run the full `bun run test` and `bun run build` before merging or releasing a frontend change. If CI is added, make the non-mutating checks (`check`, `format:check`, `test`, and `build`) required on pull requests.

For documentation, check local links, identifier consistency, and the distinction between decisions, proposals, and tasks. On completion, report changes, checks, and limitations; mention tests not run and any database or external-service dependencies.
