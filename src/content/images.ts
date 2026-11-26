import manifest from "./images.json";

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

function photo(name: keyof typeof manifest): Photo {
  const entry = manifest[name];
  return {
    src: `/images/${entry.file}`,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur,
  };
}

/**
 * The four photographs on the site. All were generated in Higgsfield.
 * scripts/fetch-images.mjs places them in public/images before each build.
 */
export const photos = {
  /** Sunlit campus arcade. Hero cover and the magazine and social mock-ups. */
  cover: photo("cover"),
  /** Interview table with notebook and recorder. How it works. */
  interview: photo("interview"),
  /** Marked-up manuscript pages. The standard. */
  proof: photo("proof"),
  /** Academic hall at blue hour. Closing section. */
  quad: photo("quad"),
};
