"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "PROJECTS MADE" },
  { value: 5, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 12, suffix: "", label: "EXPERT CREATORS" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      motionVal.set(0);
      spring.set(0);
      setTimeout(() => motionVal.set(value), 100);
    }
  }, [inView, value, motionVal, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function StatsBar() {
  return (
    <div className="bg-[#5A2E0D] py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-around gap-8 px-4 sm:flex-row sm:gap-0">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0.4, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
          >
            <span
              className="text-5xl text-[#F7AC00]"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span
              className="text-sm tracking-widest text-orange-100/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
