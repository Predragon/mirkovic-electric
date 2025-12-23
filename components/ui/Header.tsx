'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-100">
      <nav className="container-max flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">ME</span>
          </div>
          <span className="font-bold text-brand-600 hidden sm:inline">Mirkovic Electric</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-brand-600 hover:text-brand-700 transition-colors">
            Home
          </Link>
          <Link href="/services/" className="text-brand-600 hover:text-brand-700 transition-colors">
            Services
          </Link>
          <Link href="/contact/" className="btn-primary">
            Contact
          </Link>
          <a href="tel:(408)900-2672" className="text-brand-600 hover:text-brand-700 font-medium">
            (408) 900-2672
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-brand-100 md:hidden">
            <div className="container-max py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-brand-600 hover:text-brand-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services/"
                className="text-brand-600 hover:text-brand-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <a
                href="tel:(408)900-2672"
                className="text-brand-600 hover:text-brand-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Call: (408) 900-2672
              </a>
              <Link
                href="/contact/"
                className="btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
