// Product types and client-safe helpers. Database reads live in `@/db/queries/products`.

export type ProductShot = "front" | "side" | "detail" | "back";

export type ProductSize = { label: string; stock: number };

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  /** Total units available. Ignored when sizes are defined. */
  stock: number;
  sizes?: ProductSize[];
  styleNumber: string;
  color: string;
  hue: string;
  gallery: ProductShot[];
  description: string;
  details: string[];
  badge?: string;
};

export function productHref(product: Pick<Product, "slug">) {
  return `/products/${product.slug}`;
}

export function totalStock(product: Product) {
  return product.sizes
    ? product.sizes.reduce((sum, size) => sum + size.stock, 0)
    : product.stock;
}

export type StockState =
  | { status: "in_stock"; label: string }
  | { status: "low_stock"; label: string }
  | { status: "out_of_stock"; label: string };

export const LOW_STOCK_THRESHOLD = 3;

export function getStockState(units: number): StockState {
  if (units <= 0) return { status: "out_of_stock", label: "Out of stock" };
  if (units <= LOW_STOCK_THRESHOLD) {
    return { status: "low_stock", label: `Only ${units} left` };
  }
  return { status: "in_stock", label: "In stock" };
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return priceFormat.format(value);
}
