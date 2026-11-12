import type { Metadata } from "next";
import { VTrackMarketplaceArticlePage } from "@/components/company/VTrackMarketplaceArticlePage";

export const metadata: Metadata = {
  title: "V-Track now available on Microsoft Marketplace",
  description:
    "Gravice Solutions' V-Track, the collateral valuation governance and lifecycle monitoring platform for banks and NBFCs, is now available on Microsoft Marketplace.",
};

export default function VTrackMarketplaceArticleRoute() {
  return <VTrackMarketplaceArticlePage />;
}
