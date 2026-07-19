"use client";

import Image, { type StaticImageData } from "next/image";
import vujicautoScreen from "@/images/vujicauto-screen.png";
import vujicautoProduct from "@/images/vujicauto-product.png";
import milos from "@/images/milos.png";
import type { ImageRef } from "@/lib/cms/types";

/** Build-time default art, addressed by `static:<name>` image keys. */
const STATIC: Record<string, StaticImageData> = {
  "vujicauto-screen": vujicautoScreen,
  "vujicauto-product": vujicautoProduct,
  milos,
};

/**
 * Renders an {@link ImageRef} with next/image. `static:*` keys resolve to the
 * repo's imported art (with its automatic blur placeholder); everything else is
 * an uploaded blob served from `/media/<key>`, blurred with its stored
 * `blurDataURL` when present.
 */
export function MediaImage({
  image,
  fill,
  sizes,
  className,
}: {
  image: ImageRef;
  fill?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!image.key) return null;

  const staticName = image.key.startsWith("static:") ? image.key.slice(7) : null;

  if (staticName && STATIC[staticName]) {
    return (
      <Image
        src={STATIC[staticName]}
        alt={image.alt}
        fill={fill}
        placeholder="blur"
        sizes={sizes}
        className={className}
        {...(fill ? {} : { width: STATIC[staticName].width, height: STATIC[staticName].height })}
      />
    );
  }

  const blur = image.blurDataURL
    ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL }
    : {};

  return (
    <Image
      src={`/media/${image.key}`}
      alt={image.alt}
      fill={fill}
      sizes={sizes}
      className={className}
      {...blur}
      {...(fill ? {} : { width: image.width ?? 1600, height: image.height ?? 1000 })}
    />
  );
}
