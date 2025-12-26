import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="container-max py-10 sm:py-16">
        {/* Mobile-first: Contact info prominent at top on mobile */}
        <div className="md:hidden mb-8 text-center pb-8 border-b border-navy-600">
          <a href="tel:(408)900-2672" className="block mb-3">
            <span className="text-accent-400 font-bold text-2xl">(408) 900-2672</span>
            <span className="block text-gray-400 text-sm mt-1">Tap to Call or Text</span>
          </a>
          <Link
            href="/contact/"
            className="inline-block px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo-full.webp"
                alt="Mirkovic Electric - Licensed Bay Area Electrician"
                width={200}
                height={45}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Modern Electrical Solutions for Today's High-Demand Properties
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Licensed Bay Area Electrical Contractor Since 1991
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/ev-charging/" className="text-gray-400 hover:text-white transition-colors">
                  EV Charging
                </Link>
              </li>
              <li>
                <Link href="/services/power-planning/" className="text-gray-400 hover:text-white transition-colors">
                  Power Planning
                </Link>
              </li>
              <li>
                <Link href="/services/service-upgrades/" className="text-gray-400 hover:text-white transition-colors">
                  Service Upgrades
                </Link>
              </li>
              <li>
                <Link href="/services/permits-pge/" className="text-gray-400 hover:text-white transition-colors">
                  Permits & PG&E
                </Link>
              </li>
              <li>
                <Link href="/services/audio-systems/" className="text-gray-400 hover:text-white transition-colors">
                  Audio Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400 text-sm uppercase tracking-wide">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services/" className="text-gray-400 hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Hidden on mobile (shown at top instead) */}
          <div className="hidden md:block">
            <h4 className="font-semibold mb-4 text-accent-400 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:(408)900-2672" className="text-white hover:text-accent-400 transition-colors font-semibold text-lg">
                  (408) 900-2672
                </a>
              </li>
              <li className="text-gray-400">
                Call or Text
              </li>
              <li className="text-gray-400 pt-2">
                <span className="text-white font-medium">C-10 License #627414</span>
                <br />
                Fully Insured & Bonded
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact/"
                className="inline-block px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded font-semibold text-sm transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* License info on mobile */}
        <div className="md:hidden text-center text-sm text-gray-400 mb-6 pb-6 border-b border-navy-600">
          <span className="text-white font-medium">C-10 License #627414</span> · Fully Insured & Bonded
        </div>

        <div className="border-t border-navy-600 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Mirkovic Electric. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Serving San Jose, Palo Alto, Menlo Park, Cupertino & Bay Area
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
