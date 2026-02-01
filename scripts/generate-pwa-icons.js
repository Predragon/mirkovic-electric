#!/usr/bin/env node
/**
 * Generate PWA icons from logo
 *
 * Usage: node scripts/generate-pwa-icons.js
 */

const path = require('path');

async function main() {
  const sharp = (await import('sharp')).default;

  const logoPath = path.join(__dirname, '../public/images/logo-full.webp');
  const iconsDir = path.join(__dirname, '../public/icons');
  const publicDir = path.join(__dirname, '../public');

  console.log('Generating PWA icons from logo...\n');

  // Read the logo
  const logo = sharp(logoPath);
  const metadata = await logo.metadata();
  console.log(`Source logo: ${metadata.width}x${metadata.height}`);

  // Generate icons with padding for maskable area
  const sizes = [
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 180, name: 'apple-touch-icon.png', output: publicDir },
  ];

  for (const { size, name, output } of sizes) {
    const outputDir = output || iconsDir;
    const outputPath = path.join(outputDir, name);

    // Create a square canvas with the brand navy background
    // and center the logo with padding
    const padding = Math.round(size * 0.1); // 10% padding
    const logoSize = size - (padding * 2);

    // Resize logo maintaining aspect ratio
    const resizedLogo = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 30, g: 58, b: 95, alpha: 0 } })
      .toBuffer();

    // Create the final icon with brand navy background
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 30, g: 58, b: 95, alpha: 1 } // #1e3a5f
      }
    })
      .composite([{
        input: resizedLogo,
        gravity: 'center'
      }])
      .png()
      .toFile(outputPath);

    console.log(`  Created: ${name} (${size}x${size})`);
  }

  // Generate favicon.ico (multi-size)
  const favicon16 = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 30, g: 58, b: 95, alpha: 1 } })
    .png()
    .toBuffer();

  const favicon32 = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 30, g: 58, b: 95, alpha: 1 } })
    .png()
    .toBuffer();

  // Save as PNG (browsers accept PNG favicons)
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 30, g: 58, b: 95, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  console.log('  Created: favicon.png (32x32)');

  console.log('\nPWA icons generated successfully!');
  console.log('\nNote: For best results, create screenshot images manually:');
  console.log('  - public/icons/screenshot-wide.png (1280x720)');
  console.log('  - public/icons/screenshot-narrow.png (750x1334)');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
