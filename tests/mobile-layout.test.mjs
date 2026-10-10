// Mobile layout checks against the static export in out/, using a locally installed Chrome.
// Run after `next build` (npm test does both). Skips when no Chrome binary is available.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";

const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const PORT = 4400 + Math.floor(Math.random() * 500);
const ORIGIN = `http://127.0.0.1:${PORT}${BASE}`;

const chromePath = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/local/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && existsSync(p));

const pages = ["/", "/st-george/", "/cedar-city/", "/services/", "/residents/", "/free-rent-analysis/", "/es/", "/pitch/"];
const widths = [320, 375, 390, 430];

let server;
let browser;

before(async () => {
  if (!chromePath) return;
  server = spawn(process.execPath, ["scripts/serve-out.mjs"], {
    env: { ...process.env, PORT: String(PORT), NEXT_PUBLIC_BASE_PATH: BASE },
    stdio: ["ignore", "pipe", "inherit"],
  });
  await new Promise((resolve) => server.stdout.once("data", resolve));
  browser = await chromium.launch({ executablePath: chromePath });
});

after(async () => {
  await browser?.close();
  server?.kill();
});

test("pitch comparison rows are full-width stacked cards at 390x844", { skip: !chromePath && "Chrome not found" }, async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${ORIGIN}/pitch/`, { waitUntil: "load" });
  const result = await page.evaluate(() => {
    const rows = [...document.querySelectorAll("[data-compare-row]")].filter((el) => el.checkVisibility());
    return {
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      tableVisible: !!document.querySelector("table")?.offsetParent,
      widths: rows.map((r) => r.getBoundingClientRect().width),
    };
  });
  await page.close();
  assert.ok(result.widths.length >= 6, `expected visible comparison cards, found ${result.widths.length}`);
  for (const w of result.widths) {
    assert.ok(w >= result.viewport * 0.9, `row is ${Math.round(w)}px, under 90% of ${result.viewport}px`);
  }
  assert.equal(result.tableVisible, false, "desktop table should be hidden on mobile");
  assert.ok(result.scrollWidth <= result.viewport, `horizontal scroll: ${result.scrollWidth}px > ${result.viewport}px`);
});

test("pitch technical details are collapsed by default and open to full-width cards", { skip: !chromePath && "Chrome not found" }, async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${ORIGIN}/pitch/`, { waitUntil: "load" });
  const hiddenBefore = await page.locator("[data-technical] [data-compare-row]").first().isVisible();
  await page.locator("[data-technical] summary").click();
  const r = await page.evaluate(() => ({
    vw: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    widths: [...document.querySelectorAll("[data-technical] [data-compare-row]")].map((el) => el.getBoundingClientRect().width),
    text: document.querySelector("[data-technical]").innerText,
  }));
  await page.close();
  assert.equal(hiddenBefore, false, "technical rows should start collapsed");
  for (const k of ["Homepage title", "Meta description", "H1 heading", "Business schema", "llms.txt"]) assert.ok(r.text.includes(k), `technical details missing ${k}`);
  for (const w of r.widths) assert.ok(w >= r.vw * 0.85, `technical card is ${Math.round(w)}px at ${r.vw}px`);
  assert.ok(r.scrollWidth <= r.vw, "horizontal scroll with technical details open");
});

test("pitch before/after shots and pricing cards hold up at 320 to 430px", { skip: !chromePath && "Chrome not found" }, async () => {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto(`${ORIGIN}/pitch/`, { waitUntil: "load" });
    const r = await page.evaluate(() => ({
      shots: [...document.querySelectorAll("[data-before-after] img")].map((img) => ({ w: img.getBoundingClientRect().width, ok: img.complete && img.naturalWidth > 0 })),
      scrollWidth: document.documentElement.scrollWidth,
    }));
    await page.close();
    assert.equal(r.shots.length, 4, "two desktop and two mobile screenshots");
    assert.ok(r.shots.every((s) => s.ok), `a before/after image failed to load at ${width}px`);
    assert.ok(r.scrollWidth <= width, `horizontal scroll at ${width}px`);
  }
  const desk = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await desk.goto(`${ORIGIN}/pitch/`, { waitUntil: "load" });
  const plans = await desk.evaluate(() => [...document.querySelectorAll("[data-plan]")].map((el) => ({ h: el.getBoundingClientRect().height, bullets: el.querySelectorAll("ul li").length })));
  const shotsSideBySide = await desk.evaluate(() => {
    const figs = [...document.querySelectorAll("[data-before-after] > figure")].map((f) => f.getBoundingClientRect());
    return figs.length === 2 && Math.abs(figs[0].top - figs[1].top) < 2 && figs[0].right <= figs[1].left;
  });
  await desk.close();
  assert.ok(shotsSideBySide, "before/after should sit side by side on desktop");
  assert.equal(plans.length, 3);
  for (const p of plans) assert.ok(p.bullets >= 3 && p.bullets <= 4, `each plan needs 3 to 4 bullets, found ${p.bullets}`);
  assert.ok(Math.max(...plans.map((p) => p.h)) - Math.min(...plans.map((p) => p.h)) < 2, "plan cards should be equal height");
});

test("homepage H1 sets in 3 lines across desktop widths", { skip: !chromePath && "Chrome not found" }, async () => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
  for (const width of [1024, 1152, 1280, 1366, 1440, 1536, 1680, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.reload({ waitUntil: "load" });
    const lines = await page.evaluate(async () => {
      await document.fonts.ready;
      const range = document.createRange();
      range.selectNodeContents(document.querySelector("h1"));
      return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
    });
    assert.equal(lines, 3, `H1 wraps to ${lines} lines at ${width}px`);
  }
  await ctx.close();
});

test("desktop header nav never wraps from 1024 to 1920px", { skip: !chromePath && "Chrome not found" }, async () => {
  for (const width of [1024, 1152, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
    const wrapped = await page.evaluate(() =>
      [...document.querySelectorAll('header nav[aria-label="Main"] a, header a[href^="tel:"]')]
        .filter((a) => a.checkVisibility())
        .filter((a) => {
          const range = document.createRange();
          range.selectNodeContents(a);
          return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size > 1;
        })
        .map((a) => a.textContent.trim()),
    );
    await page.close();
    assert.deepEqual(wrapped, [], `header items wrap at ${width}px`);
  }
});

test("tap targets are at least 44px on mobile (inline links in sentences excepted)", { skip: !chromePath && "Chrome not found" }, async () => {
  const failures = [];
  for (const path of pages) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "load" });
    if (path === "/residents/" || path === "/services/") await page.waitForTimeout(50);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("header a, header button, main a, main button, main summary, footer a, footer button")]
        .filter((el) => el.checkVisibility())
        .filter((el) => !el.closest("p, blockquote, figcaption, [data-demo-ribbon], .foh-pill"))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 2 && r.height > 2)
        .filter(({ r }) => r.height < 44 || r.width < 44)
        .map(({ el, r }) => `${el.textContent.trim().slice(0, 40) || el.getAttribute("aria-label")} (${Math.round(r.width)}x${Math.round(r.height)})`),
    );
    if (small.length) failures.push(`${path}: ${small.join("; ")}`);
    await page.close();
  }
  assert.deepEqual(failures, [], `targets under 44px:\n${failures.join("\n")}`);
});

test("hero kicker contrast is at least 4.5:1 on the lightest hero background", { skip: !chromePath && "Chrome not found" }, async () => {
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle" });
  const kicker = page.locator('section[aria-labelledby="hero-title"] .kicker');
  await kicker.waitFor();
  const rgb = await kicker.evaluate((el) => getComputedStyle(el).color);
  await page.close();
  const lum = (c) => {
    const [r, g, b] = c.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const fg = rgb.match(/\d+/g).slice(0, 3).map(Number);
  const lightest = [0xf4, 0xdb, 0xb8];
  const ratio = (lum(lightest) + 0.05) / (lum(fg) + 0.05);
  assert.ok(ratio >= 4.5, `kicker ${rgb} has contrast ${ratio.toFixed(2)}:1 against #f4dbb8`);
});

test("phones get the 480px card images", { skip: !chromePath && "Chrome not found" }, async () => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/st-george/`, { waitUntil: "load" });
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await page.waitForFunction(() => [...document.querySelectorAll("main ul img")].every((i) => i.complete && i.currentSrc));
  const srcs = await page.evaluate(() => [...document.querySelectorAll("main ul img")].map((i) => i.currentSrc));
  await page.close();
  assert.ok(srcs.length >= 3);
  for (const src of srcs) assert.match(src, /-480\./, `card served ${src}`);
});

test("pitch comparison uses the table on desktop with sensible columns", { skip: !chromePath && "Chrome not found" }, async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${ORIGIN}/pitch/`, { waitUntil: "load" });
  const cols = await page.evaluate(() => {
    const table = document.querySelector("table");
    const cells = [...table.querySelectorAll("thead th")].map((th) => th.getBoundingClientRect().width);
    return { visible: !!table.offsetParent, tableWidth: table.getBoundingClientRect().width, cells };
  });
  await page.close();
  assert.ok(cols.visible, "table should be visible on desktop");
  assert.ok(cols.cells[0] >= 150, `area column too narrow: ${cols.cells[0]}px`);
  assert.ok(cols.cells[1] >= cols.tableWidth * 0.3 && cols.cells[2] >= cols.tableWidth * 0.3, `content columns: ${cols.cells}`);
});

const PILL_KEY = "foh-demo-pill";
const LEGACY_KEY = "foh-demo-ribbon";

async function ribbonBoxes(page) {
  return page.evaluate(() => {
    const box = (el) => (el && el.checkVisibility() ? el.getBoundingClientRect().toJSON() : null);
    return {
      vw: window.innerWidth,
      full: box(document.querySelector(".foh-pill--full")),
      tab: box(document.querySelector(".foh-pill--tab")),
      cta: box(document.querySelector(".foh-pill--full [data-pitch-cta]")),
      minimize: box(document.querySelector("[data-foh-pill-minimize]")),
      expand: box(document.querySelector("[data-foh-pill-expand]")),
      ctaMini: box(document.querySelector(".foh-pill--tab [data-pitch-cta]")),
      count: document.querySelectorAll(".foh-pill").length,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
}

test("demo pill fits 320 to 430px with 48px tap targets in both states", { skip: !chromePath && "Chrome not found" }, async () => {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
    const r = await ribbonBoxes(page);
    assert.ok(r.full && !r.tab, `full pill should show by default at ${width}px`);
    assert.ok(r.full.left >= 0 && r.full.right <= r.vw, `pill overflows at ${width}px`);
    assert.ok(r.cta.height >= 48 && r.cta.width >= 48, `Pitch target under 48px at ${width}px`);
    assert.ok(r.minimize.height >= 48 && r.minimize.width >= 48, `minimize target under 48px at ${width}px`);
    assert.ok(r.cta.right <= r.full.right && r.minimize.right <= r.full.right, `controls spill out of the pill at ${width}px`);
    assert.ok(r.scrollWidth <= width, `horizontal scroll at ${width}px`);

    await page.getByRole("button", { name: "Minimize demo banner" }).click();
    const m = await ribbonBoxes(page);
    assert.ok(m.tab && !m.full, `tab should replace the pill at ${width}px`);
    assert.ok(m.tab.left >= 0 && m.tab.right <= m.vw, `tab overflows at ${width}px`);
    assert.ok(m.expand.height >= 48 && m.ctaMini.height >= 48 && m.ctaMini.width >= 48, `tab targets under 48px at ${width}px`);
    assert.ok(Math.abs(m.tab.left - r.full.left) < 1 && Math.abs(m.tab.bottom - r.full.bottom) < 1, "tab should sit in the same corner");
    await ctx.close();
  }
});

test("demo pill cannot be removed, only minimized and expanded, and the state persists", { skip: !chromePath && "Chrome not found" }, async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: "load" });

  const removeControls = await page.locator("[data-demo-ribbon] button, [data-demo-ribbon] a").evaluateAll((els) =>
    els.map((el) => el.getAttribute("aria-label") || el.textContent).filter((l) => /dismiss|close|remove|hide/i.test(l ?? "")),
  );
  assert.deepEqual(removeControls, [], "no control may remove the pill");

  await page.evaluate((key) => localStorage.setItem(key, "off"), LEGACY_KEY);
  await page.reload({ waitUntil: "load" });
  let legacy = await ribbonBoxes(page);
  assert.ok(legacy.tab && !legacy.full, "a legacy dismissal must only minimize the pill, never hide it");
  await page.getByRole("button", { name: /^Expand demo banner/ }).click();
  await page.evaluate((key) => localStorage.removeItem(key), LEGACY_KEY);
  assert.equal((await ribbonBoxes(page)).count, 2, "exactly one pill (full and tab variants) per page");

  await page.getByRole("button", { name: "Minimize demo banner" }).click();
  await page.waitForFunction(() => document.activeElement?.hasAttribute("data-foh-pill-expand"), null, { timeout: 2000 });
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), PILL_KEY), "min");
  assert.match(await page.locator(".foh-pill--tab").innerText(), /FOH Demo/);

  await page.reload({ waitUntil: "load" });
  let r = await ribbonBoxes(page);
  assert.ok(r.tab && !r.full, "minimized state should persist across reloads");
  await page.goto(`${ORIGIN}/services/`, { waitUntil: "load" });
  r = await ribbonBoxes(page);
  assert.ok(r.tab && !r.full, "minimized state should persist across pages");

  await page.getByRole("button", { name: /^Expand demo banner/ }).click();
  r = await ribbonBoxes(page);
  assert.ok(r.full && !r.tab, "expanding should restore the full pill");
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), PILL_KEY), "open");
  assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute("data-foh-pill-minimize")), true);
  await page.reload({ waitUntil: "load" });
  assert.ok((await ribbonBoxes(page)).full, "expanded state should persist across reloads");

  for (const path of ["/", "/pitch/", "/es/"]) {
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "load" });
    assert.equal(await page.locator(".foh-pill").count(), 2, `pill must be rendered once on ${path}`);
  }
  await ctx.close();
});

test("Pitch nudges in both states, pauses on hover and focus, and stops under reduced motion", { skip: !chromePath && "Chrome not found" }, async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
  const style = (sel) => page.locator(sel).evaluate((el) => {
    const cs = getComputedStyle(el);
    return { name: cs.animationName, duration: cs.animationDuration, state: cs.animationPlayState };
  });
  const full = ".foh-pill--full [data-pitch-cta]";
  const running = await style(full);
  assert.equal(running.name, "foh-nudge");
  assert.equal(running.duration, "4s");
  assert.equal(running.state, "running");
  await page.locator(full).hover();
  assert.equal((await style(full)).state, "paused", "should pause on hover");
  await page.mouse.move(5, 5);
  await page.locator(full).focus();
  assert.equal((await style(full)).state, "paused", "should pause on focus");
  await page.locator(full).blur();

  await page.getByRole("button", { name: "Minimize demo banner" }).click();
  await page.waitForFunction(() => document.activeElement?.matches("[data-foh-pill-expand]"), null, { timeout: 2000 });
  await page.locator("[data-foh-pill-expand]").blur();
  await page.mouse.move(5, 5);
  const mini = await style(".foh-pill--tab [data-pitch-cta]");
  assert.equal(mini.name, "foh-nudge", "tab Pitch arrow should nudge too");
  assert.equal(mini.state, "running");
  await ctx.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const rp = await reduced.newPage();
  await rp.goto(`${ORIGIN}/`, { waitUntil: "load" });
  const name = await rp.locator(".foh-pill--full [data-pitch-cta]").evaluate((el) => getComputedStyle(el).animationName);
  await reduced.close();
  assert.equal(name, "none", "animation must be off under prefers-reduced-motion");
});

for (const path of pages) {
  test(`${path}: no horizontal overflow from 320 to 430px`, { skip: !chromePath && "Chrome not found" }, async () => {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(`${ORIGIN}${path}`, { waitUntil: "load" });
      const { scrollWidth, offenders } = await page.evaluate(() => {
        const vw = window.innerWidth;
        const clippedInside = (el) => {
          for (let a = el.parentElement; a; a = a.parentElement) {
            const ox = getComputedStyle(a).overflowX;
            if (ox === "hidden" || ox === "clip") {
              const r = a.getBoundingClientRect();
              return r.left >= -1 && r.right <= vw + 1;
            }
          }
          return false;
        };
        const offenders = [...document.querySelectorAll("main *, header *, footer *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const outside = r.width > 0 && (r.right > vw + 1 || r.left < -1);
            return outside && !el.closest("[data-demo-ribbon]") && !clippedInside(el);
          })
          .slice(0, 3)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
        return { scrollWidth: document.documentElement.scrollWidth, offenders };
      });
      await page.close();
      assert.ok(scrollWidth <= width, `${path} at ${width}px scrolls horizontally (${scrollWidth}px): ${offenders.join(", ")}`);
      assert.equal(offenders.length, 0, `${path} at ${width}px has elements past the edge: ${offenders.join(", ")}`);
    }
  });
}
