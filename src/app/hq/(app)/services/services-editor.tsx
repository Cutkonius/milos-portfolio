"use client";

import { useState } from "react";
import type { Service, ServicesSection } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput, Toggle } from "@/app/hq/_components/ui";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function makeService(): Service {
  return {
    id: crypto.randomUUID(),
    n: "00",
    title: "New service",
    blurb: "",
    favorite: false,
    shift: "The night shift",
    stroke: "rgba(238,241,247,0.28)",
  };
}

export function ServicesEditor({ initial }: { initial: ServicesSection }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<ServicesSection>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("services");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader title="Services" description="Three trades, one pair of hands." />

      <Card className="mb-5">
        <div className="flex flex-col gap-4">
          <TextInput label="Section label" value={data.label} onChange={(e) => set({ label: e.target.value })} />
          <TextInput label="Heading" value={data.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
      </Card>

      <ListEditor
        items={data.rows}
        setItems={(rows) => set({ rows })}
        makeItem={makeService}
        addLabel="+ Add service"
        render={(row, update) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
              <TextInput label="Number" value={row.n} onChange={(e) => update({ ...row, n: e.target.value })} />
              <TextInput label="Title" value={row.title} onChange={(e) => update({ ...row, title: e.target.value })} />
            </div>
            <TextArea label="Blurb" rows={2} value={row.blurb} onChange={(e) => update({ ...row, blurb: e.target.value })} />
            <div className="grid items-center gap-4 sm:grid-cols-2">
              <TextInput label="Shift label" value={row.shift} onChange={(e) => update({ ...row, shift: e.target.value })} />
              <TextInput
                label="Number outline color"
                hint="rgba/hex"
                value={row.stroke}
                onChange={(e) => update({ ...row, stroke: e.target.value })}
              />
            </div>
            <Toggle
              checked={row.favorite}
              onChange={(v) => update({ ...row, favorite: v })}
              label="Mark as “THE FAVORITE”"
            />
          </div>
        )}
      />

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
