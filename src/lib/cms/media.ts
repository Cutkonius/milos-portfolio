import {
  MEDIA_STORE,
  listKeys,
  readBytes,
  readMeta,
  removeKey,
  sha256Hex,
  writeBytes,
} from "./store";
import type { MediaItem, MediaMeta } from "./types";

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

/**
 * Store bytes keyed by their SHA-256 (content-addressed → naturally
 * deduplicated and safe to cache immutably). Re-uploading identical bytes is a
 * no-op that returns the existing item.
 */
export async function putMedia(
  bytes: Uint8Array,
  contentType: string,
  extra: Partial<MediaMeta> = {}
): Promise<MediaItem> {
  const hash = await sha256Hex(bytes);
  const key = `${hash}.${EXT[contentType] ?? "bin"}`;

  const existing = (await readMeta(MEDIA_STORE, key)) as unknown as MediaMeta | null;
  if (existing) return { key, ...existing };

  const meta: MediaMeta = {
    contentType,
    size: bytes.byteLength,
    createdAt: Date.now(),
    width: extra.width,
    height: extra.height,
    blurDataURL: extra.blurDataURL,
    originalName: extra.originalName,
  };
  await writeBytes(MEDIA_STORE, key, bytes, meta as unknown as Record<string, unknown>);
  return { key, ...meta };
}

export async function getMedia(key: string) {
  return readBytes(MEDIA_STORE, key);
}

export async function listMedia(): Promise<MediaItem[]> {
  const keys = await listKeys(MEDIA_STORE);
  const items = await Promise.all(
    keys.map(async (key) => {
      const meta = (await readMeta(MEDIA_STORE, key)) as unknown as MediaMeta | null;
      return {
        key,
        contentType: meta?.contentType ?? "application/octet-stream",
        size: meta?.size ?? 0,
        createdAt: meta?.createdAt ?? 0,
        width: meta?.width,
        height: meta?.height,
        blurDataURL: meta?.blurDataURL,
        originalName: meta?.originalName,
      } satisfies MediaItem;
    })
  );
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function deleteMedia(key: string): Promise<void> {
  await removeKey(MEDIA_STORE, key);
}
