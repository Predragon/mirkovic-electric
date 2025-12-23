import Link from 'next/link'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems.',
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max text-center">
          <h1 className="mb-6">Electrical Work Designed for Today's High-Demand Properties</h1>
          <p className="text-xl text-brand-400 mb-8 max-w-2xl mx-auto">
            Homes, commercial spaces, and mixed-use properties require more than basic electrical service. EV chargers, heat pumps, solar, smart panels, and networked systems demand careful planning, code compliance, and coordination with utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Request a Quote
            </Link>
            <a href="tel:(408)900-2672" className="btn-secondary text-center">
              Call: (408) 900-2672
            </a>
          </div>
          <p className="text-sm text-brand-300 mt-6">
            Licensed California C-10 Electrical Contractor (#627414)
          </p>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-center mb-12">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'EV Charging & Load Management',
                description: 'Tesla and universal EV chargers, dynamic load management, service capacity evaluation and optimization.',
                href: '/services/ev-charging/',
              },
              {
                title: 'Smart Electrical Panels & Energy Monitoring',
                description: 'SPAN smart panels, circuit-level monitoring, EV, solar, and battery integration.',
                href: '/services/smart-panels/',
              },
              {
                title: 'Permits & PG&E Coordination',
                description: 'Permit applications, PG&E service coordination, load calculations, and inspection support.',
                href: '/services/permits-pge/',
              },
              {
                title: 'Load Management & Power Planning',
                description: 'Electrical capacity planning for properties with increasing power demands.',
                href: '/services/load-management/',
              },
              {
                title: 'Panel Upgrades & Electrical Infrastructure',
                description: 'Main panels, sub-panels, service relocations, dedicated circuits, remodel and addition support.',
                href: '/services/',
              },
              {
                title: 'Audiophile Audio Systems',
                description: 'Reference-grade speaker wiring, bit-perfect multi-room audio endpoints, wired and wireless network design.',
                href: '/services/audio-systems/',
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="p-6 border border-brand-100 rounded-lg hover:border-brand-300 hover:shadow-lg transition-all group"
              >
                <h3 className="text-lg font-semibold mb-3 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-400 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services/" className="text-brand-600 font-semibold hover:text-brand-700">
              Explore all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding bg-brand-50">
        <div className="container-max">
          <h2 className="text-center mb-12">Why Work With Mirkovic Electric</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-3">C-10</div>
              <p className="text-brand-600 font-semibold mb-2">Licensed Contractor</p>
              <p className="text-brand-400 text-sm">California C-10 Electrical License #627414. Fully insured and bonded.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-3">🔧</div>
              <p className="text-brand-600 font-semibold mb-2">Design-Driven Approach</p>
              <p className="text-brand-400 text-sm">We plan electrical systems around your goals, not the other way around.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-3">📍</div>
              <p className="text-brand-600 font-semibold mb-2">Bay Area Expertise</p>
              <p className="text-brand-400 text-sm">Deep experience with Bay Area permitting, codes, and utility coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="mb-8">Service Areas</h2>
          <p className="text-lg text-brand-400 mb-6">
            Serving San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and the greater Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="btn-primary text-center">
              Get Started Today
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
