"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { VT323 } from "next/font/google";
import ZigzagDivider from "./ZigzagDivider";
import ZigzagDividerBottom from "./ZigzagDividerBottom";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const PROJECTS = [
  {
    id: "p1",
    title: "Dark Alley",
    category: "BUILD",
    image: "/images/portfolio-dark-alley.svg",
  },
  {
    id: "p2",
    title: "Adopted by the Owl",
    category: "EDITING",
    image: "/images/portfolio-adopted-owl.svg",
  },
  {
    id: "p3",
    title: "Heritage Plaza",
    category: "BUILD",
    image: "/images/portfolio-heritage-plaza.svg",
  },
  {
    id: "p4",
    title: "Off-Road Rade",
    category: "MODEL",
    image: "/images/portfolio-offroad.svg",
  },
  {
    id: "p5",
    title: "Desert Run",
    category: "ANIMATION",
    image: "/images/portfolio-desert-run.svg",
  },
];

const INFO_BAR_HEIGHT = 64; 
const CARD_HEIGHT = 560;    

export default function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <div>
      <ZigzagDivider topColor="#FFF6E5" bottomColor="#261609" />

      <section
        className="bg-[#261609]"
        aria-labelledby="portfolio-heading"
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-end justify-between px-6 pt-10 pb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <p
              className="text-xl tracking-widest text-orange-400"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
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
            className="flex items-center gap-2 rounded border border-orange-400 px-5 py-2.5 text-xl font-semibold text-orange-400 transition-colors hover:bg-orange-400 hover:text-[#2B1608]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View All Projects →
          </Link>
        </motion.div>

        {/* Cards */}
        <div
          className="flex w-full gap-1 px-4 pb-160"
          style={{ height: `${CARD_HEIGHT}px` }}
          onMouseLeave={() => setActiveIndex(2)}
        >
          {PROJECTS.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={project.id}
                className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl"
                onHoverStart={() => setActiveIndex(index)}
                animate={{ flex: isActive ? 3.5 : 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ minWidth: 0, height: `${CARD_HEIGHT}px` }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: `${CARD_HEIGHT - INFO_BAR_HEIGHT}px` }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
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
                  <p
                    className="truncate text-lg font-semibold text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
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
      </section>

      <ZigzagDividerBottom topColor="#261609" bottomColor="#FFF6E5" />
    </div>
  );
}
