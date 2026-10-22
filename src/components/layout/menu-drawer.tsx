"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { CloseIcon } from "@/components/icons";
import { primaryNav, secondaryNav } from "@/content/navigation";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-overlay transition-opacity duration-300 ease-luxe ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col overflow-y-auto bg-paper text-ink transition-transform duration-500 ease-luxe ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-header shrink-0 items-center px-gutter">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-ml-2 inline-flex items-center gap-2 p-2 transition-opacity hover:opacity-60"
          >
            <CloseIcon />
            <span className="eyebrow">Close</span>
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col justify-between gap-12 px-gutter pt-6 pb-10">
          <ul className="flex flex-col gap-4">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="link-subtle font-serif text-[1.75rem] leading-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3 border-t pt-8">
            {secondaryNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={onClose} className="link-subtle eyebrow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
