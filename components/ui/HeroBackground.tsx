'use client'

import { useEffect, useState } from 'react'

interface HeroBackgroundProps {
  imageSrc: string
  imageAlt: string
}

// Derive mobile image URL by adding -mobile before extension
function getMobileImageSrc(src: string): string {
  const lastDot = src.lastIndexOf('.')
  if (lastDot === -1) return src
  return src.slice(0, lastDot) + '-mobile' + src.slice(lastDot)
}

export function HeroBackground({ imageSrc, imageAlt }: HeroBackgroundProps) {
  const [offset, setOffset] = useState(0)
  const mobileSrc = getMobileImageSrc(imageSrc)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="absolute inset-0 w-full h-[120%] -top-[10%]"
      style={{
        transform: `translateY(${offset}px) translateZ(0)`,
        willChange: offset > 0 ? 'transform' : 'auto',
      }}
    >
      <picture>
        <source media="(max-width: 768px)" srcSet={mobileSrc} />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      </picture>
    </div>
  )
}
