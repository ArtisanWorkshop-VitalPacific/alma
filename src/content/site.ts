/**
 * All site copy and settings that are likely to change live here.
 * Section headlines sit next to their layout in src/components.
 */

export const site = {
  name: "Alma",
  tagline: "Alumni storytelling for Christian universities",
  title: "Alma | Alumni storytelling for Christian universities",
  description:
    "Magazine-quality alumni features, reported and written by a journalist. $2,000 flat per story. Your first story is free.",
  /**
   * Where the "Send your lead" form sends its email.
   * Set NEXT_PUBLIC_CONTACT_EMAIL in the Vercel project settings.
   * While it is empty the form opens an email with no recipient filled in.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  founder: {
    name: "Tom Pfingsten",
    title: "Founder and Lead Journalist",
  },
};

export const nav = [
  { href: "#how", label: "How it works" },
  { href: "#standard", label: "The standard" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export const facts = [
  { value: "$0", label: "Your first story. No strings attached." },
  { value: "$2,000", label: "Flat rate for every story after." },
  { value: "2 to 3", label: "Weeks from warm lead to finished feature." },
  { value: "20+", label: "Years of journalism behind every story." },
];

export const trackerSteps = [
  "Warm lead received",
  "Zoom interview with Tom",
  "Feature written",
  "Delivered, ready to publish",
];

export const steps = [
  {
    title: "Send a warm lead.",
    body: "Tell us about one alum whose story you have been wanting to tell.",
  },
  {
    title: "Tom reports the story.",
    body: "He interviews your alum over Zoom and writes every word himself.",
  },
  {
    title: "Receive a finished feature.",
    body: "A polished, long-form profile arrives in two to three weeks, ready to publish.",
  },
];

export type ChannelId = "magazine" | "website" | "social" | "executive";

export const channels: {
  id: ChannelId;
  label: string;
  title: string;
  body: string;
  note?: string;
}[] = [
  {
    id: "magazine",
    label: "Alumni magazine",
    title: "The long-form feature.",
    body: "Magazine-quality reporting, ready for your next issue.",
  },
  {
    id: "website",
    label: "Website",
    title: "The web profile.",
    body: "A story for your news page that prospective students can find.",
  },
  {
    id: "social",
    label: "Social media",
    title: "The short cut.",
    body: "A short-form cut and five captions for your feeds.",
    note: "Included with the $500 add-on.",
  },
  {
    id: "executive",
    label: "Executive communications",
    title: "The story from the podium.",
    body: "A real graduate, ready for remarks, reports, and letters.",
  },
];

export const standard = {
  human: ["Every interview", "Every word", "Every story, start to finish"],
  software: ["Scheduling", "Transcription"],
};

export const partner = {
  name: "Biola University",
  period: "2024 to present",
  body: "Alma’s first partnership began at Biola in 2024. Since then, we have had the opportunity to tell the stories of some of Biola’s most notable alumni.",
  facts: [
    { value: "2024", label: "Partnership began" },
    { value: "Multiple", label: "Biola Magazine cover stories" },
    { value: "12+", label: "Alumni feature profiles" },
  ],
};

export const pricing = {
  price: "$2,000",
  unit: "per story, flat",
  includes: [
    "Magazine-quality, long-form alumni feature",
    "Interviewed and written by Tom Pfingsten",
    "Delivered in two to three weeks",
    "Yours outright, attributed or unattributed",
  ],
  addOn: {
    price: "$500",
    body: "A short-form cut, five alternative headlines, and five social media captions.",
  },
};

export const about = {
  quote: "I conduct every interview and write every word myself.",
  bio: "Tom is a veteran journalist with more than two decades of reporting experience and five years leading higher-education communications at Palomar College. He is a believer who understands institutional priorities and the faith at the center of every graduate’s story.",
  credentials: [
    { value: "20+ years", label: "In journalism" },
    { value: "5 years", label: "Leading communications at Palomar College" },
    { value: "Biola Magazine", label: "Multiple cover stories" },
  ],
};

export const faqs = [
  {
    q: "What do you need from us?",
    a: "One warm lead: an alum whose story you want told. Tom handles the interview and the writing.",
  },
  {
    q: "How long does a story take?",
    a: "Two to three weeks from the lead to a finished, ready-to-publish feature.",
  },
  {
    q: "How are interviews conducted?",
    a: "Over Zoom. Tom interviews every alum himself, wherever they are.",
  },
  {
    q: "What does it cost?",
    a: "$2,000 per story, flat. No retainer and no minimum. Your first story is free.",
  },
  {
    q: "Who owns the story?",
    a: "You do. Use it attributed or unattributed, on any channel.",
  },
  {
    q: "Do you use AI?",
    a: "Only for scheduling and transcription. Tom conducts every interview and writes every word.",
  },
  {
    q: "What is the add-on?",
    a: "For $500 more per story: a short-form cut, five alternative headlines, and five social media captions.",
  },
];
