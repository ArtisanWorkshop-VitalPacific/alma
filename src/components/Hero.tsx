import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/content/images";
import { trackerSteps } from "@/content/site";
import { CheckSmall } from "./icons";

export function Hero() {
  return (
    <section id="top" className="overflow-x-clip bg-paper">
      <div className="wrap grid items-center gap-y-16 pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(2.75rem,6vw,5.5rem)] lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="t-eyebrow">
            Alumni storytelling for Christian universities
          </p>
          <h1 className="t-hero mt-4 max-w-[15ch]">
            Your alumni have stories worth the cover.
          </h1>
          <p className="t-body-lg mt-6 max-w-[35rem] text-ink-2">
            Alma is a journalist-led editorial studio. Send one warm lead.
            Receive a magazine-quality feature in two to three weeks. Your first
            story is free.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#start" className="btn btn-primary">
              Start with a free story
            </a>
            <a href="#how" className="link-chevron">
              See how it works
            </a>
          </div>
          <div className="rule mt-12 max-w-[35rem] pt-5">
            <p className="t-body-sm text-ink-2">Inaugural partner</p>
            <p className="mt-1 font-medium tracking-[-0.01em]">
              Biola University, 2024 to present
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroObject />
        </div>
      </div>
    </section>
  );
}

/**
 * The hero object: an illustrative magazine cover (the product) with a status
 * card over it (the process). Both are live HTML, so they stay sharp at any size.
 */
function HeroObject() {
  return (
    <figure className="hero-object">
      <figcaption className="sr-only">
        An illustrative alumni magazine cover reading “Where are they now?”,
        with a status card showing the four steps from warm lead to delivered
        feature in two to three weeks.
      </figcaption>

      <div className="cover" aria-hidden="true">
        <Image
          src={photos.cover.src}
          alt=""
          fill
          sizes="(min-width: 66.75rem) 408px, 336px"
          quality={85}
          placeholder="blur"
          blurDataURL={photos.cover.blurDataURL}
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
        <div className="cover-masthead">
          <span className="cover-name">Alma</span>
          <span className="cover-kicker">
            First story
            <br />
            free
          </span>
        </div>
        <div className="cover-lines">
          <p className="cover-lead">
            Where are
            <br />
            they now?
          </p>
          <ul className="cover-list">
            <li>Reported by a journalist</li>
            <li>Written by a human</li>
          </ul>
        </div>
      </div>

      <div className="tracker" aria-hidden="true">
        <p className="tracker-title">From lead to finished feature</p>
        <ol className="tracker-list">
          {trackerSteps.map((step, index) => (
            <li
              key={step}
              className="tracker-step"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="tracker-dot">
                <CheckSmall />
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="tracker-foot">
          <strong>2 to 3 weeks</strong>
          <span>start to finish</span>
        </p>
      </div>
    </figure>
  );
}
