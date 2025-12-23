'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[\d\s\-\(\)\+]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to GoHighLevel
      const response = await fetch('https://api.leadconnectorhq.com/widget/form/O2BgIkUyRcytJ2XQaUrF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          message: `Service: ${formData.service || 'Not specified'}\n\n${formData.message}`,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('Failed to submit form. Please try calling (408) 900-2672 instead.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">
          Your message has been received. We'll get back to you within 24 business hours.
        </p>
        <p className="text-green-600 text-sm mb-6">
          For urgent inquiries, call <a href="tel:(408)900-2672" className="font-semibold hover:underline">(408) 900-2672</a>
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-green-700 underline hover:no-underline text-sm"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
          }`}
          placeholder="Your full name"
          disabled={isSubmitting}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
          }`}
          placeholder="your@email.com"
          disabled={isSubmitting}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-navy-700 mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors ${
            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
          }`}
          placeholder="(408) 000-0000"
          disabled={isSubmitting}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-navy-700 mb-2">
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white transition-colors"
          disabled={isSubmitting}
        >
          <option value="">Select a service (optional)</option>
          <option value="ev-charging">EV Charging & Load Sharing</option>
          <option value="load-management">Load Management & Power Planning</option>
          <option value="smart-panels">Smart Electrical Panels</option>
          <option value="permits-pge">Permits & PG&E Coordination</option>
          <option value="audio-systems">Audiophile Audio Systems</option>
          <option value="panel-upgrades">Panel Upgrades & Infrastructure</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy-700 mb-2">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white transition-colors resize-none"
          placeholder="Tell us about your project, property type, and any specific requirements..."
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-accent-500 hover:bg-accent-600 active:transform active:scale-[0.99] shadow-lg shadow-accent-500/20'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Request'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respond within 24 business hours. For urgent inquiries, call{' '}
        <a href="tel:(408)900-2672" className="text-accent-500 hover:underline">(408) 900-2672</a>
      </p>
    </form>
  )
}
