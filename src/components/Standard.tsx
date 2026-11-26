import Image from "next/image";
import { photos } from "@/content/images";
import { standard } from "@/content/site";
import { Check } from "./icons";
import { Reveal } from "./Reveal";

export function Standard() {
  return (
    <section id="standard" className="section bg-paper">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">The standard</p>
          <h2 className="t-display-1 mt-3">
            Real journalism. Zero AI writing.
          </h2>
          <p className="t-body-lg">
            Every story is reported, interviewed, and written by a journalist
            with more than 20 years of experience.
          </p>
        </Reveal>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-14">
          <Reveal className="lg:order-2 lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-mist">
              <Image
                src={photos.proof.src}
                alt="Printed manuscript pages marked up by hand in red pencil, with reading glasses resting on top."
                fill
                sizes="(min-width: 66.75rem) 680px, 100vw"
                placeholder="blur"
                blurDataURL={photos.proof.blurDataURL}
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:order-1 lg:col-span-5" delay={120}>
            <h3 className="t-title">Done by a journalist</h3>
            <ul className="mt-4 grid gap-3">
              {standard.human.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rule mt-8 pt-8">
              <h3 className="t-title">Done by software</h3>
              <ul className="mt-4 grid gap-3 text-ink-2">
                {standard.software.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="mx-[0.4375rem] h-1.5 w-1.5 flex-none rounded-full bg-ink-3"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="rule t-body-lg mt-8 pt-8">
              The result is clean, reliable, and ready to use.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
