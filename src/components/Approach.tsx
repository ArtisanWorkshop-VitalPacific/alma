import { approach } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const numerals = ["I", "II", "III", "IV"];

/** The four stages of a profile, in order. Stacked on a phone. */
export function Approach() {
  return (
    <Section
      id="approach"
      label={approach.label}
      heading={approach.heading}
      lead={approach.lead}
      wide={
        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          {approach.stages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.title}
              delay={index * 100}
              className="rule-strong pb-9 pt-6"
            >
              <span className="numeral" aria-hidden="true">
                {numerals[index]}
              </span>
              <h3 className="t-subhead mt-4">{stage.title}</h3>
              <p className="mt-2.5 text-ink-2">{stage.body}</p>
            </Reveal>
          ))}
        </ol>
      }
    />
  );
}
