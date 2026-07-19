"use client";

import { Button } from "./ui";

export function SaveBar({
  dirty,
  saving,
  onSave,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8">
      <div
        className={`flex items-center justify-between gap-3 rounded-xl border border-white/[0.12] bg-[rgba(10,12,18,0.9)] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg transition-opacity duration-200 ${
          dirty ? "opacity-100" : "opacity-60"
        }`}
      >
        <span className="text-sm text-text/60">
          {dirty ? "You have unsaved changes." : "All changes saved."}
        </span>
        <Button onClick={onSave} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
