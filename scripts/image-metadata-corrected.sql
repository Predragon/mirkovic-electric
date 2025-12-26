-- Image Metadata Migration (CORRECTED)
-- Generated: 2025-12-26
-- Total images: 16
-- Matches actual R2 bucket structure

-- Cards (9 images)
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('audio-systems-full', 'images/cards/audio-systems-full.webp', 'cards', 'Audio Systems Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('ev-charging-full', 'images/cards/ev-charging-full.webp', 'cards', 'EV Charging Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('ev-installations', 'images/cards/ev-installations.webp', 'cards', 'EV Installations', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('general-electrical-full', 'images/cards/general-electrical-full.webp', 'cards', 'General Electrical Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('load-management-full', 'images/cards/load-management-full.webp', 'cards', 'Load Management Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('panel-upgrades', 'images/cards/panel-upgrades.webp', 'cards', 'Panel Upgrades', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('permits-pge-full', 'images/cards/permits-pge-full.webp', 'cards', 'Permits PG&E Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('smart-panels-full', 'images/cards/smart-panels-full.webp', 'cards', 'Smart Panels Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('troubleshooting', 'images/cards/troubleshooting.webp', 'cards', 'Troubleshooting', 0, 'image/webp', CURRENT_TIMESTAMP);

-- Hero (5 images)
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('ev-charging-hero-old-backup', 'images/hero/ev-charging-hero-old-backup.webp', 'hero', 'EV Charging Hero Old Backup', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('ev-charging-hero', 'images/hero/ev-charging-hero.webp', 'hero', 'EV Charging Hero', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('hero-bg', 'images/hero/hero-bg.webp', 'hero', 'Hero Background', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('modern-home', 'images/hero/modern-home.webp', 'hero', 'Modern Home', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('smart-home', 'images/hero/smart-home.webp', 'hero', 'Smart Home', 0, 'image/webp', CURRENT_TIMESTAMP);

-- General/Logo (2 images) - CORRECTED PATHS
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('logo-full', 'images/logo-full.webp', 'general', 'Mirkovic Electric Logo Full', 0, 'image/webp', CURRENT_TIMESTAMP);
INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('logo', 'images/logo.webp', 'general', 'Mirkovic Electric Logo', 0, 'image/webp', CURRENT_TIMESTAMP);
