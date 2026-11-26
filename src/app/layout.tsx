import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { geist, newsreader } from "./fonts";
import "./globals.css";

// The site stays out of search results until SITE_INDEXABLE is set to "true".
const indexable = process.env.SITE_INDEXABLE === "true";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-snow focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
