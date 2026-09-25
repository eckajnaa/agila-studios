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
  // False until the category has been read from the URL after page load. Consumers hide
  // category-specific UI until then, so a refresh on #development shows Development
  // straight away instead of flashing the prerendered default (Builds) first.
  restored: boolean;
}

const PortfolioCategoryContext = createContext<PortfolioCategoryContextValue | null>(null);

export const PORTFOLIO_CATEGORIES = [
  "Builds",
  "Models",
  "Development",
  "Editing",
  "Scripts",
  "Animation",
] as const;

const DEFAULT_CATEGORY = PORTFOLIO_CATEGORIES[0];

// The URL hash is the source of truth for the active category: /portfolio#models.
export function categoryHash(category: string) {
  return `#${category.toLowerCase()}`;
}

// Case-insensitive, so "#models", "#Models" and "Models" all match. Unknown values return null.
function matchCategory(value: string | null) {
  const wanted = value?.replace(/^#/, "").toLowerCase();
  if (!wanted) return null;
  return PORTFOLIO_CATEGORIES.find((category) => category.toLowerCase() === wanted) ?? null;
}

// Keeps the hash in sync without adding a history entry (navbar links already add one).
// Passing the existing history.state along keeps the Next.js router's bookkeeping intact.
function replaceHash(category: string) {
  const url = `${window.location.pathname}${categoryHash(category)}`;
  window.history.replaceState(window.history.state, "", url);
}

// Supports older links like /portfolio?category=Models (used by the landing page's
// Services cards) by converting them to the hash form. Kept in its own component so only
// this (it renders nothing) sits behind a Suspense boundary — useSearchParams without one
// fails the production build, and wrapping the whole provider would skip prerendering.
function CategoryFromSearchParams({ onCategory }: { onCategory: (category: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = matchCategory(searchParams.get("category"));
    if (category) {
      onCategory(category);
      replaceHash(category);
    }
  }, [searchParams, onCategory]);

  return null;
}

export function PortfolioCategoryProvider({ children }: { children: ReactNode }) {
  // Always starts as the default so server and client render the same HTML; the hash
  // (which only the browser knows) is applied right after hydration.
  const [activeCategory, setActiveCategoryState] = useState<string>(DEFAULT_CATEGORY);
  const [restored, setRestored] = useState(false);

  // Restore the category from the hash on load / refresh / direct links, and follow it on
  // Back/Forward. With no hash, a load keeps the current category (a ?category= link may
  // have just set it), while Back/Forward to plain /portfolio returns to the default.
  useEffect(() => {
    function syncFromHash(fallbackToDefault: boolean) {
      const category = matchCategory(window.location.hash);
      if (category) setActiveCategoryState(category);
      else if (fallbackToDefault) setActiveCategoryState(DEFAULT_CATEGORY);
    }
    const onHistoryChange = () => syncFromHash(true);

    syncFromHash(false);
    // Intentional: the URL hash only exists in the browser, so it can only be read after
    // hydration. Batched with the category update above, so both apply in one render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRestored(true);
    window.addEventListener("hashchange", onHistoryChange);
    window.addEventListener("popstate", onHistoryChange);
    return () => {
      window.removeEventListener("hashchange", onHistoryChange);
      window.removeEventListener("popstate", onHistoryChange);
    };
  }, []);

  function setActiveCategory(category: string) {
    setActiveCategoryState(category);
    replaceHash(category);

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
    <PortfolioCategoryContext.Provider value={{ activeCategory, setActiveCategory, restored }}>
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
