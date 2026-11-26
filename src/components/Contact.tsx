import Image from "next/image";
import { photos } from "@/content/images";
import { contact, site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
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
        className="absolute inset-0 -z-10 bg-black/70 lg:bg-transparent lg:bg-[linear-gradient(to_right,rgb(0_0_0/0.9)_0%,rgb(0_0_0/0.78)_52%,rgb(0_0_0/0.2)_100%)]"
      />

      <div className="wrap section">
        <div className="sec">
          <p className="sec-label">{contact.label}</p>
          <div className="min-w-0">
            <Reveal>
              <h2 id="contact-heading" className="t-heading max-w-[21ch]">
                {contact.heading}
              </h2>
              <p className="t-lead mt-6 max-w-[34rem] text-snow-2">
                {contact.body}
              </p>
            </Reveal>
            <Reveal className="mt-10 max-w-[34rem]" delay={120}>
              <ContactForm contactEmail={site.contactEmail} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
