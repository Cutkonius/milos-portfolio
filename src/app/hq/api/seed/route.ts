import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/guard";
import { getContentAdmin, saveContent } from "@/lib/cms/content";
import { DEFAULT_CONTENT } from "@/lib/cms/defaults";

export const runtime = "nodejs";

/**
 * Writes the default content into the store, once. Idempotent: if a content
 * doc already exists it does nothing. The public site works without this (it
 * falls back to the same defaults), but seeding gives the store a canonical
 * doc so the admin, backups and media all start from a known state.
 */
export async function POST() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { etag } = await getContentAdmin();
  if (etag) {
    return NextResponse.json({ ok: true, seeded: false, message: "Content already exists." });
  }
  await saveContent(DEFAULT_CONTENT);
  return NextResponse.json({ ok: true, seeded: true });
}
