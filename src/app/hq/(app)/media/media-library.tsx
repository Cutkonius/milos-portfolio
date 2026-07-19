"use client";

import { useRef, useState } from "react";
import type { MediaItem } from "@/lib/cms/types";
import { Button, PageHeader } from "@/app/hq/_components/ui";
import { uploadFile } from "@/app/hq/_components/process-image";
import { MediaImage } from "@/components/cms/media-image";
import { deleteMediaAction } from "@/app/hq/actions";
import { toast } from "@/components/ui/toast";

export function MediaLibrary({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    try {
      for (const f of files) {
        const item = await uploadFile(f);
        setItems((prev) =>
          prev.some((p) => p.key === item.key)
            ? prev
            : [{ ...item, createdAt: item.createdAt ?? Date.now() } as MediaItem, ...prev]
        );
      }
      toast("Uploaded.");
    } catch {
      toast("Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(key: string) {
    if (!confirm("Delete this image? Anything using it will break.")) return;
    const res = await deleteMediaAction(key);
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.key !== key));
      toast("Deleted.");
    } else {
      toast("Delete failed.");
    }
  }

  function copy(key: string) {
    navigator.clipboard?.writeText(`/media/${key}`).then(
      () => toast("Copied /media path."),
      () => toast("Couldn't copy.")
    );
  }

  return (
    <div>
      <PageHeader
        title="Media"
        description="Every uploaded image. Content-addressed, so duplicates are stored once."
        actions={
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              multiple
              onChange={onUpload}
              className="hidden"
            />
            <Button disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? "Uploading…" : "Upload"}
            </Button>
          </>
        }
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] py-16 text-center text-sm text-text/45">
          No images yet. Upload one, or add images from a project.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.025]"
            >
              <div className="relative aspect-[4/3] bg-black/20">
                <MediaImage
                  image={{
                    key: item.key,
                    alt: item.originalName ?? "",
                    blurDataURL: item.blurDataURL,
                  }}
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5">
                <div className="min-w-0 text-[11px] leading-tight text-text/45">
                  {item.width && item.height && (
                    <div>
                      {item.width}×{item.height}
                    </div>
                  )}
                  <div>{Math.max(1, Math.round(item.size / 1024))} KB</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="subtle" size="sm" onClick={() => copy(item.key)}>
                    Copy
                  </Button>
                  <button
                    type="button"
                    aria-label="Delete image"
                    onClick={() => onDelete(item.key)}
                    className="px-1.5 text-text/30 transition-colors hover:text-[#ff9d7a]"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
