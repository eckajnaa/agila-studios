"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function Showreel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Frame rises into place on scroll; the play button gets its own gentle
  // pulse so it reads as "click me" without being obnoxious about it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION, () => {
        // Reduced motion: just show everything, no scroll/pulse animation.
        gsap.set(frameRef.current, { opacity: 1, y: 0 });
      });
      mm.add(`not all and ${REDUCED_MOTION}`, () => {
        gsap.from(frameRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: frameRef.current, start: "top 85%" },
        });
        gsap.to(".showreel-play-btn", {
          scale: 1.06,
          duration: 1.1,
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
      className="bg-[#FFF6E5] px-4 py-20"
      aria-labelledby="showreel-heading"
    >
      <motion.h2
        id="showreel-heading"
        className="mb-3 text-center text-4xl tracking-wider text-[#2a1a0e] sm:text-5xl"
        style={{ fontFamily: "var(--font-pixel)" }}
        initial={{ opacity: 0.4, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        WATCH THE FULL REEL
      </motion.h2>
      <motion.p
        className="mx-auto mb-10 max-w-xl text-center text-lg text-[#5a4632]"
        style={{ fontFamily: "var(--font-body)" }}
        initial={{ opacity: 0.4, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        A cinematic cut of builds, animation, and edits — 41 seconds, sound on.
      </motion.p>

      <div
        ref={frameRef}
        className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-lg border-2 border-[#2B1608] bg-[#1f1208] shadow-[0_6px_0_0_#000]"
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
              className="showreel-play-btn relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2B1608] bg-[#F08100] shadow-[0_6px_0_0_#BF500D] transition-transform hover:scale-105 sm:h-24 sm:w-24"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[#2B1608] sm:h-10 sm:w-10">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
