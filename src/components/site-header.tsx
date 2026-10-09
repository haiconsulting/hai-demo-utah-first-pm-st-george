import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import logo from "@/assets/photos/logo-utah-first-header.webp";
import { mainPhone } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sand/95 backdrop-blur supports-[backdrop-filter]:bg-sand/85">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-md" aria-label="Utah First Property Management, home">
          <Image src={logo} alt="" width={149} height={60} priority className="h-[52px] w-auto" />
        </Link>
        <SiteNav />
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${mainPhone.e164}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-night no-underline hover:text-rock-deep"
          >
            <Phone className="size-4 text-rock" aria-hidden="true" />
            {mainPhone.display}
          </a>
          <CtaLink href="/free-rent-analysis/" size="sm">
            Free Rent Analysis
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
