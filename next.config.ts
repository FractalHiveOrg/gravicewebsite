import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // the financial services industry page moved from its old stub URL;
    // /industries and /company have no landing page yet, so send them to the first page in each menu
    return [
      {
        source: "/industries/banking",
        destination: "/industries/financial-institutions",
        permanent: true,
      },
      { source: "/industries", destination: "/industries/financial-institutions", permanent: false },
      { source: "/company", destination: "/company/about", permanent: false },
    ];
  },
  async rewrites() {
    // Serve the built NotifAI (Nico2) static site from public/nico2 before the
    // root catch-all stub route can claim these paths. Extension-less paths map
    // to their directory index.html (Astro static output).
    return {
      beforeFiles: [
        { source: "/nico2", destination: "/nico2/index.html" },
        { source: "/nico2/", destination: "/nico2/index.html" },
        {
          source: "/nico2/:path([^.]*)",
          destination: "/nico2/:path/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
