CLAUDE CODE SYSTEM PROMPT: MIRKOVIC ELECTRIC WEBSITE BUILD

=== CONTEXT ===
Repo: mirkovic_electric (already connected to Cloudflare Pages)
Live URL: landing.mirkovicelectric.com
Status: Assets synced, old site backed up, ready to rebuild

=== WHAT EXISTS ===
Website_Overhaul/
  01_Brand Assets/          - Logo files
  03_Mockups & Concepts/    - Directional mockups (reference only)
  04_PDF Deliverables/      - SOURCE OF TRUTH
    Mirkovic_Electric_Full_Website_Mockups_and_Descriptions.pdf  ← PRIMARY SPEC
  05_Technical Build/

Root files (TO REPLACE):
  index.html, services.html, evcharging.html, contact.html, book-services.html

backup_landing/             - Old site archived
cdn-cgi/                    - Cloudflare scripts (KEEP)
robots.txt, favicon.ico     - Static assets (PRESERVE)

=== YOUR MISSION ===
Build Next.js 15 (App Router) static site that:
1. Replaces root HTML files with modern Next.js export
2. Implements designs from 04_PDF Deliverables/
3. Maintains Cloudflare Pages compatibility
4. Future-proofs for custom forms (replacing GoHighLevel later)

=== TECHNICAL REQUIREMENTS ===

Framework: Next.js 15 (App Router)

Required next.config.js:
  output: 'export'              // Static HTML
  trailingSlash: true           // Cloudflare compatibility
  distDir: 'out'
  images: { unoptimized: true } // Use Cloudflare optimization

=== SITE ARCHITECTURE ===

Pages (from PDFs):
  /                           - Homepage
  /services                   - Services overview
  /services/ev-charging       - EV Charging & Load Sharing
  /services/load-management   - Load Management & Power Planning
  /services/smart-panels      - Smart Electrical Panels
  /services/permits-pge       - Permits & PG&E Coordination
  /services/audio-systems     - Audiophile Audio Systems
  /contact                    - Contact (GoHighLevel embed)
  /book                       - Booking

Directory Structure:
  /app
    layout.tsx                # Global layout + nav
    page.tsx                  # Homepage
    services/
      layout.tsx
      page.tsx
      [service-name]/page.tsx # 5 service pages
    contact/page.tsx
    book/page.tsx
  
  /components
    ui/                       # Header, Footer, Button, ServiceCard
    forms/                    # ContactEmbed (GoHighLevel wrapper)
  
  /public
    images/logo.png           # From 01_Brand Assets
    robots.txt                # Copy from root
    favicon.ico               # Copy from root

=== DESIGN RULES ===

Source of Truth: 04_PDF Deliverables/Mirkovic_Electric_Full_Website_Mockups_and_Descriptions.pdf
Brand Assets: Website_Overhaul/01_Brand Assets/Logo (Original)/Mirkovic Electric Logo Transparent.png
Mockups: Directional only (PDFs override)

Copy text verbatim from PDFs
Extract colors/fonts from PDF specs
Use mockup images as placeholders

=== FORMS STRATEGY ===

Phase 1 (NOW): Embed GoHighLevel forms via iframe
Phase 2 (FUTURE): Replace with custom /api/contact routes

Keep form components isolated for easy swapping

=== PERFORMANCE STANDARDS ===

Non-negotiable:
  Lighthouse Performance > 90
  First Contentful Paint < 1.5s
  Cumulative Layout Shift < 0.1

Tactics:
  - Next.js Image component (lazy loading)
  - Font subsetting
  - Critical CSS inlining
  - Lazy load below-fold content

=== DEPLOYMENT FLOW ===

Option A (Manual):
  npm run build → /out
  Copy robots.txt, favicon.ico, cdn-cgi/ to /out
  Commit /out to root
  Git push → Cloudflare auto-deploys

Option B (Recommended):
  Use @cloudflare/next-on-pages adapter
  Git push → Auto-build on Cloudflare

=== CRITICAL CONSTRAINTS ===

DO:
  ✓ Work in existing mirkovic_electric repo
  ✓ Keep GitHub ↔ Cloudflare sync intact
  ✓ Use relative URLs only
  ✓ Preserve cdn-cgi/ directory
  ✓ Match PDF specs exactly

DON'T:
  ✗ Create new repo/project
  ✗ Break Cloudflare deployment
  ✗ Use absolute URLs
  ✗ Deviate from PDFs without approval
  ✗ Add incompatible dependencies

=== DEVELOPMENT PHASES ===

PHASE 1 (CURRENT): Foundation
  - Initialize Next.js with correct config
  - Set up directory structure
  - Create base layout (Header/Footer from PDFs)
  - Implement homepage
  - Build 5 service pages
  - Add navigation
  - Copy static assets

APPROVAL GATE: Visual review against PDFs

PHASE 2: Polish & Launch
  - Integrate GoHighLevel forms
  - SEO meta tags
  - Responsive design (mobile-first)
  - Performance optimization
  - Accessibility audit (WCAG AA)
  - Generate sitemap.xml
  - Test deployment

APPROVAL GATE: Lighthouse scores + client sign-off

PHASE 3 (POST-LAUNCH):
  - Replace GoHighLevel with custom forms
  - CRM integration
  - Analytics
  - Content updates

=== QUESTIONS BEFORE STARTING ===

1. GoHighLevel form embed URLs ready?
2. Domain strategy: landing.mirkovicelectric.com permanent or migrate?
3. Analytics preference: Cloudflare Web Analytics, GA4, other?
4. Phase 1 deadline?

=== FIRST STEPS ===

1. Review: Read Mirkovic_Electric_Full_Website_Mockups_and_Descriptions.pdf
2. Propose: Confirm page routes and component structure
3. Wait: Get explicit approval before coding

First command after approval:
  npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

Then configure next.config.js per requirements above.

REPLY "READY" WHEN YOU'VE READ THIS AND ARE PREPARED TO START.
