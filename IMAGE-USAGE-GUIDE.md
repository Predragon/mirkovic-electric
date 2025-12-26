# Image Usage Guide - Mirkovic Electric

## How Images Are Organized

### Categories

1. **hero** - Large background images for hero sections
2. **cards** - Service card images (featured on homepage)
3. **general** - Logos and general branding

---

## Image Placement Map

### Homepage (`/`)

#### Hero Section (Top)
- **Image Key:** `ev-charging-hero`
- **Location:** Background image at top of homepage
- **R2 Path:** `images/hero/ev-charging-hero.webp`
- **Code:** `/app/page.tsx` line 16

#### Service Cards Grid
- **general-electrical-full** → "General Electrical Services" card
- **load-management-full** → "Power Planning & Smart Panels" card
- **smart-panels-full** → "Electrical Service Upgrades" card
- **ev-charging-full** → "EV Charging Solutions" card
- **permits-pge-full** → "Permits & PG&E Coordination" card
- **audio-systems-full** → "Audiophile Audio Systems" card

### Service Pages (`/services/[service]/`)

Each service page can have its own hero image:
- `/services/ev-charging/` → uses `ev-charging-full` or custom hero
- `/services/load-management/` → uses `load-management-full`
- etc.

### Header/Footer
- **logo-full** → Full logo in header
- **logo** → Compact logo (if needed)

---

## Adding New Images

### Step 1: Upload to Admin Dashboard
1. Go to https://admin.mirkovicelectric.com/admin/images
2. Click "Upload Image"
3. Fill in:
   - **Image Key:** Unique identifier (e.g., `solar-panel-installation`)
   - **Category:** Where it belongs (hero, cards, general)
   - **Alt Text:** SEO-friendly description
   - **File:** Select your optimized image

### Step 2: Update Website Code (if needed)

**For Homepage Service Cards:**
Edit `/app/page.tsx` and update the ParallaxCard component:

```tsx
<ParallaxCard
  href="/services/your-service/"
  imageSrc="/images/cards/your-image-key.webp"
  imageAlt="Your SEO Alt Text"
  title="Service Title"
  description="Service description"
/>
```

**For Service Page Hero:**
Edit `/app/services/[service]/page.tsx` and update the image source.

---

## Image Requirements

- **Format:** WebP (for best performance)
- **Hero Images:** 1920x1080px minimum
- **Card Images:** 800x600px minimum
- **Logos:** Transparent background PNG or WebP
- **File Size:** < 500KB (optimized automatically by admin)

---

## Current Image Inventory

### Hero Images (5)
1. `ev-charging-hero` - Main hero background
2. `ev-charging-hero-old-backup` - Backup
3. `hero-bg` - Alternative background
4. `modern-home` - Modern home electrical
5. `smart-home` - Smart home system

### Card Images (9)
1. `audio-systems-full` - Audiophile systems
2. `ev-charging-full` - EV charging
3. `ev-installations` - EV installations
4. `general-electrical-full` - General services
5. `load-management-full` - Load management
6. `panel-upgrades` - Panel upgrades
7. `permits-pge-full` - Permits/PG&E
8. `smart-panels-full` - Smart panels
9. `troubleshooting` - Troubleshooting

### General (2)
1. `logo-full` - Full company logo
2. `logo` - Compact logo

---

## R2 Storage Structure

```
mirkovic-electric-media (R2 Bucket)
└── images/
    ├── cards/
    │   ├── audio-systems-full.webp
    │   ├── ev-charging-full.webp
    │   └── ... (9 total)
    ├── hero/
    │   ├── ev-charging-hero.webp
    │   ├── hero-bg.webp
    │   └── ... (5 total)
    ├── logo-full.webp
    └── logo.webp
```

**Public URL:** `https://media.mirkovicelectric.com/images/[category]/[filename].webp`

---

## Troubleshooting

### Images Not Showing on Website?

1. **Check D1 Database:** Make sure image metadata exists
   ```sql
   SELECT key, r2_key FROM images WHERE key = 'your-image-key';
   ```

2. **Check R2 Bucket:** Verify file exists at the r2_key path

3. **Check Website Code:** Verify image path matches R2 structure
   - Local: `/images/cards/example.webp`
   - R2: Should be same path in bucket

4. **Clear Cache:** Force rebuild to pick up new images

### Need to Replace an Image?

1. Upload new image with **same key** (overwrites)
2. Or upload with new key and update website code
3. Old image in R2 will be replaced automatically
