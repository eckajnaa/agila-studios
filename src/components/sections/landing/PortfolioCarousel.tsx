"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VT323 } from "next/font/google";
import ZigzagDivider from "./ZigzagDivider";
import ZigzagDividerBottom from "./ZigzagDividerBottom";

const vt323 = VT323({ weight: "400", subsets: ["latin"], display: "swap" });

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROJECTS = [
  { id: "p1", title: "Dark Alley", category: "BUILD", image: "/images/portfolio-dark-alley.svg" },
  { id: "p2", title: "Adopted by the Owl", category: "EDITING", image: "/images/portfolio-adopted-owl.svg" },
  { id: "p3", title: "Heritage Plaza", category: "BUILD", image: "/images/portfolio-heritage-plaza.svg" },
  { id: "p4", title: "Off-Road Rade", category: "MODEL", image: "/images/portfolio-offroad.svg" },
  { id: "p5", title: "Desert Run", category: "ANIMATION", image: "/images/portfolio-desert-run.svg" },
];

const INITIAL_INDEX = 2;
const AUTOPLAY_SECONDS = 3.5;
const SWIPE_THRESHOLD = 60;
const SLIDE_DURATION = 0.6;

// Stack layout: each step away from the center card shifts it sideways by
// STEP_X percent of a card's width, shrinks it, and tucks it further behind.
const STEP_X = 62;
const STEP_SCALE = 0.1;
const STEP_DIM = 0.25;
const MAX_VISIBLE_STEP = 2;

// Card size shared by the absolutely positioned cards and the in-flow spacer.
const CARD_WIDTH = "w-[78vw] sm:w-[420px] lg:w-[480px]";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Signed distance from the active card, wrapped so the stack loops (e.g. -2..2 for 5 cards).
function stepFromActive(index: number, active: number) {
  const n = PROJECTS.length;
  let step = (index - active + n) % n;
  if (step > n / 2) step -= n;
  return step;
}

function cardState(step: number) {
  const distance = Math.abs(step);
  return {
    // x/y pinned to 0 so GSAP doesn't add the parsed inline translate on top of xPercent.
    x: 0,
    y: 0,
    xPercent: -50 + step * STEP_X,
    yPercent: -50,
    scale: 1 - distance * STEP_SCALE,
    zIndex: 10 - distance,
    autoAlpha: distance > MAX_VISIBLE_STEP ? 0 : 1,
  };
}

export default function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const prevIndexRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const pauseReasons = useRef({ hover: false, offscreen: true, dragging: false });
  const drag = useRef({ startX: 0, active: false, moved: false });

  function next() {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }

  function syncAutoplay() {
    const tween = autoplayRef.current;
    if (!tween) return;
    const { hover, offscreen, dragging } = pauseReasons.current;
    if (hover || offscreen || dragging) tween.pause();
    else tween.resume();
  }

  function setPaused(reason: keyof typeof pauseReasons.current, paused: boolean) {
    pauseReasons.current[reason] = paused;
    syncAutoplay();
  }

  // Move every card to its new place in the stack, then restart the autoplay countdown.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(REDUCED_MOTION).matches;
      const prevIndex = prevIndexRef.current;
      prevIndexRef.current = activeIndex;

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      timelineRef.current?.kill();
      const tl = gsap.timeline({ defaults: { duration: SLIDE_DURATION, ease: "power3.inOut" } });
      timelineRef.current = tl;

      cards.forEach((card, i) => {
        const step = stepFromActive(i, activeIndex);
        const { zIndex, ...target } = cardState(step);
        const overlay = card.querySelector("[data-overlay]");
        const dim = Math.min(Math.abs(step), MAX_VISIBLE_STEP) * STEP_DIM;
        const prevStep = prevIndex === null ? step : stepFromActive(i, prevIndex);

        if (Math.abs(step - prevStep) > 1) {
          // Wrapping from one end of the stack to the other: fade out, jump, fade back in
          // rather than flying across the whole row.
          tl.to(card, { autoAlpha: 0, duration: SLIDE_DURATION / 2, ease: "power1.in" }, 0)
            .set(card, { ...target, autoAlpha: 0, zIndex }, SLIDE_DURATION / 2)
            .to(
              card,
              { autoAlpha: target.autoAlpha, duration: SLIDE_DURATION / 2, ease: "power1.out" },
              SLIDE_DURATION / 2,
            );
        } else {
          tl.to(card, target, 0)
            // Swap stacking order halfway, when the cards pass each other.
            .set(card, { zIndex }, SLIDE_DURATION / 2);
        }
        tl.to(overlay, { opacity: dim }, 0);
      });

      const badge = cards[activeIndex].querySelector("[data-badge]");
      tl.fromTo(badge, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, SLIDE_DURATION * 0.6);

      if (prevIndex === null || reduceMotion) tl.progress(1);

      // Autoplay doubles as the progress fill of the active dot.
      autoplayRef.current?.kill();
      gsap.set("[data-dot-fill]", { scaleX: 0 });
      if (reduceMotion) {
        gsap.set(`[data-dot-fill="${activeIndex}"]`, { scaleX: 1 });
        autoplayRef.current = null;
        return;
      }
      autoplayRef.current = gsap.fromTo(
        `[data-dot-fill="${activeIndex}"]`,
        { scaleX: 0 },
        { scaleX: 1, duration: AUTOPLAY_SECONDS, ease: "none", onComplete: next },
      );
      syncAutoplay();
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );

  // Entrance on scroll-in, plus pausing autoplay while the carousel is off-screen.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setPaused("offscreen", !self.isActive),
      });

      const mm = gsap.matchMedia();
      mm.add(`not all and ${REDUCED_MOTION}`, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.from("[data-header]", { opacity: 0, y: 20, duration: 0.6 })
          .from("[data-card-inner]", { opacity: 0, y: 60, duration: 0.7, stagger: 0.08 }, "-=0.3")
          .from("[data-controls]", { opacity: 0, duration: 0.4 }, "-=0.3");
      });
    },
    { scope: sectionRef },
  );

  function handlePointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { startX: e.clientX, active: true, moved: false };
    setPaused("dragging", true);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!drag.current.active) return;
    drag.current.active = false;
    setPaused("dragging", false);

    const diff = e.clientX - drag.current.startX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      drag.current.moved = true;
      if (diff < 0) next();
      else prev();
    }
  }

  function handleCardClick(index: number) {
    // A swipe that ends on a card also fires a click; don't let it override the swipe.
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setActiveIndex(index);
  }

  return (
    <div>
      <ZigzagDivider topColor="#FFF6E5" bottomColor="#261609" />

      <section
        ref={sectionRef}
        className="bg-[#261609]"
        aria-labelledby="portfolio-heading"
        aria-roledescription="carousel"
      >
        {/* Header */}
        <div
          data-header
          className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 pt-10 pb-6"
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
            className="flex translate-y-0 items-center gap-2 rounded border border-orange-400 bg-transparent px-5 py-2.5 text-lg font-semibold text-orange-400 shadow-[0_4px_0px_#fb923c] transition-all duration-150 hover:translate-y-[4px] hover:shadow-none"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View All Projects →
          </Link>
        </div>

        {/* Stacked carousel: center card on top, neighbours smaller and tucked behind */}
        <div
          ref={carouselRef}
          className="relative w-full touch-pan-y select-none overflow-hidden py-8"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            drag.current.active = false;
            setPaused("dragging", false);
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused("hover", true)}
          onPointerLeave={(e) => {
            // A mouse drag released outside the carousel never fires pointerup here.
            handlePointerUp(e);
            if (e.pointerType === "mouse") setPaused("hover", false);
          }}
        >
          {/* Invisible spacer gives the container the height of one card */}
          <div aria-hidden className={`invisible mx-auto ${CARD_WIDTH}`}>
            <div className="aspect-[5/4]" />
            <div className="h-20" />
          </div>

          {PROJECTS.map((project, index) => {
            const { autoAlpha, ...initial } = cardState(stepFromActive(index, INITIAL_INDEX));

            return (
              <div
                key={project.id}
                data-card
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${PROJECTS.length}: ${project.title}`}
                className={`absolute left-1/2 top-1/2 cursor-pointer ${CARD_WIDTH}`}
                style={{
                  zIndex: initial.zIndex,
                  opacity: autoAlpha,
                  transform: `translate(${initial.xPercent}%, ${initial.yPercent}%) scale(${initial.scale})`,
                }}
                onClick={() => handleCardClick(index)}
              >
                <div
                  data-card-inner
                  className="overflow-hidden rounded-lg border border-[#3d2010] bg-[#1f1208] shadow-[0_4px_0_0_#000]"
                >
                  {/* Image */}
                  <div className="relative aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 78vw"
                      draggable={false}
                      className="object-cover"
                    />
                    <div
                      data-overlay
                      className="absolute inset-0 bg-[#1f1208]"
                      style={{ opacity: Math.abs(stepFromActive(index, INITIAL_INDEX)) * STEP_DIM }}
                    />
                  </div>

                  {/* Info bar */}
                  <div className="flex h-20 w-full items-center justify-between gap-3 px-6">
                    <p
                      className="truncate text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {project.title}
                    </p>
                    <span
                      data-badge
                      className={`${vt323.className} shrink-0 rounded px-3 py-0.5 text-lg tracking-[0.25em] text-[#2B1608]`}
                      style={{ backgroundColor: "#F7AC00" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Desktop arrows sit on top of the stack */}
          <button type="button" onClick={prev} aria-label="Previous project"
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-colors hover:bg-orange-400 md:flex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" onClick={next} aria-label="Next project"
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-colors hover:bg-orange-400 md:flex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots (with autoplay progress) — arrows move down here on mobile */}
        <div data-controls className="flex items-center justify-center gap-4 pt-2 pb-8">
          <button type="button" onClick={prev} aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400 md:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {PROJECTS.map((project, i) => (
              <button key={project.id} type="button" onClick={() => setActiveIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={activeIndex === i}
                className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? "24px" : "8px",
                  backgroundColor: activeIndex === i ? "#6b3a14" : "#3d2010",
                }}
              >
                <span
                  data-dot-fill={i}
                  className="absolute inset-0 origin-left bg-[#F7AC00]"
                  style={{ transform: "scaleX(0)" }}
                />
              </button>
            ))}
          </div>

          <button type="button" onClick={next} aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400 md:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      <ZigzagDividerBottom topColor="#261609" bottomColor="#FFF6E5" />
    </div>
  );
}
