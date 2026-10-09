import type { Metadata } from "next";
import { abs, company, NOINDEX } from "./site";
import { ogImageUrl } from "./schema";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is instead of the "| Utah First" template. */
  absoluteTitle?: boolean;
  locale?: "en_US" | "es_US";
  languages?: Record<string, string>;
};

export function pageMeta({ title, description, path, absoluteTitle, locale = "en_US", languages }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.shortName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: abs(path),
      ...(languages ? { languages: Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, abs(v)])) } : {}),
    },
    openGraph: {
      type: "website",
      url: abs(path),
      siteName: company.name,
      title: fullTitle,
      description,
      locale,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "A two-story white farmhouse-style home in Southern Utah" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    robots: NOINDEX ? { index: false, follow: false, googleBot: { index: false, follow: false } } : undefined,
  };
}
