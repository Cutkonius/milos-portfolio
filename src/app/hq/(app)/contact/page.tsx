import { getContentAdmin } from "@/lib/cms/content";
import { ContactEditor } from "./contact-editor";

export default async function ContactPage() {
  const { content } = await getContentAdmin();
  return <ContactEditor initial={content.contact} />;
}
