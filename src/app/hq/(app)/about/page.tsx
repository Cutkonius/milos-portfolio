import { getContentAdmin } from "@/lib/cms/content";
import { AboutEditor } from "./about-editor";

export default async function AboutPage() {
  const { content } = await getContentAdmin();
  return <AboutEditor initial={content.about} />;
}
