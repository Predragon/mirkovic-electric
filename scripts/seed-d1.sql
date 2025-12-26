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
