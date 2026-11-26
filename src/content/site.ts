/**
 * All site copy and settings that are likely to change live here.
 *
 * Voice rules for this file:
 * - Full, measured sentences in the institutional "we". No slogans and no
 *   paired fragments.
 * - The work is described without naming a journalist. Tom Pfingsten is named
 *   in one place only: the "Our story" section.
 * - The subject of a profile is a person's career and contribution. The site
 *   never asks "where are they now".
 * - "Story library", not "repository". In a university that word already
 *   means the library's archive of scholarly work.
 * - Never give a count of the stories written for Biola University (Matt,
 *   2026-11-26).
 * - Say "alumni engagement", never "alumni relations" (Matt, 2026-11-26).
 * - Say "adjuncts and professors", never "faculty" (Matt, 2026-11-26). In a
 *   running list: "alumni, adjuncts, professors, staff and friends". As a
 *   label: "Adjuncts and professors". Tags in the interface examples are short:
 *   "Adjuncts", "Professors".
 * - No em dashes.
 *
 * The page's look follows the design system recorded from sectionai.com. The
 * voice does not: Alma's copy stays in full, measured sentences.
 */

import type { PhotoName } from "./images";

export const site = {
  name: "Alma",
  tagline: "An editorial studio and story library for universities",
  title: "Alma | Editorial studio and story library for universities",
  description:
    "Alma’s journalists document the careers and contributions of a university’s alumni, adjuncts, professors, staff and friends in reported profiles, and build a searchable story library for each institution.",
  /**
   * Where the contact form sends its email.
   * Set NEXT_PUBLIC_CONTACT_EMAIL in the Vercel project settings.
   * While it is empty the form opens an email with no recipient filled in.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const nav = [
  { href: "#purpose", label: "Purpose" },
  { href: "#library", label: "Library" },
  { href: "#approach", label: "Approach" },
  { href: "#standards", label: "Standards" },
  { href: "#fees", label: "Fees" },
  { href: "#story", label: "Our story" },
];

/** The one call to action. It opens an email, so it says so. */
export const cta = { href: "#contact", label: "Write to us" };

export const hero = {
  heading: "A university is best understood through the lives of its people.",
  /**
   * Two sentences over the hero illustration. A phone shows the first only,
   * so that the text stays on the sky.
   */
  body: [
    "Alma’s journalists document the careers and contributions of your alumni, adjuncts, professors, staff and friends in reported profiles.",
    "We build a searchable story library for your institution, so that your staff can find the right story for a publication or a campaign.",
  ],
};

/**
 * The case-study strip directly under the hero, and the logo on the
 * "Our story" card.
 *
 * logo.show: set to false to show the university's name in text instead of
 * its logo. Biola restricts the use of its logo by outside parties to approved
 * partners, so its approval is needed before the site is public.
 * See src/content/partner-logo.ts.
 */
export const caseStudy = {
  label: "Case study",
  name: "Biola University",
  body: "Since 2024 we have written alumni profiles for the university, among them cover stories in Biola Magazine.",
  link: { href: "#story", label: "Our work with Biola" },
  logo: { show: true, alt: "Biola University" },
};

export const subjects = {
  label: "Subjects",
  heading: "We write about the people who make up a university.",
  lead: "Each profile is a reported account of one person’s work and of the part the university has played in it.",
  people: [
    {
      title: "Alumni",
      body: "Graduates whose careers and contributions show what the university’s education makes possible.",
      photo: "portrait1",
      alt: "A woman in a blue dress and glasses, smiling, seated in an office.",
    },
    {
      title: "Adjuncts and professors",
      body: "Scholars and teachers, and the research and mentoring for which they are known.",
      photo: "portrait2",
      alt: "A bearded man in round glasses and a striped shirt.",
    },
    {
      title: "Staff",
      body: "The people whose daily work students and colleagues rely on.",
      photo: "portrait3",
      alt: "A woman in a maroon cardigan, smiling.",
    },
    {
      title: "Friends of the university",
      body: "Donors, parents, trustees and volunteers who empower the university’s mission.",
      photo: "portrait4",
      alt: "A man in glasses and a navy blazer, standing by a window.",
    },
  ] satisfies { title: string; body: string; photo: PhotoName; alt: string }[],
};

export const purpose = {
  label: "Purpose",
  heading: "Why universities commission this work",
  /** The words of the heading set in the accent colour. */
  accent: "Why universities",
  lead: "What a university’s people go on to do is the strongest evidence of its work. Finding those people, interviewing them at length and writing about them well takes time that few communications offices can spare. Alma works alongside your team. Your departments gain experienced editors and journalists on demand, and can flex with the calendar, for work that meets your standards and reflects your values.",
  reasons: [
    {
      title: "Editorial capacity on demand",
      body: "A magazine deadline, a campaign or a reunion year can call for more writing than a permanent staff can absorb. We work alongside your team and accept profiles one at a time, so an office can flex for a single issue or for a whole year.",
    },
    {
      title: "Work that meets your standards and values",
      body: "We prepare for each interview with your university’s mission in mind, and we write to the standard of your own publications. Your office decides what is published and where.",
    },
    {
      title: "Lasting contact with alumni",
      body: "An extended interview is a kind of attention that few graduates receive from their university after commencement. It gives the alumni engagement office a reason to be in touch that is not a request for a gift, and it can begin a relationship that lasts for years.",
    },
    {
      title: "A library of the university’s stories",
      body: "We build a story library for your institution and keep each profile in it. Staff can return to it whenever an issue, an appeal or a campaign calls for a particular kind of story.",
    },
    {
      title: "Evidence of what graduates accomplish",
      body: "Prospective students, parents, donors and trustees all ask what the university’s graduates go on to do. A reported profile answers with a named person and a documented account of a career.",
    },
    {
      title: "One interview, several offices",
      body: "A person is interviewed once. Advancement, donor relations, enrollment marketing and the newsletter team can each draw on the same profile, and no one is asked to tell the same story twice.",
    },
    {
      title: "The questions of an outside reporter",
      body: "A journalist from outside the institution asks what a reader would ask and does not assume what a member of staff already knows. The profile is easier to follow for readers who have never visited the campus.",
    },
    {
      title: "Continuity from year to year",
      body: "Staff change and priorities shift. An editorial team that knows your institution, and a library that keeps the work in one place, carry the record forward.",
    },
  ],
};

export type OfficeId =
  "alumni" | "donors" | "enrollment" | "newsletters" | "president";

export type Office = {
  id: OfficeId;
  label: string;
  title: string;
  body: string;
  /** An example of a plain-language search this office might run. */
  query: string;
  results: { photo: PhotoName; kind: string }[];
};

export const library = {
  label: "The story library",
  heading: "We build a searchable story library for your institution.",
  lead: "The library is private to your institution, and every profile we write for you is kept in it. Each profile is stored in full and described with metadata: the person’s relationship to the university, class year, college, field of study, career and themes. Staff can look a person up by name, filter by any of those fields, or ask a question in plain language and receive an answer drawn from your own stories, with a citation for each profile it uses.",
  tabsLabel: "How each office uses the library",
  askLabel: "Ask in plain language",
  refine: {
    label: "Refine",
    options: ["By class year", "By college", "Add a theme"],
  },
  queryLabel: "Example search",
  note: "Illustration with sample data.",
  offices: [
    {
      id: "alumni",
      label: "Alumni engagement",
      title: "Advancement and alumni engagement",
      body: "The alumni engagement office can find profiles by class, region or profession for the magazine and for reunions. Each interview also renews the university’s contact with the person profiled.",
      query: "Alumni who work in education, for the fall issue of the magazine",
      results: [
        { photo: "portrait1", kind: "Alumni" },
        { photo: "portrait5", kind: "Alumni" },
        { photo: "portrait7", kind: "Alumni" },
      ],
    },
    {
      id: "donors",
      label: "Donor relations",
      title: "Donor relations",
      body: "Donor relations can search for stories that show what a gift made possible, such as profiles of scholarship recipients, for stewardship reports and proposals.",
      query: "Scholarship recipients who now work in health care",
      results: [
        { photo: "portrait7", kind: "Alumni" },
        { photo: "portrait5", kind: "Alumni" },
        { photo: "portrait4", kind: "Friends" },
      ],
    },
    {
      id: "enrollment",
      label: "Enrollment",
      title: "Marketing and enrollment",
      body: "Marketing and enrollment teams can find graduates by program and career for the website and for admissions materials, so that prospective students and their families can see where a degree has led.",
      query: "Recent graduates in engineering and computer science",
      results: [
        { photo: "portrait7", kind: "Alumni" },
        { photo: "portrait1", kind: "Alumni" },
        { photo: "portrait2", kind: "Professors" },
      ],
    },
    {
      id: "newsletters",
      label: "Newsletters",
      title: "Newsletter teams",
      body: "Newsletter editors can match a story to the theme of an issue and excerpt it, with a link to the full profile.",
      query:
        "Adjuncts, professors and staff who mentor first-generation students",
      results: [
        { photo: "portrait6", kind: "Adjuncts" },
        { photo: "portrait3", kind: "Staff" },
        { photo: "portrait2", kind: "Professors" },
      ],
    },
    {
      id: "president",
      label: "President’s office",
      title: "The president’s office",
      body: "Speechwriters can find a named person and a specific account for remarks, annual reports and letters to trustees.",
      query: "A graduate in public service, for commencement remarks",
      results: [
        { photo: "portrait5", kind: "Alumni" },
        { photo: "portrait1", kind: "Alumni" },
        { photo: "portrait4", kind: "Friends" },
      ],
    },
  ] satisfies Office[],
  /** The smaller panels of the grid. All values are sample data. */
  tiles: {
    record: {
      title: "A record for every profile",
      body: "Each profile carries the fields your staff search by.",
      status: "Published",
      fields: [
        ["Relationship", "Alumni"],
        ["Class year", "2011"],
        ["College", "Nursing and Health Sciences"],
        ["Field of study", "Public health"],
        ["Career", "Health care administration"],
      ],
      themes: ["Service", "First-generation", "Leadership"],
    },
    facets: {
      title: "Search by any field",
      body: "Filter by theme, career, college or class year, or look a person up by name.",
      search: "Search by name",
      groups: [
        {
          label: "Theme",
          options: ["Service", "Research", "Entrepreneurship", "The arts"],
        },
        {
          label: "Career",
          options: ["Education", "Health care", "Public service", "Business"],
        },
        {
          label: "College",
          options: [
            "Arts and Sciences",
            "Business",
            "Education",
            "Engineering",
          ],
        },
      ],
      range: { label: "Class year", value: "1996 to 2006" },
    },
    calendar: {
      title: "Matched to your editorial calendar",
      body: "Find the stories that fit an issue, an appeal or a campaign before the planning meeting.",
      rows: [
        {
          when: "Fall magazine",
          what: "Alumni in education",
          count: "8 profiles",
        },
        {
          when: "Giving day",
          what: "Scholarship recipients",
          count: "5 profiles",
        },
        {
          when: "Reunion weekend",
          what: "Classes of 1996 and 2001",
          count: "11 profiles",
        },
        {
          when: "Commencement",
          what: "Graduates in public service",
          count: "4 profiles",
        },
      ],
    },
    decades: {
      title: "See what the library holds",
      body: "A view by graduation decade shows where the record is strong and where it is thin.",
      bars: [
        { label: "1970s", height: 22 },
        { label: "1980s", height: 36 },
        { label: "1990s", height: 58 },
        { label: "2000s", height: 84 },
        { label: "2010s", height: 100 },
        { label: "2020s", height: 48 },
      ],
    },
    privacy: {
      title: "Private, with sources cited",
      body: "The library holds only your university’s stories, and every answer links to the profiles it draws on.",
      badge: "Your university only",
    },
  },
  method: {
    heading: "How the search works",
    steps: [
      {
        title: "Indexing",
        body: "Each profile is stored in full and indexed together with its metadata.",
      },
      {
        title: "Retrieval",
        body: "Semantic search retrieves the passages that best match the meaning of a query, as well as its keywords.",
      },
      {
        title: "A cited answer",
        body: "A language model composes a short answer from those passages and cites each profile it has used.",
      },
    ],
    note: "This method is called retrieval-augmented generation (RAG). The model is given only passages retrieved from your library. It does not write or alter the profiles.",
  },
  /**
   * How the library reaches other systems. The product names are the vendors'
   * own and are set in text only: no logos, and no claim of partnership.
   * None of this is built yet (2026-11-26): see README, "Before launch".
   */
  connections: {
    heading: "We connect your library to the systems your offices already use.",
    items: [
      {
        tag: "API",
        title: "An interface for your systems",
        body: "Each library has an application programming interface (API). Your website, your data warehouse and your other systems can read profiles, their metadata and search results through it.",
      },
      {
        tag: "MCP",
        title: "A server for AI assistants",
        body: "Each library also runs a Model Context Protocol (MCP) server. MCP is an open standard through which AI assistants reach outside sources, so an assistant your staff already use can search the library and cite the profiles it draws on.",
      },
      {
        tag: "CRM",
        title: "On the record in your CRM",
        body: "We connect the library to the system your offices work in, so that a profile appears on the record of the person it is about.",
        systems: [
          "Blackbaud Raiser’s Edge NXT",
          "Blackbaud CRM",
          "Salesforce",
          "Slate",
        ],
      },
    ] as { tag: string; title: string; body: string; systems?: string[] }[],
    note: "The API and the MCP server use the same sign-in and permissions as the library. A connection to your CRM is set up with your administrator.",
  },
};

export const approach = {
  label: "Approach",
  heading: "How a profile is made",
  lead: "The work asks little of your office. You make one introduction, and we see the profile through to a finished manuscript and a place in your library.",
  stages: [
    {
      title: "An introduction",
      body: "You tell us whose story you would like told and put us in touch. The person may be a graduate, an adjunct, a professor, a member of staff or a friend of the university.",
    },
    {
      title: "The interview",
      body: "An experienced journalist prepares with your university’s mission in mind and conducts a long-form interview over Zoom, wherever the person lives.",
    },
    {
      title: "The profile",
      body: "Within two to three weeks you receive a finished profile, ready for publication. The university owns it outright and may publish it with or without attribution.",
    },
    {
      title: "The library",
      body: "The profile is added to your story library, where it is indexed and described so that your staff can find it when a later issue or campaign calls for it.",
    },
  ],
};

export const standards = {
  label: "Standards",
  heading: "Every profile is reported and written by a journalist.",
  lead: "The interview, the reporting and the writing are the work of people. Software is used for three supporting tasks, none of which is writing.",
  journalists: {
    title: "Done by journalists",
    items: [
      "Preparation and research",
      "The interview",
      "Every sentence of the profile",
    ],
  },
  software: {
    title: "Done by software",
    items: [
      "Scheduling",
      "Transcription of interviews",
      "Search within the story library",
    ],
  },
  note: "No part of a profile is drafted by a language model. The library’s search retrieves and summarizes what our journalists have already written.",
  photoAlt:
    "Printed manuscript pages marked up by hand in red pencil, with reading glasses resting on top.",
};

export const story = {
  label: "Our story",
  heading: "Alma grew out of Tom Pfingsten’s reporting for Biola University.",
  lead: "Tom Pfingsten is Alma’s founder and lead journalist. He has more than two decades of reporting experience, and he spent five years leading communications at Palomar College. Having worked both as a reporter and as the head of a college communications office, he understands institutional priorities as well as the craft of reporting.",
  body: [
    "Alma’s partnership with Biola University began in 2024. Since then we have had the opportunity to tell the stories of some of Biola’s most notable alumni. Some of those profiles have run as cover stories in Biola Magazine, and together they have helped Biola build a library of its graduates’ stories.",
    "Alma now offers the same work to other institutions. Each profile is reported and written by an experienced journalist, and each university’s profiles are kept in a story library built for that institution.",
    "Tom is also a pastor at Emmanuel Baptist Church in Fallbrook, California. Our first work was in Christian higher education, and we are comfortable writing about faith where it is part of a person’s story.",
  ],
  founder: {
    name: "Tom Pfingsten",
    title: "Founder and Lead Journalist",
    ledger: [
      { label: "Reporting experience", value: "More than twenty years" },
      { label: "Palomar College", value: "Five years leading communications" },
      { label: "Emmanuel Baptist Church, Fallbrook", value: "Pastor" },
    ],
  },
  partner: {
    name: "Biola University",
    title: "Inaugural partner, 2024 to present",
    ledger: [
      { label: "The work", value: "Profiles of alumni" },
      { label: "In print", value: "Cover stories in Biola Magazine" },
    ],
  },
  photos: {
    bellTower: {
      photo: "biolaBellTower",
      alt: "The bell tower at Biola University at sunrise: an angled steel frame holding bells above a brick plaza.",
    },
    library: {
      photo: "biolaLibrary",
      alt: "The Biola University library at dusk, seen across a lawn, with a glass rotunda on its roof.",
    },
  } satisfies Record<string, { photo: PhotoName; alt: string }>,
};

export const fees = {
  label: "Fees",
  heading: "A partnership begins with one profile, written without charge.",
  lead: "After that first profile, the arrangement has two parts. Profiles are commissioned one at a time, at a single fee for each, with no retainer and no minimum. The story library is a monthly subscription.",
  rows: [
    {
      item: "First profile",
      detail:
        "A complete profile for a new partner, so that you can judge the work before you commit to it.",
      fee: "No charge",
    },
    {
      item: "Each profile",
      detail:
        "Preparation, a long-form interview over Zoom and a finished profile within two to three weeks. The university owns it outright.",
      fee: "$2,000",
    },
    {
      item: "Story library",
      detail:
        "A private, searchable library built for your institution, with plain-language search and cited answers.",
      fee: "$125 per month",
    },
    {
      item: "Short-form addition",
      detail:
        "Optional. A short-form version of the profile, five alternative headlines and five social media captions.",
      fee: "$500 per profile",
    },
    {
      item: "Documentary film",
      detail:
        "For notable stories, such as the founding of a university or the work of its missionaries. Produced with Emmy Award-winning documentary producers.",
      fee: "Priced separately",
    },
  ],
};

export const questions = {
  label: "Questions",
  heading: "Common questions",
  items: [
    {
      q: "What do you need from our office?",
      a: "One introduction to a person whose story you would like told. We arrange the interview, write the profile and add it to your library.",
    },
    {
      q: "Whose stories do you write?",
      a: "Alumni, adjuncts, professors, staff and friends of the university. Friends include donors, parents, trustees and volunteers.",
    },
    {
      q: "How are interviews conducted?",
      a: "Over Zoom, which allows us to interview people wherever they live.",
    },
    {
      q: "How long does a profile take?",
      a: "Two to three weeks from the introduction to a finished profile that is ready for publication.",
    },
    {
      q: "Who owns the finished profile?",
      a: "The university does. You may publish it in any channel, with or without attribution.",
    },
    {
      q: "What is the story library?",
      a: "A private, searchable collection of profiles that we build for your institution. Staff can search it by keyword or ask a question in plain language, and each answer cites the profiles it draws on.",
    },
    {
      q: "How does the library’s search work?",
      a: "It uses retrieval-augmented generation, often shortened to RAG. The system retrieves the passages in your library that are most relevant to a query, and a language model composes an answer from those passages with citations.",
    },
    {
      q: "Does the library connect to our CRM?",
      a: "Yes. Each library has an API and a Model Context Protocol (MCP) server, and we connect it to the system your offices use, such as Blackbaud Raiser’s Edge NXT, Blackbaud CRM, Salesforce or Slate. Your administrator authorizes the connection.",
    },
    {
      q: "Do you use artificial intelligence?",
      a: "We do not use it to write. Every interview is conducted by a journalist and every profile is written by one. Software is used for scheduling, for transcription and for search within the story library.",
    },
    {
      q: "What does it cost?",
      a: "The first profile for a new partner is written without charge. After that, each profile is $2,000 and the story library is $125 per month. An optional short-form addition is $500 per profile.",
    },
    {
      q: "Do you produce films?",
      a: "We do, for notable stories such as the founding of a university, its first board or the work of its missionaries. These documentary films are produced with Emmy Award-winning documentary producers and are priced separately.",
    },
    {
      q: "Do you work only with Christian universities?",
      a: "No. Our work began in Christian higher education, and we welcome inquiries from any college or university.",
    },
  ],
};

export const contact = {
  label: "Contact",
  heading: "We would be glad to write a first profile for your university.",
  /** The words of the heading set in the accent colour. */
  accent: "a first profile for your university.",
  body: "Tell us a little about your institution and the person whose story you have in mind. The first profile is written without charge.",
};

export const footer = {
  copyright: "© 2026 Alma",
  columns: [
    {
      label: "The work",
      links: [
        { href: "#purpose", label: "Purpose" },
        { href: "#approach", label: "Approach" },
        { href: "#standards", label: "Standards" },
        { href: "#fees", label: "Fees" },
      ],
    },
    {
      label: "The library",
      links: [
        { href: "#library", label: "Story library" },
        { href: "#search", label: "How the search works" },
        { href: "#connections", label: "Connections" },
      ],
    },
    {
      label: "Alma",
      links: [
        { href: "#story", label: "Our story" },
        { href: "#questions", label: "Questions" },
        { href: "#contact", label: "Write to us" },
      ],
    },
  ],
};
