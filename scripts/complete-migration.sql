-- Mirkovic Electric CMS Database Schema for Cloudflare D1

-- Site-wide settings (metadata, contact info, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT NOT NULL, -- 'general', 'contact', 'seo', 'metadata'
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services content
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service sections (one-to-many with services)
CREATE TABLE IF NOT EXISTS service_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  heading TEXT NOT NULL,
  content TEXT NOT NULL, -- JSON array for lists, plain text for paragraphs
  content_type TEXT DEFAULT 'text', -- 'text' or 'list'
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Service metadata (applications, whoItFor, etc.)
CREATE TABLE IF NOT EXISTS service_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  meta_key TEXT NOT NULL, -- 'applications', 'whoItFor', 'whyItMatters'
  meta_value TEXT NOT NULL, -- JSON array for lists, plain text for single values
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Homepage content sections
CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL, -- 'hero', 'why_choose_us', 'service_areas', etc.
  content TEXT NOT NULL, -- JSON object with all section data
  visible BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images metadata (R2 references)
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL, -- 'hero-main', 'service-ev-charging', 'card-ev-charging', etc.
  r2_key TEXT NOT NULL, -- Path in R2 bucket
  alt_text TEXT,
  category TEXT, -- 'hero', 'card', 'service', 'logo', 'general'
  original_filename TEXT,
  file_size INTEGER,
  dimensions TEXT, -- JSON: {"width": 1920, "height": 1080}
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service area cities
CREATE TABLE IF NOT EXISTS service_areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1
);

-- Trust badges/features
CREATE TABLE IF NOT EXISTS trust_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon_type TEXT NOT NULL, -- 'text', 'emoji', or 'image'
  icon_value TEXT NOT NULL, -- 'C-10', '30+', or image key
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(visible);
CREATE INDEX IF NOT EXISTS idx_service_sections_service ON service_sections(service_id);
CREATE INDEX IF NOT EXISTS idx_service_metadata_service ON service_metadata(service_id);
CREATE INDEX IF NOT EXISTS idx_images_key ON images(key);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_key ON homepage_sections(section_key);
-- Initial data seeding for Mirkovic Electric CMS

-- Seed site settings
INSERT INTO site_settings (key, value, category) VALUES
  ('site_name', 'Mirkovic Electric', 'general'),
  ('tagline', 'Modern Electrical Solutions for Today''s High-Demand Properties', 'general'),
  ('phone', '(408) 900-2672', 'contact'),
  ('license_number', 'C-10 License #627414', 'general'),
  ('years_experience', '30+', 'general'),
  ('founded_year', '1991', 'general'),
  ('meta_title', 'Mirkovic Electric | Licensed Bay Area Electrical Contractor', 'seo'),
  ('meta_description', 'Licensed Bay Area electrical contractor since 1991 specializing in EV charging installations, load management, smart panels, and audiophile audio systems. C-10 License #627414.', 'seo'),
  ('og_image', '/images/og-image.png', 'seo'),
  ('business_name', 'Mirkovic Electric', 'schema'),
  ('business_type', 'Electrician', 'schema'),
  ('address_street', 'San Jose', 'schema'),
  ('address_city', 'San Jose', 'schema'),
  ('address_state', 'CA', 'schema'),
  ('address_postal', '95000', 'schema'),
  ('price_range', '$$', 'schema');

-- Seed service areas
INSERT INTO service_areas (city_name, order_index, visible) VALUES
  ('San Jose', 0, 1),
  ('Palo Alto', 1, 1),
  ('Menlo Park', 2, 1),
  ('Cupertino', 3, 1),
  ('San Mateo', 4, 1),
  ('Mountain View', 5, 1),
  ('Sunnyvale', 6, 1),
  ('Los Altos', 7, 1);

-- Seed trust badges
INSERT INTO trust_badges (icon_type, icon_value, title, description, order_index, visible) VALUES
  ('text', 'C-10', 'Licensed Contractor', 'California C-10 License #627414. Fully insured and bonded for your protection.', 0, 1),
  ('text', '30+', 'Years of Experience', 'Serving Bay Area homeowners since 1991 with expert electrical solutions.', 1, 1),
  ('text', 'BAY', 'Local Expertise', 'Deep knowledge of Bay Area codes, permitting, and PG&E coordination.', 2, 1);

-- Seed homepage sections
INSERT INTO homepage_sections (section_key, content, visible) VALUES
  ('hero', '{
    "title": "Modern Electrical Solutions for Today''s High-Demand Properties",
    "subtitle": "Licensed Bay Area Electrical Contractor",
    "cta_text": "Request a Quote",
    "cta_link": "/contact",
    "background_image_key": "hero-main"
  }', 1),
  ('why_choose_us', '{
    "title": "Why Choose Mirkovic Electric",
    "items": [
      {
        "title": "Expert Planning",
        "description": "We plan before we install, ensuring your electrical system can handle current and future demands."
      },
      {
        "title": "Permit Ready",
        "description": "All work is designed to pass inspection the first time with proper documentation."
      },
      {
        "title": "PG&E Coordination",
        "description": "We handle utility coordination and service upgrade applications when needed."
      }
    ]
  }', 1),
  ('service_intro', '{
    "title": "Our Services",
    "description": "Specialized electrical services for modern properties with high-demand systems."
  }', 1);
-- Service data migration generated from /lib/services.ts
-- Generated on: 2025-12-25T02:51:41.390Z

-- Service: EV Charging & Load Sharing
INSERT INTO services (slug, title, subtitle, description, order_index, visible)
VALUES (
  'ev-charging',
  'EV Charging & Load Sharing',
  'System-Level EV Charging Solutions for Residential and Commercial Properties',
  'Electric vehicle charging is one of the fastest-growing electrical loads in modern properties. When not properly planned, EV chargers can exceed available service capacity or trigger costly and unnecessary upgrades. Mirkovic Electric designs and installs EV charging systems that integrate safely with existing electrical infrastructure through load management, smart controls, and utility-aware planning.',
  0,
  1
);

-- Get the service ID for ev-charging
-- Note: In actual execution, you'll need to use the returned ID

-- Section 1: What This Service Includes
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'What This Service Includes', '["Residential and commercial EV charger installation","Tesla Wall Connector and universal EVSE installations","NEC-compliant load calculations for EV charging","Breaker sizing, conductor selection, and raceway installation","Dynamic load management (Tesla Neurio and load-sharing systems)","Multiple EV charger load sharing configurations","Integration with smart panels and energy monitoring systems","Planning for future EV capacity expansion"]', 'list', 0
FROM services WHERE slug = 'ev-charging';

-- Section 2: Load Sharing & Capacity Optimization
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Load Sharing & Capacity Optimization', 'In properties with limited electrical capacity, load sharing and dynamic load management allow EV charging to operate safely without exceeding service limits. These strategies often eliminate the need for immediate service upgrades while maintaining reliable charging performance.', 'text', 1
FROM services WHERE slug = 'ev-charging';

-- Section 3: Permitting & Utility Coordination
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Permitting & Utility Coordination', 'EV charging installations often require electrical permits and, in some cases, utility review. This service may include permit submittals, load documentation, and coordination with PG&E and local inspectors as required.', 'text', 2
FROM services WHERE slug = 'ev-charging';

-- Applications metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'applications', '["Single-family and multi-unit residential properties","Commercial and mixed-use properties","Properties with limited service capacity","Garages requiring multiple EV chargers","EV-ready planning for future vehicle adoption"]'
FROM services WHERE slug = 'ev-charging';

-- WhoItFor metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'whoItFor', 'This service is intended for homeowners, property managers, and business owners who want safe, compliant EV charging solutions that are designed around existing electrical capacity and future needs.'
FROM services WHERE slug = 'ev-charging';

-- ------------------------------------------------------------

-- Service: Load Management & Power Planning
INSERT INTO services (slug, title, subtitle, description, order_index, visible)
VALUES (
  'load-management',
  'Load Management & Power Planning',
  'Electrical Capacity Planning for Modern Properties',
  'Modern residential and commercial properties place increasing demands on electrical systems. EV chargers, heat pumps, induction cooking, solar, battery storage, and advanced audio or networked systems often exceed the capacity of existing electrical services if not properly planned. Mirkovic Electric provides load management and power planning services designed to safely integrate new electrical loads while minimizing unnecessary service upgrades and avoiding permitting or inspection issues.',
  1,
  1
);

-- Get the service ID for load-management
-- Note: In actual execution, you'll need to use the returned ID

-- Section 1: What This Service Includes
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'What This Service Includes', '["NEC-compliant electrical load calculations","Evaluation of existing service capacity (100A, 125A, 200A and above)","Identification of system constraints and limiting factors","EV charger load management (Tesla Neurio and load-sharing systems)","Smart load shedding and prioritization strategies","Coordination between EV charging, HVAC, and other major electrical loads","Planning to support future electrical expansion","Determination of when a panel or service upgrade is truly required","Alternatives to full service upgrades when feasible","Integration with smart panels and energy monitoring systems"]', 'list', 0
FROM services WHERE slug = 'load-management';

-- Section 2: Why This Matters
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Why This Matters', 'Improper planning can lead to failed inspections, project delays, and unnecessary service upgrades. Our planning-first approach allows electrical installations to proceed efficiently, compliantly, and with long-term reliability in mind.', 'text', 1
FROM services WHERE slug = 'load-management';

-- Section 3: Utility & Permitting Coordination
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Utility & Permitting Coordination', 'When required, load management and power planning services may include documentation and coordination to support permit submittals and utility requirements, including load documentation, service capacity letters, PG&E coordination, and inspection support.', 'text', 2
FROM services WHERE slug = 'load-management';

-- Applications metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'applications', '["EV charger installations in capacity-limited properties","Solar- and battery-ready electrical planning","Residential remodels and additions","Multi-unit and mixed-use properties","Commercial tenant improvements","Pre-construction feasibility assessments"]'
FROM services WHERE slug = 'load-management';

-- WhoItFor metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'whoItFor', 'This service is intended for property owners, business owners, architects, and contractors who need to add significant electrical loads, require permit-ready documentation, or want to avoid unnecessary upgrades while planning for future electrical needs.'
FROM services WHERE slug = 'load-management';

-- ------------------------------------------------------------

-- Service: Smart Electrical Panels & Energy Monitoring
INSERT INTO services (slug, title, subtitle, description, order_index, visible)
VALUES (
  'smart-panels',
  'Smart Electrical Panels & Energy Monitoring',
  'Advanced Control and Visibility for Modern Electrical Systems',
  'Electrical panels are no longer passive distribution equipment. Modern smart panels provide real-time visibility into energy usage, enable intelligent load control, and support the integration of EV charging, solar, battery storage, and future electrical loads. Mirkovic Electric designs and installs smart electrical panel solutions that improve system awareness, increase flexibility, and support long-term power planning for residential and commercial properties.',
  2,
  1
);

-- Get the service ID for smart-panels
-- Note: In actual execution, you'll need to use the returned ID

-- Section 1: What This Service Includes
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'What This Service Includes', '["Smart electrical panel installation and configuration (including SPAN panels)","Circuit-level energy monitoring and usage analysis","Load prioritization and intelligent circuit control","Integration with EV chargers, solar, and battery systems","Retrofit installations and new construction applications","Coordination with load management strategies","Support for future electrical expansion and system changes","Clear labeling and system documentation"]', 'list', 0
FROM services WHERE slug = 'smart-panels';

-- Section 2: Integration With Other Services
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Integration With Other Services', 'Smart panels are often deployed as part of a broader electrical strategy. They integrate directly with load management planning, EV charging systems, and utility coordination to provide a cohesive, future-ready electrical infrastructure.', 'text', 1
FROM services WHERE slug = 'smart-panels';

-- Section 3: Why Choose a Smart Panel
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Why Choose a Smart Panel', 'Smart panels provide actionable insight into electrical usage while enabling control strategies that can reduce the need for costly service upgrades. When properly designed and installed, they add flexibility, transparency, and long-term value to the electrical system.', 'text', 2
FROM services WHERE slug = 'smart-panels';

-- Applications metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'applications', '["EV charger installations requiring intelligent load control","Properties preparing for solar or battery integration","Homes and businesses seeking energy usage transparency","Projects requiring flexible power management","Clients planning phased electrical upgrades"]'
FROM services WHERE slug = 'smart-panels';

-- WhoItFor metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'whoItFor', 'This service is ideal for property owners, business owners, and project teams who want greater control over electrical usage, plan to add major electrical loads, or require an adaptable system that can evolve over time.'
FROM services WHERE slug = 'smart-panels';

-- ------------------------------------------------------------

-- Service: Permits & PG&E Coordination
INSERT INTO services (slug, title, subtitle, description, order_index, visible)
VALUES (
  'permits-pge',
  'Permits & PG&E Coordination',
  'Pre-Construction Planning, Utility Coordination, and Inspection Support',
  'Electrical projects in the Bay Area frequently require coordination with local building departments and PG&E. Service upgrades, EV charging installations, smart panels, and load management solutions often involve multiple approval steps before construction can begin. Mirkovic Electric manages the permitting and utility coordination process to reduce delays, avoid rejections, and ensure electrical work proceeds in compliance with local and utility requirements.',
  3,
  1
);

-- Get the service ID for permits-pge
-- Note: In actual execution, you'll need to use the returned ID

-- Section 1: What This Service Includes
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'What This Service Includes', '["Electrical permit application preparation and submittal","Review of project scope for code and utility compliance","Load calculations and service documentation","Service capacity letters and utility-facing documentation","PG&E service upgrade applications and coordination","Meter, service, and utility equipment planning","Scheduling coordination with inspectors and utilities","Response to plan check comments and correction notices"]', 'list', 0
FROM services WHERE slug = 'permits-pge';

-- Section 2: When This Service Is Needed
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'When This Service Is Needed', '["Electrical service upgrades or relocations","EV charger installations requiring utility review","Smart panel or load management projects","Solar, battery, or generator integration","Commercial tenant improvements","Projects involving PG&E-owned equipment"]', 'list', 1
FROM services WHERE slug = 'permits-pge';

-- Section 3: Why Utility Coordination Matters
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Why Utility Coordination Matters', 'Utility coordination is often the most time-consuming and misunderstood part of an electrical project. Improper documentation or incomplete applications can result in significant delays, redesigns, or additional costs. By addressing permitting and utility requirements early in the project, potential issues are identified before construction begins, helping projects move forward more efficiently.', 'text', 2
FROM services WHERE slug = 'permits-pge';

-- WhoItFor metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'whoItFor', 'This service is intended for property owners, business owners, architects, and contractors who want a clear path through permitting and utility requirements, and who prefer to avoid delays caused by incomplete or incorrect submittals.'
FROM services WHERE slug = 'permits-pge';

-- ------------------------------------------------------------

-- Service: Audiophile Audio Systems & Networked Playback
INSERT INTO services (slug, title, subtitle, description, order_index, visible)
VALUES (
  'audio-systems',
  'Audiophile Audio Systems & Networked Playback',
  'Reference-Grade Audio Infrastructure, System Design, and Integration',
  'High-performance audio systems require more than quality components. Signal integrity, electrical noise control, proper grounding, and reliable network infrastructure all play a critical role in system performance. Mirkovic Electric designs and installs reference-grade audio infrastructure for clients who value sound quality, system reliability, and long-term flexibility. This service focuses on infrastructure, system topology, and bit-perfect signal delivery rather than consumer-grade audio packages.',
  4,
  1
);

-- Get the service ID for audio-systems
-- Note: In actual execution, you'll need to use the returned ID

-- Section 1: What This Service Includes
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'What This Service Includes', '["In-wall and in-ceiling audiophile speaker wiring","Dedicated low-noise electrical circuits for audio systems","Proper grounding and noise mitigation strategies","Conduit planning for future system upgrades","Bit-perfect digital audio distribution (Ethernet, USB, S/PDIF, AES)","Multi-room audio endpoint planning and deployment","Wired and wireless network design optimized for audio playback","Centralized equipment locations and rack planning"]', 'list', 0
FROM services WHERE slug = 'audio-systems';

-- Section 2: System Design & Custom Endpoints
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'System Design & Custom Endpoints', 'Audio systems are designed around the client''s equipment, listening goals, and space constraints. Custom endpoints and playback nodes may be specified or built as part of the system architecture, with attention to power supply quality, clocking, and network stability.', 'text', 1
FROM services WHERE slug = 'audio-systems';

-- Section 3: Network Infrastructure for Audio
INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
SELECT id, 'Network Infrastructure for Audio', 'Reliable network performance is critical for modern audio systems. Network infrastructure is designed to support low-latency, low-interference audio playback across multiple endpoints while maintaining overall network reliability.', 'text', 2
FROM services WHERE slug = 'audio-systems';

-- Applications metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'applications', '["Dedicated listening rooms","Whole-property and multi-room audio systems","Residential and mixed-use properties","Studios and private workspaces","Projects requiring clean power and noise isolation"]'
FROM services WHERE slug = 'audio-systems';

-- WhoItFor metadata
INSERT INTO service_metadata (service_id, meta_key, meta_value)
SELECT id, 'whoItFor', 'This service is intended for audiophiles, music professionals, and clients seeking high-performance audio systems built on a solid electrical and network foundation. Equipment sales are not the focus; design, infrastructure, and integration are prioritized.'
FROM services WHERE slug = 'audio-systems';

-- ------------------------------------------------------------

-- Migration complete!
-- Total services migrated: 5
