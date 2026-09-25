"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQ_ITEMS = [
  { id: "faq-1", question: "How many revisions are included?", answer: "Every project includes two rounds of revisions. Additional rounds can be added for a small fee — just ask when you inquire." },
  { id: "faq-2", question: "What file formats do you deliver?", answer: "We deliver the formats that make sense for your project — world files, schematics, .jar plugins, .mp4 video, source project files, and more." },
  { id: "faq-3", question: "Who owns the finished work?", answer: "You do. Once payment is complete, full ownership of the delivered assets transfers to you." },
  { id: "faq-4", question: "How long does a project take?", answer: "Timelines vary by scope. Small plugins or edits: 1–3 days. Medium builds or animations: 1–2 weeks. Large custom projects: discussed case by case." },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-[#FFF6E5] py-20 px-4" aria-labelledby="faq-heading">

      <motion.h2
        id="faq-heading"
        className="tracking-wider mb-12 text-center text-5xl text-[#2a1a0e] sm:text-6xl font-semibold"
        style={{ fontFamily: "var(--font-pixel)" }}
        initial={{ opacity: 0.4, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        FAQ
      </motion.h2>

      <div className="mx-auto max-w-2xl space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              key={item.id}
              className="rounded-lg border-2 border-[#2B1608] bg-white overflow-hidden"
              initial={{ opacity: 0.4, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-xl font-medium text-[#2a1a0e]" style={{ fontFamily: "var(--font-body)" }}>
                  {item.question}
                </span>
                <motion.span
                  className="ml-4 shrink-0 text-3xl text-orange-500"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "inline-block", fontFamily: "var(--font-body)" }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    role="region"
                    className="border-t border-[#2a1a0e]/10 px-5"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="py-4 text-xl leading-relaxed text-[#2a1a0e]/70" style={{ fontFamily: "var(--font-body)" }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
