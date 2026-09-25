"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { createContext, Suspense, useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

// Height of the sticky PortfolioNavbar (h-20), so the scrolled-to content
// doesn't end up hidden behind it.
const STICKY_NAV_OFFSET = 80;

interface PortfolioCategoryContextValue {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const PortfolioCategoryContext = createContext<PortfolioCategoryContextValue | null>(null);

// Reads ?category= from the URL. Kept in its own component so only this (it renders
// nothing) sits behind a Suspense boundary — useSearchParams without one fails the
// production build, and wrapping the whole provider would skip prerendering the page.
function CategoryFromSearchParams({ onCategory }: { onCategory: (category: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      onCategory(category);
    }
  }, [searchParams, onCategory]);

  return null;
}

export function PortfolioCategoryProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategoryState] = useState("Builds");

  function setActiveCategory(category: string) {
    setActiveCategoryState(category);

    const content = document.getElementById("portfolio-content");
    if (content) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: content, offsetY: STICKY_NAV_OFFSET },
        ease: "power2.inOut",
      });
    }
  }

  return (
    <PortfolioCategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      <Suspense fallback={null}>
        <CategoryFromSearchParams onCategory={setActiveCategoryState} />
      </Suspense>
      {children}
    </PortfolioCategoryContext.Provider>
  );
}

export function usePortfolioCategory() {
  const context = useContext(PortfolioCategoryContext);
  if (!context) {
    throw new Error("usePortfolioCategory must be used within a PortfolioCategoryProvider");
  }
  return context;
}
