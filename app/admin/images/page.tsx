'use client';

import { useEffect, useState, useRef } from 'react';
import { optimizeImage, validateImageFile } from '@/lib/admin/image-optimizer';

interface Image {
  id: number;
  key: string;
  url: string;
  alt_text: string;
  category: string;
  original_filename: string;
  file_size: number;
}

export default function AdminImages() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageKey, setImageKey] = useState('');
  const [category, setCategory] = useState('general');
  const [altText, setAltText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/images/list', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        setError('Failed to load images');
      }
    } catch (err) {
      setError('Error loading images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    // Auto-fill fields from filename
    const filename = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    if (!imageKey) {
      setImageKey(filename.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
    }
    if (!altText) {
      setAltText(filename.replace(/-/g, ' '));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !imageKey || !category) {
      setError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setUploadProgress('Optimizing image...');
    setError('');

    try {
      // Optimize image
      const optimized = await optimizeImage(selectedFile);

      setUploadProgress('Uploading to R2...');

      // Upload to server
      const formData = new FormData();
      formData.append('file', optimized);
      formData.append('key', imageKey);
      formData.append('category', category);
      formData.append('alt', altText);

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setUploadProgress('Upload complete!');

        // Reset form
        setSelectedFile(null);
        setImageKey('');
        setCategory('general');
        setAltText('');
        setPreviewUrl('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Refresh image list
        fetchImages();

        // Clear progress after 2 seconds
        setTimeout(() => setUploadProgress(''), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload image');
      }
    } catch (err) {
      setError('Error uploading image: ' + (err as Error).message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Delete image "${key}"?`)) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/admin/images/list?key=${key}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchImages();
      } else {
        alert('Failed to delete image');
      }
    } catch (err) {
      alert('Error deleting image');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Images</h1>
        <p className="mt-2 text-gray-600">
          Upload and manage website images. All images are automatically optimized and converted to WebP.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {uploadProgress && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {uploadProgress}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Image</h2>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* File Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded" />
                <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreviewUrl('');
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop an image, or click to select
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG, or WebP up to 10MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Key * (unique identifier)
              </label>
              <input
                type="text"
                value={imageKey}
                onChange={(e) => setImageKey(e.target.value)}
                placeholder="e.g., hero-main, card-ev-charging"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="general">General</option>
                <option value="hero">Hero</option>
                <option value="card">Card</option>
                <option value="service">Service</option>
                <option value="logo">Logo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text (for accessibility)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Images Grid */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Existing Images</h2>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading images...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No images uploaded yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                <img
                  src={image.url}
                  alt={image.alt_text}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <div className="space-y-1">
                  <p className="font-medium text-sm text-gray-900">{image.key}</p>
                  <p className="text-xs text-gray-500">{image.category}</p>
                  <p className="text-xs text-gray-400">
                    {(image.file_size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(image.key)}
                  className="mt-3 w-full px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
