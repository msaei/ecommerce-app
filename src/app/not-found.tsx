import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-text section flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <p className="eyebrow text-muted">Page not found</p>
      <h1 className="font-serif text-display-lg">This page isn&apos;t here</h1>
      <p className="text-body-lg text-muted">
        The page you&apos;re looking for may have moved or no longer exists.
      </p>
      <Link href="/" className="btn mt-2">
        Return home
      </Link>
    </main>
  );
}
