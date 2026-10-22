import Link from "next/link";
import { useId } from "react";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/products";

type ProductRowProps = {
  title: string;
  href: string;
  products: Product[];
};

export function ProductRow({ title, href, products }: ProductRowProps) {
  const titleId = useId();

  return (
    <section className="section container-page" aria-labelledby={titleId}>
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 id={titleId} className="font-serif text-display-md">
          {title}
        </h2>
        <Link href={href} className="eyebrow link shrink-0">
          View all
        </Link>
      </div>

      <ul className="scroll-row">
        {products.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
