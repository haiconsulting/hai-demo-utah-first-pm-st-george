import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { pageMeta } from "@/lib/metadata";
import { demoLighthouse } from "@/lib/lighthouse";

export const metadata = pageMeta({
  title: "Pitch for Utah First Property Management | HAI Consulting",
  absoluteTitle: true,
  description:
    "HAI Consulting's demo concept for Utah First Property Management: what the current Duda site is missing, what the demo fixes, and the offer.",
  path: "/pitch/",
});

// HAI Consulting contact for real estate pitches. Set at build time; a placeholder shows until then.
const HAI_EMAIL = process.env.NEXT_PUBLIC_HAI_CONTACT_EMAIL || "";
const HAI_PHONE = process.env.NEXT_PUBLIC_HAI_CONTACT_PHONE || "";

const comparison: { area: string; now: string; demo: string }[] = [
  { area: "Homepage title", now: "Just \u201cHome\u201d", demo: "\u201cSt. George & Cedar City Property Management | Utah First\u201d" },
  { area: "Meta description", now: "None on the homepage", demo: "Written for owners on every page" },
  { area: "H1 heading", now: "No H1 on the homepage", demo: "One clear H1 per page" },
  { area: "Business schema", now: "No LocalBusiness or RealEstateAgent schema on core pages (one JSON-LD block, on a blog post)", demo: "RealEstateAgent and LocalBusiness for both offices, plus FAQ and breadcrumb schema" },
  { area: "llms.txt", now: "Auto-generated, lists only listing UUID URLs", demo: "Describes services, areas, offices, hours and portals" },
  { area: "Cedar City", now: "Address and phone appear nowhere on the site; city page is a listings widget", demo: "A real Cedar City page with services, areas and office details" },
  { area: "Owner signup", now: "\u201cRent Analysis\u201d is a menu item and its form copy is broken", demo: "Free Rent Analysis as the hero CTA, with a 4-step form" },
  { area: "Listings", now: "\u201cShowing 0 of 0\u201d in the HTML; listings only render through JavaScript", demo: "Direct links now, crawlable listing cards from the AppFolio feed in the live build" },
  { area: "Tenant flows", now: "Long maintenance page with \u201cCLICK HERE\u201d and an after-hours extension buried in text", demo: "One hub: emergency or not, pay rent, apply, owner login" },
  { area: "Image alt text", now: "4 of 5 homepage images have none", demo: "Every image described" },
  { area: "Page weight", now: "28 script tags, Font Awesome 5.8, a retired Universal Analytics tag, two YouTube embeds", demo: "Static HTML, self-hosted fonts, no third-party scripts" },
  { area: "Freshness", now: "Footer says \u00a9 2023; sitemap padded with holiday posts, newest from 2020", demo: "Year updates itself; sitemap lists real pages only" },
  { area: "Copy", now: "Typos such as \u201cappr-oach\u201d, \u201cinspe-ctions\u201d, \u201ccritcal\u201d, \u201craitio\u201d, \u201cMaintenence\u201d", demo: "Proofread, plain, owner-first" },
  { area: "Spanish", now: "A single \u201cHablamos Espa\u00f1ol\u201d page", demo: "A Spanish hub with hreflang links" },
  { area: "Platform", now: "Duda site builder (rented)", demo: "Next.js static site. You own the code" },
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

const placeholders = [
  "Google review counts (462 St. George, 85 Cedar City)",
  "Management, leasing and setup fees",
  "Cedar City phone, hours and current address",
  "Cedar City team names, roles and photos",
  "Rent analysis response time",
  "Exact emergency maintenance policy",
  "Spanish translation review",
];

export default function PitchPage() {
  return (
    <>
      <div className="bg-[#221c18] text-[#f4ecdd]">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-3 px-[clamp(1.25rem,4vw,3rem)] py-3 text-sm">
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
          <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)]">
            <p className="hai-kicker">For Bryan Wilson, Principal Broker</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.4rem)] font-bold">
              Your reviews are great. Your website is <em>hiding</em> them.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.28rem)] leading-relaxed">
              Utah First manages more than 1,100 Southern Utah homes and has strong Google ratings in St. George and Cedar City.
              The current site does not tell Google or AI assistants who you are, buries the owner signup, and never mentions the
              Cedar City office. This demo shows the fix, on a site you own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#a8472b] px-6 py-3.5 text-[0.96rem] font-semibold text-white transition-colors hover:bg-[#8f3b23] hover:shadow-[0_10px_22px_rgba(199,91,57,.28)]"
              >
                Walk through the demo <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="#offer"
                className="inline-flex items-center rounded-full border border-[#e4d9c4] px-6 py-3.5 text-[0.96rem] font-semibold text-[#221c18] hover:bg-[#f4ecdd]"
              >
                See the offer
              </a>
            </div>
          </div>
        </header>

        <section className="border-b border-[#e4d9c4] bg-[#f4ecdd]" aria-labelledby="compare-title">
          <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)]">
            <p className="hai-kicker">Current site vs. demo</p>
            <h2 id="compare-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold">
              What changes, <em>line</em> by line
            </h2>
            <p className="mt-3 max-w-[60ch]">
              Audit of utah1st.com on Oct 9, 2026, from page source and public data. The current site runs on the Duda builder
              with AppFolio for listings and portals.
            </p>
            <div className="mt-8 overflow-hidden rounded-[14px] border border-[#e4d9c4] bg-white">
              <table className="w-full border-collapse text-left text-[0.95rem]">
                <caption className="sr-only">Comparison of the current Utah First website and the demo</caption>
                <thead className="bg-[#221c18] text-[#f4ecdd]">
                  <tr>
                    <th scope="col" className="w-[22%] px-4 py-3 font-semibold">Area</th>
                    <th scope="col" className="px-4 py-3 font-semibold">utah1st.com today</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Demo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r) => (
                    <tr key={r.area} className="border-t border-[#efe7d8] align-top max-md:grid max-md:grid-cols-1">
                      <th scope="row" className="px-4 pt-4 pb-1 font-semibold text-[#221c18] md:py-4">{r.area}</th>
                      <td className="px-4 py-1 md:py-4">
                        <span className="flex gap-2">
                          <X className="mt-1 size-4 shrink-0 text-[#b23122]" aria-hidden="true" />
                          <span><span className="sr-only">Today: </span>{r.now}</span>
                        </span>
                      </td>
                      <td className="px-4 pt-1 pb-4 md:py-4">
                        <span className="flex gap-2">
                          <Check className="mt-1 size-4 shrink-0 text-[#4e6b4a]" aria-hidden="true" />
                          <span><span className="sr-only">Demo: </span>{r.demo}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">Speed today</h3>
                <p className="mt-2 text-[0.95rem]">
                  Not scored yet. Google PageSpeed hit a quota error and local Lighthouse runs crashed during research. Measured
                  by curl: about 0.35 s to first byte, 41.8 KB compressed HTML, 28 script tags. Run PageSpeed before the meeting.
                </p>
              </div>
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">Speed of the demo</h3>
                {demoLighthouse ? (
                  <>
                    <ul className="mt-3 grid grid-cols-4 gap-2 text-center">
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
        </section>

        <section className="border-b border-[#e4d9c4]" aria-labelledby="evidence-title">
          <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)]">
            <p className="hai-kicker">Small details, big signal</p>
            <h2 id="evidence-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold">
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
          <div className="mx-auto grid max-w-[1140px] gap-10 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)] lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="hai-kicker !text-[#d97b57]">Competitor gap</p>
              <h2 id="gap-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold !text-white">
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
          <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,6vw,5rem)]">
            <p className="hai-kicker">Reputation</p>
            <h2 id="rep-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold">
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
          <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)]">
            <p className="hai-kicker">The offer</p>
            <h2 id="offer-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold">
              A site you <em>own</em>, not a builder you rent
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-6 shadow-[0_1px_2px_rgba(34,28,24,.05),0_8px_28px_rgba(34,28,24,.07)]">
                <p className="hai-kicker">Custom build</p>
                <p className="mt-3 font-[family-name:var(--font-hai-display)] text-4xl font-bold text-[#221c18]">From $2,000</p>
                <p className="mt-1 text-sm font-semibold">You own the code.</p>
                <ul className="mt-4 grid gap-2 text-[0.95rem]">
                  {[
                    "Owner-first homepage with Free Rent Analysis",
                    "St. George and Cedar City pages",
                    "Tenant & Owner Hub linked to AppFolio",
                    "Schema, llms.txt, sitemap, clean titles",
                    "Spanish hub page",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0 text-[#4e6b4a]" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-6">
                <p className="hai-kicker">Care</p>
                <p className="mt-3 font-[family-name:var(--font-hai-display)] text-4xl font-bold text-[#221c18]">$450/yr</p>
                <p className="mt-1 text-sm font-semibold">or $45/mo</p>
                <p className="mt-4 text-[0.95rem]">Hosting care, security updates and small fixes, so the site stays fast and accurate.</p>
              </div>
              <div className="rounded-[14px] border border-[#b5853f] bg-white p-6">
                <p className="hai-kicker !text-[#8a6420]">Care+</p>
                <p className="mt-3 font-[family-name:var(--font-hai-display)] text-4xl font-bold text-[#221c18]">$900/yr</p>
                <p className="mt-1 text-sm font-semibold">Ongoing edits</p>
                <p className="mt-4 text-[0.95rem]">Everything in Care, plus ongoing content edits for listings, pages and seasonal updates.</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">AI visibility service</h3>
                <p className="mt-2 text-[0.95rem]">Available. We help Google and AI assistants describe Utah First accurately. Priced on a call.</p>
              </div>
              <div className="rounded-[14px] border border-[#e4d9c4] bg-white p-5">
                <h3 className="text-[1.4rem] font-semibold">Portal integration or an AI host</h3>
                <p className="mt-2 text-[0.95rem]">
                  AppFolio deep links are included. Deeper portal integration, or an after-hours assistant to close the 24/7 gap,
                  is a custom add-on quoted after a call.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="next-title">
          <div className="mx-auto grid max-w-[1140px] gap-10 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3.5rem,8vw,6.5rem)] lg:grid-cols-2">
            <div>
              <p className="hai-kicker">Next step</p>
              <h2 id="next-title" className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold">
                A short call to <em>confirm</em> the facts
              </h2>
              <p className="mt-4">
                Everything marked as a placeholder in the demo needs Utah First&rsquo;s sign-off before launch. Nothing here is
                invented: reviews are quoted as written, and every number comes from the public record.
              </p>
              {HAI_EMAIL ? (
                <a
                  href={`mailto:${HAI_EMAIL}?subject=${encodeURIComponent("Utah First website build")}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#a8472b] px-6 py-3.5 text-[0.96rem] font-semibold text-white transition-colors hover:bg-[#8f3b23]"
                >
                  Book a 30-minute call <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
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

      <footer className="border-t border-[#e4d9c4] bg-[#f4ecdd]">
        <div className="mx-auto max-w-[1140px] px-[clamp(1.25rem,4vw,3rem)] py-8 text-sm text-[#6b5f52]">
          Demo concept by HAI Consulting. Not affiliated with or approved by Utah First Property Management or Wilprop, LLC.
          Facts come from public sources gathered Oct 9, 2026. Utah First Realty and Property Management in Pleasant Grove is a
          separate company and is not part of this demo.
        </div>
      </footer>
    </>
  );
}
