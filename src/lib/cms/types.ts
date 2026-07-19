/**
 * Content model for the CMS. One `ContentDoc` describes the entire public
 * site; it is stored as a single JSON blob (store `cms`, key `content`) and
 * merged over `DEFAULT_CONTENT` on read so a missing field never breaks a page.
 */

/**
 * Image reference. `key` is either:
 *  - `static:<name>`  → a build-time import shipped with the repo (default art),
 *                        resolved in `@/components/cms/media-image`.
 *  - `<mediaKey>`     → a blob in the `cms-media` store, served at `/media/<key>`.
 */
export interface ImageRef {
  key: string;
  alt: string;
  /** Tiny data URL for the blur placeholder (uploaded media only). */
  blurDataURL?: string;
  width?: number;
  height?: number;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Hero {
  day: { label: string; title: string; body: string };
  night: { title: string; body: string };
  sunHint: string;
  cornerLeft: string;
  /** Left half of the right corner note; the live month is appended after it. */
  openForProjectsLabel: string;
}

export interface Nav {
  brand: string;
  links: NavLink[];
  ctaLabel: string;
  /** Scroll-linked clock range, in minutes past midnight (end may exceed 1440). */
  clockStartMin: number;
  clockEndMin: number;
}

export type ProjectKind = "case" | "redacted" | "reserved";

export interface Project {
  id: string;
  kind: ProjectKind;
  order: number;
  published: boolean;
  /** Marks the single case study rendered as the large showcase. */
  featured?: boolean;

  // --- kind: "case" ---
  title?: string;
  statusLink?: string;
  description?: string;
  urlBar?: string;
  badge?: string;
  /** Shown in the browser frame. */
  screenshot?: ImageRef;
  /** Shown in the secondary product-shot card. */
  productShot?: ImageRef;

  // --- kind: "redacted" | "reserved" ---
  label?: string;
  cardTitle?: string;
  blurb?: string;
  ctaLabel?: string;
}

export interface WorkSection {
  label: string;
  sublabel: string;
  projects: Project[];
}

export interface Service {
  id: string;
  n: string;
  title: string;
  blurb: string;
  favorite: boolean;
  shift: string;
  stroke: string;
}

export interface ServicesSection {
  label: string;
  heading: string;
  rows: Service[];
}

export interface ProcessStep {
  id: string;
  label: string;
  title: string;
  blurb: string;
  /** Optional inline Cal.com booking link appended after the blurb. */
  ctaLabel?: string;
  dot: string;
  ring: string;
  stroke: string;
}

export interface ProcessSection {
  label: string;
  heading: string;
  steps: ProcessStep[];
}

export interface FileRow {
  k: string;
  v: string;
}

export interface AboutSection {
  label: string;
  heading: string;
  /** Body copy; `*word*` renders as amber emphasis. */
  paragraphs: string[];
  fileHeading: string;
  fileRows: FileRow[];
  statusLabel: string;
  statusValue: string;
  photo: ImageRef;
}

export interface Receipt {
  id: string;
  icon: string;
  title: string;
  meta: string;
}

export interface ContactSection {
  label: string;
  heading: string;
  pitch: string;
  receiptsNote: string;
  receipts: Receipt[];
  nightTotal: number;
  nightTotalMeta: string;
  ctaLabel: string;
  footerCopyright: string;
  footerEmail: string;
  footerLockLabel: string;
}

export interface SiteSettings {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  siteName: string;
  email: string;
  calLink: string;
  /** Drives the hero "Open for projects" corner note. */
  openForProjects: boolean;
  /** When true the pre-launch vault wall is lifted and the site is indexable. */
  launched: boolean;
}

export interface ContentDoc {
  version: number;
  site: SiteSettings;
  nav: Nav;
  hero: Hero;
  work: WorkSection;
  services: ServicesSection;
  process: ProcessSection;
  about: AboutSection;
  contact: ContactSection;
}

/** Metadata stored alongside each blob in the `cms-media` store. */
export interface MediaMeta {
  contentType: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  originalName?: string;
  size: number;
  createdAt: number;
}

export interface MediaItem extends MediaMeta {
  key: string;
}
