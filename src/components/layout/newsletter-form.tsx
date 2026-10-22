"use client";

import { useState } from "react";

import { ArrowRightIcon } from "@/components/icons";

export function NewsletterForm() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: connect to the newsletter provider.
        setNotice("Newsletter sign-up isn't connected yet.");
      }}
    >
      <label htmlFor="newsletter-email" className="eyebrow">
        Sign up for updates
      </label>
      <p className="text-caption text-muted">
        Be the first to hear about new collections and private events.
      </p>
      <div className="relative mt-2">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="field pr-10"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-end transition-opacity hover:opacity-60"
        >
          <ArrowRightIcon />
        </button>
      </div>
      <p role="status" className="text-caption text-muted">
        {notice}
      </p>
    </form>
  );
}
