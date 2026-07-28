import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable — so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 2,

  site: {
    metaTitle: "Miloš Novaković — built in daylight, sold after dark",
    metaDescription:
      "Independent web design and development by Miloš Novaković: focused strategy, distinctive interfaces and growth systems that stay useful after launch.",
    ogTitle: "Miloš Novaković — built in daylight, sold after dark",
    ogDescription: "Distinctive websites designed, built and grown by one accountable pair of hands.",
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
      label: "Independent digital studio · Serbia",
      title: "Built in daylight.",
      body: "I design and build high-conviction websites—strategy, interface and production kept in one pair of hands. From first sketch to launch in weeks.",
    },
    night: {
      title: "Sold after dark.",
      body: "Then I make the work useful after launch: email, search and measured growth systems that keep doing their job when nobody is watching.",
    },
    sunHint: "SCROLL, OR DRAG THE SUN",
    cornerLeft: "Miloš Novaković · Serbia · design and development",
    openForProjectsLabel: "Open for projects",
  },

  work: {
    label: "Selected work · 2026",
    sublabel: "Commerce · Product design · Build",
    projects: [
      {
        id: "vujicauto",
        kind: "case",
        order: 0,
        published: true,
        featured: true,
        title: "vujicauto",
        statusLink: "Launching 2026",
        description:
          "A vehicle-first commerce experience for a parts seller who knows the difference between more choice and a better choice. Clear search, disciplined catalog structure and a checkout built to keep momentum.",
        urlBar: "vujicauto.rs",
        badge: "01",
        screenshot: {
          key: "static:vujicauto-screen",
          alt: "Vujić Auto storefront — hero with 'Tačan deo. Prava cena. Kod vas za 48h.'",
        },
        productShot: {
          key: "static:vujicauto-product",
          alt: "Vujić Auto product catalog with categories and prices",
        },
        slug: "vujicauto",
        caseStudy: {
          enabled: false,
          intro:
            "How a parts counter for a seller who knows his torque specs went from a spreadsheet to a storefront that behaves.",
          liveUrl: "https://vujicauto.rs",
          tags: ["WooCommerce", "AI-assisted build", "SEO", "Email flows"],
          metrics: [
            { id: "m1", value: "48h", label: "Part to doorstep" },
            { id: "m2", value: "weeks", label: "Kickoff to launch" },
            { id: "m3", value: "24/7", label: "Sells while he sleeps" },
          ],
          blocks: [
            {
              id: "b1",
              heading: "The problem",
              body: "Right part, right price, no drama. Buyers needed to find the exact component for their vehicle without a phone call — and the shop needed a checkout that doesn't stall on a hill.",
            },
            {
              id: "b2",
              heading: "The build",
              body: "A WooCommerce storefront built with AI at unfair speed: search by vehicle, a catalog that behaves, and a checkout that gets out of the way. Design to deployment in weeks, not quarters.",
            },
            {
              id: "b3",
              heading: "The night shift",
              body: "Then the part most builders skip: email flows and SEO that keep working long after everyone clocks out. The website earns its keep on its own.",
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
        blurb: "An NDA is an NDA. You will never learn about this one. (It went great.)",
      },
      {
        id: "reserved-1",
        kind: "reserved",
        order: 2,
        published: false,
        label: "03 · Reserved for you",
        cardTitle: "This slot is yours.",
        blurb: "The night shift has capacity for exactly one more website. Ideally yours.",
        ctaLabel: "Claim it, book the short call →",
      },
    ],
  },

  services: {
    label: "Services · From idea to audience",
    heading: "Three disciplines. One standard.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Websites with a point of view",
        favorite: false,
        blurb:
          "Strategy, interface and production in one continuous line. AI accelerates the craft; judgment decides what ships.",
        shift: "Strategy / Design / Build",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Email worth opening",
        favorite: true,
        blurb:
          "Lifecycle flows and campaigns written to be useful first, memorable second and measurable throughout.",
        shift: "Lifecycle / Retention",
      },
      {
        id: "s3",
        n: "03",
        stroke: "rgba(238,241,247,0.28)",
        title: "Search, motion and launch",
        favorite: false,
        blurb:
          "Technical SEO, motion where it earns its place and a launch system designed to compound after handoff.",
        shift: "Growth / Delivery",
      },
    ],
  },

  process: {
    label: "Process · Clear from day one",
    heading: "Four moves. No fog.",
    steps: [
      {
        id: "p1",
        label: "DAY 0",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "The short call",
        blurb: "Fifteen minutes. You talk, I take notes, we find out if we fit.",
        ctaLabel: "Book the short call ↗",
      },
      {
        id: "p2",
        label: "DAYS 1–20",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#d99a5b",
        ring: "rgba(217,154,91,0.14)",
        title: "The build",
        blurb:
          "You get a link on day one and watch the site grow up. Progress you can click, not promises.",
      },
      {
        id: "p3",
        label: "DAY 21",
        stroke: "rgba(238,241,247,0.3)",
        dot: "#8fabff",
        ring: "rgba(143,171,255,0.14)",
        title: "The keys",
        blurb:
          "Launch day. Training included, documentation included, hostage handovers not included.",
      },
      {
        id: "p4",
        label: "EVERY NIGHT",
        stroke: "rgba(91,140,255,0.6)",
        dot: "#5b8cff",
        ring: "rgba(91,140,255,0.18)",
        title: "After launch",
        blurb:
          "Email, search and iteration keep the work useful after the launch-day applause has faded.",
      },
    ],
  },

  about: {
    label: "About · The person behind the work",
    heading: "Engineer’s rigor. Editor’s eye.",
    paragraphs: [
      "I’m Miloš Novaković, a software-engineering student with an editor’s eye for what should stay and what should go. I design, build and launch the work myself, so the original idea survives every handoff—because there are no handoffs.",
      "Fluent in Serbian, English and subject lines. Favorite word: *shipped*.",
    ],
    fileHeading: "Personnel file, abridged",
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
    label: "Start a project",
    heading: "Your website should earn its keep.",
    pitch:
      "Bring the ambition, the awkward problem and whatever already exists. In fifteen focused minutes we will know whether there is a sharp project here—and whether I am the right person to build it.",
    receiptsNote: "What stays working after launch",
    receipts: [
      {
        id: "r1",
        icon: "01",
        title: "The right buyer lands on the right category",
        meta: "Search structure / discovery",
      },
      {
        id: "r2",
        icon: "02",
        title: "An unfinished cart gets a useful second chance",
        meta: "Lifecycle email / recovery",
      },
      {
        id: "r3",
        icon: "03",
        title: "The catalog answers before sales has to",
        meta: "Product UX / conversion",
      },
    ],
    nightTotal: 3,
    nightTotalMeta: "systems working",
    ctaLabel: "Book the short call",
    footerCopyright: "© 2026 Miloš Novaković · built in daylight, sold after dark",
    footerEmail: EMAIL,
    footerLockLabel: "Lock up behind you",
  },
};
