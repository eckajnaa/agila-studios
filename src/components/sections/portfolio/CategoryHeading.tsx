"use client";

import { Silkscreen } from "next/font/google";
import { usePortfolioCategory } from "@/components/layout/PortfolioCategoryContext";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });

export default function CategoryHeading() {
  const { activeCategory } = usePortfolioCategory();

  return (
    <p
      className={`text-4xl text-[#F7AC00] [text-shadow:3px_3px_0_#000] sm:text-5xl ${silkscreen.className}`}
    >
      {`// ${activeCategory} //`}
    </p>
  );
}
