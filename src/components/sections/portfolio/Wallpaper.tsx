import Image from "next/image";

interface WallpaperProps {
  src: string;
  alt: string;
}

// The frame's inner "photo" cutout, measured from Wallpaper.png (638x443):
// top 16.25%, right 7.05%, bottom 11.74%, left 5.02% of the frame's own box.
// The frame image is opaque across its whole box (not just the border), so
// it must render first — the photo sits on top, clipped to the cutout.
// Insets are shrunk slightly beyond the measured cutout so the photo tucks
// under the frame's border — this hides any sub-pixel rounding gap between
// the two independently-rounded absolutely-positioned layers.
export default function Wallpaper({ src, alt }: WallpaperProps) {
  return (
    <div className="relative aspect-[638/443] w-full">
      <Image
        src="/Wallpaper.png"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none object-contain"
      />
      <div
        className="absolute overflow-hidden border-2 border-black"
        style={{ inset: "15% 6% 10.5% 4.2%" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
