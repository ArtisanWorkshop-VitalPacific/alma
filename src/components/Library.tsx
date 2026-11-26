"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { photos } from "@/content/images";
import { library, type Office } from "@/content/site";
import { Lock, Search } from "./icons";
import { Reveal } from "./Reveal";

/**
 * The story library, shown as a grid of interface examples.
 *
 * Everything in the panels is sample data. Titles and running text are drawn
 * as bars, records carry no names, and portraits appear only beside a general
 * label such as "Alumni". Each panel has a real heading and sentence above it;
 * the interface drawings themselves are hidden from screen readers.
 */
export function Library() {
  const { offices, tiles, method, connections } = library;
  const [active, setActive] = useState(0);
  // True once JavaScript is running and the visitor has not asked for less motion.
  const [motion, setMotion] = useState(false);
  // True once the grid has scrolled into view. The animations start then.
  const [live, setLive] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grid = useRef<HTMLDivElement | null>(null);
  const office = offices[active];

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const element = grid.current;
    if (!element || !("IntersectionObserver" in window)) {
      setLive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Arrow keys move between chips, as the tab pattern expects.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = offices.length - 1;
    let next = active;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="section bg-mist"
    >
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="sec-label">{library.label}</p>
          <h2 id="library-heading" className="t-heading">
            {library.heading}
          </h2>
          <p className="t-lead !max-w-[44rem] text-left">{library.lead}</p>
        </Reveal>

        <Reveal className="sec-body">
          <p
            id="library-tabs-label"
            className="t-body-sm text-ink-3 md:text-center"
          >
            {library.tabsLabel}
          </p>
          <div
            role="tablist"
            aria-labelledby="library-tabs-label"
            onKeyDown={onKeyDown}
            className="-mx-[var(--gutter)] mt-3 flex gap-2.5 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0"
          >
            {offices.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={index === active}
                aria-controls="library-panel"
                tabIndex={index === active ? 0 : -1}
                className="chip"
                onClick={() => setActive(index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div ref={grid} className={`bento mt-6 ${live ? "is-live" : ""}`}>
            <div
              id="library-panel"
              role="tabpanel"
              aria-labelledby={`tab-${office.id}`}
              className="tile tile-ask md:col-span-2 lg:col-span-7 lg:row-span-2"
            >
              <div key={`${office.id}-text`} className="stage-fade">
                <h3 className="t-display-2">{office.title}</h3>
                <p className="tile-body">{office.body}</p>
                <p className="sr-only">
                  {library.queryLabel}: {office.query}
                </p>
              </div>
              <Ask
                key={office.id}
                office={office}
                motion={motion}
                live={live}
              />
            </div>

            <Tile
              className="lg:col-span-5"
              title={tiles.record.title}
              body={tiles.record.body}
            >
              <Record />
            </Tile>

            <Tile
              className="lg:col-span-5"
              title={tiles.facets.title}
              body={tiles.facets.body}
            >
              <Facets />
            </Tile>

            <Tile
              className="lg:col-span-4"
              title={tiles.calendar.title}
              body={tiles.calendar.body}
            >
              <Calendar />
            </Tile>

            <Tile
              className="lg:col-span-4"
              title={tiles.decades.title}
              body={tiles.decades.body}
            >
              <Decades />
            </Tile>

            <Tile
              className="md:col-span-2 lg:col-span-4"
              title={tiles.privacy.title}
              body={tiles.privacy.body}
            >
              <Privacy />
            </Tile>
          </div>

          <p className="t-caption mt-4 text-ink-3">{library.note}</p>
        </Reveal>

        <Reveal className="mt-[clamp(3.5rem,6.7vw,6rem)]">
          <h3 id="search" className="t-display-2 scroll-mt-24 text-center">
            {method.heading}
          </h3>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {method.steps.map((step, index) => (
              <li key={step.title} className="stage-card bg-paper">
                <span className="numeral" aria-hidden="true">
                  {index + 1}
                </span>
                <h4 className="t-subhead mt-4">{step.title}</h4>
                <p className="mt-2 text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-[44rem] text-center text-ink-2">
            {method.note}
          </p>
        </Reveal>

        <Reveal className="mt-[clamp(3.5rem,6.7vw,6rem)]">
          <h3
            id="connections"
            className="t-display-2 mx-auto max-w-[24ch] scroll-mt-24 text-center"
          >
            {connections.heading}
          </h3>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {connections.items.map((item) => (
              <li key={item.tag} className="stage-card flex flex-col bg-paper">
                <span className="tag self-start">{item.tag}</span>
                <h4 className="t-subhead mt-4">{item.title}</h4>
                <p className="mt-2 text-ink-2">{item.body}</p>
                {item.systems ? (
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {item.systems.map((system) => (
                      <li key={system} className="name-chip">
                        {system}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[44rem] text-center text-ink-2">
            {connections.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Tile({
  className = "",
  title,
  body,
  children,
}: {
  className?: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div className={`tile ${className}`}>
      <div>
        <h3 className="t-title">{title}</h3>
        <p className="tile-body">{body}</p>
      </div>
      <div className="tile-art" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

/** Inline custom properties used to stagger an animation. */
function vars(values: Record<string, string | number>) {
  return values as CSSProperties;
}

/**
 * A plain-language search: the question is typed out, then a cited answer and
 * its sources arrive. Without JavaScript, or with reduced motion on, the whole
 * result is simply shown.
 */
function Ask({
  office,
  motion,
  live,
}: {
  office: Office;
  motion: boolean;
  live: boolean;
}) {
  const text = office.query;
  const [count, setCount] = useState(motion ? 0 : text.length);

  useEffect(() => {
    if (!motion) return;
    setCount(0);
    if (!live) return;

    let shown = 0;
    const timer = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= text.length) window.clearInterval(timer);
    }, 24);

    return () => window.clearInterval(timer);
  }, [motion, live, text]);

  const done = count >= text.length;

  return (
    <div
      className={`ask tile-art ui ${done ? "is-done" : ""}`}
      aria-hidden="true"
    >
      <p className="ui-label">{library.askLabel}</p>
      <p className="ask-query">
        <Search />
        <span className="ask-text">
          <span className="ask-ghost">{text}</span>
          <span className="ask-typed">
            {text.slice(0, count)}
            <span className="ask-caret" />
          </span>
        </span>
      </p>

      <p className="ui-label ask-reveal mt-5">Answer</p>
      <div className="ask-answer">
        {answerLines.map((line, index) => (
          <span key={index} className="ask-line">
            <span
              className="bar ask-grow"
              style={vars({ width: `${line.width}%`, "--i": index })}
            />
            {line.cite ? (
              <span
                className="cite ask-reveal"
                style={vars({ "--i": index + 2 })}
              >
                {line.cite}
              </span>
            ) : null}
          </span>
        ))}
      </div>

      <p className="ui-label ask-reveal mt-5" style={vars({ "--i": 5 })}>
        Sources
      </p>
      <ol className="ask-sources">
        {office.results.map((result, index) => (
          <li
            key={`${result.photo}-${index}`}
            className="ask-source ask-reveal"
            style={vars({ "--i": index + 6 })}
          >
            <span className="ask-num">{index + 1}</span>
            <span className="ask-face">
              <Image
                src={photos[result.photo].src}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="ask-lines">
              <span
                className="bar bar-strong"
                style={{ width: `${[74, 62, 68][index]}%` }}
              />
              <span
                className="bar"
                style={{ width: `${[46, 52, 40][index]}%` }}
              />
            </span>
            <span className="pill">{result.kind}</span>
          </li>
        ))}
      </ol>

      <div className="ask-refine ask-reveal" style={vars({ "--i": 9 })}>
        <span className="ui-label">{library.refine.label}</span>
        {library.refine.options.map((option) => (
          <span key={option} className="f-chip">
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The drawn answer: five lines of text, three of them with a citation. */
const answerLines = [
  { width: 94, cite: 1 },
  { width: 88 },
  { width: 72, cite: 2 },
  { width: 90 },
  { width: 48, cite: 3 },
];

/** One story record with its searchable fields. The name is a bar. */
function Record() {
  const { record } = library.tiles;

  return (
    <div className="ui">
      <div className="rec-top">
        <span className="rec-avatar" />
        <span className="ask-lines">
          <span className="bar bar-strong" style={{ width: "72%" }} />
          <span className="bar" style={{ width: "44%" }} />
        </span>
        <span className="pill pill-accent">{record.status}</span>
      </div>
      <dl className="rec-fields">
        {record.fields.map(([label, value], index) => (
          <div
            key={label}
            className="rec-row seq"
            style={vars({ "--i": index })}
          >
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="rec-tags">
        {record.themes.map((theme, index) => (
          <span
            key={theme}
            className="tag seq"
            style={vars({ "--i": index + record.fields.length })}
          >
            {theme}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Filters. With motion on, the selected option in each row moves slowly. */
function Facets() {
  const { facets } = library.tiles;

  return (
    <div className="ui">
      <p className="facet-search">
        <Search />
        {facets.search}
      </p>
      {facets.groups.map((group, groupIndex) => (
        <div key={group.label} className="facet">
          <span className="facet-label">{group.label}</span>
          <span className="facet-chips">
            {group.options.map((option, index) => {
              // The first three options take turns. Rows are offset so they
              // do not change together.
              const phase = index < 3 ? (index - groupIndex + 3) % 3 : -1;
              return (
                <span
                  key={option}
                  className={`f-chip ${phase >= 0 ? "f-cycle" : ""} ${phase === 0 ? "is-on" : ""}`}
                  style={vars({ "--n": phase })}
                >
                  {option}
                </span>
              );
            })}
          </span>
        </div>
      ))}
      <div className="facet">
        <span className="facet-label">{facets.range.label}</span>
        <span className="range-wrap">
          <span className="range">
            <span className="range-bar" />
          </span>
          <span className="range-value">{facets.range.value}</span>
        </span>
      </div>
    </div>
  );
}

/** Dates on the editorial calendar, each with the stories that fit it. */
function Calendar() {
  const { calendar } = library.tiles;

  return (
    <div className="ui ui-flush">
      {calendar.rows.map((row, index) => (
        <div key={row.when} className="cal-row" style={vars({ "--n": index })}>
          <span className="min-w-0">
            <span className="cal-when">{row.when}</span>
            <span className="cal-what">{row.what}</span>
          </span>
          <span className="pill">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

/** How many profiles the library holds for each graduation decade. */
function Decades() {
  const { decades } = library.tiles;

  return (
    <div className="ui">
      <div className="decades">
        {decades.bars.map((bar, index) => (
          <span key={bar.label} className="decade">
            <span
              className="decade-bar"
              style={vars({ "--h": `${bar.height}%`, "--i": index })}
            />
            <span className="decade-label">{bar.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Privacy() {
  const { privacy } = library.tiles;

  return (
    <div className="ui">
      <span className="priv-badge">
        <Lock />
        {privacy.badge}
      </span>
      <div className="ask-answer mt-4">
        <span className="ask-line">
          <span className="bar" style={{ width: "88%" }} />
          <span className="cite">1</span>
        </span>
        <span className="ask-line">
          <span className="bar" style={{ width: "64%" }} />
          <span className="cite">2</span>
          <span className="cite">3</span>
        </span>
      </div>
    </div>
  );
}
