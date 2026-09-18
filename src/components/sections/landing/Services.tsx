"use client";
import Image from "next/image";
import { VT323 } from "next/font/google";
import { motion } from "motion/react";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const SERVICES = [
  { icon: "/images/icon-development.svg", title: "DEVELOPMENT", description: "Custom plugins, mods, datapacks, and add-ons built for your project." },
  { icon: "/images/icon-custom-models.svg", title: "CUSTOM MODELS", description: "Unique 3D models and assets that make your world stand out." },
  { icon: "/images/icon-editing.svg", title: "EDITING", description: "Professional video editing that keeps your audience engaged." },
  { icon: "/images/icon-scriptwriting.svg", title: "SCRIPTWRITING", description: "Story-driven scripts written to entertain and retain viewers." },
  { icon: "/images/icon-animations.svg", title: "ANIMATIONS", description: "Cinematic Minecraft animations that bring every scene to life." },
  { icon: "/images/icon-custom-builds.svg", title: "CUSTOM BUILDS", description: "Handcrafted builds and level design, block by block." },
];

export default function Services() {
  return (
    <section className="bg-[#FFF6E5] py-20 px-4" aria-labelledby="services-heading">

      <motion.div
        className="mb-10 flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className={`${vt323.className} text-2xl tracking-widest text-[#F08100]`}>- WHAT WE DO -</p>
        <h2
          id="services-heading"
          className={`${vt323.className} text-5xl text-[#2B1608] sm:text-6xl`}
          style={{ WebkitTextStroke: "1.5px #2B1608" }}
        >
          OUR SERVICES
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            className="flex flex-col items-center gap-4 rounded-xl border-2 border-[#2B1608] bg-white px-6 py-8 text-center shadow-[0_6px_0px_#2B1608]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            whileHover={{
              y: -8,
              boxShadow: "0 14px 0px #2B1608",
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className="relative h-20 w-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <Image src={service.icon} alt={service.title} fill unoptimized className="object-contain" />
            </motion.div>

            <h3
              className={`${vt323.className} text-3xl text-[#2B1608]`}
              style={{ WebkitTextStroke: "0.5px #2B1608" }}
            >
              {service.title}
            </h3>

            <p className="text-xl leading-relaxed text-[#2B1608]/70" style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
