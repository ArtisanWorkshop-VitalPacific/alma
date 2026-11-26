import type { MetadataRoute } from "next";

// Search engines are kept out until SITE_INDEXABLE is set to "true" in Vercel.
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === "true";

  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
  };
}
