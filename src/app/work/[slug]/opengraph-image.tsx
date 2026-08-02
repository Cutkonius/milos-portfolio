import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/lib/cms/content";
import type { Project } from "@/lib/cms/types";

export const alt = "Selected work case study by Miloš Novaković";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const slugOf = (p: Project) => p.slug || p.id;
const font = (file: string) => readFile(join(process.cwd(), "src/fonts", file));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { work } = await getContent();
  const project = work.projects.find(
    (p) =>
      p.kind === "case" &&
      p.published &&
      p.caseStudy?.enabled &&
      slugOf(p) === slug
  );
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
          position: "relative",
          overflow: "hidden",
          background: "#050713",
          color: "#f1e6cd",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 360,
            height: 630,
            display: "flex",
            background: "#11175e",
            borderLeft: "2px solid #173fae",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 82,
            bottom: 72,
            width: 190,
            height: 190,
            display: "flex",
            borderRadius: 999,
            background: "#f2b33d",
          }}
        />
        <div style={{ display: "flex", zIndex: 1, fontSize: 18, fontWeight: 600, letterSpacing: 3, color: "#f2b33d" }}>
          CASE STUDY / MILOŠ NOVAKOVIĆ
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", zIndex: 1, fontSize: 88, fontWeight: 600, letterSpacing: -2, lineHeight: 0.96 }}>
            {title}
          </div>
          {intro && (
            <div style={{ display: "flex", zIndex: 1, marginTop: 24, fontSize: 26, color: "rgba(241,230,205,0.78)", maxWidth: 760 }}>
              {intro.slice(0, 120)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", zIndex: 1, gap: 14, fontSize: 18, color: "#a9bdeb" }}>
          {tags.slice(0, 4).map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 14 }}>
              {i > 0 && <span style={{ color: "#f2b33d" }}>/</span>}
              <span>{t}</span>
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
