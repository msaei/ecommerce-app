// Placeholder content for the home page. Replace with CMS or database data.

import type { PlaceholderTone } from "@/components/ui/placeholder-image";

export const editorialPair: {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  tone: PlaceholderTone;
}[] = [
  { eyebrow: "Women", title: "Tailoring, softened", cta: "Shop women", href: "#", tone: "stone" },
  { eyebrow: "Men", title: "The new uniform", cta: "Shop men", href: "#", tone: "forest" },
];

export const categories: { name: string; href: string; tone: PlaceholderTone }[] = [
  { name: "Handbags", href: "#", tone: "sand" },
  { name: "Shoes", href: "#", tone: "mist" },
  { name: "Ready-to-wear", href: "#", tone: "stone" },
  { name: "Jewelry", href: "#", tone: "sand" },
];

export const services: { title: string; body: string; cta: string; href: string }[] = [
  {
    title: "Complimentary shipping",
    body: "Free standard delivery and returns on every order.",
    cta: "Delivery details",
    href: "#",
  },
  {
    title: "Book an appointment",
    body: "Shop with an advisor in store or by video call.",
    cta: "Make a booking",
    href: "#",
  },
  {
    title: "Gift wrapping",
    body: "Every order arrives in our signature packaging.",
    cta: "Learn more",
    href: "#",
  },
  {
    title: "Client services",
    body: "Our advisors are available seven days a week.",
    cta: "Contact us",
    href: "#",
  },
];
