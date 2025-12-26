'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-b from-navy-800 to-navy-700 shadow-lg sticky top-0 z-50">
      {/* Main Header Bar */}
      <div className="container-max py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo - Centered on mobile, left on desktop */}
          <Link href="/" className="flex flex-col items-center md:items-start flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/logo-full.webp"
              alt="Mirkovic Electric - Licensed Bay Area Electrician"
              width={400}
              height={80}
              className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto"
              priority
            />
            <span className="text-gray-400 text-xs sm:text-sm mt-1 hidden sm:block">
              Licensed Bay Area Electrician Since 1991
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact/"
              className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded font-bold text-sm transition-colors"
            >
              Request a Quote
            </Link>
            <span className="text-gray-500">|</span>
            <a
              href="tel:(408)900-2672"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-sm transition-colors"
            >
              Call or Text
            </a>
            <div className="ml-3 text-right">
              <p className="text-gray-400 text-xs">Call or Text:</p>
              <a href="tel:(408)900-2672" className="text-white font-bold text-lg hover:text-accent-400 transition-colors">
                (408) 900-2672
              </a>
            </div>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <Link
              href="/contact/"
              className="px-4 py-2 bg-accent-500 text-white rounded font-bold text-sm"
            >
              Quote
            </Link>
            <a
              href="tel:(408)900-2672"
              className="px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm"
            >
              Call
            </a>
          </div>

          {/* Mobile Menu Button - Absolute positioned */}
          <div className="md:hidden absolute left-4 top-4 flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <a
              href="tel:(408)900-2672"
              className="px-3 py-1.5 bg-accent-500 text-white rounded font-bold text-sm"
            >
              Call
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Outside nav, inside header */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-navy-800 border-t border-navy-600 shadow-xl">
          <div className="container-max py-4 flex flex-col gap-1">
            <Link
              href="/"
              className="text-gray-200 hover:text-white hover:bg-navy-700 py-3 px-4 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services/"
              className="text-gray-200 hover:text-white hover:bg-navy-700 py-3 px-4 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact/"
              className="text-gray-200 hover:text-white hover:bg-navy-700 py-3 px-4 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t border-navy-600 pt-4 mt-3 px-4">
              <a href="tel:(408)900-2672" className="block">
                <p className="text-accent-400 font-bold text-xl">(408) 900-2672</p>
                <p className="text-gray-400 text-sm">Tap to Call or Text</p>
              </a>
            </div>

            <Link
              href="/contact/"
              className="bg-accent-500 hover:bg-accent-600 text-white text-center py-4 rounded-lg font-bold mt-3 mx-4 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
