import type { CSSProperties } from "react";

/**
 * Torn-paper shapes, drawn from a seeded sequence so that they are the same
 * on every build. Nothing here is random at render time.
 */

/** A small seeded generator (mulberry32). */
function sequence(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Heights of a torn edge at evenly spaced points, each between 0 and 1. */
function tear(seed: number, steps: number) {
  const next = sequence(seed);
  const points: number[] = [];
  let drift = 0.5;
  let wave = 0;

  for (let index = 0; index <= steps; index++) {
    // A slow rise and fall, a shorter ripple, and the fine fibres of the paper.
    drift = clamp(drift + (next() - 0.5) * 0.07, 0.32, 0.68);
    wave = wave * 0.72 + (next() - 0.5) * 0.15;
    const fibre = (next() - 0.5) * 0.11;
    points.push(clamp(drift + wave + fibre, 0.06, 0.96));
  }

  return points;
}

function edgePath(seed: number, width: number, height: number, lift = 0) {
  const steps = 340;
  const points = tear(seed, steps);
  const line = points
    .map((y, index) => {
      const x = width - (index / steps) * width;
      return `L${x.toFixed(1)} ${(y * height + lift).toFixed(1)}`;
    })
    .join("");
  return `M0 0H${width}V${(points[0] * height + lift).toFixed(1)}${line}V0Z`;
}

/**
 * The torn edge between a light band and the dark band below it. Place it as
 * the first child of the dark band and give it the light band's colour.
 */
export function TornEdge({
  color = "#ffffff",
  seed = 7,
}: {
  color?: string;
  seed?: number;
}) {
  const width = 1440;
  const height = 48;

  return (
    <svg
      className="torn"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* The fibres of the sheet show a little below the tear. */}
      <path
        d={edgePath(seed + 31, width, height - 4, 3)}
        fill={color}
        opacity="0.22"
      />
      <path d={edgePath(seed, width, height - 8)} fill={color} />
    </svg>
  );
}

/** An irregular outline for a sheet of paper, as a CSS polygon. */
function sheetOutline(seed: number) {
  const next = sequence(seed);
  const steps = 22;
  const jitter = (size: number) => next() * size;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    points.push(
      `${((i / steps) * 100).toFixed(2)}% ${jitter(2.2).toFixed(2)}%`,
    );
  }
  for (let i = 1; i <= steps; i++) {
    points.push(
      `${(100 - jitter(1.6)).toFixed(2)}% ${((i / steps) * 100).toFixed(2)}%`,
    );
  }
  for (let i = 1; i <= steps; i++) {
    points.push(
      `${(100 - (i / steps) * 100).toFixed(2)}% ${(100 - jitter(2.2)).toFixed(2)}%`,
    );
  }
  for (let i = 1; i < steps; i++) {
    points.push(
      `${jitter(1.6).toFixed(2)}% ${(100 - (i / steps) * 100).toFixed(2)}%`,
    );
  }

  return `polygon(${points.join(",")})`;
}

/** A sheet of rough paper that shows behind a card. Decoration only. */
export function PaperSheet({
  className = "",
  seed = 11,
  style,
}: {
  className?: string;
  seed?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`paper-sheet ${className}`}
      style={{ clipPath: sheetOutline(seed), ...style }}
    />
  );
}
