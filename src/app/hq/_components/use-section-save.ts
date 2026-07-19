"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { saveSection } from "@/app/hq/actions";
import type { ContentDoc } from "@/lib/cms/types";

/** Shared save logic for the section editors: saves the draft, toasts, refreshes. */
export function useSectionSave<K extends keyof ContentDoc>(section: K) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(value: ContentDoc[K]): Promise<boolean> {
    setSaving(true);
    try {
      const res = await saveSection(section, value);
      if (res.ok) {
        toast("Saved to draft — preview or publish when ready.");
        // Refresh so the Publish bar reflects the new unpublished changes.
        router.refresh();
        return true;
      }
      toast(`Save failed: ${res.error}`);
      return false;
    } catch {
      toast("Save failed — check your connection.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { saving, save };
}
