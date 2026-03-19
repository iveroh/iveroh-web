# Fullstack Template

A monorepo template for fullstack web apps using Bun, React, and Elysia.

## Stack

- **Frontend** — React 19, Tailwind CSS v4, shadcn/ui
- **Backend** — Elysia on Bun
- **Database** — SQLite via `bun:sqlite`
- **Shared** — `packages/common` for types and utilities
- **Runtime** — Bun everywhere

## Getting Started

```bash
bun install
bun run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## After Creating a Repo from This Template

Set up branch protection rules by running:

```bash
bash .github/setup-branch-protection.sh <owner> <repo>
```

Requires the [GitHub CLI](https://cli.github.com) and `gh auth login`.

## Structure

```
.
├── apps/
│   ├── web/        # React + Tailwind + shadcn
│   └── api/        # Elysia + SQLite
└── packages/
    └── common/     # Shared types and utilities
```

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `bun run dev`          | Start all apps in parallel         |
| `bun run build`        | Build all apps                     |
| `bun run typecheck`    | Type-check all apps                |
| `bun run lint`         | Lint everything                    |
| `bun run lint:fix`     | Lint and auto-fix                  |
| `bun run format`       | Format with Prettier               |
| `bun run format:check` | Check formatting                   |

## Shared Code

Add shared types and utilities to `packages/common/src/index.ts`:

```ts
import { ok, err, type ApiResponse } from '@repo/common'
```

## Adding shadcn Components

```bash
cd apps/web
bunx shadcn add <component>
```

## Environment Variables

Copy `.env.local` and adjust as needed:

```bash
API_URL=http://localhost:3001
DB_PATH=sqlite.db
```