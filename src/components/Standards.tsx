import Image from "next/image";
import { photos } from "@/content/images";
import { standards } from "@/content/site";
import { Check } from "./icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Who does the work and what software is used for. No person is named here.
 */
export function Standards() {
  const { journalists, software } = standards;

  return (
    <Section
      id="standards"
      tone="mist"
      label={standards.label}
      heading={standards.heading}
      lead={standards.lead}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
          <p className="rule-strong mt-8 max-w-[34rem] pt-6 text-ink-2">
            {standards.note}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="media aspect-[3/2]">
            <Image
              src={photos.proof.src}
              alt={standards.photoAlt}
              fill
              sizes="(min-width: 66.75rem) 608px, 92vw"
              placeholder="blur"
              blurDataURL={photos.proof.blurDataURL}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
