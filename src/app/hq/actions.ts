"use server";

import { requireAdmin } from "@/lib/cms/guard";
import {
  discardDraft,
  getContentAdmin,
  publish,
  restoreVersion,
  saveDraft,
} from "@/lib/cms/content";
import { deleteMedia } from "@/lib/cms/media";
import type { ContentDoc } from "@/lib/cms/types";

export type SaveResult = { ok: true } | { ok: false; error: string };

function fail(err: unknown, fallback: string): SaveResult {
  return { ok: false, error: err instanceof Error ? err.message : fallback };
}

/**
 * Read-modify-write a single section of the DRAFT. Reads the working copy,
 * replaces the named section, and saves it back. Nothing goes live until the
 * draft is published.
 */
export async function saveSection(section: keyof ContentDoc, value: unknown): Promise<SaveResult> {
  try {
    await requireAdmin();
    const { content } = await getContentAdmin();
    await saveDraft({ ...content, [section]: value } as ContentDoc);
    return { ok: true };
  } catch (err) {
    return fail(err, "save_failed");
  }
}

/** Promote the draft to the live site. */
export async function publishAction(): Promise<SaveResult> {
  try {
    await requireAdmin();
    await publish();
    return { ok: true };
  } catch (err) {
    return fail(err, "publish_failed");
  }
}

/** Discard draft edits, resetting the working copy to what's live. */
export async function discardAction(): Promise<SaveResult> {
  try {
    await requireAdmin();
    await discardDraft();
    return { ok: true };
  } catch (err) {
    return fail(err, "discard_failed");
  }
}

export async function deleteMediaAction(key: string): Promise<SaveResult> {
  try {
    await requireAdmin();
    await deleteMedia(key);
    return { ok: true };
  } catch (err) {
    return fail(err, "delete_failed");
  }
}

export async function restoreVersionAction(key: string): Promise<SaveResult> {
  try {
    await requireAdmin();
    const ok = await restoreVersion(key);
    return ok ? { ok: true } : { ok: false, error: "version_not_found" };
  } catch (err) {
    return fail(err, "restore_failed");
  }
}
