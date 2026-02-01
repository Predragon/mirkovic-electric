export default function WhyChooseUs(): JSX.Element {
  return (
    <section className="py-16 bg-navy-800 text-white relative overflow-hidden">
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
  )
}
