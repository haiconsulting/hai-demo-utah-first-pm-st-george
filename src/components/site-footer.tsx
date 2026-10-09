import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/photos/logo-utah-first-header.webp";
import { company, offices, portals } from "@/lib/site";
import { Placeholder } from "./placeholder";

export function SiteFooter() {
  const sg = offices["st-george"];
  const cc = offices["cedar-city"];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night pb-24 text-sand md:pb-24">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-cream px-3 py-2">
            <Image src={logo} alt="Utah First Property Management" width={149} height={60} className="h-12 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-sand/80">
            {company.tagline}. Broker-owned by {company.principalBroker}, principal broker. {company.legalName}.
          </p>
          <p className="mt-3 text-sm text-sand/80" lang="es">
            Hablamos español.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-sun uppercase">St. George office</h2>
          <address className="mt-3 text-sm leading-relaxed not-italic text-sand/90">
            {sg.street} {sg.suite}
            <br />
            {sg.city}, UT {sg.zip}
            <br />
            <a className="text-white" href={`tel:${sg.phone!.e164}`}>
              {sg.phone!.display}
            </a>
            <br />
            Fax {sg.fax!.display}
            <br />
            <a className="text-white" href={`mailto:${sg.email}`}>
              {sg.email}
            </a>
          </address>
          <p className="mt-3 text-sm text-sand/80">
            {company.hoursText[0]}
            <br />
            {company.hoursText[1]}
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-sun uppercase">Cedar City office</h2>
          <address className="mt-3 text-sm leading-relaxed not-italic text-sand/90">
            {cc.street} {cc.suite}
            <br />
            {cc.city}, UT {cc.zip}
          </address>
          <p className="mt-3 text-sm">
            <Placeholder>Phone and hours: verify</Placeholder>
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-sun uppercase">Explore</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li><Link className="text-sand/90 hover:text-white" href="/services/">Services</Link></li>
            <li><Link className="text-sand/90 hover:text-white" href="/st-george/">St. George property management</Link></li>
            <li><Link className="text-sand/90 hover:text-white" href="/cedar-city/">Cedar City property management</Link></li>
            <li><Link className="text-sand/90 hover:text-white" href="/residents/">Tenant &amp; Owner Hub</Link></li>
            <li><Link className="text-sand/90 hover:text-white" href="/free-rent-analysis/">Free Rent Analysis</Link></li>
            <li><Link className="text-sand/90 hover:text-white" href="/es/" lang="es">En español</Link></li>
            <li><a className="text-sand/90 hover:text-white" href={portals.owner} rel="noopener">Owner portal login</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-sand/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p>
            Demo concept by Front of House, not the official Utah First site.{" "}
            <Link className="text-sand underline" href="/pitch/" prefetch={false}>About this demo</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
