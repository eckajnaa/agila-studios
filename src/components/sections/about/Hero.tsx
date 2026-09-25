"use client";

import { Silkscreen, Outfit } from "next/font/google";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-about-body",
  display: "swap",
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className={`${silkscreen.variable} ${outfit.variable} relative overflow-hidden`}
      style={{ backgroundColor: "#2B1608" }}
      aria-label="About Agila Studios"
    >
      {/* Background image — parallax drift on scroll */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/about/hero-bg.webp')",
          y: bgY,
          scale: 1.1,
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-10 sm:pt-28 sm:pb-24">

      {/* WE ARE + AGILA */}
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="flex flex-col items-center"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="text-3xl tracking-widest sm:text-4xl md:text-5xl"
              style={{
                fontFamily: "var(--font-silkscreen)",
                color: "#FFB300",
                textShadow: "2px 2px 0px #000",
              }}
            >
              WE ARE
            </span>
            <motion.span
              className="mt-2 leading-none text-7xl sm:text-8xl md:text-[128px]"
              style={{
                fontFamily: "var(--font-silkscreen)",
                color: "#F28C00",
                textShadow: "3px 3px 0px #000",
              }}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              AGILA
            </motion.span>
          </motion.h1>
        </div>

        {/* Body paragraphs */}
        <motion.div
          className="mx-auto mt-16 max-w-5xl space-y-8 text-center"
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <p
            className="text-base leading-relaxed sm:text-lg md:text-xl"
            style={{
              fontFamily: "var(--font-about-body)",
              color: "#FFF7E8",
            }}
          >
            Agila — an iconic symbol in the Philippines — was founded by a group
            of passionate builders who believed that Minecraft was more than a
            game. It&apos;s a canvas. We push the limits of what&apos;s possible
            in-game, creating worlds that feel alive, meaningful, and
            breathtaking.
          </p>

          <p
            className="text-base leading-relaxed sm:text-lg md:text-xl"
            style={{
              fontFamily: "var(--font-about-body)",
              color: "#FFF7E8",
            }}
          >
            From server networks to small indie studios, we partner with clients
            who share our vision for quality and creativity. Every pixel is
            intentional. Every block is placed with purpose.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
