import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CalendarClock, Check, ChevronDown, KeyRound, MapPin, PhoneCall, ShieldCheck, X } from "lucide-react";
import beforeDesktop from "@/assets/pitch/utah1st-desktop.webp";
import beforeMobile from "@/assets/pitch/utah1st-mobile.webp";
import afterDesktop from "@/assets/pitch/demo-desktop.webp";
import afterMobile from "@/assets/pitch/demo-mobile.webp";
import { Placeholder } from "@/components/placeholder";
import { pageMeta } from "@/lib/metadata";
import { demoLighthouse } from "@/lib/lighthouse";

export const metadata = pageMeta({
  title: "Pitch for Utah First Property Management | HAI Consulting",
  absoluteTitle: true,
  description:
    "HAI Consulting's demo concept for Utah First Property Management: what owners and tenants get, the current site side by side with the demo, and the offer.",
  path: "/pitch/",
});

// HAI Consulting contact for real estate pitches. Set at build time; placeholders show until then.
const HAI_EMAIL = process.env.NEXT_PUBLIC_HAI_CONTACT_EMAIL || "";
const HAI_PHONE = process.env.NEXT_PUBLIC_HAI_CONTACT_PHONE || "";
const HAI_BOOKING_URL = process.env.NEXT_PUBLIC_HAI_BOOKING_URL || "";
const bookingHref =
  HAI_BOOKING_URL || (HAI_EMAIL ? `mailto:${HAI_EMAIL}?subject=${encodeURIComponent("Utah First: 15-min walkthrough")}` : "");

type Row = { area: string; now: string; demo: string };

const outcomes = [
  {
    icon: CalendarClock,
    title: "Owners request a rent analysis in 2 taps",
    body: "A Free Rent Analysis button sits in the header and the hero. Two taps from any page starts a short 4-step form, instead of hunting for a menu item with broken copy.",
    href: "/free-rent-analysis/",
  },
  {
    icon: Bot,
    title: "Built to show up when someone asks AI for St. George property managers",
    body: "Clear business details, both offices, services and service areas in a form Google and AI assistants can read and quote. Nobody can guarantee a recommendation; this removes the reasons to skip you.",
    href: "/st-george/",
  },
  {
    icon: MapPin,
    title: "Cedar City finally has its own page",
    body: "The Cedar City office gets its address, services and reviews on a real page, not just a listings widget that renders empty.",
    href: "/cedar-city/",
  },
  {
    icon: KeyRound,
    title: "Tenants find pay-rent and emergency info in one tap",
    body: "Pay rent, maintenance (emergency or not, with the after-hours line up front), rentals and owner login, all one tap from the homepage.",
    href: "/residents/",
  },
  {
    icon: PhoneCall,
    title: "More calls and leads from the traffic you already get",
    body: "Every page ends in a clear next step: call, request an analysis, or open the right portal. Owners and tenants stop bouncing off a dated homepage.",
    href: "/",
  },
  {
    icon: ShieldCheck,
    title: "A site that looks as looked-after as your homes",
    body: "Your real photos, proofread copy, the current year in the footer, sourced Google quotes, and a Spanish hub for tenants.",
    href: "/es/",
  },
];

const ownerRows: Row[] = [
  { area: "Owner signup", now: "\u201cRent Analysis\u201d is a menu item and its form copy is broken", demo: "Free Rent Analysis as the hero CTA, with a 4-step form" },
  { area: "Cedar City", now: "Address and phone appear nowhere on the site; city page is a listings widget", demo: "A real Cedar City page with services, areas and office details" },
  { area: "Tenant flows", now: "Long maintenance page with \u201cCLICK HERE\u201d and an after-hours extension buried in text", demo: "One hub: emergency or not, pay rent, apply, owner login" },
  { area: "Listings", now: "\u201cShowing 0 of 0\u201d until JavaScript runs", demo: "Direct links now, listing cards from the AppFolio feed in the live build" },
  { area: "Freshness", now: "Footer says \u00a9 2023; newest blog post seen is from 2020", demo: "Year updates itself; no stale posts on the main path" },
  { area: "Copy", now: "Typos such as \u201cappr-oach\u201d, \u201cinspe-ctions\u201d, \u201ccritcal\u201d, \u201craitio\u201d, \u201cMaintenence\u201d", demo: "Proofread, plain, owner-first" },
  { area: "Spanish", now: "A single \u201cHablamos Espa\u00f1ol\u201d page", demo: "A Spanish hub for tenants and owners" },
  { area: "Ownership", now: "Duda site builder (rented)", demo: "A site you own outright" },
];

const technicalRows: Row[] = [
  { area: "Homepage title", now: "Just \u201cHome\u201d", demo: "\u201cSt. George & Cedar City Property Management | Utah First\u201d" },
  { area: "Meta description", now: "None on the homepage", demo: "Written for owners on every page" },
  { area: "H1 heading", now: "No H1 on the homepage", demo: "One clear H1 per page" },
  { area: "Business schema", now: "No LocalBusiness or RealEstateAgent schema on core pages (one JSON-LD block, on a blog post)", demo: "RealEstateAgent and LocalBusiness for both offices, plus FAQ and breadcrumb schema" },
  { area: "llms.txt", now: "Auto-generated, lists only listing UUID URLs", demo: "Describes services, areas, offices, hours and portals" },
  { area: "Image alt text", now: "4 of 5 homepage images have none", demo: "Every image described" },
  { area: "Page weight", now: "28 script tags, Font Awesome 5.8, a retired Universal Analytics tag, two YouTube embeds", demo: "Static HTML, self-hosted fonts, no third-party scripts" },
  { area: "Sitemap", now: "Padded with old holiday blog posts", demo: "Lists real pages only, with Spanish alternates" },
  { area: "Platform", now: "Duda builder with AppFolio widgets", demo: "Next.js static export; AppFolio stays for portals" },
];

const evidence = [
  { title: "\u201cShowing 0 of 0\u201d", body: "The St. George, Cedar City and Northern Utah listing pages return \u201cShowing 0 of 0 results\u201d in plain HTML. Listings only appear after JavaScript runs, so crawlers and AI tools can see an empty page." },
  { title: "Typos on money pages", body: "\u201cappr-oach\u201d, \u201cinspe-ctions\u201d, \u201ccritcal\u201d, \u201craitio\u201d, \u201cMaintenence\u201d, \u201cat at\u201d and \u201cwith in days\u201d appear in body copy owners read before they call." },
  { title: "\u00a9 2023 footer", body: "A stale copyright year tells a careful owner the site is not looked after. On a property manager\u2019s site, that is the one impression you cannot afford." },
  { title: "Broken rent-analysis copy", body: "The rent-analysis page, the one page built to win owners, asks visitors to \u201cplease the form below.\u201d The homepage has no owner CTA at all." },
];

const competitors = [
  { name: "Red Rock Property Management", claim: "\u201c1,000+ rental homes\u201d since 2012, St. George and Cedar City" },
  { name: "STG Rental Management", claim: "350+ homes, published owner survey stats" },
  { name: "Keyrenter St. George", claim: "Franchise, lease guarantee, 24/7 leasing team, 50+ site marketing" },
  { name: "Advanced Realty", claim: "\u201c30+ years\u201d, 24/7 maintenance coordination, rental analysis form on page" },
  { name: "Equity Property Management", claim: "Publishes its fee calculation up front" },
];

const plans = [
  {
    kicker: "Build",
    price: "From $2,000",
    sub: "One time. You own the code.",
    bullets: [
      "Owner-first homepage with Free Rent Analysis",
      "St. George and Cedar City pages",
      "Tenant & Owner Hub linked to AppFolio",
      "Schema, llms.txt, sitemap and a Spanish hub",
    ],
    note: null,
    featured: true,
  },
  {
    kicker: "Care",
    price: "$450/yr",
    sub: "or $45/mo",
    bullets: [
      "Hosting and SSL kept current",
      "Security and framework updates",
      "Small fixes: hours, phone numbers, photo swaps",
      "Uptime and broken-link checks",
    ],
    note: "Care scope: confirm with HAI",
    featured: false,
  },
  {
    kicker: "Care+",
    price: "$900/yr",
    sub: "Ongoing edits",
    bullets: [
      "Everything in Care",
      "Ongoing content edits for listings and pages",
      "Seasonal and vacancy updates",
      "New neighborhood or owner pages as you grow",
    ],
    note: "Care+ scope beyond listing and content edits: confirm with HAI",
    featured: false,
  },
];

const placeholders = [
  "Google review counts before showing them: 462 (St. George) and 85 (Cedar City); the demo shows ratings only",
  "Cedar City phone (435) 263-0437, taken from the Iron County Board of REALTORS and Google listings",
  "Cedar City hours, and current address (Google: 2113 N Main St Ste 1; Iron County BOR: 1166 S Sage Dr #2)",
  "Cedar City team names, roles and photos, and other Iron County areas served",
  "Management, leasing and setup fees, and HOA management scope",
  "Rent analysis response time",
  "Exact emergency maintenance policy and examples",
  "Live AppFolio listing feed for crawlable vacancy cards",
  "Spanish translation review",
];

const wrap = "mx-auto max-w-[1140px] px-[clamp(1rem,4vw,3rem)]";
const h2 = "mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold";

function BookCta({ variant = "primary" }: { variant?: "primary" | "ghost" }) {
  const cls =
    variant === "primary"
      ? "inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a8472b] px-6 text-[0.96rem] font-semibold text-white transition-colors hover:bg-[#8f3b23]"
      : "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#e4d9c4] px-6 text-[0.96rem] font-semibold text-[#221c18] hover:bg-[#f4ecdd]";
  if (bookingHref) {
    return (
      <a href={bookingHref} data-book-cta className={cls} {...(bookingHref.startsWith("http") ? { rel: "noopener" } : {})}>
        Book a 15-min walkthrough <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    );
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span data-book-cta aria-disabled="true" className={`${cls} cursor-not-allowed opacity-80`}>
        Book a 15-min walkthrough
      </span>
      <Placeholder>Booking link: set NEXT_PUBLIC_HAI_BOOKING_URL</Placeholder>
    </span>
  );
}

function Shot({
  label,
  desktop,
  mobile,
  alt,
  tone,
}: {
  label: string;
  desktop: StaticImageData;
  mobile: StaticImageData;
  alt: { desktop: string; mobile: string };
  tone: "before" | "after";
}) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#221c18]">
        {tone === "before" ? (
          <X className="size-4 text-[#b23122]" aria-hidden="true" />
        ) : (
          <Check className="size-4 text-[#4e6b4a]" aria-hidden="true" />
        )}
        {label}
      </figcaption>
      <div className="relative pr-[14%] pb-[10%]">
        <div className="overflow-hidden rounded-[10px] border border-[#e4d9c4] bg-white shadow-[0_2px_6px_rgba(34,28,24,.08),0_22px_50px_rgba(34,28,24,.14)]">
          <div className="flex items-center gap-1.5 border-b border-[#efe7d8] bg-[#f4ecdd] px-3 py-2" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#e4d9c4]" />
            <span className="size-2 rounded-full bg-[#e4d9c4]" />
            <span className="size-2 rounded-full bg-[#e4d9c4]" />
          </div>
          <Image src={desktop} alt={alt.desktop} priority sizes="(min-width: 768px) 520px, 92vw" className="block h-auto w-full" />
        </div>
        <div className="absolute right-0 bottom-0 w-[27%] overflow-hidden rounded-[14px] border-[3px] border-[#221c18] bg-white shadow-[0_14px_30px_rgba(34,28,24,.3)]">
          <Image src={mobile} alt={alt.mobile} sizes="(min-width: 768px) 140px, 25vw" className="block aspect-[9/16] h-auto w-full object-cover object-top" />
        </div>
      </div>
    </figure>
  );
}

function CompareRows({ rows, label }: { rows: Row[]; label: string }) {
  return (
    <>
      <ul className="grid gap-3 md:hidden" aria-label={label}>
        {rows.map((r) => (
          <li key={r.area} data-compare-row className="w-full min-w-0 rounded-[14px] border border-[#e4d9c4] bg-white p-4">
            <h3 className="text-xl font-semibold">{r.area}</h3>
            <div className="mt-3 flex gap-2.5">
              <X className="mt-1 size-4 shrink-0 text-[#b23122]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#6b5f52] uppercase">Today</p>
                <p className="mt-0.5 text-[0.95rem] break-words">{r.now}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2.5 border-t border-[#efe7d8] pt-3">
              <Check className="mt-1 size-4 shrink-0 text-[#4e6b4a]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#4e6b4a] uppercase">Demo</p>
                <p className="mt-0.5 text-[0.95rem] break-words">{r.demo}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-[14px] border border-[#e4d9c4] bg-white md:block">
        <table className="w-full table-fixed border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">{label}</caption>
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[40%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead className="bg-[#221c18] text-[#f4ecdd]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Area</th>
              <th scope="col" className="px-4 py-3 font-semibold">utah1st.com today</th>
              <th scope="col" className="px-4 py-3 font-semibold">Demo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.area} className="border-t border-[#efe7d8] align-top">
                <th scope="row" className="px-4 py-4 font-semibold break-words text-[#221c18]">{r.area}</th>
                <td className="px-4 py-4">
                  <span className="flex gap-2">
                    <X className="mt-1 size-4 shrink-0 text-[#b23122]" aria-hidden="true" />
                    <span className="min-w-0 break-words"><span className="sr-only">Today: </span>{r.now}</span>
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="flex gap-2">
                    <Check className="mt-1 size-4 shrink-0 text-[#4e6b4a]" aria-hidden="true" />
                    <span className="min-w-0 break-words"><span className="sr-only">Demo: </span>{r.demo}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function PitchPage() {
  return (
    <>
      <div className="bg-[#221c18] text-[#f4ecdd]">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-3 text-sm`}>
          <p>
            <strong className="font-semibold">HAI Consulting</strong>
            <span className="text-[#c9bba0]"> &middot; Prepared for Utah First Property Management</span>
          </p>
          <Link href="/" className="font-semibold text-[#d97b57] hover:underline">
            Open the demo site
          </Link>
        </div>
      </div>

      <main id="main">
        <header className="border-b border-[#e4d9c4]">
          <div className={`${wrap} py-[clamp(3rem,7vw,5.5rem)]`}>
            <p className="hai-kicker">For Bryan Wilson, Principal Broker</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.4rem)] font-bold">
              Your reviews are great. Your website is <em>hiding</em> them.
            </h1>

            <div data-before-after className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10" aria-label="Current site and demo, side by side">
              <Shot
                tone="before"
                label="utah1st.com today"
                desktop={beforeDesktop}
                mobile={beforeMobile}
                alt={{
                  desktop: "Current utah1st.com homepage on desktop: an aerial photo of downtown St. George with four outlined rental-search buttons and no owner call to action",
                  mobile: "Current utah1st.com homepage on a phone: a large headline over a photo and five outlined buttons",
                }}
              />
              <Shot
                tone="after"
                label="This demo"
                desktop={afterDesktop}
                mobile={afterMobile}
                alt={{
                  desktop: "Demo homepage on desktop: an owner-first headline, a Free Rent Analysis button, review ratings and a photo of a managed home",
                  mobile: "Demo homepage on a phone: the owner-first headline, rent analysis and call buttons, and the properties-managed count",
                }}
              />
            </div>
            <p className="mt-4 text-xs text-[#6b5f52]">Screenshots of www.utah1st.com and this demo, captured Oct 10, 2026.</p>

            <p className="mt-8 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.28rem)] leading-relaxed">
              Utah First manages more than 1,100 Southern Utah homes and has strong Google ratings in St. George and Cedar City.
              Today&rsquo;s site buries the owner signup, never mentions the Cedar City office, and gives Google and AI assistants
              little to go on. This demo shows the fix, on a site you own.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a8472b] px-6 text-[0.96rem] font-semibold text-white transition-colors hover:bg-[#8f3b23]"
              >
                Walk through the demo <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <BookCta variant="ghost" />
            </div>
          </div>
        </header>

        <section data-outcomes className="border-b border-[#e4d9c4] bg-[#f4ecdd]" aria-labelledby="outcomes-title">
          <div className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
            <p className="hai-kicker">What owners and tenants get</p>
            <h2 id="outcomes-title" className={h2}>
              Outcomes, not <em>jargon</em>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(({ icon: Icon, title, body, href }) => (
                <li key={title} data-outcome className="flex flex-col rounded-[14px] border border-[#e4d9c4] bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-[#f6e3d4] text-[#a8472b]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1.45rem] font-semibold">{title}</h3>
                  <p className="mt-2 text-[0.95rem]">{body}</p>
                  <Link href={href} className="mt-auto inline-flex min-h-11 items-center gap-1 pt-2 text-sm font-semibold text-[#a8472b] hover:underline">
                    See it in the demo <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#6b5f52]">
              No lead or ranking numbers are promised. <Placeholder>Baseline calls and rent-analysis requests: measure before launch</Placeholder>
            </p>
          </div>
        </section>

        <section className="border-b border-[#e4d9c4]" aria-labelledby="compare-title">
          <div className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
            <p className="hai-kicker">Current site vs. demo</p>
            <h2 id="compare-title" className={h2}>
              What changes for <em>owners</em>
            </h2>
            <p className="mt-3 mb-8 max-w-[60ch]">
              From an audit of utah1st.com on Oct 9, 2026. The current site runs on the Duda builder with AppFolio for listings
              and portals; AppFolio stays.
            </p>
            <CompareRows rows={ownerRows} label="What changes for owners and tenants" />

            <details data-technical className="group mt-8 rounded-[14px] border border-[#e4d9c4] bg-[#fbf7f0] [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-[#221c18]">
                <span>
                  Technical details
                  <span className="ml-2 font-normal text-[#6b5f52]">titles, meta, H1s, schema, llms.txt, speed</span>
                </span>
                <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="border-t border-[#e4d9c4] px-2 py-4 sm:p-5">
                <CompareRows rows={technicalRows} label="Technical comparison of the current site and the demo" />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                    <h3 className="text-[1.4rem] font-semibold">Speed today</h3>
                    <p className="mt-2 text-[0.95rem]">
                      Not scored yet. Google PageSpeed hit a quota error and local Lighthouse runs crashed during research.
                      Measured by curl: about 0.35 s to first byte, 41.8 KB compressed HTML, 28 script tags.
                    </p>
                  </div>
                  <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                    <h3 className="text-[1.4rem] font-semibold">Speed of the demo</h3>
                    {demoLighthouse ? (
                      <>
                        <ul className="mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                          {demoLighthouse.scores.map((s) => (
                            <li key={s.label} className="rounded-[9px] bg-[#f4ecdd] px-2 py-3">
                              <span className="block font-[family-name:var(--font-hai-display)] text-3xl font-bold text-[#221c18]">{s.value}</span>
                              <span className="text-xs">{s.label}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-xs text-[#6b5f52]">{demoLighthouse.note}</p>
                      </>
                    ) : (
                      <p className="mt-2 text-[0.95rem]">Lighthouse targets: 95+ in every category.</p>
                    )}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section className="border-b border-[#e4d9c4] bg-[#f4ecdd]" aria-labelledby="evidence-title">
          <div className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
            <p className="hai-kicker">Small details, big signal</p>
            <h2 id="evidence-title" className={h2}>
              What an owner <em>notices</em>
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {evidence.map((e) => (
                <li key={e.title} className="rounded-[14px] border border-[#e4d9c4] bg-white p-6">
                  <h3 className="text-[1.5rem] font-semibold">{e.title}</h3>
                  <p className="mt-2">{e.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-[#e4d9c4] bg-[#2e231c] text-[#f4ecdd]" aria-labelledby="gap-title">
          <div className={`${wrap} grid gap-10 py-[clamp(3.5rem,8vw,6rem)] lg:grid-cols-[1fr_1.1fr]`}>
            <div>
              <p className="hai-kicker !text-[#d97b57]">Competitor gap</p>
              <h2 id="gap-title" className={`${h2} !text-white`}>
                Every competitor says <em className="!text-[#d97b57]">24/7.</em> Utah First does not.
              </h2>
              <p className="mt-4 text-[#e9dcc6]">
                Every Southern Utah competitor in the research advertises 24/7 service. Utah First already has an after-hours
                emergency line (press 1), but it sits in a paragraph on the maintenance page. The demo puts it up front in the
                Tenant &amp; Owner Hub, the homepage tiles and the FAQ.
              </p>
              <p className="mt-4 text-[#e9dcc6]">
                Utah First has the bigger portfolio (1,100+ properties) and strong review volume. It just tells that story
                worse online.
              </p>
            </div>
            <ul className="grid gap-3 self-start">
              {competitors.map((c) => (
                <li key={c.name} className="rounded-[14px] border border-[#3a322b] bg-[#221c18] p-4">
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="mt-1 text-sm text-[#c9bba0]">{c.claim}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-[#e4d9c4]" aria-labelledby="rep-title">
          <div className={`${wrap} py-[clamp(3.5rem,6vw,5rem)]`}>
            <p className="hai-kicker">Reputation</p>
            <h2 id="rep-title" className={h2}>
              Strong on Google, <em>mixed</em> elsewhere
            </h2>
            <p className="mt-3 max-w-[64ch]">
              Google ratings are strong (counts to verify). Yelp shows 2.9 from 19 reviews, with themes of unfixed issues, and BBB
              shows two complaints, one unanswered. The demo leads with sourced Google quotes; a review-request step after each
              finished repair or move-in is an easy add-on.
            </p>
          </div>
        </section>

        <section id="offer" className="border-b border-[#e4d9c4] bg-[#f4ecdd]" aria-labelledby="offer-title">
          <div className={`${wrap} py-[clamp(3.5rem,8vw,6rem)]`}>
            <p className="hai-kicker">The offer</p>
            <h2 id="offer-title" className={h2}>
              A site you <em>own</em>, not a builder you rent
            </h2>
            <ul className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map((p) => (
                <li
                  key={p.kicker}
                  data-plan
                  className={`flex flex-col rounded-[14px] border bg-white p-6 ${
                    p.featured ? "border-[#a8472b] shadow-[0_1px_2px_rgba(34,28,24,.05),0_8px_28px_rgba(34,28,24,.07)]" : "border-[#e4d9c4]"
                  }`}
                >
                  <p className="hai-kicker">{p.kicker}</p>
                  <p className="mt-3 font-[family-name:var(--font-hai-display)] text-4xl font-bold text-[#221c18]">{p.price}</p>
                  <p className="mt-1 text-sm font-semibold">{p.sub}</p>
                  <ul className="mt-4 grid gap-2 text-[0.95rem]">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <Check className="mt-1 size-4 shrink-0 text-[#4e6b4a]" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {p.note && (
                    <p className="mt-auto pt-4">
                      <Placeholder>{p.note}</Placeholder>
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div data-addon className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">AI visibility service</h3>
                <p className="mt-1 font-semibold text-[#221c18]">
                  from $___ <Placeholder>Price: HAI to set</Placeholder>
                </p>
                <p className="mt-2 text-[0.95rem]">Help Google and AI assistants describe Utah First accurately, with ongoing checks of how you show up.</p>
              </div>
              <div data-addon className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">Portal integration or an AI host</h3>
                <p className="mt-1 font-semibold text-[#221c18]">
                  from $___ <Placeholder>Price: HAI to set</Placeholder>
                </p>
                <p className="mt-2 text-[0.95rem]">
                  AppFolio deep links are included in the build. Deeper portal integration, or an after-hours assistant to close
                  the 24/7 gap, is a custom add-on.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="next-title">
          <div className={`${wrap} grid gap-10 py-[clamp(3.5rem,8vw,6rem)] lg:grid-cols-2`}>
            <div>
              <p className="hai-kicker">Next step</p>
              <h2 id="next-title" className={h2}>
                A 15-minute <em>walkthrough</em>
              </h2>
              <p className="mt-4">
                We click through the demo together and confirm everything marked as a placeholder. Nothing here is invented:
                reviews are quoted as written, and every number comes from the public record.
              </p>
              <div className="mt-8">
                <BookCta />
              </div>
              <p className="mt-4 text-sm">
                {HAI_EMAIL || HAI_PHONE ? (
                  [HAI_EMAIL, HAI_PHONE].filter(Boolean).join(" \u00b7 ")
                ) : (
                  <Placeholder>HAI Consulting contact email and phone: add before sending</Placeholder>
                )}
              </p>
            </div>
            <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-6">
              <h3 className="text-[1.5rem] font-semibold">To confirm with Utah First</h3>
              <ul className="mt-4 grid gap-2 text-[0.95rem]">
                {placeholders.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c75b39]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4d9c4] bg-[#f4ecdd] pb-24">
        <div className={`${wrap} py-8 text-sm text-[#6b5f52]`}>
          Demo concept by HAI Consulting. Not affiliated with or approved by Utah First Property Management or Wilprop, LLC.
          Facts come from public sources gathered Oct 9, 2026. Utah First Realty and Property Management in Pleasant Grove is a
          separate company and is not part of this demo.
        </div>
      </footer>
    </>
  );
}
