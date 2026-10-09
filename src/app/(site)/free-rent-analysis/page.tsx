import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { Placeholder } from "@/components/placeholder";
import { RentAnalysisForm } from "@/components/rent-analysis-form";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/schema";
import { company, mainPhone, testimonials } from "@/lib/site";

export const metadata = pageMeta({
  title: "Free Rent Analysis: St. George & Cedar City Homes",
  description:
    "What could your Southern Utah home rent for? Request a free, no-obligation rent analysis from Utah First's local property managers in St. George and Cedar City.",
  path: "/free-rent-analysis/",
});

export default function RentAnalysisPage() {
  const quote = testimonials[3];
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: "Free Rent Analysis", path: "/free-rent-analysis/" }]),
          serviceSchema("Free rent analysis", "A no-obligation rent estimate and management plan from a local Utah First property manager."),
        )}
      />
      <section className="container-page grid gap-10 pt-8 pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Breadcrumbs items={[{ name: "Free Rent Analysis" }]} />
          <p className="kicker mt-8">Free, no obligation</p>
          <h1 className="mt-3 text-[2.5rem] leading-[1.05] font-bold sm:text-5xl">Free rent analysis</h1>
          <p className="mt-5 text-lg text-muted-ink">
            Four short steps. A local manager compares nearby rentals and replies with a rent range and a plan for your home.
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              `From the team that manages ${company.propertiesManaged} Southern Utah properties`,
              "8-point screening, video before every move-in, twice-yearly inspections",
              "We do NOT mark up any maintenance",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-1 size-5 shrink-0 text-sage" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <figure className="mt-8 rounded-2xl border border-line bg-cream p-5">
            <blockquote className="font-display text-lg text-night">&ldquo;{quote.quote}&rdquo;</blockquote>
            <figcaption className="mt-2 text-xs text-muted-ink">{quote.source}</figcaption>
          </figure>
          <p className="mt-6 text-sm text-muted-ink">
            Prefer to talk? Call{" "}
            <a href={`tel:${mainPhone.e164}`} className="font-semibold text-rock-deep">
              {mainPhone.display}
            </a>
            . <Placeholder>Response time: confirm</Placeholder>
          </p>
        </div>
        <RentAnalysisForm headingLevel="h2" />
      </section>
    </>
  );
}
