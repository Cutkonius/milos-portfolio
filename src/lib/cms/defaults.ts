import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable, so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 10,

  site: {
    metaTitle: "Miloš Novaković | Web Design, Development & Email Marketing",
    metaDescription:
      "Miloš Novaković plans, designs and builds websites, then sets up email platforms, automations and lifecycle sequences for growing businesses.",
    ogTitle: "Build the website. Set up what happens next.",
    ogDescription:
      "Website strategy, interface design and development—plus email platform setup, automations and lifecycle copy, handled directly by Miloš.",
    siteName: "Miloš Novaković",
    email: EMAIL,
    calLink: CAL_LINK,
    openForProjects: true,
    launched: false,
  },

  nav: {
    brand: "Miloš Novaković",
    links: [
      { href: "#work", label: "Work" },
      { href: "#services", label: "Services" },
      { href: "#about", label: "About" },
      { href: "#process", label: "Process" },
    ],
    ctaLabel: "Book a project call",
    clockStartMin: 19 * 60 + 58,
    clockEndMin: 26 * 60 + 13,
  },

  hero: {
    day: {
      label: "Miloš Novaković — independent web & email specialist",
      title: "Build the website.",
      body:
        "I plan, design and build the website, then set up the platform, automations and lifecycle emails that keep the customer journey moving.",
    },
    night: {
      title: "Set up what happens next.",
      body: "Strategy, design, development, automation and copy—handled directly by me.",
    },
    sunHint: "See Vujić Auto in progress",
    cornerLeft: "Website strategy / UX/UI / Development / Email automation / Lifecycle copy",
    openForProjectsLabel: "Open for selected projects",
  },

  work: {
    label: "Selected work / In progress",
    sublabel: "Automotive commerce / Information architecture / UX/UI / Development",
    projects: [
      {
        id: "vujicauto",
        kind: "case",
        order: 0,
        published: true,
        featured: true,
        title: "Vujić Auto",
        statusLink: "Work in progress / 2026",
        description:
          "Vujić Auto is a vehicle-first auto-parts storefront designed to reduce compatibility guesswork. I’m leading the structure, UX/UI and build from discovery through checkout.",
        urlBar: "vujicauto.rs",
        badge: "01",
        screenshot: {
          key: "static:vujicauto-screen",
          alt: "Vujić Auto storefront showing vehicle-first parts discovery",
        },
        productShot: {
          key: "static:vujicauto-product",
          alt: "Vujić Auto catalog showing vehicle-filtered categories and product pricing",
        },
        slug: "vujicauto",
        caseStudy: {
          enabled: false,
          intro: "A vehicle-first storefront that reduces compatibility guesswork.",
          liveUrl: "https://vujicauto.rs",
          tags: ["Ecommerce strategy", "Information architecture", "UX/UI", "Development"],
          metrics: [],
          blocks: [
            {
              id: "b1",
              heading: "The problem",
              body:
                "Car-parts catalogs often expect buyers to know a category or part number before they know whether a product fits. That uncertainty creates dead ends and sends people to support.",
            },
            {
              id: "b2",
              heading: "The organizing decision",
              body:
                "Start with the vehicle the buyer already knows. Vehicle selection narrows the catalog before category, product and checkout, making compatibility part of the path instead of a last-minute question.",
            },
            {
              id: "b3",
              heading: "Role, stage and success criteria",
              body:
                "I own the information architecture, content direction, UX/UI and storefront development. Core flows are in design and build; after launch, the case study will add final screens and evidence from support demand, product discovery and checkout completion.",
            },
          ],
          gallery: [],
        },
      },
      {
        id: "redacted-1",
        kind: "redacted",
        order: 1,
        published: false,
        label: "02 · Confidential project",
        cardTitle: "[CONFIDENTIAL]",
        blurb:
          "A private engagement. Scope and permitted outcomes will be shared without identifying details.",
      },
      {
        id: "reserved-1",
        kind: "reserved",
        order: 2,
        published: false,
        label: "03 · Your project",
        cardTitle: "Build the next system.",
        blurb:
          "A focused website, email engagement or joined-up build shaped around the clearest business bottleneck.",
        ctaLabel: "Book a call →",
      },
    ],
  },

  services: {
    label: "Services / Website and lifecycle email",
    heading: "One partner for the website and the follow-up behind it.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Plan, design and build the website",
        favorite: false,
        blurb:
          "From offer structure and content hierarchy to responsive interface design, development, motion, QA and launch.",
        shift: "Strategy / UX/UI / Development",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Set up the lifecycle email system",
        favorite: true,
        blurb:
          "I set up the email platform, lists and segments, build the core automations, and write lifecycle sequences for welcome, nurture, re-engagement and sales.",
        shift: "Platform setup / Automation / Lifecycle copy",
      },
    ],
  },

  process: {
    label: "How it works",
    heading: "A clear path from first call to launch.",
    steps: [
      {
        id: "p1",
        label: "FIRST / SHORT PROJECT CALL",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "Define the right next step",
        blurb:
          "We identify the main bottleneck, choose website, email or both, and agree on one focused outcome.",
      },
      {
        id: "p2",
        label: "PLAN THE SYSTEM",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#d99a5b",
        ring: "rgba(217,154,91,0.14)",
        title: "Map the system",
        blurb:
          "For a website, I map pages, messages and user paths. For email, I map the platform, segments, automations and sequence goals.",
      },
      {
        id: "p3",
        label: "BUILD AND SET UP",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#8fabff",
        ring: "rgba(143,171,255,0.14)",
        title: "Build, share and refine",
        blurb:
          "I share working flows early, so feedback stays focused and there is no surprise reveal at the end.",
      },
      {
        id: "p4",
        label: "TEST AND GO LIVE",
        stroke: "rgba(91,140,255,0.6)",
        dot: "#5b8cff",
        ring: "rgba(91,140,255,0.18)",
        title: "Test, launch and learn",
        blurb:
          "We test the critical paths, launch with a clear handoff and define what to measure next.",
      },
    ],
  },

  about: {
    label: "About / Direct from scope to launch",
    heading: "One person accountable from the first decision to launch.",
    paragraphs: [
      "I’m Miloš Novaković, an independent web and email specialist based in Serbia. I work directly across strategy, content direction, interface design, development, platform setup and lifecycle copy.",
      "AI speeds up research and exploration; I remain responsible for the strategy, decisions, editing and shipped result. The goal is one coherent system, not a stack of disconnected deliverables.",
    ],
    fileHeading: "Working model",
    fileRows: [
      { k: "Based", v: "Serbia / CET–CEST" },
      { k: "Role", v: "Independent web & email specialist" },
      { k: "Websites", v: "Strategy / UX/UI / Development" },
      { k: "Email", v: "Platform setup / Automation / Lifecycle copy" },
    ],
    statusLabel: "Working model",
    statusValue: "Direct with Miloš",
    photo: { key: "static:milos", alt: "Miloš Novaković" },
  },

  contact: {
    label: "Start a project",
    heading: "Let’s find the clearest next step.",
    pitch:
      "Tell me what you sell, what is already working and where customers lose momentum. On a short project call, we’ll identify the main bottleneck and decide whether the useful next move is a website, an email system or both.",
    receiptsNote: "Choose either service or connect both",
    receipts: [
      {
        id: "r1",
        icon: "01",
        title: "A website planned, designed and built to launch",
        meta: "Structure / UX/UI / Development",
      },
      {
        id: "r2",
        icon: "02",
        title: "A lifecycle email system ready to run",
        meta: "Platform setup / Automations / Sequence copy",
      },
    ],
    nightTotal: 2,
    nightTotalMeta: "core services",
    ctaLabel: "Book a project call",
    footerCopyright: "© 2026 Miloš Novaković / Built in daylight. Useful after launch.",
    footerEmail: EMAIL,
    footerLockLabel: "Independent / Serbia",
  },
};
