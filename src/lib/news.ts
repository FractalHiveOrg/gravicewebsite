/** Third-party coverage of Gravice, shown under "In the media" on /news. Newest first. */
export type MediaCoverage = {
  publication: string;
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the outlet published the piece; omit when unknown. */
  date?: string;
};

export const mediaCoverage: MediaCoverage[] = [
  {
    publication: "PressRelease.in",
    title: "Gravice Solutions’ V-Track Now Available on Microsoft Marketplace",
    url: "https://pressrelease.in/newsroom/gravice-solutions-v-track-now-available-on-microsoft-marketplace-b14b8b4f",
    date: "2026-11-10",
  },
  {
    publication: "Enterprise IT World",
    title: "Gravice Solutions Brings V-Track Collateral Management Platform to Microsoft Marketplace",
    url: "https://enterpriseitworld.com/gravice-solutions-brings-v-track-collateral-management-platform-to-microsoft-marketplace/",
    date: "2026-11-10",
  },
  {
    publication: "EIN Presswire",
    title: "Gravice Solutions's V-Track Now Available on Microsoft Marketplace",
    url: "https://www.einpresswire.com/article/955202538/gravice-solutions-s-v-track-now-available-on-microsoft-marketplace",
    date: "2026-11-09",
  },
  {
    publication: "Today in Business",
    title: "Gravice Solutions launches V-Track on Microsoft Marketplace",
    url: "https://www.todayinbusiness.com/agp-article/955521338-gravice-solutions-launches-v-track-on-microsoft-marketplace",
    date: "2026-11-09",
  },
  {
    publication: "UAE Daily Journal",
    title: "Gravice Solutions's V-Track Now Available on Microsoft Marketplace",
    url: "https://www.uaedailyjournal.com/article/955202538-gravice-solutions-s-v-track-now-available-on-microsoft-marketplace",
    date: "2026-11-09",
  },
  {
    publication: "Today in Finance",
    title: "Gravice Solutions's V-Track Now Available on Microsoft Marketplace",
    url: "https://www.todayinfinance.com/article/955202538-gravice-solutions-s-v-track-now-available-on-microsoft-marketplace",
    date: "2026-11-09",
  },
  {
    publication: "Finance Times Gazette",
    title: "Gravice Solutions's V-Track Now Available on Microsoft Marketplace",
    url: "https://financetimesgazette.com/article/955202538-gravice-solutions-s-v-track-now-available-on-microsoft-marketplace",
    date: "2026-11-09",
  },
  {
    // Dealroom blocks automated fetches; title taken from the URL slug, date not confirmed.
    publication: "Dealroom",
    title: "Gravice Solutions launches V-Track collateral monitoring platform on Microsoft Marketplace",
    url: "https://app.dealroom.co/news/feed/gravice-solutions-launches-v-track-collateral-monitoring-platform-on-microsoft-marketplace",
  },
];

/** Gravice's own newsroom articles (press releases, announcements). Newest first. */
export type NewsArticle = {
  href: string;
  kind: string;
  title: string;
  blurb: string;
  image: string;
  /** "cover" for photos, "contain" for logos shown on a white panel. */
  imageFit: "cover" | "contain";
};

export const newsArticles: NewsArticle[] = [
  {
    href: "/news/v-track-on-microsoft-marketplace",
    kind: "Press release",
    title: "V-Track is now available on Microsoft Marketplace.",
    blurb:
      "Banks and NBFCs can now discover and deploy V-Track, our collateral valuation governance platform, through Microsoft Marketplace.",
    image: "/vtackBlack.svg",
    imageFit: "contain",
  },
  {
    href: "/news/fractalhive-is-now-gravice",
    kind: "Company news",
    title: "FractalHive is now Gravice.",
    blurb:
      "A new name for a clear purpose: intelligence at the centre of banking and business operations. Here's what changes, and what doesn't.",
    image: "/fractalhive-to-gravice-rebrand_1.png",
    imageFit: "cover",
  },
];
