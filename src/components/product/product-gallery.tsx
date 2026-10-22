"use client";

import { useRef, useState } from "react";

import { ProductPlaceholder } from "@/components/ui/placeholder-image";
import type { Product } from "@/lib/products";

const shotLabel = {
  front: "front view",
  side: "side view",
  back: "back view",
  detail: "detail",
} as const;

/*
 * Mobile: full-width swipe carousel with a position indicator.
 * Desktop: lead image across two columns, then a two-up grid.
 */
export function ProductGallery({ product }: { product: Product }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const list = listRef.current;
    if (!list || list.clientWidth === 0) return;
    setActive(Math.round(list.scrollLeft / list.clientWidth));
  }

  return (
    <div className="-mx-gutter lg:mx-0">
      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {product.gallery.map((shot, index) => (
          <li
            key={shot}
            className={`w-full shrink-0 snap-start lg:w-auto ${index === 0 ? "lg:col-span-2" : ""}`}
          >
            <div
              role="img"
              aria-label={`${product.name}, ${shotLabel[shot]}`}
              className={`media-frame aspect-product ${index === 0 ? "lg:aspect-[4/3]" : ""}`}
            >
              <ProductPlaceholder hue={product.hue} shot={shot} />
            </div>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5 lg:hidden">
        {product.gallery.map((shot, index) => (
          <span
            key={shot}
            className={`h-px w-6 transition-colors duration-300 ${
              index === active ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
