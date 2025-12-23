'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy-700 shadow-lg">
      <nav className="container-max flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Mirkovic Electric"
            width={50}
            height={50}
            className="rounded"
          />
          <div className="hidden sm:block">
            <span className="font-bold text-white text-lg">Mirkovic</span>
            <span className="font-light text-gray-300 text-lg ml-1">ELECTRIC</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-200 hover:text-white transition-colors font-medium">
            Home
          </Link>
          <Link href="/services/" className="text-gray-200 hover:text-white transition-colors font-medium">
            Services
          </Link>
          <Link href="/contact/" className="text-gray-200 hover:text-white transition-colors font-medium">
            Contact
          </Link>
          <div className="flex items-center gap-3 ml-4">
            <Link
              href="/contact/"
              className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded font-semibold transition-colors text-sm"
            >
              Request a Quote
            </Link>
            <a
              href="tel:(408)900-2672"
              className="px-4 py-2 border border-gray-400 hover:border-white text-white rounded font-semibold transition-colors text-sm"
            >
              (408) 900-2672
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:(408)900-2672"
            className="px-3 py-1.5 bg-accent-500 text-white rounded font-semibold text-sm"
          >
            Call
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-navy-800 border-t border-navy-600 md:hidden shadow-xl">
            <div className="container-max py-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services/"
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact/"
                className="text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:(408)900-2672"
                className="text-accent-400 font-semibold py-2"
                onClick={() => setIsOpen(false)}
              >
                Call: (408) 900-2672
              </a>
              <Link
                href="/contact/"
                className="bg-accent-500 text-white text-center py-3 rounded font-semibold mt-2"
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
