import HeroSection from '@/components/home/HeroSection'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import CustomerReviews from '@/components/home/CustomerReviews'
import FAQSection from '@/components/home/FAQSection'
import CTASection from '@/components/home/CTASection'
import { getPageContent, getImageUrl, getContentStatus } from '@/lib/content'

export const metadata = {
  title: 'Mirkovic Electric | Licensed Bay Area Electrical Contractor',
  description: 'Modern electrical solutions for high-demand residential and commercial properties. EV charging, load management, smart panels, permits, and audio systems. Licensed Bay Area Electrician Since 1991.',
}

export default async function Home(): Promise<JSX.Element> {
  // Use default paths - edge function will replace with database URLs at runtime
  const heroImage = '/images/hero/ev-charging-hero.webp'
  const serviceImages = {
    card1: '/images/cards/general-electrical-full.webp',
    card2: '/images/cards/load-management-full.webp',
    card3: '/images/cards/smart-panels-full.webp',
    card4: '/images/cards/ev-charging-full.webp',
    card5: '/images/cards/permits-pge-full.webp',
    card6: '/images/cards/audio-systems-full.webp',
  }

  return (
    <div className="w-full">
      <HeroSection imageSrc={heroImage} />
      <ServicesGrid images={serviceImages} />
      <WhyChooseUs />
      <CustomerReviews />
      <FAQSection />
      <CTASection />
    </div>
  )
}
