'use client'

import { useEffect, useState } from 'react'

// Holiday Snow Effect - Remove after holidays
export default function HolidaySnow() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Hide after animation completes (8 seconds)
    const timer = setTimeout(() => setShow(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {/* Generate 30 snowflakes/stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-80 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            fontSize: `${12 + Math.random() * 16}px`,
          }}
        >
          {i % 3 === 0 ? '❄' : i % 3 === 1 ? '✦' : '⭐'}
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  )
}
