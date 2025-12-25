'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  visible: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/content/services', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        setError('Failed to load services');
      }
    } catch (err) {
      setError('Error loading services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/admin/content/services?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchServices(); // Reload list
      } else {
        alert('Failed to delete service');
      }
    } catch (err) {
      alert('Error deleting service');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <p className="mt-2 text-gray-600">
            Edit service descriptions and content
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Services List */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="divide-y divide-gray-200">
          {services.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No services found
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      {!service.visible && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {service.subtitle}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      Slug: {service.slug}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-6">
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id, service.title)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Changes appear in 5 minutes</p>
            <p className="mt-1">The website uses ISR (Incremental Static Regeneration) with a 5-minute cache. Your changes will be visible within 5 minutes without rebuilding.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
