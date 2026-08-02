import type {
  AboutSection,
  CaseStudy,
  CaseStudyBlock,
  ContactSection,
  ContentDoc,
  Hero,
  ImageRef,
  Metric,
  Nav,
  NavLink,
  ProcessSection,
  ProcessStep,
  Project,
  Receipt,
  Service,
  ServicesSection,
  SiteSettings,
  WorkSection,
} from "./types";

type UnknownRecord = Record<string, unknown>;

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const DANGEROUS_SCHEME = /^(?:javascript|data|vbscript):/;
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATIC_IMAGE_KEY = /^static:[a-z0-9][a-z0-9-]{0,79}$/;
const MEDIA_IMAGE_KEY = /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}$/;
const CAL_PATH = /^[A-Za-z0-9][A-Za-z0-9._~-]{0,99}(?:\/[A-Za-z0-9][A-Za-z0-9._~-]{0,99}){1,5}\/?$/;

const EDITABLE_SECTIONS = [
  "site",
  "nav",
  "hero",
  "work",
  "services",
  "process",
  "about",
  "contact",
] as const;

export type EditableSection = (typeof EDITABLE_SECTIONS)[number];

export class ContentValidationError extends Error {
  constructor(
    readonly path: string,
    readonly code: string,
    detail: string
  ) {
    super(`${path}: ${detail}`);
    this.name = "ContentValidationError";
  }
}

function invalid(path: string, code: string, detail: string): never {
  throw new ContentValidationError(path, code, detail);
}

/** Safe for server logs: reports only a fixed category, never the rejected value. */
export function contentFailureReason(error: unknown): string {
  return error instanceof ContentValidationError
    ? `validation_${error.code}`
    : "content_read_failed";
}

function record(value: unknown, path: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return invalid(path, "expected_object", "must be an object");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    return invalid(path, "invalid_object", "must be a plain object");
  }
  return value as UnknownRecord;
}

function exactKeys(value: UnknownRecord, allowed: readonly string[], path: string): void {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      invalid(`${path}.${key}`, "unknown_field", "is not a supported field");
    }
  }
}

function text(
  value: unknown,
  path: string,
  { min = 0, max = 500 }: { min?: number; max?: number } = {}
): string {
  if (typeof value !== "string") invalid(path, "expected_string", "must be text");
  if (CONTROL_CHARACTERS.test(value)) {
    invalid(path, "control_character", "contains an unsupported control character");
  }
  if (value.length > max) invalid(path, "too_long", `must be at most ${max} characters`);
  if (value.trim().length < min) invalid(path, "required", "must not be empty");
  return value;
}

function boolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") invalid(path, "expected_boolean", "must be true or false");
  return value;
}

function finiteNumber(
  value: unknown,
  path: string,
  { min, max, integer = false }: { min: number; max: number; integer?: boolean }
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return invalid(path, "expected_number", "must be a finite number");
  }
  if (integer && !Number.isInteger(value)) {
    invalid(path, "expected_integer", "must be a whole number");
  }
  if (value < min || value > max) {
    invalid(path, "number_out_of_range", `must be between ${min} and ${max}`);
  }
  return value;
}

function list(value: unknown, path: string, max: number): unknown[] {
  if (!Array.isArray(value)) invalid(path, "expected_array", "must be a list");
  if (value.length > max) invalid(path, "too_many_items", `must contain at most ${max} items`);
  return value;
}

function identifier(value: unknown, path: string): string {
  const result = text(value, path, { min: 1, max: 128 });
  if (!ID_PATTERN.test(result)) {
    invalid(path, "invalid_id", "must use only letters, numbers, hyphens or underscores");
  }
  return result;
}

function assertUnique(values: string[], pathForIndex: (index: number) => string): void {
  const seen = new Set<string>();
  values.forEach((value, index) => {
    const normalized = value.toLocaleLowerCase("en-US");
    if (seen.has(normalized)) {
      invalid(pathForIndex(index), "duplicate_value", "must be unique within this list");
    }
    seen.add(normalized);
  });
}

function assertSafeStatus(value: unknown, path: string, max = 240): string {
  const result = text(value, path, { max });
  const compact = result.replace(/[\u0000-\u0020\u007f]+/g, "").toLocaleLowerCase("en-US");
  if (DANGEROUS_SCHEME.test(compact) || result.trimStart().startsWith("//")) {
    invalid(path, "unsafe_link", "contains an unsafe URL scheme");
  }
  if (/[<>]/.test(result)) invalid(path, "unsafe_text", "must not contain angle brackets");
  return result;
}

function assertHttpUrl(value: unknown, path: string, allowEmpty = true): string {
  const result = text(value, path, { min: allowEmpty ? 0 : 1, max: 2048 });
  if (!result && allowEmpty) return result;
  if (result !== result.trim() || /\s/.test(result)) {
    invalid(path, "invalid_url", "must be a complete URL without whitespace");
  }

  let parsed: URL;
  try {
    parsed = new URL(result);
  } catch {
    return invalid(path, "invalid_url", "must be a valid http or https URL");
  }

  if (!/^https?:$/.test(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) {
    invalid(path, "unsafe_url", "must be an http or https URL without embedded credentials");
  }
  return result;
}

function assertEmail(value: unknown, path: string): string {
  const result = text(value, path, { min: 3, max: 254 });
  if (result !== result.trim() || /\s/.test(result)) {
    invalid(path, "invalid_email", "must be a valid email address");
  }
  const parts = result.split("@");
  if (parts.length !== 2) invalid(path, "invalid_email", "must be a valid email address");
  const [local, domain] = parts;
  if (
    !local ||
    !domain ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)
  ) {
    invalid(path, "invalid_email", "must be a valid email address");
  }
  const labels = domain.split(".");
  if (
    labels.length < 2 ||
    labels.some(
      (label) =>
        !label ||
        label.length > 63 ||
        label.startsWith("-") ||
        label.endsWith("-") ||
        !/^[A-Za-z0-9-]+$/.test(label)
    )
  ) {
    invalid(path, "invalid_email", "must be a valid email address");
  }
  return result;
}

function assertCalLink(value: unknown, path: string): string {
  const result = text(value, path, { min: 1, max: 500 });
  if (result !== result.trim() || /\s/.test(result)) {
    invalid(path, "invalid_cal_link", "must be a Cal.com URL or username/event path");
  }

  if (/^https?:\/\//i.test(result)) {
    let parsed: URL;
    try {
      parsed = new URL(result);
    } catch {
      return invalid(path, "invalid_cal_link", "must be a valid Cal.com URL");
    }
    const hostname = parsed.hostname.toLocaleLowerCase("en-US");
    if (
      parsed.protocol !== "https:" ||
      (hostname !== "cal.com" && hostname !== "www.cal.com") ||
      parsed.username ||
      parsed.password ||
      !CAL_PATH.test(parsed.pathname.replace(/^\/+/, ""))
    ) {
      invalid(path, "unsafe_cal_link", "must point to an https://cal.com booking page");
    }
    return result;
  }

  const calPath = result.replace(/^\/+/, "");
  if (!CAL_PATH.test(calPath)) {
    invalid(path, "invalid_cal_link", "must use the username/event path format");
  }
  return result;
}

function assertNavHref(value: unknown, path: string): string {
  const result = text(value, path, { min: 1, max: 2048 });
  if (result !== result.trim() || /[\u0000-\u0020\u007f]/.test(result)) {
    invalid(path, "invalid_nav_href", "must not contain whitespace or control characters");
  }
  const compact = result.replace(/[\u0000-\u0020\u007f]+/g, "").toLocaleLowerCase("en-US");
  if (DANGEROUS_SCHEME.test(compact)) {
    invalid(path, "unsafe_nav_href", "contains an unsafe URL scheme");
  }

  if (result.startsWith("#")) {
    if (!/^#[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(result)) {
      invalid(path, "invalid_nav_href", "must target a named section, not an empty #");
    }
    return result;
  }

  if (result.startsWith("/")) {
    if (result.startsWith("//") || result.includes("\\")) {
      invalid(path, "unsafe_nav_href", "must be a local path, not a protocol-relative URL");
    }
    try {
      new URL(result, "https://portfolio.invalid");
    } catch {
      return invalid(path, "invalid_nav_href", "must be a valid local path");
    }
    return result;
  }

  if (result.toLocaleLowerCase("en-US").startsWith("mailto:")) {
    assertEmail(result.slice(7), path);
    return result;
  }

  return assertHttpUrl(result, path, false);
}

function assertCssColor(value: unknown, path: string): string {
  const result = text(value, path, { min: 1, max: 80 });
  const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
  const functional = /^(?:rgb|rgba|hsl|hsla)\([0-9.,%+\-/\s]+\)$/i;
  const named = /^(?:transparent|currentcolor|black|white)$/i;
  if (!hex.test(result) && !functional.test(result) && !named.test(result)) {
    invalid(path, "invalid_color", "must be a hex, rgb(a) or hsl(a) color");
  }
  return result;
}

function validateImageRef(value: unknown, path: string): ImageRef {
  const image = record(value, path);
  exactKeys(image, ["key", "alt", "blurDataURL", "width", "height"], path);

  const key = text(image.key, `${path}.key`, { min: 1, max: 192 });
  if (
    key.includes("..") ||
    (!STATIC_IMAGE_KEY.test(key) && (!MEDIA_IMAGE_KEY.test(key) || key.includes(":")))
  ) {
    invalid(`${path}.key`, "unsafe_image_key", "must be a safe static or uploaded media key");
  }
  text(image.alt, `${path}.alt`, { min: 1, max: 500 });

  if (image.blurDataURL !== undefined) {
    const blur = text(image.blurDataURL, `${path}.blurDataURL`, { min: 1, max: 50_000 });
    if (!/^data:image\/(?:png|jpeg|webp|avif);base64,[A-Za-z0-9+/=]+$/.test(blur)) {
      invalid(`${path}.blurDataURL`, "invalid_blur_data", "must be a small base64 image data URL");
    }
  }
  if (image.width !== undefined) {
    finiteNumber(image.width, `${path}.width`, { min: 1, max: 20_000, integer: true });
  }
  if (image.height !== undefined) {
    finiteNumber(image.height, `${path}.height`, { min: 1, max: 20_000, integer: true });
  }
  return image as unknown as ImageRef;
}

function validateSite(value: unknown, path = "site"): SiteSettings {
  const site = record(value, path);
  exactKeys(
    site,
    [
      "metaTitle",
      "metaDescription",
      "ogTitle",
      "ogDescription",
      "siteName",
      "email",
      "calLink",
      "openForProjects",
      "launched",
    ],
    path
  );
  text(site.metaTitle, `${path}.metaTitle`, { min: 1, max: 120 });
  text(site.metaDescription, `${path}.metaDescription`, { min: 1, max: 320 });
  text(site.ogTitle, `${path}.ogTitle`, { min: 1, max: 160 });
  text(site.ogDescription, `${path}.ogDescription`, { min: 1, max: 400 });
  text(site.siteName, `${path}.siteName`, { min: 1, max: 120 });
  assertEmail(site.email, `${path}.email`);
  assertCalLink(site.calLink, `${path}.calLink`);
  boolean(site.openForProjects, `${path}.openForProjects`);
  boolean(site.launched, `${path}.launched`);
  return site as unknown as SiteSettings;
}

function validateNavLink(value: unknown, path: string): NavLink {
  const link = record(value, path);
  exactKeys(link, ["href", "label"], path);
  assertNavHref(link.href, `${path}.href`);
  text(link.label, `${path}.label`, { min: 1, max: 100 });
  return link as unknown as NavLink;
}

function validateNav(value: unknown, path = "nav"): Nav {
  const nav = record(value, path);
  exactKeys(nav, ["brand", "links", "ctaLabel", "clockStartMin", "clockEndMin"], path);
  text(nav.brand, `${path}.brand`, { min: 1, max: 120 });
  text(nav.ctaLabel, `${path}.ctaLabel`, { min: 1, max: 100 });
  const links = list(nav.links, `${path}.links`, 20);
  links.forEach((link, index) => validateNavLink(link, `${path}.links[${index}]`));
  const start = finiteNumber(nav.clockStartMin, `${path}.clockStartMin`, {
    min: 0,
    max: 2_880,
    integer: true,
  });
  const end = finiteNumber(nav.clockEndMin, `${path}.clockEndMin`, {
    min: 0,
    max: 2_880,
    integer: true,
  });
  if (end <= start) invalid(`${path}.clockEndMin`, "invalid_clock_range", "must be after start");
  return nav as unknown as Nav;
}

function validateHero(value: unknown, path = "hero"): Hero {
  const hero = record(value, path);
  exactKeys(hero, ["day", "night", "sunHint", "cornerLeft", "openForProjectsLabel"], path);

  const day = record(hero.day, `${path}.day`);
  exactKeys(day, ["label", "title", "body"], `${path}.day`);
  text(day.label, `${path}.day.label`, { min: 1, max: 160 });
  text(day.title, `${path}.day.title`, { min: 1, max: 180 });
  text(day.body, `${path}.day.body`, { min: 1, max: 1_500 });

  const night = record(hero.night, `${path}.night`);
  exactKeys(night, ["title", "body"], `${path}.night`);
  text(night.title, `${path}.night.title`, { min: 1, max: 180 });
  text(night.body, `${path}.night.body`, { max: 1_500 });

  text(hero.sunHint, `${path}.sunHint`, { max: 160 });
  text(hero.cornerLeft, `${path}.cornerLeft`, { max: 300 });
  text(hero.openForProjectsLabel, `${path}.openForProjectsLabel`, { min: 1, max: 160 });
  return hero as unknown as Hero;
}

function validateMetric(value: unknown, path: string): Metric {
  const metric = record(value, path);
  exactKeys(metric, ["id", "value", "label"], path);
  identifier(metric.id, `${path}.id`);
  text(metric.value, `${path}.value`, { max: 100 });
  text(metric.label, `${path}.label`, { max: 240 });
  return metric as unknown as Metric;
}

function validateCaseBlock(value: unknown, path: string): CaseStudyBlock {
  const block = record(value, path);
  exactKeys(block, ["id", "heading", "body", "image"], path);
  identifier(block.id, `${path}.id`);
  text(block.heading, `${path}.heading`, { max: 200 });
  text(block.body, `${path}.body`, { max: 8_000 });
  if (block.image !== undefined) validateImageRef(block.image, `${path}.image`);
  return block as unknown as CaseStudyBlock;
}

function validateCaseStudy(value: unknown, path: string): CaseStudy {
  const study = record(value, path);
  exactKeys(study, ["enabled", "intro", "liveUrl", "tags", "metrics", "blocks", "gallery"], path);
  boolean(study.enabled, `${path}.enabled`);
  if (study.intro !== undefined) text(study.intro, `${path}.intro`, { max: 1_500 });
  if (study.liveUrl !== undefined) assertHttpUrl(study.liveUrl, `${path}.liveUrl`);

  if (study.tags !== undefined) {
    const tags = list(study.tags, `${path}.tags`, 20);
    const values = tags.map((tag, index) =>
      text(tag, `${path}.tags[${index}]`, { min: 1, max: 80 })
    );
    assertUnique(values, (index) => `${path}.tags[${index}]`);
  }

  if (study.metrics !== undefined) {
    const metrics = list(study.metrics, `${path}.metrics`, 20).map((metric, index) =>
      validateMetric(metric, `${path}.metrics[${index}]`)
    );
    assertUnique(
      metrics.map((metric) => metric.id),
      (index) => `${path}.metrics[${index}].id`
    );
  }

  if (study.blocks !== undefined) {
    const blocks = list(study.blocks, `${path}.blocks`, 30).map((block, index) =>
      validateCaseBlock(block, `${path}.blocks[${index}]`)
    );
    assertUnique(
      blocks.map((block) => block.id),
      (index) => `${path}.blocks[${index}].id`
    );
  }

  if (study.gallery !== undefined) {
    list(study.gallery, `${path}.gallery`, 30).forEach((image, index) =>
      validateImageRef(image, `${path}.gallery[${index}]`)
    );
  }
  return study as unknown as CaseStudy;
}

const CASE_PROJECT_KEYS = [
  "id",
  "kind",
  "order",
  "published",
  "featured",
  "title",
  "statusLink",
  "description",
  "urlBar",
  "badge",
  "screenshot",
  "productShot",
  "slug",
  "caseStudy",
] as const;

function validateProject(value: unknown, path: string): Project {
  const project = record(value, path);
  const kind = text(project.kind, `${path}.kind`, { min: 1, max: 20 });
  if (kind !== "case" && kind !== "redacted" && kind !== "reserved") {
    invalid(`${path}.kind`, "invalid_project_kind", "must be case, redacted or reserved");
  }

  const allowed =
    kind === "case"
      ? CASE_PROJECT_KEYS
      : kind === "reserved"
        ? (["id", "kind", "order", "published", "label", "cardTitle", "blurb", "ctaLabel"] as const)
        : (["id", "kind", "order", "published", "label", "cardTitle", "blurb"] as const);
  exactKeys(project, allowed, path);

  identifier(project.id, `${path}.id`);
  finiteNumber(project.order, `${path}.order`, { min: 0, max: 9_999, integer: true });
  const published = boolean(project.published, `${path}.published`);

  if (kind === "case") {
    if (project.featured !== undefined) boolean(project.featured, `${path}.featured`);
    if (project.title !== undefined) text(project.title, `${path}.title`, { max: 180 });
    if (published) text(project.title, `${path}.title`, { min: 1, max: 180 });
    if (project.statusLink !== undefined) {
      assertSafeStatus(project.statusLink, `${path}.statusLink`);
    }
    if (project.description !== undefined) {
      text(project.description, `${path}.description`, { max: 5_000 });
    }
    if (project.urlBar !== undefined) assertSafeStatus(project.urlBar, `${path}.urlBar`, 240);
    if (project.badge !== undefined) text(project.badge, `${path}.badge`, { max: 40 });
    if (project.screenshot !== undefined) validateImageRef(project.screenshot, `${path}.screenshot`);
    if (project.productShot !== undefined) {
      validateImageRef(project.productShot, `${path}.productShot`);
    }

    let slug = "";
    if (project.slug !== undefined) {
      slug = text(project.slug, `${path}.slug`, { max: 80 });
      if (slug && !SLUG_PATTERN.test(slug)) {
        invalid(`${path}.slug`, "invalid_slug", "must use lowercase words separated by hyphens");
      }
    }
    if (project.caseStudy !== undefined) {
      const study = validateCaseStudy(project.caseStudy, `${path}.caseStudy`);
      if (study.enabled && !slug) {
        invalid(`${path}.slug`, "required_slug", "is required when the case-study page is enabled");
      }
    }
  } else {
    if (project.label !== undefined) text(project.label, `${path}.label`, { max: 160 });
    if (project.cardTitle !== undefined) text(project.cardTitle, `${path}.cardTitle`, { max: 180 });
    if (project.blurb !== undefined) text(project.blurb, `${path}.blurb`, { max: 2_000 });
    if (kind === "reserved" && project.ctaLabel !== undefined) {
      text(project.ctaLabel, `${path}.ctaLabel`, { max: 120 });
    }
  }
  return project as unknown as Project;
}

function validateWork(value: unknown, path = "work"): WorkSection {
  const work = record(value, path);
  exactKeys(work, ["label", "sublabel", "projects"], path);
  text(work.label, `${path}.label`, { max: 180 });
  text(work.sublabel, `${path}.sublabel`, { max: 300 });
  const projects = list(work.projects, `${path}.projects`, 50).map((project, index) =>
    validateProject(project, `${path}.projects[${index}]`)
  );

  assertUnique(
    projects.map((project) => project.id),
    (index) => `${path}.projects[${index}].id`
  );
  assertUnique(
    projects
      .map((project, index) => ({ slug: project.slug?.trim(), index }))
      .filter((entry): entry is { slug: string; index: number } => Boolean(entry.slug))
      .map((entry) => entry.slug),
    (duplicateIndex) => {
      const slugs = projects
        .map((project, index) => ({ slug: project.slug?.trim(), index }))
        .filter((entry): entry is { slug: string; index: number } => Boolean(entry.slug));
      return `${path}.projects[${slugs[duplicateIndex].index}].slug`;
    }
  );
  assertUnique(
    projects.map((project) => String(project.order)),
    (index) => `${path}.projects[${index}].order`
  );
  return work as unknown as WorkSection;
}

function validateService(value: unknown, path: string): Service {
  const service = record(value, path);
  exactKeys(service, ["id", "n", "title", "blurb", "favorite", "shift", "stroke"], path);
  identifier(service.id, `${path}.id`);
  text(service.n, `${path}.n`, { min: 1, max: 20 });
  text(service.title, `${path}.title`, { max: 200 });
  text(service.blurb, `${path}.blurb`, { max: 3_000 });
  boolean(service.favorite, `${path}.favorite`);
  text(service.shift, `${path}.shift`, { max: 240 });
  assertCssColor(service.stroke, `${path}.stroke`);
  return service as unknown as Service;
}

function validateServices(value: unknown, path = "services"): ServicesSection {
  const services = record(value, path);
  exactKeys(services, ["label", "heading", "rows"], path);
  text(services.label, `${path}.label`, { max: 180 });
  text(services.heading, `${path}.heading`, { max: 300 });
  const rows = list(services.rows, `${path}.rows`, 20).map((row, index) =>
    validateService(row, `${path}.rows[${index}]`)
  );
  assertUnique(
    rows.map((row) => row.id),
    (index) => `${path}.rows[${index}].id`
  );
  return services as unknown as ServicesSection;
}

function validateProcessStep(value: unknown, path: string): ProcessStep {
  const step = record(value, path);
  exactKeys(step, ["id", "label", "title", "blurb", "ctaLabel", "dot", "ring", "stroke"], path);
  identifier(step.id, `${path}.id`);
  text(step.label, `${path}.label`, { max: 160 });
  text(step.title, `${path}.title`, { max: 200 });
  text(step.blurb, `${path}.blurb`, { max: 3_000 });
  if (step.ctaLabel !== undefined) text(step.ctaLabel, `${path}.ctaLabel`, { max: 120 });
  assertCssColor(step.dot, `${path}.dot`);
  assertCssColor(step.ring, `${path}.ring`);
  assertCssColor(step.stroke, `${path}.stroke`);
  return step as unknown as ProcessStep;
}

function validateProcess(value: unknown, path = "process"): ProcessSection {
  const process = record(value, path);
  exactKeys(process, ["label", "heading", "steps"], path);
  text(process.label, `${path}.label`, { max: 180 });
  text(process.heading, `${path}.heading`, { max: 300 });
  const steps = list(process.steps, `${path}.steps`, 20).map((step, index) =>
    validateProcessStep(step, `${path}.steps[${index}]`)
  );
  assertUnique(
    steps.map((step) => step.id),
    (index) => `${path}.steps[${index}].id`
  );
  return process as unknown as ProcessSection;
}

function validateAbout(value: unknown, path = "about"): AboutSection {
  const about = record(value, path);
  exactKeys(
    about,
    ["label", "heading", "paragraphs", "fileHeading", "fileRows", "statusLabel", "statusValue", "photo"],
    path
  );
  text(about.label, `${path}.label`, { max: 180 });
  text(about.heading, `${path}.heading`, { max: 300 });
  list(about.paragraphs, `${path}.paragraphs`, 30).forEach((paragraph, index) =>
    text(paragraph, `${path}.paragraphs[${index}]`, { max: 8_000 })
  );
  text(about.fileHeading, `${path}.fileHeading`, { max: 160 });
  list(about.fileRows, `${path}.fileRows`, 30).forEach((value, index) => {
    const rowPath = `${path}.fileRows[${index}]`;
    const row = record(value, rowPath);
    exactKeys(row, ["k", "v"], rowPath);
    text(row.k, `${rowPath}.k`, { max: 120 });
    text(row.v, `${rowPath}.v`, { max: 300 });
  });
  text(about.statusLabel, `${path}.statusLabel`, { max: 120 });
  text(about.statusValue, `${path}.statusValue`, { max: 160 });
  validateImageRef(about.photo, `${path}.photo`);
  return about as unknown as AboutSection;
}

function validateReceipt(value: unknown, path: string): Receipt {
  const receipt = record(value, path);
  exactKeys(receipt, ["id", "icon", "title", "meta"], path);
  identifier(receipt.id, `${path}.id`);
  text(receipt.icon, `${path}.icon`, { max: 30 });
  text(receipt.title, `${path}.title`, { max: 240 });
  text(receipt.meta, `${path}.meta`, { max: 300 });
  return receipt as unknown as Receipt;
}

function validateContact(value: unknown, path = "contact"): ContactSection {
  const contact = record(value, path);
  exactKeys(
    contact,
    [
      "label",
      "heading",
      "pitch",
      "receiptsNote",
      "receipts",
      "nightTotal",
      "nightTotalMeta",
      "ctaLabel",
      "footerCopyright",
      "footerEmail",
      "footerLockLabel",
    ],
    path
  );
  text(contact.label, `${path}.label`, { max: 180 });
  text(contact.heading, `${path}.heading`, { max: 300 });
  text(contact.pitch, `${path}.pitch`, { max: 5_000 });
  text(contact.receiptsNote, `${path}.receiptsNote`, { max: 240 });
  const receipts = list(contact.receipts, `${path}.receipts`, 20).map((receipt, index) =>
    validateReceipt(receipt, `${path}.receipts[${index}]`)
  );
  assertUnique(
    receipts.map((receipt) => receipt.id),
    (index) => `${path}.receipts[${index}].id`
  );
  finiteNumber(contact.nightTotal, `${path}.nightTotal`, { min: 0, max: 1_000_000 });
  text(contact.nightTotalMeta, `${path}.nightTotalMeta`, { max: 160 });
  text(contact.ctaLabel, `${path}.ctaLabel`, { min: 1, max: 120 });
  text(contact.footerCopyright, `${path}.footerCopyright`, { max: 300 });
  assertEmail(contact.footerEmail, `${path}.footerEmail`);
  text(contact.footerLockLabel, `${path}.footerLockLabel`, { max: 120 });
  return contact as unknown as ContactSection;
}

export function validateSection(
  section: keyof ContentDoc,
  value: unknown
): ContentDoc[EditableSection] {
  switch (section) {
    case "site":
      return validateSite(value);
    case "nav":
      return validateNav(value);
    case "hero":
      return validateHero(value);
    case "work":
      return validateWork(value);
    case "services":
      return validateServices(value);
    case "process":
      return validateProcess(value);
    case "about":
      return validateAbout(value);
    case "contact":
      return validateContact(value);
    default:
      return invalid("section", "invalid_section", "is not an editable content section");
  }
}

export function validateContentDoc(value: unknown): ContentDoc {
  const content = record(value, "content");
  exactKeys(content, ["version", ...EDITABLE_SECTIONS], "content");
  finiteNumber(content.version, "content.version", { min: 1, max: 1_000_000, integer: true });

  validateSite(content.site);
  validateNav(content.nav);
  validateHero(content.hero);
  validateWork(content.work);
  validateServices(content.services);
  validateProcess(content.process);
  validateAbout(content.about);
  validateContact(content.contact);
  return content as unknown as ContentDoc;
}
