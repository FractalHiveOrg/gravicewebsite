import type { MetadataRoute } from "next";
import { newsArticles } from "@/lib/news";
import { productList } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"] = "monthly",
): Entry => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
});

// lastModified is left out on purpose: pages carry no reliable edit dates, and
// crawlers learn to ignore a lastmod that is always the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("", 1, "weekly"),

    ...productList.map((p) => page(`/products/${p.slug}`, 0.9)),

    page("/industries/financial-institutions", 0.8),
    page("/industries/manufacturing", 0.8),

    page("/news", 0.7, "weekly"),
    ...newsArticles.map((a) => page(a.href, 0.7, "yearly")),
    page("/insights", 0.6, "weekly"),

    page("/company/about", 0.6),
    page("/company/life-at-gravice", 0.5),
    page("/company/careers", 0.5, "weekly"),
    page("/company/contact", 0.5),
    page("/demo", 0.6),

    page("/legal/privacy", 0.2, "yearly"),
    page("/legal/terms", 0.2, "yearly"),
    page("/legal/cookies", 0.2, "yearly"),
  ];
}
