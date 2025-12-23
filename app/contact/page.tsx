import ContactForm from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contact & Request a Quote | Mirkovic Electric',
  description: 'Get in touch with Mirkovic Electric. Contact us via phone, email, or our inquiry form to discuss your electrical project.',
}

export default function Contact() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max text-center">
          <h1 className="mb-6">Let's Discuss Your Project</h1>
          <p className="text-xl text-brand-400 max-w-2xl mx-auto">
            Whether you're planning an EV charging installation, load management upgrade, smart panel deployment, or specialty audio system, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8">Get in Touch</h2>

              <div className="mb-8">
                <h3 className="font-semibold text-brand-600 mb-2">Phone</h3>
                <a
                  href="tel:(408)900-2672"
                  className="text-lg text-brand-500 hover:text-brand-600 font-semibold"
                >
                  (408) 900-2672
                </a>
                <p className="text-brand-400 text-sm mt-2">Call or text Monday–Friday, 8am–6pm PT</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-brand-600 mb-2">Service Areas</h3>
                <p className="text-brand-500">
                  San Jose, Palo Alto, Menlo Park, Cupertino, San Mateo, and the greater Bay Area
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-brand-600 mb-2">Licensing & Insurance</h3>
                <p className="text-brand-500">
                  Licensed California C-10 Electrical Contractor #627414. Fully insured and bonded.
                </p>
              </div>

              <div className="p-6 bg-brand-50 rounded-lg">
                <h3 className="font-semibold text-brand-600 mb-3">What to Expect</h3>
                <ul className="space-y-2 text-brand-500 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Initial consultation to understand your goals</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Feasibility assessment and planning recommendations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Detailed estimate with timeline</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Full project coordination and support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <h2 className="mb-8">Request a Quote</h2>
              <div className="bg-white border-2 border-brand-100 rounded-lg p-8">
                <p className="text-brand-500 mb-6">
                  Fill out the form below and we'll get back to you within 24 business hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-brand-50">
        <div className="container-max text-center">
          <h2 className="mb-12">Why Clients Trust Mirkovic Electric</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-4">C-10</p>
              <p className="font-semibold text-brand-600 mb-2">Licensed & Insured</p>
              <p className="text-brand-400 text-sm">California C-10 Contractor #627414, fully bonded and insured.</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-4">24hrs</p>
              <p className="font-semibold text-brand-600 mb-2">Fast Response</p>
              <p className="text-brand-400 text-sm">We respond to quotes and inquiries within 24 business hours.</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-4">Bay Area</p>
              <p className="font-semibold text-brand-600 mb-2">Local Expertise</p>
              <p className="text-brand-400 text-sm">Deep knowledge of permitting, codes, and utilities in the Bay Area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="mb-8">Prefer to Talk First?</h2>
          <p className="text-lg text-brand-400 mb-8 max-w-2xl mx-auto">
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
