import Link from "next/link";
import { DISCORD_URL, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-900/40 bg-[#2a1a12]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-orange-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded bg-orange-600 text-sm font-black text-[#2a1a12]">
            AS
          </span>
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-orange-100/80 transition-colors hover:text-orange-300"
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
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-[#2a1a12] transition-colors hover:bg-orange-500"
          >
            Join Discord
          </a>
        </div>
      </nav>
    </header>
  );
}
