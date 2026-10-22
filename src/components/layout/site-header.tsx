"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MenuDrawer } from "@/components/layout/menu-drawer";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const iconButton =
  "inline-flex size-10 items-center justify-center transition-opacity duration-200 hover:opacity-60";

export function SiteHeader() {
  const isHome = usePathname() === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );

  // On the home page the header sits transparently over the hero until scroll.
  const overlay = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ease-luxe ${
          overlay
            ? "border-transparent bg-transparent text-white"
            : "border-line bg-paper text-ink"
        }`}
      >
        <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              className={`${iconButton} md:w-auto md:gap-2`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
              <span className="eyebrow hidden md:inline">Menu</span>
            </button>
            <button type="button" className={iconButton} aria-label="Search">
              <SearchIcon />
            </button>
          </div>

          <Link
            href="/"
            className="pl-[0.32em] font-serif text-[1.375rem] uppercase tracking-[0.32em] md:text-[1.625rem]"
          >
            Atelier
          </Link>

          <nav aria-label="Account" className="flex items-center justify-end gap-1 md:gap-3">
            <Link href="#" className={`${iconButton} max-sm:hidden`} aria-label="Account">
              <UserIcon />
            </Link>
            <Link href="#" className={`${iconButton} max-sm:hidden`} aria-label="Saved items">
              <HeartIcon />
            </Link>
            <Link href="#" className={iconButton} aria-label="Shopping bag, 0 items">
              <BagIcon />
            </Link>
          </nav>
        </div>
      </header>

      {/* Pages other than home start below the fixed header. */}
      {!isHome && <div aria-hidden="true" className="h-header" />}

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
