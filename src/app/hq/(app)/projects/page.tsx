import { getContentAdmin } from "@/lib/cms/content";
import { ProjectsEditor } from "./projects-editor";

export default async function ProjectsPage() {
  const { content } = await getContentAdmin();
  return <ProjectsEditor initial={content.work} />;
}
