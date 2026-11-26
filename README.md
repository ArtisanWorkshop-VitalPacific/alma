# Alma

Marketing site for Alma: alumni storytelling for Christian universities, led by journalist Tom Pfingsten.

One page. Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Deployed on Vercel from the `main` branch.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # downloads the photographs, then builds
```

## Where things live

| What | Where |
| --- | --- |
| Copy, prices, steps, FAQ, Biola partnership facts | `src/content/site.ts` |
| Section headlines and layout | `src/components/*.tsx` |
| Colors, type scale, spacing, motion | `src/app/globals.css` (mirrored in `design/tokens.json`) |
| Photograph list and source links | `src/content/images.json` |
| Fonts (Newsreader, Geist, both open licence) | `src/fonts/` |
| Favicon, Apple icon, social share image | `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.png` |

## Settings (Vercel environment variables)

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The address the "Send your lead" form emails. Empty until set. |
| `SITE_INDEXABLE` | Set to `true` at launch. Until then the site tells search engines not to index it. |
| `NEXT_PUBLIC_SITE_URL` | The live address, for example `https://example.com`. Used for share links. |

## Photographs

The four photographs were generated in Higgsfield. They are not in the repo yet.
`scripts/fetch-images.mjs` downloads them into `public/images` before each build,
using the links in `src/content/images.json`. A build on Vercel stops if one is missing.

To make the repo self-contained, save the four files into `public/images` as
`cover.jpg`, `interview-zoom.jpg`, `proof.jpg`, and `quad.jpg`, delete the
`/public/images/*.jpg` line from `.gitignore`, and commit them. The script then
skips the download.

## Before launch

- Set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Connect the domain in Vercel and set `NEXT_PUBLIC_SITE_URL`.
- Set `SITE_INDEXABLE` to `true`.
- Commit the photographs (see above).
- The About section has no portrait. Add a real photograph of Tom when one is available.
- The wordmark is set in type. Replace it when a logo exists.

## Honest-content rules for this site

- No invented testimonials, client logos, alumni names, or story excerpts. Mock-ups draw running text as bars.
- Biola University is named in text only. No Biola logo is used.
- "Zero AI writing" describes the stories Alma delivers.
