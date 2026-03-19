# Monorepo — Claude Notes

## Stack

- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui — `apps/web`
- **Backend**: Elysia on Bun — `apps/api`
- **Shared**: Types and utilities — `packages/common`
- **Runtime**: Bun everywhere — no Node.js, no Vite, no webpack

## Monorepo Rules

- Always run `bun install` from the **root**, not from individual app directories
- Use `bun run dev` from the root to start all apps in parallel
- Shared types and utilities go in `packages/common/src/index.ts`, imported as `@repo/common`
- Use `bun run --filter web <script>` or `bun run --filter api <script>` to target a single app

## Bun Basics

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of jest or vitest
- Use `bunx <package>` instead of `npx <package>`
- Bun automatically loads `.env` — don't use dotenv

## APIs

- `Bun.serve()` for HTTP — don't use express
- `bun:sqlite` for SQLite — don't use better-sqlite3
- `Bun.redis` for Redis — don't use ioredis
- `Bun.sql` for Postgres — don't use pg or postgres.js
- `WebSocket` is built-in — don't use ws
- Prefer `Bun.file` over `node:fs` readFile/writeFile
- Bun.$\`command\` instead of execa

## Frontend (apps/web)

- Dev server runs on **port 3000** via `Bun.serve()` in `src/index.ts`
- All `/api/*` requests are proxied to the backend — never call `localhost:3001` directly from frontend code
- Path alias `@/*` maps to `src/*`
- HMR is enabled in development via `development: { hmr: true }`

```ts#apps/web/src/index.ts
import { serve } from "bun"
import index from "./index.html"

const API_URL = process.env.API_URL ?? "http://localhost:3001"

serve({
  routes: {
    "/*": index,
    "/api/*": async (req) => {
      const url = req.url.replace(/^https?:\/\/[^/]+/, API_URL)
      return fetch(new Request(url, req))
    },
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
})
```

## Styling

- Tailwind CSS v4 via `bun-plugin-tailwind` — no `tailwind.config.ts`
- Global styles in `apps/web/styles/globals.css`
- Use `cn()` from `@/lib/utils` for conditional classes (clsx + tailwind-merge)
- shadcn/ui components in `apps/web/src/components/ui/` — add new ones with `bunx shadcn add <component>`

## Backend (apps/api)

- Elysia server runs on **port 3001**
- Dev: `bun run --watch src/index.ts`
- SQLite via `bun:sqlite` — DB file is `sqlite.db` (gitignored)
- Use `@repo/common` for shared types with the frontend

## Testing

```ts
import { test, expect } from "bun:test"

test("example", () => {
  expect(1).toBe(1)
})
```

Run with `bun test` from the root or any app directory.