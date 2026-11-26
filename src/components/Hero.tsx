import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/content/images";
import { cta, hero } from "@/content/site";
import { Search } from "./icons";

export function Hero() {
  return (
    <section id="top" className="overflow-x-clip bg-paper">
      <div className="wrap grid items-center gap-y-14 pb-[clamp(4rem,8vw,7rem)] pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="t-eyebrow">{hero.label}</p>
          <h1 className="t-hero mt-5 max-w-[19ch]">{hero.heading}</h1>
          <p className="t-lead mt-7 max-w-[36rem]">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={cta.href} className="btn btn-primary">
              {cta.label}
            </a>
            <a href={hero.secondary.href} className="text-link">
              {hero.secondary.label}
            </a>
          </div>
          <div className="rule mt-12 max-w-[36rem] pt-5">
            <p className="t-body-sm text-ink-2">{hero.partnerLabel}</p>
            <p className="mt-1 font-medium tracking-[-0.01em]">
              <a href="#partnership" className="hover:underline">
                {hero.partner}
              </a>
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
 * The hero object: an illustrative magazine cover (the profile) with a search
 * panel from the story library over it. Both are live HTML, so they stay
 * sharp at any size. Titles in the panel are bars: no names are invented.
 */
function HeroObject() {
  const { cover, finder } = hero;

  return (
    <figure className="hero-object">
      <figcaption className="sr-only">
        An illustrative magazine cover carrying the Alma name, with a panel from
        the story library showing a plain-language search and three matching
        profiles.
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
            {cover.kicker[0]}
            <br />
            {cover.kicker[1]}
          </span>
        </div>
        <div className="cover-lines">
          <p className="cover-lead">
            {cover.lead[0]}
            <br />
            {cover.lead[1]}
          </p>
          <ul className="cover-list">
            {cover.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="finder" aria-hidden="true">
        <p className="finder-title">{finder.title}</p>
        <p className="finder-query">
          <Search />
          {finder.query}
        </p>
        <ul className="finder-list">
          {finder.results.map((result, index) => (
            <li
              key={result.photo}
              className="finder-row"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="finder-face">
                <Image
                  src={photos[result.photo].src}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              <span className="finder-lines">
                <span style={{ width: `${[82, 68, 76][index]}%` }} />
                <span style={{ width: `${[54, 60, 44][index]}%` }} />
              </span>
              <span className="finder-kind">{result.kind}</span>
            </li>
          ))}
        </ul>
        <p className="finder-foot">{finder.foot}</p>
      </div>
    </figure>
  );
}
