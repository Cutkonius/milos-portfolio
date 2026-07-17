import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Miloš Novaković — built in daylight, sold after dark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/fonts", file));

export default async function OpengraphImage() {
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
          fontFamily: "Switzer",
          position: "relative",
        }}
      >
        {/* Day sky */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "56%",
            backgroundImage: "linear-gradient(180deg,#e6ecf6 0%,#eee0cd 62%,#f6d3a4 100%)",
            color: "#171c26",
          }}
        >
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 5,
              color: "#b56a1c",
            }}
          >
            19:58 · MILOŠ NOVAKOVIĆ · WEBSITES & MARKETING
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Built in daylight.
          </div>
        </div>

        {/* Horizon */}
        <div
          style={{
            height: 4,
            backgroundImage:
              "linear-gradient(90deg,rgba(255,220,170,0) 0%,rgba(255,220,170,0.85) 50%,rgba(255,220,170,0) 100%)",
            display: "flex",
          }}
        />

        {/* Night */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            backgroundImage: "linear-gradient(180deg,#151a29 0%,#0d1017 100%)",
            color: "#eef1f7",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Sold after dark.
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 22,
              color: "rgba(238,241,247,0.62)",
            }}
          >
            AI-built websites · email flows · SEO — Belgrade, both shifts
          </div>
        </div>

        {/* The sun on the horizon */}
        <div
          style={{
            position: "absolute",
            top: 630 * 0.56 - 47,
            left: 600 - 47,
            width: 94,
            height: 94,
            borderRadius: 999,
            backgroundImage: "radial-gradient(circle at 42% 38%, #fff3dd, #ffce8a 60%, #f5a94e)",
            boxShadow: "0 0 80px rgba(255,190,110,0.9)",
            display: "flex",
          }}
        />

        {/* Stars */}
        {[
          [200, 460],
          [320, 520],
          [900, 480],
          [1050, 560],
          [760, 590],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 4,
              height: 4,
              borderRadius: 999,
              background: "#eef1f7",
              opacity: 0.7,
              display: "flex",
            }}
          />
        ))}
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
