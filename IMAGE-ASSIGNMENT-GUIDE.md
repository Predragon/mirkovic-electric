# Image Assignment Guide

## How to Assign Images to Website Locations

### Step-by-Step Process

1. **Upload in Admin** (https://admin.mirkovicelectric.com/admin/images)
   - Choose image file
   - Enter unique **Image Key**
   - Select **Category** (determines folder)
   - Add **Alt Text** for SEO
   - Upload (automatically optimized to WebP)

2. **Update Website Code** (if new location)
   - Edit the appropriate file (see map below)
   - Reference image using: `/images/[category]/[key].webp`
   - Update alt text for SEO

3. **Deploy Changes**
   - Commit and push code changes
   - Website automatically rebuilds

---

## Current Image Assignments Map

### Homepage (`/app/page.tsx`)

#### Hero Section (Line 16)
```tsx
<ParallaxHero
  imageSrc="/images/hero/ev-charging-hero.webp"
  imageAlt="Professional EV Charger Installation Bay Area - Licensed Electrician San Jose"
>
```
- **Image Key**: `ev-charging-hero`
- **Category**: `hero`
- **To Change**: Upload new image with same key OR upload with new key and update line 16

#### Service Cards Grid

**Card 1 - General Electrical** (Line 86)
```tsx
imageSrc="/images/cards/general-electrical-full.webp"
```
- **Image Key**: `general-electrical-full`
- **Category**: `cards`

**Card 2 - Power Planning** (Line 94)
```tsx
imageSrc="/images/cards/load-management-full.webp"
```
- **Image Key**: `load-management-full`
- **Category**: `cards`

**Card 3 - Service Upgrades** (Line 102)
```tsx
imageSrc="/images/cards/smart-panels-full.webp"
```
- **Image Key**: `smart-panels-full`
- **Category**: `cards`

**Card 4 - EV Charging** (Line 113)
```tsx
imageSrc="/images/cards/ev-charging-full.webp"
```
- **Image Key**: `ev-charging-full`
- **Category**: `cards`

**Card 5 - Permits & PG&E** (Line 121)
```tsx
imageSrc="/images/cards/permits-pge-full.webp"
```
- **Image Key**: `permits-pge-full`
- **Category**: `cards`

**Card 6 - Audio Systems** (Line 129)
```tsx
imageSrc="/images/cards/audio-systems-full.webp"
```
- **Image Key**: `audio-systems-full`
- **Category**: `cards`

---

### Header & Footer (`/components/ui/Header.tsx`, `/components/ui/Footer.tsx`)

#### Main Logo (Header.tsx Line 18)
```tsx
<Image
  src="/images/logo-full.webp"
  alt="Mirkovic Electric - Licensed Bay Area Electrician"
  width={400}
  height={80}
/>
```
- **Image Key**: `logo-full`
- **Category**: `general` (no subfolder - logos go in root /images/)
- **Path**: `/images/logo-full.webp`

---

## Example: Adding a New Service Card

### Scenario: Add "Solar Panel Installation" service

**Step 1: Upload Image**
- Go to admin dashboard
- Upload image with:
  - **Image Key**: `solar-panels-full`
  - **Category**: `cards`
  - **Alt Text**: `Solar Panel Installation Bay Area - Residential Solar Electrician San Jose`

**Step 2: Update Homepage Code**
Edit `/app/page.tsx` and add a new ParallaxCard:

```tsx
<ParallaxCard
  href="/services/solar-panels/"
  imageSrc="/images/cards/solar-panels-full.webp"
  imageAlt="Solar Panel Installation Bay Area - Residential Solar Electrician San Jose"
  title="Solar Panel Installation"
  description="Professional solar panel wiring and installation"
/>
```

**Step 3: Update Image Usage Map**
Edit `/lib/image-usage-map.ts` in admin repo:

```tsx
'solar-panels-full': [
  {
    page: 'Homepage',
    section: 'Services Grid - Card 7',
    description: '"Solar Panel Installation" card image'
  }
],
```

---

## Example: Changing Hero Image

### Scenario: Replace homepage hero with new photo

**Option 1: Keep Same Key (Overwrites)**
1. Upload new image with key: `ev-charging-hero`
2. Same category: `hero`
3. No code changes needed - automatic replacement

**Option 2: New Key (Preserves Old)**
1. Upload new image with key: `solar-hero`
2. Category: `hero`
3. Edit `/app/page.tsx` line 16:
   ```tsx
   imageSrc="/images/hero/solar-hero.webp"
   ```

---

## Image Categories and Paths

| Category | Folder Path | Usage |
|----------|-------------|-------|
| `hero` | `/images/hero/` | Large background images for hero sections |
| `cards` | `/images/cards/` | Service card images (featured on homepage) |
| `general` | `/images/` | Logos and general branding (no subfolder) |

---

## Files to Edit for Image Assignments

| Location | File to Edit | Line Numbers |
|----------|--------------|--------------|
| Homepage Hero | `/app/page.tsx` | Line 16 |
| Homepage Service Cards | `/app/page.tsx` | Lines 86, 94, 102, 113, 121, 129 |
| Header Logo | `/components/ui/Header.tsx` | Line 18 |
| Footer Logo | `/components/ui/Footer.tsx` | (check file) |
| Service Page Heroes | `/app/services/[service]/page.tsx` | Varies by service |

---

## Admin Dashboard Features

### "Used In" Section
Each image in the admin shows where it's currently used:
- **Page**: Which page displays the image
- **Section**: Specific section (Hero, Card 1, Header, etc.)

### Not Assigned Images
Images uploaded but not referenced in code show:
- **Page**: "Not Assigned"
- **Section**: "N/A"
- **Description**: "This image is uploaded but not currently used on the website"

---

## Tips

1. **Descriptive Keys**: Use clear, descriptive keys like `ev-charging-hero` instead of `img1`
2. **Alt Text**: Always include location-based keywords for SEO
3. **Consistent Naming**: Follow pattern: `[service-name]-[type]` (e.g., `ev-charging-full`, `solar-hero`)
4. **Check Usage**: Before deleting, check "Used In" section to avoid breaking pages
5. **Test First**: Upload to staging, verify display, then push to production

---

## Troubleshooting

**Q: Image uploaded but not showing on website?**
- Check D1 database has metadata (run SQL from `scripts/insert-images-to-d1.sql`)
- Verify R2 file exists at correct path
- Check website code references correct path

**Q: Want to change an image?**
- Option 1: Upload with same key (overwrites, no code changes)
- Option 2: Upload with new key and update code reference

**Q: How to know if image is being used?**
- Check "Used In" section in admin dashboard
- Or search codebase: `grep -r "your-image-key" app/`
