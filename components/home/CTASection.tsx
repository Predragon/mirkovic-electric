import Link from 'next/link'

const serviceAreas = [
  'San Jose',
  'Palo Alto',
  'Menlo Park',
  'Cupertino',
  'San Mateo',
  'Mountain View',
  'Sunnyvale',
  'Los Altos'
]

export default function CTASection(): JSX.Element {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">Coverage Area</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Proudly Serving the Bay Area</h2>
          <p className="text-gray-600 mb-6 text-lg">
            San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and surrounding communities.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {serviceAreas.map((city) => (
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
  )
}
