import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Mirkovic Electric | Bay Area Electrical Contractor',
  description: 'Licensed Bay Area electrical contractor specializing in EV charging, load management, smart panels, utility coordination, and high-performance audio systems.',
  openGraph: {
    title: 'Mirkovic Electric | Bay Area Electrical Contractor',
    description: 'Licensed Bay Area electrical contractor specializing in EV charging, load management, smart panels, utility coordination, and high-performance audio systems.',
    type: 'website',
  },
  other: {
    'local-business': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Mirkovic Electric',
      'image': '/images/logo.png',
      'description': 'Modern Electrical Solutions for Today\'s High-Demand Properties',
      'telephone': '(408) 900-2672',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'CA',
        'addressCountry': 'US',
      },
      'areaServed': ['San Jose', 'Palo Alto', 'Menlo Park', 'Cupertino', 'San Mateo', 'Bay Area'],
      'priceRange': '$$',
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              'name': 'Mirkovic Electric',
              'image': '/images/logo.png',
              'description': 'Modern Electrical Solutions for Today\'s High-Demand Properties',
              'telephone': '(408) 900-2672',
              'address': {
                '@type': 'PostalAddress',
                'addressRegion': 'CA',
                'addressCountry': 'US',
              },
              'areaServed': ['San Jose', 'Palo Alto', 'Menlo Park', 'Cupertino', 'San Mateo', 'Bay Area'],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-brand-500">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
