"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { VT323 } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";

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

// The frame's inner "photo" cutout, measured from Wallpaper.png (625x430):
// top 16.74%, right 5.12%, bottom 9.07%, left 5.12% of the frame's own box.
// Insets are shrunk slightly beyond the measured cutout so the photo tucks
// under the frame's border, hiding any sub-pixel rounding gap.
const PHOTO_INSET = "15.5% 4% 7.7% 4.2%";

const TITLE_PLATE_SHADOW =
  "4px 4px 4px 0 rgba(0,0,0,0.35), inset -2px -2px 2px 0 rgba(0,0,0,0.5), inset 2px 2px 2px 0 rgba(255,255,255,0.4)";

// Pixel-art play triangle: 10 rows whose widths grow and shrink in 2px steps, giving a
// near-equilateral ▶ that stays crisp at any size.
const PLAY_ROWS = [1, 3, 5, 7, 9, 9, 7, 5, 3, 1];
const PLAY_PATH = PLAY_ROWS.map((width, y) => `M0 ${y}h${width}v1H0z`).join("");

// Pixel-art "expand" icon: four corner brackets on a 10x10 grid.
const VIEW_PATH =
  "M0 0h4v1H1v3H0zM6 0h4v4H9V1H6zM0 6h1v3h3v1H0zM9 6h1v4H6V9h3z";

const BADGES = {
  play: { label: "PLAY", viewBox: "0 0 9 10", path: PLAY_PATH, iconSize: "h-5 w-[1.125rem] sm:h-6 sm:w-[1.35rem]" },
  view: { label: "VIEW", viewBox: "0 0 10 10", path: VIEW_PATH, iconSize: "h-5 w-5 sm:h-6 sm:w-6" },
} as const;

type BadgeKind = keyof typeof BADGES;

// Hover badge telling the visitor what clicking does: PLAY for videos, VIEW for images.
// Styled like the frame's title plate (same bevel) so it reads as part of the frame art.
// Purely decorative: the card stays the only interactive element and carries the label.
function MediaBadge({ kind }: { kind: BadgeKind }) {
  const badge = BADGES[kind];
  return (
    // Fades in on hover or keyboard focus; always visible on touch screens, which can't hover.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80 [@media(hover:none)]:opacity-80"
    >
      {/* Soft shadow behind the badge so it stands out on bright thumbnails */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_35%,transparent_65%)]" />
      <div
        className="relative flex items-center gap-2.5 rounded-sm border-2 border-black bg-[#F08100] px-4 py-2 transition-transform duration-200 ease-out group-hover:scale-110 sm:gap-3 sm:px-5 sm:py-2.5"
        style={{ boxShadow: TITLE_PLATE_SHADOW }}
      >
        <svg viewBox={badge.viewBox} shapeRendering="crispEdges" fill="#2B1608" className={badge.iconSize}>
          <path d={badge.path} />
        </svg>
        <span className={`text-2xl leading-none tracking-[0.2em] text-[#2B1608] sm:text-3xl ${vt323.className}`}>
          {badge.label}
        </span>
      </div>
    </div>
  );
}

function FrameArt({ title, media }: { title: string; media: ReactNode }) {
  return (
    <>
      <Image
        src="/Wallpaper.png"
        alt=""
        fill
        aria-hidden="true"
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 550px"
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
  const innerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function handleHoverEnter() {
    gsap.to(innerRef.current, {
      y: -6,
      scale: 1.03,
      rotate: -1.5,
      boxShadow: "0px 18px 28px rgba(0,0,0,0.45)",
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleHoverLeave() {
    gsap.to(innerRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out",
    });
  }

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

  // Keyboard support while the modal is open: Escape closes it (listening on document so it
  // works wherever focus is on the page), focus starts on the close button, and goes back to
  // the card afterwards. A focused YouTube iframe receives keys itself, so Escape can't be
  // caught while the player has focus — starting focus on the close button avoids that.
  useEffect(() => {
    if (!isOpen) return;
    const card = cardRef.current;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      card?.focus({ preventScroll: true });
    };
  }, [isOpen]);

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

  const isVideo = Boolean(youtubeId || videoSrc);
  const thumbnailImage = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 550px"
      className="object-cover"
    />
  );
  // External links (Scripts) open a new tab rather than the viewer, so they get no badge.
  const badgeKind: BadgeKind | null = isVideo ? "play" : externalUrl ? null : "view";
  const thumbnailMedia = badgeKind ? (
    <>
      {thumbnailImage}
      <MediaBadge kind={badgeKind} />
    </>
  ) : (
    thumbnailImage
  );
  let expandedMedia = thumbnailImage;
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

  const cardClassName = "group relative block aspect-[625/430] w-full cursor-pointer text-left";
  const cardInner = (
    <div
      ref={innerRef}
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      className="relative h-full w-full"
      style={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
    >
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
          aria-label={isVideo ? `Play video: ${alt}` : `View image: ${alt}`}
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
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="relative aspect-[625/430] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <FrameArt title={title} media={expandedMedia} />
            <button
              ref={closeButtonRef}
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
