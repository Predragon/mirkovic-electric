import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://mirkovicelectric.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
    template: '%s | Mirkovic Electric',
  },
  description: 'Licensed Bay Area electrical contractor since 1991. Specializing in EV charging, load management, smart panels, PG&E coordination, and audiophile audio systems. C-10 License #627414.',
  keywords: ['electrician', 'Bay Area', 'San Jose', 'EV charging', 'electrical contractor', 'smart panels', 'load management', 'PG&E coordination', 'Palo Alto', 'Menlo Park', 'Cupertino'],
  authors: [{ name: 'Mirkovic Electric' }],
  creator: 'Mirkovic Electric',
  publisher: 'Mirkovic Electric',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
    description: 'Modern electrical solutions for high-demand properties. EV charging, smart panels, load management. Licensed C-10 contractor since 1991.',
    url: siteUrl,
    siteName: 'Mirkovic Electric',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mirkovic Electric - Bay Area Electrical Contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirkovic Electric | Bay Area Electrical Contractor',
    description: 'Licensed electrical contractor specializing in EV charging, smart panels, and load management. Serving San Jose, Palo Alto & Bay Area since 1991.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add when available: google: 'your-google-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': `${siteUrl}/#organization`,
  name: 'Mirkovic Electric',
  image: `${siteUrl}/images/logo-full.webp`,
  logo: `${siteUrl}/images/logo-full.webp`,
  description: 'Licensed Bay Area electrical contractor specializing in EV charging, load management, smart panels, PG&E coordination, and audiophile audio systems. Serving the Bay Area since 1991.',
  url: siteUrl,
  telephone: '(408) 900-2672',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.3382,
    longitude: -121.8863,
  },
  areaServed: [
    { '@type': 'City', name: 'San Jose' },
    { '@type': 'City', name: 'Palo Alto' },
    { '@type': 'City', name: 'Menlo Park' },
    { '@type': 'City', name: 'Cupertino' },
    { '@type': 'City', name: 'San Mateo' },
    { '@type': 'City', name: 'Mountain View' },
    { '@type': 'City', name: 'Sunnyvale' },
    { '@type': 'City', name: 'Los Altos' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Electrical Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'EV Charging Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Load Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Electrical Panels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Permits & PG&E Coordination' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audiophile Audio Systems' } },
    ],
  },
  sameAs: [],
  foundingDate: '1991',
  slogan: 'Modern Electrical Solutions for Today\'s High-Demand Properties',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e3a5f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-brand-600`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
