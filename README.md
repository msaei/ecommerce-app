# Atelier Store

Next.js (App Router) · TypeScript · Tailwind CSS · Better Auth · Drizzle ORM · Neon Postgres

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts   Better Auth route handler
  db/index.ts                      Drizzle client (Neon HTTP driver)
  db/schema.ts                     Drizzle schema entry point
  lib/auth.ts                      Better Auth server instance
  lib/auth-client.ts               Better Auth React client
drizzle.config.ts                  drizzle-kit config
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |
| `npm run db:generate` | Generate SQL migrations from the schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run typecheck` | Type-check the project |
