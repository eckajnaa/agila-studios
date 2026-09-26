"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Outfit, VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { DISCORD_URL } from "@/lib/constants";
import {
  categoryHash,
  PORTFOLIO_CATEGORIES,
  usePortfolioCategory,
} from "@/components/layout/PortfolioCategoryContext";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });
const outfit = Outfit({ weight: "700", subsets: ["latin"] });

gsap.registerPlugin(useGSAP);

// Built from the shared category list so the hashes always match what the category
// provider reads back on refresh (e.g. /portfolio#models).
const PORTFOLIO_NAV_LINKS = PORTFOLIO_CATEGORIES.map((label) => ({
  label,
  href: `/portfolio${categoryHash(label)}`,
}));

export default function PortfolioNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeCategory: currentCategory, setActiveCategory, restored } = usePortfolioCategory();
  // No link is highlighted until the category is restored from the URL, so a refresh on
  // #development doesn't briefly highlight Builds.
  const activeCategory = restored ? currentCategory : null;
  const mobileListRef = useRef<HTMLUListElement>(null);
  const hasPoppedRestored = useRef(false);

  // Stagger the mobile menu links in each time the panel opens.
  useGSAP(
    () => {
      if (!menuOpen || !mobileListRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>(mobileListRef.current.children);
      gsap.fromTo(
        items,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 },
      );
    },
    { dependencies: [menuOpen] },
  );

  // Quick scale-pop on whichever nav link just became active (desktop + mobile).
  useGSAP(
    () => {
      if (!activeCategory) return;
      // Don't pop the link that's highlighted on page load — only on actual switches.
      if (!hasPoppedRestored.current) {
        hasPoppedRestored.current = true;
        return;
      }
      const targets = document.querySelectorAll(`[data-nav-link="${activeCategory}"]`);
      if (targets.length === 0) return;
      gsap.fromTo(
        targets,
        { scale: 0.85 },
        { scale: 1, duration: 0.4, ease: "back.out(3)" },
      );
    },
    { dependencies: [activeCategory] },
  );

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
            {PORTFOLIO_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-nav-link={link.label}
                  onClick={() => setActiveCategory(link.label)}
                  className={`inline-block text-lg transition-colors hover:text-orange-300 ${
                    activeCategory === link.label ? "text-[#F7AC00]" : "text-orange-100/90"
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
            className={`inline-flex translate-y-0 items-center justify-center rounded-[0.4375rem] bg-[#F08100] font-bold text-[#2B1608] transition-all duration-150 hover:bg-orange-400 hover:shadow-none whitespace-nowrap text-sm px-3 py-1.5 shadow-[0_4px_0_0_#BF500D] hover:translate-y-[4px] sm:text-base sm:px-5 sm:py-2 sm:shadow-[0_0.375rem_0_0_#BF500D] sm:hover:translate-y-[0.375rem] ${outfit.className}`}          
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
        <ul ref={mobileListRef} className="flex flex-col gap-4 px-6 py-6 sm:px-10">
          {PORTFOLIO_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-nav-link={link.label}
                onClick={() => {
                  setActiveCategory(link.label);
                  setMenuOpen(false);
                }}
                className={`${vt323.className} inline-block text-lg transition-colors hover:text-orange-300 ${
                  activeCategory === link.label ? "text-[#F7AC00]" : "text-orange-100/90"
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
