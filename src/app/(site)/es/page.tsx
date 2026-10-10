import { AlertTriangle, ArrowUpRight, BadgeCheck, KeyRound, LineChart, Phone, Wallet, Wrench } from "lucide-react";
import Link from "next/link";
import { ResponsiveImg } from "@/components/responsive-img";
import { photos } from "@/lib/photos";
import { AreaList, FaqList } from "@/components/blocks";
import { CtaLink } from "@/components/cta-link";
import { JsonLd } from "@/components/json-ld";
import type { Faq } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { company, mainPhone, offices, portals, serviceAreas } from "@/lib/site";

export const metadata = pageMeta({
  title: "Administración de Propiedades en St. George y Cedar City | Utah First",
  absoluteTitle: true,
  description:
    "Hablamos español. Utah First administra más de 1,100 propiedades en el sur de Utah. Pague la renta, solicite mantenimiento, busque una casa en renta o pida un análisis de renta gratis.",
  path: "/es/",
  locale: "es_US",
  languages: { "en-US": "/", "es-US": "/es/" },
});

const faqs: Faq[] = [
  {
    q: "¿Cuándo se paga la renta?",
    a: "La renta vence el día 1 de cada mes y se considera atrasada a las 5:00 p. m. del día 5. Puede pagar en línea en el portal de inquilinos.",
  },
  {
    q: "¿Qué hago si tengo una emergencia de mantenimiento fuera del horario de oficina?",
    a: `Llame al ${mainPhone.display} y marque 1 para emergencias fuera de horario. Para reparaciones que pueden esperar, envíe una solicitud de mantenimiento en línea.`,
  },
  {
    q: "¿Cobran un recargo sobre el mantenimiento?",
    a: "No. Utah First no cobra ningún recargo sobre el mantenimiento. Trabajamos con contratistas con licencia y seguro, y pedimos varios presupuestos.",
  },
  {
    q: "¿Cómo evalúan a los solicitantes?",
    a: "Cada solicitante pasa por una evaluación de 8 puntos que incluye crédito, antecedentes penales, historial de renta y la relación entre ingresos y renta, de acuerdo con la ley de vivienda justa.",
  },
];

export default function SpanishPage() {
  const sg = offices["st-george"];
  const cc = offices["cedar-city"];
  return (
    <div lang="es">
      <JsonLd data={graph(breadcrumbSchema([{ name: "En español", path: "/es/" }]), faqSchema(faqs))} />

      <section className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker">Hablamos español</p>
          <h1 className="mt-3 text-[2.4rem] leading-[1.05] font-bold sm:text-6xl">
            Administración de propiedades en St. George y Cedar City
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-ink sm:text-xl">
            Utah First administra más de 1,100 propiedades en el sur de Utah. Inquilinos y propietarios pueden recibir ayuda en
            español por teléfono o correo electrónico.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={`tel:${mainPhone.e164}`} size="lg">
              <Phone aria-hidden="true" /> Llamar al {mainPhone.display}
            </CtaLink>
            <CtaLink href={`mailto:${company.email}`} variant="outline" size="lg">
              {company.email}
            </CtaLink>
          </div>
        </div>
        <ResponsiveImg
          photo={photos.farmhouse}
          alt="Casa blanca de dos pisos estilo granja con césped verde bajo el cielo azul del sur de Utah"
          priority
          sizes="(min-width: 1024px) 480px, 100vw"
          className="aspect-[4/3] w-full rounded-[2rem] object-cover"
        />
      </section>

      <section className="band-stripes py-14 sm:py-20" aria-labelledby="es-inquilinos">
        <div className="container-page">
          <p className="kicker">Para inquilinos</p>
          <h2 id="es-inquilinos" className="mt-2 text-3xl font-bold sm:text-4xl">
            Todo lo que necesita, en un solo lugar
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Wallet, t: "Pagar la renta", b: "Vence el día 1. Atrasada después de las 5:00 p. m. del día 5.", href: portals.tenant, cta: "Portal de inquilinos" },
              { icon: AlertTriangle, t: "Emergencia", b: `Llame al ${mainPhone.display}. Fuera de horario, marque 1.`, href: `tel:${mainPhone.e164}`, cta: "Llamar ahora" },
              { icon: Wrench, t: "Mantenimiento", b: "Para reparaciones que no son de emergencia.", href: portals.maintenance, cta: "Enviar solicitud" },
              { icon: KeyRound, t: "Casas en renta", b: "Vea propiedades disponibles y presente su solicitud.", href: portals.listingsStGeorge, cta: "Ver casas disponibles" },
            ].map(({ icon: Icon, t, b, href, cta }) => (
              <li key={t} className="flex flex-col rounded-2xl border border-line bg-cream p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-rock text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-ink">{b}</p>
                <a href={href} {...(href.startsWith("http") ? { rel: "noopener" } : {})} className="mt-auto inline-flex items-center gap-1 pt-4 font-semibold text-rock-deep">
                  {cta} <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-ink">
            Los portales de AppFolio y los formularios de solicitud pueden mostrarse en inglés.{" "}
            <a href={portals.spanish} rel="noopener" className="text-rock-deep">
              Página actual &ldquo;Hablamos Español&rdquo;
            </a>
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="es-propietarios">
        <div className="container-page">
          <p className="kicker">Para propietarios</p>
          <h2 id="es-propietarios" className="mt-2 text-3xl font-bold sm:text-4xl">
            Su propiedad, administrada como si fuera nuestra
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Evaluación de 8 puntos para cada solicitante",
              "Video de cada casa antes de la mudanza",
              "Inspecciones dos veces al año, con reporte al propietario",
              "Sin recargo sobre el mantenimiento",
              "Estados de cuenta mensuales, depósito ACH y formulario 1099 anual",
              "Administración de asociaciones de propietarios (HOA)",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-xl border border-line bg-cream p-4">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/free-rent-analysis/">
              <LineChart aria-hidden="true" /> Análisis de renta gratis
            </CtaLink>
            <CtaLink href={portals.owner} variant="outline">
              Portal de propietarios
            </CtaLink>
          </div>
          <p className="mt-3 text-sm text-muted-ink">El formulario de análisis de renta está en inglés por ahora.</p>
        </div>
      </section>

      <section className="band-stripes py-14 sm:py-20" aria-labelledby="es-oficinas">
        <div className="container-page">
          <p className="kicker">Oficinas</p>
          <h2 id="es-oficinas" className="mt-2 text-3xl font-bold sm:text-4xl">
            Dos oficinas locales
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-cream p-6">
              <h3 className="text-2xl font-bold">St. George</h3>
              <address className="mt-3 not-italic">
                {sg.street} {sg.suite}
                <br />
                St. George, UT {sg.zip}
                <br />
                <a href={`tel:${sg.phone!.e164}`} className="inline-flex min-h-11 items-center font-semibold text-night">
                  {sg.phone!.display}
                </a>
              </address>
              <p className="mt-3 text-sm text-muted-ink">
                Lunes a jueves, 9 a. m. a 5 p. m.
                <br />
                Viernes, 9 a. m. a 3 p. m.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-cream p-6">
              <h3 className="text-2xl font-bold">Cedar City</h3>
              <address className="mt-3 not-italic">
                {cc.street} {cc.suite}
                <br />
                Cedar City, UT {cc.zip}
                <br />
                <a href={`tel:${cc.phone!.e164}`} className="inline-flex min-h-11 items-center font-semibold text-night">
                  {cc.phone!.display}
                </a>
              </address>
            </div>
          </div>
          <h3 className="mt-10 text-xl font-bold">Áreas de servicio</h3>
          <AreaList areas={serviceAreas} className="mt-3" />
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="es-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker">Preguntas frecuentes</p>
            <h2 id="es-faq" className="mt-2 text-3xl font-bold sm:text-4xl">
              Preguntas comunes
            </h2>
            <p className="mt-4 text-muted-ink">
              <Link href="/" lang="en" className="text-rock-deep">
                View this site in English
              </Link>
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
        <p className="container-page mt-12 text-xs text-muted-ink">Traducción en revisión con el equipo de Utah First.</p>
      </section>
    </div>
  );
}
