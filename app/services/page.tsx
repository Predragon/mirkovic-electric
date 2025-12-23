import Link from 'next/link'

export const metadata = {
  title: 'Electrical Services',
  description: 'Professional electrical services in the Bay Area: EV charging installation, load management, smart panels (SPAN), permits & PG&E coordination, and audiophile audio systems.',
  openGraph: {
    title: 'Electrical Services | Mirkovic Electric',
    description: 'Professional electrical services in the Bay Area: EV charging, load management, smart panels, permits, and audio systems.',
    url: 'https://landing.mirkovicelectric.com/services/',
  },
  alternates: {
    canonical: 'https://landing.mirkovicelectric.com/services/',
  },
}

export default function Services() {
  const services = [
    {
      title: 'EV Charging & Load Sharing',
      description: 'System-level EV charging solutions for residential and commercial properties.',
      href: '/services/ev-charging/',
    },
    {
      title: 'Load Management & Power Planning',
      description: 'Electrical capacity planning for modern properties with increasing power demands.',
      href: '/services/load-management/',
    },
    {
      title: 'Smart Electrical Panels & Energy Monitoring',
      description: 'Advanced control and visibility for modern electrical systems.',
      href: '/services/smart-panels/',
    },
    {
      title: 'Permits & PG&E Coordination',
      description: 'Pre-construction planning, utility coordination, and inspection support.',
      href: '/services/permits-pge/',
    },
    {
      title: 'Audiophile Audio Systems & Networked Playback',
      description: 'Reference-grade audio infrastructure, system design, and integration.',
      href: '/services/audio-systems/',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max text-center">
          <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">What We Do</p>
          <h1 className="mb-6">Our Services</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Mirkovic Electric provides design-driven electrical solutions for modern residential and commercial properties.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="p-6 sm:p-8 border-2 border-gray-100 rounded-xl hover:border-accent-300 hover:shadow-xl transition-all group bg-white"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-accent-500 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-500 text-base sm:text-lg mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-accent-500 font-semibold group-hover:gap-3 transition-all">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <h2 className="mb-6 text-white">Ready to get started?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-colors text-center">
              Call: (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
