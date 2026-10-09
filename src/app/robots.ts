import type { MetadataRoute } from "next";
import { abs, BASE_PATH, NOINDEX } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The demo is blocked from crawling. Production (NEXT_PUBLIC_NOINDEX=false) allows everything except /pitch.
  return {
    rules: NOINDEX
      ? { userAgent: "*", disallow: `${BASE_PATH}/` }
      : { userAgent: "*", allow: `${BASE_PATH}/`, disallow: `${BASE_PATH}/pitch/` },
    sitemap: abs("/sitemap.xml"),
  };
}
