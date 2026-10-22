import Link from "next/link";

export function Intro() {
  return (
    <section className="section container-text flex flex-col items-center gap-6 text-center">
      <p className="eyebrow text-muted">The collection</p>
      <p className="font-serif text-display-md">
        Considered pieces, made in small runs by workshops we know by name, and
        designed to be kept for years.
      </p>
      <Link href="#" className="eyebrow link">
        Discover the collection
      </Link>
    </section>
  );
}
