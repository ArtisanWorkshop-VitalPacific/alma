import Image from "next/image";
import { photos } from "@/content/images";
import { story } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Our story: Tom Pfingsten's background and the work for Biola University,
 * Alma's inaugural partner. This is the one place on the site that names Tom.
 *
 * Biola is named in type: no university logo is used. The two campus
 * photographs come from Biola's press room and are credited to Biola. They
 * need Biola's permission before launch. There is no portrait of Tom until a
 * real photograph is supplied.
 */
export function Story() {
  const { founder, partner } = story;
  const { bellTower, library } = story.photos;

  return (
    <Section
      id="story"
      label={story.label}
      heading={story.heading}
      lead={story.lead}
      wide={
        <Reveal className="mt-[clamp(2.5rem,5vw,4rem)]">
          <figure>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-mist">
                <Image
                  src={photos[bellTower.photo].src}
                  alt={bellTower.alt}
                  fill
                  sizes="(min-width: 66.75rem) 690px, 100vw"
                  placeholder="blur"
                  blurDataURL={photos[bellTower.photo].blurDataURL}
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-mist lg:aspect-auto">
                <Image
                  src={photos[library.photo].src}
                  alt={library.alt}
                  fill
                  sizes="(min-width: 66.75rem) 490px, 100vw"
                  placeholder="blur"
                  blurDataURL={photos[library.photo].blurDataURL}
                  className="object-cover object-[50%_78%]"
                />
              </div>
            </div>
            <figcaption className="t-caption mt-3 text-ink-2">
              {story.caption} {story.credit}
            </figcaption>
          </figure>
        </Reveal>
      }
    >
      <Reveal delay={100}>
        <div className="mt-6 grid max-w-[41rem] gap-5">
          {story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal
        delay={160}
        className="mt-[clamp(2.5rem,5vw,3.75rem)] grid gap-x-12 gap-y-10 md:grid-cols-2"
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
    </Section>
  );
}
