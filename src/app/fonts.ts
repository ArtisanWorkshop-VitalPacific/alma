import localFont from "next/font/local";

/**
 * Newsreader (display). A news serif with an optical-size axis, so large
 * headlines pick up the finer display cut automatically.
 */
export const newsreader = localFont({
  src: "../fonts/Newsreader-opsz.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/** Geist (text and interface). */
export const geist = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});
