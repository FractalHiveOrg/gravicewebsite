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
