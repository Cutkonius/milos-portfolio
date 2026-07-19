import { CAL_LINK, EMAIL } from "@/lib/cal";
import type { ContentDoc } from "./types";

/**
 * The site's content as it shipped hardcoded, lifted verbatim into data.
 * Serves two jobs: the initial seed written into Netlify Blobs, and the
 * fallback returned when the store is empty or unreachable — so the public
 * site renders identically to before the CMS existed.
 */
export const DEFAULT_CONTENT: ContentDoc = {
  version: 1,

  site: {
    metaTitle: "Miloš Novaković — built in daylight, sold after dark",
    metaDescription:
      "Websites designed and built with AI at unfair speed, then marketed long after everyone goes to bed: email flows, SEO, the occasional ad.",
    ogTitle: "Miloš Novaković — built in daylight, sold after dark",
    ogDescription: "Websites built with AI at unfair speed, marketed while you sleep.",
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
      label: "19:58 · You caught me mid-shift",
      title: "Built in daylight.",
      body: "The day job: websites designed and built with AI at unfair speed. Kickoff to keys in weeks, not quarters.",
    },
    night: {
      title: "Sold after dark.",
      body: "The night job: email flows, SEO and the occasional ad, quietly working long after everyone (including me) goes to bed.",
    },
    sunHint: "SCROLL, OR DRAG THE SUN",
    cornerLeft: "Zdravo. Miloš, 24 · Serbia · GMT+1, both shifts",
    openForProjectsLabel: "Open for projects",
  },

  work: {
    label: "20:41 · Fresh off the day shift · Selected work, 2026",
    sublabel: "WooCommerce · AI-assisted build · launching soon",
    projects: [
      {
        id: "vujicauto",
        kind: "case",
        order: 0,
        published: true,
        featured: true,
        title: "vujicauto",
        statusLink: "in the paint shop →",
        description:
          "A parts counter for a seller who knows his torque specs. Search by vehicle, a catalog that behaves, a checkout that doesn't stall on a hill. Rolling out of the shop soon. Case study to follow.",
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
      },
      {
        id: "redacted-1",
        kind: "redacted",
        order: 1,
        published: true,
        label: "02 · Top secret",
        cardTitle: "[REDACTED]",
        blurb: "An NDA is an NDA. You will never learn about this one. (It went great.)",
      },
      {
        id: "reserved-1",
        kind: "reserved",
        order: 2,
        published: true,
        label: "03 · Reserved for you",
        cardTitle: "This slot is yours.",
        blurb: "The night shift has capacity for exactly one more website. Ideally yours.",
        ctaLabel: "Claim it, book the short call →",
      },
    ],
  },

  services: {
    label: "22:06 · What I do between sunsets",
    heading: "Three trades, one pair of hands.",
    rows: [
      {
        id: "s1",
        n: "01",
        stroke: "rgba(238,241,247,0.28)",
        title: "Websites, built with AI",
        favorite: false,
        blurb:
          "Design to deployment in weeks. AI types fast; I make it tasteful, accessible and unmistakably yours.",
        shift: "The day shift",
      },
      {
        id: "s2",
        n: "02",
        stroke: "rgba(245,169,78,0.5)",
        title: "Email people actually open",
        favorite: true,
        blurb:
          "Flows and campaigns with subject lines like tiny poems, except these ones pay rent.",
        shift: "The night shift",
      },
      {
        id: "s3",
        n: "03",
        stroke: "rgba(238,241,247,0.28)",
        title: "The rest of the megaphone",
        favorite: false,
        blurb:
          "SEO, the occasional ad, motion where it earns its place. Enough to get found without shouting.",
        shift: "Also the night shift",
      },
    ],
  },

  process: {
    label: "00:52 · How a project rolls out of the shop",
    heading: "Four steps. Zero mystery.",
    steps: [
      {
        id: "p1",
        label: "DAY 0",
        stroke: "rgba(245,169,78,0.55)",
        dot: "#f5a94e",
        ring: "rgba(245,169,78,0.16)",
        title: "The short call",
        blurb: "Fifteen minutes. You talk, I take notes, we find out if we fit.",
        ctaLabel: "It is literally called the short informative call →",
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
        title: "The night shift",
        blurb:
          "Email flows first, SEO close behind. The marketing clocks in when you clock out. Receipts below.",
      },
    ],
  },

  about: {
    label: "23:37 · The human bit",
    heading: "Runs on espresso and deadlines.",
    paragraphs: [
      "I'm Miloš Novaković. 24, software-engineering student, professionally curious. I build websites with AI the way a good mechanic uses a lift: same craftsmanship, a lot less waiting. Then I do the part most builders skip and market the thing, mostly by email, until it earns its keep.",
      "Fluent in Serbian, English and subject lines. Favorite word: *shipped*.",
    ],
    fileHeading: "Personnel file, abridged",
    fileRows: [
      { k: "Based", v: "Serbia · GMT+1" },
      { k: "Studies", v: "Software engineering" },
      { k: "Shift hours", v: "Both of them" },
      { k: "Caffeine", v: "Above the recommended dose" },
    ],
    statusLabel: "STATUS",
    statusValue: "Awake. Probably.",
    photo: { key: "static:milos", alt: "Miloš Novaković" },
  },

  contact: {
    label: "02:13 · The part where it pays off",
    heading: "Everyone is asleep. The website is not.",
    pitch:
      "That is the whole pitch. Want a website that works both shifts? The calendar is right there. Fifteen minutes, no slides, no jargon, maybe one bad joke.",
    receiptsNote: "Last night, unsupervised · simulated until vujicauto launches",
    receipts: [
      { id: "r1", icon: "✓", title: "Order: brake pads, front axle", meta: "vujicauto.rs · 02:13" },
      { id: "r2", icon: "↑", title: "“delovi za auto”, page 1, spot 3", meta: "Google Search · 03:07" },
      { id: "r3", icon: "↺", title: "Cart rescued by email: €148", meta: "email flow · 04:26" },
    ],
    nightTotal: 412,
    nightTotalMeta: "3 orders",
    ctaLabel: "Book the short call",
    footerCopyright: "© 2026 Miloš Novaković · built in daylight, sold after dark",
    footerEmail: EMAIL,
    footerLockLabel: "Lock up behind you",
  },
};
