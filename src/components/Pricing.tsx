import { pricing } from "@/content/site";
import { Check } from "./icons";
import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="section bg-mist">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">Pricing</p>
          <h2 className="t-display-1 mt-3">One story. One price.</h2>
          <p className="t-body-lg">
            No retainer. No minimum. Order one story at a time.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-[61.25rem]">
          <div className="grid overflow-hidden rounded-[28px] bg-paper lg:grid-cols-12">
            <div className="p-[clamp(1.75rem,4vw,3.5rem)] lg:col-span-7">
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="t-number">{pricing.price}</span>
                <span className="t-body-lg text-ink-2">{pricing.unit}</span>
              </p>
              <ul className="mt-9 grid gap-4">
                {pricing.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#start" className="btn btn-primary mt-10">
                Start with a free story
              </a>
            </div>

            <div className="flex flex-col justify-between gap-10 border-t border-[var(--hair)] bg-[#fbfbfd] p-[clamp(1.75rem,4vw,3.5rem)] lg:col-span-5 lg:border-l lg:border-t-0">
              <div>
                <h3 className="t-display-2">Your first story is free.</h3>
                <p className="mt-4 text-ink-2">
                  See the finished feature before you spend a dollar. No strings
                  attached.
                </p>
              </div>
              <div className="rule pt-6">
                <p className="font-medium tracking-[-0.01em]">
                  Add-on, {pricing.addOn.price} per story
                </p>
                <p className="mt-2 text-ink-2">{pricing.addOn.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
