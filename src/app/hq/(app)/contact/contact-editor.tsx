"use client";

import { useState } from "react";
import type { ContactSection, Receipt } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput } from "@/app/hq/_components/ui";
import { ListEditor } from "@/app/hq/_components/list-editor";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-semibold text-text/85">{children}</div>;
}

function makeReceipt(): Receipt {
  return { id: crypto.randomUUID(), icon: "✓", title: "New receipt", meta: "source · 00:00" };
}

export function ContactEditor({ initial }: { initial: ContactSection }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<ContactSection>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("contact");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader title="Contact" description="The closing pitch, the receipts, and the footer." />

      <div className="flex flex-col gap-5">
        <Card>
          <div className="flex flex-col gap-4">
            <TextInput label="Section label" value={data.label} onChange={(e) => set({ label: e.target.value })} />
            <TextInput label="Heading" value={data.heading} onChange={(e) => set({ heading: e.target.value })} />
            <TextArea label="Pitch" rows={3} value={data.pitch} onChange={(e) => set({ pitch: e.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Book-call button label" value={data.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Receipts (the “night shift” proof)</CardTitle>
          <TextInput label="Receipts note" value={data.receiptsNote} onChange={(e) => set({ receiptsNote: e.target.value })} />
          <div className="mt-4">
            <ListEditor
              items={data.receipts}
              setItems={(receipts) => set({ receipts })}
              makeItem={makeReceipt}
              addLabel="+ Add receipt"
              render={(r, update) => (
                <div className="grid gap-3 sm:grid-cols-[70px_1fr]">
                  <TextInput label="Icon" value={r.icon} onChange={(e) => update({ ...r, icon: e.target.value })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextInput label="Title" value={r.title} onChange={(e) => update({ ...r, title: e.target.value })} />
                    <TextInput label="Meta" value={r.meta} onChange={(e) => update({ ...r, meta: e.target.value })} />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Night total (€)"
              type="number"
              value={data.nightTotal}
              onChange={(e) => set({ nightTotal: Number(e.target.value) })}
            />
            <TextInput label="Night total meta" value={data.nightTotalMeta} onChange={(e) => set({ nightTotalMeta: e.target.value })} />
          </div>
        </Card>

        <Card>
          <CardTitle>Footer</CardTitle>
          <div className="flex flex-col gap-4">
            <TextInput label="Copyright line" value={data.footerCopyright} onChange={(e) => set({ footerCopyright: e.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Email" value={data.footerEmail} onChange={(e) => set({ footerEmail: e.target.value })} />
              <TextInput label="Lock-up link label" value={data.footerLockLabel} onChange={(e) => set({ footerLockLabel: e.target.value })} />
            </div>
          </div>
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
