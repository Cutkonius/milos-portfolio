import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable, so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 6,

  site: {
    metaTitle: "Miloš Novaković | Website strategy, UI/UX design and development",
    metaDescription:
      "I plan, design and build websites for service businesses and online stores. One partner for messaging, page structure, UI/UX, development and launch.",
    ogTitle: "Websites that make the offer clear and the next step easy.",
    ogDescription:
      "Strategy, UI/UX design and development, handled directly by one person from the first plan to launch.",
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
      label: "Website strategy / UI/UX design / development",
      title: "Built in daylight.",
      body:
        "I plan, design and build websites for service businesses and online stores, from the offer and page structure to launch.",
    },
    night: {
      title: "Sold after dark.",
      body:
        "Clear messaging, fast pages and intuitive paths help visitors understand the offer and enquire, book or buy.",
    },
    sunHint: "See how the site works",
    cornerLeft: "Strategy / UI/UX / Development / From first plan to launch",
    openForProjectsLabel: "Now accepting / August",
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
        blurb: "A focused project for a website that needs clearer pages and an easier next step.",
        ctaLabel: "Book a call →",
      },
    ],
  },

  services: {
    label: "Services / Strategy, UI/UX and development",
    heading: "One partner to plan, design and build your website.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Plan the website",
        favorite: false,
        blurb:
          "Clarify who the website is for, what each page needs to say and which action matters most before design begins.",
        shift: "Strategy / Offer / Page structure",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Design and build it",
        favorite: true,
        blurb:
          "Design and develop a responsive, accessible website with clear interactions, useful motion and fast loading.",
        shift: "UI/UX / Development / Motion",
      },
      {
        id: "s3",
        n: "03",
        stroke: "rgba(238,241,247,0.28)",
        title: "Improve it after launch",
        favorite: false,
        blurb:
          "Set up search basics, useful email follow-ups and focused improvements based on how people actually use the site.",
        shift: "Technical SEO / Email / Iteration",
      },
    ],
  },

  process: {
    label: "Process / What working together looks like",
    heading: "A clear process from first call to launch.",
    steps: [
      {
        id: "p1",
        label: "FIRST / 15-MINUTE CALL",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "Confirm the project and fit",
        blurb:
          "We discuss what the website needs to achieve, who it is for, what is not working now and the scope that would solve it. If I am not the right fit, I will tell you.",
        ctaLabel: "Book a 15-minute call",
      },
      {
        id: "p2",
        label: "STRATEGY AND FIRST PAGES",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#d99a5b",
        ring: "rgba(217,154,91,0.14)",
        title: "Agree on the message and structure",
        blurb:
          "I turn the offer into a sitemap, page plan and first working screens. You review real pages in the browser, not abstract presentations.",
      },
      {
        id: "p3",
        label: "DESIGN AND DEVELOPMENT",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#8fabff",
        ring: "rgba(143,171,255,0.14)",
        title: "Build and test the complete site",
        blurb:
          "I complete the responsive design, development, motion, accessibility, performance and the paths to enquiry, booking or purchase.",
      },
      {
        id: "p4",
        label: "LAUNCH AND AFTER",
        stroke: "rgba(91,140,255,0.6)",
        dot: "#5b8cff",
        ring: "rgba(91,140,255,0.18)",
        title: "Launch, measure and improve",
        blurb:
          "I set up search basics and analytics, then use real behavior to decide what to improve next.",
      },
    ],
  },

  about: {
    label: "About / Direct collaboration",
    heading: "Strategy, design and development with one person responsible.",
    paragraphs: [
      "I’m Miloš Novaković, an independent website designer and developer based in Serbia. I help businesses clarify their offer, plan the right pages, design the interface and build the finished site.",
      "You work directly with me from the first call to launch. There is no handoff between a strategist, designer and developer, so decisions stay clear and the final site stays consistent.",
    ],
    fileHeading: "Working model",
    fileRows: [
      { k: "Based", v: "Serbia / CET" },
      { k: "Role", v: "Designer and developer" },
      { k: "Services", v: "Strategy / UI/UX / Development" },
      { k: "Model", v: "Direct / independent" },
    ],
    statusLabel: "Availability",
    statusValue: "August projects",
    photo: { key: "static:milos", alt: "Miloš Novaković" },
  },

  contact: {
    label: "Start a website project",
    heading: "What does your website need to make easier?",
    pitch:
      "Tell me what you sell, who needs to understand it and what you want visitors to do. In a 15-minute call, we will identify the main problem, the right scope and the clearest next step. If the project is a fit, I will explain how I would approach it.",
    receiptsNote: "From the first visit to an enquiry, booking or order",
    receipts: [
      {
        id: "r1",
        icon: "01",
        title: "Help visitors find the right product or service",
        meta: "Navigation / Search / Page structure",
      },
      {
        id: "r2",
        icon: "02",
        title: "Explain the offer and answer common questions",
        meta: "Messaging / Content / Product UX",
      },
      {
        id: "r3",
        icon: "03",
        title: "Make the next step easy to complete",
        meta: "Enquiry / Booking / Checkout",
      },
    ],
    nightTotal: 3,
    nightTotalMeta: "key parts of the website",
    ctaLabel: "Book a 15-minute call",
    footerCopyright: "© 2026 Miloš Novaković / Built in daylight. Sold after dark.",
    footerEmail: EMAIL,
    footerLockLabel: "Exit site",
  },
};
