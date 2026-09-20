"use client";

import { Silkscreen } from "next/font/google";
import { usePortfolioCategory } from "@/components/layout/PortfolioCategoryContext";
import { CATEGORY_IMAGES } from "./categoryImages";
import Wallpaper from "./Wallpaper";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });

export default function CategoryContent() {
  const { activeCategory } = usePortfolioCategory();
  const images = CATEGORY_IMAGES[activeCategory] ?? [];

  if (images.length === 0) {
    return (
      <p
        className={`px-4 py-24 text-center text-4xl text-[#FFB300] [text-shadow:3px_3px_0_#000] sm:text-5xl ${silkscreen.className}`}
      >
        WIP
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2">
      {images.map((item) => (
        <Wallpaper
          key={item.src}
          src={item.src}
          alt={item.alt}
          youtubeId={item.youtubeId}
          videoSrc={item.videoSrc}
          externalUrl={item.externalUrl}
        />
      ))}
    </div>
  );
}
