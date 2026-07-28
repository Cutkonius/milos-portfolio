"use client";

import { useState } from "react";
import type { AboutSection } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput } from "@/app/hq/_components/ui";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { ImageUpload } from "@/app/hq/_components/image-upload";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-semibold text-text/85">{children}</div>;
}

export function AboutEditor({ initial }: { initial: AboutSection }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<AboutSection>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("about");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader kicker="23:37 · The human bit" title="About" description="The human bit: bio, personnel file, photo." />

      <div className="flex flex-col gap-5">
        <Card>
          <div className="flex flex-col gap-4">
            <TextInput label="Section label" value={data.label} onChange={(e) => set({ label: e.target.value })} />
            <TextInput label="Heading" value={data.heading} onChange={(e) => set({ heading: e.target.value })} />
          </div>
        </Card>

        <Card>
          <CardTitle>Paragraphs</CardTitle>
          <p className="mb-3 text-xs text-text/40">Wrap a word in *asterisks* to give it amber emphasis.</p>
          <ListEditor
            items={data.paragraphs}
            setItems={(paragraphs) => set({ paragraphs })}
            makeItem={() => ""}
            addLabel="+ Add paragraph"
            render={(p, update) => (
              <TextArea rows={3} value={p} onChange={(e) => update(e.target.value)} />
            )}
          />
        </Card>

        <Card>
          <CardTitle>Personnel file</CardTitle>
          <TextInput
            label="File heading"
            value={data.fileHeading}
            onChange={(e) => set({ fileHeading: e.target.value })}
          />
          <div className="mt-4">
            <ListEditor
              items={data.fileRows}
              setItems={(fileRows) => set({ fileRows })}
              makeItem={() => ({ k: "Field", v: "Value" })}
              addLabel="+ Add row"
              render={(row, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextInput label="Key" value={row.k} onChange={(e) => update({ ...row, k: e.target.value })} />
                  <TextInput label="Value" value={row.v} onChange={(e) => update({ ...row, v: e.target.value })} />
                </div>
              )}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Status badge &amp; photo</CardTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <TextInput
                label="Status label"
                value={data.statusLabel}
                onChange={(e) => set({ statusLabel: e.target.value })}
              />
              <TextInput
                label="Status value"
                value={data.statusValue}
                onChange={(e) => set({ statusValue: e.target.value })}
              />
            </div>
            <ImageUpload label="Photo" aspect="aspect-[3/4]" image={data.photo} onChange={(img) => set({ photo: img ?? { key: "", alt: "" } })} />
          </div>
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
