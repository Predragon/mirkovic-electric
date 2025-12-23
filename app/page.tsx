import Link from 'next/link'
import Image from 'next/image'
import ParallaxCard from '@/components/ui/ParallaxCard'
import ParallaxHero from '@/components/ui/ParallaxHero'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems. Licensed Bay Area Electrician Since 1991.',
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Parallax */}
      <ParallaxHero
        imageSrc="/images/hero/ev-charging-hero.webp"
        imageAlt="Modern Electrical Solutions"
      >
        <div className="container-max relative z-10 py-16">
          <div className="max-w-2xl">
            <p className="text-accent-400 font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">
              Licensed Bay Area Electrician Since 1991
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Modern Electrical Solutions for Today's{' '}
              <span className="text-accent-400">High-Demand</span> Properties
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              EV charging, smart panels, load management, and expert PG&E coordination.
              Trusted by Bay Area homeowners for over 30 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact/"
                className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 text-center shadow-lg shadow-accent-500/30"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:(408)900-2672"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-bold text-lg transition-all text-center backdrop-blur-sm"
              >
                Call (408) 900-2672
              </a>
            </div>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 font-bold text-sm">C-10</span>
                </div>
                <span className="text-gray-300 text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 font-bold text-sm">30+</span>
                </div>
                <span className="text-gray-300 text-sm">Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 text-lg">★</span>
                </div>
                <span className="text-gray-300 text-sm">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* Our Services Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive electrical solutions for modern homes and businesses
            </p>
          </div>

          {/* Top row - 3 services with parallax */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <ParallaxCard
              href="/services/ev-charging/"
              imageSrc="/images/cards/ev-charging-full.webp"
              imageAlt="EV Charging Solutions"
              title="EV Charging Solutions"
              description="Level 2 chargers, load sharing & smart scheduling"
            />

            <ParallaxCard
              href="/services/load-management/"
              imageSrc="/images/cards/load-management-full.webp"
              imageAlt="Load Management"
              title="Load Management"
              description="Power planning & electrical capacity optimization"
            />

            <ParallaxCard
              href="/services/smart-panels/"
              imageSrc="/images/cards/smart-panels-full.webp"
              imageAlt="Smart Electrical Panels"
              title="Smart Electrical Panels"
              description="Span, Lumin & modern panel upgrades"
            />
          </div>

          {/* Bottom row - 2 services centered with parallax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ParallaxCard
              href="/services/permits-pge/"
              imageSrc="/images/cards/permits-pge-full.webp"
              imageAlt="Permits & PG&E Coordination"
              title="Permits & PG&E Coordination"
              description="Full permit handling & utility upgrades"
            />

            <ParallaxCard
              href="/services/audio-systems/"
              imageSrc="/images/cards/audio-systems-full.webp"
              imageAlt="Audiophile Audio Systems"
              title="Audiophile Audio Systems"
              description="Dedicated circuits & clean power solutions"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-navy-800 text-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        </div>

        <div className="container-max relative">
          <div className="text-center mb-12">
            <p className="text-accent-400 font-semibold mb-2 tracking-wide uppercase text-sm">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Mirkovic Electric</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-500/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-accent-400">C-10</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Licensed Contractor</h3>
              <p className="text-gray-400">California C-10 License #627414. Fully insured & bonded for your protection.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-500/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-accent-400">30+</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Years of Experience</h3>
              <p className="text-gray-400">Serving Bay Area homeowners since 1991 with expert electrical solutions.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-500/20 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Local Expertise</h3>
              <p className="text-gray-400">Deep knowledge of Bay Area codes, permitting, and PG&E coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas & CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">Coverage Area</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Proudly Serving the Bay Area</h2>
            <p className="text-gray-600 mb-6 text-lg">
              San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and surrounding communities.
            </p>

            {/* Map placeholder or service area tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {['San Jose', 'Palo Alto', 'Menlo Park', 'Cupertino', 'San Mateo', 'Mountain View', 'Sunnyvale', 'Los Altos'].map((city) => (
                <span key={city} className="px-4 py-2 bg-white rounded-full text-navy-700 text-sm font-medium shadow-sm">
                  {city}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact/"
                className="px-10 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-accent-500/30"
              >
                Get Your Free Quote
              </Link>
              <a
                href="tel:(408)900-2672"
                className="px-10 py-4 bg-navy-700 hover:bg-navy-800 text-white rounded-lg font-bold text-lg transition-colors"
              >
                Call: (408) 900-2672
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
