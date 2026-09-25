"use client";
import { motion } from "motion/react";

const STEPS = [
  { number: "01", title: "INQUIRE", description: "Tell us your idea over Discord or email — rough notes are fine." },
  { number: "02", title: "QUOTE", description: "You get scope, timeline, and a fixed price within 48 hours." },
  { number: "03", title: "BUILD", description: "We create, with progress updates at every milestone." },
  { number: "04", title: "DELIVERY", description: "Find files, source assets, and post-delivery support." },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#FFF6E5] py-20 px-4" aria-labelledby="how-heading">

      <motion.h2
        id="how-heading"
        className="mb-14 text-center tracking-wider text-5xl text-[#2a1a0e] sm:text-6xl font-semibold "
        style={{ fontFamily: "var(--font-pixel)" }}
        initial={{ opacity: 0.4, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        HOW IT WORKS
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            className="flex flex-col gap-3d"
            initial={{ opacity: 0.4, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
          >
            <div>
              <motion.span
                className="text-4xl text-orange-500"
                style={{ fontFamily: "var(--font-pixel)", display: "inline-block" }}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "backOut", delay: i * 0.15 + 0.1 }}
              >
                {step.number}
              </motion.span>
              <motion.div
                className="mt-1 h-0.5 bg-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.15 + 0.3 }}
              />
            </div>

            <h3 className="font-semibold mt-5 text-3xl tracking-wider text-[#2a1a0e]" style={{ fontFamily: "var(--font-pixel)" }}>
              {step.title}
            </h3>

            <p className="text-xl leading-relaxed text-[#2a1a0e]/70" style={{ fontFamily: "var(--font-body)" }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
