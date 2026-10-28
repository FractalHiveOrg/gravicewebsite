import type { Metadata } from "next";
import { LifePage } from "@/components/company/LifePage";

export const metadata: Metadata = {
  title: "Life at Gravice",
  description:
    "Serious work, with room to be curious. See how the Gravice team works, learns and celebrates together.",
};

export default function LifeRoute() {
  return <LifePage />;
}
