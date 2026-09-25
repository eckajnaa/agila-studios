import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Minecraft content studio",
    "Minecraft builds",
    "Minecraft server development",
    "Minecraft 3D modeling",
    "Minecraft video editing",
    "Minecraft animation studio",
    "Minecraft plugin development",
    "custom Minecraft builds",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Agila Studios — Delivering content since 2019",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

// Organization structured data — lets search engines show Agila Studios as a
// known entity (logo, social profiles) in results rather than just a link.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://discord.com/invite/KfZCWfyjcc",
    "https://facebook.com/agilastudios",
    "https://instagram.com/agilastudios",
    "https://twitter.com/agilastudios",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
