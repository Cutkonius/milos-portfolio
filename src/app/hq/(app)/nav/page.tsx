import { getContentAdmin } from "@/lib/cms/content";
import { NavEditor } from "./nav-editor";

export default async function NavPage() {
  const { content } = await getContentAdmin();
  return <NavEditor initial={content.nav} />;
}
