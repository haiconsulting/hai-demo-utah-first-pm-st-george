import { ResponsiveImg } from "@/components/responsive-img";
import type { Photo } from "@/lib/photos";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, ClipboardCheck, FileText, Phone, Video, Wallet, Wrench } from "lucide-react";
import { AreaList, Breadcrumbs, FaqList, OfficeCard, Ridge, SectionHeading } from "@/components/blocks";
import { CtaLink } from "@/components/cta-link";
import { JsonLd } from "@/components/json-ld";
import type { Faq } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph, officeSchema } from "@/lib/schema";
import { mainPhone, testimonials, type Office } from "@/lib/site";

type Props = {
  office: Office;
  h1: string;
  lede: React.ReactNode;
  intro: React.ReactNode;
  heroImage: { photo: Photo; alt: string };
  gallery: { photo: Photo; alt: string }[];
  areas: readonly string[];
  areasNote?: React.ReactNode;
  listingsUrl: string;
  quotes: (typeof testimonials)[number][];
  faqs: Faq[];
  extra?: React.ReactNode;
};

const localServices = [
  { icon: ClipboardCheck, title: "Leasing and 8-point screening", href: "/services/#leasing" },
  { icon: Wallet, title: "Online rent collection", href: "/services/#rent-collection" },
  { icon: Wrench, title: "Maintenance with no markup", href: "/services/#full-management" },
  { icon: Video, title: "Video before every move-in", href: "/services/#video-documentation" },
  { icon: CalendarCheck, title: "Twice-yearly inspections", href: "/services/#video-documentation" },
  { icon: FileText, title: "Owner statements and 1099s", href: "/services/#owner-statements" },
];

export function CityPage({ office, h1, lede, intro, heroImage, gallery, areas, areasNote, listingsUrl, quotes, faqs, extra }: Props) {
  return (
    <>
      <JsonLd
        data={graph(
          officeSchema(office),
          breadcrumbSchema([{ name: `${office.city} Property Management`, path: office.path }]),
          faqSchema(faqs.filter((f) => !f.placeholder)),
        )}
      />

      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 pt-8 pb-14 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumbs items={[{ name: `${office.city} Property Management` }]} />
            <p className="kicker mt-8">{office.county}, Utah</p>
            <h1 className="mt-3 text-[2.5rem] leading-[1.05] font-bold sm:text-6xl">{h1}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-ink sm:text-xl">{lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/free-rent-analysis/" size="lg">
                Free {office.city} rent analysis <ArrowRight aria-hidden="true" />
              </CtaLink>
              {office.phone ? (
                <CtaLink href={`tel:${office.phone.e164}`} variant="outline" size="lg">
                  <Phone aria-hidden="true" /> {office.phone.display}
                </CtaLink>
              ) : (
                <CtaLink href={`tel:${mainPhone.e164}`} variant="outline" size="lg">
                  <Phone aria-hidden="true" /> Main line {mainPhone.display}
                </CtaLink>
              )}
            </div>
          </div>
          <ResponsiveImg
            photo={heroImage.photo}
            alt={heroImage.alt}
            priority
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/3] w-full rounded-[2rem] rounded-tr-[5rem] object-cover shadow-[0_30px_60px_-30px_rgba(122,46,29,.55)]"
          />
        </div>
      </section>

      <section className="band-stripes py-16 sm:py-20" aria-labelledby="local-services">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="local-services" kicker="Services" title={`Property management services in ${office.city}`} />
            <div className="prose-uf mt-5 text-lg">{intro}</div>
            <Link href="/services/" className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-rock-deep">
              How each service works <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-3 self-start sm:grid-cols-2">
            {localServices.map(({ icon: Icon, title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="flex h-full items-center gap-3 rounded-xl border border-line bg-cream p-4 font-semibold text-night no-underline hover:shadow-md"
                >
                  <Icon className="size-5 shrink-0 text-rock" aria-hidden="true" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="areas-title">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading id="areas-title" kicker="Areas served" title={`Neighborhoods and towns we serve from ${office.city}`} />
            <AreaList areas={areas} className="mt-6" />
            {areasNote && <div className="mt-4 text-sm text-muted-ink">{areasNote}</div>}

            <h3 className="mt-12 text-2xl font-bold">Looking for a rental in {office.city}?</h3>
            <p className="mt-2 text-muted-ink">
              Browse current vacancies and apply online through Utah First&rsquo;s AppFolio listings.
            </p>
            <a href={listingsUrl} rel="noopener" className="mt-2 inline-flex min-h-11 items-center gap-1 font-semibold text-rock-deep">
              View {office.city} rentals <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <OfficeCard office={office} headingLevel="h2" />
        </div>
      </section>

      {extra}

      {gallery.length > 0 && (
        <section className="pb-16 sm:pb-20" aria-label="Homes and communities">
          <div className="container-page">
            <ul className="grid gap-4 sm:grid-cols-3">
              {gallery.map((g) => (
                <li key={g.alt}>
                  <ResponsiveImg photo={g.photo} alt={g.alt} sizes="(min-width: 1216px) 368px, (min-width: 640px) 31vw, 92vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-ink">Photos from Utah First&rsquo;s current website.</p>
          </div>
        </section>
      )}

      {quotes.length > 0 && (
        <section className="band-stripes py-16 sm:py-20" aria-labelledby="city-reviews">
          <div className="container-page">
            <SectionHeading id="city-reviews" kicker="Reviews" title="What owners say" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {quotes.map((t) => (
                <figure key={t.quote} className="rounded-2xl border border-line bg-cream p-6">
                  <blockquote className="font-display text-xl leading-relaxed text-night">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-night">{t.name}</span>
                    <span className="text-muted-ink">, {t.role}</span>
                    <cite className="block text-xs text-muted-ink not-italic">{t.source}</cite>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20" aria-labelledby="city-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="city-faq" kicker="FAQ" title={`${office.city} questions`} />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className="bg-night text-sand" aria-labelledby="city-cta">
        <Ridge className="text-sand" flip />
        <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 id="city-cta" className="text-3xl font-bold !text-white sm:text-4xl">
              Own a rental in {office.city}?
            </h2>
            <p className="mt-2 text-sand/85">Find out what it could rent for. Free, no obligation.</p>
          </div>
          <CtaLink href="/free-rent-analysis/" variant="light" size="lg">
            Get my free rent analysis <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
