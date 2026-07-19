"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, PageHeader } from "@/app/hq/_components/ui";
import { restoreVersionAction } from "@/app/hq/actions";
import { toast } from "@/components/ui/toast";

type Item = { key: string; at: number; label: string };

export function HistoryList({ items }: { items: Item[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function restore(key: string, label: string) {
    if (
      !confirm(
        `Restore the version from ${label}?\n\nYour current content is snapshotted first, so you can undo this.`
      )
    )
      return;
    setBusy(key);
    const res = await restoreVersionAction(key);
    setBusy(null);
    if (res.ok) {
      toast("Restored — live in a moment.");
      router.refresh();
    } else {
      toast(`Restore failed: ${res.error}`);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Time machine"
        title="History"
        description="Every save is a restore point. Roll back any time — restoring also snapshots the current version, so it's reversible."
      />

      {items.length === 0 ? (
        <Card className="text-center text-sm text-text/50">
          No saved versions yet. They appear here after your first edit.
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((it, i) => (
            <div
              key={it.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-14 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/35">
                  {i === 0 ? "Latest" : `#${items.length - i}`}
                </span>
                <span className="text-sm text-text/85">{it.label}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={busy !== null}
                onClick={() => restore(it.key, it.label)}
              >
                {busy === it.key ? "Restoring…" : "Restore"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
