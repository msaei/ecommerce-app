// Idempotent catalog seed: `npm run db:seed`. Safe to rerun; upserts on slug.

import { loadEnvConfig } from "@next/env";
import { sql } from "drizzle-orm";

import { seedCategories, seedProducts } from "./seed-data";

loadEnvConfig(process.cwd());

async function main() {
  // Imported after the env is loaded: `./index` throws when DATABASE_URL is missing.
  const { db } = await import("./index");
  const { categories, products } = await import("./schema");

  const categoryRows = await db
    .insert(categories)
    .values(seedCategories)
    .onConflictDoUpdate({ target: categories.slug, set: { name: sql`excluded.name` } })
    .returning({ id: categories.id, name: categories.name });

  const categoryIds = new Map(categoryRows.map((row) => [row.name, row.id]));

  // Insert in reverse so the newest-first storefront order matches the list order.
  for (const { category, ...product } of [...seedProducts].reverse()) {
    const categoryId = categoryIds.get(category);
    if (!categoryId) throw new Error(`Unknown category "${category}" for ${product.slug}`);

    const values = { ...product, categoryId, badge: product.badge ?? null };
    const { slug, ...updates } = values;

    await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({ target: products.slug, set: updates });
    console.log(`Seeded ${slug}`);
  }

  console.log(`Done: ${categoryRows.length} categories, ${seedProducts.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
