# Image Migration Guide

This guide will help you migrate all existing images to Cloudflare R2.

## Overview
- **Total Images:** 16
- **Location:** `public/images/`
- **Destination:** R2 bucket `mirkovicelectric`

## Step 1: Upload Images to R2

You need to upload all images from `public/images/` to your R2 bucket maintaining the folder structure.

### Option A: Using Cloudflare Dashboard (Recommended for Android)

1. Go to **Cloudflare Dashboard** → **R2** → **mirkovicelectric** bucket
2. Create folders:
   - `images/cards/`
   - `images/hero/`
   - `images/general/`

3. Upload files to each folder:

**images/cards/** (9 files):
- audio-systems-full.webp
- ev-charging-full.webp
- ev-installations.webp
- general-electrical-full.webp
- load-management-full.webp
- panel-upgrades.webp
- permits-pge-full.webp
- smart-panels-full.webp
- troubleshooting.webp

**images/hero/** (5 files):
- ev-charging-hero-old-backup.webp
- ev-charging-hero.webp
- hero-bg.webp
- modern-home.webp
- smart-home.webp

**images/general/** (2 files):
- logo-full.webp
- logo.webp

### Option B: Using R2 API (if you have access)

```bash
# From the mirkovic_electric directory
find public/images -type f -name "*.webp" | while read file; do
  # Extract path after public/images/
  key=$(echo $file | sed 's|public/||')
  echo "Uploading $key..."
  # Use wrangler or AWS CLI to upload
done
```

## Step 2: Add Metadata to D1 Database

After uploading all images to R2, run this SQL in **D1 Console**:

Go to **Cloudflare Dashboard** → **D1** → **mirkovic-electric-content** → **Console**

Copy and paste the contents of `scripts/image-metadata.sql`

## Step 3: Verify

After running the SQL, verify in D1 Console:

```sql
SELECT COUNT(*) FROM images;
-- Should return 16

SELECT * FROM images LIMIT 5;
-- Should show your images
```

## Step 4: Test in Admin

1. Go to `https://admin.mirkovicelectric.com/admin/images`
2. You should see all 16 images listed
3. Images should be accessible via `https://media.mirkovicelectric.com/images/...`

## Troubleshooting

**Images not showing?**
- Check R2 bucket has public access configured
- Verify custom domain `media.mirkovicelectric.com` is set up
- Check image paths in D1 match R2 paths

**Some images missing?**
- Run: `SELECT COUNT(*) FROM images WHERE category = 'cards';`
- Should return 9 for cards, 5 for hero, 2 for general
