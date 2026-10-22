import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { editorialPair } from "@/content/home";

export function EditorialPair() {
  return (
    <section className="grid gap-y-10 md:grid-cols-2 md:gap-x-1">
      {editorialPair.map((item) => (
        <article key={item.title} className="group">
          <Link href={item.href} className="block">
            <div className="media-frame aspect-portrait">
              <div className="size-full transition-transform duration-700 ease-luxe group-hover:scale-[1.02]">
                <PlaceholderImage tone={item.tone} label={`${item.eyebrow}: ${item.title}`} />
              </div>
            </div>
          </Link>
          <div className="flex flex-col items-start gap-3 px-gutter pt-6 md:px-8">
            <p className="eyebrow text-muted">{item.eyebrow}</p>
            <h2 className="font-serif text-display-md">{item.title}</h2>
            <Link href={item.href} className="eyebrow link">
              {item.cta}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
