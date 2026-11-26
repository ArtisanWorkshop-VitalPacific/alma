import { about, site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * About Tom. Typographic by design: there is no portrait here until a real
 * photograph of Tom is supplied.
 */
export function About() {
  return (
    <section id="about" className="section bg-paper">
      <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-14">
        <Reveal className="lg:col-span-7">
          <p className="t-eyebrow">Led by a journalist</p>
          <figure className="mt-5">
            <blockquote className="t-display-1 -indent-[0.42em]">
              “{about.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <span className="block font-medium tracking-[-0.01em]">
                {site.founder.name}
              </span>
              <span className="block text-ink-2">{site.founder.title}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:pt-11" delay={120}>
          <p className="t-body-lg text-ink-2">{about.bio}</p>
          <dl className="mt-10">
            {about.credentials.map((item) => (
              <div
                key={item.label}
                className="rule flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="text-ink-2">{item.label}</dt>
                <dd className="flex-none text-right font-medium tracking-[-0.01em]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
