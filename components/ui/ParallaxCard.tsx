'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ParallaxCardProps {
  href: string
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}

export default function ParallaxCard({ href, imageSrc, imageAlt, title, description }: ParallaxCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only calculate when card is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how far through the viewport the card is (-1 to 1)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
        // Convert to parallax offset (-30 to 30 pixels)
        const parallaxOffset = (progress - 0.5) * 60
        setOffset(parallaxOffset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link ref={cardRef} href={href} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden">
          <div
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{
              transform: `translateY(${offset}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" aria-hidden="true" />
        </div>
        <div className="p-5 text-center">
          <h3 className="font-bold text-navy-800 text-xl group-hover:text-accent-500 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}
