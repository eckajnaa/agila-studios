"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({ weight: "700", subsets: ["latin"], display: "swap" });

gsap.registerPlugin(useGSAP);

// Seconds for one full set of logos to scroll past.
const MARQUEE_SECONDS = 18;

const CREATORS = [
  { name: "EyStreem", image: "/images/eystreem.svg", large: true },
  { name: "Creator 2", image: "/images/character01.svg" },
  { name: "Creator 3", image: "/images/flame-mark.svg", large: true },
  { name: "Creator 4", image: "/images/character02.svg" },
];

export default function WorksSeenOn() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);

  // The track holds the logos twice, so sliding it left by half its width
  // lines the second copy up exactly where the first started — a seamless loop.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        loopRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: MARQUEE_SECONDS,
          ease: "none",
          repeat: -1,
        });
        return () => {
          loopRef.current = null;
        };
      });
    },
    { scope: marqueeRef },
  );

  // Ease the scroll to a stop on hover instead of freezing abruptly.
  function setMarqueeSpeed(timeScale: number) {
    if (loopRef.current) gsap.to(loopRef.current, { timeScale, duration: 0.5, ease: "power2.out" });
  }

  return (
    <section className="bg-[#2a1a0e] py-16" aria-labelledby="seen-on-heading">
      {/* Text and logos centered together as one group */}
      <div className="flex w-full flex-col items-center gap-10 px-10 sm:px-24 lg:flex-row lg:items-center lg:justify-center lg:gap-20 xl:px-44">

        {/* Left */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0.4, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 id="seen-on-heading" className={`${silkscreen.className} whitespace-nowrap tracking-wider text-[clamp(1.5rem,7vw,3rem)] text-orange-100`}>
            WORKS SEEN ON
          </h2>
          <p className="mt-4 max-w-lg text-xl leading-relaxed text-orange-100/60" style={{ fontFamily: "var(--font-body)" }}>
            {/* Fixed 3-line break on desktop; wraps naturally on smaller screens */}
            Our team has worked alongside well-known <br className="hidden lg:block" />
            content creators worldwide, helping transform <br className="hidden lg:block" />
            ideas into immersive Minecraft experiences.
          </p>
        </motion.div>

        {/* Right: infinitely scrolling logos, faded out at both edges */}
        <div
          ref={marqueeRef}
          className="w-full min-w-0 overflow-hidden lg:max-w-2xl lg:flex-1"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
          onMouseEnter={() => setMarqueeSpeed(0)}
          onMouseLeave={() => setMarqueeSpeed(1)}
        >
          <div ref={trackRef} className="flex w-max items-center py-4">
            {[...CREATORS, ...CREATORS].map((creator, i) => {
              const isCopy = i >= CREATORS.length;
              return (
                <div
                  key={`${creator.name}-${i}`}
                  aria-hidden={isCopy}
                  // Margin instead of flex gap so both copies are exactly the same width.
                  className={`relative mr-12 shrink-0 transition-transform duration-200 hover:scale-110 hover:rotate-3 ${creator.large ? "h-40 w-40" : "h-32 w-32"}`}
                >
                  <Image src={creator.image} alt={isCopy ? "" : creator.name} fill unoptimized className="object-contain" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
