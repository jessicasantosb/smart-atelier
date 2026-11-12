# Smart Atelier — Agent Instructions

## Project context and sources

Smart Atelier is a craft marketplace project for learning and portfolio work, with storefronts, shops, sales, and custom orders. Read [docs/decisions.md](docs/decisions.md) before proposing product features. Decisions D01–D17 are confirmed; proposals, research, and planning tasks do not authorize implementing new features.

Rust is used for the backend and Svelte for the frontend. `mise.toml` pins Bun 1.4.4 and Rust 1.99.1; the Rust default profile includes Cargo, rustfmt, and Clippy. `frontend/` uses Svelte 5, TypeScript, SvelteKit 3, and Vite+ 1.5.1. SvelteKit provides routing and rendering; business rules and authoritative data belong to the Rust API when it is defined. `adapter-auto` is the current deployment adapter while hosting remains undecided. `backend/` contains a Rust 2024 binary with no dependencies or server, equivalent to a minimal init. `database/` is reserved. The HTTP framework, database, payment provider, and AI tools remain undecided. See `docs/architecture.md` for the current technical state. `docs/database.md` does not exist yet.

The [AI learning plan](docs/ia-study-plan.md) covers 11 technical areas adapted to Svelte and Rust. Preserve its MC identifiers and distinguish product work, labs, and theory. Expected evidence does not mean a task is complete; the plan does not authorize running every experiment or incurring costs.

## Language requirements

- Write all source code, identifiers, comments, tests, configuration examples, and application content in English.
- Keep all user-facing application text in English. Do not add Portuguese UI translations unless the user changes this requirement.
- Existing product and planning documents may remain in their current language unless the user asks to translate them.

## Required practices

- Read and follow the documents in [docs/rules/](docs/rules/README.md): project, Rust, and Svelte. This file is the entry point; keep detailed guidance in the corresponding rule documents.
- Preserve existing local changes and limit edits to the request. Do not revert existing work or update dependencies without need.
- Organize by feature and keep frontend and backend contracts aligned. Routes translate input and output; use cases hold business rules; persistence and integrations sit behind explicit interfaces.
- Use `UnitOfWork`/`UnitOfService` for persistence and shared services when these abstractions have been defined. Do not create empty layers solely to satisfy naming conventions.
- Keep API calls in feature repositories and reusable data/state behavior in dedicated modules. Split large interfaces into components with clear responsibilities.
- In the frontend, prefer existing reusable components and extract reusable UI when appropriate. If a needed UI component is not available in the project, add it from shadcn-svelte using Bun (`bun x shadcn-svelte@latest add <component>`). Initialize shadcn-svelte first with `bun x shadcn-svelte@latest init` when `components.json` is missing.
- Keep secrets on the server.
- Do not turn AI suggestions, benchmarks, or reference-platform features into approved requirements. Record decision changes and completion evidence.

## Integration safeguards

- Preserve full payment after quote acceptance and before production (D11), and seller payout after delivery (D12). The provider, payout timing, delivery proof, and dispute rules remain undecided.
- Preserve the existing ERP/Oracle safeguard: before changing the behavior, contracts, persistence, retries, statuses, or synchronization of any such integration, explain the change and its impact, ask the user for confirmation, and wait before implementing it.
- Before changing a quote or purchase order shared with that integration, inspect consumers and payloads; ask the user if there may be an impact. This safeguard does not mean ERP/Oracle is part of Smart Atelier's approved scope.

## Validation and delivery

The project has been bootstrapped, but has no product features yet. Preserve the starter until there is an implementation task. Do not invent scripts or claim checks passed unless they were run.

In `backend/`, use the Rust toolchain from `mise.toml`. Cargo must generate the initial `Cargo.lock` with `mise exec -- cargo check`; commit the lockfile. Then run appropriate checks: `mise exec -- cargo fmt --check`, `mise exec -- cargo check --locked`, `mise exec -- cargo test --locked` (prefer the affected target), and `mise exec -- cargo clippy --all-targets --locked -- -D warnings`. Use `--all-features` only when features are compatible with each other and the environment.

In `frontend/`, use Bun through mise: `mise exec -- bun install --frozen-lockfile`, `mise exec -- bun run check`, `mise exec -- bun run lint`, `mise exec -- bun run format:check`, `mise exec -- bun run test`, and `mise exec -- bun run build`. For development, use `mise exec -- bun run dev`; for a local production preview, use `mise exec -- bun run preview`. Vite+ provides Vite/Rolldown, Vitest, Oxlint, and Oxfmt commands. The project `check` script combines `vp check` with `svelte-check` and TypeScript. Vite+ type-aware linting/type-checking are disabled because they report false errors for generated Svelte component exports; `svelte-check` and TypeScript remain the type validation sources. Oxfmt is configured to format `.svelte` files. Unit and component tests use Vitest and Svelte Testing Library. See the README for requirements. Cargo was unavailable during bootstrap; do not claim the backend is validated until checks have been run.

During frontend development, run `bun run check` and the relevant `bun run test` after each coherent set of source changes and before committing or opening a pull request. `bun run check` runs Vite+ formatting and linting plus the Svelte and TypeScript checks. Run `bun run format` to format when needed; run `bun run format:check` before committing or opening a pull request. Run the full `bun run test` and `bun run build` before merging or releasing a frontend change. If CI is added, make the non-mutating checks (`check`, `format:check`, `test`, and `build`) required on pull requests.

For documentation, check local links, identifier consistency, and the distinction between decisions, proposals, and tasks. On completion, report changes, checks, and limitations; mention tests not run and any database or external-service dependencies.
