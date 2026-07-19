import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/guard";
import { putMedia } from "@/lib/cms/media";

export const runtime = "nodejs";

/** Ceiling for a single upload through the function path (Netlify ~4.5 MB). */
const MAX_BYTES = 4_500_000;

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"]);

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  const contentType = file.type || "application/octet-stream";
  if (!ALLOWED.has(contentType)) {
    return NextResponse.json({ ok: false, error: "unsupported_type" }, { status: 415 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const width = Number(form.get("width")) || undefined;
  const height = Number(form.get("height")) || undefined;
  const blurDataURL = (form.get("blurDataURL") as string) || undefined;

  const item = await putMedia(bytes, contentType, {
    width,
    height,
    blurDataURL,
    originalName: file.name || undefined,
  });

  return NextResponse.json({ ok: true, item });
}
