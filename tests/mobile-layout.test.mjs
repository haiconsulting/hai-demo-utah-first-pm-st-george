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
