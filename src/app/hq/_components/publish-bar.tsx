"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui";
import { publishAction, discardAction } from "@/app/hq/actions";
import { toast } from "@/components/ui/toast";

export function PublishBar({ hasChanges }: { hasChanges: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "publish" | "discard">(null);

  async function publish() {
    setBusy("publish");
    const res = await publishAction();
    setBusy(null);
    if (res.ok) {
      toast("Published — live in a moment.");
      router.refresh();
    } else {
      toast(`Publish failed: ${res.error}`);
    }
  }

  async function discard() {
    if (!confirm("Discard all unpublished changes and reset to the live version?")) return;
    setBusy("discard");
    const res = await discardAction();
    setBusy(null);
    if (res.ok) {
      toast("Draft discarded.");
      router.refresh();
    } else {
      toast(`Discard failed: ${res.error}`);
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 border-b px-5 py-2.5 backdrop-blur-xl transition-colors duration-300 md:px-8 ${
        hasChanges
          ? "border-amber/20 bg-[linear-gradient(90deg,rgba(245,169,78,0.08),transparent_60%)]"
          : "border-white/[0.07] bg-white/[0.015]"
      }`}
    >
      <div className="flex items-center gap-2.5 text-sm">
        <span className="relative flex h-2 w-2">
          {hasChanges && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              hasChanges ? "bg-amber" : "bg-blue-soft"
            }`}
          />
        </span>
        <span className={hasChanges ? "font-medium text-text/85" : "text-text/60"}>
          {hasChanges ? "Unpublished changes" : "Everything is published"}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <a
          href="/preview"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-3.5 py-1.5 text-[13px] text-text/70 transition-colors hover:bg-white/[0.07] hover:text-text"
        >
          Preview ↗
        </a>
        {hasChanges && (
          <Button variant="subtle" size="sm" disabled={busy !== null} onClick={discard}>
            {busy === "discard" ? "Discarding…" : "Discard"}
          </Button>
        )}
        <Button size="sm" disabled={!hasChanges || busy !== null} onClick={publish}>
          {busy === "publish" ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
