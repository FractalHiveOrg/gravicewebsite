/**
 * Centralized site navigation and external links configuration.
 */


const baseURL= import.meta.env.VITE_BASE_URL ||"-"
export const siteLinks = {
  navbar: {
    signIn: `${baseURL}/login`,
    getStarted: `${baseURL}/login`,
    bookDemo:"/book-a-demo"
  },
  hero: {
    getStarted: `${baseURL}/login`,
  },
  pricing: {
    starter: `${baseURL}/login?plan=standard`,
    pro: `${baseURL}/login?plan=business`,
    enterprise: "/book-a-demo",
  },
  footer: {
    startFree: `${baseURL}/login?intent=signin`,
    bookDemo: "/book-a-demo",
  },
  bookDemo: "/book-a-demo",
  contactSales: "/book-a-demo",
  legal: {
    terms: "/terms-and-conditions",
    privacy: "/privacy-policy",
  },
};
