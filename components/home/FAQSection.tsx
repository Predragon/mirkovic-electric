import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Do you install EV chargers in the Bay Area?",
    answer: "Yes, we specialize in EV charging installations throughout San Jose, Palo Alto, Menlo Park, and surrounding Bay Area cities. We handle everything from permits to PG&E coordination."
  },
  {
    question: "Are you a licensed electrical contractor?",
    answer: "Yes, Mirkovic Electric is a licensed C-10 electrical contractor (License #627414) serving the Bay Area since 1991 with over 30 years of experience."
  },
  {
    question: "What is load management for electrical systems?",
    answer: "Load management optimizes your electrical capacity to handle high-demand appliances like EV chargers without requiring expensive panel upgrades. We install smart systems that intelligently distribute power."
  },
  {
    question: "Do you handle PG&E permits and coordination?",
    answer: "Yes, we manage all PG&E paperwork, permits, and coordination for your electrical projects. We ensure code compliance and handle all utility requirements."
  }
]

function FAQAccordionItem({ question, answer }: FAQItem): JSX.Element {
  return (
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 transition-colors">
        <h3 className="text-lg font-semibold text-navy-800 pr-8">
          {question}
        </h3>
        <span className="text-accent-500 font-bold text-2xl group-open:rotate-45 transition-transform">
          +
        </span>
      </summary>
      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
        {answer}
      </div>
    </details>
  )
}

export default function FAQSection(): JSX.Element {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Quick answers to common questions about our electrical services
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <FAQAccordionItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link
            href="/contact/"
            className="inline-block px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
