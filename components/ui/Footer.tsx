import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-600 text-white">
      <div className="container-max py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-brand-600 font-bold text-sm">ME</span>
              </div>
              <span className="font-bold">Mirkovic Electric</span>
            </div>
            <p className="text-brand-100 text-sm">
              Modern Electrical Solutions for Today's High-Demand Properties
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/ev-charging/" className="text-brand-100 hover:text-white transition-colors">
                  EV Charging & Load Sharing
                </Link>
              </li>
              <li>
                <Link href="/services/load-management/" className="text-brand-100 hover:text-white transition-colors">
                  Load Management & Power Planning
                </Link>
              </li>
              <li>
                <Link href="/services/smart-panels/" className="text-brand-100 hover:text-white transition-colors">
                  Smart Electrical Panels
                </Link>
              </li>
              <li>
                <Link href="/services/permits-pge/" className="text-brand-100 hover:text-white transition-colors">
                  Permits & PG&E Coordination
                </Link>
              </li>
              <li>
                <Link href="/services/audio-systems/" className="text-brand-100 hover:text-white transition-colors">
                  Audiophile Audio Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-brand-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services/" className="text-brand-100 hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-brand-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-brand-100">
                <a href="tel:(408)900-2672" className="hover:text-white transition-colors">
                  (408) 900-2672
                </a>
              </li>
              <li className="text-brand-100">Licensed C-10 Contractor #627414</li>
              <li className="text-brand-100 mt-4 text-xs">
                Service Areas: San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, Greater Bay Area
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-500 pt-8 text-center text-sm text-brand-100">
          <p>&copy; {new Date().getFullYear()} Mirkovic Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
