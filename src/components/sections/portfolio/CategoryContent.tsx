"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Silkscreen } from "next/font/google";
import { useRef, useState } from "react";
import { usePortfolioCategory } from "@/components/layout/PortfolioCategoryContext";
import { CATEGORY_IMAGES } from "./categoryImages";
import Wallpaper from "./Wallpaper";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CategoryContent() {
  const { activeCategory, restored } = usePortfolioCategory();
  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  const hasShownRestored = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wipRef = useRef<HTMLParagraphElement>(null);

  // Fade the current grid out, then swap in the new category's content.
  useGSAP(
    () => {
      if (!restored) return;
      // The category restored from the URL on load appears instantly — no switch animation.
      if (!hasShownRestored.current) {
        hasShownRestored.current = true;
        if (activeCategory !== displayCategory) setDisplayCategory(activeCategory);
        return;
      }
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
    { dependencies: [activeCategory, restored] },
  );

  // Reveal each wallpaper as it scrolls into view. Items already above the
  // fold when the grid mounts (e.g. right after a category switch) reveal
  // immediately since they already satisfy the scroll trigger.
  useGSAP(
    () => {
      // Only categories with a grid get the reveal; empty ones (e.g. Development) show WIP.
      if (containerRef.current) {
        const items = gsap.utils.toArray<HTMLElement>(containerRef.current.children);
        gsap.set(items, { opacity: 0, y: 30 });

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }),
        });
      }

      // Always runs, including for empty categories: the content's height changes with each
      // category (10 images, 1 image, or just the WIP text), which shifts where every other
      // trigger on the page (like the footer's reveal) falls. Skipping this for the short
      // WIP layout left the footer's trigger below the new page end, so it never revealed.
      // This effect runs after the new category's layout is committed, so positions are
      // measured against the incoming layout, not the outgoing one.
      ScrollTrigger.refresh();
    },
    { dependencies: [displayCategory], revertOnUpdate: true },
  );

  // Slow looping pulse on the "WIP" placeholder, like a blinking construction sign.
  useGSAP(
    () => {
      if (!wipRef.current) return;
      gsap.to(wipRef.current, {
        opacity: 0.4,
        duration: 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { dependencies: [displayCategory], revertOnUpdate: true },
  );

  const images = CATEGORY_IMAGES[displayCategory] ?? [];

  if (images.length === 0) {
    return (
      <p
        ref={wipRef}
        className={`${restored ? "" : "invisible"} px-4 py-24 text-center text-4xl text-[#FFB300] [text-shadow:3px_3px_0_#000] sm:text-5xl ${silkscreen.className}`}
      >
        WIP
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${restored ? "" : "invisible"} mx-auto grid max-w-[76rem] grid-cols-1 gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2`}
    >
      {images.map((item) => (
        <Wallpaper
          key={item.src}
          src={item.src}
          alt={item.alt}
          title={item.title}
          youtubeId={item.youtubeId}
          videoSrc={item.videoSrc}
          externalUrl={item.externalUrl}
        />
      ))}
    </div>
  );
}
