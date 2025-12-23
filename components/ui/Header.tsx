'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-b from-navy-800 to-navy-700 shadow-lg">
      <nav className="container-max flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-full.png"
            alt="Mirkovic Electric - Licensed Bay Area Electrician"
            width={280}
            height={60}
            className="h-12 md:h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact/"
            className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded font-bold text-sm transition-colors"
          >
            Request a Quote
          </Link>
          <span className="text-gray-400">|</span>
          <a
            href="tel:(408)900-2672"
            className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded font-bold text-sm transition-colors"
          >
            Call or Text
          </a>
          <div className="ml-2 text-right">
            <p className="text-gray-400 text-xs">Call or Text:</p>
            <a href="tel:(408)900-2672" className="text-white font-bold hover:text-accent-400 transition-colors">
              (408) 900-2672
            </a>
          </div>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <Link
            href="/contact/"
            className="px-3 py-2 bg-accent-500 text-white rounded font-bold text-sm"
          >
            Quote
          </Link>
          <a
            href="tel:(408)900-2672"
            className="px-3 py-2 bg-accent-500 text-white rounded font-bold text-sm"
          >
            Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="tel:(408)900-2672"
            className="px-3 py-1.5 bg-accent-500 text-white rounded font-bold text-sm"
          >
            Call
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-navy-800 border-t border-navy-600 md:hidden shadow-xl z-50">
            <div className="container-max py-4 flex flex-col gap-3">
              <Link href="/" className="text-gray-200 hover:text-white py-2" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/services/" className="text-gray-200 hover:text-white py-2" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/contact/" className="text-gray-200 hover:text-white py-2" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <div className="border-t border-navy-600 pt-3 mt-2">
                <p className="text-accent-400 font-bold text-lg">(408) 900-2672</p>
                <p className="text-gray-400 text-sm">Call or Text</p>
              </div>
              <Link
                href="/contact/"
                className="bg-accent-500 text-white text-center py-3 rounded font-bold mt-2"
                onClick={() => setIsOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
