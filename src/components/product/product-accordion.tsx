import type { ReactNode } from "react";

import { PlusIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

function Section({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="group border-t" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        <span className="eyebrow">{title}</span>
        <PlusIcon className="size-4 transition-transform duration-300 ease-luxe group-open:rotate-45" />
      </summary>
      <div className="pb-6 text-caption leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export function ProductAccordion({ product }: { product: Product }) {
  return (
    <div className="border-b">
      <Section title="Product details" open>
        <p>{product.description}</p>
        <ul className="mt-4 flex flex-col gap-1.5">
          {product.details.map((detail) => (
            <li key={detail} className="before:mr-2 before:content-['—']">
              {detail}
            </li>
          ))}
        </ul>
        <p className="mt-4">Style {product.styleNumber}</p>
      </Section>
      <Section title="Shipping & returns">
        <p>
          Complimentary standard shipping on every order, delivered in 2–4
          business days. Returns are free within 30 days of delivery.
        </p>
      </Section>
      <Section title="Gifting">
        <p>
          Every order arrives in our signature packaging. Add a handwritten
          note at checkout.
        </p>
      </Section>
    </div>
  );
}
