/**
 * Client-side image optimization utility
 * Uses browser-image-compression to optimize images before upload
 */

import imageCompression from 'browser-image-compression';

export interface OptimizationOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
}

/**
 * Optimize an image file for web use
 * Converts to WebP format, compresses, and resizes
 */
export async function optimizeImage(
  file: File,
  options: OptimizationOptions = {}
): Promise<File> {
  const defaultOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp',
    quality: 0.85,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, defaultOptions);
    return compressedFile;
  } catch (error) {
    throw new Error('Failed to optimize image: ' + (error as Error).message);
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, or WebP images.',
    };
  }

  // Check file size (max 10MB before optimization)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB.',
    };
  }

  return { valid: true };
}

/**
 * Get preview URL for an image file
 */
export function getImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}
