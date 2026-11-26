import { questions } from "@/content/site";
import { Plus } from "./icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Faq() {
  return (
    <Section id="questions" label={questions.label} heading={questions.heading}>
      <Reveal className="faq mt-8 border-t border-[var(--hair-strong)]" delay={120}>
        {questions.items.map((item, index) => (
          <details
            key={item.q}
            name="questions"
            className="border-b border-[var(--hair-strong)]"
            open={index === 0}
          >
            <summary>
              <h3 className="t-subhead">{item.q}</h3>
              <Plus className="faq-icon" />
            </summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
