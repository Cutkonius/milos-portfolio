"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * CMS sign-in. Credentials are checked server-side at `/api/login` (rewritten
 * to the admin login route on the hq host); on success we land on the
 * dashboard.
 */
export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [shaking, setShaking] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace("/");
        router.refresh();
        return;
      }
      if (res.status === 429) {
        setError("Too many attempts. Take five and try again.");
      } else if (res.status === 500) {
        setError("The CMS isn't wired up (missing HQ_* env vars).");
      } else {
        setError("That's not it. Check the username and password.");
      }
      setShaking(true);
      setStatus("idle");
    } catch {
      setError("The lock jammed. Check your connection and try again.");
      setShaking(true);
      setStatus("idle");
    }
  }

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-[radial-gradient(1100px_620px_at_50%_-10%,#141a2b_0%,#0a0c12_58%,#07090d_100%)] px-6">
      <div className="w-[min(400px,92vw)]">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
            HQ · Command center
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          onAnimationEnd={() => setShaking(false)}
          className={`rounded-3xl border border-white/[0.14] bg-[rgba(16,20,32,0.6)] p-7 shadow-[0_40px_90px_rgba(5,7,12,0.55)] backdrop-blur-[20px] ${
            shaking ? "animate-shake" : ""
          }`}
        >
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-text">Clock in.</h1>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-text/60 [text-wrap:pretty]">
            The night shift is yours. Sign in to run the site.
          </p>

          <label htmlFor="hq-user" className="sr-only">
            Username
          </label>
          <input
            id="hq-user"
            name="username"
            type="text"
            placeholder="username"
            autoComplete="username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-5 block w-full rounded-xl border border-white/[0.16] bg-white/[0.08] px-4 py-[13px] text-sm text-text transition-colors duration-200 focus:border-amber/55 focus:outline-none"
          />
          <label htmlFor="hq-pass" className="sr-only">
            Password
          </label>
          <input
            id="hq-pass"
            name="password"
            type="password"
            placeholder="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2.5 block w-full rounded-xl border border-white/[0.16] bg-white/[0.08] px-4 py-[13px] text-sm text-text transition-colors duration-200 focus:border-amber/55 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status !== "idle"}
            className="mt-3.5 block w-full rounded-xl bg-amber py-3.5 text-sm font-bold text-[#1c1206] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(245,169,78,0.35)] disabled:opacity-60"
          >
            {status === "loading" ? "Checking the list…" : "Clock in →"}
          </button>

          <div role="alert" className="mt-2.5 min-h-[18px] text-center text-xs text-[#ff9d7a]">
            {error}
          </div>
        </form>
      </div>
    </main>
  );
}
