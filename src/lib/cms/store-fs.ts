/**
 * Filesystem backend for the CMS store. This is a local-dev convenience so a plain
 * `next dev` works without any Netlify context. It is imported *dynamically*
 * from `store.ts` only when the Blobs backend is inactive, so its `process.cwd()`
 * + recursive directory reads never land in the production function bundle
 * (Netlify always uses the Blobs backend).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { ConflictError, sha256Hex, type BytesReadResult, type JsonReadResult } from "./store";

function fsBase(): string {
  return (
    process.env.CMS_FS_DIR ||
    path.join(/* turbopackIgnore: true */ process.cwd(), ".cms-data")
  );
}

function pathFor(storeName: string, key: string): string {
  if (key.includes("..")) throw new Error(`Unsafe blob key: ${key}`);
  return path.join(/* turbopackIgnore: true */ fsBase(), storeName, key);
}

export async function fsReadJSON<T>(storeName: string, key: string): Promise<JsonReadResult<T> | null> {
  try {
    const raw = await fs.readFile(/* turbopackIgnore: true */ pathFor(storeName, key), "utf8");
    return { value: JSON.parse(raw) as T, etag: await sha256Hex(raw) };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function fsWriteJSON(
  storeName: string,
  key: string,
  value: unknown,
  onlyIfMatch?: string | null
): Promise<{ etag: string | null }> {
  const file = pathFor(storeName, key);
  if (onlyIfMatch !== undefined && onlyIfMatch !== null) {
    const current = await fsReadJSON(storeName, key);
    if ((current?.etag ?? null) !== onlyIfMatch) throw new ConflictError();
  }
  const raw = JSON.stringify(value, null, 2);
  await fs.mkdir(/* turbopackIgnore: true */ path.dirname(file), { recursive: true });
  await fs.writeFile(/* turbopackIgnore: true */ file, raw, "utf8");
  return { etag: await sha256Hex(raw) };
}

export async function fsReadBytes(storeName: string, key: string): Promise<BytesReadResult | null> {
  try {
    const file = pathFor(storeName, key);
    const bytes = new Uint8Array(await fs.readFile(/* turbopackIgnore: true */ file));
    let metadata: Record<string, unknown> = {};
    try {
      metadata = JSON.parse(
        await fs.readFile(/* turbopackIgnore: true */ `${file}.meta.json`, "utf8")
      );
    } catch {
      /* no sidecar metadata */
    }
    return { bytes, metadata };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function fsWriteBytes(
  storeName: string,
  key: string,
  bytes: Uint8Array,
  metadata: Record<string, unknown>
): Promise<{ etag: string | null }> {
  const file = pathFor(storeName, key);
  await fs.mkdir(/* turbopackIgnore: true */ path.dirname(file), { recursive: true });
  await fs.writeFile(/* turbopackIgnore: true */ file, bytes);
  await fs.writeFile(
    /* turbopackIgnore: true */ `${file}.meta.json`,
    JSON.stringify(metadata),
    "utf8"
  );
  return { etag: await sha256Hex(bytes) };
}

export async function fsReadMeta(storeName: string, key: string): Promise<Record<string, unknown> | null> {
  try {
    return JSON.parse(
      await fs.readFile(
        /* turbopackIgnore: true */ `${pathFor(storeName, key)}.meta.json`,
        "utf8"
      )
    );
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function fsListKeys(storeName: string, prefix: string): Promise<string[]> {
  const dir = path.join(/* turbopackIgnore: true */ fsBase(), storeName);
  try {
    const entries = await fs.readdir(/* turbopackIgnore: true */ dir, {
      recursive: true,
      withFileTypes: true,
    });
    return entries
      .filter((e) => e.isFile() && !e.name.endsWith(".meta.json"))
      .map((e) => {
        const parent =
          (e as unknown as { parentPath?: string; path?: string }).parentPath ??
          (e as unknown as { path?: string }).path ??
          dir;
        return path
          .relative(dir, path.join(/* turbopackIgnore: true */ parent, e.name))
          .split(path.sep)
          .join("/");
      })
      .filter((k) => k.startsWith(prefix));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function fsRemoveKey(storeName: string, key: string): Promise<void> {
  const file = pathFor(storeName, key);
  await fs.rm(/* turbopackIgnore: true */ file, { force: true });
  await fs.rm(/* turbopackIgnore: true */ `${file}.meta.json`, { force: true });
}
