"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
