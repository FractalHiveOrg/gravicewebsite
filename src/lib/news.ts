/** Third-party coverage of Gravice, shown under "In the media" on /news. Newest first. */
export type MediaCoverage = {
  publication: string;
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the outlet published the piece. */
  date: string;
};

export const mediaCoverage: MediaCoverage[] = [
  // {
  //   publication: "PressRelease.in",
  //   title: "Gravice Solutions’ V-Track Now Available on Microsoft Marketplace",
  //   url: "https://pressrelease.in/newsroom/gravice-solutions-v-track-now-available-on-microsoft-marketplace-b14b8b4f",
  //   date: "2026-11-10",
  // },
  {
    publication: "Enterprise IT World",
    title: "Gravice Solutions Brings V-Track Collateral Management Platform to Microsoft Marketplace",
    url: "https://enterpriseitworld.com/gravice-solutions-brings-v-track-collateral-management-platform-to-microsoft-marketplace/",
    date: "2026-11-10",
  },
  // {
  //   publication: "EIN Presswire",
  //   title: "Gravice Solutions's V-Track Now Available on Microsoft Marketplace",
  //   url: "https://www.einpresswire.com/article/955202538/gravice-solutions-s-v-track-now-available-on-microsoft-marketplace",
  //   date: "2026-11-09",
  // },
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
];
