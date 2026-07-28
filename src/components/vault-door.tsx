"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Stars } from "@/components/ui/stars";

const GATE_STARS = [
  { top: "58%", left: "9%", size: 3 as const, dur: 3.2 },
  { top: "70%", left: "22%", size: 2 as const, dur: 4.1, delay: 1 },
  { top: "55%", right: "14%", size: 3 as const, dur: 3.7, delay: 0.4 },
  { top: "78%", right: "24%", size: 2 as const, dur: 4.6, delay: 1.6 },
  { top: "86%", left: "38%", size: 2 as const, dur: 3.9, delay: 2.2 },
];

function RealClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0")
      );
    };
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);
  return <span suppressHydrationWarning>{time ?? "19:58"}</span>;
}

/**
 * The after-hours entrance. Same scene as the hero, permanently at golden
 * hour. Credentials are checked server-side (/api/login); on success the
 * gate fades and the door opens.
 */
export function VaultDoor() {
  const router = useRouter();
  const gateRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "open">("idle");
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
        setStatus("open");
        const g = gateRef.current;
        if (g) {
          g.style.opacity = "0";
          g.style.transform = "translateY(-32px)";
        }
        setTimeout(() => {
          router.replace("/");
          router.refresh();
        }, 660);
        return;
      }
      if (res.status === 429) {
        setError("Too many tries. The doorman took a break. Come back in a few minutes.");
      } else if (res.status === 500) {
        setError("The gate isn't wired up (missing env vars on the server).");
      } else {
        setError("Ne, ne. That is not it. Ask Miloš for the keys, nicely.");
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
    <main
      ref={gateRef}
      className="fixed inset-0 z-[60] overflow-auto transition-[opacity,transform] duration-[650ms] ease-out"
    >
      {/* Golden-hour sky over night ground */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[46%] bg-[linear-gradient(180deg,#e6ecf6_0%,#eee0cd_62%,#f6d3a4_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[46%] bg-[linear-gradient(180deg,#151a29_0%,#0d1017_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(46%-2px)] h-1 bg-[linear-gradient(90deg,transparent,rgba(255,220,170,0.55)_30%,rgba(255,220,170,0.8)_50%,rgba(255,220,170,0.55)_70%,transparent)]"
      />
      {/* Sun on the horizon + reflection */}
      <div
        aria-hidden="true"
        className="absolute left-[16%] top-[calc(46%-34px)] h-[68px] w-[68px] rounded-full bg-[radial-gradient(circle_at_42%_38%,#fff3dd,#ffce8a_60%,#f5a94e)] animate-sunpulse"
      />
      <div
        aria-hidden="true"
        className="absolute left-[16%] top-[46%] h-[34px] w-[68px] scale-y-[-0.9] rounded-b-[50%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,206,138,0.4),transparent_70%)] blur-[4px]"
      />
      <Stars stars={GATE_STARS} />

      {/* Header */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 text-day-ink md:px-12">
        <span className="text-[15px] font-semibold">Miloš Novaković</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-day-ink/55">
          After-hours entrance
        </span>
      </div>

      {/* Visitor's clock */}
      <div className="absolute inset-x-0 top-[11%] text-center text-day-ink">
        <div className="text-5xl font-semibold leading-none tracking-[-0.03em] sm:text-[64px]">
          <RealClock />
        </div>
        <div className="mt-1.5 text-[13px] text-day-ink/60">
          That is your clock. In here it is permanently golden hour.
        </div>
      </div>

      {/* Gate card */}
      <div className="absolute left-1/2 top-[46%] w-[min(400px,88vw)] -translate-x-1/2 -translate-y-[24%]">
        <div
          onAnimationEnd={() => setShaking(false)}
          className={`rounded-3xl border border-white/[0.16] bg-[rgba(16,20,32,0.55)] p-7 text-text shadow-[0_40px_90px_rgba(5,7,12,0.55)] backdrop-blur-[20px] ${
            shaking ? "animate-shake" : ""
          }`}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-amber">
            Crew &amp; invited guests
          </div>
          <h1 className="mt-2.5 text-3xl font-semibold tracking-[-0.02em]">Zaključano.</h1>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-text/65 [text-wrap:pretty]">
            Serbian for &ldquo;locked&rdquo;. The keys travel by word of mouth.
            You probably got yours from Miloš himself.
          </p>

          <form onSubmit={onSubmit}>
            <label htmlFor="gate-user" className="sr-only">
              User
            </label>
            <input
              id="gate-user"
              name="username"
              type="text"
              placeholder="user"
              autoComplete="username"
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-5 block w-full rounded-xl border border-white/[0.16] bg-white/[0.08] px-4 py-[13px] text-sm text-text transition-colors duration-250 focus:border-amber/55 focus:outline-none"
            />
            <label htmlFor="gate-pass" className="sr-only">
              Password
            </label>
            <input
              id="gate-pass"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2.5 block w-full rounded-xl border border-white/[0.16] bg-white/[0.08] px-4 py-[13px] text-sm text-text transition-colors duration-250 focus:border-amber/55 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className="mt-3.5 block w-full rounded-xl bg-amber py-3.5 text-sm font-bold text-[#1c1206] transition-[transform,box-shadow] duration-250 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(245,169,78,0.35)] disabled:opacity-60"
            >
              {status === "loading" ? "Checking the list…" : status === "open" ? "Door's open." : "Clock in →"}
            </button>
          </form>

          <div role="alert" className="mt-2.5 min-h-[18px] text-center text-xs text-[#ff9d7a]">
            {error}
          </div>
          <div className="text-center text-[11.5px] text-text/45">
            Lost your keys?{" "}
            <a
              href="mailto:hi@milosnovakovic.com"
              className="border-b border-text/30 text-text/70 transition-colors hover:text-amber"
            >
              hi@milosnovakovic.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
