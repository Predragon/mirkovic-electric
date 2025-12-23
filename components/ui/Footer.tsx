import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="container-max py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Mirkovic Electric"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <span className="font-bold text-white">Mirkovic</span>
                <span className="font-light text-gray-400 ml-1">ELECTRIC</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Modern Electrical Solutions for Today's High-Demand Properties
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Licensed Bay Area Electrical Contractor Since 1991
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/ev-charging/" className="text-gray-400 hover:text-white transition-colors">
                  EV Charging & Load Sharing
                </Link>
              </li>
              <li>
                <Link href="/services/load-management/" className="text-gray-400 hover:text-white transition-colors">
                  Load Management & Power Planning
                </Link>
              </li>
              <li>
                <Link href="/services/smart-panels/" className="text-gray-400 hover:text-white transition-colors">
                  Smart Electrical Panels
                </Link>
              </li>
              <li>
                <Link href="/services/permits-pge/" className="text-gray-400 hover:text-white transition-colors">
                  Permits & PG&E Coordination
                </Link>
              </li>
              <li>
                <Link href="/services/audio-systems/" className="text-gray-400 hover:text-white transition-colors">
                  Audiophile Audio Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Quick Links</h4>
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
                  Contact / Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Contact</h4>
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

        <div className="border-t border-navy-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Mirkovic Electric. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Service Areas: San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, Greater Bay Area
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
