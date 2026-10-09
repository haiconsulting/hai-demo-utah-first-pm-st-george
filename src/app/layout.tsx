import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import { ribbonBootScript } from "@/components/demo-ribbon";
import { company, NOINDEX, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-display-face",
  // "optional" keeps the size-matched fallback on slow first loads instead of re-rendering the hero heading.
  display: "optional",
});

// Italic is only used for one emphasized word per headline, so it is not preloaded.
const displayItalic = Fraunces({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-display-italic",
  display: "swap",
  preload: false,
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} | St. George & Cedar City, UT`,
    template: `%s | ${company.shortName}`,
  },
  applicationName: company.name,
  authors: [{ name: "HAI Consulting (demo concept)" }],
  robots: NOINDEX ? { index: false, follow: false } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7eee2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${displayItalic.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ribbonBootScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
