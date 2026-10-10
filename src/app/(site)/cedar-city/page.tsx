import { photos } from "@/lib/photos";
import { CityPage } from "@/components/city-page";
import { tenantFaqs, ownerFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { offices, portals, testimonials } from "@/lib/site";

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
      heroImage={{ photo: photos.communitySignSagewood, alt: "Sagewood community entrance sign on a sandstone wall above boulders and desert plants" }}
      gallery={[
        { photo: photos.buildingArchedEntry, alt: "White stucco building with arched columns, an entry ramp and red rock retaining walls" },
        { photo: photos.townhomes, alt: "Two-story townhomes with palm trees and two-car garages" },
      ]}
      areas={["Cedar City"]}
      listingsUrl={portals.listingsCedar}
      quotes={[testimonials[2], testimonials[3]]}
      faqs={[
        {
          q: "Where is the Cedar City office?",
          a: `${office.street} ${office.suite}, Cedar City, UT ${office.zip}. Call ${office.phone!.display}.`,
        },
        ...tenantFaqs.slice(0, 2),
        ownerFaqs[2],
        ownerFaqs[1],
      ]}
    />
  );
}
