/**
 * Shared static content (nav links, social links, sitemap links) referenced
 * by Navbar, Footer, and any page. Edit with a heads-up to the other two
 * devs — this file is shared across all three pages.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/#faq" },
];

export const DISCORD_URL = "https://discord.com/invite/KfZCWfyjcc";

export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Discord", href: DISCORD_URL },
  { label: "YouTube", href: "https://youtube.com/@agilastudios" },
  { label: "Twitter", href: "https://twitter.com/agilastudios" },
  { label: "Instagram", href: "https://instagram.com/agilastudios" },
];

export const SITEMAP_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const SITE_NAME = "Agila Studios";

export const SITE_URL = "https://agila.devs.team";

export const SITE_DESCRIPTION =
  "Agila Studios — a Minecraft content studio covering builds, 3D modeling, development, video editing, scripting, and animation.";
