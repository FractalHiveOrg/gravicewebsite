/**
 * Builds NotifAI-Landing-Page into public/nico2 without leaving changes in that folder.
 * Writes a temporary Astro config inside NotifAI (required by Astro's config resolver),
 * builds, rewrites root-absolute asset/nav paths for the /nico2 subpath, then deletes
 * the temporary config.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nicoRoot = path.join(root, "NotifAI-Landing-Page");
const configName = ".astro.nico2.config.mjs";
const configPath = path.join(nicoRoot, configName);
const outDir = path.join(root, "public/nico2");
const base = "/nico2";

const configSource = `// Generated temporarily by scripts/build-nico2.mjs — do not commit.
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

export default defineConfig({
  base: "${base}/",
  outDir: ${JSON.stringify(outDir)},
  site: "https://gravicesolutions.com",
  redirects: {
    "/book-demo": "/book-a-demo",
    "/privacy": "/privacy-policy",
    "/terms": "/terms-and-conditions",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 600,
      cssMinify: "esbuild",
    },
    optimizeDeps: {
      include: ["three", "gsap"],
    },
  },
  integrations: [sitemap(), preact()],
});
`;

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

/** Prefix root-absolute URLs that the Astro source hardcoded without BASE_URL. */
function rewriteRootPaths(content) {
  return content
    .replaceAll(`${base}${base}/`, `${base}/`)
    .replace(/(=["'(])\/(?!\/|nico2\/)/g, `$1${base}/`);
}

function walkAndRewrite(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndRewrite(full);
      continue;
    }
    if (!/\.(html|css|js|xml|txt|json|svg)$/i.test(entry.name)) continue;
    const before = fs.readFileSync(full, "utf8");
    const after = rewriteRootPaths(before);
    if (after !== before) fs.writeFileSync(full, after);
  }
}

fs.mkdirSync(path.dirname(outDir), { recursive: true });
fs.rmSync(outDir, { recursive: true, force: true });
fs.writeFileSync(configPath, configSource);

try {
  run("npm", ["install"], nicoRoot);
  run("npx", ["astro", "build", "--config", configName], nicoRoot);
  walkAndRewrite(outDir);
} finally {
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
}

console.log(`Nico2 built to public/nico2/ (base ${base}/)`);
