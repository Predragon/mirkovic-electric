#!/bin/bash

# Download high-quality electrical service images
# Usage: bash download-stock-images.sh

DEST_DIR="/data/data/com.termux/files/home/mirkovic_electric/public/images/general"

echo "📥 Downloading 15 electrical service images..."
echo "Destination: $DEST_DIR"
echo ""

# Create directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Download images from free sources
# These are sample URLs - you'll need to replace with actual image URLs from Pexels/Unsplash

# Image 1: Electrical Panel
echo "1/15 - Downloading electrical panel..."
# curl -L -o "$DEST_DIR/electrical-panel-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 2: EV Charging Station
echo "2/15 - Downloading EV charging station..."
# curl -L -o "$DEST_DIR/ev-charging-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 3: Electrician Working
echo "3/15 - Downloading electrician at work..."
# curl -L -o "$DEST_DIR/electrician-working-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 4: Smart Panel
echo "4/15 - Downloading smart electrical panel..."
# curl -L -o "$DEST_DIR/smart-panel-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 5: Residential Electrical Work
echo "5/15 - Downloading residential electrical work..."
# curl -L -o "$DEST_DIR/residential-electrical-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 6: Circuit Breaker Box
echo "6/15 - Downloading circuit breaker box..."
# curl -L -o "$DEST_DIR/circuit-breaker-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 7: EV Charger Installation
echo "7/15 - Downloading EV charger installation..."
# curl -L -o "$DEST_DIR/ev-charger-install-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 8: Modern Electrical Panel
echo "8/15 - Downloading modern electrical panel..."
# curl -L -o "$DEST_DIR/modern-panel-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 9: Electrician with Tools
echo "9/15 - Downloading electrician with tools..."
# curl -L -o "$DEST_DIR/electrician-tools-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 10: Industrial Electrical
echo "10/15 - Downloading industrial electrical..."
# curl -L -o "$DEST_DIR/industrial-electrical-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 11: Wiring Work
echo "11/15 - Downloading wiring work..."
# curl -L -o "$DEST_DIR/wiring-work-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 12: Electrical Testing
echo "12/15 - Downloading electrical testing..."
# curl -L -o "$DEST_DIR/electrical-testing-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 13: Commercial Electrical
echo "13/15 - Downloading commercial electrical..."
# curl -L -o "$DEST_DIR/commercial-electrical-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 14: Electrical Upgrade
echo "14/15 - Downloading electrical upgrade..."
# curl -L -o "$DEST_DIR/electrical-upgrade-1.jpg" "PEXELS_IMAGE_URL_HERE"

# Image 15: Professional Electrician
echo "15/15 - Downloading professional electrician..."
# curl -L -o "$DEST_DIR/professional-electrician-1.jpg" "PEXELS_IMAGE_URL_HERE"

echo ""
echo "✅ Download complete!"
echo "Images saved to: $DEST_DIR"
echo ""
echo "To get actual image URLs:"
echo "1. Visit https://www.pexels.com/search/electrician/"
echo "2. Click on each image you like"
echo "3. Click 'Download' button"
echo "4. Right-click the downloaded image and copy the download URL"
echo "5. Replace the PEXELS_IMAGE_URL_HERE placeholders above"
