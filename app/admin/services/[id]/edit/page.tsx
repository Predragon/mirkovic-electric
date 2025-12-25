'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Section {
  heading: string;
  content: string | string[];
  contentType: 'text' | 'list';
}

interface ServiceData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  visible: boolean;
  sections: Section[];
  metadata: {
    applications?: string[];
    whoItFor?: string;
    whyItMatters?: string;
  };
}

export default function EditService() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [service, setService] = useState<ServiceData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const fetchService = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/admin/content/services?id=${serviceId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        setError('Failed to load service');
      }
    } catch (err) {
      setError('Error loading service');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setSaving(true);
    setError('');

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch('/api/admin/content/services', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: service.id,
          slug: service.slug,
          title: service.title,
          subtitle: service.subtitle,
          description: service.description,
          visible: service.visible,
          orderIndex: 0,
          sections: service.sections,
          metadata: service.metadata,
        }),
      });

      if (response.ok) {
        router.push('/admin/services');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save service');
      }
    } catch (err) {
      setError('Error saving service');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Service not found
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Basic Fields */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={service.title}
            onChange={(e) => setService({ ...service, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={service.subtitle}
            onChange={(e) => setService({ ...service, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={service.slug}
            onChange={(e) => setService({ ...service, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">URL: /services/{service.slug}</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="visible"
            checked={service.visible}
            onChange={(e) => setService({ ...service, visible: e.target.checked })}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="visible" className="ml-2 block text-sm text-gray-700">
            Visible on website
          </label>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
        <p className="text-sm text-gray-600">
          Edit section headings and content. Content can be plain text or lists (one item per line).
        </p>

        {service.sections.map((section, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <input
              type="text"
              value={section.heading}
              onChange={(e) => {
                const newSections = [...service.sections];
                newSections[index].heading = e.target.value;
                setService({ ...service, sections: newSections });
              }}
              placeholder="Section Heading"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              value={Array.isArray(section.content) ? section.content.join('\n') : section.content}
              onChange={(e) => {
                const newSections = [...service.sections];
                const value = e.target.value;
                // If content has newlines, treat as list
                if (value.includes('\n')) {
                  newSections[index].content = value.split('\n').filter(line => line.trim());
                  newSections[index].contentType = 'list';
                } else {
                  newSections[index].content = value;
                  newSections[index].contentType = 'text';
                }
                setService({ ...service, sections: newSections });
              }}
              rows={section.contentType === 'list' ? 6 : 3}
              placeholder={section.contentType === 'list' ? 'One item per line' : 'Section content'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            />
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applications (one per line)
          </label>
          <textarea
            value={service.metadata.applications?.join('\n') || ''}
            onChange={(e) => setService({
              ...service,
              metadata: {
                ...service.metadata,
                applications: e.target.value.split('\n').filter(line => line.trim()),
              },
            })}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who It's For
          </label>
          <textarea
            value={service.metadata.whoItFor || ''}
            onChange={(e) => setService({
              ...service,
              metadata: {
                ...service.metadata,
                whoItFor: e.target.value,
              },
            })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
