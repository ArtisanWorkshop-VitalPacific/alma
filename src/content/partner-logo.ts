import { existsSync } from "node:fs";
import path from "node:path";
import manifest from "./images.json";
import { caseStudy } from "./site";

/**
 * Biola University's logo for the case-study strip and the "Our story" card.
 *
 * Returns null when caseStudy.logo.show is false in site.ts, or when the file
 * is not in public/images. The components then set the university's name in
 * text instead. Server components only: it reads the file system at build time.
 *
 * Biola's logo rules, followed in the components and in globals.css:
 * the two-colour logo on a white surface, never inside a shape, never
 * recoloured or distorted, at least 96px wide, with clear space of half the
 * circle mark's height on every side.
 * https://www.biola.edu/brand/toolkits-standards/logos
 */
export function partnerLogo() {
  if (!caseStudy.logo.show) return null;

  const entry = manifest.biolaLogo;
  const file = path.join(process.cwd(), "public", "images", entry.file);
  if (!existsSync(file)) return null;

  return {
    src: `/images/${entry.file}`,
    width: entry.width,
    height: entry.height,
    alt: caseStudy.logo.alt,
  };
}
