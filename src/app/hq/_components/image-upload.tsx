"use client";

import { useRef, useState } from "react";
import type { ImageRef } from "@/lib/cms/types";
import { MediaImage } from "@/components/cms/media-image";
import { Button, TextInput } from "./ui";
import { uploadFile } from "./process-image";

export function ImageUpload({
  image,
  onChange,
  label,
  aspect = "aspect-[16/10]",
}: {
  image: ImageRef | undefined;
  onChange: (image: ImageRef | undefined) => void;
  label?: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const item = await uploadFile(file);
      onChange({
        key: item.key,
        alt: image?.alt ?? "",
        blurDataURL: item.blurDataURL,
        width: item.width,
        height: item.height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "upload_failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text/45">
          {label}
        </span>
      )}
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.03]`}
      >
        {image?.key ? (
          <MediaImage image={image} fill sizes="360px" className="object-cover object-top" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-text/35">No image</div>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 text-xs font-medium text-text">
            Uploading…
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={onFile}
          className="hidden"
        />
        <Button variant="ghost" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
          {image?.key ? "Replace" : "Upload"}
        </Button>
        {image?.key && (
          <Button variant="subtle" size="sm" disabled={busy} onClick={() => onChange(undefined)}>
            Remove
          </Button>
        )}
      </div>

      {image?.key && (
        <TextInput
          label="Alt text"
          value={image.alt}
          onChange={(e) => onChange({ ...image, alt: e.target.value })}
          placeholder="Describe the image for screen readers"
        />
      )}
      {error && <p className="text-xs text-[#ff9d7a]">Upload failed: {error}</p>}
    </div>
  );
}
