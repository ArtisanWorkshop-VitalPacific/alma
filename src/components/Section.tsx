import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** The short label in the left column. */
  label: string;
  heading: string;
  lead?: string;
  tone?: "paper" | "mist" | "night";
  /** Sits under the lead, in the text column. */
  children?: ReactNode;
  /** Sits under the whole header, across the full width. */
  wide?: ReactNode;
};

const tones = {
  paper: "bg-paper",
  mist: "bg-mist",
  night: "on-dark bg-night",
};

/**
 * The page's one section layout: a label in a left column, with the heading
 * and prose beside it. Below desktop the label sits above the heading.
 */
export function Section({
  id,
  label,
  heading,
  lead,
  tone = "paper",
  children,
  wide,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section ${tones[tone]}`}
    >
      <div className="wrap">
        <div className="sec">
          <p className="sec-label">{label}</p>
          <div className="min-w-0">
            <Reveal>
              <h2 id={`${id}-heading`} className="t-heading max-w-[23ch]">
                {heading}
              </h2>
              {lead ? (
                <p className="t-lead mt-6 max-w-[41rem]">{lead}</p>
              ) : null}
            </Reveal>
            {children}
          </div>
        </div>
        {wide}
      </div>
    </section>
  );
}
