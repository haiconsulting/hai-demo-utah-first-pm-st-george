# Utah First Property Management: demo website

A sales-pitch demo built by **HAI Consulting** for Utah First Property Management (Wilprop, LLC; principal broker Bryan Wilson; [utah1st.com](https://www.utah1st.com)), with offices in St. George and Cedar City, Utah.

**This is not the official Utah First site.** It is noindexed, and a "Demo concept by Front of House" pill (the same design as the Sterling demo) appears on every page. It is Sterling's self-contained `src/components/foh/demo-pill.tsx`, rendered once in the root layout, with only the phone bottom offset changed to 12px (Utah First has no mobile action bar). It can be minimized to a small "FOH Demo" tab, but never removed; the state is kept in localStorage (`foh-demo-pill`). The Pleasant Grove company "Utah First Realty and Property Management" is a separate business and does not appear anywhere in the demo.

- Live demo (GitHub Pages): https://haiconsulting.github.io/hai-demo-utah-first-pm-st-george/
- Internal pitch page: `/pitch/` (compares the current Duda site with the demo and lays out HAI's offer)

## What's in it

| Route | Purpose |
|---|---|
| `/` | Owner-focused homepage: Free Rent Analysis hero CTA, proof bar, services, sourced Google quotes, owner section, resident tiles, the embedded rent analysis form, both offices, 29 service areas, FAQ |
| `/free-rent-analysis/` | 4-step rent analysis form. Demo mode: validates and shows a summary, sends nothing |
| `/st-george/` | Local page: services, Washington County areas, office NAP and hours, listings link, FAQ |
| `/cedar-city/` | Local page: services, Cedar City office, placeholders for phone, hours, team and the address conflict |
| `/services/` | Management, leasing and screening, owner statements, rent collection, video documentation and inspections, HOA management |
| `/residents/` | Tenant & Owner Hub: emergency vs non-emergency maintenance first, pay rent, listings and applications, owner portal (all existing AppFolio URLs) |
| `/es/` | Spanish hub (*Hablamos español*), with `hreflang` alternates |
| `/pitch/` | HAI Consulting pitch: audit vs demo, competitor gap (24/7), reputation, offer, facts to confirm |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | Generated at build time with absolute, base-path-aware URLs |

SEO and AI findability:

- Unique titles, meta descriptions, canonical URLs, Open Graph and Twitter tags, and exactly one H1 per page.
- JSON-LD:
  - `RealEstateAgent` + `LocalBusiness` for each office, linked to an `Organization`.
  - `WebSite`, `FAQPage`, `BreadcrumbList` and `Service` where relevant.
  - Unverified data (Cedar City phone and hours, review counts, ratings) is never put in schema.

## Facts and placeholders

All facts live in `src/lib/site.ts`, `src/lib/services.ts` and `src/lib/faq.ts`. They come from the HAI research one-pager and the earlier prototype's research notes. Nothing is invented:

- Reviews are quoted verbatim, with their source.
- Numbers (1,100+ properties, 8-point screening, twice-yearly inspections, "We do NOT mark up any maintenance") are from utah1st.com.

Anything not verified renders as a dashed amber **placeholder** tag via `<Placeholder>`. Confirm these with Utah First before launch:

- Google review counts (462 St. George, 85 Cedar City)
- Management, leasing and setup fees
- Cedar City phone, hours and current address (Google lists 2113 N Main St Ste 1; the Iron County BOR lists 1166 S Sage Dr #2)
- Cedar City team names and roles, other Iron County areas served
- Rent analysis response time, exact emergency policy, the Spanish translation
- HAI Consulting contact details on `/pitch/` (set `NEXT_PUBLIC_HAI_CONTACT_EMAIL` and `NEXT_PUBLIC_HAI_CONTACT_PHONE`)

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui (Base UI).
- Fully static: `output: "export"` for GitHub Pages and other static hosts, or `output: "standalone"` for Docker and Coolify.
- Images are pre-sized WebP files (`npm run images` regenerates them from `scripts/source-assets/`), because the static export has no image optimizer.
- Fonts are self-hosted through `next/font`: Fraunces and Public Sans for Utah First; Cormorant and Inter only on `/pitch`.

## Run locally

```bash
npm ci
npm run dev                # http://localhost:4318
```

Build the static export exactly as GitHub Pages serves it, under the subpath:

```bash
export NEXT_PUBLIC_BASE_PATH=/hai-demo-utah-first-pm-st-george
npm run build              # writes out/
npm start                  # http://127.0.0.1:4317/hai-demo-utah-first-pm-st-george/ (gzip, like Pages)
```

## Test

```bash
NEXT_PUBLIC_BASE_PATH=/hai-demo-utah-first-pm-st-george npm test
```

`npm test` runs `next build` and then `tests/build.test.mjs` (Node's built-in test runner) against `out/`. It checks:

- Every page exists and has one H1, a title, a meta description, a canonical URL, OG tags and noindex.
- Every internal `href`/`src` carries the base path and resolves to a real file.
- Every JSON-LD block parses, and offices are `RealEstateAgent` + `LocalBusiness` with a full `PostalAddress`, with no unverified phone or ratings.
- The sitemap, robots.txt and llms.txt use absolute base-path URLs.
- No Pleasant Grove details or restaurant references appear, the pill says Front of House, the `foh-nudge` rule ships with a reduced-motion override, and `/pitch` has no em dashes.

It then runs `tests/mobile-layout.test.mjs` with Playwright and the locally installed Chrome (skipped if Chrome isn't found; set `CHROME_PATH` to point at it). At 390x844, every `/pitch` comparison row must be a stacked card at least 90% of the viewport width, and the desktop table must have sensible column widths. Every page is checked for horizontal overflow at 320, 375, 390 and 430px. The demo pill must fit at those widths with 48px tap targets in both states, have no remove control, minimize and expand correctly, persist its state across reloads and pages, and keep the Pitch nudge running in both states (off under reduced motion).

## Configuration

| Env var | Default | Notes |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `""` | Sets `basePath` and `assetPrefix`. Pages uses `/hai-demo-utah-first-pm-st-george` |
| `NEXT_PUBLIC_SITE_URL` | GitHub Pages URL if a base path is set, else `http://localhost:3000` | Used for canonical URLs, OG, JSON-LD, the sitemap and llms.txt. Set to `https://www.utah1st.com` for production |
| `NEXT_PUBLIC_NOINDEX` | `true` | Set to `false` to allow indexing (robots meta and robots.txt) |
| `NEXT_OUTPUT` | `export` | `standalone` builds a Node server (used by the Dockerfile) |
| `NEXT_PUBLIC_HAI_CONTACT_EMAIL` / `_PHONE` | empty | HAI contact on `/pitch`; a placeholder shows when empty |

## Deploy

**GitHub Pages:** `.github/workflows/pages.yml` runs on every push to `main`. It runs `npm ci`, `npm test`, and `npm run build` with `NEXT_PUBLIC_BASE_PATH=/hai-demo-utah-first-pm-st-george`, then uploads `out/` with `upload-pages-artifact` and publishes it with `deploy-pages`. In the repo settings, set Pages to deploy from "GitHub Actions". `public/.nojekyll` keeps the `_next/` folder from being dropped.

**Docker / Coolify:** a standalone Node server on port 3000.

```bash
docker build -t utah-first-demo .
docker run -p 3000:3000 utah-first-demo
# production-style: --build-arg NEXT_PUBLIC_SITE_URL=https://www.utah1st.com --build-arg NEXT_PUBLIC_NOINDEX=false
```

**Vercel:** import the repo and leave `NEXT_PUBLIC_BASE_PATH` empty so the site builds at the root. `vercel.json` serves the static export from `out/`. Canonical, OG and JSON-LD URLs fall back to `VERCEL_PROJECT_PRODUCTION_URL` unless `NEXT_PUBLIC_SITE_URL` is set.

## Lighthouse (measured Oct 9, 2026, Lighthouse 13.5, static build served with gzip)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile, all 8 pages | 91 to 96 | 100 | 100 | 100 with indexing on (66 in the noindexed demo) |
| Desktop, home and pitch | 100 | 100 | 100 | 100 with indexing on |

Mobile performance is held back by the simulated slow-4G download of the React runtime. The site sends no third-party scripts.

## Brand notes

- Utah First: their logo and real photos from utah1st.com, set in a red-rock and desert palette.
- The demo pill uses the Front of House design from the Sterling demo: Ink pill, awning mark, Ember Deep "Pitch" button with the `foh-nudge` animation (4s cycle, 1.12 scale, about 3.5deg wobble, paused on hover and focus, off under reduced motion).
- `/pitch` is signed by HAI Consulting and uses the same warm Ink, Ember and Bone tokens with Cormorant and Inter, and no em dashes. Ember text and buttons use Ember Deep (#A8472B) to meet WCAG AA contrast.
- No page mentions restaurants (a test enforces this).
