# Alma

Marketing site for Alma: an editorial studio and story library for universities.
Alma's journalists report and write profiles of a university's alumni, adjuncts,
professors, staff and friends, and keep them in a searchable story library.

One page. Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Deployed on Vercel
from the `main` branch.

This repo holds the marketing site and the database schema for the story library.
The library's own screens are not built yet. See "Story library backend" below.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # downloads the images, then builds
```

## Design

The look follows the design system recorded from https://www.sectionai.com/ on
2026-11-26, at Matt's request: a geometric sans for headings and text, a serif
for small labels, white and warm off-white bands, near-black pill buttons, one
accent, an amber accent on the dark closing band, and torn-paper edges.
The measured values are in `design/tokens.json`, with a list of what was
matched, what was substituted and what was not copied.

- Typefaces: DM Sans stands in for Goga, and Newsreader for Azurio. Both of
  Section's faces are commercial. If Alma licenses them, change `src/app/fonts.ts`.
- Nothing of Section's own was copied: no logo, illustration, photograph, icon,
  paper texture, copy or font file. The hero illustration and the notebook were
  generated in Higgsfield. The torn edges are drawn in `src/components/Torn.tsx`.
- The accent is forest green, `#235b2c`, not the reference site's blue (Matt,
  2026-11-26: no blue on the site). It is set once, as `--color-alma` in
  `src/app/globals.css`, and every tint is mixed from it. The only blue left
  is the sky in the hero illustration and the fill behind it.
- The voice is Alma's, not Section's: full, measured sentences.
- The hero's motion is written with GSAP (`gsap`, `@gsap/react`, both under
  GreenSock's standard no-charge licence) in `src/components/Hero.tsx`: the
  picture settles from a slight zoom, the title rises line by line, the
  picture moves in as the page scrolls and leans a few pixels away from the
  cursor. None of it runs when the visitor asks for reduced motion, and the
  page reads the same without JavaScript.
- The earlier design (serif headings, a label column beside each section) is
  kept on the branch `v1-prospectus`.

## Where things live

| What | Where |
| --- | --- |
| All copy: headings, reasons, library panels, fees, questions | `src/content/site.ts` |
| Section layout | `src/components/*.tsx` |
| Colors, type scale, spacing, motion | `src/app/globals.css` (mirrored in `design/tokens.json`) |
| Image list, sources and credits | `src/content/images.json` |
| The Biola case-study strip and logo switch | `caseStudy` in `src/content/site.ts`, `src/content/partner-logo.ts` |
| Fonts (DM Sans, Newsreader, both open licence) | `src/fonts/` |
| Favicon, Apple icon, social share image | `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.png` |

## Voice

The copy is written for senior university staff. The rules are at the top of
`src/content/site.ts`. In short:

- Full, measured sentences in the institutional "we". No slogans.
- The work is described without naming a journalist. Tom Pfingsten is named in
  one place only: the "Our story" section, with the Biola partnership.
- A profile documents a person's career and contribution. The site never asks
  "where are they now".
- "Story library", not "repository". In a university, "institutional repository"
  already means the library's archive of scholarly work.
- Never give a count of the stories written for Biola University.
- Say "alumni engagement", never "alumni relations".
- Say "adjuncts and professors", never "faculty". In a running list: "alumni,
  adjuncts, professors, staff and friends". As a label: "Adjuncts and professors".
- The search is described accurately: retrieval-augmented generation (RAG),
  semantic search, metadata, citations.
- No em dashes.

## Settings (Vercel environment variables)

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The address the contact form emails. Empty until set. |
| `SITE_INDEXABLE` | Set to `true` at launch. Until then the site tells search engines not to index it. |
| `NEXT_PUBLIC_SITE_URL` | The live address, for example `https://example.com`. Used for share links. |

## Images

No image is stored in the repo. `scripts/fetch-images.mjs` downloads each one
into `public/images` before a build, using the links in `src/content/images.json`.
A build on Vercel stops if one is missing, unless its entry is marked optional.

| Images | Source | Status |
| --- | --- | --- |
| `hero`, `proof`, `notebook` | Generated in Higgsfield | Illustrative. `hero` is the illustration behind the page title. `notebook` is a transparent cutout in the closing band. |
| `biola-logo` | Biola University's logo, as served on biola.edu | Optional entry. **Needs Biola's approval before the site is public.** See "The Biola logo" below. |
| `biola-bell-tower`, `biola-library` | Biola University press room stock photos | Need Biola's permission before launch. Scaled down to 2400px wide at build time. Used only in the "Our story" section. The page shows no credit line (removed at Matt's request on 2026-11-26). The source is recorded in `images.json`. |
| `portrait-1` to `portrait-7` | Unsplash (photographers are listed in `images.json`) | Stock. The page does not label them as stock. The free Unsplash licence does not include model releases. Replace with released or real portraits before launch. |

To make the repo self-contained, save the files into `public/images` under the
names in `images.json`, delete the two `/public/images/` lines from `.gitignore`,
and commit them. The script then skips the download.

### The Biola logo

The case-study strip under the hero and the "Our story" card show Biola
University's logo, added at Matt's request on 2026-11-26.

- Biola's brand page says that only Biola faculty, staff, eligible student
  workers and approved external partners may use its brand assets, and that
  outside parties request the logo files through its Google Drive folder with a
  note about the intended use:
  https://www.biola.edu/brand/toolkits-standards/logos
- The file used here is the logo that biola.edu serves in its own header. It has
  not been supplied or approved by Biola.
- To show the university's name in text instead, set `caseStudy.logo.show` to
  `false` in `src/content/site.ts`. The page does the same on its own if the file
  cannot be downloaded.
- When Biola supplies a file, save it as `public/images/biola-logo.png` (or
  change the entry in `images.json`) and commit it.
- The components follow Biola's logo rules: the two-colour logo on white, never
  inside a shape, not recoloured or distorted, at least 96px wide, with clear
  space of half the circle mark's height on every side.

## Story library backend

The library runs on Supabase (Postgres). Project `alma-library`, region
`us-east-1`, free plan. The schema is in `supabase/migrations/`.

What exists:

- Tables: `universities`, `members`, `alma_staff`, `stories`, `story_chunks`,
  `story_uses`, `calendar_items`.
- Row level security on every table. A signed-in person sees only the published
  stories of universities they are a member of. Alma staff can read and write
  everything. Nothing is readable without signing in.
- `search_stories`: hybrid search. Full-text search and semantic search
  (pgvector, 384-dimension embeddings) combined with reciprocal rank fusion, with
  filters for relationship, college, career, theme and class year.

What does not exist yet:

- Any stories. The database is empty.
- The function that splits a story into passages and embeds them.
- The step that asks a language model to compose a cited answer.
- Sign-in and the library's screens.

## Before launch

- Set `NEXT_PUBLIC_CONTACT_EMAIL`.
- Connect the domain in Vercel and set `NEXT_PUBLIC_SITE_URL`.
- Set `SITE_INDEXABLE` to `true`.
- Get Biola's written permission for the two campus photographs, or replace them.
- Get Biola's approval to show its logo, or set `caseStudy.logo.show` to `false`.
- Build what the "connections" block promises: the library's API, its MCP
  server, and a connection to each customer's CRM (Blackbaud Raiser's Edge NXT,
  Blackbaud CRM, Salesforce, Slate). None of it exists yet. Each CRM connection
  has to be authorized by the university's own administrator. The product names
  are set in text only; showing a vendor's logo needs that vendor's permission.
- Replace the stock portraits with released photographs, or with real portraits
  of people Alma has profiled, with their permission.
- The story library is the software side of the business: Alma builds one for
  each institution. The database is ready. Sign-in, the screens, the embedding
  step and the answer step still have to be built before a library can be set
  up for a customer.
- Confirm the documentary claim ("Emmy Award-winning documentary producers")
  with the producers who will be named if a university asks.
- "Our story" has no portrait. Add a real photograph of Tom when one is available.
- The wordmark is set in type. Replace it when a logo exists.

## Honest-content rules for this site

- No invented testimonials, client logos, names, quotes or story excerpts.
  Interface drawings show names and running text as bars. The reference design
  shows customer quotations and before-and-after results. Alma has neither, so
  the "Our story" card shows the facts Matt supplied instead.
- The library panels carry one caption: "Illustration with sample data."
- Stock portraits appear only beside a general label such as "Alumni". They are
  never given a name, a quote or a story. The page does not say that they are
  stock (removed at Matt's request on 2026-11-26).
- Biola University's logo appears in two places, as a factual reference to work
  Alma has done for it. It is never placed beside a quotation or an endorsement,
  because Alma has none from Biola. Its two campus photographs carry no caption
  or credit on the page.
- "No part of a profile is drafted by a language model" describes the profiles
  Alma delivers. The library's search does use a language model, and the site
  says so.
