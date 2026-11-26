import Image from "next/image";
import { photos } from "@/content/images";
import { site } from "@/content/site";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function Start() {
  return (
    <section
      id="start"
      className="on-dark relative isolate overflow-hidden bg-night"
    >
      <Image
        src={photos.quad.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={photos.quad.blurDataURL}
        className="-z-20 object-cover object-[80%_50%]"
      />
      {/* Darkens the photograph where the text sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/65 lg:bg-transparent lg:bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.68)_42%,rgb(0_0_0/0.12)_100%)]"
      />

      <div className="wrap section grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="t-display-1">Start with one story. It’s free.</h2>
            <p className="t-body-lg mt-5 max-w-[30rem] text-snow-2">
              Send one name. See the finished feature before you spend a dollar.
            </p>
          </Reveal>
          <Reveal className="mt-10 max-w-[32rem]" delay={120}>
            <LeadForm contactEmail={site.contactEmail} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
