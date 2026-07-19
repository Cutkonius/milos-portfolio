"use server";

import { requireAdmin } from "@/lib/cms/guard";
import { getContentAdmin, saveContent } from "@/lib/cms/content";
import { deleteMedia } from "@/lib/cms/media";
import type { ContentDoc } from "@/lib/cms/types";

export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * Read-modify-write a single top-level section of the content doc. Reads the
 * current doc fresh (preserving other sections), replaces the named section,
 * saves (which snapshots a backup and revalidates the public site).
 */
export async function saveSection(section: keyof ContentDoc, value: unknown): Promise<SaveResult> {
  try {
    await requireAdmin();
    const { content } = await getContentAdmin();
    await saveContent({ ...content, [section]: value } as ContentDoc);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "save_failed" };
  }
}

export async function deleteMediaAction(key: string): Promise<SaveResult> {
  try {
    await requireAdmin();
    await deleteMedia(key);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "delete_failed" };
  }
}
