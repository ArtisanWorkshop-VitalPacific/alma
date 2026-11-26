import { faqs } from "@/content/site";
import { Plus } from "./icons";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section id="faq" className="section bg-mist">
      <div className="wrap grid gap-y-8 lg:grid-cols-12 lg:gap-x-14">
        <Reveal className="lg:col-span-4">
          <h2 className="t-display-1">Questions, answered.</h2>
        </Reveal>

        <Reveal className="faq lg:col-span-8" delay={120}>
          {faqs.map((item, index) => (
            <details
              key={item.q}
              name="faq"
              className="border-b border-[var(--hair-strong)]"
              open={index === 0}
            >
              <summary>
                <h3 className="t-title">{item.q}</h3>
                <Plus className="faq-icon" />
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
