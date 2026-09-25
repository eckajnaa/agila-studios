"use client";

import Image from "next/image";
import { Silkscreen } from "next/font/google";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

// Keep the loader up long enough for the bar animation to read
const MIN_DURATION_MS = 1400;
const TICK_MS = 140;

function statusFor(progress: number) {
  if (progress >= 100) return "Done!";
  if (progress >= 70) return "Loading chunks";
  if (progress >= 35) return "Building terrain";
  return "Generating world";
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Page is "ready" once window load has fired and the minimum time has passed
  useEffect(() => {
    let loaded = document.readyState === "complete";
    let minElapsed = false;
    const check = () => loaded && minElapsed && setReady(true);

    const onLoad = () => {
      loaded = true;
      check();
    };
    const timer = window.setTimeout(() => {
      minElapsed = true;
      check();
    }, MIN_DURATION_MS);

    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Chunky Minecraft-style progress: random jumps, stalls at 90% until ready
  useEffect(() => {
    const cap = ready ? 100 : 90;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= cap) return p;
        const step = ready ? 15 : 3 + Math.floor(Math.random() * 10);
        return Math.min(cap, p + step);
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (progress < 100) return;
    const id = window.setTimeout(() => setVisible(false), 350);
    return () => window.clearTimeout(id);
  }, [progress]);

  // Lock scrolling while the loader covers the page
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <>
      {/* Without JS the loader would never dismiss */}
      <noscript>
        <style>{"#preloader{display:none}"}</style>
      </noscript>

      <AnimatePresence>
        {visible && (
          <motion.div
            id="preloader"
            className={`${silkscreen.variable} fixed inset-0 z-[200] flex flex-col items-center justify-center px-6`}
            style={{ backgroundColor: "#F5E9DF" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src="/images/preloader-logo.webp"
              alt="Agila Studios"
              width={1060}
              height={706}
              preload
              unoptimized
              className="h-auto w-64 sm:w-80 md:w-96"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Progress bar — pixel frame with bevelled fill */}
            <div
              role="progressbar"
              aria-label="Loading"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-10 w-full max-w-sm p-[3px]"
              style={{
                border: "4px solid #2B1608",
                backgroundColor: "#D9C4B0",
                boxShadow: "4px 4px 0 0 rgba(43, 22, 8, 0.25)",
              }}
            >
              <div
                className="h-5"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#F08100",
                  boxShadow:
                    "inset 0 4px 0 0 #FFB347, inset 0 -4px 0 0 #B35F00",
                  transition: "width 140ms steps(3, end)",
                }}
              />
            </div>

            <div
              className="mt-4 flex w-full max-w-sm justify-between text-sm tracking-wider"
              style={{ fontFamily: "var(--font-silkscreen)", color: "#2B1608" }}
              aria-hidden="true"
            >
              <span>{statusFor(progress)}</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
