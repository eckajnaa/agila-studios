"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Outfit, Silkscreen } from "next/font/google";
import { useRef } from "react";
import { onPreloaderDone } from "@/lib/preloaderStatus";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });
const outfit = Outfit({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !subtitleRef.current) return;

    // Split into words first so each word stays an unbreakable unit — chars alone let the
    // browser wrap mid-word ("Agila Stud / ios") on narrow screens.
    const split = new SplitText(headingRef.current, { type: "words,chars" });

    // This hero is the first thing on the page, so it's already covered by the
    // fixed-position Preloader at load — playing the reveal immediately on
    // mount meant it ran and finished while still hidden behind it. Set the
    // hidden state now, but hold the actual animation until the preloader is
    // actually done.
    gsap.set(split.chars, { opacity: 0, y: 40 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(sectionRef.current, { borderBottomWidth: 0 });

    const unsubscribe = onPreloaderDone(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(split.chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
        .to(sectionRef.current, { borderBottomWidth: 10, duration: 0.5, ease: "power2.out" }, "-=0.3");
    });

    return () => {
      unsubscribe();
      split.revert();
    };
  });

  // Subtle parallax drift on the grid background as the hero scrolls past.
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.to(sectionRef.current, {
        backgroundPosition: "0px 120px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center overflow-hidden border-b-10 border-[#3E1F0A] bg-[#2B1608] py-24"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(240, 129, 0, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(240, 129, 0, 0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <h1
          ref={headingRef}
          // Fluid size so the heading never overflows: on phones "Studios" (4.75em wide) always
          // fits its own line; from sm up "Agila Studios" (8.5em) fits on one line. Caps match
          // the previous text-7xl / sm:text-8xl.
          className={`text-[length:min(4.5rem,calc((100vw-32px)/5))] text-[#FFB300] [text-shadow:3px_3px_0_#000] sm:text-[length:min(6rem,calc((100vw-48px)/8.8))] ${silkscreen.className}`}
        >
          Agila Studios
        </h1>
        <p
          ref={subtitleRef}
          className={`mt-10 max-w-none text-2xl text-[#FFF7E0] sm:text-3xl 2xl:whitespace-nowrap ${outfit.className}`}
        >
          Each creation is crafted with precision, creativity, and passion for
          the game.
        </p>
      </div>
    </section>
  );
}
