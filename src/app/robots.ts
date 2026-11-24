import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The wildcard rule admits search engines and AI answer-engine crawlers alike
// (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, …).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
