"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { VT323 } from "next/font/google";
import Image from "next/image";
import { useRef, useState, type ReactNode, type Ref } from "react";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP, Flip);

interface WallpaperProps {
  src: string;
  alt: string;
  title?: string;
  youtubeId?: string;
  videoSrc?: string;
  externalUrl?: string;
}

// The frame's inner "photo" cutout, measured from Wallpaper.png (638x443):
// top 16.25%, right 7.05%, bottom 11.74%, left 5.02% of the frame's own box.
// Insets are shrunk slightly beyond the measured cutout so the photo tucks
// under the frame's border, hiding any sub-pixel rounding gap.
const PHOTO_INSET = "15% 6% 10.5% 4.2%";

const TITLE_PLATE_SHADOW =
  "4px 4px 4px 0 rgba(0,0,0,0.35), inset -2px -2px 2px 0 rgba(0,0,0,0.5), inset 2px 2px 2px 0 rgba(255,255,255,0.4)";

function FrameArt({ title, media }: { title: string; media: ReactNode }) {
  return (
    <>
      <Image
        src="/Wallpaper.png"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none object-contain"
      />
      <div className="absolute overflow-hidden border-2 border-black" style={{ inset: PHOTO_INSET }}>
        {media}
        <div
          className="absolute bottom-[8%] left-[3%] max-w-[70%] truncate rounded-sm border border-black px-3 py-1.5"
          style={{ backgroundColor: "#A4521A", boxShadow: TITLE_PLATE_SHADOW }}
        >
          <span className={`text-base text-white sm:text-lg ${vt323.className}`}>{title}</span>
        </div>
      </div>
    </>
  );
}

export default function Wallpaper({
  src,
  alt,
  title = "Placeholder Title",
  youtubeId,
  videoSrc,
  externalUrl,
}: WallpaperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  function openModal() {
    if (cardRef.current) {
      flipStateRef.current = Flip.getState(cardRef.current);
    }
    setShouldRender(true);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useGSAP(
    () => {
      if (!shouldRender || !backdropRef.current || !frameRef.current) return;

      if (isOpen) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

        if (flipStateRef.current) {
          Flip.from(flipStateRef.current, {
            targets: frameRef.current,
            scale: true,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }
      } else {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" });

        if (cardRef.current) {
          Flip.fit(frameRef.current, cardRef.current, {
            scale: true,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => setShouldRender(false),
          });
        } else {
          setShouldRender(false);
        }
      }
    },
    { dependencies: [isOpen, shouldRender] },
  );

  const thumbnailMedia = <Image src={src} alt={alt} fill className="object-cover" />;
  let expandedMedia = thumbnailMedia;
  if (youtubeId) {
    expandedMedia = (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (videoSrc) {
    expandedMedia = (
      <video className="absolute inset-0 h-full w-full object-cover" controls autoPlay>
        <source src={videoSrc} />
      </video>
    );
  }

  const cardClassName =
    "group relative block aspect-[638/443] w-full cursor-pointer text-left";
  const cardInner = (
    <div className="relative h-full w-full transition-transform duration-200 group-hover:scale-[1.02]">
      <FrameArt title={title} media={thumbnailMedia} />
    </div>
  );

  return (
    <>
      {externalUrl ? (
        <a
          ref={cardRef as Ref<HTMLAnchorElement>}
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassName}
        >
          {cardInner}
        </a>
      ) : (
        <button
          ref={cardRef as Ref<HTMLButtonElement>}
          type="button"
          onClick={openModal}
          className={cardClassName}
        >
          {cardInner}
        </button>
      )}

      {shouldRender && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={closeModal}
        >
          <div
            ref={frameRef}
            className="relative aspect-[638/443] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <FrameArt title={title} media={expandedMedia} />
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute -top-10 right-0 text-2xl text-white transition-colors hover:text-orange-300"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
