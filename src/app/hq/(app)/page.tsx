import { getContentAdmin } from "@/lib/cms/content";
import { SeedBanner } from "../_components/seed-banner";
import { Icon, type IconName } from "../_components/icons";
import { Kicker } from "../_components/ui";

const QUICK_LINKS: { href: string; label: string; desc: string; icon: IconName }[] = [
  { href: "/projects", label: "Projects", desc: "Case studies, NDA & reserved cards", icon: "projects" },
  { href: "/services", label: "Services", desc: "The three trades", icon: "services" },
  { href: "/process", label: "Process", desc: "The four steps", icon: "process" },
  { href: "/hero", label: "Hero", desc: "Day / night headline", icon: "hero" },
  { href: "/about", label: "About", desc: "Bio, personnel file, photo", icon: "about" },
  { href: "/contact", label: "Contact", desc: "Pitch, receipts, footer", icon: "contact" },
  { href: "/media", label: "Media", desc: "Uploaded images", icon: "media" },
  { href: "/settings", label: "Settings", desc: "SEO, launch, availability", icon: "settings" },
];

function Stat({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: IconName;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.028] p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className={`text-[26px] font-semibold tracking-[-0.02em] ${accent ? "text-amber" : "text-text"}`}>
          {value}
        </div>
        <Icon name={icon} size={17} className="mt-1 text-text/25" />
      </div>
      <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-text/40">
        {label}
      </div>
    </div>
  );
}

export default async function HqDashboard() {
  const { content, etag } = await getContentAdmin();
  const publishedProjects = content.work.projects.filter((p) => p.published).length;
  const now = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Belgrade",
  }).format(new Date());

  return (
    <div>
      {!etag && <SeedBanner />}

      <div className="mb-9">
        <Kicker>{now} · Command center</Kicker>
        <h1 className="mt-2.5 text-[32px] font-semibold tracking-[-0.03em] text-text">
          Evening, Miloš.
        </h1>
        <p className="mt-1.5 text-sm text-text/55 [text-wrap:pretty]">
          Run the whole site from here — edit freely, publish when you&apos;re ready.
        </p>
      </div>

      <div className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Published projects" value={String(publishedProjects)} icon="projects" accent />
        <Stat label="Services" value={String(content.services.rows.length)} icon="services" />
        <Stat
          label="Site status"
          value={content.site.launched ? "Live" : "Pre-launch"}
          icon="settings"
        />
        <Stat
          label="Availability"
          value={content.site.openForProjects ? "Open" : "Closed"}
          icon="hero"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {QUICK_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.09] bg-white/[0.028] px-4 py-3.5 backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-text/55 transition-colors group-hover:bg-amber/15 group-hover:text-amber">
              <Icon name={l.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-text">{l.label}</div>
              <div className="text-xs text-text/45">{l.desc}</div>
            </div>
            <span className="text-text/25 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-amber">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
