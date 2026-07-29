import { cache } from "react";
import { revalidatePath } from "next/cache";
import { DEFAULT_CONTENT } from "./defaults";
import type { ContentDoc } from "./types";
import { CMS_STORE, listKeys, readJSON, removeKey, writeJSON } from "./store";

/** Published doc the public site reads. */
export const CONTENT_KEY = "content";
/** The admin's working copy; published on demand. */
export const DRAFT_KEY = "draft";
const BACKUP_PREFIX = "backups/";
/** Keep at most this many restore points; older ones are pruned on publish. */
const MAX_BACKUPS = 50;

export interface Version {
  key: string;
  /** Epoch millis the snapshot was taken. */
  at: number;
}

/** Fill any missing field from defaults; stored arrays replace defaults wholesale. */
function mergeSection<T>(def: T, stored: Partial<T> | undefined): T {
  if (!stored || typeof stored !== "object") return def;
  const out = { ...(def as Record<string, unknown>) };
  for (const [k, v] of Object.entries(stored)) {
    if (v === undefined) continue;
    const dv = (def as Record<string, unknown>)[k];
    if (Array.isArray(v)) out[k] = v;
    else if (v && typeof v === "object" && dv && typeof dv === "object" && !Array.isArray(dv))
      out[k] = { ...(dv as object), ...(v as object) };
    else out[k] = v;
  }
  return out as T;
}

function withDefaults(stored: Partial<ContentDoc> | null): ContentDoc {
  const d = DEFAULT_CONTENT;
  if (!stored) return d;

  /*
   * Version 9 is a focused clarity pass. Preserve every published section
   * except the hero and process copy that this release intentionally replaces.
   */
  if ((stored.version ?? 0) === 8 && d.version === 9) {
    return {
      version: d.version,
      site: mergeSection(d.site, stored.site),
      nav: mergeSection(d.nav, stored.nav),
      hero: d.hero,
      work: mergeSection(d.work, stored.work),
      services: mergeSection(d.services, stored.services),
      process: d.process,
      about: mergeSection(d.about, stored.about),
      contact: mergeSection(d.contact, stored.contact),
    };
  }

  /*
   * Editorial versions replace the public narrative rather than only adding
   * optional fields. Promote older documents to the latest copy while keeping
   * operational settings and media that should remain available in the CMS.
   */
  if ((stored.version ?? 0) < d.version) {
    const storedFeatured = stored.work?.projects?.find((project) => project.id === "vujicauto");
    const projects = d.work.projects.map((project) => {
      if (project.id !== "vujicauto" || !storedFeatured) return project;
      return {
        ...project,
        screenshot: storedFeatured.screenshot ?? project.screenshot,
        productShot: storedFeatured.productShot ?? project.productShot,
        caseStudy: project.caseStudy
          ? {
              ...project.caseStudy,
              liveUrl: storedFeatured.caseStudy?.liveUrl ?? project.caseStudy.liveUrl,
              gallery: storedFeatured.caseStudy?.gallery ?? project.caseStudy.gallery,
            }
          : undefined,
      };
    });

    return {
      ...d,
      site: {
        ...d.site,
        siteName: stored.site?.siteName ?? d.site.siteName,
        email: stored.site?.email ?? d.site.email,
        calLink: stored.site?.calLink ?? d.site.calLink,
        openForProjects: stored.site?.openForProjects ?? d.site.openForProjects,
        launched: stored.site?.launched ?? d.site.launched,
      },
      work: { ...d.work, projects },
      about: {
        ...d.about,
        photo: stored.about?.photo ?? d.about.photo,
      },
      contact: {
        ...d.contact,
        footerEmail: stored.contact?.footerEmail ?? stored.site?.email ?? d.contact.footerEmail,
      },
    };
  }

  return {
    version: stored.version ?? d.version,
    site: mergeSection(d.site, stored.site),
    nav: mergeSection(d.nav, stored.nav),
    hero: mergeSection(d.hero, stored.hero),
    work: mergeSection(d.work, stored.work),
    services: mergeSection(d.services, stored.services),
    process: mergeSection(d.process, stored.process),
    about: mergeSection(d.about, stored.about),
    contact: mergeSection(d.contact, stored.contact),
  };
}

/**
 * Public read (the published doc). Memoized per render. Never throws. The
 * public site falls back to defaults if the store is empty or unreachable.
 */
export const getContent = cache(async (): Promise<ContentDoc> => {
  try {
    const res = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY);
    return withDefaults(res?.value ?? null);
  } catch {
    return DEFAULT_CONTENT;
  }
});

/** The published doc, uncached (for publish comparison). */
async function getPublished(): Promise<ContentDoc> {
  const res = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY, { consistency: "strong" });
  return withDefaults(res?.value ?? null);
}

/**
 * The admin's working copy: the draft if one exists, otherwise the published
 * doc (so editing always starts from what's live). Strong consistency + carries
 * the ETag so the dashboard can tell an empty store from a seeded one.
 */
export async function getContentAdmin(): Promise<{ content: ContentDoc; etag: string | null }> {
  const draft = await readJSON<ContentDoc>(CMS_STORE, DRAFT_KEY, { consistency: "strong" });
  if (draft) return { content: withDefaults(draft.value), etag: draft.etag };
  const pub = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY, { consistency: "strong" });
  return { content: withDefaults(pub?.value ?? null), etag: pub?.etag ?? null };
}

/** Save the working copy. Not public until published, so no revalidation. */
export async function saveDraft(next: ContentDoc): Promise<{ etag: string | null }> {
  return writeJSON(CMS_STORE, DRAFT_KEY, next);
}

/** True when the draft differs from what's published. */
export async function hasUnpublishedChanges(): Promise<boolean> {
  const draft = await readJSON<ContentDoc>(CMS_STORE, DRAFT_KEY, { consistency: "strong" });
  if (!draft) return false;
  return JSON.stringify(withDefaults(draft.value)) !== JSON.stringify(await getPublished());
}

/** Promote the draft to live (snapshots the previous published doc first). */
export async function publish(): Promise<boolean> {
  const draft = await readJSON<ContentDoc>(CMS_STORE, DRAFT_KEY, { consistency: "strong" });
  if (!draft) return false;
  await saveContent(withDefaults(draft.value));
  return true;
}

/** Throw away draft edits and reset the working copy to what's published. */
export async function discardDraft(): Promise<void> {
  await saveDraft(await getPublished());
}

/**
 * Write the published doc: snapshot the previous version into
 * `backups/<millis>`, prune old ones, then publish and revalidate the site.
 */
export async function saveContent(next: ContentDoc): Promise<{ etag: string | null }> {
  const current = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY, { consistency: "strong" });
  if (current) {
    await writeJSON(CMS_STORE, `${BACKUP_PREFIX}${Date.now()}`, current.value).catch(() => {});
    await pruneBackups().catch(() => {});
  }
  const res = await writeJSON(CMS_STORE, CONTENT_KEY, next);
  revalidatePath("/");
  revalidatePath("/work/[slug]", "page");
  return res;
}

async function pruneBackups(): Promise<void> {
  const versions = await listVersions();
  for (const v of versions.slice(MAX_BACKUPS)) {
    await removeKey(CMS_STORE, v.key).catch(() => {});
  }
}

/** Restore points, newest first. */
export async function listVersions(): Promise<Version[]> {
  const keys = await listKeys(CMS_STORE, BACKUP_PREFIX);
  return keys
    .map((key) => ({ key, at: Number(key.slice(BACKUP_PREFIX.length)) }))
    .filter((v) => Number.isFinite(v.at))
    .sort((a, b) => b.at - a.at);
}

export async function getVersion(key: string): Promise<ContentDoc | null> {
  if (!key.startsWith(BACKUP_PREFIX)) return null;
  const res = await readJSON<ContentDoc>(CMS_STORE, key, { consistency: "strong" });
  return res ? withDefaults(res.value) : null;
}

/** Restore a snapshot as the live content and sync the draft to match. */
export async function restoreVersion(key: string): Promise<boolean> {
  const doc = await getVersion(key);
  if (!doc) return false;
  await saveContent(doc);
  await saveDraft(doc);
  return true;
}
