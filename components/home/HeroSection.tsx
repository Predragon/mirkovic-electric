import Link from 'next/link'
import ParallaxHero from '@/components/ui/ParallaxHero'

interface HeroSectionProps {
  imageSrc: string
}

export default function HeroSection({ imageSrc }: HeroSectionProps): JSX.Element {
  return (
    <ParallaxHero
      imageSrc={imageSrc}
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
        </div>
      </div>
    </ParallaxHero>
  )
}
