# CLAUDE.md — app/api
# Fastify Backend — Painting Contractor Marketplace

## Stack
- Fastify 4 + TypeScript
- Supabase (auth + database + realtime)
- Zod (request validation)
- No ORM — raw Supabase queries in models

## Folder Structure
```
src/
├── index.ts               server bootstrap, register plugins, start on PORT 3001
├── app.ts                 Fastify instance creation, plugin + route registration
├── db.ts                  Supabase client init (service role)
├── config/
│   └── env.ts             parse + validate env vars with zod, export typed config
├── middleware/
│   ├── authenticate.ts    verify Supabase JWT, attach user to request
│   ├── requireRole.ts     role guard factory: requireRole('admin')
│   ├── errorHandler.ts    centralized Fastify error handler (setErrorHandler)
│   └── notFoundHandler.ts 404 handler (setNotFoundHandler)
├── models/
│   ├── jobModel.ts        all Supabase queries for jobs table
│   ├── workOrderModel.ts  all Supabase queries for work_orders table
│   └── contractorModel.ts all Supabase queries for contractors table
├── services/
│   ├── jobService.ts      business logic for jobs
│   ├── workOrderService.ts
│   └── contractorService.ts
├── controllers/
│   ├── healthController.ts
│   ├── jobController.ts
│   ├── workOrderController.ts
│   └── contractorController.ts
├── routes/
│   ├── index.ts           registers all route modules with prefix
│   ├── healthRoute.ts
│   ├── jobRoute.ts
│   ├── workOrderRoute.ts
│   └── contractorRoute.ts
└── utils/
    ├── logger.ts          Fastify logger config
    └── response.ts        success/error response shape helpers
```

## Layering Rules
- **Routes** → register paths + schemas, call controllers. No logic.
- **Controllers** → handle req/res, validate with Zod, call services OR models directly for simple queries (single table, no business logic)
- **Services** → business logic that spans multiple models or has conditional logic
- **Models** → Supabase queries only. Return data or throw. No req/res objects ever.
- **Middleware** → pure functions registered in app.ts. Never imported in controllers.

## Error Handling
- ALL errors flow to the centralized `errorHandler` in middleware/
- Controllers never have try/catch — they let errors bubble up
- Models throw plain `Error` objects with descriptive messages
- errorHandler maps error types to HTTP status codes
- Never return raw Supabase errors to the client

## Request Validation
- Use Zod schemas for all request bodies and query params
- Define schemas in the route file, validate in controller
- Invalid requests throw before reaching business logic

## Response Shape
Always use utils/response.ts helpers. Every response follows:
```ts
// Success
{ success: true, data: T }

// Error (handled by errorHandler)
{ success: false, error: string, code?: string }
```

## Authentication
- `authenticate` middleware decodes Supabase JWT, attaches `req.user`
- `requireRole('admin')` is a factory that returns a preHandler hook
- Protected routes use: `preHandler: [authenticate, requireRole('admin')]`
- Never check roles in controllers or services

## Supabase Conventions
- Service role client lives in `db.ts`, imported by models only
- Never use anon key on the backend
- Realtime subscriptions are frontend-only

## Health Check
- Always include `GET /health` → `{ status: 'ok', timestamp: Date.now() }`
- No auth required on health route

## Environment Variables
```
PORT=3001
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
CORS_ORIGIN=http://localhost:5173
```
