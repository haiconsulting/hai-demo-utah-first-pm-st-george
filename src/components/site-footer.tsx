import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/photos/logo-utah-first-header.webp";
import { company, offices, portals } from "@/lib/site";

const tap = "inline-flex min-h-11 items-center";
const label = "font-sans text-xs font-bold tracking-[0.18em] text-sun uppercase";

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
          <p className={label}>St. George office</p>
          <address className="mt-3 text-sm leading-relaxed not-italic text-sand/90">
            {sg.street} {sg.suite}
            <br />
            {sg.city}, UT {sg.zip}
          </address>
          <ul className="mt-1 text-sm">
            <li>
              <a className={`${tap} text-white`} href={`tel:${sg.phone!.e164}`}>
                {sg.phone!.display}
              </a>
            </li>
            <li className="text-sand/80">Fax {sg.fax!.display}</li>
            <li>
              <a className={`${tap} text-white`} href={`mailto:${sg.email}`}>
                {sg.email}
              </a>
            </li>
          </ul>
          <p className="mt-2 text-sm text-sand/80">
            {company.hoursText[0]}
            <br />
            {company.hoursText[1]}
          </p>
        </div>

        <div>
          <p className={label}>Cedar City office</p>
          <address className="mt-3 text-sm leading-relaxed not-italic text-sand/90">
            {cc.street} {cc.suite}
            <br />
            {cc.city}, UT {cc.zip}
          </address>
          <ul className="mt-1 text-sm">
            <li>
              <a className={`${tap} text-white`} href={`tel:${cc.phone!.e164}`}>
                {cc.phone!.display}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className={label}>Explore</p>
          <ul className="mt-2 grid text-sm">
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/services/">Services</Link></li>
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/st-george/">St. George property management</Link></li>
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/cedar-city/">Cedar City property management</Link></li>
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/residents/">Tenant &amp; Owner Hub</Link></li>
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/free-rent-analysis/">Free Rent Analysis</Link></li>
            <li><Link className={`${tap} text-sand/90 hover:text-white`} href="/es/" lang="es">En español</Link></li>
            <li><a className={`${tap} text-sand/90 hover:text-white`} href={portals.owner} rel="noopener">Owner portal login</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-sand/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p>
            Demo concept by Front of House, not the official Utah First site. A few details are still being confirmed with Utah
            First.{" "}
            <Link className="text-sand underline" href="/pitch/" prefetch={false}>
              About this demo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
