// One-time conversion of the original photos from utah1st.com into web-sized WebP.
// Run with: node scripts/optimize-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const src = new URL("./source-assets/", import.meta.url);
const out = new URL("../src/assets/photos/", import.meta.url);
await mkdir(out, { recursive: true });

const jobs = [
  ["House_Pic.jpg", "modern-farmhouse", 1200],
  ["House_Pic.jpg", "modern-farmhouse-800", 800],
  ["1739386811779blob-91381d93.png", "home-stucco-tile-roof", 900],
  ["Building_Pic.jpg", "townhomes-palm", 900],
  ["20231005_121909.jpg", "duplex-two-garages", 900],
  ["Desert_Reserve.jpg", "home-dark-garage", 900],
  ["Padre_Lakes_Picture.jpg", "building-arched-entry", 900],
  ["Entrance-6.jpg", "community-sign-palms-lava", 900],
  ["IMG_7844.jpg", "community-sign-brick", 900],
  ["Sagewood_pic.jpg", "community-sign-sagewood", 900],
];

for (const [file, name, width] of jobs) {
  const info = await sharp(new URL(file, src).pathname)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 55, effort: 6 })
    .toFile(new URL(`${name}.webp`, out).pathname);
  console.log(name, info.width, info.height, info.size);
}

// 480px variants so cards on phones are not served 900px files.
for (const [file, name] of [
  ["Building_Pic.jpg", "townhomes-palm"],
  ["20231005_121909.jpg", "duplex-two-garages"],
  ["Desert_Reserve.jpg", "home-dark-garage"],
  ["Padre_Lakes_Picture.jpg", "building-arched-entry"],
  ["Entrance-6.jpg", "community-sign-palms-lava"],
  ["IMG_7844.jpg", "community-sign-brick"],
  ["Sagewood_pic.jpg", "community-sign-sagewood"],
  ["1739386811779blob-91381d93.png", "home-stucco-tile-roof"],
]) {
  const info = await sharp(new URL(file, src).pathname)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 55, effort: 6 })
    .toFile(new URL(`${name}-480.webp`, out).pathname);
  console.log(`${name}-480`, info.width, info.height, info.size);
}

// Header logo: transparent WebP at 2x its 149px display width.
{
  const info = await sharp(new URL("output-onlinepngtools-1920w-378w.png", src).pathname)
    .resize({ width: 320 })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(new URL("logo-utah-first-header.webp", out).pathname);
  console.log("logo-utah-first-header", info.width, info.height, info.size);
}

// Open Graph image and schema logo live in /public so they keep stable URLs.
const pub = new URL("../public/og/", import.meta.url);
await mkdir(pub, { recursive: true });
await sharp(new URL("House_Pic.jpg", src).pathname)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(new URL("utah-first-og.jpg", pub).pathname);
await sharp(new URL("logo-300x121-300x121.png", src).pathname)
  .png({ compressionLevel: 9 })
  .toFile(new URL("utah-first-logo.png", pub).pathname);
