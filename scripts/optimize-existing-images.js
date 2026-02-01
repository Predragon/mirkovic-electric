#!/usr/bin/env node
/**
 * Bulk Image Optimizer Script
 *
 * Downloads existing images from R2, optimizes them, and re-uploads with correct extensions.
 *
 * Usage:
 *   1. Set environment variables:
 *      export ADMIN_TOKEN=your-admin-password
 *
 *   2. Run the script:
 *      node scripts/optimize-existing-images.js
 */

const fs = require('fs');
const path = require('path');

async function main() {
  // Import sharp dynamically (ES module)
  const sharp = (await import('sharp')).default;

  // Configuration
  const ADMIN_API_URL = process.env.ADMIN_API_URL || 'https://admin.mirkovicelectric.com';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const DRY_RUN = process.argv.includes('--dry-run');
  const MAX_SIZE_KB = 500;
  const MAX_WIDTH = 1920;
  const QUALITY = 85;

  if (!ADMIN_TOKEN) {
    console.error('❌ Error: ADMIN_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log('🖼️  Bulk Image Optimizer');
  console.log('========================');
  console.log(`API URL: ${ADMIN_API_URL}`);
  console.log(`Dry run: ${DRY_RUN ? 'Yes' : 'No'}`);
  console.log(`Target: max ${MAX_SIZE_KB}KB, ${MAX_WIDTH}px, ${QUALITY}% quality\n`);

  // Step 1: Fetch list of images
  console.log('📋 Fetching image list...');
  const listResponse = await fetch(`${ADMIN_API_URL}/api/admin/images/list`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });

  if (!listResponse.ok) {
    console.error(`❌ Failed to fetch images: ${listResponse.status}`);
    process.exit(1);
  }

  const images = await listResponse.json();
  console.log(`   Found ${images.length} images\n`);

  // Filter images that need optimization
  const needsOptimization = images.filter(img => {
    const isBlob = img.r2_key?.endsWith('.blob');
    const isLarge = img.file_size > MAX_SIZE_KB * 1024;
    return isBlob || isLarge;
  });

  console.log(`🔍 Images needing optimization: ${needsOptimization.length}\n`);

  if (needsOptimization.length === 0) {
    console.log('✅ All images are already optimized!');
    return;
  }

  // Show what will be processed
  console.log('Images to process:');
  console.log('─'.repeat(70));
  for (const img of needsOptimization) {
    const sizeKB = (img.file_size / 1024).toFixed(0);
    const ext = img.r2_key?.split('.').pop() || '?';
    console.log(`  ${img.key.substring(0, 40).padEnd(42)} ${sizeKB.padStart(6)} KB  .${ext}`);
  }
  console.log('─'.repeat(70) + '\n');

  if (DRY_RUN) {
    console.log('🏃 Dry run mode - no changes made');
    return;
  }

  // Process each image
  let processed = 0;
  let failed = 0;
  let totalSaved = 0;

  for (const img of needsOptimization) {
    console.log(`\n📸 [${processed + failed + 1}/${needsOptimization.length}] ${img.key}`);

    try {
      // Download image
      process.stdout.write('   ⬇️  Downloading... ');
      const imageResponse = await fetch(img.url);
      if (!imageResponse.ok) {
        throw new Error(`Download failed: ${imageResponse.status}`);
      }
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      const originalSize = imageBuffer.length;
      console.log(`${(originalSize / 1024).toFixed(0)} KB`);

      // Optimize with sharp
      process.stdout.write('   🔧 Optimizing... ');
      const optimized = await sharp(imageBuffer)
        .resize(MAX_WIDTH, MAX_WIDTH, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: QUALITY })
        .toBuffer();

      const newSize = optimized.length;
      const saved = originalSize - newSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(0);
      console.log(`${(newSize / 1024).toFixed(0)} KB (saved ${savedPercent}%)`);

      // Re-upload using multipart form
      process.stdout.write('   ⬆️  Uploading... ');

      // Create form data boundary
      const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);
      const filename = `${img.key}.webp`;

      // Build multipart body
      let body = '';
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
      body += `Content-Type: image/webp\r\n\r\n`;

      const bodyStart = Buffer.from(body, 'utf8');
      const bodyEnd = Buffer.from(`\r\n--${boundary}\r\n` +
        `Content-Disposition: form-data; name="key"\r\n\r\n${img.key}\r\n` +
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="category"\r\n\r\n${img.category || 'general'}\r\n` +
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="alt"\r\n\r\n${img.alt_text || ''}\r\n` +
        `--${boundary}--\r\n`, 'utf8');

      const fullBody = Buffer.concat([bodyStart, optimized, bodyEnd]);

      const uploadResponse = await fetch(`${ADMIN_API_URL}/api/admin/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: fullBody
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${uploadResponse.status} - ${errorText}`);
      }

      console.log('✅ Done!');
      processed++;
      totalSaved += saved;

    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      failed++;
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Summary');
  console.log('═'.repeat(50));
  console.log(`   Processed: ${processed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('═'.repeat(50));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
