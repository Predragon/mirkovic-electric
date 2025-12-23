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

  return {
    title: `${service.title} | Mirkovic Electric`,
    description: service.description,
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
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max">
          <Link href="/services/" className="text-brand-600 hover:text-brand-700 mb-4 inline-block">
            ← Back to Services
          </Link>
          <h1 className="mb-4">{service.title}</h1>
          <p className="text-xl text-brand-400 mb-8 max-w-3xl">{service.subtitle}</p>
          <p className="text-lg text-brand-500 mb-8 max-w-3xl">{service.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="btn-secondary text-center">
              Call: (408) 900-2672
            </a>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding">
        <div className="container-max max-w-3xl">
          {service.sections.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="mb-6">{section.heading}</h2>
              {typeof section.content === 'string' ? (
                <p className="text-brand-500 leading-relaxed mb-4">{section.content}</p>
              ) : (
                <ul className="space-y-3">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3">
                      <span className="text-brand-600 font-bold mt-1">•</span>
                      <span className="text-brand-500">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {service.applications && (
            <div className="mb-12">
              <h2 className="mb-6">Applications</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.applications.map((app, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-brand-600 font-bold">•</span>
                    <span className="text-brand-500">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.whoItFor && (
            <div className="mb-12 p-6 bg-brand-50 rounded-lg">
              <h3 className="font-semibold text-brand-600 mb-3">Who This Service Is For</h3>
              <p className="text-brand-500">{service.whoItFor}</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-brand-50">
        <div className="container-max">
          <h2 className="text-center mb-12">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/services/"
              className="p-6 bg-white rounded-lg border border-brand-100 hover:border-brand-300 transition-all"
            >
              <h3 className="font-semibold text-brand-600 mb-2">All Services</h3>
              <p className="text-brand-400 text-sm">Explore our complete range of electrical solutions.</p>
            </Link>
            <Link
              href="/services/load-management/"
              className="p-6 bg-white rounded-lg border border-brand-100 hover:border-brand-300 transition-all"
            >
              <h3 className="font-semibold text-brand-600 mb-2">Load Management</h3>
              <p className="text-brand-400 text-sm">Capacity planning for modern electrical systems.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="mb-8">Ready to get started?</h2>
          <p className="text-lg text-brand-400 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how {service.title.toLowerCase()} can benefit your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="btn-secondary text-center">
              (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
