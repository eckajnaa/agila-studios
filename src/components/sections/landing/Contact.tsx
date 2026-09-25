"use client";
import { useState } from "react";
import { DISCORD_URL } from "@/lib/constants";
import { CONTACT_LIMITS, HONEYPOT_FIELD } from "@/lib/contact";
import { motion } from "motion/react";
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({ weight: "700", subsets: ["latin"], display: "swap" });

type FormStatus = "idle" | "sending" | "success" | "error";

const LABEL_CLASS = "text-xl font-medium text-white";
// ADDED w-full here
const INPUT_CLASS =
  "w-full rounded border-2 border-transparent bg-[#FFF6E5] px-4 py-2.5 text-lg font-medium text-[#2B1608] placeholder:text-[#2B1608]/55 outline-none transition-colors focus:border-black focus:bg-white disabled:opacity-60";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      // fetch itself throws a TypeError when the network is down.
      setErrorMessage(
        err instanceof TypeError
          ? "Couldn't reach the server. Check your connection and try again."
          : (err as Error).message,
      );
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#2B1608] pt-24 pb-15 min-h-[700px] lg:min-h-[800px]"
      aria-labelledby="contact-heading"
    >
      <div
        // Plain JPEG on its own GPU layer: the form card's backdrop blur re-samples this on every
        // keystroke, which was slow when it was an 890 KB SVG wrapping the same photo.
        className="absolute inset-0 transform-gpu bg-cover bg-bottom bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/ContactBackground.jpg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-col items-start gap-12 px-4 sm:px-10 md:px-24 lg:flex-row lg:items-center lg:justify-between xl:px-44">

        {/* Left — slides in from left */}
        <motion.div
          className="relative min-w-0 lg:-top-10 lg:flex-1"
          initial={{ opacity: 0.4, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2
            id="contact-heading"
            className={`${silkscreen.className} whitespace-nowrap tracking-wider leading-tight text-white text-[length:min(calc(7vw-6px),3.5rem)] sm:text-[length:min(calc(7vw-14px),3.5rem)] lg:text-[length:calc(3.25vw-8px)] xl:text-[length:calc(3.25vw-13px)]`}
          >
            READY TO CREATE?
          </h2>
          <p
            className="mt-4 mb-10 max-w-md text-xl leading-relaxed text-white/80 lg:max-w-none lg:whitespace-nowrap lg:text-[length:min(calc(2.04vw-5px),1.375rem)] xl:text-[length:min(calc(2.04vw-8px),1.375rem)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Have a project in mind? Reach out via Discord or email <br className="hidden lg:block" />
            and let&apos;s build something extraordinary together.
          </p>
          <motion.a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex translate-y-0 items-center justify-center rounded-[0.4375rem] bg-[#F08100] px-7 py-2 text-xl font-bold text-[#2B1608] shadow-[0_0.375rem_0_0_#A84400] transition-all duration-150 hover:translate-y-[0.375rem] hover:bg-orange-400 hover:shadow-[0_0_0_0_#BF500D]"
            style={{ backgroundColor: "#ff8904", fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
          >
            Join Discord
          </motion.a>
        </motion.div>

        {/* Right — form slides in from right */}
        <motion.div
          className="w-full max-w-2xl rounded-xl border-2 border-white bg-white/20 p-4 sm:p-6 backdrop-blur-sm lg:flex-1"
          initial={{ opacity: 0.4, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          {/* Success message and form share one grid cell: the form stays mounted (just hidden)
              so the card keeps its height and the layout around it doesn't jump. */}
          <div className="grid">
            <form
              onSubmit={handleSubmit}
              aria-hidden={status === "success"}
              className={`flex flex-col gap-5 [grid-area:1/1] ${status === "success" ? "invisible" : ""}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
                {/* Disabling the fieldset locks every input while the request is in flight */}
                {/* Spam trap: moved off-screen and skipped by keyboard and screen readers, so only bots fill it */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
                  <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
                  <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {/* ADDED min-w-0 to the fieldset */}
                <fieldset disabled={status === "sending"} className="flex min-w-0 flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className={LABEL_CLASS}>Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={CONTACT_LIMITS.name}
                        placeholder="Your name"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className={LABEL_CLASS}>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={CONTACT_LIMITS.email}
                        placeholder="you@example.com"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className={LABEL_CLASS}>Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      maxLength={CONTACT_LIMITS.subject}
                      placeholder="e.g. Custom build for my SMP"
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className={LABEL_CLASS}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={CONTACT_LIMITS.message}
                      placeholder="Tell us about your project…"
                      className={INPUT_CLASS}
                    />
                  </div>
                </fieldset>

                {status === "error" && (
                  <p role="alert" className="rounded border border-red-300/60 bg-red-500/25 px-4 py-2.5 text-base font-medium text-white">
                    {errorMessage}
                  </p>
                )}

                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex translate-y-0 cursor-pointer items-center gap-2 rounded border border-white bg-transparent px-4 py-1 text-lg font-semibold text-white shadow-[0_4px_0px_rgba(255,255,255,0.4)] transition-all duration-150 hover:translate-y-[4px] hover:shadow-none disabled:cursor-wait disabled:opacity-70"
                    whileHover={status === "sending" ? undefined : { scale: 1.05 }}
                    whileTap={status === "sending" ? undefined : { scale: 0.95 }}
                  >
                    {status === "sending" ? "Sending…" : "Send →"}
                  </motion.button>
                </div>
              </form>
            {status === "success" && (
              <div role="status" className="flex flex-col items-center justify-center gap-4 text-center [grid-area:1/1]" style={{ fontFamily: "var(--font-body)" }}>
                <p className="text-3xl text-white" style={{ fontFamily: "var(--font-pixel)" }}>
                  MESSAGE SENT!
                </p>
                <p className="max-w-xs text-lg text-white/80">
                  Thanks for reaching out — we&apos;ll get back to you by email soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 cursor-pointer text-base font-semibold text-white underline underline-offset-4 hover:text-orange-200"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
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