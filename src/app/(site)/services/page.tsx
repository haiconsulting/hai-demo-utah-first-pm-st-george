import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import stucco from "@/assets/photos/home-stucco-tile-roof.webp";
import { Breadcrumbs, FaqList, Ridge, SectionHeading } from "@/components/blocks";
import { CtaLink } from "@/components/cta-link";
import { JsonLd } from "@/components/json-ld";
import { Placeholder } from "@/components/placeholder";
import { ownerFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/schema";
import { highlights, services } from "@/lib/services";

export const metadata = pageMeta({
  title: "Property Management Services in Southern Utah",
  description:
    "Full-service property management, leasing with 8-point screening, owner statements and 1099s, online rent collection, video documentation, twice-yearly inspections and HOA management in St. George and Cedar City.",
  path: "/services/",
});

const steps = [
  { title: "Free rent analysis", body: "Tell us about the property. A local manager replies with a rent range and a plan." },
  { title: "Market and screen", body: "We list and show the home, then run every applicant through the 8-point screening." },
  { title: "Video and move-in", body: "The home is filmed before move-in so its condition is on record." },
  { title: "Rent, repairs, reports", body: "Rent is collected online, repairs go to vetted vendors at cost, and you get monthly statements." },
  { title: "Inspect twice a year", body: "Semi-annual inspections with a written report to you after each visit." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: "Services", path: "/services/" }]),
          ...services.map((s) => serviceSchema(s.title, s.summary)),
        )}
      />

      <section className="container-page grid items-center gap-10 pt-8 pb-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Breadcrumbs items={[{ name: "Services" }]} />
          <p className="kicker mt-8">What we handle</p>
          <h1 className="mt-3 text-[2.5rem] leading-[1.05] font-bold sm:text-6xl">
            Property management services in Southern Utah
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-ink sm:text-xl">
            Management, leasing, owner statements, rent collection and video documentation for single-family homes, townhomes,
            condos and HOAs in St. George, Cedar City and the communities between.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/free-rent-analysis/" size="lg">
              Get a free rent analysis <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
        <Image
          src={stucco}
          alt="Two-story stucco home with a tile roof and desert trees"
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 420px, 100vw"
          className="aspect-[4/3] w-full rounded-[2rem] object-cover"
        />
      </section>

      <section className="band-stripes py-12" aria-label="Highlights">
        <ul className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.title} className="rounded-2xl border border-line bg-cream p-5">
              <h2 className="font-display text-xl font-bold">{h.title}</h2>
              <p className="mt-1 text-[0.95rem] text-muted-ink">{h.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Services on this page" className="container-page pt-12">
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block rounded-full border border-line bg-cream px-4 py-2 text-sm font-semibold text-night no-underline hover:bg-sand-2">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page grid gap-6 py-12">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid gap-6 rounded-2xl border border-line bg-cream p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="font-display text-sm font-bold text-rock">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-title`} className="mt-1 text-3xl font-bold">
                {s.title}
              </h2>
              <p className="mt-3 text-lg text-muted-ink">{s.summary}</p>
            </div>
            <div>
              <ul className="grid gap-3">
                {s.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <Check className="mt-1 size-5 shrink-0 text-sage" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {s.verify && (
                <p className="mt-4">
                  <Placeholder>{s.verify}</Placeholder>
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="band-stripes py-16 sm:py-20" aria-labelledby="process-title">
        <div className="container-page">
          <SectionHeading id="process-title" kicker="How it works" title="From first call to steady rent" />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-cream p-5">
                <span className="grid size-9 place-items-center rounded-full bg-rock font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-ink">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="pricing-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="pricing-title" kicker="Pricing" title="Clear fees, in writing" />
            <p className="mt-4 text-muted-ink">
              Ask for current pricing with your free rent analysis. A simple fee table will live here.
            </p>
            <p className="mt-4">
              <Placeholder>Management, leasing and setup fees: Utah First to supply</Placeholder>
            </p>
          </div>
          <FaqList faqs={ownerFaqs.slice(0, 5)} />
        </div>
      </section>

      <section className="bg-night text-sand" aria-labelledby="services-cta">
        <Ridge className="text-sand" flip />
        <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <h2 id="services-cta" className="text-3xl font-bold !text-white sm:text-4xl">
            Ready to hand off the landlord work?
          </h2>
          <CtaLink href="/free-rent-analysis/" variant="light" size="lg">
            Start my free rent analysis <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
