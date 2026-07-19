import { listMedia } from "@/lib/cms/media";
import { MediaLibrary } from "./media-library";

export default async function MediaPage() {
  const items = await listMedia();
  return <MediaLibrary initial={items} />;
}
