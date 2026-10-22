import { asc, desc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Product, ProductShot } from "@/lib/products";

// Every catalog read shares this tag; call `revalidateTag(PRODUCTS_TAG)` after writes.
export const PRODUCTS_TAG = "products";

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
};

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category.name,
    price: row.price,
    stock: row.stock,
    styleNumber: row.styleNumber,
    color: row.color,
    hue: row.hue,
    gallery: row.gallery as ProductShot[],
    description: row.description,
    details: row.details,
    badge: row.badge ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(PRODUCTS_TAG);

  const rows = await db.query.products.findMany({
    with: { category: true },
    orderBy: [desc(products.createdAt), asc(products.id)],
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(PRODUCTS_TAG);

  const row = await db.query.products.findFirst({
    where: (product, { eq }) => eq(product.slug, slug),
    with: { category: true },
  });
  return row ? toProduct(row) : undefined;
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(PRODUCTS_TAG);

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

/** Same-category products first, then the rest of the catalog. */
export async function getRelatedProducts(product: Product, limit = 8): Promise<Product[]> {
  const all = await getProducts();
  const others = all.filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, limit);
}
