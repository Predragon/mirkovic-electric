import GoHighLevelForm from '@/components/forms/GoHighLevelForm'

export const metadata = {
  title: 'Contact & Request a Quote',
  description: 'Contact Mirkovic Electric for a free quote. Call (408) 900-2672 or fill out our form. Licensed Bay Area electrician serving San Jose, Palo Alto, Menlo Park, Cupertino.',
  openGraph: {
    title: 'Contact & Request a Quote | Mirkovic Electric',
    description: 'Get in touch with Mirkovic Electric. Call (408) 900-2672 for a free quote on EV charging, smart panels, and electrical services.',
    url: 'https://mirkovicelectric.com/contact/',
  },
  alternates: {
    canonical: 'https://mirkovicelectric.com/contact/',
  },
}

export default function Contact() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero/contact-hero.webp')` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/85 to-navy-900/90" />

        {/* Content */}
        <div className="relative z-10 container-max py-16 sm:py-20 text-center text-white">
          <p className="text-accent-400 font-semibold mb-2 tracking-wide uppercase text-sm">Get in Touch</p>
          <h1 className="mb-6 text-white">Let's Discuss Your Project</h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Whether you're planning an EV charging installation, load management upgrade, smart panel deployment, or specialty audio system, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6 sm:mb-8">Get in Touch</h2>

              {/* Mobile: Prominent call button */}
              <div className="lg:hidden mb-8 p-6 bg-accent-50 rounded-xl border border-accent-200">
                <a
                  href="tel:(408)900-2672"
                  className="block text-center"
                >
                  <span className="text-accent-500 font-bold text-2xl block">(408) 900-2672</span>
                  <span className="text-accent-600 text-sm">Tap to Call or Text</span>
                </a>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-navy-700 mb-2 text-lg">Phone</h3>
                <a
                  href="tel:(408)900-2672"
                  className="text-lg text-accent-500 hover:text-accent-600 font-semibold"
                >
                  (408) 900-2672
                </a>
                <p className="text-gray-500 text-sm mt-2">Call or text Monday–Friday, 8am–6pm PT</p>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-navy-700 mb-2 text-lg">Service Areas</h3>
                <p className="text-gray-600">
                  San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and the greater Bay Area
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-navy-700 mb-2 text-lg">Licensing & Insurance</h3>
                <p className="text-gray-600">
                  Licensed California C-10 Electrical Contractor #627414. Fully insured and bonded.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-navy-700 mb-3 text-lg">What to Expect</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold" aria-hidden="true">✓</span>
                    <span>Initial consultation to understand your goals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold" aria-hidden="true">✓</span>
                    <span>Feasibility assessment and planning recommendations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold" aria-hidden="true">✓</span>
                    <span>Detailed estimate with timeline</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold" aria-hidden="true">✓</span>
                    <span>Full project coordination and support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <h2 className="mb-6 sm:mb-8">Request a Quote</h2>
              <div className="bg-white border-2 border-gray-100 rounded-xl p-5 sm:p-8 shadow-lg">
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you within 24 business hours.
                </p>
                <GoHighLevelForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <h2 className="mb-8 sm:mb-12 text-white">Why Clients Trust Mirkovic Electric</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-bold text-accent-400 mb-3">C-10</p>
              <p className="font-semibold text-white mb-2">Licensed & Insured</p>
              <p className="text-gray-400 text-sm">California C-10 Contractor #627414, fully bonded and insured.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-bold text-accent-400 mb-3">24hrs</p>
              <p className="font-semibold text-white mb-2">Fast Response</p>
              <p className="text-gray-400 text-sm">We respond to quotes and inquiries within 24 business hours.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-bold text-accent-400 mb-3">30+</p>
              <p className="font-semibold text-white mb-2">Years Experience</p>
              <p className="text-gray-400 text-sm">Deep knowledge of permitting, codes, and utilities in the Bay Area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max text-center">
          <h2 className="mb-6">Prefer to Talk First?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Give us a call and we'll discuss your project over the phone.
          </p>
          <a href="tel:(408)900-2672" className="btn-primary text-center inline-block">
            Call (408) 900-2672
          </a>
        </div>
      </section>
    </div>
  )
}
