import { Silkscreen, Outfit } from "next/font/google";
import CreatorCard from "./CreatorCard";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-about-body",
  display: "swap",
});

const CREATORS = [
  {
    name: "Jess Lacdao III",
    role: "Founder & CEO",
    image: "/images/creators/jess-lacdao.webp",
    skills: ["Client Relations", "Project Management", "Level Design"],
  },
  {
    name: "Charles Samoy",
    role: "COO",
    image: "/images/creators/charles-samoy.webp",
    skills: ["Team Handler", "Pipeline Manager", "Lead Quality Control"],
  },
  {
    name: "Babylyn Loyola",
    role: "CFMO",
    image: "/images/creators/babylyn-loyola.webp",
    skills: ["Accounting & Finance", "Lead Marketing"],
  },
  {
    name: "Sean Orbillo",
    role: "Lead Animation",
    image: "/images/creators/sean-orbillo.webp",
    skills: ["Model Animation", "Gameplay & Trailers"],
  },
  {
    name: "Mark Urbano",
    role: "Level Design Lead",
    image: "/images/creators/mark-urbano.webp",
    skills: ["Marketplace Builder", "Spawn & Maps Builder", "Axiom Abuser"],
  },
  {
    name: "Nicolas Eje",
    role: "Lead Writer",
    image: "/images/creators/nicolas-eje.webp",
    skills: ["Story & Script Writer", "Content Writer", "Storyboard"],
  },
  {
    name: "Rus Ferling",
    role: "Lead Developer",
    image: "/images/creators/rus-ferling.webp",
    skills: ["Java & Bedrock Developer", "Gameplay"],
  },
  {
    name: "Daniel Pridas",
    role: "Lead Game Design",
    image: "/images/creators/daniel-pridas.webp",
    skills: ["Game Design & Concept Artist", "Quality Assurance"],
  },
  {
    name: "Obvi",
    role: "Lead Obvi",
    image: "/images/creators/obvi.webp",
    skills: [
      "Everything Above and More Obviously.",
      "Creator",
      "All goods",
    ],
  },
];

export default function MeetTheCreators() {
  return (
    <section
      className={`${silkscreen.variable} ${outfit.variable}`}
      style={{ backgroundColor: "#1a100b" }}
      aria-label="Meet the creators"
    >
      {/* cards */}
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 sm:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CREATORS.map((creator, i) => (
            <CreatorCard key={creator.name} {...creator} index={i} />
          ))}
        </div>
      </div>

      {/* bottom divider before the footer */}
      <div
        className="w-full h-[80px] sm:h-[100px] md:h-[122px]"
        style={{
          backgroundImage: "url('/images/about/divider-footer.webp')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        role="presentation"
        aria-hidden="true"
      />
    </section>
  );
}
