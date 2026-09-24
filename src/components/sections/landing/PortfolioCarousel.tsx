"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { VT323 } from "next/font/google";
import ZigzagDivider from "./ZigzagDivider";
import ZigzagDividerBottom from "./ZigzagDividerBottom";

const vt323 = VT323({ weight: "400", subsets: ["latin"], display: "swap" });

const PROJECTS = [
  { id: "p1", title: "Dark Alley", category: "BUILD", image: "/images/portfolio-dark-alley.svg" },
  { id: "p2", title: "Adopted by the Owl", category: "EDITING", image: "/images/portfolio-adopted-owl.svg" },
  { id: "p3", title: "Heritage Plaza", category: "BUILD", image: "/images/portfolio-heritage-plaza.svg" },
  { id: "p4", title: "Off-Road Rade", category: "MODEL", image: "/images/portfolio-offroad.svg" },
  { id: "p5", title: "Desert Run", category: "ANIMATION", image: "/images/portfolio-desert-run.svg" },
];

const INFO_BAR_HEIGHT = 64;
const CARD_HEIGHT = 560;

export default function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isDragging]);

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }

  function handlePrev() {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }

  return (
    <div>
      <ZigzagDivider topColor="#FFF6E5" bottomColor="#261609" />

      <section className="bg-[#261609]" aria-labelledby="portfolio-heading">

        {/* Header */}
        <motion.div
          className="mx-auto flex max-w-7xl items-end justify-between px-6 pt-10 pb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <p className="text-xl tracking-widest text-orange-400" style={{ fontFamily: "var(--font-pixel)" }}>
              PORTFOLIO
            </p>
            <h2
              id="portfolio-heading"
              className="text-5xl text-orange-100 tracking-wider font-semibold"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              OUR WORK
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex translate-y-0 items-center gap-2 rounded border border-orange-400 bg-transparent px-5 py-2.5 text-lg font-semibold text-orange-400 shadow-[0_4px_0px_#fb923c] transition-all duration-150 hover:translate-y-[4px] hover:shadow-none"            style={{ fontFamily: "var(--font-body)" }}
          >
            View All Projects →
          </Link>
        </motion.div>

        {/* Full-width accordion carousel — all cards fill the row */}
        <div
          className="relative w-full pb-10"
          style={{ height: `${CARD_HEIGHT + 20}px` }}
          onMouseDown={(e) => { setIsDragging(false); setDragStart(e.clientX); }}
          onMouseUp={(e) => {
            const diff = e.clientX - dragStart;
            if (Math.abs(diff) > 60) { diff < 0 ? handleNext() : handlePrev(); }
          }}
        >
          <div
            className="flex w-full gap-1"
            style={{ height: `${CARD_HEIGHT}px` }}
            onMouseLeave={() => {}} 
          >
            {PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={project.id}
                  className="relative flex flex-col overflow-hidden rounded-xl cursor-pointer"
                  animate={{ flex: isActive ? 4 : 1, opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ minWidth: 0, height: `${CARD_HEIGHT}px` }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Image */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: `${CARD_HEIGHT - INFO_BAR_HEIGHT}px` }}
                  >
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    {!isActive && (
                      <div className="absolute inset-0" style={{ background: "rgba(38,22,9,0.55)" }} />
                    )}
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500" />}
                  </div>

                  {/* Info bar */}
                  <div
                    className="flex w-full shrink-0 items-center justify-between px-4"
                    style={{
                      height: `${INFO_BAR_HEIGHT}px`,
                      backgroundColor: "#261609",
                      borderTop: "2px solid #3d2010",
                      borderBottom: "3px solid #000000",
                    }}
                  >
                    <p className="truncate text-lg font-semibold text-white" style={{ fontFamily: "var(--font-body)" }}>
                      {isActive ? project.title : ""}
                    </p>
                    <span
                      className={`${vt323.className} shrink-0 rounded px-3 py-0.5 text-lg font-bold text-[#2B1608]`}
                      style={{ backgroundColor: "#F7AC00" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Left arrow */}
          <button type="button" onClick={handlePrev} aria-label="Previous project"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button type="button" onClick={handleNext} aria-label="Next project"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 pb-8">
          {PROJECTS.map((_, i) => (
            <button key={i} type="button" onClick={() => setActiveIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? "24px" : "8px",
                height: "8px",
                backgroundColor: activeIndex === i ? "#F7AC00" : "#3d2010",
              }}
            />
          ))}
        </div>
      </section>

      <ZigzagDividerBottom topColor="#261609" bottomColor="#FFF6E5" />
    </div>
  );
}
