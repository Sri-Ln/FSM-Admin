# CLAUDE.md — Monorepo Root
# Painting Contractor Marketplace Admin

## Project Overview
Turborepo monorepo for a painting contractor marketplace admin app.
Three roles: admin, contractor, homeowner.

## Monorepo Structure
```
ADMIN/
├── CLAUDE.md                  ← this file
├── package.json               root — turbo, pnpm workspaces, shared devDeps
├── turbo.json                 build/dev/lint/type-check pipeline
├── pnpm-workspace.yaml        workspace globs: app/*, packages/*
├── tsconfig.base.json         strict ESNext, shared by all packages
├── .env.example
├── app/
│   ├── web/                   React + Vite + Tailwind + shadcn/ui (@repo/web)
│   └── api/                   Fastify + TypeScript + Supabase (@repo/api)
└── packages/
    └── types/                 Shared TS types, zero build (@repo/types)
```

## Stack
| Layer         | Choice                          |
|---------------|---------------------------------|
| Monorepo      | Turborepo + pnpm workspaces     |
| Language      | TypeScript (strict) everywhere  |
| Backend       | Fastify 4                       |
| Database/Auth | Supabase                        |
| Frontend      | React 18 + Vite                 |
| Styling       | Tailwind CSS + shadcn/ui        |
| Server state  | TanStack Query v5               |
| Shared types  | @repo/types (source imports)    |

## Shared Types (@repo/types)
- Import shared types as: `import type { Job, UserRole } from '@repo/types'`
- Never redefine types that already exist in @repo/types
- Add new shared types to packages/types/src/index.ts first

## Turbo Pipeline Rules
- `build` depends on `^build` (dependencies build first)
- `dev` runs all apps in parallel
- `type-check` runs across all packages
- Never add app-specific scripts to root package.json

## Environment Variables
- Root `.env.example` documents all vars needed across apps
- Each app has its own `.env.example` for app-specific vars
- Never commit `.env` files
- Supabase vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## General Conventions
- All imports use path aliases (@ → src/) not relative ../../ paths
- No barrel index.ts files unless explicitly needed
- Prefer named exports over default exports
- TypeScript strict mode — no `any`, no `@ts-ignore`
- Every new feature starts with types in @repo/types if shared across appsSur

## Living Documentation Rule
After every session where a architectural decision, pattern, 
or convention is established or changed:
1. Update the relevant CLAUDE.md (root, app/api, or app/web)
2. Add it under the correct section — don't create new sections 
   unless necessary
3. Keep entries concise — one or two lines max per entry
4. Never remove existing entries, only add or update

Update CLAUDE.md before ending any session.

## Git Workflow
Before starting any feature, follow @.claude/skills/git-workflow.md exactly.
Never work directly on main under any circumstances.
Always start by pulling latest main and creating a feature branch.
When starting a feature prompt, the version bump type (patch/minor/major) 
will be specified — use it to update the VERSION file before raising the PR.
- Remote: git@github.com:Sri-Ln/FSM-Admin.git

## Environment
- OS: Windows
- Shell: Git Bash
- Always use bash-compatible commands
- Never use PowerShell-specific syntax