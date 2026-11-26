import Image from "next/image";
import { photos } from "@/content/images";
import { partnership } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Biola University, Alma's inaugural partner. The name is set in type: no
 * university logo is used. The two campus photographs come from Biola's press
 * room and are credited to Biola. They need Biola's permission before launch.
 */
export function Partnership() {
  const { bellTower, library } = partnership.photos;

  return (
    <Section
      id="partnership"
      label={partnership.label}
      heading={partnership.heading}
      lead={partnership.lead}
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
              {partnership.caption} {partnership.credit}
            </figcaption>
          </figure>
        </Reveal>
      }
    >
      <Reveal delay={120}>
        <dl className="ledger mt-10 max-w-[41rem]">
          {partnership.ledger.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
