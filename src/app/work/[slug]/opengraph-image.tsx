import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/lib/cms/content";
import type { Project } from "@/lib/cms/types";

export const alt = "Case study | Miloš Novaković";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const slugOf = (p: Project) => p.slug || p.id;
const font = (file: string) => readFile(join(process.cwd(), "src/fonts", file));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { work } = await getContent();
  const project = work.projects.find((p) => p.kind === "case" && slugOf(p) === slug);
  const title = project?.title || "Case study";
  const intro = project?.caseStudy?.intro || project?.description || "";
  const tags = project?.caseStudy?.tags ?? [];

  const [switzer400, switzer600] = await Promise.all([
    font("switzer-400.woff"),
    font("switzer-600.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Switzer",
          padding: 72,
          backgroundImage: "linear-gradient(180deg,#10141f 0%,#07090d 100%)",
          color: "#eef1f7",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, fontWeight: 600, letterSpacing: 4, color: "#e8b06a" }}>
          SELECTED WORK · MILOŠ NOVAKOVIĆ
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            {title}
          </div>
          {intro && (
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "rgba(238,241,247,0.7)", maxWidth: 920 }}>
              {intro.slice(0, 120)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.slice(0, 4).map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 18,
                color: "rgba(238,241,247,0.7)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Switzer", data: switzer400, weight: 400, style: "normal" },
        { name: "Switzer", data: switzer600, weight: 600, style: "normal" },
      ],
    }
  );
}
