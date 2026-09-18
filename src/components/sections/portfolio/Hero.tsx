import { Outfit, Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"] });
const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden border-b-10 border-[#3E1F0A] bg-[#2B1608] py-24"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(240, 129, 0, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(240, 129, 0, 0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <h1
          className={`text-7xl text-[#FFB300] [text-shadow:3px_3px_0_#000] sm:text-8xl ${silkscreen.className}`}
        >
          Agila Studios
        </h1>
        <p
          className={`mt-10 max-w-none text-2xl text-[#FFF7E0] sm:text-3xl 2xl:whitespace-nowrap ${outfit.className}`}
        >
          Each creation is crafted with precision, creativity, and passion for
          the game.
        </p>
      </div>
    </section>
  );
}
