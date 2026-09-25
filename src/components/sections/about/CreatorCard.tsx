"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export type CreatorCardProps = {
  name: string;
  role: string;
  image: string;
  skills: string[];
  index?: number;
};

export default function CreatorCard({
  name,
  role,
  image,
  skills,
  index = 0,
}: CreatorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // track cursor position relative to card center, normalized -1 to 1
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // spring smoothing so the image doesn't snap around
  const x = useSpring(rawX, { stiffness: 120, damping: 18 });
  const y = useSpring(rawY, { stiffness: 120, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(nx * 5);
    rawY.set(ny * 5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full"
      style={{ padding: "7px 10px" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* shadow layer — same outer dimensions as the card, sits behind */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/about/card-shadow.webp')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          borderRadius: "5px",
          zIndex: 0,
        }}
      />

      {/* card frame — inset 10px L/R, 7px T/B to match Figma */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundImage: "url('/images/about/card-frame.svg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          borderRadius: "5px",
          height: "100%",
        }}
      >
        <div className="flex flex-col items-center px-4 pt-3 pb-7">

          {/* profile photo */}
          <div className="relative flex-shrink-0 mt-4" style={{ padding: "3px" }}>
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(64px, 8vw, 96px)",
                height: "clamp(64px, 8vw, 96px)",
                borderRadius: "15px",
                background: "linear-gradient(to bottom, #F7AC00, #5A2E0D)",
                border: "1.5px solid #000",
              }}
            >
              {/* scale: 1.05 gives just enough room to shift without showing edges */}
              <motion.div className="absolute inset-0" style={{ x, y, scale: 1.05 }}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 10vw, 120px"
                />
              </motion.div>
            </div>
            {/* decorative bars around the photo frame */}
            <div className="absolute top-0 left-[10px] right-[10px] h-[6px] bg-black z-10" aria-hidden="true" />
            <div className="absolute bottom-0 left-[10px] right-[10px] h-[6px] bg-black z-10" aria-hidden="true" />
            <div className="absolute left-0 top-[10px] bottom-[10px] w-[6px] bg-black z-10" aria-hidden="true" />
            <div className="absolute right-0 top-[10px] bottom-[10px] w-[6px] bg-black z-10" aria-hidden="true" />
          </div>

          {/* name */}
          <p
            className="mt-4 text-center leading-tight"
            style={{
              fontFamily: "var(--font-silkscreen)",
              fontWeight: "700",
              color: "#000",
              fontSize: "clamp(11px, 1.2vw, 15px)",
            }}
          >
            {name}
          </p>

          {/* role badge */}
          <div className="mt-2 mb-2 inline-flex items-center">
            <div
              className="px-5 py-1.5 rounded-lg text-center whitespace-nowrap"
              style={{
                background: "linear-gradient(to bottom, #A4521A, #3E1F0A)",
                border: "1px solid #3E1F0A",
                fontFamily: "var(--font-silkscreen)",
                color: "#F7AC00",
                fontSize: "clamp(9px, 1.1vw, 18px)",
              }}
            >
              {role}
            </div>
          </div>

          {/* skills — each row has pixel-art border lines + shadow lines */}
          <div className="mt-3 w-[85%] flex flex-col gap-1.5">
            {skills.map((skill) => (
              <div
                key={skill}
                className="relative w-full px-3 py-2 text-center"
                style={{
                  fontFamily: "var(--font-about-body)",
                  color: "#3E1F0A",
                  fontSize: "clamp(9px, 1vw, 13px)",
                  fontWeight: "600",
                  backgroundColor: "transparent",
                }}
              >
                <div className="absolute top-0 left-[5px] right-[5px] h-[2px] bg-black" aria-hidden="true" />
                <div className="absolute top-[2px] left-[7px] right-[7px] h-[1px] bg-black/20" aria-hidden="true" />
                <div className="absolute bottom-0 left-[5px] right-[5px] h-[2px] bg-black" aria-hidden="true" />
                <div className="absolute left-0 top-[2px] bottom-[2px] w-[2px] bg-black" aria-hidden="true" />
                <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[1px] bg-black/20" aria-hidden="true" />
                <div className="absolute right-0 top-[2px] bottom-[2px] w-[2px] bg-black" aria-hidden="true" />
                <div className="absolute right-[2px] top-[2px] bottom-[2px] w-[1px] bg-black/20" aria-hidden="true" />
                {skill}
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
