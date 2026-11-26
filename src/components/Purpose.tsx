import { purpose } from "@/content/site";
import { Reveal } from "./Reveal";
import { Heading } from "./Section";

/**
 * Why a university commissions the work. The heading and the argument stay
 * beside the eight reasons on a wide screen. The first reason is the one
 * universities raise most often, so it carries the accent.
 */
export function Purpose() {
  return (
    <section
      id="purpose"
      aria-labelledby="purpose-heading"
      className="section bg-paper"
    >
      <div className="wrap split">
        <Reveal className="split-head">
          <p className="sec-label">{purpose.label}</p>
          <h2 id="purpose-heading" className="t-display-2 mt-3 max-w-[15ch]">
            <Heading text={purpose.heading} accent={purpose.accent} />
          </h2>
          <p className="t-lead mt-5 max-w-[32.5rem]">{purpose.lead}</p>
        </Reveal>

        <ul className="grid gap-2.5">
          {purpose.reasons.map((reason, index) => (
            <Reveal
              as="li"
              key={reason.title}
              delay={Math.min(index, 3) * 70}
              className={`row-card ${index === 0 ? "is-accent" : ""}`}
            >
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
