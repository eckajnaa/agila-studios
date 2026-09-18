import Image from "next/image";
import Link from "next/link";
import { DISCORD_URL } from "@/lib/constants";

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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.svg"
            alt="Agila Studios"
            width={165}
            height={73}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {PORTFOLIO_NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-orange-300 ${
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
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-[#2B1608] transition-colors hover:bg-orange-400"
          >
            Join Discord
          </a>
        </div>
      </nav>
    </header>
  );
}
