// Puts the site's photographs in public/images before a build.
//
// The photographs are listed in src/content/images.json with their sources
// and credits. A file that already exists in public/images is left alone, so
// committing the images there makes the repo self-contained and this script
// becomes a no-op.
//
// An entry with "resize" is scaled down to that width after it is downloaded,
// so the site never republishes someone else's full-resolution original.

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images");
const manifest = JSON.parse(
  await readFile(path.join(root, "src", "content", "images.json"), "utf8"),
);

// On Vercel a missing photograph must stop the build. Locally it only warns.
const strict = process.env.VERCEL === "1" || process.env.CI === "true";

// sharp is installed with Next.js. If it is missing, files are saved as downloaded.
let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("images: sharp is not available, so nothing will be resized");
}

await mkdir(outDir, { recursive: true });

const missing = [];

for (const [name, image] of Object.entries(manifest)) {
  const target = path.join(outDir, image.file);

  try {
    await access(target);
    console.log(`images: ${image.file} already present`);
    continue;
  } catch {
    // Not on disk yet. Download it.
  }

  try {
    const response = await fetch(image.source, {
      headers: {
        accept: "image/jpeg,image/*;q=0.8",
        "user-agent": "Mozilla/5.0 (compatible; alma-site-build)",
      },
      signal: AbortSignal.timeout(90_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    let bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 10_000) throw new Error("file is unexpectedly small");

    if (image.resize && sharp) {
      bytes = await sharp(bytes)
        .rotate()
        .resize({ width: image.resize, withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer();
    }

    await writeFile(target, bytes);
    console.log(
      `images: downloaded ${image.file} (${Math.round(bytes.length / 1024)} KB)`,
    );
  } catch (error) {
    missing.push(name);
    console.warn(`images: could not download ${image.file}: ${error.message}`);
  }
}

if (missing.length > 0) {
  const message = `images: ${missing.length} photograph(s) missing: ${missing.join(", ")}. Add them to public/images or check the source links in src/content/images.json.`;
  if (strict) {
    console.error(message);
    process.exit(1);
  }
  console.warn(message);
}
