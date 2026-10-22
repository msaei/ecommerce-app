export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "New In", href: "#" },
  { label: "Women", href: "#" },
  { label: "Men", href: "#" },
  { label: "Handbags", href: "#" },
  { label: "Shoes", href: "#" },
  { label: "Jewelry & Watches", href: "#" },
  { label: "Gifts", href: "#" },
];

export const secondaryNav: NavLink[] = [
  { label: "Store locator", href: "#" },
  { label: "Client services", href: "#" },
  { label: "My account", href: "#" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "The company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Stores", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of use", href: "#" },
      { label: "Cookie settings", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];
