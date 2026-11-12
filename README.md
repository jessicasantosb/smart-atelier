# Smart Atelier

Smart Atelier is a craft marketplace project for learning and portfolio work. The repository currently contains initialized frontend and backend projects; marketplace features have not been implemented.

## Project structure

- `frontend/`: Svelte 5, TypeScript, SvelteKit 3, and Vite+ 1.5.1 application starter.
- `backend/`: Rust 2024 binary starter with no dependencies, HTTP server, or routes.
- `database/`: reserved; database, schema, and migrations are not defined.
- `docs/decisions.md`: confirmed product decisions, proposals, and open tasks.
- `docs/architecture.md`: current technical state and pending architecture choices.
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
| Backend | Rust 2024 | Minimal binary starter. |
| Security scanning | Not configured | Semgrep is a candidate for SAST across Rust and TypeScript; `cargo-audit` is a candidate for Rust dependency advisory checks. Neither is installed or configured. |

The HTTP framework, async runtime, database, authentication provider, hosting, payment provider, and AI services remain undecided. Do not treat listed frontend dependencies as completed product capabilities.

## Setup

Install [mise](https://mise.jdx.dev/) and then install the Bun and Rust toolchains declared by the repository:

```sh
mise install
```

To run frontend commands through mise, from the repository root:

```sh
mise exec -- bun --cwd frontend install --frozen-lockfile
mise exec -- bun --cwd frontend run dev
```

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

Cargo should generate the initial `Cargo.lock` when `mise exec -- cargo check` runs; commit that lockfile for the application. Backend compilation and execution have not yet been verified with the project-pinned toolchain.

## Product and learning plans

See [product decisions and tasks](docs/decisions.md), the [AI learning plan](docs/ia-study-plan.md), and the [application roadmap](ROADMAP.md). Planned learning exercises do not automatically become marketplace features or authorize external costs.
