#!/bin/bash

# Image migration script for Cloudflare R2
# This script uploads all images from /public/images to R2 and generates SQL for metadata

BUCKET_NAME="mirkovic-electric-media"
PUBLIC_DIR="public/images"

echo "=== Mirkovic Electric Image Migration to R2 ==="
echo "Started at: $(date)"
echo ""

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to upload image and generate SQL
upload_image() {
  local file_path=$1
  local image_key=$2
  local category=$3
  local alt_text=$4

  # Get file info
  local filename=$(basename "$file_path")
  local file_size=$(stat -f%z "$file_path" 2>/dev/null || stat -c%s "$file_path" 2>/dev/null)

  # R2 key path
  local r2_key="images/${category}/${filename}"

  echo -e "${BLUE}Uploading:${NC} $file_path -> $r2_key"

  # Upload to R2
  wrangler r2 object put "${BUCKET_NAME}/${r2_key}" --file="$file_path"

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Uploaded successfully${NC}"

    # Generate SQL for metadata
    echo "-- Image: $image_key"
    echo "INSERT INTO images (key, r2_key, alt_text, category, original_filename, file_size)"
    echo "VALUES ("
    echo "  '$image_key',"
    echo "  '$r2_key',"
    echo "  '$alt_text',"
    echo "  '$category',"
    echo "  '$filename',"
    echo "  $file_size"
    echo ");"
    echo ""
  else
    echo "✗ Upload failed"
  fi
}

# Start SQL output
echo "-- Image metadata for D1 database" > scripts/images-metadata.sql
echo "-- Generated on: $(date)" >> scripts/images-metadata.sql
echo "" >> scripts/images-metadata.sql

{
  echo "-- Logo images"
  upload_image "${PUBLIC_DIR}/logo-full.webp" "logo-full" "logo" "Mirkovic Electric Full Logo"
  upload_image "${PUBLIC_DIR}/logo.webp" "logo" "logo" "Mirkovic Electric Logo"

  echo ""
  echo "-- Hero images"
  upload_image "${PUBLIC_DIR}/hero/ev-charging-hero.webp" "hero-ev-charging" "hero" "EV Charging Installation Hero Image"
  upload_image "${PUBLIC_DIR}/hero/hero-bg.webp" "hero-main" "hero" "Modern Electrical Solutions Hero Background"
  upload_image "${PUBLIC_DIR}/hero/modern-home.webp" "hero-modern-home" "hero" "Modern Home Electrical System"
  upload_image "${PUBLIC_DIR}/hero/smart-home.webp" "hero-smart-home" "hero" "Smart Home Technology"

  echo ""
  echo "-- Service card images"
  upload_image "${PUBLIC_DIR}/cards/ev-charging-full.webp" "card-ev-charging" "card" "EV Charging Service Card"
  upload_image "${PUBLIC_DIR}/cards/load-management-full.webp" "card-load-management" "card" "Load Management Service Card"
  upload_image "${PUBLIC_DIR}/cards/smart-panels-full.webp" "card-smart-panels" "card" "Smart Panels Service Card"
  upload_image "${PUBLIC_DIR}/cards/permits-pge-full.webp" "card-permits-pge" "card" "Permits & PG&E Coordination Card"
  upload_image "${PUBLIC_DIR}/cards/audio-systems-full.webp" "card-audio-systems" "card" "Audiophile Audio Systems Card"
  upload_image "${PUBLIC_DIR}/cards/panel-upgrades.webp" "card-panel-upgrades" "card" "Panel Upgrades Service Card"
  upload_image "${PUBLIC_DIR}/cards/ev-installations.webp" "card-ev-installations" "card" "EV Installations Card"
  upload_image "${PUBLIC_DIR}/cards/troubleshooting.webp" "card-troubleshooting" "card" "Electrical Troubleshooting Card"

  echo ""
  echo "-- Migration complete!"
  echo "-- Total images: 14"

} >> scripts/images-metadata.sql

echo ""
echo "=== Migration Complete ==="
echo "SQL metadata saved to: scripts/images-metadata.sql"
echo ""
echo "Next steps:"
echo "1. Run: wrangler d1 execute mirkovic-electric-content --file=./scripts/images-metadata.sql"
echo "2. Configure R2 custom domain: media.mirkovicelectric.com"
