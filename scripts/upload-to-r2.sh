#!/bin/bash

# R2 Upload Script
# This script uploads images to Cloudflare R2 using the S3-compatible API
#
# REQUIREMENTS:
# 1. Cloudflare Account ID
# 2. R2 Access Key ID
# 3. R2 Secret Access Key
#
# To create R2 API tokens:
# Cloudflare Dashboard → R2 → Manage R2 API Tokens → Create API Token

# Configuration (FILL THESE IN)
ACCOUNT_ID="YOUR_ACCOUNT_ID_HERE"
ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID_HERE"
SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY_HERE"
BUCKET_NAME="mirkovicelectric"

# R2 endpoint
ENDPOINT="https://$ACCOUNT_ID.r2.cloudflarestorage.com"

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "Error: curl is required but not installed"
    exit 1
fi

# Base directory
BASE_DIR="public/images"

echo "Starting R2 upload..."
echo "Bucket: $BUCKET_NAME"
echo "Endpoint: $ENDPOINT"
echo ""

# Function to upload a file
upload_file() {
    local file_path="$1"
    local r2_key="$2"

    echo "Uploading: $file_path → $r2_key"

    # Get file content type
    content_type="image/webp"

    # Upload using curl with AWS S3 signature
    curl -X PUT \
        --aws-sigv4 "aws:amz:auto:s3" \
        --user "$ACCESS_KEY_ID:$SECRET_ACCESS_KEY" \
        -H "Content-Type: $content_type" \
        --data-binary "@$file_path" \
        "$ENDPOINT/$BUCKET_NAME/$r2_key"

    if [ $? -eq 0 ]; then
        echo "✓ Success"
    else
        echo "✗ Failed"
    fi
    echo ""
}

# Upload all images
echo "Uploading card images..."
for file in public/images/cards/*.webp; do
    filename=$(basename "$file")
    upload_file "$file" "images/cards/$filename"
done

echo "Uploading hero images..."
for file in public/images/hero/*.webp; do
    filename=$(basename "$file")
    upload_file "$file" "images/hero/$filename"
done

echo "Uploading general images..."
for file in public/images/general/*.webp; do
    filename=$(basename "$file")
    upload_file "$file" "images/general/$filename"
done

echo "Upload complete!"
echo ""
echo "Next steps:"
echo "1. Verify uploads in Cloudflare R2 dashboard"
echo "2. Run the D1 migration SQL (scripts/image-metadata.sql)"
echo "3. Check admin dashboard: https://admin.mirkovicelectric.com/admin/images"
