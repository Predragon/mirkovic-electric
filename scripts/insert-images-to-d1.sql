-- Insert Image Metadata into D1 Database
-- Run this in Cloudflare D1 Console: mirkovic-electric-content
-- Matches R2 bucket structure uploaded via dashboard

-- Cards (9 images)
INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('audio-systems-full', 'images/cards/audio-systems-full.webp', 'cards', 'Audiophile Audio Systems Bay Area', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('ev-charging-full', 'images/cards/ev-charging-full.webp', 'cards', 'EV Charging Installation Bay Area', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('ev-installations', 'images/cards/ev-installations.webp', 'cards', 'EV Charger Installations', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('general-electrical-full', 'images/cards/general-electrical-full.webp', 'cards', 'General Electrical Services Bay Area', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('load-management-full', 'images/cards/load-management-full.webp', 'cards', 'Load Management Systems', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('panel-upgrades', 'images/cards/panel-upgrades.webp', 'cards', 'Electrical Panel Upgrades', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('permits-pge-full', 'images/cards/permits-pge-full.webp', 'cards', 'PG&E Permits and Coordination', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('smart-panels-full', 'images/cards/smart-panels-full.webp', 'cards', 'Smart Electrical Panels', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('troubleshooting', 'images/cards/troubleshooting.webp', 'cards', 'Electrical Troubleshooting', 0, CURRENT_TIMESTAMP);

-- Hero (5 images)
INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('ev-charging-hero-old-backup', 'images/hero/ev-charging-hero-old-backup.webp', 'hero', 'EV Charging Hero Backup', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('ev-charging-hero', 'images/hero/ev-charging-hero.webp', 'hero', 'Professional EV Charger Installation Bay Area', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('hero-bg', 'images/hero/hero-bg.webp', 'hero', 'Modern Electrical Solutions Background', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('modern-home', 'images/hero/modern-home.webp', 'hero', 'Modern Smart Home', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('smart-home', 'images/hero/smart-home.webp', 'hero', 'Smart Home Electrical System', 0, CURRENT_TIMESTAMP);

-- Logos (2 images - at root level of images/)
INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('logo-full', 'images/logo-full.webp', 'general', 'Mirkovic Electric Logo Full', 0, CURRENT_TIMESTAMP);

INSERT INTO images (key, r2_key, category, alt_text, file_size, uploaded_at)
VALUES ('logo', 'images/logo.webp', 'general', 'Mirkovic Electric Logo', 0, CURRENT_TIMESTAMP);
