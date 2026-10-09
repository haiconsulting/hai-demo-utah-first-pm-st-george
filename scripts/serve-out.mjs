// Serves the static export in out/ under NEXT_PUBLIC_BASE_PATH, the same way GitHub Pages does.
// Usage: NEXT_PUBLIC_BASE_PATH=/hai-demo-utah-first-pm-st-george PORT=4317 node scripts/serve-out.mjs
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = new URL("../out/", import.meta.url).pathname;
const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const port = Number(process.env.PORT ?? 4317);
const host = process.env.HOST ?? "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

async function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safe);
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (base && url.pathname === "/") {
    res.writeHead(302, { Location: `${base}/` });
    return res.end();
  }
  if (base && !url.pathname.startsWith(`${base}/`) && url.pathname !== base) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end(`Not under base path ${base}`);
  }
  const rel = base ? url.pathname.slice(base.length) || "/" : url.pathname;
  if (!rel.endsWith("/") && !extname(rel)) {
    res.writeHead(301, { Location: `${base}${rel}/${url.search}` });
    return res.end();
  }
  const file = await resolveFile(rel);
  if (!file) {
    res.writeHead(404, { "Content-Type": types[".html"] });
    return createReadStream(join(root, "404.html")).pipe(res);
  }
  const type = types[extname(file)] ?? "application/octet-stream";
  const compressible = /text|javascript|json|xml|svg/.test(type);
  const gzip = compressible && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": file.includes("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    ...(gzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
  });
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}).listen(port, host, () => {
  console.log(`Serving out/ at http://${host}:${port}${base}/`);
});
