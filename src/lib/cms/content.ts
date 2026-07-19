import { cache } from "react";
import { revalidatePath } from "next/cache";
import { DEFAULT_CONTENT } from "./defaults";
import type { ContentDoc } from "./types";
import { CMS_STORE, readJSON, writeJSON } from "./store";

export const CONTENT_KEY = "content";

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
 * Public read. Memoized per render (React cache) so the several sections that
 * ask for content in one render share a single store hit. Never throws — the
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

/** Admin read — strong consistency, uncached, carries the ETag for safe saves. */
export async function getContentAdmin(): Promise<{ content: ContentDoc; etag: string | null }> {
  const res = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY, { consistency: "strong" });
  return { content: withDefaults(res?.value ?? null), etag: res?.etag ?? null };
}

/**
 * Overwrite the whole content doc. Snapshots the previous version into
 * `backups/<timestamp>`, honours an optional ETag precondition (throws
 * ConflictError on a stale edit), and revalidates the public site.
 */
export async function saveContent(
  next: ContentDoc,
  onlyIfMatch?: string | null
): Promise<{ etag: string | null }> {
  const current = await readJSON<ContentDoc>(CMS_STORE, CONTENT_KEY, { consistency: "strong" });
  if (current) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await writeJSON(CMS_STORE, `backups/${stamp}`, current.value).catch(() => {});
  }
  const res = await writeJSON(CMS_STORE, CONTENT_KEY, next, {
    onlyIfMatch: onlyIfMatch || undefined,
  });
  revalidatePath("/");
  return res;
}
