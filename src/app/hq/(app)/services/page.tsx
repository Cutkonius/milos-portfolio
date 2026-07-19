import { getContentAdmin } from "@/lib/cms/content";
import { ServicesEditor } from "./services-editor";

export default async function ServicesPage() {
  const { content } = await getContentAdmin();
  return <ServicesEditor initial={content.services} />;
}
