import heroImg from "@/assets/photos/community-sign-sagewood.webp";
import archedEntry from "@/assets/photos/building-arched-entry.webp";
import townhomes from "@/assets/photos/townhomes-palm.webp";
import { CityPage } from "@/components/city-page";
import { SectionHeading } from "@/components/blocks";
import { Placeholder } from "@/components/placeholder";
import { tenantFaqs, ownerFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { mainPhone, offices, portals, testimonials } from "@/lib/site";

const office = offices["cedar-city"];

export const metadata = pageMeta({
  title: "Cedar City Property Management",
  description:
    "Property management in Cedar City, UT from Utah First's Iron County office at 2113 N Main St Ste 1. Tenant screening, online rent, video documentation, inspections and no maintenance markup.",
  path: office.path,
});

export default function CedarCityPage() {
  return (
    <CityPage
      office={office}
      h1="Cedar City Property Management"
      lede={
        <>
          Utah First&rsquo;s Cedar City office on North Main Street serves owners and tenants in Iron County, with the same
          screening, video documentation and no-markup maintenance as our St. George headquarters.
        </>
      }
      intro={
        <>
          <p>
            Cedar City owners get a local team for leasing, 8-point screening, online rent collection and repairs, backed by the
            systems Utah First uses for more than 1,100 Southern Utah properties.
          </p>
          <p>
            Utah First is listed on Southern Utah University&rsquo;s housing page of local property management companies, so
            students and families searching for rentals can find us there too.
          </p>
        </>
      }
      heroImage={{ src: heroImg, alt: "Sagewood community entrance sign on a sandstone wall above boulders and desert plants" }}
      gallery={[
        { src: archedEntry, alt: "White stucco building with arched columns, an entry ramp and red rock retaining walls" },
        { src: townhomes, alt: "Two-story townhomes with palm trees and two-car garages" },
      ]}
      areas={["Cedar City"]}
      areasNote={<Placeholder>Other Iron County communities served from this office: confirm with Utah First</Placeholder>}
      listingsUrl={portals.listingsCedar}
      quotes={[testimonials[2], testimonials[3]]}
      extra={
        <section className="pb-16 sm:pb-20" aria-labelledby="cedar-team">
          <div className="container-page">
            <div className="rounded-2xl border border-dashed border-line bg-cream p-6 sm:p-8">
              <SectionHeading id="cedar-team" kicker="Your Cedar City team" title="Local people who answer the phone" />
              <p className="mt-4 max-w-2xl text-muted-ink">
                Reviews of the Cedar City office mention staff by name for being responsive and honest. Team photos, names and
                roles go here.
              </p>
              <p className="mt-3 flex flex-wrap gap-2">
                <Placeholder>Team names, roles and photos: confirm with Utah First</Placeholder>
                <Placeholder>Direct phone and hours: verify (main line {mainPhone.display} until confirmed)</Placeholder>
                <Placeholder>Address: Google lists 2113 N Main St Ste 1; Iron County BOR lists 1166 S Sage Dr #2. Confirm current</Placeholder>
              </p>
            </div>
          </div>
        </section>
      }
      faqs={[
        {
          q: "Where is the Cedar City office?",
          a: `${office.street} ${office.suite}, Cedar City, UT ${office.zip}. Until the office's direct line is confirmed, call the main line at ${mainPhone.display}.`,
        },
        ...tenantFaqs.slice(0, 2),
        ownerFaqs[2],
        ownerFaqs[1],
      ]}
    />
  );
}
