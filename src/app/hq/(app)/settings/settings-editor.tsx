"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/cms/types";
import { Card, PageHeader, TextArea, TextInput, Toggle } from "@/app/hq/_components/ui";
import { SaveBar } from "@/app/hq/_components/save-bar";
import { useSectionSave } from "@/app/hq/_components/use-section-save";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-sm font-semibold text-text/85">{children}</div>;
}

export function SettingsEditor({ initial }: { initial: SiteSettings }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (patch: Partial<SiteSettings>) => {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  };
  const { saving, save } = useSectionSave("site");
  async function onSave() {
    if (await save(data)) setDirty(false);
  }

  return (
    <div>
      <PageHeader kicker="Controls" title="Settings" description="Search, social and availability." />

      <div className="flex flex-col gap-5">
        <Card>
          <CardTitle>Search &amp; social</CardTitle>
          <div className="flex flex-col gap-4">
            <TextInput label="Meta title" value={data.metaTitle} onChange={(e) => set({ metaTitle: e.target.value })} />
            <TextArea
              label="Meta description"
              rows={2}
              value={data.metaDescription}
              onChange={(e) => set({ metaDescription: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="OG title" value={data.ogTitle} onChange={(e) => set({ ogTitle: e.target.value })} />
              <TextInput label="Site name" value={data.siteName} onChange={(e) => set({ siteName: e.target.value })} />
            </div>
            <TextArea
              label="OG description"
              rows={2}
              value={data.ogDescription}
              onChange={(e) => set({ ogDescription: e.target.value })}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Contact &amp; booking</CardTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Email" value={data.email} onChange={(e) => set({ email: e.target.value })} />
            <TextInput
              label="Cal.com link"
              hint="e.g. milos-novakovic/short-informative-call"
              value={data.calLink}
              onChange={(e) => set({ calLink: e.target.value })}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Status</CardTitle>
          <div className="flex flex-col gap-4">
            <Toggle
              checked={data.openForProjects}
              onChange={(v) => set({ openForProjects: v })}
              label="Open for projects. Shows the hero availability badge"
            />
            <p className="rounded-xl border border-text/10 bg-night/35 px-4 py-3 text-xs leading-5 text-text/55">
              Public launch is intentionally controlled at deploy time with the server-only
              <code className="mx-1 text-amber">SITE_LAUNCHED=true</code> environment variable.
              This CMS cannot accidentally remove the vault or make an unfinished site indexable.
            </p>
          </div>
        </Card>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
    </div>
  );
}
