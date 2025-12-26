-- Mirkovic Electric CMS Database Schema for Cloudflare D1

-- Site-wide settings (metadata, contact info, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT NOT NULL, -- 'general', 'contact', 'seo', 'metadata'
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services content
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service sections (one-to-many with services)
CREATE TABLE IF NOT EXISTS service_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  heading TEXT NOT NULL,
  content TEXT NOT NULL, -- JSON array for lists, plain text for paragraphs
  content_type TEXT DEFAULT 'text', -- 'text' or 'list'
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Service metadata (applications, whoItFor, etc.)
CREATE TABLE IF NOT EXISTS service_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  meta_key TEXT NOT NULL, -- 'applications', 'whoItFor', 'whyItMatters'
  meta_value TEXT NOT NULL, -- JSON array for lists, plain text for single values
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Homepage content sections
CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL, -- 'hero', 'why_choose_us', 'service_areas', etc.
  content TEXT NOT NULL, -- JSON object with all section data
  visible BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images metadata (R2 references)
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL, -- 'hero-main', 'service-ev-charging', 'card-ev-charging', etc.
  r2_key TEXT NOT NULL, -- Path in R2 bucket
  alt_text TEXT,
  category TEXT, -- 'hero', 'card', 'service', 'logo', 'general'
  original_filename TEXT,
  file_size INTEGER,
  dimensions TEXT, -- JSON: {"width": 1920, "height": 1080}
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service area cities
CREATE TABLE IF NOT EXISTS service_areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1
);

-- Trust badges/features
CREATE TABLE IF NOT EXISTS trust_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon_type TEXT NOT NULL, -- 'text', 'emoji', or 'image'
  icon_value TEXT NOT NULL, -- 'C-10', '30+', or image key
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(visible);
CREATE INDEX IF NOT EXISTS idx_service_sections_service ON service_sections(service_id);
CREATE INDEX IF NOT EXISTS idx_service_metadata_service ON service_metadata(service_id);
CREATE INDEX IF NOT EXISTS idx_images_key ON images(key);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_key ON homepage_sections(section_key);
