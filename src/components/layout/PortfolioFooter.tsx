"use client";

import Image from "next/image";
import Link from "next/link";
import { DISCORD_URL, SITE_NAME } from "@/lib/constants";

const PORTFOLIO_SITEMAP_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Faq", href: "/#faq" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2H21.5l-7.19 8.21L22.77 22h-6.62l-5.18-6.78L4.99 22H1.73l7.69-8.79L1.5 2h6.79l4.68 6.2L18.24 2Zm-1.16 18h1.83L7.03 3.9H5.06L17.08 20Z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.32 5.37A17.6 17.6 0 0 0 15.9 4a.07.07 0 0 0-.07.04c-.2.35-.4.8-.56 1.15a16.2 16.2 0 0 0-4.54 0 8 8 0 0 0-.57-1.15A.07.07 0 0 0 10.08 4a17.5 17.5 0 0 0-4.42 1.37.06.06 0 0 0-.03.02C2.6 9.05 1.9 12.6 2.24 16.12a.07.07 0 0 0 .03.05 17.7 17.7 0 0 0 5.32 2.7.07.07 0 0 0 .08-.03c.41-.56.77-1.15 1.09-1.77a.07.07 0 0 0-.04-.1 11.6 11.6 0 0 1-1.67-.8.07.07 0 0 1 0-.12c.11-.09.22-.17.33-.26a.07.07 0 0 1 .07 0c3.5 1.6 7.29 1.6 10.75 0a.07.07 0 0 1 .07 0c.11.09.22.18.33.27a.07.07 0 0 1 0 .12 11 11 0 0 1-1.68.8.07.07 0 0 0-.04.1c.33.62.69 1.2 1.09 1.76a.07.07 0 0 0 .08.03 17.6 17.6 0 0 0 5.33-2.7.07.07 0 0 0 .03-.05c.42-4.06-.7-7.58-2.96-10.72a.06.06 0 0 0-.03-.02ZM9.68 14c-.99 0-1.8-.9-1.8-2.02 0-1.11.8-2.02 1.8-2.02 1 0 1.81.92 1.8 2.02 0 1.11-.8 2.02-1.8 2.02Zm5.32 0c-.99 0-1.8-.9-1.8-2.02 0-1.11.8-2.02 1.8-2.02 1.01 0 1.82.92 1.8 2.02 0 1.11-.79 2.02-1.8 2.02Z" />
    </svg>
  );
}

const SOCIAL_ICON_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agilastudios", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/agilastudios", Icon: InstagramIcon },
  { label: "X", href: "https://twitter.com/agilastudios", Icon: XIcon },
  { label: "Discord", href: DISCORD_URL, Icon: DiscordIcon },
];

export default function PortfolioFooter() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className="text-orange-100"
      style={{
        background:
          "linear-gradient(to bottom, rgba(90, 46, 12, 0.69) 0%, rgba(43, 22, 8, 0.30) 100%), #2B1608",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <Image
              src="/Logo.svg"
              alt={SITE_NAME}
              width={165}
              height={73}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm font-medium text-orange-100">
              Every creation starts with a{" "}
              <span className="text-orange-400">single cube</span>.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
              Sitemap
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {PORTFOLIO_SITEMAP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-orange-100/90 transition-colors hover:text-orange-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
              Contact
            </p>
            <ul className="mt-4 flex gap-3">
              {SOCIAL_ICON_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1c0f07] text-orange-50 transition-colors hover:bg-orange-500 hover:text-[#2B1608]"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-orange-100/10 pt-6 sm:flex-row">
          <p className="text-xs font-medium text-orange-400/90">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs font-bold uppercase tracking-widest text-orange-400 transition-colors hover:text-orange-300"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
