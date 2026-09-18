import { Outfit, VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <header className="sticky top-0 z-50 bg-[#2B1608] shadow-[0_15px_0_0_#F08100]">
      <nav
        className={`mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 ${vt323.className}`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/LogoLight.png"
            alt="Agila Studios"
            width={152}
            height={68}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {PORTFOLIO_NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base transition-colors hover:text-orange-300 ${
                    index === 0 ? "text-orange-400" : "text-orange-100/90"
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
            className={`rounded-full bg-orange-500 px-5 py-2 text-base font-bold text-[#2B1608] transition-colors hover:bg-orange-400 ${outfit.className}`}
          >
            Join Discord
          </a>
        </div>
      </nav>
    </header>
  );
}
