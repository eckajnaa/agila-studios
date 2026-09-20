"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PortfolioCategoryContextValue {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const PortfolioCategoryContext = createContext<PortfolioCategoryContextValue | null>(null);

export function PortfolioCategoryProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("Builds");

  return (
    <PortfolioCategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
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
