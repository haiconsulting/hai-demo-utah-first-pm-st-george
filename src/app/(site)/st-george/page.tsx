import { photos } from "@/lib/photos";
import { CityPage } from "@/components/city-page";
import { tenantFaqs, ownerFaqs } from "@/lib/faq";
import { pageMeta } from "@/lib/metadata";
import { company, offices, portals, testimonials, washingtonCountyAreas } from "@/lib/site";

const office = offices["st-george"];

export const metadata = pageMeta({
  title: "St. George Property Management",
  description:
    "Property management in St. George, UT from Utah First: 8-point tenant screening, online rent collection, video before every move-in and no maintenance markup. Office at 1240 E. 100 S. Ste. 5, (435) 619-5336.",
  path: office.path,
});

export default function StGeorgePage() {
  return (
    <CityPage
      office={office}
      h1="St. George Property Management"
      lede={
        <>
          Utah First&rsquo;s headquarters is at 1240 E. 100 S. in St. George. From here we manage rental homes, townhomes and
          HOAs across Washington County, and {company.propertiesManaged} properties across Southern Utah.
        </>
      }
      intro={
        <>
          <p>
            St. George owners hand us the whole job: marketing the home, showing it, screening every applicant with our 8-point
            check, collecting rent online and coordinating repairs with licensed, insured vendors. We do NOT mark up any
            maintenance.
          </p>
          <p>
            Every home is filmed before move-in and inspected twice a year, and you see statements, documents and payouts in
            the AppFolio owner portal.
          </p>
        </>
      }
      heroImage={{ photo: photos.homeDarkGarage, alt: "Single-story home with a dark garage door, stone accents and a paver driveway" }}
      gallery={[
        { photo: photos.duplex, alt: "Two-story duplex with two garages and a wide concrete driveway" },
        { photo: photos.communitySignBrick, alt: "Brick community entrance sign reading Paradise Cove, with white gravel and shrubs" },
        { photo: photos.homeStucco, alt: "Two-story stucco home with a tile roof and desert trees" },
      ]}
      areas={washingtonCountyAreas}
      listingsUrl={portals.listingsStGeorge}
      quotes={[testimonials[0], testimonials[1]]}
      faqs={[
        {
          q: "Which St. George areas do you manage in?",
          a: `All of Washington County, including ${washingtonCountyAreas.slice(0, 8).join(", ")}, Hurricane, Ivins, Santa Clara, Springdale and more.`,
        },
        {
          q: "Where is the St. George office?",
          a: `${office.street} ${office.suite}, St. George, UT ${office.zip}. Call ${office.phone!.display}. Open Monday to Thursday 9 am to 5 pm and Friday 9 am to 3 pm.`,
        },
        ...tenantFaqs.slice(0, 2),
        ownerFaqs[1],
      ]}
    />
  );
}
