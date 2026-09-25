"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Outfit, VT323 } from "next/font/google";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DISCORD_URL, NAV_LINKS } from "@/lib/constants";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const outfit = Outfit({ weight: "700", subsets: ["latin"] });

gsap.registerPlugin(useGSAP);

export default function Navbar({ showBottomBorder = false }: { showBottomBorder?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileListRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  // stagger links in each time the mobile menu opens
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

  return (
    <header className={`sticky top-0 z-50 bg-[#2B1608] ${showBottomBorder ? "shadow-[0_15px_0_0_#F08100]" : ""}`}>
      <nav
        className={`flex h-20 w-full items-center justify-between px-6 sm:px-10 xl:px-16 ${vt323.className}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Agila Studios home">
          <Image
            src="/LogoLight.png"
            alt="Agila Studios logo"
            width={152}
            height={68}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Nav links + CTA + hamburger */}
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/";
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xl transition-colors hover:text-[#FFB300] ${
                      isActive ? "text-[#FFB300]" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Join Discord */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex translate-y-0 items-center justify-center rounded-[0.4375rem] bg-[#F08100] px-5 py-2 text-base font-bold text-[#2B1608] shadow-[0_0.375rem_0_0_#BF500D] transition-all duration-150 hover:translate-y-[0.375rem] hover:bg-orange-400 hover:shadow-[0_0_0_0_#BF500D] ${outfit.className}`}
          >
            Join Discord
          </a>

          {/* Hamburger button — hidden at xl */}
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

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-t border-[#F08100]/40 bg-[#2B1608] transition-[max-height] duration-300 xl:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul ref={mobileListRef} className="flex flex-col gap-4 px-6 py-6 sm:px-10">
          {NAV_LINKS.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/";
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`${vt323.className} inline-block text-xl transition-colors hover:text-[#FFB300] ${
                      isActive ? "text-[#FFB300]" : "text-orange-100/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </header>
  );
}
