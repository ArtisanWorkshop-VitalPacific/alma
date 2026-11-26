import Image from "next/image";
import { photos } from "@/content/images";
import { partnerLogo } from "@/content/partner-logo";
import { cta, story } from "@/content/site";
import { Reveal } from "./Reveal";
import { PaperSheet } from "./Torn";

/**
 * Our story: the one place on the site where Tom Pfingsten is named, with the
 * account of the work for Biola University since 2024.
 *
 * A card of text lies over a sheet of paper, beside two photographs of the
 * Biola campus. The photographs come from Biola's press room and carry no
 * caption or credit line (removed at Matt's request). They need Biola's
 * permission before the site is public: see README.md.
 *
 * Biola's logo labels the university's facts when the file is there.
 * Otherwise the name is set in text.
 */
export function Story() {
  const logo = partnerLogo();
  const { founder, partner } = story;
  const { bellTower, library } = story.photos;

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="section overflow-x-clip bg-paper"
    >
      <div className="wrap story-grid">
        <div className="story-col">
          <PaperSheet className="story-sheet" seed={23} />
          <Reveal className="card story-card">
            <p className="sec-label">{story.label}</p>
            <h2 id="story-heading" className="t-display-2 mt-3">
              {story.heading}
            </h2>
            <p className="t-lead mt-5">{story.lead}</p>
            <div className="mt-4 grid gap-4 text-ink-2">
              {story.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="fact-box mt-8">
              <div>
                <h3 className="fact-label">{founder.name}</h3>
                <p className="fact-sub">{founder.title}</p>
                <dl className="ledger mt-4">
                  {founder.ledger.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rule pt-6">
                {logo ? (
                  <h3>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      sizes="200px"
                      className="case-logo"
                    />
                  </h3>
                ) : (
                  <h3 className="fact-label text-green">{partner.name}</h3>
                )}
                <p className={`fact-sub ${logo ? "!mt-5" : ""}`}>
                  {partner.title}
                </p>
                <dl className="ledger mt-4">
                  {partner.ledger.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-8">
              <a href={cta.href} className="btn btn-primary">
                {cta.label}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="story-photos" delay={120}>
          <div className="media aspect-[4/3]">
            <Image
              src={photos[bellTower.photo].src}
              alt={bellTower.alt}
              fill
              sizes="(min-width: 66.75rem) 640px, (min-width: 45.875rem) 46vw, 92vw"
              placeholder="blur"
              blurDataURL={photos[bellTower.photo].blurDataURL}
              className="object-cover"
            />
          </div>
          <div className="media aspect-[4/3] lg:aspect-[3/2]">
            <Image
              src={photos[library.photo].src}
              alt={library.alt}
              fill
              sizes="(min-width: 66.75rem) 640px, (min-width: 45.875rem) 46vw, 92vw"
              placeholder="blur"
              blurDataURL={photos[library.photo].blurDataURL}
              className="object-cover object-[50%_78%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
