import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems. Licensed Bay Area Electrician Since 1991.',
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Full width image from mockup */}
      <section className="relative">
        <Image
          src="/images/hero-section.jpg"
          alt="Modern Electrical Solutions for Today's High-Demand Properties - EV Charging, Smart Panels, Load Management"
          width={1536}
          height={430}
          className="w-full h-auto"
          priority
        />
        {/* Clickable overlay areas for the buttons */}
        <Link
          href="/contact/"
          className="absolute bottom-[15%] left-[32%] w-[14%] h-[12%] z-10"
          aria-label="Get a Quote"
        />
        <a
          href="tel:(408)900-2672"
          className="absolute bottom-[15%] left-[48%] w-[14%] h-[12%] z-10"
          aria-label="Book Service - Call (408) 900-2672"
        />
      </section>

      {/* Our Services Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-gray-300 w-16 md:w-24"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-800">Our Services</h2>
              <div className="h-px bg-gray-300 w-16 md:w-24"></div>
            </div>
            <p className="text-gray-600 text-lg">Experienced & Reliable Electrical Contracting</p>
          </div>

          {/* Top row - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
            <Link href="/services/ev-charging/" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/cards/ev-charging-full.png"
                    alt="EV Charging Solutions"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-bold text-navy-800 text-lg group-hover:text-accent-500 transition-colors">
                    EV Charging Solutions
                  </h3>
                </div>
              </div>
            </Link>

            <Link href="/services/load-management/" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/cards/load-management-full.png"
                    alt="Load Management"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-bold text-navy-800 text-lg group-hover:text-accent-500 transition-colors">
                    Load Management
                  </h3>
                </div>
              </div>
            </Link>

            <Link href="/services/smart-panels/" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/cards/smart-panels-full.png"
                    alt="Smart Electrical Panels"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-bold text-navy-800 text-lg group-hover:text-accent-500 transition-colors">
                    Smart Electrical Panels
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom row - 2 services centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/services/permits-pge/" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/cards/permits-pge-full.png"
                    alt="Permits & PG&E Coordination"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-bold text-navy-800 text-lg group-hover:text-accent-500 transition-colors">
                    Permits & PG&E Coordination
                  </h3>
                </div>
              </div>
            </Link>

            <Link href="/services/audio-systems/" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/cards/audio-systems-full.png"
                    alt="Audiophile Audio Systems"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-bold text-navy-800 text-lg group-hover:text-accent-500 transition-colors">
                    Audiophile Audio Systems
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-navy-700 text-white">
        <div className="container-max">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Choose Mirkovic Electric</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">C-10</div>
              <p className="font-semibold text-lg mb-1">Licensed Contractor</p>
              <p className="text-gray-300 text-sm">California C-10 License #627414<br/>Fully Insured & Bonded</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-semibold text-lg mb-1">Since 1991</p>
              <p className="text-gray-300 text-sm">30+ Years of Experience<br/>Trusted Bay Area Electrician</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <p className="font-semibold text-lg mb-1">Local Expertise</p>
              <p className="text-gray-300 text-sm">Bay Area Permitting & Codes<br/>PG&E Coordination Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas & CTA */}
      <section className="py-12 bg-gray-100">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">Service Areas</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Proudly serving San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and the greater Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded font-bold text-lg transition-colors"
            >
              Get a Quote
            </Link>
            <a
              href="tel:(408)900-2672"
              className="px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white rounded font-bold text-lg transition-colors"
            >
              Call: (408) 900-2672
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
