"use client";

import { useState } from "react";
import type { Hero } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput } from "@/app/hq/_components/ui";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-semibold text-text/85">{children}</div>;
}

export function HeroEditor({ initial }: { initial: Hero }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<Hero>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("hero");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader
        kicker="19:58 · The horizon"
        title="Hero"
        description="The horizon headline. Daylight above, night below."
      />

      <div className="flex flex-col gap-5">
        <Card>
          <CardTitle>Day (upper half)</CardTitle>
          <div className="flex flex-col gap-4">
            <TextInput
              label="Time label"
              value={data.day.label}
              onChange={(e) => set({ day: { ...data.day, label: e.target.value } })}
            />
            <TextInput
              label="Title"
              value={data.day.title}
              onChange={(e) => set({ day: { ...data.day, title: e.target.value } })}
            />
            <TextArea
              label="Body"
              rows={2}
              value={data.day.body}
              onChange={(e) => set({ day: { ...data.day, body: e.target.value } })}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Night (lower half)</CardTitle>
          <div className="flex flex-col gap-4">
            <TextInput
              label="Title"
              value={data.night.title}
              onChange={(e) => set({ night: { ...data.night, title: e.target.value } })}
            />
            <TextArea
              label="Body"
              rows={2}
              value={data.night.body}
              onChange={(e) => set({ night: { ...data.night, body: e.target.value } })}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Details</CardTitle>
          <div className="flex flex-col gap-4">
            <TextInput label="Sun hint" value={data.sunHint} onChange={(e) => set({ sunHint: e.target.value })} />
            <TextInput
              label="Corner note (bottom-left)"
              value={data.cornerLeft}
              onChange={(e) => set({ cornerLeft: e.target.value })}
            />
            <TextInput
              label="Availability label (bottom-right)"
              hint="Shown with the live month when 'Open for projects' is on (Settings)."
              value={data.openForProjectsLabel}
              onChange={(e) => set({ openForProjectsLabel: e.target.value })}
            />
          </div>
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
