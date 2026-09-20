export interface CategoryImage {
  src: string;
  alt: string;
  youtubeId?: string;
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
    { src: "/portfolio/editing/editing-img1.jpg", alt: "Editing 1" },
    { src: "/portfolio/editing/editing-img2.png", alt: "Editing 2" },
    { src: "/portfolio/editing/editing-img3.png", alt: "Editing 3" },
  ],
  Scripts: range(3, (n) => ({
    src: `/portfolio/scripts/scripts-img${n}.png`,
    alt: `Script ${n}`,
  })),
  Animation: [
    { src: "/portfolio/animation/animation-img1.jpg", alt: "Animation 1", youtubeId: "d-k9yQZT-dk" },
  ],
};
