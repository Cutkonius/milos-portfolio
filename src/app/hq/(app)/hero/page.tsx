import { getContentAdmin } from "@/lib/cms/content";
import { HeroEditor } from "./hero-editor";

export default async function HeroPage() {
  const { content } = await getContentAdmin();
  return <HeroEditor initial={content.hero} />;
}
