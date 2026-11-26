import Image from "next/image";
import { photos } from "@/content/images";
import { story } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Our story, as a feature panel near the foot of the page: Tom Pfingsten's
 * background and the work for Biola University, Alma's inaugural partner.
 * This is the one place on the site that names Tom.
 *
 * Biola is named in type: no university logo is used. The two campus
 * photographs come from Biola's press room. The page carries no caption or
 * credit line for them (removed at Matt's request). They need Biola's
 * permission before launch. There is no portrait of Tom until a real
 * photograph is supplied.
 */
export function Story() {
  const { founder, partner } = story;
  const { bellTower, library } = story.photos;

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="section bg-paper"
    >
      <div className="wrap">
        <div className="overflow-hidden rounded-[28px] bg-mist">
          <Reveal>
            <div>
              <div className="grid gap-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div className="relative aspect-[4/3] bg-paper">
                  <Image
                    src={photos[bellTower.photo].src}
                    alt={bellTower.alt}
                    fill
                    sizes="(min-width: 66.75rem) 700px, 100vw"
                    placeholder="blur"
                    blurDataURL={photos[bellTower.photo].blurDataURL}
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/2] bg-paper lg:aspect-auto">
                  <Image
                    src={photos[library.photo].src}
                    alt={library.alt}
                    fill
                    sizes="(min-width: 66.75rem) 500px, 100vw"
                    placeholder="blur"
                    blurDataURL={photos[library.photo].blurDataURL}
                    className="object-cover object-[50%_78%]"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="px-[clamp(1.5rem,4.5vw,4.5rem)] pb-[clamp(2rem,5vw,4.5rem)] pt-[clamp(2rem,4vw,3.5rem)]">
            <div className="grid gap-x-14 gap-y-7 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="t-eyebrow">{story.label}</p>
                <h2 id="story-heading" className="t-heading mt-3">
                  {story.heading}
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-7" delay={100}>
                <p className="t-lead">{story.lead}</p>
                <div className="mt-6 grid gap-5">
                  {story.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal
              delay={160}
              className="rule-strong mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-14 gap-y-10 pt-[clamp(2rem,4vw,3rem)] md:grid-cols-2"
            >
              {[founder, partner].map((entry) => (
                <div key={entry.name}>
                  <h3 className="t-subhead">{entry.name}</h3>
                  <p className="mt-1 text-ink-2">{entry.title}</p>
                  <dl className="ledger mt-5">
                    {entry.ledger.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
