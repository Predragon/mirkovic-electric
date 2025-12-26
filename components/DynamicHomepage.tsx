'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ParallaxCard from '@/components/ui/ParallaxCard';
import ParallaxHero from '@/components/ui/ParallaxHero';
import { getContentStatus } from '@/lib/content';

interface PageContent {
  [key: string]: string;
}

export default function DynamicHomepage() {
  const [content, setContent] = useState<PageContent>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const status = getContentStatus();
        const response = await fetch(
          `https://admin.mirkovicelectric.com/api/public/content?page=homepage&status=${status}`
        );

        if (response.ok) {
          const data = await response.json();
          setContent(data.content || {});
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  // Default fallback images
  const heroImage = content['hero-background'] || '/images/hero/ev-charging-hero.webp';
  const card1Image = content['card-1'] || '/images/cards/general-electrical-full.webp';
  const card2Image = content['card-2'] || '/images/cards/load-management-full.webp';
  const card3Image = content['card-3'] || '/images/cards/smart-panels-full.webp';
  const card4Image = content['card-4'] || '/images/cards/ev-charging-full.webp';
  const card5Image = content['card-5'] || '/images/cards/permits-pge-full.webp';
  const card6Image = content['card-6'] || '/images/cards/audio-systems-full.webp';

  return (
    <div className="w-full">
      {/* Hero Section with Parallax */}
      <ParallaxHero
        imageSrc={heroImage}
        imageAlt="Professional EV Charger Installation Bay Area - Licensed Electrician San Jose"
      >
        <div className="container-max relative z-10 py-16">
          <div className="max-w-2xl">
            <p className="text-accent-400 font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">
              Licensed Bay Area Electrician Since 1991
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Modern Electrical Solutions for Today's{' '}
              <span className="text-accent-400">High-Demand</span> Properties
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              EV charging, smart panels, load management, and expert PG&E coordination.
              Trusted by Bay Area homeowners for over 30 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact/"
                className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 text-center shadow-lg shadow-accent-500/30"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:(408)900-2672"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-bold text-lg transition-all text-center backdrop-blur-sm"
              >
                Call (408) 900-2672
              </a>
            </div>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 font-bold text-sm">C-10</span>
                </div>
                <span className="text-gray-300 text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 font-bold text-sm">30+</span>
                </div>
                <span className="text-gray-300 text-sm">Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 text-lg">★</span>
                </div>
                <span className="text-gray-300 text-sm">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* Our Services Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive electrical solutions for modern homes and businesses
            </p>
          </div>

          {/* Top row - 3 core services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <ParallaxCard
              href="/services/general-electrical/"
              imageSrc={card1Image}
              imageAlt="Licensed Electrician Bay Area - Residential & Commercial Electrical Repairs San Jose"
              title="General Electrical Services"
              description="Troubleshooting, repairs, dedicated circuits & maintenance"
            />

            <ParallaxCard
              href="/services/power-planning/"
              imageSrc={card2Image}
              imageAlt="Smart Load Management Systems Bay Area - Electrical Panel Optimization Palo Alto"
              title="Power Planning & Smart Panels"
              description="Load management, smart panels & capacity optimization"
            />

            <ParallaxCard
              href="/services/service-upgrades/"
              imageSrc={card3Image}
              imageAlt="Electrical Panel Upgrade Service Bay Area - 200 Amp Panel Installation San Jose"
              title="Electrical Service Upgrades"
              description="Panel replacements & service capacity upgrades"
            />
          </div>

          {/* Bottom row - 3 specialized services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ParallaxCard
              href="/services/ev-charging/"
              imageSrc={card4Image}
              imageAlt="Tesla EV Charger Installation Bay Area - Level 2 Electric Vehicle Charging San Jose Palo Alto"
              title="EV Charging Solutions"
              description="Level 2 chargers, load sharing & smart scheduling"
            />

            <ParallaxCard
              href="/services/permits-pge/"
              imageSrc={card5Image}
              imageAlt="PG&E Electrical Permits Bay Area - Utility Coordination & Code Compliance San Jose"
              title="Permits & PG&E Coordination"
              description="Full permit handling & utility upgrades"
            />

            <ParallaxCard
              href="/services/audio-systems/"
              imageSrc={card6Image}
              imageAlt="Audiophile Electrical Systems Bay Area - Dedicated Audio Circuits Clean Power San Jose"
              title="Audiophile Audio Systems"
              description="Dedicated circuits & clean power solutions"
            />
          </div>
        </div>
      </section>

      {/* Rest of the homepage content... */}
    </div>
  );
}
