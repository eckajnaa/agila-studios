import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://agila.devs.team"),
  title: "Agila Studios",
  description: "Agila Studios — a Minecraft content studio covering builds, 3D modeling, development, video editing, scripting, and animation.",
  openGraph: {
    title: "Agila Studios",
    description: "Agila Studios — a Minecraft content studio covering builds, 3D modeling, development, video editing, scripting, and animation.",
    url: "https://agila.devs.team",
    siteName: "Agila Studios",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Agila Studios — Delivering content since 2019",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agila Studios",
    description: "Agila Studios — a Minecraft content studio covering builds, 3D modeling, development, video editing, scripting, and animation.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
