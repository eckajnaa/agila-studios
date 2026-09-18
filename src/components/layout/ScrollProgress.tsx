"use client";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left"
      style={{ scaleX, backgroundColor: "#F08100" }}
      aria-hidden="true"
    />
  );
}
