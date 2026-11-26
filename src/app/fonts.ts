import localFont from "next/font/local";

/**
 * DM Sans (headings, text and interface). It has an optical-size axis, so
 * large headings pick up the tighter display cut automatically.
 */
export const dmSans = localFont({
  src: "../fonts/DMSans-opsz.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});

/**
 * Newsreader (serif accent): the small labels above headings and the labels
 * inside fact boxes.
 */
export const newsreader = localFont({
  src: "../fonts/Newsreader-opsz.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
