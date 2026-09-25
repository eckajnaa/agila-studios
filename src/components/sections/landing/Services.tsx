"use client";
import Image from "next/image";
import Link from "next/link";
import { VT323 } from "next/font/google";
import { motion } from "motion/react";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const SERVICES = [
  { 
    icon: "/images/icon-development.svg", 
    title: "DEVELOPMENT", 
    description: "Custom plugins, mods, datapacks, and add-ons built for your project.",
    path: "/portfolio?category=Development" 
  },
  { 
    icon: "/images/icon-custom-models.svg", 
    title: "CUSTOM MODELS", 
    description: "Unique 3D models and assets that make your world stand out.",
    path: "/portfolio?category=Models"
  },
  { 
    icon: "/images/icon-editing.svg", 
    title: "EDITING", 
    description: "Professional video editing that keeps your audience engaged.",
    path: "/portfolio?category=Editing"
  },
  { 
    icon: "/images/icon-scriptwriting.svg", 
    title: "SCRIPTWRITING", 
    description: "Story-driven scripts written to entertain and retain viewers.",
    path: "/portfolio?category=Scripts"
  },
  { 
    icon: "/images/icon-animations.svg", 
    title: "ANIMATIONS", 
    description: "Cinematic Minecraft animations that bring every scene to life.",
    path: "/portfolio?category=Animation"
  },
  { 
    icon: "/images/icon-custom-builds.svg", 
    title: "CUSTOM BUILDS", 
    description: "Handcrafted builds and level design, block by block.",
    path: "/portfolio?category=Builds"
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#FFF6E5] py-20 px-4 scroll-mt-20" aria-labelledby="services-heading">
      <motion.div
        className="mb-10 flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0.4, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
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

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"> {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            className="flex rounded-xl border-2 border-[#2B1608] bg-white text-center shadow-[0_6px_0px_#2B1608]"
            initial={{ opacity: 0.4, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            whileHover={{
              y: -8,
              boxShadow: "0 14px 0px #2B1608",
              transition: { duration: 0.2 },
            }}
          >
            {/* The Link now wraps the entire inner content of the card */}
            <Link 
              href={service.path}
              className="group flex h-full w-full flex-col items-center gap-4 px-6 py-8 rounded-xl focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-6 focus-visible:outline-[#F08100]"
            >
              <motion.div
                className="relative h-20 w-20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <Image src={service.icon} alt="" fill unoptimized className="object-contain" />
              </motion.div>

              <h3
                className={`${vt323.className} text-3xl text-[#2B1608]`}
                style={{ WebkitTextStroke: "0.5px #2B1608" }}
              >
                {service.title}
              </h3>

              <p 
                className="flex-grow text-xl leading-relaxed text-[#2B1608]/70" 
                style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)" }}
              >
                {service.description}
              </p>

              {/* Learn More Text (Visual Only, entire card is clickable) */}
              <div 
                className={`${vt323.className} mt-2 inline-flex items-center text-2xl text-[#F08100] transition-colors group-hover:text-[#2B1608] group-focus-visible:text-[#2B1608]`}
              >
                LEARN MORE <span className="ml-2 text-xl">➔</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}