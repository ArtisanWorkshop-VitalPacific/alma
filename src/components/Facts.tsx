import { facts } from "@/content/site";
import { Reveal } from "./Reveal";

export function Facts() {
  return (
    <section aria-label="Alma at a glance" className="bg-mist">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-4 lg:gap-x-0">
        {facts.map((fact, index) => (
          <Reveal
            key={fact.value}
            delay={index * 100}
            className={
              index === 0
                ? "lg:pr-8"
                : "lg:border-l lg:border-[var(--hair-strong)] lg:px-8"
            }
          >
            <p className="t-number text-[clamp(2.5rem,3.2vw+1.1rem,4.25rem)]">
              {fact.value}
            </p>
            <p className="mt-3 max-w-[15rem] text-ink-2">{fact.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
