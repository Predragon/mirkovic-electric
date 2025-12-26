import { getService, getAllServiceSlugs } from '@/lib/services'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    service: slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params
  const service = getService(resolvedParams.service)
  if (!service) return {}

  const title = `${service.title} | Mirkovic Electric`
  const description = service.description.slice(0, 155) + '...'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://mirkovicelectric.com/services/${service.slug}/`,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: `${service.title} - Mirkovic Electric`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical: `https://mirkovicelectric.com/services/${service.slug}/`,
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params
  const service = getService(resolvedParams.service)

  if (!service) {
    notFound()
  }

  return (
    <div className="w-full">
      {/* Page Header - Clean & Simple */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-max py-6 sm:py-8">
          <Link href="/services/" className="text-accent-600 hover:text-accent-700 mb-4 inline-flex items-center gap-1 font-medium text-sm">
            <span aria-hidden="true">←</span> Back to Services
          </Link>
        </div>
      </section>

      {/* Content First - Text & CTAs */}
      <section className="bg-gray-50">
        <div className="container-max py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Content - These defaults will be replaced by edge function based on page */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <p className="text-accent-600 font-semibold text-sm sm:text-base uppercase tracking-wide mb-3">
                {service.subtitle}
              </p>
              <h1 className="mb-4 text-navy-900">{service.title}</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact/" className="btn-primary text-center">
                  Request a Quote
                </Link>
                <a href="tel:(408)900-2672" className="px-6 py-3 bg-navy-800 hover:bg-navy-900 text-white rounded-lg font-semibold transition-colors text-center">
                  Call: (408) 900-2672
                </a>
              </div>
            </div>

            {/* Image Banner - Below CTAs */}
            <div className="mt-12">
              <img
                src="/images/hero/ev-charging-hero.webp"
                alt={service.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          {service.sections.map((section, idx) => (
            <div key={idx} className="mb-10 sm:mb-12">
              <h2 className="mb-4 sm:mb-6">{section.heading}</h2>
              {typeof section.content === 'string' ? (
                <p className="text-gray-600 leading-relaxed mb-4">{section.content}</p>
              ) : (
                <ul className="space-y-3">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3">
                      <span className="text-accent-500 font-bold mt-1" aria-hidden="true">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {service.applications && (
            <div className="mb-10 sm:mb-12">
              <h2 className="mb-4 sm:mb-6">Applications</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {service.applications.map((app, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent-500 font-bold" aria-hidden="true">•</span>
                    <span className="text-gray-600">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.whoItFor && (
            <div className="mb-10 sm:mb-12 p-5 sm:p-6 bg-accent-50 rounded-xl border border-accent-100">
              <h3 className="font-semibold text-navy-700 mb-3">Who This Service Is For</h3>
              <p className="text-gray-600">{service.whoItFor}</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-center mb-8 sm:mb-12">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/"
              className="p-5 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-accent-300 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-navy-700 mb-2 group-hover:text-accent-500 transition-colors">All Services</h3>
              <p className="text-gray-500 text-sm">Explore our complete range of electrical solutions.</p>
            </Link>
            <Link
              href="/services/power-planning/"
              className="p-5 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-accent-300 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-navy-700 mb-2 group-hover:text-accent-500 transition-colors">Power Planning</h3>
              <p className="text-gray-500 text-sm">Advanced planning and smart panel solutions.</p>
            </Link>
            <Link
              href="/services/service-upgrades/"
              className="p-5 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-accent-300 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-navy-700 mb-2 group-hover:text-accent-500 transition-colors">Service Upgrades</h3>
              <p className="text-gray-500 text-sm">Panel and service capacity upgrades.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <h2 className="mb-6 text-white">Ready to get started?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how {service.title.toLowerCase()} can benefit your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-colors text-center">
              (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
