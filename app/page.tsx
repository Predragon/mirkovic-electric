import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems.',
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Background */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Modern electrical solutions"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-navy-900/70" />
        </div>

        <div className="container-max relative z-10 py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Modern Electrical Solutions
          </h1>
          <p className="text-2xl md:text-3xl text-accent-400 font-semibold mb-6">
            for Today's High-Demand Properties
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-3xl mx-auto">
            EV Charging | Smart Panels | Load Management | Permits & PG&E Coordination | Audiophile Systems
          </p>
          <p className="text-sm text-gray-300 mb-8">
            Licensed Bay Area Electrical Contractor Since 1991
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Get a Quote
            </Link>
            <a
              href="tel:(408)900-2672"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Call or Text
            </a>
          </div>
          <p className="text-gray-300 mt-6 text-sm">
            Call or Text: <a href="tel:(408)900-2672" className="font-semibold hover:text-accent-400">(408) 900-2672</a>
          </p>
        </div>
      </section>

      {/* Service Icons Bar */}
      <section className="bg-gray-100 py-8 border-b border-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Link href="/services/ev-charging/" className="group">
              <div className="text-4xl mb-2">⚡</div>
              <p className="font-semibold text-navy-600 group-hover:text-accent-500 transition-colors">EV Charging Solutions</p>
            </Link>
            <Link href="/services/smart-panels/" className="group">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-semibold text-navy-600 group-hover:text-accent-500 transition-colors">Smart Electrical Panels</p>
            </Link>
            <Link href="/services/permits-pge/" className="group">
              <div className="text-4xl mb-2">📋</div>
              <p className="font-semibold text-navy-600 group-hover:text-accent-500 transition-colors">Permits & PG&E Coordination</p>
            </Link>
            <Link href="/services/audio-systems/" className="group">
              <div className="text-4xl mb-2">🔊</div>
              <p className="font-semibold text-navy-600 group-hover:text-accent-500 transition-colors">Audiophile Systems</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">Our Services</h2>
            <p className="text-xl text-brand-400">Experienced & Reliable Electrical Contracting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'EV Charging & Load Management',
                description: 'Tesla and universal EV chargers, dynamic load management, service capacity evaluation and optimization.',
                href: '/services/ev-charging/',
                image: '/images/services/ev-charging.png',
              },
              {
                title: 'Smart Electrical Panels',
                description: 'SPAN smart panels, circuit-level monitoring, EV, solar, and battery integration.',
                href: '/services/smart-panels/',
                image: '/images/services/smart-panels.png',
              },
              {
                title: 'Permits & PG&E Coordination',
                description: 'Permit applications, PG&E service coordination, load calculations, and inspection support.',
                href: '/services/permits-pge/',
                image: '/images/services/permits-pge.png',
              },
              {
                title: 'Load Management & Power Planning',
                description: 'Electrical capacity planning for properties with increasing power demands.',
                href: '/services/load-management/',
                image: '/images/services/load-management.png',
              },
              {
                title: 'Audiophile Audio Systems',
                description: 'Reference-grade speaker wiring, bit-perfect multi-room audio, custom network design.',
                href: '/services/audio-systems/',
                image: '/images/services/audio-systems.png',
              },
              {
                title: 'Panel Upgrades & Infrastructure',
                description: 'Main panels, sub-panels, service relocations, dedicated circuits, remodel support.',
                href: '/services/',
                image: '/images/services/smart-panels.png',
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-700 mb-2 group-hover:text-accent-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-400 text-sm">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services/" className="text-accent-500 font-semibold hover:text-accent-600 text-lg">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding bg-navy-600 text-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Work With Mirkovic Electric</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-400 mb-3">C-10</div>
              <p className="font-semibold text-xl mb-2">Licensed Contractor</p>
              <p className="text-gray-300 text-sm">California C-10 Electrical License #627414. Fully insured and bonded.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🔧</div>
              <p className="font-semibold text-xl mb-2">Design-Driven Approach</p>
              <p className="text-gray-300 text-sm">We plan electrical systems around your goals, not the other way around.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">📍</div>
              <p className="font-semibold text-xl mb-2">Bay Area Expertise</p>
              <p className="text-gray-300 text-sm">Deep experience with Bay Area permitting, codes, and utility coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas & CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">Service Areas</h2>
          <p className="text-lg text-brand-400 mb-8 max-w-2xl mx-auto">
            Serving San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and the greater Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-lg transition-colors">
              Get Started Today
            </Link>
            <a href="tel:(408)900-2672" className="px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-bold text-lg transition-colors">
              (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
