import Link from "next/link";

import { services } from "@/content/home";

export function Services() {
  return (
    <section className="section container-page" aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">
        Services
      </h2>
      <ul className="grid gap-10 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title} className="flex flex-col items-start gap-3">
            <h3 className="eyebrow">{service.title}</h3>
            <p className="text-caption text-muted">{service.body}</p>
            <Link href={service.href} className="link text-caption">
              {service.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
