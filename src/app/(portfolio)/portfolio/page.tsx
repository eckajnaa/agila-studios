// Portfolio page — owned by Person C.
// Compose section components from @/components/sections/portfolio here:
// Hero, CategoryTabs, BuildsGrid.

import Hero from "@/components/sections/portfolio/Hero";

export default function PortfolioPage() {
  return (
    <>
      <Hero />
      <div
        className="min-h-screen bg-[#5A2E0C]"
        style={{
          backgroundImage: "linear-gradient(to right, #2B1608 2px, transparent 2px)",
          backgroundSize: "28px 100%",
        }}
      >
        {/* CategoryTabs, BuildsGrid go here */}
      </div>
    </>
  );
}
