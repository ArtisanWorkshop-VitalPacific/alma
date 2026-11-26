import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** The short serif label above the heading. */
  label: string;
  heading: string;
  /** Words of the heading to set in the accent colour. */
  accent?: string;
  lead?: string;
  /** A long lead reads better set left under the centred heading. */
  leadAlign?: "center" | "start";
  tone?: "paper" | "mist";
  /** A soft band of colour at the top of the section. */
  glow?: boolean;
  /** The section's content, under the heading, across the full width. */
  children?: ReactNode;
};

const tones = {
  paper: "bg-paper",
  mist: "bg-mist",
};

/** A heading with an optional phrase in the accent colour. */
export function Heading({ text, accent }: { text: string; accent?: string }) {
  if (!accent || !text.includes(accent)) return <>{text}</>;

  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span className="accent">{accent}</span>
      {after}
    </>
  );
}

/**
 * The page's usual section: a serif label, a heading and a paragraph, centred
 * above the content.
 */
export function Section({
  id,
  label,
  heading,
  accent,
  lead,
  leadAlign = "center",
  tone = "paper",
  glow = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section ${tones[tone]} ${glow ? "band-glow" : ""}`}
    >
      {glow ? <div className="glow" aria-hidden="true" /> : null}
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="sec-label">{label}</p>
          <h2 id={`${id}-heading`} className="t-heading">
            <Heading text={heading} accent={accent} />
          </h2>
          {lead ? (
            <p
              className={`t-lead ${leadAlign === "start" ? "!max-w-[44rem] text-left" : ""}`}
            >
              {lead}
            </p>
          ) : null}
        </Reveal>
        {children ? <div className="sec-body">{children}</div> : null}
      </div>
    </section>
  );
}
