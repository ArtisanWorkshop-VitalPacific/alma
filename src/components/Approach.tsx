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
    >
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {approach.stages.map((stage, index) => (
          <Reveal as="li" key={stage.title} delay={index * 90}>
            <div className="stage-card">
              <span className="numeral" aria-hidden="true">
                {numerals[index]}
              </span>
              <h3 className="t-subhead mt-5">{stage.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.55] text-ink-2">
                {stage.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
