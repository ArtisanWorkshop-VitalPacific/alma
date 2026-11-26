import Image from "next/image";
import { photos } from "@/content/images";
import { subjects } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * The four groups of people Alma writes about. The portraits are stock
 * photographs. They carry a group label only: never a name, a quote or a story.
 */
export function Subjects() {
  return (
    <Section
      id="subjects"
      tone="mist"
      label={subjects.label}
      heading={subjects.heading}
      lead={subjects.lead}
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {subjects.people.map((person, index) => (
          <Reveal as="li" key={person.title} delay={index * 90}>
            <div className="person-photo">
              <Image
                src={photos[person.photo].src}
                alt={person.alt}
                fill
                sizes="(min-width: 66.75rem) 300px, (min-width: 45.875rem) 23vw, 45vw"
                placeholder="blur"
                blurDataURL={photos[person.photo].blurDataURL}
                className="object-cover"
              />
            </div>
            <h3 className="t-subhead mt-5">{person.title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-ink-2">
              {person.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
