/**
 * Generate logo assets from the source logo PNG:
 * - logo.webp (transparent, for header)
 * - favicon.ico (multi-size ICO: 16x16, 32x32, 48x48)
 * - favicon-16x16.png (overwrite existing)
 * - favicon-32x32.png (overwrite existing)
 * - apple-touch-icon.png (180x180, overwrite existing)
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const srcLogo = resolve(publicDir, 'logo.png');

async function generateAssets() {
  console.log('Generating logo assets from logo.png...\n');

  // 1. WebP for header (keep transparency, resize to reasonable header size)
  await sharp(srcLogo)
    .resize(40, 40, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(resolve(publicDir, 'logo.webp'));
  console.log('✅ logo.webp (40x40, transparent)');

  // Also make a larger version for retina
  await sharp(srcLogo)
    .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(resolve(publicDir, 'logo@2x.webp'));
  console.log('✅ logo@2x.webp (80x80, transparent, retina)');

  // 2. Favicon PNGs
  await sharp(srcLogo)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-16x16.png'));
  console.log('✅ favicon-16x16.png');

  await sharp(srcLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png');

  await sharp(srcLogo)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-48x48.png'));
  console.log('✅ favicon-48x48.png');

  // 3. Apple touch icon (180x180, with white background for iOS)
  await sharp(srcLogo)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png (180x180, white bg)');

  // 4. Generate favicon.ico (multi-size)
  // ICO format: we'll create individual PNGs and pack them into ICO
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(srcLogo)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ size, buffer: buf });
  }

  // Build ICO file manually (ICO format spec)
  const icoBuffer = buildIco(pngBuffers);
  writeFileSync(resolve(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✅ favicon.ico (16x16 + 32x32 + 48x48)');

  console.log('\nDone! All logo assets generated.');
}

function buildIco(images) {
  // ICO header: 6 bytes
  // ICO directory entries: 16 bytes each
  // Then image data
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  let dataOffset = headerSize + dirSize;
  const entries = [];

  for (const img of images) {
    entries.push({
      width: img.size === 256 ? 0 : img.size,
      height: img.size === 256 ? 0 : img.size,
      dataSize: img.buffer.length,
      dataOffset: dataOffset,
      buffer: img.buffer,
    });
    dataOffset += img.buffer.length;
  }

  const totalSize = dataOffset;
  const ico = Buffer.alloc(totalSize);

  // ICO Header
  ico.writeUInt16LE(0, 0);      // Reserved
  ico.writeUInt16LE(1, 2);      // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  // Directory entries
  let offset = headerSize;
  for (const entry of entries) {
    ico.writeUInt8(entry.width, offset);
    ico.writeUInt8(entry.height, offset + 1);
    ico.writeUInt8(0, offset + 2);   // Color palette
    ico.writeUInt8(0, offset + 3);   // Reserved
    ico.writeUInt16LE(1, offset + 4); // Color planes
    ico.writeUInt16LE(32, offset + 6); // Bits per pixel
    ico.writeUInt32LE(entry.dataSize, offset + 8);
    ico.writeUInt32LE(entry.dataOffset, offset + 12);
    offset += dirEntrySize;
  }

  // Image data
  for (const entry of entries) {
    entry.buffer.copy(ico, entry.dataOffset);
  }

  return ico;
}

generateAssets().catch(console.error);
