"use client";

import Link from "next/link";
import { SITEMAP_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-orange-900/40 bg-[#2a1a12] text-orange-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-start gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-orange-600 text-sm font-black text-[#2a1a12]">
              AS
            </span>
            <div>
              <p className="text-lg font-bold">{SITE_NAME}</p>
              <p className="mt-1 max-w-xs text-sm text-orange-100/60">
                Minecraft builds, models, development, and content — crafted
                for creators.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
              Sitemap
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {SITEMAP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-orange-100/70 transition-colors hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
              Follow
            </p>
            <ul className="mt-3 flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-900/40 text-xs font-semibold text-orange-100/80 transition-colors hover:bg-orange-600 hover:text-[#2a1a12]"
                  >
                    {link.label.slice(0, 1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-orange-900/40 pt-6 sm:flex-row">
          <p className="text-xs text-orange-100/50">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-md border border-orange-900/40 px-3 py-1.5 text-xs font-medium text-orange-100/70 transition-colors hover:border-orange-600 hover:text-orange-300"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
