# Database conventions

- **Stack:** Neon Postgres via Drizzle ORM (`drizzle-orm/neon-http`). The Neon HTTP driver has no interactive transactions, so use sequential statements, upserts or `db.batch`.
- **Env:** `neon.ts` declares the Neon services. `neon deploy` / `neon env pull` writes `DATABASE_URL` (pooled, used by the app via `parseEnv` in `src/db/index.ts`) and `DATABASE_URL_UNPOOLED` (direct) to `.env.local`. Never commit or print `.env*`.
- **Scope (v1):** only `categories` and `products`, with stock as an integer column on `products`. Don't add carts, orders, payments, reviews, wishlists or product variants/sizes unless asked.
- **Schema:** each domain gets its own file (e.g. `src/db/product-schema.ts`), re-exported from `src/db/schema.ts`. Declare Drizzle `relations()` so `db.query.*` can use `with`. Prices are whole USD integers. Use CHECK constraints for non-negative values.
- **Migrations:** `npm run db:generate` then `npm run db:migrate`, and commit the SQL in `drizzle/`. Don't use `db:push`. `drizzle.config.ts` uses the direct `DATABASE_URL_UNPOOLED`, because migrations must not go through the pooler.
- **Seeding:** `npm run db:seed` (`src/db/seed.ts`, data in `src/db/seed-data.ts`). The seed must stay idempotent (upsert on `slug`). Call `loadEnvConfig` before dynamically importing `@/db`, which throws without `DATABASE_URL`.
- **Reads:** all DB access lives in `src/db/queries/*`. Query functions return the domain types from `src/lib/*` (e.g. `Product`), not raw rows.
- **Client boundary:** client components must never import `@/db`. Types and pure helpers go in `src/lib/*`.
- **Caching:** `cacheComponents` is on. Every query function starts with `"use cache"`, `cacheLife("hours")` and `cacheTag(PRODUCTS_TAG)`. After writes, call `revalidateTag`/`updateTag` with that tag. Under Cache Components, `generateStaticParams` must return at least one param, so builds need a seeded DB.
