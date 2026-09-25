// Portfolio page — owned by Person C.
// Compose section components from @/components/sections/portfolio here:
// Hero, CategoryHeading, CategoryContent.

import type { Metadata } from "next";
import Hero from "@/components/sections/portfolio/Hero";
import CategoryHeading from "@/components/sections/portfolio/CategoryHeading";
import CategoryContent from "@/components/sections/portfolio/CategoryContent";
import { SITE_NAME } from "@/lib/constants";

const description =
  "Explore Agila Studios' Minecraft portfolio — custom builds, 3D models, plugin development, video editing, scripting, and animation.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `Portfolio | ${SITE_NAME}`,
    description,
    url: "/portfolio",
    siteName: SITE_NAME,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio | ${SITE_NAME}`,
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Hero />
      <div
        id="portfolio-content"
        className="border-b-10 border-[#3E1F0A]/60 bg-[#5A2E0C]"
        style={{
          backgroundImage: "linear-gradient(to right, #2B1608 2px, transparent 2px)",
          backgroundSize: "28px 100%",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
          <CategoryHeading />
        </div>
        <CategoryContent />
      </div>
    </>
  );
}
