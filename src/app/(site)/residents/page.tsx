import { AlertTriangle, ArrowUpRight, BadgeCheck, ClipboardList, FileText, KeyRound, Languages, LineChart, Phone, Wallet, Wrench } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, FaqList, SectionHeading } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { Placeholder } from "@/components/placeholder";
import { tenantFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { company, mainPhone, portals } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tenant & Owner Hub: Rent, Repairs, Owner Login",
  description:
    "One place for Utah First tenants and owners: pay rent, submit a maintenance request, find a rental and apply, or log in to the AppFolio owner portal. Emergency? Call (435) 619-5336.",
  path: "/residents/",
});

type Action = {
  icon: typeof Wallet;
  title: string;
  body: React.ReactNode;
  href: string;
  cta: string;
};

function ActionCard({ icon: Icon, title, body, href, cta }: Action) {
  const external = href.startsWith("http");
  const cls = "mt-4 inline-flex items-center gap-1 font-semibold text-rock-deep";
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-cream p-6">
      <span className="grid size-11 place-items-center rounded-xl bg-rock text-white">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <div className="mt-2 text-muted-ink">{body}</div>
      <div className="mt-auto">
        {external ? (
          <a href={href} rel="noopener" className={cls}>
            {cta} <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <Link href={href} className={cls}>
            {cta}
          </Link>
        )}
      </div>
    </li>
  );
}

export default function ResidentsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Tenant & Owner Hub", path: "/residents/" }]), faqSchema(tenantFaqs))} />

      <section className="container-page pt-8 pb-10">
        <Breadcrumbs items={[{ name: "Tenant & Owner Hub" }]} />
        <p className="kicker mt-8">Residents and owners</p>
        <h1 className="mt-3 max-w-3xl text-[2.5rem] leading-[1.05] font-bold sm:text-6xl">Tenant &amp; Owner Hub</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-ink sm:text-xl">
          Every link goes straight into Utah First&rsquo;s existing AppFolio portals and applications. Same logins, fewer clicks.
        </p>
        <nav aria-label="Jump to" className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
          {[
            ["#tenants", "Tenants"],
            ["#maintenance", "Maintenance"],
            ["#rentals", "Find a rental"],
            ["#owners", "Owners"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line bg-cream px-4 py-2 text-night no-underline hover:bg-sand-2">
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section id="maintenance" aria-labelledby="maint-title" className="container-page pb-12">
        <div className="grid gap-4 rounded-3xl bg-night p-6 text-sand sm:p-8 lg:grid-cols-2">
          <div>
            <p className="kicker !text-sun">Maintenance</p>
            <h2 id="maint-title" className="mt-2 text-3xl font-bold !text-white">
              Is it an emergency?
            </h2>
            <p className="mt-2 text-sand/85">Pick the right path so the right person gets it first.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${mainPhone.e164}`}
              className="flex flex-col rounded-2xl bg-[#a32014] p-5 text-white no-underline hover:bg-[#8a1c10]"
            >
              <AlertTriangle className="size-6" aria-hidden="true" />
              <span className="mt-3 text-lg font-bold">Yes, emergency</span>
              <span className="mt-1 text-sm text-white/90">
                Flooding, no heat or AC in extreme weather, gas smell, fire or security risk. Call {mainPhone.display}, press 1
                after hours.
              </span>
              <span className="mt-3 inline-flex items-center gap-1 font-semibold">
                <Phone className="size-4" aria-hidden="true" /> Call now
              </span>
            </a>
            <a
              href={portals.maintenance}
              rel="noopener"
              className="flex flex-col rounded-2xl bg-cream p-5 text-night no-underline hover:bg-white"
            >
              <Wrench className="size-6 text-rock" aria-hidden="true" />
              <span className="mt-3 text-lg font-bold">No, it can wait</span>
              <span className="mt-1 text-sm text-muted-ink">Submit a non-emergency maintenance request online with photos and details.</span>
              <span className="mt-3 inline-flex items-center gap-1 font-semibold text-rock-deep">
                Open request form <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </a>
          </div>
          <p className="text-xs text-sand/70 lg:col-span-2">
            <Placeholder>Emergency examples: confirm Utah First&rsquo;s exact emergency policy</Placeholder>
          </p>
        </div>
      </section>

      <section id="tenants" aria-labelledby="tenants-title" className="band-stripes py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="tenants-title" kicker="For tenants" title="Rent, repairs and renting with us" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              icon={Wallet}
              title="Pay rent"
              body="Rent is due on the 1st and late at 5:00 pm on the 5th. Pay online and set up autopay in the tenant portal."
              href={portals.tenant}
              cta="Tenant portal login"
            />
            <ActionCard
              icon={ClipboardList}
              title="Maintenance request"
              body="Non-emergency repairs, tracked in AppFolio. For emergencies, call first."
              href={portals.maintenance}
              cta="Submit a request"
            />
            <ActionCard
              icon={Languages}
              title="Hablamos español"
              body={<span lang="es">Información para inquilinos en español: pagar la renta, mantenimiento y solicitudes.</span>}
              href="/es/"
              cta="Ver en español"
            />
          </ul>
        </div>
      </section>

      <section id="rentals" aria-labelledby="rentals-title" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            id="rentals-title"
            kicker="Find a rental"
            title="Available homes and applications"
            intro="Browse current vacancies and apply online. Applications are submitted through AppFolio."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            <ActionCard icon={KeyRound} title="St. George rentals" body="Homes, townhomes and condos across Washington County." href={portals.listingsStGeorge} cta="View St. George vacancies and apply" />
            <ActionCard icon={KeyRound} title="Cedar City rentals" body="Rentals in Cedar City and Iron County." href={portals.listingsCedar} cta="View Cedar City vacancies and apply" />
          </ul>
          <p className="mt-4">
            <Placeholder>Live build: listing cards render here as crawlable HTML from the AppFolio feed</Placeholder>
          </p>
        </div>
      </section>

      <section id="owners" aria-labelledby="owners-title" className="band-stripes py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="owners-title" kicker="For owners" title="Your property, your numbers" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              icon={BadgeCheck}
              title="Owner portal"
              body="Statements, documents, payouts and work orders, any time."
              href={portals.owner}
              cta="Owner portal login"
            />
            <ActionCard
              icon={FileText}
              title="Statements and 1099s"
              body="A monthly statement with your ACH deposit or mailed check, and a detailed 1099 at year end."
              href="/services/#owner-statements"
              cta="How owner statements work"
            />
            <ActionCard
              icon={LineChart}
              title="Thinking of renting a home?"
              body="Get a free rent analysis from a local manager. No obligation."
              href="/free-rent-analysis/"
              cta="Start a free rent analysis"
            />
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="hub-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="hub-faq"
            kicker="Questions"
            title="Tenant FAQ"
            intro={
              <>
                Still stuck? Call {mainPhone.display} or email{" "}
                <a href={`mailto:${company.email}`} className="text-rock-deep underline">
                  {company.email}
                </a>
                .
              </>
            }
          />
          <FaqList faqs={tenantFaqs} />
        </div>
      </section>
    </>
  );
}
