import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, ClipboardCheck, FileText, Hammer, Home as HomeIcon, KeyRound, Phone, Video, Wallet, Wrench } from "lucide-react";
import heroImg from "@/assets/photos/modern-farmhouse.webp";
import heroImgSmall from "@/assets/photos/modern-farmhouse-800.webp";
import { ResponsiveImg } from "@/components/responsive-img";
import townhomes from "@/assets/photos/townhomes-palm.webp";
import communitySign from "@/assets/photos/community-sign-palms-lava.webp";
import { AreaList, FaqList, OfficeCard, Ridge, SectionHeading, Testimonials } from "@/components/blocks";
import { CtaLink } from "@/components/cta-link";
import { JsonLd } from "@/components/json-ld";
import { Placeholder } from "@/components/placeholder";
import { RentAnalysisForm } from "@/components/rent-analysis-form";
import { ownerFaqs, tenantFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { faqSchema, graph, officeSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { company, mainPhone, offices, portals, serviceAreas } from "@/lib/site";

export const metadata = pageMeta({
  title: "St. George & Cedar City Property Management | Utah First",
  absoluteTitle: true,
  description:
    "Utah First manages 1,100+ rental homes in St. George, Cedar City and Southern Utah. 8-point tenant screening, video before every move-in, twice-yearly inspections and no maintenance markup. Get a free rent analysis.",
  path: "/",
  languages: { "en-US": "/", "es-US": "/es/" },
});

const serviceCards = [
  { icon: ClipboardCheck, title: "8-point screening", body: "Credit, criminal background, rental history and rent-to-income, applied to every applicant under fair housing law.", href: "/services/#leasing" },
  { icon: Wallet, title: "Rent collection", body: "Rent is due on the 1st and late at 5 pm on the 5th. Tenants pay online in the AppFolio portal.", href: "/services/#rent-collection" },
  { icon: Wrench, title: "Maintenance, no markup", body: "Licensed, screened and insured contractors with multiple estimates. We do NOT mark up any maintenance.", href: "/services/#full-management" },
  { icon: Video, title: "Video documentation", body: "Every home is filmed before move-in, so there is a dated record of condition if a question ever comes up.", href: "/services/#video-documentation" },
  { icon: CalendarCheck, title: "Twice-yearly inspections", body: "Tenants get a checklist ahead of time. You get a written report after every visit.", href: "/services/#video-documentation" },
  { icon: FileText, title: "Statements and 1099s", body: "Monthly statements in the owner portal, ACH deposit or mailed check, and a detailed 1099 each year.", href: "/services/#owner-statements" },
  { icon: Hammer, title: "Eviction handling", body: "Rare thanks to careful screening. If one is ever needed, Utah First's legal team handles it.", href: "/services/#leasing" },
  { icon: HomeIcon, title: "HOA management", body: "Utah First also manages homeowners associations. Ask for an HOA analysis.", href: "/services/#hoa-management" },
];

const hubTiles = [
  { icon: Wallet, title: "Pay rent", body: "Due the 1st, late after 5 pm on the 5th", href: portals.tenant },
  { icon: Wrench, title: "Maintenance request", body: `Emergency? Call ${mainPhone.display}, press 1 after hours`, href: "/residents/#maintenance" },
  { icon: KeyRound, title: "Find a rental and apply", body: "St. George and Cedar City vacancies", href: "/residents/#rentals" },
  { icon: BadgeCheck, title: "Owner portal", body: "Statements, documents and payouts", href: portals.owner },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteSchema(),
          organizationSchema(),
          officeSchema(offices["st-george"]),
          officeSchema(offices["cedar-city"]),
          faqSchema([...ownerFaqs, ...tenantFaqs].filter((f) => !f.placeholder)),
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="pointer-events-none absolute -top-24 -right-24 size-[28rem] rounded-full bg-sun/25 blur-3xl" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
          <div>
            <p className="kicker">Property management &middot; St. George &amp; Cedar City</p>
            <h1 id="hero-title" className="mt-4 text-[2.6rem] leading-[1.04] font-bold sm:text-6xl lg:text-[4.1rem]">
              Your Southern Utah rental, managed like it&rsquo;s <em className="text-rock">our own.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-ink sm:text-xl">
              Utah First manages more than 1,100 homes across Washington and Iron County. We screen every applicant, film every
              home before move-in, inspect twice a year and never mark up a repair.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/free-rent-analysis/" size="lg">
                Get my free rent analysis <ArrowRight aria-hidden="true" />
              </CtaLink>
              <CtaLink href={`tel:${mainPhone.e164}`} variant="outline" size="lg">
                <Phone aria-hidden="true" /> Call {mainPhone.display}
              </CtaLink>
            </div>
            <ul className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4" aria-label="Utah First at a glance">
              <li>
                <span className="block font-display text-3xl font-bold text-rock-deep">{company.propertiesManaged}</span>
                <span className="text-sm text-muted-ink">properties managed</span>
              </li>
              <li>
                <span className="block font-display text-3xl font-bold text-rock-deep">
                  4.8<span aria-hidden="true" className="text-sun">&#9733;</span>
                </span>
                <span className="text-sm text-muted-ink">Google, St. George</span>
                <Placeholder className="mt-1">462 reviews: verify</Placeholder>
              </li>
              <li>
                <span className="block font-display text-3xl font-bold text-rock-deep">
                  5.0<span aria-hidden="true" className="text-sun">&#9733;</span>
                </span>
                <span className="text-sm text-muted-ink">Google, Cedar City</span>
                <Placeholder className="mt-1">85 reviews: verify</Placeholder>
              </li>
              <li>
                <span className="block font-display text-3xl font-bold text-rock-deep">$0</span>
                <span className="text-sm text-muted-ink">maintenance markup</span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] rounded-bl-[5rem] shadow-[0_30px_60px_-30px_rgba(122,46,29,.55)]">
              <ResponsiveImg
                small={heroImgSmall}
                large={heroImg}
                alt="Two-story white farmhouse-style home with a dark roof and a green lawn under a blue Southern Utah sky"
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-2xl border border-line bg-cream p-4 shadow-xl sm:left-[-1.5rem]">
              <p className="flex items-center gap-2 text-sm font-semibold text-night">
                <Video className="size-4 text-rock" aria-hidden="true" /> Video before every move-in
              </p>
              <p className="mt-1 text-sm text-muted-ink">Plus twice-yearly inspections with a report to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-24" aria-labelledby="services-title">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="services-title"
              kicker="What we handle"
              title="Full-service management, no surprises"
              intro="One local team for marketing, screening, rent, repairs and reporting, all tracked in AppFolio so you can see it."
            />
            <Link href="/services/" className="inline-flex items-center gap-1 font-semibold text-rock-deep">
              All services <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map(({ icon: Icon, title, body, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-cream p-5 no-underline transition-shadow hover:shadow-lg"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-sand-2 text-rock">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold group-hover:text-rock-deep">{title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-ink">{body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="band-stripes py-16 sm:py-24" aria-labelledby="reviews-title">
        <div className="container-page">
          <SectionHeading
            id="reviews-title"
            kicker="Owners and tenants"
            title="In their words"
            intro={
              <>
                Real Google reviews, quoted as written.{" "}
                <Placeholder>Live review counts and a review widget: verify before launch</Placeholder>
              </>
            }
          />
          <Testimonials className="mt-10" />
        </div>
      </section>

      {/* Owners */}
      <section id="owners" className="py-16 sm:py-24" aria-labelledby="owners-title">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="owners-title" kicker="For owners" title="See everything. Do nothing." />
            <ul className="mt-6 grid gap-4">
              {[
                ["Owner portal.", "Statements, documents and payments in AppFolio, any time."],
                ["Monthly statements.", "Emailed with your ACH deposit, or mailed with a check."],
                ["Video and inspections.", "Pre-move-in video plus a report after each twice-yearly inspection."],
                ["You decide.", "Choose to approve maintenance requests yourself. No markup, ever."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-sage text-white">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="text-night">{t}</strong> {b}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/free-rent-analysis/">Get a free rent analysis</CtaLink>
              <CtaLink href={portals.owner} variant="outline">
                Owner portal login
              </CtaLink>
            </div>
          </div>
          <div className="relative">
            <Image
              src={townhomes}
              alt="Two-story townhomes with palm trees and two-car garages"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover"
            />
            <div className="absolute right-4 -bottom-8 w-[min(20rem,85%)] rounded-2xl border border-line bg-cream p-5 shadow-xl" aria-label="Sample owner statement with placeholder numbers">
              <p className="text-xs font-semibold tracking-wide text-muted-ink uppercase">Sample monthly statement</p>
              <dl className="mt-3 grid gap-2 text-sm">
                {[
                  ["Rent collected", "$ ---"],
                  ["Management fee", "$ ---"],
                  ["Repairs (no markup)", "$ ---"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt>{k}</dt>
                    <dd className="font-semibold text-night">{v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 border-t border-line pt-2">
                  <dt className="font-semibold text-night">ACH to owner</dt>
                  <dd className="font-bold text-rock-deep">$ ---</dd>
                </div>
              </dl>
              <Placeholder className="mt-3">Illustrative only, no real figures</Placeholder>
            </div>
          </div>
        </div>
      </section>

      {/* Resident hub teaser */}
      <section className="band-stripes py-16 sm:py-24" aria-labelledby="hub-title">
        <div className="container-page">
          <SectionHeading
            id="hub-title"
            kicker="Tenants and owners"
            title="Everything you need, in one tap"
            intro={
              <>
                Pay rent, request a repair, apply or log in, all through Utah First&rsquo;s existing AppFolio portals.{" "}
                <span lang="es">Hablamos español.</span>
              </>
            }
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hubTiles.map(({ icon: Icon, title, body, href }) => {
              const external = href.startsWith("http");
              const inner = (
                <>
                  <span className="grid size-11 place-items-center rounded-xl bg-rock text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block font-display text-xl font-bold text-night">{title}</span>
                  <span className="mt-1 block text-sm text-muted-ink">{body}</span>
                </>
              );
              const cls = "flex h-full flex-col rounded-2xl border border-line bg-cream p-5 no-underline transition-shadow hover:shadow-lg";
              return (
                <li key={title}>
                  {external ? (
                    <a href={href} rel="noopener" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link href="/residents/" className="inline-flex items-center gap-1 font-semibold text-rock-deep">
              Open the Tenant &amp; Owner Hub <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* Rent analysis */}
      <section id="rent-analysis" className="relative bg-night text-sand" aria-labelledby="analysis-title">
        <Ridge className="text-sand-2" flip />
        <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="kicker !text-sun">Free, no obligation</p>
            <h2 id="analysis-title" className="mt-3 text-4xl font-bold !text-white sm:text-5xl">
              What could your home rent for?
            </h2>
            <p className="mt-5 max-w-md text-lg text-sand/85">
              Tell us about the property. A local manager compares nearby rentals and replies with a rent range and a plan for
              your home.
            </p>
            <ul className="mt-6 grid gap-2 text-sand/85">
              <li>Single-family homes, townhomes, condos and HOAs</li>
              <li>St. George, Cedar City and {serviceAreas.length - 2} more Southern Utah communities</li>
            </ul>
            <Image
              src={communitySign}
              alt="Bella Vista community entrance sign framed by palm trees and black lava rock"
              sizes="(min-width: 1024px) 420px, 0px"
              className="mt-8 hidden aspect-[4/3] w-full max-w-md rounded-2xl object-cover opacity-90 lg:block"
            />
          </div>
          <RentAnalysisForm />
        </div>
        <Ridge className="text-sand" />
      </section>

      {/* Locations */}
      <section id="locations" className="py-16 sm:py-24" aria-labelledby="locations-title">
        <div className="container-page">
          <SectionHeading
            id="locations-title"
            kicker="Two local offices"
            title="Local in Washington and Iron County"
            intro="Stop by, call, or email. Every page on this site lists the same name, address and phone, so Google and AI assistants do too."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <OfficeCard office={offices["st-george"]} />
            <OfficeCard office={offices["cedar-city"]} />
          </div>
          <h3 className="mt-12 text-2xl font-bold">Areas we serve</h3>
          <AreaList areas={serviceAreas} className="mt-4" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-24" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" kicker="FAQ" title="Common questions" intro="Straight answers for owners and tenants." />
          <FaqList faqs={[...ownerFaqs, ...tenantFaqs]} />
        </div>
      </section>
    </>
  );
}
