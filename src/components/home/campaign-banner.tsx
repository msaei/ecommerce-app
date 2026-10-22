import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function CampaignBanner() {
  return (
    <section className="section">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink text-white sm:aspect-landscape lg:aspect-hero">
        <PlaceholderImage tone="wine" label="Gifting campaign" className="absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div className="container-page relative flex h-full flex-col items-center justify-center gap-5 text-center">
          <p className="eyebrow">The gift edit</p>
          <h2 className="font-serif text-display-lg">Something to keep</h2>
          <Link href="#" className="btn btn-inverse mt-3">
            Shop gifts
          </Link>
        </div>
      </div>
    </section>
  );
}
