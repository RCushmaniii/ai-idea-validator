/**
 * generate-images.mjs
 * Generates all image assets for AI Idea Validator using sharp.
 * Run: node scripts/generate-images.mjs
 */

import sharp from "sharp";
import { readFileSync, readdirSync } from "fs";
import { join, basename, extname } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");

// ─── OG Image (landscape 1200x630) ──────────────────────────────────────────

function ogSvg(width, height) {
  // Scale factors relative to landscape baseline
  const s = height / 630;
  const isSquare = width === height;

  // Layout positions
  const iconSize = Math.round(120 * s);
  const iconRx = Math.round(24 * s);
  const iconX = isSquare ? (width - iconSize) / 2 : 80;
  const iconY = isSquare ? 200 * s : (height - iconSize) / 2 - 30 * s;
  const iconTextY = iconY + iconSize * 0.68;
  const iconFontSize = Math.round(60 * s);

  const titleX = isSquare ? width / 2 : iconX + iconSize + 50;
  const titleY = isSquare ? iconY + iconSize + 80 * s : height / 2 - 20 * s;
  const titleAnchor = isSquare ? "middle" : "start";
  const titleFontSize = isSquare ? Math.round(56 * s) : Math.round(52 * s);

  const subtitleX = titleX;
  const subtitleY = titleY + 50 * s;
  const subtitleFontSize = isSquare ? Math.round(26 * s) : Math.round(24 * s);

  const domainY = height - 40 * s;
  const domainFontSize = Math.round(18 * s);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <!-- Subtle glow behind icon -->
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ea580c" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Subtle glow -->
  <circle cx="${iconX + iconSize / 2}" cy="${iconY + iconSize / 2}" r="${iconSize * 1.8}" fill="url(#glow)"/>

  <!-- Thin top accent line -->
  <rect x="0" y="0" width="${width}" height="4" fill="url(#accent)"/>

  <!-- Icon badge -->
  <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${iconRx}" fill="url(#accent)"/>
  <text x="${iconX + iconSize / 2}" y="${iconTextY}"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif"
        font-size="${iconFontSize}" font-weight="700" fill="white" text-anchor="middle">AI</text>

  <!-- Title -->
  <text x="${titleX}" y="${titleY}"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif"
        font-size="${titleFontSize}" font-weight="700" fill="white" text-anchor="${titleAnchor}">
    AI Idea Validator
  </text>

  <!-- Subtitle -->
  <text x="${subtitleX}" y="${subtitleY}"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif"
        font-size="${subtitleFontSize}" font-weight="400" fill="#9ca3af" text-anchor="${titleAnchor}">
    Brutal startup defensibility assessment
  </text>

  <!-- Domain -->
  <text x="${width / 2}" y="${domainY}"
        font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif"
        font-size="${domainFontSize}" font-weight="400" fill="#6b7280" text-anchor="middle">
    cushlabs.ai
  </text>
</svg>`;
}

async function generateOgImages() {
  console.log("Generating OG images...");

  // Landscape 1200x630
  await sharp(Buffer.from(ogSvg(1200, 630)))
    .png()
    .toFile(join(PUBLIC, "og-image.png"));
  console.log("  -> og-image.png (1200x630)");

  // Square 1200x1200
  await sharp(Buffer.from(ogSvg(1200, 1200)))
    .png()
    .toFile(join(PUBLIC, "og-image-square.png"));
  console.log("  -> og-image-square.png (1200x1200)");
}

// ─── Favicon PNGs ────────────────────────────────────────────────────────────

async function generateFavicons() {
  console.log("Generating favicon PNGs...");

  const svgPath = join(PUBLIC, "favicon.svg");
  const svgBuffer = readFileSync(svgPath);

  const sizes = [
    { size: 32, name: "favicon-32x32.png" },
    { size: 16, name: "favicon-16x16.png" },
    { size: 180, name: "apple-touch-icon.png" },
  ];

  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(PUBLIC, name));
    console.log(`  -> ${name} (${size}x${size})`);
  }
}

// ─── Portfolio PNG → WebP ────────────────────────────────────────────────────

async function convertPortfolioToWebP() {
  console.log("Converting portfolio PNGs to WebP...");

  const portfolioDir = join(PUBLIC, "images", "portfolio");
  const files = readdirSync(portfolioDir).filter(
    (f) => extname(f).toLowerCase() === ".png"
  );

  if (files.length === 0) {
    console.log("  No PNG files found in portfolio directory.");
    return;
  }

  for (const file of files) {
    const input = join(portfolioDir, file);
    const output = join(portfolioDir, basename(file, ".png") + ".webp");
    await sharp(input).webp({ quality: 80 }).toFile(output);
    console.log(`  -> ${basename(output)}`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== AI Idea Validator Image Generation ===\n");

  await generateOgImages();
  console.log();
  await generateFavicons();
  console.log();
  await convertPortfolioToWebP();

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
