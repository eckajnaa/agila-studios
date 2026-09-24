"use client";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "The build was beyond what we sketched — my viewers spent the whole premiere asking who made the map.",
    author: "Placeholder Name",
    role: "YouTube creator | 850k subs",
    category: "CUSTOM BUILD",
  },
  {
    id: "t2",
    quote: "Fast, communicative, and the plugin ran flawlessly on stream day one. Zero patch requests.",
    author: "Placeholder Name",
    role: "SMP server owner",
    category: "PLUGIN",
  },
  {
    id: "t3",
    quote: "We commissioned a full custom map for a 100-player event and it held up perfectly.",
    author: "Placeholder Name",
    role: "Event server admin",
    category: "CUSTOM BUILD",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FFF6E5] py-20 px-4" aria-labelledby="testimonials-heading">

      <motion.h2
        id="testimonials-heading"
        className="mb-12 tracking-wider text-center text-5xl text-[#2a1a0e] sm:text-6xl font-semibold"
        style={{ fontFamily: "var(--font-pixel)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        TESTIMONIALS
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            className="flex flex-col gap-4 rounded-xl border-2 border-[#2B1608] bg-white px-6 py-7 text-left shadow-[0_6px_0px_#2B1608]"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <motion.span
              className="text-5xl leading-none text-orange-400"
              style={{ fontFamily: "var(--font-pixel)", display: "inline-block" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, ease: "backOut", delay: i * 0.12 + 0.2 }}
              aria-hidden="true"
            >
              &quot;
            </motion.span>

            <p className="flex-1 text-xl leading-relaxed text-[#2a1a0e]/80" style={{ fontFamily: "var(--font-body)" }}>
              {t.quote}
            </p>

            <div className="border-t border-[#2a1a0e]/10 pt-4">
              <p className="text-lg font-semibold text-[#2a1a0e]" style={{ fontFamily: "var(--font-body)" }}>{t.author}</p>
              <p className="mt-0.5 text-base text-[#2a1a0e]/50" style={{ fontFamily: "var(--font-body)" }}>{t.role}</p>
              <span className="mt-2 inline-block text-xl text-orange-500" style={{ fontFamily: "var(--font-pixel)" }}>{t.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
