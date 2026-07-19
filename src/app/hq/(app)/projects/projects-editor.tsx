"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "motion/react";
import type {
  CaseStudy,
  CaseStudyBlock,
  ImageRef,
  Metric,
  Project,
  ProjectKind,
  WorkSection,
} from "@/lib/cms/types";
import { Button, Card, PageHeader, TextArea, TextInput, Toggle } from "@/app/hq/_components/ui";
import { ImageUpload } from "@/app/hq/_components/image-upload";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CaseStudyFields({
  cs,
  setCs,
}: {
  cs: CaseStudy;
  setCs: (patch: Partial<CaseStudy>) => void;
}) {
  return (
    <div className="mt-2 flex flex-col gap-4 rounded-xl border border-white/[0.1] bg-white/[0.02] p-4">
      <Toggle
        checked={cs.enabled}
        onChange={(v) => setCs({ enabled: v })}
        label="Publish a dedicated /work/<slug> case-study page"
      />
      {cs.enabled && (
        <>
          <TextArea
            label="Intro"
            rows={2}
            value={cs.intro ?? ""}
            onChange={(e) => setCs({ intro: e.target.value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Live URL"
              value={cs.liveUrl ?? ""}
              placeholder="https://vujicauto.rs"
              onChange={(e) => setCs({ liveUrl: e.target.value })}
            />
            <TextInput
              label="Tags (comma-separated)"
              value={(cs.tags ?? []).join(", ")}
              onChange={(e) =>
                setCs({
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text/45">
              Metrics
            </div>
            <ListEditor
              items={cs.metrics ?? []}
              setItems={(metrics) => setCs({ metrics })}
              makeItem={(): Metric => ({ id: crypto.randomUUID(), value: "", label: "" })}
              addLabel="+ Add metric"
              render={(m, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextInput label="Value" value={m.value} onChange={(e) => update({ ...m, value: e.target.value })} />
                  <TextInput label="Label" value={m.label} onChange={(e) => update({ ...m, label: e.target.value })} />
                </div>
              )}
            />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text/45">
              Story blocks
            </div>
            <ListEditor
              items={cs.blocks ?? []}
              setItems={(blocks) => setCs({ blocks })}
              makeItem={(): CaseStudyBlock => ({ id: crypto.randomUUID(), heading: "", body: "" })}
              addLabel="+ Add block"
              render={(b, update) => (
                <div className="flex flex-col gap-3">
                  <TextInput label="Heading" value={b.heading} onChange={(e) => update({ ...b, heading: e.target.value })} />
                  <TextArea label="Body" rows={3} value={b.body} onChange={(e) => update({ ...b, body: e.target.value })} />
                  <ImageUpload
                    label="Image (optional)"
                    image={b.image}
                    onChange={(img) => update({ ...b, image: img })}
                  />
                </div>
              )}
            />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text/45">
              Gallery
            </div>
            <ListEditor
              items={cs.gallery ?? []}
              setItems={(gallery) => setCs({ gallery })}
              makeItem={(): ImageRef => ({ key: "", alt: "" })}
              addLabel="+ Add image"
              render={(img, update) => (
                <ImageUpload image={img} onChange={(next) => update(next ?? { key: "", alt: "" })} />
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}

const KIND_LABEL: Record<ProjectKind, string> = {
  case: "Case study",
  redacted: "NDA card",
  reserved: "Reserved card",
};

function newProject(kind: ProjectKind, order: number): Project {
  const id = crypto.randomUUID();
  if (kind === "case") {
    return {
      id,
      kind,
      order,
      published: false,
      featured: false,
      title: "New project",
      statusLink: "",
      description: "",
      urlBar: "",
      badge: "",
    };
  }
  if (kind === "redacted") {
    return {
      id,
      kind,
      order,
      published: true,
      label: "Top secret",
      cardTitle: "[REDACTED]",
      blurb: "An NDA is an NDA. You will never learn about this one.",
    };
  }
  return {
    id,
    kind,
    order,
    published: true,
    label: "Reserved for you",
    cardTitle: "This slot is yours.",
    blurb: "The night shift has capacity for exactly one more website.",
    ctaLabel: "Claim it, book the short call →",
  };
}

function ProjectFields({
  p,
  onChange,
}: {
  p: Project;
  onChange: (patch: Partial<Project>) => void;
}) {
  if (p.kind === "case") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Title"
            value={p.title ?? ""}
            onChange={(e) => onChange({ title: e.target.value })}
          />
          <TextInput
            label="Status link"
            value={p.statusLink ?? ""}
            placeholder="in the paint shop →"
            onChange={(e) => onChange({ statusLink: e.target.value })}
          />
        </div>
        <TextArea
          label="Description"
          rows={3}
          value={p.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Browser URL bar"
            value={p.urlBar ?? ""}
            placeholder="vujicauto.rs"
            onChange={(e) => onChange({ urlBar: e.target.value })}
          />
          <TextInput
            label="Badge"
            value={p.badge ?? ""}
            placeholder="01"
            onChange={(e) => onChange({ badge: e.target.value })}
          />
        </div>
        <Toggle
          checked={!!p.featured}
          onChange={(v) => onChange({ featured: v })}
          label="Featured showcase (large browser frame)"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUpload
            label="Screenshot (browser frame)"
            image={p.screenshot}
            onChange={(img) => onChange({ screenshot: img })}
          />
          <ImageUpload
            label="Product shot (card)"
            image={p.productShot}
            onChange={(img) => onChange({ productShot: img })}
          />
        </div>
        <TextInput
          label="URL slug"
          hint="The detail page lives at /work/<slug>."
          value={p.slug ?? ""}
          placeholder="vujicauto"
          onChange={(e) => onChange({ slug: e.target.value })}
        />
        <CaseStudyFields
          cs={p.caseStudy ?? { enabled: false }}
          setCs={(patch) => onChange({ caseStudy: { ...(p.caseStudy ?? { enabled: false }), ...patch } })}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Label"
          value={p.label ?? ""}
          placeholder="02 · Top secret"
          onChange={(e) => onChange({ label: e.target.value })}
        />
        <TextInput
          label="Card title"
          value={p.cardTitle ?? ""}
          onChange={(e) => onChange({ cardTitle: e.target.value })}
        />
      </div>
      <TextArea
        label="Blurb"
        rows={2}
        value={p.blurb ?? ""}
        onChange={(e) => onChange({ blurb: e.target.value })}
      />
      {p.kind === "reserved" && (
        <TextInput
          label="CTA label"
          value={p.ctaLabel ?? ""}
          onChange={(e) => onChange({ ctaLabel: e.target.value })}
        />
      )}
    </div>
  );
}

function ProjectRow({
  project,
  onChange,
  onDelete,
}: {
  project: Project;
  onChange: (patch: Partial<Project>) => void;
  onDelete: () => void;
}) {
  const controls = useDragControls();
  const [open, setOpen] = useState(false);
  const summary =
    project.kind === "case"
      ? project.title || "Untitled case study"
      : project.cardTitle || KIND_LABEL[project.kind];

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      className="overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.025]"
    >
      <div className="flex items-center gap-2.5 p-3.5">
        <button
          type="button"
          aria-label="Drag to reorder"
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab touch-none px-1 text-lg leading-none text-text/25 hover:text-text/60"
        >
          ⠿
        </button>
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text/50">
          {KIND_LABEL[project.kind]}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-text/90">{summary}</span>
        <span className="hidden text-[11px] text-text/45 sm:inline">
          {project.published ? "Live" : "Draft"}
        </span>
        <Toggle checked={project.published} onChange={(v) => onChange({ published: v })} />
        <Button variant="subtle" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Edit"}
        </Button>
        <button
          type="button"
          aria-label="Delete project"
          onClick={onDelete}
          className="px-1.5 text-text/30 transition-colors hover:text-[#ff9d7a]"
        >
          ✕
        </button>
      </div>
      {open && (
        <div className="border-t border-white/[0.08] p-4">
          <ProjectFields p={project} onChange={onChange} />
        </div>
      )}
    </Reorder.Item>
  );
}

export function ProjectsEditor({ initial }: { initial: WorkSection }) {
  const [label, setLabel] = useState(initial.label);
  const [sublabel, setSublabel] = useState(initial.sublabel);
  const [projects, setProjects] = useState<Project[]>(() =>
    [...initial.projects].sort((a, b) => a.order - b.order)
  );
  const [dirty, setDirty] = useState(false);
  const { saving, save } = useSectionSave("work");

  const touch = () => setDirty(true);

  function updateProject(id: string, patch: Partial<Project>) {
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    touch();
  }
  function deleteProject(id: string) {
    if (!confirm("Delete this project? This can't be undone from here.")) return;
    setProjects((ps) => ps.filter((p) => p.id !== id));
    touch();
  }
  function addProject(kind: ProjectKind) {
    setProjects((ps) => [...ps, newProject(kind, ps.length)]);
    touch();
  }

  async function onSave() {
    const withOrder = projects.map((p, i) => ({ ...p, order: i }));
    const ok = await save({ label, sublabel, projects: withOrder });
    if (ok) {
      setProjects(withOrder);
      setDirty(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="20:41 · Selected work"
        title="Projects"
        description="Your selected work. Drag to reorder; the first published case study becomes the large showcase."
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => addProject("case")}>
              + Case
            </Button>
            <Button variant="ghost" size="sm" onClick={() => addProject("redacted")}>
              + NDA
            </Button>
            <Button variant="ghost" size="sm" onClick={() => addProject("reserved")}>
              + Reserved
            </Button>
          </>
        }
      />

      <Card className="mb-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Section label"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              touch();
            }}
          />
          <TextInput
            label="Section sub-label"
            value={sublabel}
            onChange={(e) => {
              setSublabel(e.target.value);
              touch();
            }}
          />
        </div>
      </Card>

      {projects.length === 0 ? (
        <Card className="text-center text-sm text-text/50">No projects yet. Add one above.</Card>
      ) : (
        <Reorder.Group axis="y" values={projects} onReorder={(next) => { setProjects(next); touch(); }} className="flex flex-col gap-3">
          {projects.map((p) => (
            <ProjectRow
              key={p.id}
              project={p}
              onChange={(patch) => updateProject(p.id, patch)}
              onDelete={() => deleteProject(p.id)}
            />
          ))}
        </Reorder.Group>
      )}

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
