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
      <Reveal className="mx-auto max-w-[62rem]">
        <dl className="border-b border-[var(--hair)]">
          {fees.rows.map((row) => (
            <div
              key={row.item}
              className="rule grid gap-x-8 gap-y-1.5 py-6 md:grid-cols-[13rem_minmax(0,1fr)_11.5rem]"
            >
              <dt className="t-subhead">{row.item}</dt>
              <dd className="max-w-[34rem] text-ink-2">{row.detail}</dd>
              <dd className="t-subhead md:whitespace-nowrap md:text-right">
                {row.fee}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center">
          <a href={cta.href} className="btn btn-primary">
            {cta.label}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
