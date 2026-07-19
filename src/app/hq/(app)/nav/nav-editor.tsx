"use client";

import { useState } from "react";
import type { Nav } from "@/lib/cms/types";
import { Card, PageHeader, TextInput } from "@/app/hq/_components/ui";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-semibold text-text/85">{children}</div>;
}

export function NavEditor({ initial }: { initial: Nav }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<Nav>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("nav");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader title="Navigation" description="The fixed header — brand, links, and the scroll clock." />

      <div className="flex flex-col gap-5">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Brand" value={data.brand} onChange={(e) => set({ brand: e.target.value })} />
            <TextInput label="Book-call button label" value={data.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Clock start (minutes)"
              type="number"
              hint="19:58 = 1198"
              value={data.clockStartMin}
              onChange={(e) => set({ clockStartMin: Number(e.target.value) })}
            />
            <TextInput
              label="Clock end (minutes)"
              type="number"
              hint="Can exceed 1440, e.g. 02:13 = 1573"
              value={data.clockEndMin}
              onChange={(e) => set({ clockEndMin: Number(e.target.value) })}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Links</CardTitle>
          <ListEditor
            items={data.links}
            setItems={(links) => set({ links })}
            makeItem={() => ({ href: "#", label: "New link" })}
            addLabel="+ Add link"
            render={(link, update) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <TextInput label="Label" value={link.label} onChange={(e) => update({ ...link, label: e.target.value })} />
                <TextInput label="Href" value={link.href} onChange={(e) => update({ ...link, href: e.target.value })} />
              </div>
            )}
          />
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
