// Validates the static export in out/. Run after `next build` (npm test does both).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (BASE
    ? `https://haiconsulting.github.io${BASE}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");
const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX !== "false";

const pages = {
  "/": { schema: ["RealEstateAgent", "Organization", "WebSite", "FAQPage"] },
  "/st-george/": { schema: ["RealEstateAgent", "BreadcrumbList"], office: "St. George" },
  "/cedar-city/": { schema: ["RealEstateAgent", "BreadcrumbList"], office: "Cedar City" },
  "/services/": { schema: ["Service", "BreadcrumbList"] },
  "/residents/": { schema: ["BreadcrumbList", "FAQPage"] },
  "/free-rent-analysis/": { schema: ["Service"] },
  "/es/": { schema: ["FAQPage"] },
  "/pitch/": { schema: [] },
};

const read = (rel) => readFileSync(join(OUT, rel), "utf8");
const htmlFor = (route) => read(join(route, "index.html"));
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
}

function nodesOf(doc) {
  const list = doc["@graph"] ?? [doc];
  return list.flatMap((n) => [n]);
}

const typesOf = (node) => [].concat(node["@type"] ?? []);

function walkUrls(value, out = []) {
  if (typeof value === "string") {
    if (/^https?:\/\//.test(value)) out.push(value);
  } else if (Array.isArray(value)) value.forEach((v) => walkUrls(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => walkUrls(v, out));
  return out;
}

test("static export exists with required files", () => {
  for (const f of ["index.html", "404.html", "robots.txt", "sitemap.xml", "llms.txt", ".nojekyll", "og/utah-first-og.jpg"]) {
    assert.ok(existsSync(join(OUT, f)), `missing out/${f}`);
  }
  for (const route of Object.keys(pages)) assert.ok(existsSync(join(OUT, route, "index.html")), `missing ${route}`);
});

for (const [route, spec] of Object.entries(pages)) {
  test(`${route}: SEO basics`, () => {
    const html = htmlFor(route);
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    assert.equal(h1s.length, 1, `${route} should have exactly one <h1>, found ${h1s.length}`);

    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && title.length >= 20 && title.length <= 70, `${route} title length: ${title}`);

    const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(desc && desc.length >= 70 && desc.length <= 300, `${route} meta description: ${desc}`);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, `${SITE_URL}${route}`, `${route} canonical`);

    for (const prop of ["og:title", "og:description", "og:url", "og:image"]) {
      assert.match(html, new RegExp(`<meta property="${prop}" content="[^"]+"`), `${route} missing ${prop}`);
    }
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)[1];
    assert.ok(ogImage.startsWith(SITE_URL.replace(BASE, "")) && ogImage.includes(`${BASE}/og/`), `og:image ${ogImage}`);

    if (NOINDEX) assert.match(html, /<meta name="robots" content="noindex, nofollow"/, `${route} should be noindex`);
  });

  test(`${route}: internal links and assets respect the base path`, () => {
    const html = htmlFor(route);
    const refs = [...html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
    assert.ok(refs.length > 5);
    for (const ref of refs) {
      if (BASE) assert.ok(ref.startsWith(`${BASE}/`), `${route}: "${ref}" is missing base path ${BASE}`);
      const file = decode(ref.slice(BASE.length)).split(/[?#]/)[0];
      const target = file.endsWith("/") ? join(file, "index.html") : file;
      assert.ok(existsSync(join(OUT, target)), `${route}: broken internal reference ${ref}`);
    }
  });

  test(`${route}: JSON-LD is valid`, () => {
    const blocks = jsonLdBlocks(htmlFor(route));
    if (spec.schema.length === 0) return;
    assert.ok(blocks.length > 0, `${route} has no JSON-LD`);

    const nodes = [];
    for (const raw of blocks) {
      const doc = JSON.parse(raw);
      assert.equal(doc["@context"], "https://schema.org");
      nodes.push(...nodesOf(doc));
    }
    const allTypes = nodes.flatMap(typesOf);
    for (const t of spec.schema) assert.ok(allTypes.includes(t), `${route} JSON-LD missing @type ${t}`);

    const ids = nodes.map((n) => n["@id"]).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `${route} duplicate @id`);

    for (const url of walkUrls(nodes)) {
      const internal = url.startsWith(SITE_URL.replace(BASE, ""));
      if (internal && BASE) assert.ok(url.startsWith(SITE_URL), `${route}: JSON-LD URL ${url} ignores base path`);
    }

    for (const n of nodes.filter((n) => typesOf(n).includes("RealEstateAgent"))) {
      assert.ok(typesOf(n).includes("LocalBusiness"), "office should also be LocalBusiness");
      for (const k of ["name", "url", "address", "areaServed", "parentOrganization"]) assert.ok(n[k], `office missing ${k}`);
      assert.equal(n.address["@type"], "PostalAddress");
      for (const k of ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"]) {
        assert.ok(n.address[k], `office address missing ${k}`);
      }
      assert.ok(n.url.startsWith(SITE_URL));
      assert.ok(!("aggregateRating" in n), "unverified ratings must not be in schema");
    }

    if (spec.office) {
      const office = nodes.find((n) => typesOf(n).includes("RealEstateAgent"));
      assert.equal(office.address.addressLocality, spec.office);
      if (spec.office === "St. George") {
        assert.equal(office.telephone, "+14356195336");
        assert.equal(office.address.streetAddress, "1240 E. 100 S. Ste. 5");
        assert.ok(office.openingHoursSpecification?.length === 2);
      }
      if (spec.office === "Cedar City") {
        assert.equal(office.address.streetAddress, "2113 N Main St Ste. 1");
        assert.ok(!office.telephone, "Cedar City phone is unverified and must not be in schema");
      }
    }
  });
}

test("sitemap, robots and llms.txt use absolute base-path URLs", () => {
  const sitemap = read("sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length >= 7);
  for (const l of locs) assert.ok(l.startsWith(`${SITE_URL}/`), `sitemap loc ${l}`);
  assert.ok(!locs.some((l) => l.includes("/pitch")), "pitch must not be in the sitemap");

  const robots = read("robots.txt");
  assert.match(robots, new RegExp(`Sitemap: ${SITE_URL}/sitemap.xml`));

  const llms = read("llms.txt");
  assert.match(llms, /^# Utah First Property Management/);
  assert.match(llms, /1240 E\. 100 S\./);
  assert.match(llms, /utahfirst\.appfolio\.com\/connect/);
  assert.ok(llms.includes(`${SITE_URL}/st-george/`));
});

test("no Pleasant Grove company details leak in", () => {
  for (const route of Object.keys(pages)) {
    const html = htmlFor(route);
    assert.ok(!/801.?636.?0525|utahfirstrealty\.com|Renaissance Pl/i.test(html), `${route} mentions the Pleasant Grove company`);
  }
});

test("real estate pitch is HAI Consulting, never Front of House", () => {
  for (const route of Object.keys(pages)) {
    const text = htmlFor(route).replace(/<script[\s\S]*?<\/script>/g, "");
    assert.ok(!/front of house|\bFOH\b|fohrestaurants|restaurant/i.test(text), `${route} mentions FOH or restaurants`);
  }
  assert.match(htmlFor("/pitch/"), /HAI Consulting/);
  assert.match(htmlFor("/"), /Demo concept by/);
});

test("HAI pitch copy has no em dashes", () => {
  const text = htmlFor("/pitch/").replace(/<script[\s\S]*?<\/script>/g, "");
  assert.ok(!text.includes("\u2014") && !text.includes("&mdash;"), "em dash found on /pitch");
});
