import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { GravityCursor } from "@/components/GravityCursor";
import { HeroMotionProvider } from "@/components/HeroMotionGate";
import { RebrandIntro } from "@/components/RebrandIntro";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/gravice/sections/SiteFooter";
import "@/gravice/gravice.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gravice — Intelligence, at the centre.",
    template: "%s · Gravice",
  },
  description:
    "Gravice builds software that brings order to slow, manual, high-stakes work for enterprises and growing businesses.",
  metadataBase: new URL("https://gravicesolutions.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0E1B2C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body
        id="top"
        className="min-h-full flex flex-col bg-paper text-deep-space"
      >
        {/* Before paint: always open at the top on reload (not restored mid-page). */}
        <Script
          id="scroll-top-on-load"
          strategy="beforeInteractive"
        >{`try{if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);}catch(e){}`}</Script>
        <HeroMotionProvider>
          <RebrandIntro />
          <GravityCursor />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </HeroMotionProvider>
      </body>
    </html>
  );
}
