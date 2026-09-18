/**
 * Shared Navbar — used by Landing, About, and Portfolio pages.
 * Logo: /public/Logo.svg
 * Colors: bg #2B1608, bottom border #F08100, button #F08100
 * Nav links: VT323 pixel font
 * Button: dark orange bottom shadow for 3D lift effect
 */
import Image from "next/image";
import Link from "next/link";
import { VT323 } from "next/font/google";
import { DISCORD_URL, NAV_LINKS } from "@/lib/constants";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{ backgroundColor: "#2B1608", borderBottom: "2px solid #F08100" }}
    >
      <nav className="mx-auto flex h-23 w-full max-w-7xl items-center justify-between px-6 sm:px-10">

        {/* Logo — left edge */}
        <Link href="/" className="flex items-center" aria-label="Agila Studios home">
          <Image
            src="/images/Logo.svg"
            alt="Agila Studios logo"
            width={120}
            height={40}
            className="h-19 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav links + CTA — right edge */}
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${vt323.className} text-xl text-white/90 transition-colors hover:text-[#FFB300]`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Join Discord button with dark orange 3D shadow */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-5 py-2 text-lg font-semibold text-[#2B1608] transition-opacity hover:opacity-90 shadow-[0_4px_0px_#BF500D]"
            style={{
              backgroundColor: "#F08100",
              fontFamily: "var(--font-body, 'Outfit', sans-serif)",
            }}
          >
            Join Discord
          </a>
        </div>

      </nav>
    </header>
  );
}
