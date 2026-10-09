import { abs, company, offices, publicPath, absAsset, serviceAreas, washingtonCountyAreas, type Office } from "./site";

const ORG_ID = abs("/#organization");
const officeId = (o: Office) => abs(`${o.path}#office`);

const city = (name: string) => ({ "@type": "City", name: `${name}, UT` });

export const ogImageUrl = absAsset(publicPath("/og/utah-first-og.jpg"));

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.name,
    legalName: company.legalName,
    alternateName: company.shortName,
    slogan: company.tagline,
    url: abs("/"),
    logo: absAsset(publicPath("/og/utah-first-logo.png")),
    email: company.email,
    founder: { "@type": "Person", name: company.principalBroker, jobTitle: "Principal Broker" },
    sameAs: [...company.sameAs, company.website],
    subOrganization: Object.values(offices).map((o) => ({ "@id": officeId(o) })),
  };
}

export function officeSchema(o: Office) {
  const areas = o.id === "cedar-city" ? ["Cedar City"] : washingtonCountyAreas;
  return {
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": officeId(o),
    name: o.name,
    url: abs(o.path),
    image: ogImageUrl,
    email: o.email,
    ...(o.phone ? { telephone: o.phone.e164 } : {}),
    ...(o.fax ? { faxNumber: o.fax.e164 } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${o.street} ${o.suite}`,
      addressLocality: o.city,
      addressRegion: "UT",
      postalCode: o.zip,
      addressCountry: "US",
    },
    ...(o.hoursVerified
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "09:00",
              closes: "17:00",
            },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "15:00" },
          ],
        }
      : {}),
    areaServed: areas.map(city),
    knowsLanguage: ["en", "es"],
    parentOrganization: { "@id": ORG_ID },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapsQuery)}`,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: company.name,
    publisher: { "@id": ORG_ID },
    inLanguage: ["en-US", "es-US"],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@type": "Service",
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: serviceAreas.map(city),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
