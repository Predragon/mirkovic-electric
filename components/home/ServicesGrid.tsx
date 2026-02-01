import ParallaxCard from '@/components/ui/ParallaxCard'

interface ServiceImages {
  card1: string
  card2: string
  card3: string
  card4: string
  card5: string
  card6: string
}

interface ServicesGridProps {
  images: ServiceImages
}

export default function ServicesGrid({ images }: ServicesGridProps): JSX.Element {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive electrical solutions for modern homes and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          <ParallaxCard
            href="/services/general-electrical/"
            imageSrc={images.card1}
            imageAlt="Licensed Electrician Bay Area - Residential & Commercial Electrical Repairs San Jose"
            title="General Electrical Services"
            description="Troubleshooting, repairs, dedicated circuits & maintenance"
          />

          <ParallaxCard
            href="/services/power-planning/"
            imageSrc={images.card2}
            imageAlt="Smart Load Management Systems Bay Area - Electrical Panel Optimization Palo Alto"
            title="Power Planning & Smart Panels"
            description="Load management, smart panels & capacity optimization"
          />

          <ParallaxCard
            href="/services/service-upgrades/"
            imageSrc={images.card3}
            imageAlt="Electrical Panel Upgrade Service Bay Area - 200 Amp Panel Installation San Jose"
            title="Electrical Service Upgrades"
            description="Panel replacements & service capacity upgrades"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ParallaxCard
            href="/services/ev-charging/"
            imageSrc={images.card4}
            imageAlt="Tesla EV Charger Installation Bay Area - Level 2 Electric Vehicle Charging San Jose Palo Alto"
            title="EV Charging Solutions"
            description="Level 2 chargers, load sharing & smart scheduling"
          />

          <ParallaxCard
            href="/services/permits-pge/"
            imageSrc={images.card5}
            imageAlt="PG&E Electrical Permits Bay Area - Utility Coordination & Code Compliance San Jose"
            title="Permits & PG&E Coordination"
            description="Full permit handling & utility upgrades"
          />

          <ParallaxCard
            href="/services/audio-systems/"
            imageSrc={images.card6}
            imageAlt="Audiophile Electrical Systems Bay Area - Dedicated Audio Circuits Clean Power San Jose"
            title="Audiophile Audio Systems"
            description="Dedicated circuits & clean power solutions"
          />
        </div>
      </div>
    </section>
  )
}
