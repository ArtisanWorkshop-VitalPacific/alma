import { purpose } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Why a university commissions the work. Eight reasons, read as prose. */
export function Purpose() {
  return (
    <Section
      id="purpose"
      tone="mist"
      label={purpose.label}
      heading={purpose.heading}
      lead={purpose.lead}
    >
      <ul className="mt-[clamp(2.5rem,5vw,3.75rem)] grid gap-x-12 md:grid-cols-2">
        {purpose.reasons.map((reason, index) => (
          <Reveal
            as="li"
            key={reason.title}
            delay={(index % 2) * 90}
            className="rule-strong py-7"
          >
            <h3 className="t-subhead">{reason.title}</h3>
            <p className="mt-2.5 text-ink-2">{reason.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
