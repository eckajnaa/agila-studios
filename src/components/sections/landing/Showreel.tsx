"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function Showreel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // One scroll-triggered timeline reveals the whole section together (frame,
  // then heading/copy/pointer hint) the moment it scrolls into view — matching
  // the fade-and-rise entrance used across the rest of the landing page.
  // The play button's pulse and the pointer's nudge keep looping after that.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION, () => {
        // Reduced motion: just show everything, no scroll/pulse/bounce animation.
        gsap.set([frameRef.current, textRef.current], { opacity: 1, y: 0 });
      });
      mm.add(`not all and ${REDUCED_MOTION}`, () => {
        gsap.set(frameRef.current, { opacity: 0, y: 40 });
        gsap.set(textRef.current, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
        tl.to(frameRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }).to(
          textRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        );

        gsap.to(".showreel-play-btn", {
          scale: 1.06,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        // Nudges along the arrow's own (rotated) x-axis, so it points up at
        // the video on mobile (stacked) and left at it on desktop (side by side).
        gsap.to(".showreel-pointer-bounce", {
          x: 7,
          duration: 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: sectionRef },
  );

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFF6E5] px-4 py-20 sm:px-10 lg:px-16 xl:px-20"
      aria-labelledby="showreel-heading"
    >
      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
        {/* Video, flush left on desktop / top on mobile */}
        <div
          ref={frameRef}
          className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-[#2B1608] bg-[#1f1208] shadow-[0_6px_0_0_#000] lg:flex-[7]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/showreel-poster.jpg"
            preload="none"
            playsInline
            controls={playing}
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play the Agila Studios showreel"
              className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/images/showreel-poster.jpg')" }}
            >
              <span
                className="absolute inset-0"
                style={{ background: "rgba(43,22,8,0.35)" }}
                aria-hidden="true"
              />
              <span
                className="showreel-play-btn relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2B1608] bg-[#F08100] opacity-70 shadow-[0_6px_0_0_#BF500D] transition-transform hover:scale-105 sm:h-24 sm:w-24"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[#2B1608] sm:h-10 sm:w-10">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Heading + copy, flush right on desktop / bottom on mobile */}
        <div ref={textRef} className="w-full text-center lg:flex-[3] lg:text-left">
          <h2
            id="showreel-heading"
            className="mb-3 whitespace-nowrap text-3xl font-bold tracking-wider text-[#2a1a0e] sm:text-4xl lg:text-[clamp(1.5rem,2.6vw,2.75rem)]"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            WATCH THE FULL REEL
          </h2>
          <p
            className="mx-auto mb-5 max-w-md text-lg text-[#5a4632] lg:mx-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We don&apos;t just build in Minecraft. We tell stories in it.
            <br />
            This is Agila Studios.
          </p>

          {/* Points up at the video on mobile, left at it on desktop */}
          <div
            className="flex items-center justify-center gap-2 lg:justify-start"
            aria-hidden="true"
          >
            <div className="showreel-pointer-wrap -rotate-90 text-[#F08100] lg:rotate-180">
              <div className="showreel-pointer-bounce">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
            <span
              className="text-sm font-semibold tracking-wide text-[#5a4632]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Tap play to watch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
