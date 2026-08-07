# E-Commerce Monorepo

Monorepo containing a React-based storefront and admin dashboard with shared component and utility packages.

Key workspaces

- apps/store — customer-facing storefront (Vite + React)
- apps/dashboard — admin dashboard for store management (Vite + React)
- packages/ui — shared React UI components
- packages/api — client helpers (axios/react-query) for API requests
- packages/utils — shared utilities
- packages/tailwind-config — Tailwind config used by apps

Why this project

Provides a full example of a modern e-commerce frontend split into a storefront and admin UI, sharing components and tooling via npm workspaces and Turbo (turbo).

Quick start

Prerequisites

- Node.js >= 18
- npm (project uses npm workspaces; dev metadata indicates npm 11.16+)

Install dependencies (root)

```sh
npm install
```

Run all apps in development (uses Turborepo tasks defined in root package.json)

```sh
npm run dev
```

Run a single workspace (example: storefront)

```sh
npm run dev --workspace=store
# or, for dashboard
npm run dev --workspace=dashboard
```

Build (all workspaces)

```sh
npm run build
```

Preview a built app

```sh
# build first, then preview a specific workspace
npm run build
npm run preview --workspace=store
```

Project scripts

- npm run dev — runs turbo dev to start all dev servers
- npm run build — runs turbo build to build all packages
- npm run lint — runs turbo lint (packages/apps use oxlint)
- npm run format — runs Prettier across the repo

Environment variables

Each app includes an .env.example (apps/store/.env.example, apps/dashboard/.env.example). Copy into .env and fill values before running (for example, Stripe keys or API endpoints used by the storefront).

Testing & linting

- Tests: each app uses Vitest (npm run test inside workspace)
- Linting: oxlint is used in apps (npm run lint inside workspace)

Workspace-level usage examples

- Install a new dependency in the store app:

```sh
npm install axios --workspace=store
```

- Run tests for a package:

```sh
npm run test --workspace=store
```

Notes about third-party services

The storefront integrates with Stripe (see package.json deps). Provide appropriate publishable keys and backend endpoints via environment variables when testing payments locally.

Contributing

Project currently does not include a CONTRIBUTING.md. Please open issues or PRs in this repository for bugs and features. When contributing:

- Fork the repo and create a branch with a clear name
- Keep changes scoped to one logical change
- Run tests and lint locally before opening a PR

Where to get help

- Use this repository's Issues for bug reports and feature requests
- Open a discussion or PR for design or architectural proposals

Maintainers

Maintained by the team-9-frontend/e-commerce repository maintainers. If you are a maintainer, add maintainer contact details or a CONTRIBUTING.md file.

Repository layout (top-level)

- apps/
  - store/
  - dashboard/
- packages/
  - ui/
  - api/
  - utils/
  - tailwind-config/
- package.json — root scripts and turborepo workspace config

Relevant files

- apps/store/package.json — storefront app scripts and deps
- apps/dashboard/package.json — dashboard app scripts and deps
- packages/ui — shared UI components
- packages/api — API helpers used by both apps

License

See the LICENSE file at the repository root if present. If no LICENSE exists, add one before reusing this code publicly.

Small examples

Importing the shared UI package from an app:

```js
import { Button } from '@repo/ui'
```

Using API helpers (packages/api):

```js
import { apiClient } from '@repo/api'

apiClient.get('/products').then((res) => console.log(res.data))
```

Maintainer checklist (suggested)

- Add a CONTRIBUTING.md with contribution rules
- Add CI (GitHub Actions) build badge to this README
- Add LICENSE if the project should be open source

If anything in this README is out of date, please open an issue or PR with corrections.
