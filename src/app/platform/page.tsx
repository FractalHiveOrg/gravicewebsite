import type { Metadata } from "next";
import { PlatformPage } from "@/components/platform/PlatformPage";

export const metadata: Metadata = {
  title: "GraviceOS platform",
  description:
    "GraviceOS is the operating layer behind every Gravice product: workflow, integrations, security and intelligence, built once and proven in ElevateRM, V-Track and Nico, and available as kits for your own software.",
};

export default function PlatformRoute() {
  return <PlatformPage />;
}
