// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://nico.fractalhive.com', // Update with your actual production URL
  redirects: {
    '/book-demo': '/book-a-demo',
    '/privacy': '/privacy-policy',
    '/terms': '/terms-and-conditions',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 600,
      cssMinify: 'esbuild',
    },
    optimizeDeps: {
      include: ['three', 'gsap'],
    },
  },
  integrations: [sitemap(), preact()],
});