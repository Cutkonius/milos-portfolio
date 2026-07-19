"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui";
import { toast } from "@/components/ui/toast";

/** First-run helper: writes default content into an empty store. */
export function SeedBanner() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function seed() {
    setBusy(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const json = await res.json();
      if (json.ok) {
        toast(json.seeded ? "Content initialized." : "Content already exists.");
        router.refresh();
      } else {
        toast("Couldn't initialize.");
      }
    } catch {
      toast("Couldn't initialize.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber/25 bg-amber/[0.06] px-4 py-3.5">
      <div className="text-sm text-text/75">
        The store is empty — the site is showing built-in defaults. Publish them so you can edit
        from here.
      </div>
      <Button size="sm" disabled={busy} onClick={seed}>
        {busy ? "Publishing…" : "Publish defaults"}
      </Button>
    </div>
  );
}
