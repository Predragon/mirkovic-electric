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
  const [imageLoaded, setImageLoaded] = useState(false)

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
      {/* Skeleton loader */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-navy-800">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 animate-pulse" />
        </div>
      )}

      {/* Background Image with Parallax */}
      <div
        className={`absolute inset-0 w-full h-[120%] -top-[10%] transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translateY(${offset}px) translateZ(0)`,
          willChange: 'transform',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/80 to-navy-900/70" aria-hidden="true" />

      {/* Content */}
      {children}
    </section>
  )
}
