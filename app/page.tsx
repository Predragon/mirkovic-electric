import Link from 'next/link'
import Image from 'next/image'
import ParallaxCard from '@/components/ui/ParallaxCard'
import ParallaxHero from '@/components/ui/ParallaxHero'
import { getPageContent, getImageUrl, getContentStatus } from '@/lib/content'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems. Licensed Bay Area Electrician Since 1991.',
}

export default async function Home() {
  // Fetch page content from database
  const status = getContentStatus();
  const content = await getPageContent('homepage', status);

  // Define fallback images (defaults)
  const heroImage = getImageUrl(content, 'hero-background', '/images/hero/ev-charging-hero.webp');
  const card1Image = getImageUrl(content, 'card-1', '/images/cards/general-electrical-full.webp');
  const card2Image = getImageUrl(content, 'card-2', '/images/cards/load-management-full.webp');
  const card3Image = getImageUrl(content, 'card-3', '/images/cards/smart-panels-full.webp');
  const card4Image = getImageUrl(content, 'card-4', '/images/cards/ev-charging-full.webp');
  const card5Image = getImageUrl(content, 'card-5', '/images/cards/permits-pge-full.webp');
  const card6Image = getImageUrl(content, 'card-6', '/images/cards/audio-systems-full.webp');

  return (
    <div className="w-full">
      {/* Hero Section with Parallax */}
      <ParallaxHero
        imageSrc={heroImage}
        imageAlt="Professional EV Charger Installation Bay Area - Licensed Electrician San Jose"
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

          {/* Top row - 3 core services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <ParallaxCard
              href="/services/general-electrical/"
              imageSrc={card1Image}
              imageAlt="Licensed Electrician Bay Area - Residential & Commercial Electrical Repairs San Jose"
              title="General Electrical Services"
              description="Troubleshooting, repairs, dedicated circuits & maintenance"
            />

            <ParallaxCard
              href="/services/power-planning/"
              imageSrc={card2Image}
              imageAlt="Smart Load Management Systems Bay Area - Electrical Panel Optimization Palo Alto"
              title="Power Planning & Smart Panels"
              description="Load management, smart panels & capacity optimization"
            />

            <ParallaxCard
              href="/services/service-upgrades/"
              imageSrc={card3Image}
              imageAlt="Electrical Panel Upgrade Service Bay Area - 200 Amp Panel Installation San Jose"
              title="Electrical Service Upgrades"
              description="Panel replacements & service capacity upgrades"
            />
          </div>

          {/* Bottom row - 3 specialized services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ParallaxCard
              href="/services/ev-charging/"
              imageSrc={card4Image}
              imageAlt="Tesla EV Charger Installation Bay Area - Level 2 Electric Vehicle Charging San Jose Palo Alto"
              title="EV Charging Solutions"
              description="Level 2 chargers, load sharing & smart scheduling"
            />

            <ParallaxCard
              href="/services/permits-pge/"
              imageSrc={card5Image}
              imageAlt="PG&E Electrical Permits Bay Area - Utility Coordination & Code Compliance San Jose"
              title="Permits & PG&E Coordination"
              description="Full permit handling & utility upgrades"
            />

            <ParallaxCard
              href="/services/audio-systems/"
              imageSrc={card6Image}
              imageAlt="Audiophile Electrical Systems Bay Area - Dedicated Audio Circuits Clean Power San Jose"
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

      {/* Google Reviews / Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">Customer Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-semibold">5.0 out of 5</span>
            </div>
            <p className="text-gray-500">Based on 24 Google reviews</p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {/* Review 1 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Lenny was very thorough and caught issues that other electricians missed. His communication was excellent throughout the entire process. Highly recommend!"
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-navy-700">Sarah M.</p>
                  <p className="text-sm text-gray-500">Palo Alto</p>
                </div>
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Excellent work on our EV charger installation. Completed on time and under budget. Mirkovic Electric charged $900 compared to $3,000 from another contractor for the same job!"
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-navy-700">Michael T.</p>
                  <p className="text-sm text-gray-500">San Jose</p>
                </div>
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Very organized and thorough. Lenny doesn't cut corners and does things the right way. He worked professionally with the city inspector to ensure everything was done correctly."
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-navy-700">Jennifer L.</p>
                  <p className="text-sm text-gray-500">Menlo Park</p>
                </div>
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* CTA to see all reviews on Google */}
          <div className="text-center">
            <a
              href="https://g.page/r/CSx7SMmOvAtIEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 hover:border-accent-500 rounded-lg font-semibold text-gray-700 hover:text-accent-600 transition-all hover:shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              See All 24 Reviews on Google
            </a>
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
