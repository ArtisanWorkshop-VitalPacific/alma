/**
 * All site copy and settings that are likely to change live here.
 *
 * Voice rules for this file:
 * - Full, measured sentences in the institutional "we". No slogans and no
 *   paired fragments.
 * - No journalist is named. Experience is stated as the team's.
 * - The subject of a profile is a person's career and contribution. The site
 *   never asks "where are they now".
 * - "Story library", not "repository". In a university that word already
 *   means the library's archive of scholarly work.
 * - "Alumni, faculty, staff and friends" is the order advancement offices use.
 * - No em dashes.
 */

import type { PhotoName } from "./images";

export const site = {
  name: "Alma",
  tagline: "An editorial studio and story library for universities",
  title: "Alma | Editorial studio and story library for universities",
  description:
    "Alma’s journalists document the careers and contributions of a university’s alumni, faculty, staff and friends in reported profiles, and keep them in a searchable story library.",
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
];

/** The one call to action. It opens an email, so it says so. */
export const cta = { href: "#contact", label: "Write to us" };

export const hero = {
  label: "An editorial studio and story library for universities",
  heading: "A university is best understood through the lives of its people.",
  body: "Alma’s journalists document the careers and contributions of your alumni, faculty, staff and friends in reported profiles. We keep those profiles in a searchable story library, so that your staff can find the right story for a publication or a campaign.",
  secondary: { href: "#approach", label: "How a profile is made" },
  partnerLabel: "Inaugural partner",
  partner: "Biola University, 2024 to present",
  cover: {
    kicker: ["Alumni, faculty,", "staff and friends"],
    lead: ["Careers and", "contributions"],
    list: ["Reported by journalists", "Kept in your library"],
  },
  /** The small search panel beside the cover. An illustration, not live data. */
  finder: {
    title: "Story library",
    query: "Graduates and faculty working in public health",
    results: [
      { photo: "portrait1", kind: "Alumni" },
      { photo: "portrait5", kind: "Alumni" },
      { photo: "portrait2", kind: "Faculty" },
    ] satisfies { photo: PhotoName; kind: string }[],
    foot: "Search by keyword or in plain language",
  },
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
      alt: "Illustrative portrait of a woman in a blue dress and glasses, smiling, seated in an office.",
    },
    {
      title: "Faculty",
      body: "Scholars and teachers, and the research and mentoring for which they are known.",
      photo: "portrait2",
      alt: "Illustrative portrait of a bearded man in round glasses and a striped shirt.",
    },
    {
      title: "Staff",
      body: "The people whose daily work students and colleagues rely on.",
      photo: "portrait3",
      alt: "Illustrative portrait of a woman in a maroon cardigan, smiling.",
    },
    {
      title: "Friends of the university",
      body: "Donors, parents, trustees and volunteers who have made the university’s work their own.",
      photo: "portrait4",
      alt: "Illustrative portrait of a man in glasses and a navy blazer, standing by a window.",
    },
  ] satisfies { title: string; body: string; photo: PhotoName; alt: string }[],
  note: "Portraits are illustrative stock photographs. They do not show people Alma has profiled.",
};

export const purpose = {
  label: "Purpose",
  heading: "Why universities commission this work",
  lead: "What a university’s people go on to do is the strongest evidence of its work. Finding those people, interviewing them at length and writing about them well takes time that few communications offices can spare. Alma gives your departments additional editorial capacity when they need it, for work that meets your standards and reflects your values.",
  reasons: [
    {
      title: "Editorial capacity when it is needed",
      body: "A magazine deadline, a campaign or a reunion year can call for more writing than a permanent staff can absorb. We accept profiles one at a time, so an office can add capacity for a single issue or for a whole year.",
    },
    {
      title: "Work that meets your standards and values",
      body: "We prepare for each interview with your university’s mission in mind, and we write to the standard of your own publications. Your office decides what is published and where.",
    },
    {
      title: "Lasting contact with alumni",
      body: "An extended interview is a kind of attention that few graduates receive from their university after commencement. It gives the alumni office a reason to be in touch that is not a request for a gift, and it can begin a relationship that lasts for years.",
    },
    {
      title: "A library of the university’s stories",
      body: "Each profile is kept in a story library that belongs to your institution. Staff can return to it whenever an issue, an appeal or a campaign calls for a particular kind of story.",
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
  | "alumni"
  | "donors"
  | "enrollment"
  | "newsletters"
  | "president";

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
  heading: "Every profile is kept in a library your staff can search.",
  lead: "The profiles we write for you are held in a private story library. Each profile is stored in full and described with metadata: the person’s relationship to the university, class year, college, field of study, career and themes. Staff can look a person up by name, filter by any of those fields, or ask a question in plain language and receive an answer drawn from your own stories, with a citation for each profile it uses.",
  tabsLabel: "How each office uses the library",
  askLabel: "Ask in plain language",
  refine: {
    label: "Refine",
    options: ["By class year", "By college", "Add a theme"],
  },
  queryLabel: "Example search",
  note: "These panels illustrate the library with sample data. Titles and text are drawn as bars, and the portraits are stock photographs.",
  offices: [
    {
      id: "alumni",
      label: "Alumni relations",
      title: "Advancement and alumni relations",
      body: "The alumni office can find profiles by class, region or profession for the magazine and for reunions. Each interview also renews the university’s contact with the person profiled.",
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
        { photo: "portrait2", kind: "Faculty" },
      ],
    },
    {
      id: "newsletters",
      label: "Newsletters",
      title: "Newsletter teams",
      body: "Newsletter editors can match a story to the theme of an issue and excerpt it, with a link to the full profile.",
      query: "Faculty and staff who mentor first-generation students",
      results: [
        { photo: "portrait6", kind: "Faculty" },
        { photo: "portrait3", kind: "Staff" },
        { photo: "portrait2", kind: "Faculty" },
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
          options: ["Arts and Sciences", "Business", "Education", "Engineering"],
        },
      ],
      range: { label: "Class year", value: "1996 to 2006" },
    },
    calendar: {
      title: "Matched to your editorial calendar",
      body: "Find the stories that fit an issue, an appeal or a campaign before the planning meeting.",
      rows: [
        { when: "Fall magazine", what: "Alumni in education", count: "8 profiles" },
        { when: "Giving day", what: "Scholarship recipients", count: "5 profiles" },
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
};

export const approach = {
  label: "Approach",
  heading: "How a profile is made",
  lead: "The work asks little of your office. You make one introduction, and we see the profile through to a finished manuscript and a place in your library.",
  stages: [
    {
      title: "An introduction",
      body: "You tell us whose story you would like told and put us in touch. The person may be a graduate, a member of the faculty or staff, or a friend of the university.",
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
  experience: {
    title: "Experience",
    body: "Our editorial team brings more than two decades of reporting experience and five years of leadership in higher-education communications. Alma’s work began in Christian higher education, and we are comfortable writing about faith where it is part of a person’s story.",
    ledger: [
      { label: "Reporting experience", value: "More than twenty years" },
      {
        label: "Higher-education communications",
        value: "Five years in leadership",
      },
      { label: "Biola Magazine", value: "Several cover stories" },
    ],
  },
};

export const partnership = {
  label: "Partnership",
  heading: "Biola University, 2024 to present",
  lead: "Alma’s first partnership began at Biola University in 2024. Since then we have had the opportunity to tell the stories of some of Biola’s most notable alumni, several of them as cover stories in Biola Magazine.",
  ledger: [
    { label: "Partnership began", value: "2024" },
    { label: "Alumni profiles", value: "More than twelve" },
    { label: "Biola Magazine cover stories", value: "Several" },
  ],
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
  caption: "The Bell Tower and the Library at Biola University.",
  credit: "Photographs: Biola University.",
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
        "A private, searchable library of your profiles, with plain-language search and cited answers.",
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
      a: "Alumni, faculty, staff and friends of the university. Friends include donors, parents, trustees and volunteers.",
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
      a: "A private, searchable collection of the profiles we have written for your university. Staff can search it by keyword or ask a question in plain language, and each answer cites the profiles it draws on.",
    },
    {
      q: "How does the library’s search work?",
      a: "It uses retrieval-augmented generation, often shortened to RAG. The system retrieves the passages in your library that are most relevant to a query, and a language model composes an answer from those passages with citations.",
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
  body: "Tell us a little about your institution and the person whose story you have in mind. The first profile is written without charge.",
};

export const footer = {
  notes: [
    "Photographs of the Biola University campus: Biola University.",
    "Portraits are illustrative stock photographs from Unsplash and do not show people Alma has profiled.",
    "Other photographs are illustrative.",
  ],
  copyright: "© 2026 Alma",
};
