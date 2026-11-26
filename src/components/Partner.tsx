import { partner } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Biola University, Alma's inaugural partner. The name is set in type on
 * purpose: no university logo is used here.
 */
export function Partner() {
  return (
    <section id="partner" className="on-dark section bg-night">
      <div className="wrap-content text-center">
        <Reveal>
          <p className="t-eyebrow">Inaugural partner</p>
          <h2 className="t-hero mt-4">{partner.name}</h2>
          <p className="t-display-2 mt-3 text-snow-2">{partner.period}</p>
          <p className="t-body-lg mx-auto mt-8 max-w-[37.5rem] text-snow-2">
            {partner.body}
          </p>
        </Reveal>

        <Reveal
          className="mt-[clamp(3rem,6vw,5rem)] grid gap-y-10 md:grid-cols-3"
          delay={120}
        >
          {partner.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={
                index > 0
                  ? "md:border-l md:border-[var(--hair-strong)] md:px-6"
                  : "md:px-6"
              }
            >
              <p className="t-display-2">{fact.value}</p>
              <p className="mt-2 text-snow-2">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
