import Image from "next/image";
import { photos } from "@/content/images";
import { steps } from "@/content/site";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section id="how" className="section bg-paper">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">How it works</p>
          <h2 className="t-display-1 mt-3">Send a name. Get a story.</h2>
          <p className="t-body-lg">
            Near-effortless for your office. One warm lead is all Alma needs.
          </p>
        </Reveal>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-14">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-mist">
              <Image
                src={photos.interview.src}
                alt="A desk during a video-call interview: a laptop with a caller on screen, headphones, an open notebook and pen, and a cup of coffee."
                fill
                sizes="(min-width: 66.75rem) 680px, 100vw"
                placeholder="blur"
                blurDataURL={photos.interview.blurDataURL}
                className="object-cover"
              />
            </div>
          </Reveal>

          <ol className="lg:col-span-5">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 120}
                className={`flex gap-6 py-7 ${index > 0 ? "rule" : "lg:pt-0"}`}
              >
                <span
                  className="t-display-2 w-7 flex-none text-[var(--accent)]"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="t-title">{step.title}</h3>
                  <p className="mt-2 text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
