import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// GitHub Pages and other static hosts use `export`. The Docker image sets
// NEXT_OUTPUT=standalone to get a self-contained Node server on port 3000.
const output = process.env.NEXT_OUTPUT === "standalone" ? "standalone" : "export";

const nextConfig: NextConfig = {
  output,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
