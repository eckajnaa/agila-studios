"use client";

import { Silkscreen } from "next/font/google";
import { motion } from "motion/react";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

export default function CreatorsDivider() {
  return (
    <div className={silkscreen.variable} role="presentation">
      {/* plank strip — single tile repeated horizontally */}
      <div
        className="w-full h-[60px] sm:h-[80px] md:h-[102px]"
        style={{
          backgroundImage: "url('/images/about/divider-tile.webp')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
        aria-hidden="true"
      />

      {/* scene banner — "MEET THE CREATORS" lives inside here */}
      <div
        className="relative w-full h-[120px] sm:h-[160px] md:h-[216px]"
        style={{
          backgroundImage: "url('/images/about/divider-scenes.webp')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] text-center"
            style={{
              fontFamily: "var(--font-silkscreen)",
              color: "#F28C00",
              textShadow: "3px 3px 0px #000",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            MEET THE CREATORS
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
