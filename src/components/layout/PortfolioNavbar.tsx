"use client";

import { Outfit, VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DISCORD_URL } from "@/lib/constants";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });
const outfit = Outfit({ weight: "700", subsets: ["latin"] });

// Category links match the CategoryTabs sections on the portfolio page.
const PORTFOLIO_NAV_LINKS = [
  { label: "Builds", href: "/portfolio#builds" },
  { label: "Models", href: "/portfolio#models" },
  { label: "Development", href: "/portfolio#development" },
  { label: "Editing", href: "/portfolio#editing" },
  { label: "Scripts", href: "/portfolio#scripts" },
  { label: "Animation", href: "/portfolio#animation" },
];

export default function PortfolioNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#2B1608] shadow-[0_15px_0_0_#F08100]">
      <nav
        className={`flex h-20 w-full items-center justify-between px-6 sm:px-10 xl:px-16 ${vt323.className}`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/LogoLight.png"
            alt="Agila Studios"
            width={152}
            height={68}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 xl:flex">
            {PORTFOLIO_NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg transition-colors hover:text-orange-300 ${
                    index === 0 ? "text-[#F7AC00]" : "text-orange-100/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-[0.4375rem] bg-orange-500 px-7 py-3 text-xs font-bold text-[#2B1608] shadow-[0_0.375rem_0_0_#BF500D] transition-colors hover:bg-orange-400 ${outfit.className}`}
          >
            Join Discord
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-orange-100 transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-orange-100 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-orange-100 transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[#F08100]/40 bg-[#2B1608] transition-[max-height] duration-300 xl:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-6 sm:px-10">
          {PORTFOLIO_NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg transition-colors hover:text-orange-300 ${
                  index === 0 ? "text-[#F7AC00]" : "text-orange-100/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
