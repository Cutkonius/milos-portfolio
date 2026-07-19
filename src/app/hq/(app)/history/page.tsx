import { listVersions } from "@/lib/cms/content";
import { HistoryList } from "./history-list";

export default async function HistoryPage() {
  const versions = await listVersions();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Belgrade",
  });
  const items = versions.map((v) => ({ key: v.key, at: v.at, label: fmt.format(new Date(v.at)) }));
  return <HistoryList items={items} />;
}
