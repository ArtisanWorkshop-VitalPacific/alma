import manifest from "./images.json";

export type PhotoName = keyof typeof manifest;

export type Photo = {
  src: string;
  width: number;
  height: number;
  /** A tiny blurred preview. Cutouts and logos have none. */
  blurDataURL?: string;
};

function photo(name: PhotoName): Photo {
  const entry = manifest[name] as {
    file: string;
    width: number;
    height: number;
    blur?: string;
  };
  return {
    src: `/images/${entry.file}`,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur,
  };
}

/**
 * Every image on the site, by name. scripts/fetch-images.mjs places the
 * files in public/images before each build. Sources and credits are recorded
 * in images.json.
 *
 * hero, proof, notebook: generated in Higgsfield.
 * biolaBellTower, biolaLibrary: from Biola University's press room. They
 *   appear only in the "Our story" section and need Biola's permission before
 *   the site is public.
 * biolaLogo: Biola University's logo, as served on biola.edu. Optional: see
 *   src/content/partner-logo.ts. Biola's approval is needed before the site
 *   is public.
 * portrait1 to portrait7: stock portraits from Unsplash. They are shown with a
 *   group label only, never with a name, a quote or a story.
 */
export const photos = Object.fromEntries(
  (Object.keys(manifest) as PhotoName[]).map((name) => [name, photo(name)]),
) as Record<PhotoName, Photo>;
