import Image from "next/image";
import { photos } from "@/content/images";
import { standards } from "@/content/site";
import { Check } from "./icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Who does the work, what software is used for, and the team's experience.
 * No person is named here.
 */
export function Standards() {
  const { journalists, software, experience } = standards;

  return (
    <Section
      id="standards"
      tone="mist"
      label={standards.label}
      heading={standards.heading}
      lead={standards.lead}
    >
      <div className="mt-[clamp(2.5rem,5vw,3.75rem)] grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="t-title">{journalists.title}</h3>
              <ul className="mt-4 grid gap-3">
                {journalists.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="t-title">{software.title}</h3>
              <ul className="mt-4 grid gap-3 text-ink-2">
                {software.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span
                      className="mx-[0.4375rem] h-1.5 w-1.5 flex-none -translate-y-[0.15em] rounded-full bg-ink-3"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="rule-strong mt-8 max-w-[34rem] pt-6">{standards.note}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-paper">
            <Image
              src={photos.proof.src}
              alt={standards.photoAlt}
              fill
              sizes="(min-width: 66.75rem) 440px, 100vw"
              placeholder="blur"
              blurDataURL={photos.proof.blurDataURL}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="rule-strong mt-[clamp(2.5rem,5vw,3.75rem)] grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12">
        <div>
          <h3 className="t-subhead">{experience.title}</h3>
          <p className="mt-3 max-w-[34rem] text-ink-2">{experience.body}</p>
        </div>
        <dl className="ledger">
          {experience.ledger.map((row) => (
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
