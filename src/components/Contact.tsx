import Image from "next/image";
import { photos } from "@/content/images";
import { contact, site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Heading } from "./Section";
import { TornEdge } from "./Torn";

/**
 * The closing band. The white page above ends in a torn edge. The form sits
 * on a white card; the notebook is decoration and has no alt text.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="on-dark bg-night"
    >
      <TornEdge color="#ffffff" seed={5} />
      <div className="wrap grid gap-x-16 gap-y-10 pb-[var(--section)] pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
        <div className="flex flex-col">
          <Reveal>
            <p className="sec-label">{contact.label}</p>
            <h2 id="contact-heading" className="t-heading mt-4 max-w-[13.5em]">
              <Heading text={contact.heading} accent={contact.accent} />
            </h2>
            <p className="t-lead mt-6 max-w-[30rem] text-snow-2">
              {contact.body}
            </p>
          </Reveal>
          <div className="mt-auto hidden pt-10 lg:block">
            <Image
              src={photos.notebook.src}
              alt=""
              width={photos.notebook.width}
              height={photos.notebook.height}
              sizes="400px"
              className="-ml-5 h-auto w-[min(100%,24rem)]"
            />
          </div>
        </div>

        <Reveal delay={120}>
          <div className="card on-light p-[clamp(1.25rem,3vw,2.5rem)]">
            <ContactForm contactEmail={site.contactEmail} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
