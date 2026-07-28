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
    setData((current) => ({ ...current, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("nav");

  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader
        kicker="The header"
        title="Navigation"
        description="The centered site index and its booking action."
      />

      <div className="flex flex-col gap-5">
        <Card>
          <TextInput
            label="Book-call button label"
            value={data.ctaLabel}
            onChange={(event) => set({ ctaLabel: event.target.value })}
          />
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
                <TextInput
                  label="Label"
                  value={link.label}
                  onChange={(event) => update({ ...link, label: event.target.value })}
                />
                <TextInput
                  label="Href"
                  value={link.href}
                  onChange={(event) => update({ ...link, href: event.target.value })}
                />
              </div>
            )}
          />
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
