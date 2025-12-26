# Mirkovic Electric - Admin Dashboard Setup Guide

## MVP Features Completed ✅

Your admin dashboard MVP is ready with these features:
- **Admin Authentication** - Simple password-based login
- **Services Management** - Edit all service content via web interface
- **Image Upload** - Automatic optimization and R2 storage
- **Dynamic Content** - Changes appear within 5 minutes (ISR)

---

## Prerequisites

Before deploying, you'll need:
1. **Cloudflare Account** (free tier works)
2. **Wrangler CLI** installed on your desktop/laptop (not on Termux)
3. **Git** for version control

---

## Part 1: Setup Cloudflare Resources

### Step 1: Install Wrangler (on your desktop/laptop)

```bash
npm install -g wrangler
wrangler login
```

### Step 2: Create D1 Database

```bash
cd /path/to/mirkovic_electric
wrangler d1 create mirkovic-electric-content
```

**Output will include:** `database_id = "xxxxx"`

Copy this ID and update `/wrangler.toml` line 11:
```toml
database_id = "YOUR_D1_DATABASE_ID"  # Replace with actual ID
```

### Step 3: Run Database Migrations

```bash
# Create schema
wrangler d1 execute mirkovic-electric-content --file=./scripts/schema.sql

# Seed initial settings
wrangler d1 execute mirkovic-electric-content --file=./scripts/seed-d1.sql

# Migrate services data
wrangler d1 execute mirkovic-electric-content --file=./scripts/services-data.sql
```

### Step 4: Create R2 Bucket

```bash
wrangler r2 bucket create mirkovic-electric-media
```

### Step 5: Upload Images to R2 (Optional - for existing images)

```bash
# Make script executable
chmod +x scripts/migrate-images-to-r2.sh

# Run migration (this uploads all images from /public/images to R2)
./scripts/migrate-images-to-r2.sh

# Then import metadata to D1
wrangler d1 execute mirkovic-electric-content --file=./scripts/images-metadata.sql
```

### Step 6: Configure R2 Custom Domain

1. Go to Cloudflare Dashboard → R2 → `mirkovic-electric-media`
2. Click "Settings" → "Custom Domains"
3. Add domain: `media.mirkovicelectric.com`
4. Cloudflare will automatically configure DNS

### Step 7: Set Admin Password

```bash
wrangler secret put ADMIN_PASSWORD
# Enter your secure admin password when prompted
```

---

## Part 2: Deploy to Cloudflare Pages

### Option A: Deploy via Git (Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add admin dashboard MVP"
   git push origin main
   ```

2. **Create Cloudflare Pages Project:**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect to your GitHub repository
   - Configure build settings:
     - **Framework preset:** Next.js
     - **Build command:** `npm run build`
     - **Build output directory:** `.next`

3. **Add Environment Variables:**
   In Pages project settings → Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://mirkovicelectric.com
   R2_PUBLIC_URL=https://media.mirkovicelectric.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Bind D1 Database and R2 Bucket:**
   - In Pages project settings → Functions
   - Add D1 binding: `DB` → `mirkovic-electric-content`
   - Add R2 binding: `R2_BUCKET` → `mirkovic-electric-media`

5. **Deploy:**
   - Cloudflare Pages will automatically build and deploy
   - Wait for deployment to complete

### Option B: Deploy via Wrangler

```bash
# Build the Next.js app
npm run build

# Deploy using Wrangler
wrangler pages deploy .next --project-name=mirkovic-electric
```

---

## Part 3: Access Your Admin Dashboard

### Step 1: Navigate to Admin Login

Visit: `https://mirkovicelectric.com/admin/login`

### Step 2: Login

Enter the admin password you set in Step 7 above.

### Step 3: Start Managing Content!

- **Dashboard:** `/admin` - Overview and quick links
- **Services:** `/admin/services` - Edit service content
- **Images:** `/admin/images` - Upload and manage images

---

## How to Use the Admin Dashboard

### Editing Services

1. Go to **Services** page
2. Click **Edit** on any service
3. Update title, subtitle, description, sections, etc.
4. Click **Save Changes**
5. Changes will appear on the live site within 5 minutes

### Uploading Images

1. Go to **Images** page
2. Drag & drop an image or click to select
3. Fill in:
   - **Image Key:** Unique identifier (e.g., `hero-main`, `card-ev-charging`)
   - **Category:** hero, card, service, logo, or general
   - **Alt Text:** Description for accessibility
4. Click **Upload Image**
5. Image is automatically optimized and uploaded to R2

### Replacing Existing Images

1. Upload a new image with the **same image key**
2. The new image will replace the old one
3. Changes appear immediately (images cached for 1 hour)

---

## Architecture Overview

### Data Flow

```
User edits content in /admin
    ↓
Saved to Cloudflare D1 database
    ↓
Public API endpoints fetch from D1
    ↓
Next.js pages render with ISR (5 min cache)
    ↓
Changes appear on live site within 5 minutes
```

### Image Flow

```
Upload image in /admin
    ↓
Optimized in browser (WebP, compressed)
    ↓
Uploaded to Cloudflare R2
    ↓
Metadata stored in D1
    ↓
Images served via R2 custom domain
```

---

## API Endpoints Reference

### Public Endpoints (No Auth Required)

- `GET /api/public/services` - List all services
- `GET /api/public/services?slug=ev-charging` - Get service details
- `GET /api/public/settings` - Get site settings
- `GET /api/public/images?key=hero-main` - Get image URL

### Admin Endpoints (Auth Required)

**Headers:** `Authorization: Bearer <password>`

- `GET /api/admin/content/services` - List all services (admin view)
- `GET /api/admin/content/services?id=1` - Get service by ID
- `PUT /api/admin/content/services` - Update service
- `DELETE /api/admin/content/services?id=1` - Delete service
- `POST /api/admin/images/upload` - Upload image
- `GET /api/admin/images/list` - List all images
- `DELETE /api/admin/images/list?key=hero-main` - Delete image

---

## Cost Estimate

### Cloudflare Free Tier:

- **D1 Database:** FREE (5GB storage, 5M reads/day, 100K writes/day)
- **R2 Storage:** First 10GB free, then $0.015/GB/month
- **R2 Operations:** Generous free tier
- **Pages:** FREE (unlimited bandwidth, 500 builds/month)
- **Functions:** FREE (100K requests/day)

**Expected Monthly Cost: $0** (fits entirely in free tier)

---

## Troubleshooting

### "Unauthorized" error in admin

- Check that `ADMIN_PASSWORD` environment variable is set
- Verify password in `/admin/login` matches

### Images not loading

- Check R2 custom domain is configured: `media.mirkovicelectric.com`
- Verify `R2_PUBLIC_URL` environment variable is correct
- Check browser console for CORS errors

### Changes not appearing on site

- Wait 5 minutes (ISR cache revalidation)
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check Cloudflare Pages build logs for errors

### Database errors

- Verify D1 binding is correct in Pages settings
- Check migrations ran successfully
- View D1 data in Cloudflare Dashboard

---

## Future Enhancements (Not in MVP)

Ideas for future development:
- Settings editor (currently in code)
- Homepage content editor
- Bulk image operations
- Image preview before replacing
- Service areas manager
- Trust badges editor
- User roles and permissions
- Activity log
- Supabase mirroring (no vendor lock-in)

---

## Support

For issues or questions:
1. Check Cloudflare Pages deployment logs
2. Check browser console for errors
3. Review API responses in Network tab
4. Check D1 database contents in Cloudflare Dashboard

---

## Security Notes

- Admin password stored as environment variable (not in code)
- All admin API endpoints protected with authentication middleware
- HTTPS enforced by Cloudflare
- No sensitive data in client-side code
- Image uploads validated and optimized before storage

---

**Your admin dashboard is ready! 🎉**

Log in at `/admin/login` and start managing your content.
