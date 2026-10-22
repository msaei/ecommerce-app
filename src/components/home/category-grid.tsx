import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { categories } from "@/content/home";

export function CategoryGrid() {
  return (
    <section className="container-page" aria-labelledby="category-grid-title">
      <h2 id="category-grid-title" className="mb-8 text-center font-serif text-display-md">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-x-1 gap-y-8 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.name}>
            <Link href={category.href} className="group block">
              <div className="media-frame aspect-portrait">
                <div className="size-full transition-transform duration-700 ease-luxe group-hover:scale-[1.03]">
                  <PlaceholderImage tone={category.tone} />
                </div>
              </div>
              <p className="eyebrow mt-4 text-center">{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
