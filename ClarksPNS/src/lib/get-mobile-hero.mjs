// src/lib/get-mobile-hero.mjs
import sharp from "sharp";
import { basename, dirname, join, extname } from "node:path";
import { mkdir, stat } from "node:fs/promises";

async function main() {
  const [srcPath, outDirArg] = process.argv.slice(2);

  if (!srcPath) {
    console.error(
      "\nUsage:\n  node src/lib/get-mobile-hero.mjs <sourceImage> [outDir]\n\nExample:\n  node src/lib/get-mobile-hero.mjs src/assets/clarkshero.png src/assets\n"
    );
    process.exit(1);
  }

  // Validate source exists
  try {
    await stat(srcPath);
  } catch {
    console.error(`\n✖ Source not found: ${srcPath}\n`);
    process.exit(1);
  }

  const outDir = outDirArg || dirname(srcPath);
  await mkdir(outDir, { recursive: true });

  const base = basename(srcPath, extname(srcPath)); // no extension
  const sizes = [640, 960, 1440];

  console.log(`\n▶ Generating responsive images from: ${srcPath}`);
  console.log(`→ Output directory: ${outDir}`);
  console.log(`→ Sizes: ${sizes.join(", ")} px\n`);

  // Helper to build a pipeline; flatten for JPG to remove alpha if present
  const forWidth = (w) => sharp(srcPath).resize({ width: w, withoutEnlargement: true });

  const outputs = [];

  for (const w of sizes) {
    // JPG (good fallback)
    const jpgName = `phone-${w}.jpg`;
    await forWidth(w)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // only affects images with alpha
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(join(outDir, jpgName));
    outputs.push(jpgName);

    // WEBP (smaller, modern)
    const webpName = `phone-${w}.webp`;
    await forWidth(w)
      .webp({ quality: 70 })
      .toFile(join(outDir, webpName));
    outputs.push(webpName);
  }

  console.log("✓ Done. Created:");
  for (const f of outputs) console.log("  - " + f);

  console.log(
    `\nImport example (JPG fallback):\n` +
      `  import phone640 from "@/assets/images/phone-640.jpg";\n` +
      `  import phone960 from "@/assets/images/phone-960.jpg";\n` +
      `  import phone1440 from "@/assets/images/phone-1440.jpg";\n`
  );
}

main().catch((err) => {
  console.error("\nUnexpected error:\n", err);
  process.exit(1);
});
