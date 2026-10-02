export interface CategoryImage {
  src: string;
  alt: string;
  title?: string;
  youtubeId?: string;
  videoSrc?: string;
  externalUrl?: string;
}

function range(count: number, makeItem: (n: number) => CategoryImage): CategoryImage[] {
  return Array.from({ length: count }, (_, i) => makeItem(i + 1));
}

// Titles for the first builds, in order; builds past the end keep the placeholder title.
const BUILD_TITLES = [
  "Mayon Recreation",
  "Dragon Shrine",
  "Fallout",
  "Philippine Plaza",
  "Palace Interior",
  "Crystal Mine",
  "RPG Forest",
  "Industrial Boat",
];

const MODEL_TITLES = ["Elemental Bosses", "Narra Bundle", "Luxury Vehicles"];

export const CATEGORY_IMAGES: Record<string, CategoryImage[]> = {
  Builds: range(10, (n) => ({
    src: `/portfolio/builds/builds-img${n}.png`,
    alt: BUILD_TITLES[n - 1] ?? `Build ${n}`,
    title: BUILD_TITLES[n - 1],
  })),
  Models: range(3, (n) => ({
    src: `/portfolio/models/models-img${n}.png`,
    alt: MODEL_TITLES[n - 1] ?? `Model ${n}`,
    title: MODEL_TITLES[n - 1],
  })),
  Development: [],
  Editing: [
    {
      src: "/portfolio/editing/editing-img1.jpg",
      alt: "Eystreem",
      title: "Eystreem",
      youtubeId: "shRHiAMBKBs",
    },
    {
      src: "/portfolio/editing/editing-img2.png",
      alt: "Hitman Intro",
      title: "Hitman Intro",
      videoSrc: "/portfolio/editing/editing-vid1.mp4",
    },
    {
      src: "/portfolio/editing/editing-img3.png",
      alt: "Cinematics Demo",
      title: "Cinematics Demo",
      videoSrc: "/portfolio/editing/editing-vid2.mp4",
    },
  ],
  Scripts: [
    {
      src: "/portfolio/scripts/scripts-img1.png",
      alt: "Eystreem Style",
      title: "Eystreem Style",
      externalUrl:
        "https://docs.google.com/document/d/1ITUqXLocaWYQws1FbeNSJboJH5q2DdgMUOSE3Nb7P6M/edit?usp=sharing",
    },
    {
      src: "/portfolio/scripts/scripts-img2.png",
      alt: "Cash & Nico Style",
      title: "Cash & Nico Style",
      externalUrl:
        "https://docs.google.com/document/d/10-lm9snD8zq6eDR8f9LMK6_-R3bnydP0jgM2kP_mg7Y/edit?usp=sharing",
    },
    {
      src: "/portfolio/scripts/scripts-img3.png",
      alt: "Aphmau Style",
      title: "Aphmau Style",
      externalUrl:
        "https://docs.google.com/document/d/1DE-plat5ttLtag2_bRQj04tsRj-W1VfPnwFbs4War3I/edit?usp=sharing",
    },
  ],
  Animation: [
    {
      src: "/portfolio/animation/animation-img1.jpg",
      alt: "Animations Sample Video",
      title: "Animations Sample Video",
      youtubeId: "d-k9yQZT-dk",
    },
  ],
};
