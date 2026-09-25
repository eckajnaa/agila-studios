import type { Metadata } from "next";
import Hero from "@/components/sections/about/Hero";
import CreatorsDivider from "@/components/sections/about/CreatorsDivider";
import MeetTheCreators from "@/components/sections/about/MeetTheCreators";
import { SITE_NAME } from "@/lib/constants";

const description =
  "Meet the creators, builders, and developers behind Agila Studios — a Minecraft content studio delivering builds, models, animation, and edits since 2019.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description,
    url: "/about",
    siteName: SITE_NAME,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${SITE_NAME}`,
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <CreatorsDivider />
      <MeetTheCreators />
    </>
  );
}
