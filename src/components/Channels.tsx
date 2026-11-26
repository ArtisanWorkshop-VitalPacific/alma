"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { photos } from "@/content/images";
import { channels, type ChannelId } from "@/content/site";
import { Reveal } from "./Reveal";

export function Channels() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const channel = channels[active];

  // Arrow keys move between chips, as the tab pattern expects.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = channels.length - 1;
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
    <section id="channels" className="on-dark section bg-night">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="t-eyebrow">One story, every channel</p>
          <h2 className="t-display-1 mt-3">
            Report it once. Use it everywhere.
          </h2>
          <p className="t-body-lg">
            You own every story outright. Run it attributed or unattributed,
            wherever your audience is.
          </p>
        </Reveal>

        <Reveal className="mt-[clamp(2.5rem,5vw,4rem)]">
          <div
            role="tablist"
            aria-label="Where a story runs"
            onKeyDown={onKeyDown}
            className="-mx-[var(--gutter)] flex gap-2.5 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:justify-center md:px-0"
          >
            {channels.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={index === active}
                aria-controls="channel-panel"
                tabIndex={index === active ? 0 : -1}
                className="chip"
                onClick={() => setActive(index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            id="channel-panel"
            role="tabpanel"
            aria-labelledby={`tab-${channel.id}`}
            className="stage mt-6 grid items-center gap-y-8 p-[clamp(1.25rem,4vw,3.5rem)] lg:grid-cols-12 lg:gap-x-10"
          >
            <div className="stage-canvas lg:col-span-8">
              <div
                key={channel.id}
                className="stage-fade grid h-full w-full place-items-center"
              >
                <Mock id={channel.id} />
              </div>
            </div>

            <div
              key={`${channel.id}-text`}
              className="stage-fade lg:col-span-4"
            >
              <h3 className="t-display-2">{keepHyphens(channel.title)}</h3>
              <p className="t-body-lg mt-3 text-snow-2">{channel.body}</p>
              {channel.note ? (
                <p className="t-body-sm mt-4 text-snow-2">{channel.note}</p>
              ) : null}
            </div>
          </div>

          <p className="t-body-sm mt-6 text-center text-snow-2">
            Also at home in donor reports and admissions materials.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Keeps hyphenated words such as "long-form" on one line. */
function keepHyphens(text: string) {
  return text.split(" ").map((word, index) => (
    <span key={index}>
      {index > 0 ? " " : null}
      {word.includes("-") ? (
        <span className="whitespace-nowrap">{word}</span>
      ) : (
        word
      )}
    </span>
  ));
}

/* ------------------------------------------------------------------
   Mock-ups. Each one shows the shape of a deliverable. Running text is
   drawn as bars on purpose: no invented names, quotes, or stories.
   ------------------------------------------------------------------ */

function Mock({ id }: { id: ChannelId }) {
  if (id === "magazine") return <MagazineMock />;
  if (id === "website") return <WebsiteMock />;
  if (id === "social") return <SocialMock />;
  return <ExecutiveMock />;
}

function Lines({
  widths,
  gap = "1.5cqi",
  className = "",
}: {
  widths: number[];
  gap?: string;
  className?: string;
}) {
  return (
    <span className={`grid content-start ${className}`} style={{ gap }}>
      {widths.map((width, index) => (
        <span key={index} className="sk" style={{ width: `${width}%` }} />
      ))}
    </span>
  );
}

function MagazineMock() {
  return (
    <div className="mock w-[84%]" aria-hidden="true">
      <div className="mock-surface mock-spread">
        <div className="relative">
          <Image
            src={photos.cover.src}
            alt=""
            fill
            sizes="(min-width: 66.75rem) 330px, 42vw"
            placeholder="blur"
            blurDataURL={photos.cover.blurDataURL}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-[5.5cqi]">
          <p className="mock-label">Where are they now?</p>
          <span className="sk sk-head mt-[2.6cqi] w-[94%]" />
          <span className="sk sk-head mt-[1.3cqi] w-[58%]" />
          <p className="mock-meta mt-[2.6cqi]">By Tom Pfingsten</p>
          <div className="mt-[3.6cqi] grid flex-1 grid-cols-2 gap-[3.2cqi]">
            <Lines
              widths={[
                100, 96, 100, 92, 100, 97, 100, 90, 100, 95, 100, 88, 100, 97,
                100, 93, 100, 62,
              ]}
            />
            <div className="grid content-start gap-[3cqi]">
              <Lines widths={[100, 94, 100, 97, 91]} />
              <span className="grid gap-[1.5cqi]">
                <span className="sk sk-quote w-full" />
                <span className="sk sk-quote w-[84%]" />
                <span className="sk sk-quote w-[52%]" />
              </span>
              <Lines widths={[100, 96, 100, 92, 100, 97, 70]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteMock() {
  return (
    <div className="mock w-[84%]" aria-hidden="true">
      <div className="mock-surface mock-window">
        <div className="mock-bar">
          <span className="mock-url">youruniversity.edu/news</span>
        </div>
        <div className="grid grid-cols-[1.75fr_1fr] gap-[5cqi] p-[5cqi]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.4cqi]">
              <Image
                src={photos.interview.src}
                alt=""
                fill
                sizes="(min-width: 66.75rem) 380px, 50vw"
                placeholder="blur"
                blurDataURL={photos.interview.blurDataURL}
                className="object-cover"
              />
            </div>
            <p className="mock-label mt-[3.2cqi]">Alumni</p>
            <span className="sk sk-head mt-[1.6cqi] w-[94%]" />
            <span className="sk sk-head mt-[1.2cqi] w-[62%]" />
            <Lines className="mt-[3cqi]" widths={[100, 96, 88]} />
          </div>
          <div className="grid content-start gap-[3.4cqi]">
            {[0, 1, 2].map((item) => (
              <div key={item} className="grid gap-[1.4cqi]">
                <span className="block aspect-[16/9] rounded-[1cqi] bg-mist" />
                <span className="sk w-[90%]" />
                <span className="sk w-[60%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialMock() {
  return (
    <div className="mock w-[46%]" aria-hidden="true">
      <div className="mock-surface mock-post">
        <div className="relative aspect-square">
          <Image
            src={photos.cover.src}
            alt=""
            fill
            sizes="(min-width: 66.75rem) 300px, 46vw"
            placeholder="blur"
            blurDataURL={photos.cover.blurDataURL}
            className="object-cover object-[50%_62%]"
          />
        </div>
        <div className="p-[6cqi]">
          <p className="mock-label">Caption 1 of 5</p>
          <Lines className="mt-[3.5cqi]" gap="2.6cqi" widths={[100, 92, 64]} />
          <div className="mt-[6cqi] flex gap-[1.8cqi]">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`h-[1.8cqi] w-[1.8cqi] rounded-full ${dot === 0 ? "bg-alma" : "bg-ink/15"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutiveMock() {
  return (
    <div className="mock w-[54%]" aria-hidden="true">
      <div className="mock-surface mock-doc">
        <p className="mock-label">Remarks</p>
        <span className="sk sk-head mt-[3cqi] w-[70%]" />
        <Lines className="mt-[6cqi]" gap="2.6cqi" widths={[100, 96, 100, 58]} />
        <div className="mock-callout mt-[6cqi]">
          <p className="mock-label">The alumni story</p>
          <Lines
            className="mt-[2.6cqi]"
            gap="2.6cqi"
            widths={[100, 94, 100, 72]}
          />
        </div>
        <Lines className="mt-[6cqi]" gap="2.6cqi" widths={[100, 92, 40]} />
      </div>
    </div>
  );
}
