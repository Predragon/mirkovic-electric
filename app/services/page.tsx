import Link from 'next/link'

export const metadata = {
  title: 'Services | Mirkovic Electric',
  description: 'Advanced electrical services including EV charging, load management, smart panels, permits, and audio systems.',
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
      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max text-center">
          <h1 className="mb-6">Our Services</h1>
          <p className="text-xl text-brand-400 max-w-2xl mx-auto">
            Mirkovic Electric provides design-driven electrical solutions for modern residential and commercial properties.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="p-8 border-2 border-brand-100 rounded-lg hover:border-brand-300 hover:shadow-lg transition-all group"
              >
                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-brand-400 text-lg mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-brand-600 font-semibold group-hover:gap-3 transition-all">
                  Learn more <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-50">
        <div className="container-max text-center">
          <h2 className="mb-8">Ready to get started?</h2>
          <p className="text-lg text-brand-400 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="btn-secondary text-center">
              Call: (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
