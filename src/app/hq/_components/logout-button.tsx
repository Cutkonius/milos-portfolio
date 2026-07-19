"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className={
        className ??
        "rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2 text-sm font-medium text-text/80 transition-colors hover:border-white/30 hover:text-text disabled:opacity-60"
      }
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
