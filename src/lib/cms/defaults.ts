import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable, so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 4,

  site: {
    metaTitle: "Miloš Novaković | Websites that make the next step obvious",
    metaDescription:
      "Strategy, UI/UX and development in one focused engagement. Clearer positioning, sharper decisions and a website designed to turn attention into action.",
    ogTitle: "Make the value clear. Make the next step easy.",
    ogDescription:
      "Independent strategy, design and development for websites that help the right buyer understand the value and act with confidence.",
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
    ctaLabel: "Check the fit",
    clockStartMin: 19 * 60 + 58,
    clockEndMin: 26 * 60 + 13,
  },

  hero: {
    day: {
      label: "Independent strategy / design / development",
      title: "Built in daylight.",
      body:
        "I turn complex offers into clear websites, carrying strategy, UI/UX and development from the first decision to launch.",
    },
    night: {
      title: "Sold after dark.",
      body:
        "When the lights go out, the website keeps working: clarifying the value, answering hesitation and guiding the right people toward action.",
    },
    sunHint: "Enter the night shift",
    cornerLeft: "Miloš Novaković / Strategy / UI/UX / Development",
    openForProjectsLabel: "Now accepting",
  },

  work: {
    label: "Selected work / Decisions made visible",
    sublabel: "Commerce / Positioning / UX / Development",
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
          "Vujić Auto needed buyers to find the right part without turning every visit into a phone call. I shaped the offer, vehicle-first search, catalog and checkout around one job: move people from uncertainty to the correct part with less friction.",
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
          intro:
            "How a vehicle-first storefront helps buyers reach the correct part with less uncertainty.",
          liveUrl: "https://vujicauto.rs",
          tags: ["Commerce", "Information architecture", "UI/UX", "Development"],
          metrics: [],
          blocks: [
            {
              id: "b1",
              heading: "The problem",
              body:
                "Buyers often know the vehicle before they know the part number. The experience needed to turn that knowledge into a confident product choice without making a phone call the default.",
            },
            {
              id: "b2",
              heading: "The build",
              body:
                "The storefront organizes search, catalog and checkout around the buyer's decision path. Each step removes a specific uncertainty before asking for the next commitment.",
            },
            {
              id: "b3",
              heading: "After launch",
              body:
                "Search foundations, lifecycle email and measured iteration extend the same logic after the first visit.",
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
        blurb: "A focused engagement for a website whose next decision should feel easier.",
        ctaLabel: "Check the fit →",
      },
    ],
  },

  services: {
    label: "The offer / From attention to action",
    heading: "Clearer value. Lower friction. Easier action.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Clarify the offer",
        favorite: false,
        blurb:
          "Turn a complex offer into a clear story. The right information appears in the order a real decision needs it.",
        shift: "Positioning / UX / Interface",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Build the decision path",
        favorite: true,
        blurb:
          "Responsive development removes friction from the moments that matter, from first impression to enquiry, checkout or booking.",
        shift: "Development / Performance / Motion",
      },
      {
        id: "s3",
        n: "03",
        stroke: "rgba(238,241,247,0.28)",
        title: "Extend the value after launch",
        favorite: false,
        blurb:
          "Search foundations, lifecycle email and measured iteration give the site useful work to do after launch.",
        shift: "SEO / Lifecycle / Iteration",
      },
    ],
  },

  process: {
    label: "Process / Know what happens next",
    heading: "Four clear commitments.",
    steps: [
      {
        id: "p1",
        label: "FIRST / 15 MINUTES",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "Check the fit",
        blurb:
          "We look at the business goal, the buyer's hesitation and the most valuable next step. If I am not the right fit, I will say so.",
        ctaLabel: "Book the 15-minute fit call",
      },
      {
        id: "p2",
        label: "EARLY IN THE BUILD",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#d99a5b",
        ring: "rgba(217,154,91,0.14)",
        title: "Decide with something real",
        blurb:
          "You receive a working link early. We test ideas in the browser, where the actual experience lives.",
      },
      {
        id: "p3",
        label: "BEFORE LAUNCH",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#8fabff",
        ring: "rgba(143,171,255,0.14)",
        title: "Remove the friction",
        blurb:
          "Responsive behavior, accessibility, performance and key journeys are checked before the site meets your buyers.",
      },
      {
        id: "p4",
        label: "AFTER LAUNCH",
        stroke: "rgba(91,140,255,0.6)",
        dot: "#5b8cff",
        ring: "rgba(91,140,255,0.18)",
        title: "Learn what deserves the next iteration",
        blurb:
          "Search, email and focused improvements follow real behavior, not assumptions.",
      },
    ],
  },

  about: {
    label: "About / One accountable partner",
    heading: "Technical enough to build it. Editorial enough to know what to leave out.",
    paragraphs: [
      "I’m Miloš Novaković, an independent designer-developer in Serbia studying software engineering. I work across positioning, interface and production so the idea does not get diluted between specialists.",
      "You work directly with the person making the decisions and writing the code. That keeps feedback short, ownership clear and the final site coherent.",
    ],
    fileHeading: "Working model",
    fileRows: [
      { k: "Based", v: "Serbia · GMT+1" },
      { k: "Studies", v: "Software engineering" },
      { k: "Model", v: "Independent / hands-on" },
      { k: "Approach", v: "Direct / curious / accountable" },
    ],
    statusLabel: "STATUS",
    statusValue: "Independent / available",
    photo: { key: "static:milos", alt: "Miloš Novaković" },
  },

  contact: {
    label: "Start with the decision",
    heading: "What should your website make easier?",
    pitch:
      "Bring the offer, page or funnel that feels harder than it should. In 15 focused minutes, we will look at the buyer, the hesitation blocking action and the smallest useful next move. You leave with a clearer next step, whether we work together or not.",
    receiptsNote: "Three places where clarity earns its keep",
    receipts: [
      {
        id: "r1",
        icon: "01",
        title: "A clear route to the relevant category",
        meta: "Information architecture / Search",
      },
      {
        id: "r2",
        icon: "02",
        title: "Unfinished intent gets a relevant follow-up",
        meta: "Lifecycle email / Recovery",
      },
      {
        id: "r3",
        icon: "03",
        title: "The product page answers the next real question",
        meta: "Product UX / Decision support",
      },
    ],
    nightTotal: 3,
    nightTotalMeta: "connected decision points",
    ctaLabel: "Book a 15-minute fit call",
    footerCopyright: "© 2026 Miloš Novaković / Built in daylight. Sold after dark.",
    footerEmail: EMAIL,
    footerLockLabel: "Lock up behind you",
  },
};
