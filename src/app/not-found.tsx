import Link from "next/link";
import { Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMeta } from "@/lib/metadata";
import { mainPhone } from "@/lib/site";

export const metadata = pageMeta({
  title: "Page not found",
  description:
    "This page has moved or no longer exists. Find property management services, the Tenant & Owner Hub, or call Utah First at (435) 619-5336.",
  path: "/404/",
});

export default function NotFound() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-cream px-4 py-2 font-semibold text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="container-page grid min-h-[60dvh] place-content-center py-20 text-center outline-none">
        <p className="kicker">404</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">We couldn&rsquo;t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-ink">
          The link may be old. Try the homepage or the Tenant &amp; Owner Hub, or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-rock px-6 font-semibold text-white no-underline hover:bg-rock-deep">
            Go to the homepage
          </Link>
          <Link
            href="/residents/"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-night/80 px-6 font-semibold text-night no-underline"
          >
            Tenant &amp; Owner Hub
          </Link>
          <a
            href={`tel:${mainPhone.e164}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-night/80 px-6 font-semibold text-night no-underline"
          >
            <Phone className="size-4" aria-hidden="true" /> {mainPhone.display}
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
