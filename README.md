# Alma

Marketing site for Alma: an editorial studio and story library for universities.
Alma's journalists report and write profiles of a university's alumni, faculty,
staff and friends, and keep them in a searchable story library.

One page. Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Deployed on Vercel
from the `main` branch.

This repo is the marketing site only. The story library itself (the searchable
product the site describes) is not in this repo yet.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # downloads the photographs, then builds
```

## Where things live

| What | Where |
| --- | --- |
| All copy: headings, reasons, library panels, fees, questions | `src/content/site.ts` |
| Section layout | `src/components/*.tsx` |
| Colors, type scale, spacing, motion | `src/app/globals.css` (mirrored in `design/tokens.json`) |
| Photograph list, sources and credits | `src/content/images.json` |
| Fonts (Newsreader, Geist, both open licence) | `src/fonts/` |
| Favicon, Apple icon, social share image | `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.png` |

## Voice

The copy is written for senior university staff. The rules are at the top of
`src/content/site.ts`. In short:

- Full, measured sentences in the institutional "we". No slogans.
- No journalist is named. Experience is stated as the team's.
- A profile documents a person's career and contribution. The site never asks
  "where are they now".
- "Story library", not "repository". In a university, "institutional repository"
  already means the library's archive of scholarly work.
- "Alumni, faculty, staff and friends" in that order.
- The search is described accurately: retrieval-augmented generation (RAG),
  semantic search, metadata, citations.
- No em dashes.

## Settings (Vercel environment variables)

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The address the contact form emails. Empty until set. |
| `SITE_INDEXABLE` | Set to `true` at launch. Until then the site tells search engines not to index it. |
| `NEXT_PUBLIC_SITE_URL` | The live address, for example `https://example.com`. Used for share links. |

## Photographs

No photograph is stored in the repo. `scripts/fetch-images.mjs` downloads each one
into `public/images` before a build, using the links in `src/content/images.json`.
A build on Vercel stops if one is missing.

| Photographs | Source | Status |
| --- | --- | --- |
| `cover`, `proof`, `quad` | Generated in Higgsfield | Illustrative |
| `biola-bell-tower`, `biola-library` | Biola University press room stock photos | Need Biola's permission before launch. Scaled down to 2400px wide at build time. Used only in the partnership section, credited to Biola. |
| `portrait-1` to `portrait-7` | Unsplash (photographers are listed in `images.json`) | Illustrative. The free Unsplash licence does not include model releases. Replace with released or real portraits before launch. |

To make the repo self-contained, save the files into `public/images` under the
names in `images.json`, delete the `/public/images/*.jpg` line from `.gitignore`,
and commit them. The script then skips the download.

## Before launch

- Set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Connect the domain in Vercel and set `NEXT_PUBLIC_SITE_URL`.
- Set `SITE_INDEXABLE` to `true`.
- Get Biola's written permission for the two campus photographs, or replace them.
- Replace the stock portraits with released photographs, or with real portraits
  of people Alma has profiled, with their permission.
- The site describes the story library as part of the service. It must exist
  before the site is public, or the copy must say that it is forthcoming.
- Confirm the documentary claim ("Emmy Award-winning documentary producers")
  with the producers who will be named if a university asks.
- The wordmark is set in type. Replace it when a logo exists.

## Honest-content rules for this site

- No invented testimonials, client logos, names, quotes or story excerpts.
  Interface drawings show names and running text as bars.
- The library panels are labelled as illustrations with sample data.
- Stock portraits appear only beside a general label such as "Alumni", and the
  page says that they are illustrative.
- Biola University is named in text only. No Biola logo is used.
- "No part of a profile is drafted by a language model" describes the profiles
  Alma delivers. The library's search does use a language model, and the site
  says so.
