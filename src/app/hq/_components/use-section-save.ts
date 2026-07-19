"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { saveSection } from "@/app/hq/actions";
import type { ContentDoc } from "@/lib/cms/types";

/** Shared save logic for the section editors: calls the action, toasts result. */
export function useSectionSave<K extends keyof ContentDoc>(section: K) {
  const [saving, setSaving] = useState(false);

  async function save(value: ContentDoc[K]): Promise<boolean> {
    setSaving(true);
    try {
      const res = await saveSection(section, value);
      if (res.ok) {
        toast("Saved — live in a moment.");
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
