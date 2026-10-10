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
        assert.equal(office.telephone, "+14352630437", "Cedar City public phone");
        assert.ok(!office.openingHoursSpecification, "Cedar City hours are unconfirmed and must not be in schema");
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

test("demo pill says Front of House and no page mentions restaurants", () => {
  for (const route of Object.keys(pages)) {
    const text = htmlFor(route).replace(/<script[\s\S]*?<\/script>/g, "");
    assert.ok(!/restaurant/i.test(text), `${route} mentions restaurants`);
  }
  const home = htmlFor("/");
  assert.match(home, /Demo concept by <strong[^>]*>Front of House<\/strong>/, "desktop pill copy");
  assert.match(home, />Demo concept<\/span><strong[^>]*>Front of House<\/strong>/, "phone pill copy");
  assert.match(home, /FOH Demo/, "minimized tab label");
  assert.match(home, /\.foh-pill\{position:fixed;bottom:calc\(\.75rem \+ env\(safe-area-inset-bottom\)\)/, "12px phone offset");
  assert.ok(!/dismiss/i.test(home.match(/<aside[^>]*foh-pill[\s\S]*?<\/aside>/g)?.join("") ?? ""), "pill has no dismiss control");
  assert.ok(!/Demo concept by <strong[^>]*>HAI Consulting/.test(home), "pill must not say HAI Consulting");
});

test("foh-nudge animation exists and is disabled under reduced motion", () => {
  const html = htmlFor("/");
  const linked = [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => read(decode(m[1]).slice(BASE.length)));
  const css = [html, ...linked].join("\n").replace(/\s+/g, "");
  assert.match(html, /class="foh-pill foh-pill--full"/, "demo pill is missing");
  assert.match(html, /data-pitch-cta/, "pill pitch link is missing");
  assert.ok(html.includes(`href="${BASE}/pitch/"`), "pill pitch link must respect the base path");
  assert.match(css, /@keyframesfoh-nudge\{/, "missing @keyframes foh-nudge");
  const rule = css.match(/\.foh-nudge\{[^}]*animation:([^;}]*)/)?.[1] ?? "";
  assert.ok(rule.includes("foh-nudge") && rule.includes("4s") && rule.includes("infinite"), `missing .foh-nudge animation rule (${rule})`);
  assert.match(css, /scale\(1\.12\)rotate\(-3\.5deg\)/, "nudge should scale to 1.12 and rotate 3.5deg");
  assert.match(css, /\.foh-nudge:hover[^{]*\{[^}]*animation-play-state:paused/, "animation should pause on hover/focus");
  const reduced = [...css.matchAll(/@media\(prefers-reduced-motion:reduce\)\{((?:[^{}]|\{[^{}]*\})*)\}/g)].map((m) => m[1]);
  assert.ok(
    reduced.some((block) => /\.foh-nudge\{animation:none/.test(block)),
    "prefers-reduced-motion must set .foh-nudge { animation: none }",
  );
});

test("/pitch leads with owner outcomes and keeps SEO detail collapsed", () => {
  const html = htmlFor("/pitch/");
  const outcomesAt = html.indexOf("data-outcomes");
  const technicalAt = html.indexOf("data-technical");
  assert.ok(outcomesAt > 0 && technicalAt > outcomesAt, "outcome cards must come before technical details");
  assert.ok((html.match(/data-outcome="true"/g) ?? []).length >= 5, "at least five outcome cards");
  for (const t of ["rent analysis in 2 taps", "asks AI for St. George property managers", "Cedar City finally has its own page", "pay-rent and emergency info in one tap", "More calls and leads"]) {
    assert.ok(html.includes(t), `missing outcome: ${t}`);
  }
  const technical = html.slice(technicalAt, html.indexOf("</details>", technicalAt));
  assert.match(html.slice(technicalAt - 200, technicalAt), /<details/, "technical details must be a collapsible <details>");
  for (const k of ["Homepage title", "Meta description", "H1 heading", "Business schema", "llms.txt"]) {
    assert.ok(technical.includes(k), `${k} belongs in Technical details`);
    assert.ok(!html.slice(0, technicalAt).includes(`>${k}<`), `${k} must not appear before Technical details`);
  }
  const beforeAfter = html.slice(html.indexOf("data-before-after"), html.indexOf("data-outcomes"));
  assert.ok(html.indexOf("data-before-after") > html.indexOf("<h1"), "before/after sits under the headline");
  assert.equal((beforeAfter.match(/<img/g) ?? []).length, 4, "before/after needs desktop and mobile shots of both sites");
  assert.match(html, /Book a 15-min walkthrough/);
  assert.ok(!/priced on a call/i.test(html), "replace 'priced on a call' with a from-price");
  const addons = html.split('data-addon="true"').slice(1).map((chunk) => chunk.slice(0, 1200));
  assert.ok(addons.length === 2 && addons.every((a) => /from \$___/.test(a) && /Placeholder/.test(a)), "add-on prices must be marked from $___ placeholders");
  assert.match(html, /From \$2,000/);
});

test("site pages carry no placeholder chips; open items live on /pitch", () => {
  for (const route of Object.keys(pages).filter((r) => r !== "/pitch/")) {
    const html = htmlFor(route);
    assert.ok(!html.includes("Placeholder, needs confirmation"), `${route} shows a placeholder chip`);
    assert.ok(!/reviews: verify|: verify<|por confirmar/i.test(html), `${route} shows verify copy`);
  }
  const home = htmlFor("/");
  assert.match(home, /4\.8<span[^>]*>&#9733;|4\.8<span[^>]*>★/, "St. George rating");
  assert.match(home, /on Google, St\. George/);
  assert.match(home, /on Google, Cedar City/);
  const pitch = htmlFor("/pitch/");
  for (const item of ["462", "85", "(435) 263-0437", "Spanish translation review", "Rent analysis response time"]) {
    assert.ok(pitch.includes(item), `/pitch confirm list is missing ${item}`);
  }
  assert.match(htmlFor("/"), /A few details are still being confirmed/, "single subtle footer note");
});

test("Cedar City shows its public phone everywhere", () => {
  for (const route of ["/", "/cedar-city/", "/es/", "/residents/"]) {
    assert.ok(htmlFor(route).includes('href="tel:+14352630437"'), `${route} is missing the Cedar City tel: link`);
  }
  assert.match(read("llms.txt"), /Cedar City[^\n]*\(435\) 263-0437/);
});

test("/es/ keeps the translation note out of the opening", () => {
  const html = htmlFor("/es/");
  const note = html.indexOf("Traducción en revisión");
  assert.ok(note > 0, "translation note should remain as a small footer line");
  assert.ok(note > html.indexOf("Preguntas comunes"), "translation note must come after the page content");
  assert.ok(!html.includes("Traducción de demostración"), "old opening banner must be gone");
});

test("404 renders inside the site chrome with a tappable phone", () => {
  const html = read("404.html");
  assert.match(html, /<header[\s>]/, "404 needs the site header");
  assert.match(html, /<footer[\s>]/, "404 needs the site footer");
  assert.ok(html.includes('href="tel:+14356195336"'), "404 needs a tel: link");
  assert.match(html, /<meta property="og:image" content="[^"]+"/, "404 needs an og:image");
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /--font-display-face|font-display/, "404 uses the brand display font");
});

test("footer office labels are not headings", () => {
  const html = htmlFor("/");
  const footer = html.slice(html.lastIndexOf("<footer"), html.lastIndexOf("</footer>"));
  assert.ok(!/<h[1-6][\s>]/.test(footer), "footer should not add headings to the outline");
});

test("card photos ship 480px variants and the hero is preloaded", () => {
  for (const route of ["/st-george/", "/cedar-city/", "/"]) {
    const html = htmlFor(route);
    const imgs = [...html.matchAll(/<img[^>]*srcSet="([^"]+)"/gi)].map((m) => m[1]);
    assert.ok(imgs.length >= 2, `${route} photos need srcset`);
    assert.ok(imgs.every((set) => /\b(480|800)w\b/.test(set)), `${route} has a photo without a small variant`);
  }
  const home = htmlFor("/");
  assert.match(home, /<link rel="preload"[^>]*as="image"[^>]*imageSrcSet="[^"]*modern-farmhouse/i, "hero image should be preloaded");
  assert.match(home, /<link rel="preload"[^>]*fetchPriority="high"[^>]*modern-farmhouse|<link rel="preload"[^>]*modern-farmhouse[^>]*fetchPriority="high"/i);
});

test("HAI pitch copy has no em dashes", () => {
  const text = htmlFor("/pitch/").replace(/<script[\s\S]*?<\/script>/g, "");
  assert.ok(!text.includes("\u2014") && !text.includes("&mdash;"), "em dash found on /pitch");
});
