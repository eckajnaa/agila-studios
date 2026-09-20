"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Silkscreen } from "next/font/google";
import { useRef, useState } from "react";
import { usePortfolioCategory } from "@/components/layout/PortfolioCategoryContext";
import { CATEGORY_IMAGES } from "./categoryImages";
import Wallpaper from "./Wallpaper";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP);

export default function CategoryContent() {
  const { activeCategory } = usePortfolioCategory();
  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade the current grid out, then swap in the new category's content.
  useGSAP(
    () => {
      if (activeCategory === displayCategory) return;

      const items = containerRef.current
        ? gsap.utils.toArray<HTMLElement>(containerRef.current.children)
        : [];

      if (items.length === 0) {
        setDisplayCategory(activeCategory);
        return;
      }

      gsap.to(items, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        stagger: 0.02,
        onComplete: () => setDisplayCategory(activeCategory),
      });
    },
    { dependencies: [activeCategory] },
  );

  // Stagger the new grid in once it has rendered.
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>(containerRef.current.children);
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 },
      );
    },
    { dependencies: [displayCategory] },
  );

  const images = CATEGORY_IMAGES[displayCategory] ?? [];

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
    <div
      ref={containerRef}
      className="mx-auto grid max-w-[88rem] grid-cols-1 gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2"
    >
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
