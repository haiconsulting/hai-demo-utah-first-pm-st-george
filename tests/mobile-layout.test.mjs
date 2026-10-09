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
    const rows = [...document.querySelectorAll("[data-compare-row]")].filter((el) => el.offsetParent !== null);
    return {
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      tableVisible: !!document.querySelector("table")?.offsetParent,
      widths: rows.map((r) => r.getBoundingClientRect().width),
    };
  });
  await page.close();
  assert.ok(result.widths.length >= 10, `expected visible comparison cards, found ${result.widths.length}`);
  for (const w of result.widths) {
    assert.ok(w >= result.viewport * 0.9, `row is ${Math.round(w)}px, under 90% of ${result.viewport}px`);
  }
  assert.equal(result.tableVisible, false, "desktop table should be hidden on mobile");
  assert.ok(result.scrollWidth <= result.viewport, `horizontal scroll: ${result.scrollWidth}px > ${result.viewport}px`);
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

const RIBBON_KEY = "foh-demo-ribbon";

async function ribbonBoxes(page) {
  return page.evaluate(() => {
    const box = (el) => (el && el.checkVisibility() ? el.getBoundingClientRect().toJSON() : null);
    return {
      vw: window.innerWidth,
      full: box(document.querySelector("[data-ribbon-full]")),
      tab: box(document.querySelector("[data-ribbon-tab]")),
      cta: box(document.querySelector("[data-pitch-cta]")),
      minimize: box(document.querySelector("[data-ribbon-minimize]")),
      expand: box(document.querySelector("[data-ribbon-expand]")),
      ctaMini: box(document.querySelector("[data-pitch-cta-mini]")),
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

  await page.evaluate((key) => localStorage.setItem(key, "off"), RIBBON_KEY);
  await page.reload({ waitUntil: "load" });
  assert.ok((await ribbonBoxes(page)).full, "a stale 'off' value must not hide the pill");

  await page.getByRole("button", { name: "Minimize demo banner" }).click();
  await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Expand demo banner", null, { timeout: 2000 });
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), RIBBON_KEY), "min");
  assert.match(await page.locator("[data-ribbon-tab]").innerText(), /FOH Demo/);

  await page.reload({ waitUntil: "load" });
  let r = await ribbonBoxes(page);
  assert.ok(r.tab && !r.full, "minimized state should persist across reloads");
  await page.goto(`${ORIGIN}/services/`, { waitUntil: "load" });
  r = await ribbonBoxes(page);
  assert.ok(r.tab && !r.full, "minimized state should persist across pages");

  await page.getByRole("button", { name: "Expand demo banner" }).click();
  r = await ribbonBoxes(page);
  assert.ok(r.full && !r.tab, "expanding should restore the full pill");
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), RIBBON_KEY), null);
  await page.reload({ waitUntil: "load" });
  assert.ok((await ribbonBoxes(page)).full, "expanded state should persist across reloads");

  for (const path of ["/", "/pitch/"]) {
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "load" });
    const present = await page.locator("[data-demo-ribbon]").count();
    if (path === "/") assert.equal(present, 1, "pill must be on the site pages");
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
  const running = await style("[data-pitch-cta]");
  assert.equal(running.name, "foh-nudge");
  assert.equal(running.duration, "4s");
  assert.equal(running.state, "running");
  await page.locator("[data-pitch-cta]").hover();
  assert.equal((await style("[data-pitch-cta]")).state, "paused", "should pause on hover");
  await page.mouse.move(5, 5);
  await page.locator("[data-pitch-cta]").focus();
  assert.equal((await style("[data-pitch-cta]")).state, "paused", "should pause on focus");
  await page.locator("[data-pitch-cta]").blur();

  await page.getByRole("button", { name: "Minimize demo banner" }).click();
  await page.waitForFunction(() => document.activeElement?.matches("[data-ribbon-expand]"), null, { timeout: 2000 });
  await page.locator("[data-ribbon-expand]").blur();
  await page.mouse.move(5, 5);
  const mini = await style("[data-pitch-cta-mini]");
  assert.equal(mini.name, "foh-nudge", "tab Pitch arrow should nudge too");
  assert.equal(mini.state, "running");
  await ctx.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const rp = await reduced.newPage();
  await rp.goto(`${ORIGIN}/`, { waitUntil: "load" });
  const name = await rp.locator("[data-pitch-cta]").evaluate((el) => getComputedStyle(el).animationName);
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
