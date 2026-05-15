# CLAUDE.md — app/web
# React Admin Frontend — Painting Contractor Marketplace

## Stack
- React 18 + Vite + TypeScript (strict)
- Tailwind CSS + shadcn/ui
- TanStack Query v5 (server state)
- React Router v6 (routing)
- Supabase JS (auth + realtime on client)
- Recharts (charts/metrics)
- Lucide React (icons)

## Folder Structure
```
src/
├── main.tsx               entry point
├── App.tsx                QueryClientProvider + AuthProvider + RouterProvider
├── lib/
│   ├── supabase.ts        createClient, typed helpers
│   ├── queryClient.ts     TanStack Query client config
│   └── utils.ts           cn() helper (clsx + tailwind-merge)
├── config/
│   └── routes.ts          route path constants (never hardcode strings)
├── context/
│   └── AuthContext.tsx    session, user, role, signOut
├── hooks/
│   ├── useAuth.ts         consume AuthContext
│   ├── useRole.ts         isAdmin(), hasRole(), hasAnyRole()
│   ├── useJobs.ts         TanStack Query hooks for jobs
│   ├── useWorkOrders.ts
│   └── useContractors.ts
├── components/
│   ├── ui/                shadcn/ui primitives (Button, Card, Badge, Input, Label)
│   └── layout/
│       ├── Sidebar.tsx    role-filtered nav, collapsible
│       ├── Header.tsx     breadcrumb + user menu
│       └── AppLayout.tsx  Sidebar + Header + <Outlet>
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Jobs.tsx
│   ├── WorkOrders.tsx
│   ├── Contractors.tsx
│   └── Settings.tsx
└── router/
    └── index.tsx          all routes, ProtectedRoute, RoleGuard
```

## Component Organization
- Organized **by type**: components/, pages/, hooks/
- `pages/` — one file per route, imports from components/ and hooks/
- `components/ui/` — shadcn-style primitives, no business logic
- `components/layout/` — structural shell components
- No feature folders — keep it flat and type-based

## Data Fetching Rules
- ALL server state via TanStack Query — never useState + useEffect for API calls
- Each entity has its own hook file in hooks/ (useJobs, useContractors, etc.)
- Query keys follow: `['jobs']`, `['jobs', id]`, `['contractors', { status }]`
- Invalidate queries on mutation success, never manually update cache
- Realtime: useEffect subscribes to Supabase channel, calls queryClient.invalidateQueries on event

## Authentication & Roles
- `useAuth()` for session and user info
- `useRole()` for permission checks — never read role directly from user object in components
- `<ProtectedRoute>` wraps all authenticated routes
- `<RoleGuard role="admin">` for role-specific UI sections
- Redirect to /login on unauthenticated access

## Styling Conventions
- Tailwind utility classes only — no custom CSS files
- Use `cn()` from utils.ts for conditional classes
- shadcn/ui CSS variable tokens for theming (defined in tailwind.config.ts)
- Never inline style objects
- Responsive by default — mobile-first breakpoints

## TypeScript Rules
- Import shared types from `@repo/types`, never redefine locally
- All component props have explicit interfaces
- No `any` — use `unknown` and narrow if needed
- Prefer `type` over `interface` for props

## Routing Conventions
- All route paths defined as constants in config/routes.ts
- Use `<Link to={ROUTES.JOBS}>` not `<Link to="/jobs">`
- Nested routes use `<Outlet>` in layout components
- Route guards are wrappers, not logic inside pages

## Environment Variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_URL=http://localhost:3001
```
All env vars must be prefixed with VITE_ to be accessible in browser.