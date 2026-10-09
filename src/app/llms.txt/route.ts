import { abs, company, offices, portals, serviceAreas } from "@/lib/site";
import { services } from "@/lib/services";

export const dynamic = "force-static";

export function GET() {
  const sg = offices["st-george"];
  const cc = offices["cedar-city"];

  const body = `# ${company.name}

> ${company.tagline}. Long-term residential property management, leasing and HOA management in St. George, Cedar City and ${serviceAreas.length} Southern Utah communities. Manages more than ${company.propertiesManaged.replace("+", "")} properties. Broker-owned; principal broker ${company.principalBroker}. Legal entity: ${company.legalName}. Spanish spoken (Hablamos español).

Note: Utah First Realty and Property Management in Pleasant Grove, UT is a separate, unrelated company.

## Offices

- St. George (headquarters): ${sg.street} ${sg.suite}, St. George, UT ${sg.zip}. Phone ${sg.phone!.display}. Fax ${sg.fax!.display}. Email ${sg.email}. Hours: Mon-Thu 9am-5pm, Fri 9am-3pm, Sat-Sun closed. Page: ${abs(sg.path)}
- Cedar City: ${cc.street} ${cc.suite}, Cedar City, UT ${cc.zip}. Phone and hours not yet confirmed; call the main line ${sg.phone!.display}. Page: ${abs(cc.path)}

## Services

${services.map((s) => `- ${s.title}: ${s.summary}`).join("\n")}
- Maintenance: licensed, screened and insured vendors with multiple estimates. "We do NOT mark up any maintenance."
- Screening: 8-point check covering credit, criminal background, rental history and rent-to-income ratio.
- Inspections: video documentation before every move-in and semi-annual inspections with an owner report.
- Fees: not published. Ask for current pricing.

## Key pages

- [Home](${abs("/")}): owner overview and free rent analysis form
- [Free Rent Analysis](${abs("/free-rent-analysis/")}): request a no-obligation rent estimate
- [Services](${abs("/services/")}): management, leasing, owner statements, rent collection, video documentation, HOA management
- [St. George Property Management](${abs("/st-george/")})
- [Cedar City Property Management](${abs("/cedar-city/")})
- [Tenant & Owner Hub](${abs("/residents/")}): pay rent, maintenance, listings, owner login
- [En español](${abs("/es/")})

## Tenants

- Rent is due on the 1st and late at 5:00 pm on the 5th.
- Pay rent: ${portals.tenant}
- Maintenance requests (non-emergency): ${portals.maintenance}
- After-hours emergencies: call ${sg.phone!.display} and press 1.
- St. George vacancies: ${portals.listingsStGeorge}
- Cedar City vacancies: ${portals.listingsCedar}

## Owners

- Owner portal (AppFolio): ${portals.owner}
- Monthly statements with ACH deposit or mailed check; year-end 1099.

## Service areas

${serviceAreas.join(", ")}.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
