# D1 Database Migration Guide (Mobile-Friendly)

Run these SQL commands in your D1 Console in order.

## How to Access D1 Console:

1. Go to: https://dash.cloudflare.com
2. Click **Workers & Pages** → **D1**
3. Click database: **mirkovic-electric-content**
4. Click **Console** tab
5. Copy-paste each SQL block below and click **Execute**

---

## Migration 1: Create Tables (Copy & Execute This)

```sql
CREATE TABLE IF NOT EXISTS site_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE NOT NULL, value TEXT NOT NULL, category TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, order_index INTEGER DEFAULT 0, visible BOOLEAN DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS service_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, service_id INTEGER NOT NULL, heading TEXT NOT NULL, content TEXT NOT NULL, content_type TEXT DEFAULT 'text', order_index INTEGER DEFAULT 0, FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS service_metadata (id INTEGER PRIMARY KEY AUTOINCREMENT, service_id INTEGER NOT NULL, meta_key TEXT NOT NULL, meta_value TEXT NOT NULL, FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS homepage_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section_key TEXT UNIQUE NOT NULL, content TEXT NOT NULL, visible BOOLEAN DEFAULT 1, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE NOT NULL, r2_key TEXT NOT NULL, alt_text TEXT, category TEXT, original_filename TEXT, file_size INTEGER, dimensions TEXT, uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS service_areas (id INTEGER PRIMARY KEY AUTOINCREMENT, city_name TEXT NOT NULL, order_index INTEGER DEFAULT 0, visible BOOLEAN DEFAULT 1);
CREATE TABLE IF NOT EXISTS trust_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, icon_type TEXT NOT NULL, icon_value TEXT NOT NULL, title TEXT NOT NULL, description TEXT, order_index INTEGER DEFAULT 0, visible BOOLEAN DEFAULT 1);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(visible);
CREATE INDEX IF NOT EXISTS idx_service_sections_service ON service_sections(service_id);
CREATE INDEX IF NOT EXISTS idx_service_metadata_service ON service_metadata(service_id);
CREATE INDEX IF NOT EXISTS idx_images_key ON images(key);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_key ON homepage_sections(section_key);
```

✅ Click **Execute** - You should see "Success" messages

---

## Migration 2: Seed Initial Settings (Copy & Execute This)

```sql
INSERT INTO site_settings (key, value, category) VALUES ('site_name', 'Mirkovic Electric', 'general'), ('tagline', 'Modern Electrical Solutions for Today''s High-Demand Properties', 'general'), ('phone', '(408) 900-2672', 'contact'), ('license_number', 'C-10 License #627414', 'general'), ('years_experience', '30+', 'general'), ('founded_year', '1991', 'general'), ('meta_title', 'Mirkovic Electric | Licensed Bay Area Electrical Contractor', 'seo'), ('meta_description', 'Licensed Bay Area electrical contractor since 1991 specializing in EV charging installations, load management, smart panels, and audiophile audio systems. C-10 License #627414.', 'seo'), ('og_image', '/images/og-image.png', 'seo'), ('business_name', 'Mirkovic Electric', 'schema'), ('business_type', 'Electrician', 'schema'), ('address_street', 'San Jose', 'schema'), ('address_city', 'San Jose', 'schema'), ('address_state', 'CA', 'schema'), ('address_postal', '95000', 'schema'), ('price_range', '$$', 'schema');
INSERT INTO service_areas (city_name, order_index, visible) VALUES ('San Jose', 0, 1), ('Palo Alto', 1, 1), ('Menlo Park', 2, 1), ('Cupertino', 3, 1), ('San Mateo', 4, 1), ('Mountain View', 5, 1), ('Sunnyvale', 6, 1), ('Los Altos', 7, 1);
INSERT INTO trust_badges (icon_type, icon_value, title, description, order_index, visible) VALUES ('text', 'C-10', 'Licensed Contractor', 'California C-10 License #627414. Fully insured and bonded for your protection.', 0, 1), ('text', '30+', 'Years of Experience', 'Serving Bay Area homeowners since 1991 with expert electrical solutions.', 1, 1), ('text', 'BAY', 'Local Expertise', 'Deep knowledge of Bay Area codes, permitting, and PG&E coordination.', 2, 1);
INSERT INTO homepage_sections (section_key, content, visible) VALUES ('hero', '{"title": "Modern Electrical Solutions for Today''s High-Demand Properties", "subtitle": "Licensed Bay Area Electrical Contractor", "cta_text": "Request a Quote", "cta_link": "/contact", "background_image_key": "hero-main"}', 1), ('why_choose_us', '{"title": "Why Choose Mirkovic Electric", "items": [{"title": "Expert Planning", "description": "We plan before we install, ensuring your electrical system can handle current and future demands."}, {"title": "Permit Ready", "description": "All work is designed to pass inspection the first time with proper documentation."}, {"title": "PG&E Coordination", "description": "We handle utility coordination and service upgrade applications when needed."}]}', 1), ('service_intro', '{"title": "Our Services", "description": "Specialized electrical services for modern properties with high-demand systems."}', 1);
```

✅ Click **Execute** - Settings, service areas, and badges are now in the database

---

## Migration 3: Import Services Data

**This is a LARGE SQL file.** The easiest way is:

### Option A: Use the File Upload Feature (if available in D1 console)
1. Look for "Import" or "Upload SQL" button
2. Upload: `/data/data/com.termux/files/home/mirkovic_electric/scripts/services-data.sql`

### Option B: Copy from GitHub (after you push)
1. Push your code to GitHub first
2. View `scripts/services-data.sql` on GitHub
3. Copy the raw content
4. Paste into D1 Console
5. Execute

### Option C: Skip for now (recommended for MVP)
You can add services manually through the admin dashboard after deployment!

---

## Verify Tables Were Created

Run this query to see all your tables:

```sql
SELECT name FROM sqlite_master WHERE type='table';
```

You should see:
- site_settings
- services
- service_sections
- service_metadata
- homepage_sections
- images
- service_areas
- trust_badges

---

## ✅ Database Setup Complete!

Next steps:
1. Push code to GitHub
2. Deploy to Cloudflare Pages
3. Connect D1 and R2 bindings in Pages settings
