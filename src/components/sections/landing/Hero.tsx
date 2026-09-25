"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Video layer state: `render` gates whether the <video> mounts at all,
  // `visible` drives the fade-out on end/error. Both start false so SSR and
  // the first client render match (server has no window to check).
  const [video, setVideo] = useState({ render: false, visible: false });

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    // Deciding whether to mount the intro video reads matchMedia, which only
    // exists client-side; it can't be computed during render without diverging
    // from the server-rendered markup, so this has to run post-mount. A plain
    // page refresh remounts the component from scratch, so the video plays
    // again naturally — no persistence needed to get that "refresh to replay"
    // behavior (sessionStorage would actually break it, since it survives reloads).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVideo({ render: true, visible: true });
  }, []);

  useEffect(() => {
    if (!video.render) return;
    // Autoplay can still be rejected in rare cases even when muted — fall
    // back to the static background immediately if that happens.
    videoRef.current?.play().catch(() => setVideo((v) => ({ ...v, visible: false })));
  }, [video.render]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[670px] items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#2B1608" }}
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/HeroBackground.svg')",
          y: bgY,
          scale: 1.1,
        }}
        aria-hidden="true"
      />

      {/* Intro video — plays once per session over the static background, then
          fades out to reveal it. Never renders for prefers-reduced-motion. */}
      {video.render && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: 1.1 }}
          animate={{ opacity: video.visible ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          poster="/images/hero-video-poster.jpg"
          muted
          playsInline
          preload="auto"
          onEnded={() => setVideo((v) => ({ ...v, visible: false }))}
          onError={() => setVideo((v) => ({ ...v, visible: false }))}
          aria-hidden="true"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </motion.video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(43,22,8,0.90) 0%, rgba(43,22,8,0.30) 100%)",
        }}
        aria-hidden="true"
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            backgroundColor: "#FFB300",
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">

        <motion.p
          className="text-2xl tracking-[0.1em]"
          style={{ fontFamily: "var(--font-pixel)", color: "#FFB300" }}
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          A MINECRAFT STUDIO.
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-6xl leading-tight text-white sm:text-7xl md:text-8xl"
          style={{ fontFamily: "var(--font-pixel)" }}
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          DELIVERING CONTENT
          <br />
          <motion.span
            style={{ color: "#FFB300", display: "inline-block" }}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "backOut", delay: 0.5 }}
          >
            SINCE 2019
          </motion.span>
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/portfolio"
              className="inline-flex translate-y-0 items-center justify-center rounded-[0.4375rem] bg-[#F08100] px-6 py-2 text-xl font-semibold text-[#2B1608] shadow-[0_0.375rem_0_0_#BF500D] transition-all duration-150 hover:translate-y-[0.375rem] hover:bg-orange-400 hover:shadow-[0_0_0_0_#BF500D]"
              style={{ backgroundColor: "#F08100", fontFamily: "var(--font-body)" }}
            >
              View Portfolio
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#contact"
              className="inline-flex translate-y-0 items-center justify-center rounded-[0.4375rem] border border-white/70 bg-transparent px-6 py-2 text-xl font-semibold text-white shadow-[0_4px_0px_rgba(255,255,255,0.4)] transition-all duration-150 hover:translate-y-[4px] hover:shadow-none"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
