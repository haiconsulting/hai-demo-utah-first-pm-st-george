import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Printer, Quote } from "lucide-react";
import { company, testimonials, type Office } from "@/lib/site";
import type { Faq } from "@/lib/faq";
import { cn } from "@/lib/utils";
import { Placeholder } from "./placeholder";

export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <Tag id={id} className={cn(Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl", "font-bold")}>
        {title}
      </Tag>
      {intro && <div className="mt-4 text-lg text-muted-ink">{intro}</div>}
    </div>
  );
}

/** Decorative red-rock ridge used between sections. */
export function Ridge({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn("block h-10 w-full sm:h-16", flip && "rotate-180", className)}
    >
      <path
        d="M0 80 L0 52 L90 40 L150 46 L210 22 L300 22 L320 38 L420 44 L470 18 L560 18 L590 40 L700 48 L780 30 L860 34 L900 10 L990 10 L1010 36 L1120 46 L1180 28 L1260 32 L1300 14 L1380 14 L1400 40 L1440 44 L1440 80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PhotoFigure({
  src,
  alt,
  caption,
  className,
  priority,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl bg-sand-2", className)}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}

export function OfficeCard({ office, headingLevel = "h3" }: { office: Office; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6 shadow-[0_1px_2px_rgba(42,26,20,.05),0_10px_30px_-12px_rgba(42,26,20,.18)] sm:p-7">
      <p className="kicker">{office.county}</p>
      <H className="mt-1 text-2xl font-bold">{office.city} office</H>
      <ul className="mt-5 grid gap-3 text-[0.98rem]">
        <li className="flex gap-3">
          <MapPin className="mt-1 size-5 shrink-0 text-rock" aria-hidden="true" />
          <address className="not-italic">
            {company.name}
            <br />
            {office.street} {office.suite}
            <br />
            {office.city}, UT {office.zip}
          </address>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-1 size-5 shrink-0 text-rock" aria-hidden="true" />
          {office.phone ? (
            <a href={`tel:${office.phone.e164}`} className="font-semibold text-night">
              {office.phone.display}
            </a>
          ) : (
            <span>
              <Placeholder>Office phone: verify</Placeholder>
              <span className="mt-1 block text-sm text-muted-ink">Until confirmed, the main line is (435) 619-5336.</span>
            </span>
          )}
        </li>
        {office.fax && (
          <li className="flex gap-3">
            <Printer className="mt-1 size-5 shrink-0 text-rock" aria-hidden="true" />
            <span>Fax {office.fax.display}</span>
          </li>
        )}
        <li className="flex gap-3">
          <Mail className="mt-1 size-5 shrink-0 text-rock" aria-hidden="true" />
          <a href={`mailto:${office.email}`} className="text-night">
            {office.email}
          </a>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-1 size-5 shrink-0 text-rock" aria-hidden="true" />
          {office.hoursVerified ? (
            <span>
              {company.hoursText.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
            </span>
          ) : (
            <Placeholder>Office hours: verify</Placeholder>
          )}
        </li>
      </ul>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
        <a href={maps} rel="noopener" className="inline-flex items-center gap-1 text-rock-deep">
          Get directions <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">to the {office.city} office (opens Google Maps)</span>
        </a>
        <Link href={office.path} className="text-rock-deep">
          {office.city} property management
        </Link>
      </div>
    </article>
  );
}

export function Testimonials({ limit, className }: { limit?: number; className?: string }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <div className={cn("grid gap-5 md:grid-cols-2", className)}>
      {items.map((t) => (
        <figure key={t.quote} className="flex flex-col rounded-2xl border border-line bg-cream p-6 sm:p-7">
          <Quote className="size-7 text-sun" aria-hidden="true" />
          <blockquote className="mt-3 font-display text-lg leading-relaxed text-night sm:text-xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-auto pt-5 text-sm">
            <span className="font-semibold text-night">{t.name}</span>
            <span className="text-muted-ink">, {t.role}</span>
            <cite className="mt-0.5 block text-xs text-muted-ink not-italic">{t.source}</cite>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-cream", className)}>
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-night">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-2 text-rock-deep transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-5 text-muted-ink">
            {f.placeholder && <Placeholder className="mb-2">Not published: Utah First to supply</Placeholder>}
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function AreaList({ areas, className }: { areas: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {areas.map((a) => (
        <li key={a} className="rounded-full border border-line bg-cream px-3 py-1 text-sm font-medium text-night">
          {a}
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-ink">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="text-muted-ink hover:text-night">
            Home
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {it.href ? (
              <Link href={it.href} className="text-muted-ink hover:text-night">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-night">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
