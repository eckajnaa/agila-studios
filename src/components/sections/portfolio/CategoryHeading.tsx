"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Silkscreen } from "next/font/google";
import { useRef, useState } from "react";
import { usePortfolioCategory } from "@/components/layout/PortfolioCategoryContext";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP);

export default function CategoryHeading() {
  const { activeCategory } = usePortfolioCategory();
  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (activeCategory === displayCategory) return;

      gsap
        .timeline()
        .to(textRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setDisplayCategory(activeCategory),
        })
        .fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
    },
    { dependencies: [activeCategory] },
  );

  return (
    <p
      ref={textRef}
      className={`text-4xl text-[#F7AC00] [text-shadow:3px_3px_0_#000] sm:text-5xl ${silkscreen.className}`}
    >
      {`// ${displayCategory} //`}
    </p>
  );
}
