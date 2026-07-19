export type Processed = {
  blob: Blob;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

const MAX_DIM = 1600;

/**
 * Client-side image prep: downscale to a sane max dimension, re-encode as WebP,
 * and derive a tiny blur placeholder. GIFs pass through untouched so animation
 * survives. Keeps uploads well under the function request ceiling.
 */
export async function processImage(file: File): Promise<Processed> {
  if (file.type === "image/gif") return { blob: file };

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { blob: file };
  ctx.drawImage(bitmap, 0, 0, w, h);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode_failed"))), "image/webp", 0.85)
  );

  const bw = 16;
  const bh = Math.max(1, Math.round((h / w) * 16));
  const bc = document.createElement("canvas");
  bc.width = bw;
  bc.height = bh;
  bc.getContext("2d")?.drawImage(bitmap, 0, 0, bw, bh);
  const blurDataURL = bc.toDataURL("image/webp", 0.5);
  bitmap.close?.();

  return { blob, width: w, height: h, blurDataURL };
}

export type UploadedItem = {
  key: string;
  contentType: string;
  size: number;
  width?: number;
  height?: number;
  blurDataURL?: string;
  createdAt?: number;
};

/** Process + POST a file to the upload route. Returns the stored media item. */
export async function uploadFile(file: File): Promise<UploadedItem> {
  const processed = await processImage(file);
  const fd = new FormData();
  fd.append("file", processed.blob, file.name);
  if (processed.width) fd.append("width", String(processed.width));
  if (processed.height) fd.append("height", String(processed.height));
  if (processed.blurDataURL) fd.append("blurDataURL", processed.blurDataURL);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok || !json.ok) throw new Error(json.error || "upload_failed");
  return json.item as UploadedItem;
}
