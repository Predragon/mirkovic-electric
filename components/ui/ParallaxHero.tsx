'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ParallaxHeroProps {
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
}

export default function ParallaxHero({ imageSrc, imageAlt, children }: ParallaxHeroProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Parallax: background moves at 50% of scroll speed
      const scrolled = window.scrollY
      setOffset(scrolled * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/80 to-navy-900/70" />

      {/* Content */}
      {children}
    </section>
  )
}
