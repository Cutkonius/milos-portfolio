import { getContentAdmin } from "@/lib/cms/content";
import { SettingsEditor } from "./settings-editor";

export default async function SettingsPage() {
  const { content } = await getContentAdmin();
  return <SettingsEditor initial={content.site} />;
}
