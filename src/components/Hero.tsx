import Image from "next/image";
import { photos } from "@/content/images";
import { cta, hero } from "@/content/site";

/**
 * One illustrated card, with the page title, two sentences and the call to
 * action set over the sky. The illustration is decoration, so it has no alt
 * text.
 */
export function Hero() {
  const [first, second] = hero.body;

  return (
    <section id="top" className="hero bg-paper">
      <div className="wrap">
        <div className="hero-card">
          <Image
            src={photos.hero.src}
            alt=""
            fill
            sizes="(min-width: 90rem) 1280px, 92vw"
            quality={85}
            placeholder="blur"
            blurDataURL={photos.hero.blurDataURL}
            loading="eager"
            fetchPriority="high"
            className="hero-art"
          />
          <div className="hero-copy">
            <h1 className="t-hero">{hero.heading}</h1>
            <p className="hero-lead">
              {first} <span className="hidden md:inline">{second}</span>
            </p>
            <a href={cta.href} className="btn btn-primary hero-cta">
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
