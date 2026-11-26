import manifest from "./images.json";

export type PhotoName = keyof typeof manifest;

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

function photo(name: PhotoName): Photo {
  const entry = manifest[name];
  return {
    src: `/images/${entry.file}`,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur,
  };
}

/**
 * Every photograph on the site, by name. scripts/fetch-images.mjs places the
 * files in public/images before each build. Sources and credits are recorded
 * in images.json.
 *
 * cover, proof, quad: generated in Higgsfield.
 * biolaBellTower, biolaLibrary: from Biola University's press room. They
 *   appear only in the partnership section and need Biola's permission before
 *   the site is public.
 * portrait1 to portrait7: stock portraits from Unsplash. They are illustrative
 *   and are never shown with a name.
 */
export const photos = Object.fromEntries(
  (Object.keys(manifest) as PhotoName[]).map((name) => [name, photo(name)]),
) as Record<PhotoName, Photo>;
