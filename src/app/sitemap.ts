import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.map((r) => ({
    url: abs(r.path),
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
    ...(r.path === "/" || r.path === "/es/"
      ? { alternates: { languages: { "en-US": abs("/"), "es-US": abs("/es/") } } }
      : {}),
  }));
}
