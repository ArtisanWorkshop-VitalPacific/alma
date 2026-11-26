import { cta, fees } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** A plain schedule of fees. Read as a table, not sold as a price card. */
export function Fees() {
  return (
    <Section
      id="fees"
      label={fees.label}
      heading={fees.heading}
      lead={fees.lead}
    >
      <Reveal delay={120}>
        <dl className="mt-[clamp(2.5rem,5vw,3.75rem)] border-b border-[var(--hair-strong)]">
          {fees.rows.map((row) => (
            <div
              key={row.item}
              className="rule-strong grid gap-x-8 gap-y-1.5 py-6 md:grid-cols-[12.5rem_minmax(0,1fr)_11.5rem]"
            >
              <dt className="t-subhead">{row.item}</dt>
              <dd className="max-w-[34rem] text-ink-2">{row.detail}</dd>
              <dd className="t-subhead md:whitespace-nowrap md:text-right">
                {row.fee}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8">
          <a href={cta.href} className="text-link">
            {cta.label}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
