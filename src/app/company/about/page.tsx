import type { Metadata } from "next";
import { AboutPage } from "@/components/company/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gravice builds intelligent but simple software for banks, NBFCs and growing businesses, so their teams move faster, with less risk and more control.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
