"use client";

import { useState } from "react";
import type { ProcessSection, ProcessStep } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput } from "@/app/hq/_components/ui";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function makeStep(): ProcessStep {
  return {
    id: crypto.randomUUID(),
    label: "STEP",
    title: "New step",
    blurb: "",
    dot: "#5b8cff",
    ring: "rgba(91,140,255,0.18)",
    stroke: "rgba(238,241,247,0.3)",
  };
}

export function ProcessEditor({ initial }: { initial: ProcessSection }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<ProcessSection>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("process");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader kicker="00:52 · The rollout" title="Process" description="Four steps. Zero mystery." />

      <Card className="mb-5">
        <div className="flex flex-col gap-4">
          <TextInput label="Section label" value={data.label} onChange={(e) => set({ label: e.target.value })} />
          <TextInput label="Heading" value={data.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
      </Card>

      <ListEditor
        items={data.steps}
        setItems={(steps) => set({ steps })}
        makeItem={makeStep}
        addLabel="+ Add step"
        render={(step, update) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Label" value={step.label} onChange={(e) => update({ ...step, label: e.target.value })} />
              <TextInput label="Title" value={step.title} onChange={(e) => update({ ...step, title: e.target.value })} />
            </div>
            <TextArea label="Blurb" rows={2} value={step.blurb} onChange={(e) => update({ ...step, blurb: e.target.value })} />
            <TextInput
              label="Booking link label (optional)"
              hint="Appends an inline Cal.com link after the blurb."
              value={step.ctaLabel ?? ""}
              onChange={(e) => update({ ...step, ctaLabel: e.target.value || undefined })}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextInput label="Dot color" value={step.dot} onChange={(e) => update({ ...step, dot: e.target.value })} />
              <TextInput label="Ring color" value={step.ring} onChange={(e) => update({ ...step, ring: e.target.value })} />
              <TextInput label="Label outline" value={step.stroke} onChange={(e) => update({ ...step, stroke: e.target.value })} />
            </div>
          </div>
        )}
      />

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
