/**
 * Storage adapter for the CMS. Two interchangeable backends behind one API:
 *
 *  - Netlify Blobs: used in production and under `netlify dev`, detected by
 *    the injected blobs context. Credentials are auto-populated there.
 *  - Filesystem: used by a plain `next dev` (no Netlify context). Its
 *    implementation lives in `./store-fs` and is imported dynamically only on
 *    that path, so it never bloats the production function bundle.
 *
 * Everything is server-only; only Server Components, Route Handlers and Server
 * Actions import this (never a "use client" module).
 */
import { getStore } from "@netlify/blobs";

export const CMS_STORE = "cms";
export const MEDIA_STORE = "cms-media";

/** Thrown by writeJSON when an `onlyIfMatch` precondition fails (stale edit). */
export class ConflictError extends Error {
  constructor(message = "The content changed since you loaded it.") {
    super(message);
    this.name = "ConflictError";
  }
}

export interface JsonReadResult<T> {
  value: T;
  etag: string | null;
}

export interface BytesReadResult {
  bytes: Uint8Array;
  metadata: Record<string, unknown>;
}

function blobsEnabled(): boolean {
  const forced = process.env.CMS_STORE_BACKEND; // "blobs" | "fs"
  if (forced === "blobs") return true;
  if (forced === "fs") return false;
  return Boolean(process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY);
}

function blobStore(name: string, consistency: "strong" | "eventual" = "eventual") {
  const siteID = process.env.CMS_BLOBS_SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.CMS_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
  const opts: Parameters<typeof getStore>[0] =
    siteID && token ? { name, consistency, siteID, token } : { name, consistency };
  return getStore(opts);
}

/**
 * Loads the dev-only filesystem backend. The `NODE_ENV` guard is statically
 * eliminable, so a production build dead-code-drops the `import("./store-fs")`
 * entirely. Its `fs`/`process.cwd()` code never enters the function bundle.
 */
async function fsBackend() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The filesystem CMS backend is development-only. Configure Netlify Blobs.");
  }
  return import("./store-fs");
}

export async function sha256Hex(input: Uint8Array | string): Promise<string> {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// --- JSON --------------------------------------------------------------------

export async function readJSON<T>(
  storeName: string,
  key: string,
  opts: { consistency?: "strong" | "eventual" } = {}
): Promise<JsonReadResult<T> | null> {
  if (blobsEnabled()) {
    const res = await blobStore(storeName, opts.consistency).getWithMetadata(key, { type: "json" });
    if (!res) return null;
    return { value: res.data as T, etag: res.etag ?? null };
  }
  return (await fsBackend()).fsReadJSON<T>(storeName, key);
}

export async function writeJSON(
  storeName: string,
  key: string,
  value: unknown,
  opts: { metadata?: Record<string, unknown>; onlyIfMatch?: string | null } = {}
): Promise<{ etag: string | null }> {
  if (blobsEnabled()) {
    const setOpts: Record<string, unknown> = {};
    if (opts.metadata) setOpts.metadata = opts.metadata;
    if (opts.onlyIfMatch) setOpts.onlyIfMatch = opts.onlyIfMatch;
    const res = await blobStore(storeName, "strong").setJSON(key, value, setOpts);
    if (opts.onlyIfMatch && !res.modified) throw new ConflictError();
    return { etag: res.etag ?? null };
  }
  return (await fsBackend()).fsWriteJSON(storeName, key, value, opts.onlyIfMatch);
}

// --- Bytes (media) -----------------------------------------------------------

export async function readBytes(storeName: string, key: string): Promise<BytesReadResult | null> {
  if (blobsEnabled()) {
    const res = await blobStore(storeName).getWithMetadata(key, { type: "arrayBuffer" });
    if (!res || res.data == null) return null;
    return { bytes: new Uint8Array(res.data as ArrayBuffer), metadata: res.metadata ?? {} };
  }
  return (await fsBackend()).fsReadBytes(storeName, key);
}

export async function writeBytes(
  storeName: string,
  key: string,
  bytes: Uint8Array,
  metadata: Record<string, unknown>
): Promise<{ etag: string | null }> {
  if (blobsEnabled()) {
    const res = await blobStore(storeName).set(key, new Blob([bytes as BlobPart]), { metadata });
    return { etag: res.etag ?? null };
  }
  return (await fsBackend()).fsWriteBytes(storeName, key, bytes, metadata);
}

export async function readMeta(
  storeName: string,
  key: string
): Promise<Record<string, unknown> | null> {
  if (blobsEnabled()) {
    const res = await blobStore(storeName).getMetadata(key);
    return res ? res.metadata ?? {} : null;
  }
  return (await fsBackend()).fsReadMeta(storeName, key);
}

export async function listKeys(storeName: string, prefix = ""): Promise<string[]> {
  if (blobsEnabled()) {
    const { blobs } = await blobStore(storeName).list(prefix ? { prefix } : {});
    return blobs.map((b) => b.key);
  }
  return (await fsBackend()).fsListKeys(storeName, prefix);
}

export async function removeKey(storeName: string, key: string): Promise<void> {
  if (blobsEnabled()) {
    await blobStore(storeName).delete(key);
    return;
  }
  return (await fsBackend()).fsRemoveKey(storeName, key);
}
