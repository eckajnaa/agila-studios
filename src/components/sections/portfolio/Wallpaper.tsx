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

// `sizes` hints for next/image, so the browser downloads a resolution that matches where
// each image is actually shown.
// Grid card: one column on mobile, two on tablet, capped by the grid's max width on desktop.
const GRID_SIZES = "(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 550px";
// Modal frame: `w-full max-w-4xl` inside the backdrop's `p-6`, i.e. min(100vw - 48px, 896px),
// which reaches its 896px cap at 944px wide.
const MODAL_FRAME_SIZES = "(max-width: 944px) calc(100vw - 48px), 896px";
// Modal photo: the cutout is 91.8% of the frame's width (4.2% + 4% side insets):
// 0.918 * (100vw - 48px) ≈ 91.8vw - 44px, capped at 0.918 * 896px ≈ 823px.
const MODAL_PHOTO_SIZES = "(max-width: 944px) calc(91.8vw - 44px), 823px";

const TITLE_PLATE_SHADOW =
  "4px 4px 4px 0 rgba(0,0,0,0.35), inset -2px -2px 2px 0 rgba(0,0,0,0.5), inset 2px 2px 2px 0 rgba(255,255,255,0.4)";

// Pixel-art play triangle: 10 rows whose widths grow and shrink in 2px steps, giving a
// near-equilateral ▶ that stays crisp at any size.
const PLAY_ROWS = [1, 3, 5, 7, 9, 9, 7, 5, 3, 1];
const PLAY_PATH = PLAY_ROWS.map((width, y) => `M0 ${y}h${width}v1H0z`).join("");

// Pixel-art "expand" icon: four corner brackets on a 10x10 grid.
const VIEW_PATH =
  "M0 0h4v1H1v3H0zM6 0h4v4H9V1H6zM0 6h1v3h3v1H0zM9 6h1v4H6V9h3z";

// Pixel-art "external link" arrow ↗ on a 10x10 grid: a 2px-thick corner for the arrowhead,
// plus a 2px-wide diagonal staircase for the shaft.
const EXTERNAL_PATH =
  "M4 0h6v6H8V2H4z" +
  [6, 5, 4, 3, 2, 1, 0].map((x, i) => `M${x} ${i + 2}h2v1H${x}z`).join("") +
  "M0 9h1v1H0z";

const BADGES = {
  play: { label: "PLAY", viewBox: "0 0 9 10", path: PLAY_PATH, iconSize: "h-5 w-[1.125rem] sm:h-6 sm:w-[1.35rem]" },
  view: { label: "VIEW", viewBox: "0 0 10 10", path: VIEW_PATH, iconSize: "h-5 w-5 sm:h-6 sm:w-6" },
  // External links (the Scripts' Google Docs) open in a new tab.
  read: { label: "READ", viewBox: "0 0 10 10", path: EXTERNAL_PATH, iconSize: "h-5 w-5 sm:h-6 sm:w-6" },
} as const;

type BadgeKind = keyof typeof BADGES;

// Hover badge telling the visitor what clicking does: PLAY for videos, VIEW for images,
// READ for external documents.
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

function FrameArt({ title, media, sizes }: { title: string; media: ReactNode; sizes: string }) {
  return (
    <>
      <Image
        src="/Wallpaper.png"
        alt=""
        fill
        aria-hidden="true"
        sizes={sizes}
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
  const photo = (sizes: string) => (
    <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
  );
  const thumbnailImage = photo(GRID_SIZES);
  const badgeKind: BadgeKind = isVideo ? "play" : externalUrl ? "read" : "view";
  const thumbnailMedia = (
    <>
      {thumbnailImage}
      <MediaBadge kind={badgeKind} />
    </>
  );
  // Rendered separately from the thumbnail so the modal requests a large enough image.
  let expandedMedia = photo(MODAL_PHOTO_SIZES);
  // Both video types start playing as the modal opens — the card's PLAY badge already asked
  // for playback. Browsers can still block autoplay, so each keeps its own play controls.
  if (youtubeId) {
    expandedMedia = (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (videoSrc) {
    expandedMedia = (
      // poster: the card's thumbnail shows while loading or if autoplay is blocked.
      // playsInline: stops iPhones from forcing the video into fullscreen.
      <video className="absolute inset-0 h-full w-full object-cover" controls autoPlay playsInline poster={src}>
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
      <FrameArt title={title} media={thumbnailMedia} sizes={GRID_SIZES} />
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
          aria-label={`Read ${alt}${externalUrl.includes("docs.google.com") ? " in Google Docs" : ""} (opens in a new tab)`}
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
            <FrameArt title={title} media={expandedMedia} sizes={MODAL_FRAME_SIZES} />
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
