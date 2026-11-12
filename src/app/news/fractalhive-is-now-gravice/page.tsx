import type { Metadata } from "next";
import { RebrandArticlePage } from "@/components/company/RebrandArticlePage";

export const metadata: Metadata = {
  title: "FractalHive is now Gravice",
  description:
    "FractalHive is now Gravice. The name is new. The team, the products and our purpose are the same. Here's what changes, and what doesn't.",
};

export default function RebrandArticleRoute() {
  return <RebrandArticlePage />;
}
