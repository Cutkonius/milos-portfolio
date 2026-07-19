import { getContentAdmin } from "@/lib/cms/content";
import { SeedBanner } from "../_components/seed-banner";

const QUICK_LINKS: { href: string; label: string; desc: string }[] = [
  { href: "/projects", label: "Projects", desc: "Case studies, NDA & reserved cards" },
  { href: "/services", label: "Services", desc: "The three trades" },
  { href: "/process", label: "Process", desc: "The four steps" },
  { href: "/hero", label: "Hero", desc: "Day / night headline" },
  { href: "/about", label: "About", desc: "Bio, personnel file, photo" },
  { href: "/contact", label: "Contact", desc: "Pitch, receipts, footer" },
  { href: "/settings", label: "Settings", desc: "SEO, launch, availability" },
  { href: "/media", label: "Media", desc: "Uploaded images" },
];

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 py-3.5">
      <div className={`text-2xl font-semibold ${accent ? "text-amber" : "text-text"}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text/40">
        {label}
      </div>
    </div>
  );
}

export default async function HqDashboard() {
  const { content, etag } = await getContentAdmin();
  const publishedProjects = content.work.projects.filter((p) => p.published).length;

  return (
    <div>
      {!etag && <SeedBanner />}
      <div className="mb-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
          HQ · Command center
        </div>
        <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-text">
          Evening, Miloš.
        </h1>
        <p className="mt-1 text-sm text-text/55">Run the whole site from here. Changes go live in seconds.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Published projects" value={String(publishedProjects)} accent />
        <Stat label="Services" value={String(content.services.rows.length)} />
        <Stat label="Site status" value={content.site.launched ? "Live" : "Pre-launch"} />
        <Stat label="Availability" value={content.site.openForProjects ? "Open" : "Closed"} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {QUICK_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group flex items-center justify-between rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 py-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
          >
            <div>
              <div className="text-sm font-medium text-text">{l.label}</div>
              <div className="text-xs text-text/45">{l.desc}</div>
            </div>
            <span className="text-text/30 transition-transform group-hover:translate-x-0.5 group-hover:text-amber">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
