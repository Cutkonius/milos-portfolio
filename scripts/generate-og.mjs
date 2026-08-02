import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const background = path.join(root, "src/images/hero-nocturne-desktop-v6.webp");
const output = path.join(root, "public/og.png");

const overlay = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" x2="1">
        <stop offset="0" stop-color="#030817" stop-opacity="0.98"/>
        <stop offset="0.5" stop-color="#030817" stop-opacity="0.86"/>
        <stop offset="0.78" stop-color="#030817" stop-opacity="0.2"/>
        <stop offset="1" stop-color="#030817" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <path d="M58 54v522M68 54v522" stroke="#ffad24" stroke-width="1" opacity="0.9"/>
    <text x="94" y="94" fill="#a9bdeb" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="4">MILOŠ NOVAKOVIĆ</text>
    <text x="92" y="232" fill="#f1e6cd" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">BUILD THE WEBSITE.</text>
    <text x="92" y="318" fill="#ffad24" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">SET UP WHAT</text>
    <text x="92" y="396" fill="#ffad24" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">HAPPENS NEXT.</text>
    <path d="M92 436h430M92 445h430" stroke="#ffad24" stroke-width="1" opacity="0.82"/>
    <text x="94" y="500" fill="#f1e6cd" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2">WEBSITE STRATEGY / UX/UI / DEVELOPMENT</text>
    <text x="94" y="535" fill="#f1e6cd" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2">EMAIL PLATFORM / AUTOMATION / LIFECYCLE COPY</text>
  </svg>
`);

await sharp(background)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .composite([{ input: overlay }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(output);

console.log(`Generated ${path.relative(root, output)}`);
