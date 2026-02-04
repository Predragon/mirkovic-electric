import { HeroBackground } from './HeroBackground'

interface ParallaxHeroProps {
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
}

// Server component wrapper - renders immediately without waiting for hydration
export default function ParallaxHero({ imageSrc, imageAlt, children }: ParallaxHeroProps) {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-navy-800">
      {/* Background Image - client component for parallax effect */}
      <HeroBackground imageSrc={imageSrc} imageAlt={imageAlt} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/80 to-navy-900/70" aria-hidden="true" />

      {/* Content */}
      {children}
    </section>
  )
}
