import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function Hero() {
  return (
    <section className="relative h-svh min-h-[34rem] w-full overflow-hidden bg-ink text-white">
      <PlaceholderImage tone="night" label="Autumn–Winter campaign" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/30" />

      <div className="container-page relative flex h-full flex-col items-center justify-end pb-16 text-center md:pb-24">
        <p className="eyebrow">Autumn–Winter 2026</p>
        <h1 className="mt-4 font-serif text-display-xl">The Quiet Season</h1>
        <div className="mt-8 flex gap-8">
          <Link href="#" className="eyebrow link">
            Shop women
          </Link>
          <Link href="#" className="eyebrow link">
            Shop men
          </Link>
        </div>
      </div>
    </section>
  );
}
