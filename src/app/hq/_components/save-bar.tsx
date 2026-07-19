"use client";

import { useEffect } from "react";
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
  // Warn before leaving (admin nav is full-page loads) and wire Cmd/Ctrl+S.
  useEffect(() => {
    if (!dirty) return;

    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saving) onSave();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("keydown", onKey);
    };
  }, [dirty, saving, onSave]);

  return (
    <div className="pointer-events-none sticky bottom-5 z-10 mt-10 flex justify-center">
      <div
        className={`pointer-events-auto flex items-center gap-4 rounded-full border px-3 py-2 pl-5 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 ${
          dirty
            ? "border-amber/25 bg-[rgba(16,20,32,0.92)]"
            : "border-white/[0.1] bg-[rgba(12,14,20,0.8)] opacity-70"
        }`}
      >
        <span className="flex items-center gap-2 text-sm text-text/70">
          <span
            className={`h-1.5 w-1.5 rounded-full ${dirty ? "bg-amber" : "bg-blue-soft/70"}`}
            aria-hidden="true"
          />
          {dirty ? "Unsaved changes" : "Saved to draft"}
          {dirty && (
            <kbd className="ml-1 hidden rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-text/50 sm:inline">
              ⌘S
            </kbd>
          )}
        </span>
        <Button onClick={onSave} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save draft"}
        </Button>
      </div>
    </div>
  );
}
