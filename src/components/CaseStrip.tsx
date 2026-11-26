import Image from "next/image";
import { partnerLogo } from "@/content/partner-logo";
import { caseStudy } from "@/content/site";
import { Arrow } from "./icons";

/**
 * The strip directly under the hero: the university Alma has worked with,
 * what the work has been, and a link to the account of it.
 *
 * The logo sits on white with clear space around it and nothing attached to
 * it, as Biola's logo rules ask. If the logo file is not there, or is turned
 * off in site.ts, the university's name is set in text.
 */
export function CaseStrip() {
  const logo = partnerLogo();

  return (
    <section aria-label={caseStudy.label} className="case-strip bg-paper">
      <div className="wrap-wide case-grid">
        <p className="case-label">{caseStudy.label}</p>
        {logo ? (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="200px"
            className="case-logo"
          />
        ) : (
          <p className="case-name">{caseStudy.name}</p>
        )}
        <p className="case-text">{caseStudy.body}</p>
        <a href={caseStudy.link.href} className="arrow-link">
          {caseStudy.link.label}
          <Arrow />
        </a>
      </div>
    </section>
  );
}
