import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable, so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 9,

  site: {
    metaTitle: "Miloš Novaković | Websites and email marketing systems",
    metaDescription:
      "I build websites from scratch and set up complete email marketing systems, including the email platform, automated flows and written sequences. AI-assisted, experience-led.",
    ogTitle: "Websites from scratch. Email systems that follow through.",
    ogDescription:
      "Complete website builds, email platform setup, automated flows and written sequences. AI-assisted execution, guided by knowledge and experience.",
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
    ctaLabel: "Book a call",
    clockStartMin: 19 * 60 + 58,
    clockEndMin: 26 * 60 + 13,
  },

  hero: {
    day: {
      label: "Websites and email marketing",
      title: "Websites from scratch.",
      body:
        "I plan, design and build complete websites, and set up email platforms, automated flows and written sequences.",
    },
    night: {
      title: "Email systems, end to end.",
      body: "Built in daylight. Useful after launch.",
    },
    sunHint: "Explore the work",
    cornerLeft: "Websites / ESP setup / Flows / Email sequences",
    openForProjectsLabel: "Available for August projects",
  },

  work: {
    label: "Selected work / Currently in production",
    sublabel: "Automotive commerce / Strategy / UI/UX / Development",
    projects: [
      {
        id: "vujicauto",
        kind: "case",
        order: 0,
        published: true,
        featured: true,
        title: "vujicauto",
        statusLink: "In production / 2026",
        description:
          "Vujić Auto is a new online store for car parts. I am planning, designing and building a storefront that helps buyers choose their vehicle, find a compatible part and complete the order with confidence.",
        urlBar: "vujicauto.rs",
        badge: "01",
        screenshot: {
          key: "static:vujicauto-screen",
          alt: "Vujić Auto storefront showing vehicle-first parts discovery",
        },
        productShot: {
          key: "static:vujicauto-product",
          alt: "Vujić Auto product catalog with categories and prices",
        },
        slug: "vujicauto",
        caseStudy: {
          enabled: false,
          intro: "A vehicle-first way to find the right part.",
          liveUrl: "https://vujicauto.rs",
          tags: ["Commerce", "Information architecture", "UI/UX", "Development"],
          metrics: [],
          blocks: [
            {
              id: "b1",
              heading: "Project goal",
              body:
                "Make it easier to find a compatible car part and complete the order without calling for help.",
            },
            {
              id: "b2",
              heading: "What I am building",
              body:
                "Offer and content structure, vehicle search, catalog UX, responsive interface, storefront development and checkout.",
            },
            {
              id: "b3",
              heading: "Current stage",
              body:
                "The core experience is being designed and developed. Final screens and the full case study will be published after launch.",
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
        label: "02 · Top secret",
        cardTitle: "[REDACTED]",
        blurb: "An NDA is an NDA. You will never learn about this one.",
      },
      {
        id: "reserved-1",
        kind: "reserved",
        order: 2,
        published: false,
        label: "03 · Reserved for you",
        cardTitle: "This slot is yours.",
        blurb: "A focused project for a new website, an email marketing system or both.",
        ctaLabel: "Book a call →",
      },
    ],
  },

  services: {
    label: "Services / Websites and email marketing",
    heading: "Websites from scratch. Email marketing from setup to sequence.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Build the website from scratch",
        favorite: false,
        blurb:
          "I take the site from a blank page to launch: structure, content direction, interface design, responsive development, motion, testing and deployment.",
        shift: "Strategy / UI/UX / Development",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Set up email marketing",
        favorite: true,
        blurb:
          "I configure the email platform (ESP), audience structure and core automations, then write the sequences for welcome, nurture, recovery and sales.",
        shift: "ESP setup / Flows / Email copywriting",
      },
    ],
  },

  process: {
    label: "How it works",
    heading: "From first call to launch, in four clear steps.",
    steps: [
      {
        id: "p1",
        label: "FIRST / 15-MINUTE CALL",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "Define the scope",
        blurb:
          "We decide whether you need a website, email marketing or both, and agree on the goal.",
      },
      {
        id: "p2",
        label: "PLAN THE SYSTEM",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#d99a5b",
        ring: "rgba(217,154,91,0.14)",
        title: "Plan the system",
        blurb:
          "I map the pages, message and user paths, or the ESP, segments, flows and sequence goals.",
      },
      {
        id: "p3",
        label: "BUILD AND SET UP",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#8fabff",
        ring: "rgba(143,171,255,0.14)",
        title: "Build and review",
        blurb:
          "I build the working website or email system and share it early for focused feedback.",
      },
      {
        id: "p4",
        label: "TEST AND GO LIVE",
        stroke: "rgba(91,140,255,0.6)",
        dot: "#5b8cff",
        ring: "rgba(91,140,255,0.18)",
        title: "Test and launch",
        blurb:
          "I test every critical path, fix the details and launch. Real results guide the next improvements.",
      },
    ],
  },

  about: {
    label: "About / AI-assisted, experience-led",
    heading: "Websites and email marketing, handled directly by me.",
    paragraphs: [
      "I’m Miloš Novaković. I build websites from scratch and set up complete email marketing systems, including email platform (ESP) configuration, automated flows and written sequences.",
      "I use AI throughout research, copy, design exploration and development to work faster and test more options. My knowledge and experience still guide the strategy, decisions, editing and final quality.",
    ],
    fileHeading: "Working model",
    fileRows: [
      { k: "Based", v: "Serbia / CET" },
      { k: "Role", v: "Designer / Developer / Email marketer" },
      { k: "Websites", v: "Strategy / UI/UX / Development" },
      { k: "Email", v: "ESP setup / Flows / Sequences" },
    ],
    statusLabel: "Availability",
    statusValue: "August projects",
    photo: { key: "static:milos", alt: "Miloš Novaković" },
  },

  contact: {
    label: "Start a project",
    heading: "Do you need a website, email marketing or both?",
    pitch:
      "Tell me what you sell, what is already in place and where people get stuck. In a 15-minute call, we will decide whether you need a new website, an email marketing system or both, then define a practical scope.",
    receiptsNote: "Choose one service or combine both",
    receipts: [
      {
        id: "r1",
        icon: "01",
        title: "A complete website built from scratch",
        meta: "Structure / UI/UX / Development",
      },
      {
        id: "r2",
        icon: "02",
        title: "A complete email marketing system",
        meta: "Email platform setup / Automated flows / Written sequences",
      },
    ],
    nightTotal: 2,
    nightTotalMeta: "core services",
    ctaLabel: "Book a 15-minute call",
    footerCopyright: "© 2026 Miloš Novaković / Built in daylight. Useful after launch.",
    footerEmail: EMAIL,
    footerLockLabel: "Exit site",
  },
};
