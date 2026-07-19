import { NextResponse } from "next/server";
import { getMedia } from "@/lib/cms/media";

export const runtime = "nodejs";

/**
 * Streams an uploaded image out of the `cms-media` blob store. Keys are the
 * content hash, so responses are safe to cache immutably forever.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const media = await getMedia(key);
  if (!media) return new NextResponse("Not found", { status: 404 });

  const contentType = (media.metadata.contentType as string) || "application/octet-stream";
  return new NextResponse(media.bytes as BodyInit, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
