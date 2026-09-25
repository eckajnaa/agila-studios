"use client";
import Image from "next/image";
import Link from "next/link";
import { VT323 } from "next/font/google";
import gsap from "gsap";
import { DISCORD_URL } from "@/lib/constants";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function handleIconHoverEnter(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { scale: 1.2, y: -3, duration: 0.25, ease: "back.out(2)" });
}

function handleIconHoverLeave(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out" });
}

const SITEMAP = [
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Faq", href: "#faq" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/agilastudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/agilastudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/agilastudios",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: DISCORD_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.9 19.9 0 005.993 3.03.077.077 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
      </svg>
    ),
  },
];

export default function LandingFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(to bottom, rgba(90,46,12,0.69) 10%, rgba(43,22,8,0.30) 90%)",
        backgroundColor: "#F08100",
      }}
    >
      <div className="mx-auto max-w-7xl px-10 py-12">

        {/* Logo | sitemap | contact — space-between leaves equal gaps, so the sitemap sits
            midway between the logo and the contact column, which ends flush with the divider. */}
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">

          <div className="flex flex-col gap-3">
            <Link href="/" aria-label="Agila Studios home">
              <Image
                src="/images/Logo.svg"
                alt="Agila Studios"
                width={130}
                height={44}
                className="h-15 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p
              className="text-xl"
              style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
            >
              Every creation starts with a{" "}
              <span style={{ color: "#F7AC00" }}>single cube.</span>
            </p>
          </div>

          <div>
            <p
              className={`${vt323.className} mb-5 text-2xl tracking-[0.2em]`}
              style={{ color: "#F7AC00" }}
            >
              SITEMAP
            </p>
            <ul className="flex flex-col gap-3">
              {SITEMAP.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xl font-xl transition-colors hover:text-[#F7AC00]"
                    style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className={`${vt323.className} mb-5 text-2xl tracking-[0.2em]`}
              style={{ color: "#F7AC00" }}
            >
              CONTACT
            </p>
            <div className="flex items-center gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={handleIconHoverEnter}
                  onMouseLeave={handleIconHoverLeave}
                  className="inline-block transition-colors hover:text-[#F7AC00]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-white/60 pt-6 sm:flex-row">
          <p
            className="text-base text-white/70"
            style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
          >
            © {year} Agila Studios. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className={`${vt323.className} flex cursor-pointer items-center gap-1 text-xl text-white/70 transition-colors hover:text-white`}
          >
            BACK TO TOP ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
