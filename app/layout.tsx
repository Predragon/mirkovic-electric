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
    streetAddress: '5229 Englewood Dr',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '24',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you install EV chargers in the Bay Area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in EV charging installations throughout San Jose, Palo Alto, Menlo Park, and surrounding Bay Area cities. We handle everything from permits to PG&E coordination.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are you a licensed electrical contractor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Mirkovic Electric is a licensed C-10 electrical contractor (License #627414) serving the Bay Area since 1991 with over 30 years of experience.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is load management for electrical systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Load management optimizes your electrical capacity to handle high-demand appliances like EV chargers without requiring expensive panel upgrades. We install smart systems that intelligently distribute power.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you handle PG&E permits and coordination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we manage all PG&E paperwork, permits, and coordination for your electrical projects. We ensure code compliance and handle all utility requirements.'
      }
    }
  ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
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
