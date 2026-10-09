import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="container-page grid min-h-[70dvh] place-content-center py-20 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">We couldn&rsquo;t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted-ink">
        The link may be old. Try the homepage, the Tenant &amp; Owner Hub, or call (435) 619-5336.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-rock px-6 py-3 font-semibold text-white no-underline hover:bg-rock-deep">
          Go to the homepage
        </Link>
        <Link href="/residents/" className="rounded-full border-2 border-night/80 px-6 py-3 font-semibold text-night no-underline">
          Tenant &amp; Owner Hub
        </Link>
      </div>
    </main>
  );
}
