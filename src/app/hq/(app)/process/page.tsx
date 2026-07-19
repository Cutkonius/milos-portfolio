import { getContentAdmin } from "@/lib/cms/content";
import { ProcessEditor } from "./process-editor";

export default async function ProcessPage() {
  const { content } = await getContentAdmin();
  return <ProcessEditor initial={content.process} />;
}
