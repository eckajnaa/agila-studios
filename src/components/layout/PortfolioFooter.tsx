"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Outfit, VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DISCORD_URL, SITE_NAME } from "@/lib/constants";

const outfit = Outfit({ weight: ["400", "700"], subsets: ["latin"] });
const vt323 = VT323({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const PORTFOLIO_SITEMAP_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Faq", href: "/#faq" },
];

const SOCIAL_ICON_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agilastudios", src: "/Facebook.png" },
  { label: "Instagram", href: "https://instagram.com/agilastudios", src: "/Instagram.png" },
  { label: "X", href: "https://twitter.com/agilastudios", src: "/X.png" },
  { label: "Discord", href: DISCORD_URL, src: "/Discord.png" },
];

function handleIconHoverEnter(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { scale: 1.2, y: -3, duration: 0.25, ease: "back.out(2)" });
}

function handleIconHoverLeave(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out" });
}

function handleArrowHoverEnter(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { y: -4, duration: 0.3, ease: "power2.out" });
}

function handleArrowHoverLeave(event: React.MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
}

export default function PortfolioFooter() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: footerRef },
  );

  function scrollToTop() {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
  }

  return (
    <footer
      ref={footerRef}
      className="text-orange-100"
      style={{
        background:
          "linear-gradient(to bottom, rgba(90, 46, 12, 0.69) 0%, rgba(43, 22, 8, 0.30) 100%), #2B1608",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="-mt-2">
            <Image
              src="/LogoLight.png"
              alt={SITE_NAME}
              width={152}
              height={68}
              className="h-16 w-auto"
            />
            <p className={`mt-1 max-w-xs text-sm font-bold text-orange-100 ${outfit.className}`}>
              Every creation starts with a{" "}
              <span className="text-[#F7AC00]">single cube.</span>
            </p>
          </div>

          <div>
            <p className={`text-3xl uppercase tracking-[0.15em] text-[#F7AC00] ${vt323.className}`}>
              Sitemap
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {PORTFOLIO_SITEMAP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-bold text-orange-100/90 transition-colors hover:text-orange-300 ${outfit.className}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-3xl uppercase tracking-[0.15em] text-[#F7AC00] ${vt323.className}`}>
              Contact
            </p>
            <ul className="mt-2 flex gap-1">
              {SOCIAL_ICON_LINKS.map(({ label, href, src }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onMouseEnter={handleIconHoverEnter}
                    onMouseLeave={handleIconHoverLeave}
                    className="flex h-9 w-9 items-center justify-center"
                  >
                    <Image src={src} alt={label} width={28} height={28} className="h-7 w-7" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-[#5A2E0C] pt-3 sm:flex-row">
          <p className={`text-sm font-normal tracking-wide text-[#F08100] ${outfit.className}`}>
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 text-lg uppercase tracking-widest text-[#F08100] transition-colors hover:text-orange-300 ${vt323.className}`}
          >
            Back to top
            <Image
              src="/ArrowUp.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              onMouseEnter={handleArrowHoverEnter}
              onMouseLeave={handleArrowHoverLeave}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
