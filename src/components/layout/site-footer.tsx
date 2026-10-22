import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerNav } from "@/content/navigation";

// Cached so the footer can be prerendered; refreshes with the cache.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5 lg:col-span-4">
          <NewsletterForm />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 lg:col-span-6 lg:col-start-7"
        >
          {footerNav.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h2 className="eyebrow">{group.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link-subtle text-caption text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-6 text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>United States / English</p>
          <p>© <CopyrightYear /> Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
