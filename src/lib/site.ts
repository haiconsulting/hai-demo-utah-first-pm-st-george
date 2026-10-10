/**
 * Single source of truth for Utah First facts used across the demo.
 * Every value here comes from the HAI research one-pager or research.md
 * (utah1st.com, Iron County BOR, BBB, OpenCorporates). Anything not
 * verified is left out of the site pages and listed on /pitch for Utah First
 * to confirm, never hard-coded as fact.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const VERCEL_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

const DEFAULT_SITE_URL = BASE_PATH
  ? `https://haiconsulting.github.io${BASE_PATH}`
  : VERCEL_HOST
    ? `https://${VERCEL_HOST}`
    : "http://localhost:3000";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
export const SITE_ORIGIN = new URL(SITE_URL).origin;

/** Demo builds are noindexed unless NEXT_PUBLIC_NOINDEX is explicitly "false". */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX !== "false";

/** Absolute URL for an app route, e.g. abs("/st-george/"). */
export function abs(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Path for a file in /public, prefixed with the base path. */
export function publicPath(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for an asset whose src already includes the base path. */
export function absAsset(src: string) {
  return src.startsWith("http") ? src : `${SITE_ORIGIN}${src}`;
}

export const company = {
  name: "Utah First Property Management",
  shortName: "Utah First",
  legalName: "Wilprop, LLC",
  tagline: "Southern Utah's Property Management Experts",
  principalBroker: "Bryan Wilson",
  email: "info@utah1st.com",
  website: "https://www.utah1st.com",
  propertiesManaged: "1,100+",
  hoursText: ["Mon to Thu, 9 am to 5 pm", "Fri, 9 am to 3 pm", "Sat and Sun, closed"],
  sameAs: [
    "https://www.facebook.com/utahfirstpropertymanagement/",
    "https://www.youtube.com/channel/UC_Z-5_osgd6IwuOP3dhoDZQ",
  ],
} as const;

export const portals = {
  tenant: "https://utahfirst.appfolio.com/connect",
  owner: "https://utahfirst.appfolio.com/oportal",
  maintenance: "https://www.utah1st.com/tenant-maintenance-requests",
  listingsStGeorge: "https://www.utah1st.com/st-george",
  listingsCedar: "https://www.utah1st.com/cedar",
  spanish: "https://www.utah1st.com/hablamos-espanol",
} as const;

export type Office = {
  id: "st-george" | "cedar-city";
  name: string;
  city: string;
  county: string;
  street: string;
  suite: string;
  zip: string;
  /** null = unverified, render a placeholder */
  phone: { display: string; e164: string } | null;
  fax?: { display: string; e164: string };
  email: string;
  hoursVerified: boolean;
  path: string;
  mapsQuery: string;
};

export const offices: Record<Office["id"], Office> = {
  "st-george": {
    id: "st-george",
    name: "Utah First Property Management, St. George",
    city: "St. George",
    county: "Washington County",
    street: "1240 E. 100 S.",
    suite: "Ste. 5",
    zip: "84790",
    phone: { display: "(435) 619-5336", e164: "+14356195336" },
    fax: { display: "(435) 215-4747", e164: "+14352154747" },
    email: "info@utah1st.com",
    hoursVerified: true,
    path: "/st-george/",
    mapsQuery: "Utah First Property Management 1240 E 100 S Ste 5 St. George UT 84790",
  },
  "cedar-city": {
    id: "cedar-city",
    name: "Utah First Property Management, Cedar City",
    city: "Cedar City",
    county: "Iron County",
    street: "2113 N Main St",
    suite: "Ste. 1",
    zip: "84721",
    // Public number from the Iron County Board of REALTORS and Google listings; on the /pitch confirm list.
    phone: { display: "(435) 263-0437", e164: "+14352630437" },
    email: "info@utah1st.com",
    hoursVerified: false,
    path: "/cedar-city/",
    mapsQuery: "Utah First Property Management 2113 N Main St Ste 1 Cedar City UT 84721",
  },
};

export const mainPhone = offices["st-george"].phone!;

/** The 29 service areas listed on utah1st.com/about-us. */
export const serviceAreas = [
  "Bloomington",
  "Bloomington Hills",
  "Brookside",
  "Cedar City",
  "Central",
  "Coral Canyon",
  "Dammeron Valley",
  "Dixie Downs",
  "Entrada",
  "Enterprise",
  "Hurricane",
  "Ivins",
  "La Verkin",
  "Leeds",
  "Little Valley",
  "Pine Valley",
  "Rockville",
  "Santa Clara",
  "Sky Mountain",
  "St. George",
  "Springdale",
  "Sunbrook",
  "Sun River",
  "The Ledges",
  "Toquerville",
  "Washington",
  "Washington Fields",
  "Winchester Hills",
  "Zion National Park",
] as const;

export const washingtonCountyAreas = serviceAreas.filter((a) => a !== "Cedar City");

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/st-george/", label: "St. George" },
  { href: "/cedar-city/", label: "Cedar City" },
  { href: "/residents/", label: "Tenants & Owners" },
  { href: "/es/", label: "Español", lang: "es" },
] as const;

/** Verbatim review excerpts. Sources are shown with every quote. */
export const testimonials = [
  {
    quote:
      "These guys are the real deal... they have an excellent screening process and were able to place a quality tenant in my single family home in just over a week... unlike some other management companies around here, these guys actually answer their phones!",
    name: "Clint Jarvis",
    role: "Property owner",
    source: "Google review, as quoted on utah1st.com",
  },
  {
    quote:
      "They manage multiple properties for me and I am almost never bothered with problems. They take care of everything! And my properties are never vacant.",
    name: "Stef Bevans",
    role: "Property owner",
    source: "Google review, as quoted on utah1st.com",
  },
  {
    quote: "Sam is 10 stars. She is thorough, completely responsive and totally honest.",
    name: "Google reviewer",
    role: "Cedar City office",
    source: "Google review, Cedar City, Aug 2025",
  },
  {
    quote:
      "After signing with Utah First we had multiple showing within the first few days and had a signed lease within a few weeks.",
    name: "Google reviewer",
    role: "Cedar City owner",
    source: "Google review, Cedar City, Dec 2025",
  },
] as const;
