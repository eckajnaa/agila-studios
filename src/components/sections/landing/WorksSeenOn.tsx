"use client";
import Image from "next/image";
import { motion } from "motion/react";

const CREATORS = [
  { name: "EyStreem", image: "/images/eystreem.svg" },
  { name: "Creator 2", image: "/images/character01.svg" },
  { name: "Creator 3", image: "/images/flame-mark.svg" },
  { name: "Creator 4", image: "/images/character02.svg" },
];

export default function WorksSeenOn() {
  return (
    <section className="bg-[#2a1a0e] px-6 py-16" aria-labelledby="seen-on-heading">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <motion.div
          className="max-w-sm"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 id="seen-on-heading" className="font-semibold tracking-wider text-4xl text-orange-100 sm:text-5xl" style={{ fontFamily: "var(--font-pixel)" }}>
            WORKS SEEN ON
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-orange-100/60" style={{ fontFamily: "var(--font-body)" }}>
            Our team has worked alongside well-known content creators worldwide,
            helping transform ideas into immersive Minecraft experiences.
          </p>
        </motion.div>

        {/* Right */}
        <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-end">
          {CREATORS.map((creator, i) => (
            <motion.div
              key={creator.name}
              className="relative h-25 w-25"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "backOut", delay: i * 0.1 }}
              whileHover={{ scale: 1.15, rotate: 3, transition: { duration: 0.2 } }}
            >
              <Image src={creator.image} alt={creator.name} fill unoptimized className="object-contain" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
