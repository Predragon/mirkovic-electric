import Link from 'next/link'

export const metadata = {
  title: 'Electrical Services | Mirkovic Electric',
  description: 'Systems-level electrical contractor in the Bay Area: general electrical & infrastructure, power planning, service upgrades, EV charging, permits & PG&E coordination, and audiophile systems.',
  openGraph: {
    title: 'Electrical Services | Mirkovic Electric',
    description: 'Planning-first electrical solutions: general electrical, power planning, service upgrades, EV charging, permits, and audio systems.',
    url: 'https://landing.mirkovicelectric.com/services/',
  },
  alternates: {
    canonical: 'https://landing.mirkovicelectric.com/services/',
  },
}

export default function Services() {
  const services = [
    {
      title: 'General Electrical & Infrastructure',
      description: 'Professional troubleshooting, repairs, dedicated circuits, and infrastructure improvements—executed cleanly, safely, and to code.',
      href: '/services/general-electrical/',
    },
    {
      title: 'Power Planning, Load Management & Smart Panels',
      description: 'Advanced planning and smart panel solutions for EVs, remodels, solar, and modern high-demand electrical systems.',
      href: '/services/power-planning/',
    },
    {
      title: 'Electrical Service Upgrades',
      description: 'Service and panel upgrades designed to safely support increased electrical demand and future electrification.',
      href: '/services/service-upgrades/',
    },
    {
      title: 'EV Charging & Load Sharing',
      description: 'Residential and commercial EV charging solutions with proper load calculations, smart load sharing, and permit-ready installations.',
      href: '/services/ev-charging/',
    },
    {
      title: 'Permits & PG&E Coordination',
      description: 'End-to-end permitting and PG&E coordination for service upgrades, EV charging, and capacity-related electrical work.',
      href: '/services/permits-pge/',
    },
    {
      title: 'Audiophile Audio Systems & Networked Playback',
      description: 'Electrical and infrastructure support for high-performance, low-noise audio systems and dedicated listening spaces.',
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
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Modern electrical solutions for residential and commercial properties—planned, permitted, and built to support today's higher electrical demands.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Our work is grounded in code compliance, clean execution, and long-term reliability. Whether you need core electrical infrastructure, advanced power planning, or specialty systems, we approach every project with the same planning-first mindset.
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
          <h2 className="mb-6 text-white">Not Sure Where to Start?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            If you're planning an upgrade or adding new electrical loads, we can help you determine the safest and most efficient path forward. Most projects benefit from starting with power planning to avoid unnecessary upgrades and ensure long-term reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-colors text-center">
              Call/Text: (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
