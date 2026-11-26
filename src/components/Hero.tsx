"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import { photos } from "@/content/images";
import { cta, hero } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * One illustrated card, with the page title, two sentences and the call to
 * action set over the sky. The illustration is decoration, so it has no alt
 * text.
 *
 * Motion (GSAP), all of it skipped when the visitor asks for reduced motion:
 * 1. Arrival: the picture settles from a slight zoom, the title rises line by
 *    line, then the paragraph and the button follow.
 * 2. At rest: the picture rises and falls very slowly.
 * 3. Scroll: the picture moves in while the text lifts away.
 * 4. Pointer, on wide screens with a mouse: the picture leans a few pixels
 *    away from the cursor.
 *
 * The starting states are in globals.css, so nothing jumps before the script
 * runs, and a fallback there shows the text if the script never does.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, second] = hero.body;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const card = section.querySelector<HTMLElement>(".hero-card");
      const art = section.querySelector<HTMLElement>(".hero-art");
      const picture = art?.querySelector("img");
      const copy = section.querySelector<HTMLElement>(".hero-copy");
      const title = section.querySelector<HTMLElement>(".t-hero");
      const lead = section.querySelector<HTMLElement>(".hero-lead");
      const button = section.querySelector<HTMLElement>(".hero-cta");
      if (!card || !art || !picture || !copy || !title || !lead || !button) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Arrival, then 2. the slow rise and fall.
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            art,
            { scale: 1.1 },
            { scale: 1, duration: 2.4, ease: "power2.out" },
            0,
          )
          .fromTo(
            lead,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            0.75,
          )
          .fromTo(
            button,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0.95,
          )
          .to(art, {
            scale: 1.03,
            duration: 14,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

        // The title is split into its lines again whenever the layout changes.
        // Returning the tween lets SplitText keep its place when that happens.
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(title, { opacity: 1 });
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.12,
              ease: "power4.out",
              delay: 0.15,
            });
          },
        });

        // 3. Scroll. The picture starts a little oversized, which also gives
        // the pointer movement room at the edges.
        const scroll = {
          trigger: card,
          start: "top top+=76",
          end: "bottom top",
          scrub: 0.6,
        };
        gsap.fromTo(
          picture,
          { scale: 1.04 },
          { scale: 1.12, ease: "none", scrollTrigger: { ...scroll } },
        );
        gsap.to(copy, {
          y: -44,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { ...scroll },
        });
      });

      // 4. Pointer.
      media.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1068px)",
        () => {
          const moveX = gsap.quickTo(picture, "x", {
            duration: 1.1,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(picture, "y", {
            duration: 1.1,
            ease: "power3.out",
          });

          const lean = (event: PointerEvent) => {
            const box = card.getBoundingClientRect();
            moveX(((event.clientX - box.left) / box.width - 0.5) * -16);
            moveY(((event.clientY - box.top) / box.height - 0.5) * -8);
          };
          const settle = () => {
            moveX(0);
            moveY(0);
          };

          card.addEventListener("pointermove", lean);
          card.addEventListener("pointerleave", settle);
          return () => {
            card.removeEventListener("pointermove", lean);
            card.removeEventListener("pointerleave", settle);
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="hero bg-paper">
      <div className="wrap-wide">
        <div className="hero-card">
          <div className="hero-art">
            <Image
              src={photos.hero.src}
              alt=""
              fill
              sizes="(min-width: 90rem) 1344px, 96vw"
              quality={85}
              placeholder="blur"
              blurDataURL={photos.hero.blurDataURL}
              loading="eager"
              fetchPriority="high"
            />
          </div>
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
