"use client";
import { DISCORD_URL } from "@/lib/constants";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#2B1608] px-4 pt-24 pb-15 min-h-[700px] lg:min-h-[800px]"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/ContactBackground.svg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start gap-12 lg:flex-row lg:items-center">

        {/* Left — slides in from left */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2
            id="contact-heading"
            className="tracking-wider font-semibold text-5xl leading-tight text-white sm:text-6xl"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            READY TO CREATE?
          </h2>
          <p
            className="mt-4 mb-10 max-w-xs text-xl leading-relaxed text-white/80"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Have a project in mind? Reach out via Discord or email and let&apos;s
            build something extraordinary together.
          </p>
          <motion.a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg px-8 py-4 text-lg font-semibold text-[#2B1608] shadow-[0_6px_0px_#7a3200]"
            style={{ backgroundColor: "#F08100", fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Join Discord
          </motion.a>
        </motion.div>

        {/* Right — form slides in from right */}
        <motion.div
          className="w-full max-w-md rounded-xl border-2 border-white bg-white/20 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xl font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="e.g. Custom build for my SMP"
                className="rounded border border-white/30 bg-white/30 px-4 py-2.5 text-base text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/40"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xl font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project…"
                className="rounded border border-white/30 bg-white/30 px-4 py-2.5 text-base text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/40 resize-none"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                className="flex items-center gap-2 rounded border border-white px-5 py-2.5 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-[#c47000]"
                style={{ fontFamily: "var(--font-body)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send →
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0"
        aria-hidden="true"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
          <path
            d="M0,60 L0,40 L20,40 L20,30 L40,30 L40,40 L60,40 L60,20 L80,20
              L80,10 L100,10 L100,20 L120,20 L120,40 L140,40 L140,25 L160,25
              L160,40 L180,40 L180,15 L200,15 L200,5 L220,5 L220,15 L240,15
              L240,40 L260,40 L260,30 L280,30 L280,40 L300,40 L300,20 L320,20
              L320,10 L340,10 L340,20 L360,20 L360,40 L380,40 L380,25 L400,25
              L400,40 L420,40 L420,15 L440,15 L440,5 L460,5 L460,15 L480,15
              L480,40 L500,40 L500,30 L520,30 L520,40 L540,40 L540,20 L560,20
              L560,10 L580,10 L580,20 L600,20 L600,40 L620,40 L620,25 L640,25
              L640,40 L660,40 L660,15 L680,15 L680,5 L700,5 L700,15 L720,15
              L720,40 L740,40 L740,30 L760,30 L760,40 L780,40 L780,20 L800,20
              L800,10 L820,10 L820,20 L840,20 L840,40 L860,40 L860,25 L880,25
              L880,40 L900,40 L900,15 L920,15 L920,5 L940,5 L940,15 L960,15
              L960,40 L980,40 L980,30 L1000,30 L1000,40 L1020,40 L1020,20
              L1040,20 L1040,10 L1060,10 L1060,20 L1080,20 L1080,40 L1100,40
              L1100,25 L1120,25 L1120,40 L1140,40 L1140,15 L1160,15 L1160,5
              L1180,5 L1180,15 L1200,15 L1200,60 Z"
            fill="#FFB300"
          />
          <path
            d="M0,60 L0,45 L20,45 L20,35 L40,35 L40,45 L60,45 L60,25 L80,25
              L80,15 L100,15 L100,25 L120,25 L120,45 L140,45 L140,30 L160,30
              L160,45 L180,45 L180,20 L200,20 L200,10 L220,10 L220,20 L240,20
              L240,45 L260,45 L260,35 L280,35 L280,45 L300,45 L300,25 L320,25
              L320,15 L340,15 L340,25 L360,25 L360,45 L380,45 L380,30 L400,30
              L400,45 L420,45 L420,20 L440,20 L440,10 L460,10 L460,20 L480,20
              L480,45 L500,45 L500,35 L520,35 L520,45 L540,45 L540,25 L560,25
              L560,15 L580,15 L580,25 L600,25 L600,45 L620,45 L620,30 L640,30
              L640,45 L660,45 L660,20 L680,20 L680,10 L700,10 L700,20 L720,20
              L720,45 L740,45 L740,35 L760,35 L760,45 L780,45 L780,25 L800,25
              L800,15 L820,15 L820,25 L840,25 L840,45 L860,45 L860,30 L880,30
              L880,45 L900,45 L900,20 L920,20 L920,10 L940,10 L940,20 L960,20
              L960,45 L980,45 L980,35 L1000,35 L1000,45 L1020,45 L1020,25
              L1040,25 L1040,15 L1060,15 L1060,25 L1080,25 L1080,45 L1100,45
              L1100,30 L1120,30 L1120,45 L1140,45 L1140,20 L1160,20 L1160,10
              L1180,10 L1180,20 L1200,20 L1200,60 Z"
            fill="#F08100"
          />
        </svg>
      </motion.div>
    </section>
  );
}
