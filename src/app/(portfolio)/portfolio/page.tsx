// Portfolio page — owned by Person C.
// Compose section components from @/components/sections/portfolio here:
// Hero, CategoryTabs, BuildsGrid.

import Hero from "@/components/sections/portfolio/Hero";
import CategoryHeading from "@/components/sections/portfolio/CategoryHeading";

export default function PortfolioPage() {
  return (
    <>
      <Hero />
      <div
        className="min-h-screen border-b-10 border-[#3E1F0A]/60 bg-[#5A2E0C]"
        style={{
          backgroundImage: "linear-gradient(to right, #2B1608 2px, transparent 2px)",
          backgroundSize: "28px 100%",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
          <CategoryHeading />
        </div>
        {/* CategoryTabs, BuildsGrid go here */}
      </div>
    </>
  );
}
