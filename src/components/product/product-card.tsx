import Link from "next/link";

import { HeartIcon } from "@/components/icons";
import { ProductPlaceholder } from "@/components/ui/placeholder-image";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative">
      <Link href={productHref(product)} className="block">
        <div className="media-frame aspect-product">
          <div className="size-full transition-transform duration-700 ease-luxe group-hover:scale-[1.03]">
            <ProductPlaceholder hue={product.hue} />
          </div>
          {product.badge && (
            <p className="eyebrow absolute top-3 left-3 text-muted">{product.badge}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 px-1 pt-3">
          <h3 className="text-caption md:text-body">{product.name}</h3>
          <p className="text-caption text-muted">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`Save ${product.name}`}
        className="absolute top-1 right-1 inline-flex size-10 items-center justify-center transition-opacity hover:opacity-60"
      >
        <HeartIcon />
      </button>
    </article>
  );
}
