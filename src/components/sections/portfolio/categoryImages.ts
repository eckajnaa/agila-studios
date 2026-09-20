export interface CategoryImage {
  src: string;
  alt: string;
  youtubeId?: string;
  videoSrc?: string;
  externalUrl?: string;
}

function range(count: number, makeItem: (n: number) => CategoryImage): CategoryImage[] {
  return Array.from({ length: count }, (_, i) => makeItem(i + 1));
}

export const CATEGORY_IMAGES: Record<string, CategoryImage[]> = {
  Builds: range(10, (n) => ({
    src: `/portfolio/builds/builds-img${n}.png`,
    alt: `Build ${n}`,
  })),
  Models: range(3, (n) => ({
    src: `/portfolio/models/models-img${n}.png`,
    alt: `Model ${n}`,
  })),
  Development: [],
  Editing: [
    { src: "/portfolio/editing/editing-img1.jpg", alt: "Editing 1", youtubeId: "shRHiAMBKBs" },
    {
      src: "/portfolio/editing/editing-img2.png",
      alt: "Editing 2",
      videoSrc: "/portfolio/editing/editing-vid1.mp4",
    },
    {
      src: "/portfolio/editing/editing-img3.png",
      alt: "Editing 3",
      videoSrc: "/portfolio/editing/editing-vid2.mp4",
    },
  ],
  Scripts: [
    {
      src: "/portfolio/scripts/scripts-img1.png",
      alt: "Script 1",
      externalUrl:
        "https://docs.google.com/document/d/1ITUqXLocaWYQws1FbeNSJboJH5q2DdgMUOSE3Nb7P6M/edit?usp=sharing",
    },
    {
      src: "/portfolio/scripts/scripts-img2.png",
      alt: "Script 2",
      externalUrl:
        "https://docs.google.com/document/d/10-lm9snD8zq6eDR8f9LMK6_-R3bnydP0jgM2kP_mg7Y/edit?usp=sharing",
    },
    {
      src: "/portfolio/scripts/scripts-img3.png",
      alt: "Script 3",
      externalUrl:
        "https://docs.google.com/document/d/1DE-plat5ttLtag2_bRQj04tsRj-W1VfPnwFbs4War3I/edit?usp=sharing",
    },
  ],
  Animation: [
    { src: "/portfolio/animation/animation-img1.jpg", alt: "Animation 1", youtubeId: "d-k9yQZT-dk" },
  ],
};
