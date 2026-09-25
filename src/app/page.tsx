/**
 * Landing page — owned by Person A.
 * Navbar is the shared component (read-only for this page).
 * LandingFooter is a landing-page-only component — does NOT touch
 * the shared Footer.tsx used by About and Portfolio.
 *
 * Fonts: VT323 (pixel headings) + Outfit (body) loaded via next/font/google
 * and injected as CSS variables so every section component can reference them
 * with style={{ fontFamily: "var(--font-pixel)" }} or var(--font-body).
 */
import { VT323, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/landing/Hero";
import StatsBar from "@/components/sections/landing/StatsBar";
import Services from "@/components/sections/landing/Services";
import PortfolioCarousel from "@/components/sections/landing/PortfolioCarousel";
import Showreel from "@/components/sections/landing/Showreel";
import HowItWorks from "@/components/sections/landing/HowItWorks";
import Testimonials from "@/components/sections/landing/Testimonials";
import WorksSeenOn from "@/components/sections/landing/WorksSeenOn";
import FAQ from "@/components/sections/landing/FAQ";
import Contact from "@/components/sections/landing/Contact";
import LandingFooter from "@/components/sections/landing/LandingFooter";
import ScrollProgress from "@/components/layout/ScrollProgress";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${vt323.variable} ${outfit.variable}`} style={{ fontFamily: "var(--font-body)" }}>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <PortfolioCarousel />
        <Showreel />
        <HowItWorks />
        <Testimonials />
        <WorksSeenOn />
        <FAQ />
        <Contact />
      </main>
      <LandingFooter />
    </div>
  );
}
