export interface Service {
  slug: string
  title: string
  subtitle: string
  description: string
  sections: Array<{
    heading: string
    content: string | string[]
  }>
  applications?: string[]
  whyItMatters?: string
  whoItFor?: string
}

export const services: Record<string, Service> = {
  'general-electrical': {
    slug: 'general-electrical',
    title: 'General Electrical & Infrastructure',
    subtitle: 'Professional Electrical Work for Residential and Commercial Properties',
    description: 'Modern electrical work for residential and commercial properties-done cleanly, safely, and built to support future needs. Mirkovic Electric provides professional electrical service, upgrades, and corrective work with the same planning-first mindset used on higher-complexity projects. We prioritize safe execution, code compliance, clear communication, and workmanship that holds up over time.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'Electrical troubleshooting and repairs',
          'Overloaded circuits, nuisance tripping, and power-quality issues',
          'Code corrections identified during inspections or remodels',
          'Safety upgrades and corrective work for aging or modified systems',
          'Dedicated circuits for appliances and equipment',
          'Power for heat pumps, induction ranges, laundry, workshops, and specialty loads',
          'Outlet additions and circuit extensions where appropriate',
          'Commercial equipment installs and tenant-improvement support',
          'Panel maintenance (breaker replacement, labeling, cleanup)',
          'Coordination with other trades during remodels or build-outs',
        ],
      },
      {
        heading: 'Why This Matters',
        content: 'Electrical systems are often pushed beyond their original design as properties evolve. Clean, code-compliant infrastructure work prevents repeat issues, improves safety, and creates a foundation for future electrification. Whether you are resolving an issue, adding new equipment, improving power distribution, or preparing a property for future electrical demand, we approach the work as infrastructure designed to be reliable, serviceable, and ready for what is next.',
      },
    ],
    applications: [
      'Service calls and troubleshooting',
      'Remodels and additions',
      'Commercial tenant improvements',
      'Equipment upgrades requiring new circuits',
      'Pre-sale or inspection-driven corrections',
      '"Make it right" cleanup of prior work',
    ],
    whoItFor: 'This service is for property owners and businesses needing reliable electrical work executed with professional standards, code compliance, and attention to future needs-whether addressing immediate issues or building infrastructure for long-term use.',
  },
  'power-planning': {
    slug: 'power-planning',
    title: 'Power Planning, Load Management & Smart Panels',
    subtitle: 'Advanced Electrical Planning for Modern High-Demand Systems',
    description: 'Modern properties face increasing electrical demands from EVs, heat pumps, induction cooking, solar, battery storage, and advanced systems. Without proper planning, these loads can exceed service capacity, trigger unnecessary upgrades, or create permitting issues. Mirkovic Electric provides integrated power planning, load management, and smart panel solutions designed to safely support new electrical loads while minimizing costly service upgrades and avoiding compliance problems.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'NEC-compliant electrical load calculations',
          'Evaluation of existing service capacity and system constraints',
          'Determination of whether a service upgrade is required or avoidable',
          'Smart load management and load-sharing strategies',
          'EV charger load management (Tesla Neurio and load-sharing systems)',
          'Smart electrical panel installation and configuration (including SPAN panels)',
          'Circuit-level energy monitoring and usage analysis',
          'Load prioritization and intelligent circuit control',
          'Integration with EV chargers, solar, and battery systems',
          'Planning for future electrical expansion',
          'Coordination with service upgrades when necessary',
        ],
      },
      {
        heading: 'Smart Panels & Energy Monitoring',
        content: 'Modern smart panels provide real-time visibility into energy usage, enable intelligent load control, and support the integration of EV charging, solar, battery storage, and future electrical loads. Smart panels add flexibility, transparency, and long-term value to the electrical system while often reducing or eliminating the need for costly service upgrades.',
      },
      {
        heading: 'Why This Matters',
        content: 'Improper planning can lead to failed inspections, project delays, and unnecessary service upgrades. Our planning-first approach allows electrical installations to proceed efficiently, compliantly, and with long-term reliability in mind. When service upgrades are truly needed, proper planning ensures they are sized correctly for both current and future demands.',
      },
    ],
    applications: [
      'EV charger installations in capacity-limited properties',
      'Solar- and battery-ready electrical planning',
      'Residential remodels and additions',
      'Multi-unit and mixed-use properties',
      'Commercial tenant improvements',
      'Properties seeking energy usage transparency and control',
      'Projects requiring flexible power management',
    ],
    whoItFor: 'This service is for property owners, business owners, architects, and contractors who need to add significant electrical loads, require permit-ready documentation, want greater control over electrical usage, or prefer to avoid unnecessary upgrades while planning for future electrical needs.',
  },
  'service-upgrades': {
    slug: 'service-upgrades',
    title: 'Electrical Service Upgrades',
    subtitle: 'Code-Compliant Service Upgrades for Modern Electrical Demand',
    description: 'As properties add EV chargers, heat pumps, induction cooking, solar, battery storage, and new equipment, existing electrical services are often no longer sufficient. An undersized or outdated service can limit what a property can support and lead to safety, reliability, or permitting issues. Mirkovic Electric provides professional electrical service and panel upgrades for residential and commercial properties, with a focus on proper planning, clean execution, and long-term reliability.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'Assessment of existing electrical service and panel capacity',
          'NEC-compliant load calculations',
          'Determination of required service capacity (100A, 125A, 200A and above)',
          'Main service upgrades and replacements',
          'Panel replacements and relocations',
          'Sub-panel additions for improved load distribution',
          'Service equipment modernization and cleanup',
          'Grounding and bonding upgrades as required',
          'Service labeling and documentation',
        ],
      },
      {
        heading: 'Utility & Code Compliance',
        content: 'Service upgrades affect the entire property and often involve utility coordination and permitting. We coordinate with PG&E and local utilities, manage permit documentation and inspections, and deliver clean, code-compliant work that supports both current and future demand. When an upgrade is required, we make sure it is done correctly and only when it is truly necessary.',
      },
      {
        heading: 'Why This Matters',
        content: 'Electrical service upgrades are significant investments that impact the entire property. Poor planning or shortcuts can result in delays, failed inspections, or systems that still fall short of future needs. We approach service upgrades deliberately, evaluating alternatives first, coordinating with utilities when required, and delivering clean, code-compliant work.',
      },
    ],
    applications: [
      'EV charger installations requiring additional capacity',
      'Remodels and additions',
      'Commercial tenant improvements',
      'Solar, battery, or generator installations',
      'Replacement of outdated or unsafe service equipment',
      'Properties preparing for future electrification',
    ],
    whoItFor: 'This service is for property owners and businesses planning new electrical loads or needing to upgrade electrical service capacity to support modern equipment and future demands.',
  },
  'ev-charging': {
    slug: 'ev-charging',
    title: 'EV Charging & Load Sharing',
    subtitle: 'System-Level EV Charging Solutions for Residential and Commercial Properties',
    description: 'Electric vehicle charging is one of the fastest-growing electrical loads in modern properties. When not properly planned, EV chargers can exceed available service capacity or trigger costly and unnecessary upgrades. Mirkovic Electric designs and installs EV charging systems that integrate safely with existing electrical infrastructure through load management, smart controls, and utility-aware planning.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'Residential and commercial EV charger installation',
          'Tesla Wall Connector and universal EVSE installations',
          'NEC-compliant load calculations for EV charging',
          'Breaker sizing, conductor selection, and raceway installation',
          'Dynamic load management (Tesla Neurio and load-sharing systems)',
          'Multiple EV charger load sharing configurations',
          'Integration with smart panels and energy monitoring systems',
          'Planning for future EV capacity expansion',
        ],
      },
      {
        heading: 'Load Sharing & Capacity Optimization',
        content: 'In properties with limited electrical capacity, load sharing and dynamic load management allow EV charging to operate safely without exceeding service limits. These strategies often eliminate the need for immediate service upgrades while maintaining reliable charging performance.',
      },
      {
        heading: 'Permitting & Utility Coordination',
        content: 'EV charging installations often require electrical permits and, in some cases, utility review. This service may include permit submittals, load documentation, and coordination with PG&E and local inspectors as required.',
      },
    ],
    applications: [
      'Single-family and multi-unit residential properties',
      'Commercial and mixed-use properties',
      'Properties with limited service capacity',
      'Garages requiring multiple EV chargers',
      'EV-ready planning for future vehicle adoption',
    ],
    whoItFor: 'This service is intended for homeowners, property managers, and business owners who want safe, compliant EV charging solutions that are designed around existing electrical capacity and future needs.',
  },
  'permits-pge': {
    slug: 'permits-pge',
    title: 'Permits & PG&E Coordination',
    subtitle: 'Pre-Construction Planning, Utility Coordination, and Inspection Support',
    description: 'Electrical projects in the Bay Area frequently require coordination with local building departments and PG&E. Service upgrades, EV charging installations, smart panels, and load management solutions often involve multiple approval steps before construction can begin. Mirkovic Electric manages the permitting and utility coordination process to reduce delays, avoid rejections, and ensure electrical work proceeds in compliance with local and utility requirements.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'Electrical permit application preparation and submittal',
          'Review of project scope for code and utility compliance',
          'Load calculations and service documentation',
          'Service capacity letters and utility-facing documentation',
          'PG&E service upgrade applications and coordination',
          'Meter, service, and utility equipment planning',
          'Scheduling coordination with inspectors and utilities',
          'Response to plan check comments and correction notices',
        ],
      },
      {
        heading: 'When This Service Is Needed',
        content: [
          'Electrical service upgrades or relocations',
          'EV charger installations requiring utility review',
          'Smart panel or load management projects',
          'Solar, battery, or generator integration',
          'Commercial tenant improvements',
          'Projects involving PG&E-owned equipment',
        ],
      },
      {
        heading: 'Why Utility Coordination Matters',
        content: 'Utility coordination is often the most time-consuming and misunderstood part of an electrical project. Improper documentation or incomplete applications can result in significant delays, redesigns, or additional costs. By addressing permitting and utility requirements early in the project, potential issues are identified before construction begins, helping projects move forward more efficiently.',
      },
    ],
    whoItFor: 'This service is intended for property owners, business owners, architects, and contractors who want a clear path through permitting and utility requirements, and who prefer to avoid delays caused by incomplete or incorrect submittals.',
  },
  'audio-systems': {
    slug: 'audio-systems',
    title: 'Audiophile Audio Systems & Networked Playback',
    subtitle: 'Reference-Grade Audio Infrastructure, System Design, and Integration',
    description: 'High-performance audio systems require more than quality components. Signal integrity, electrical noise control, proper grounding, and reliable network infrastructure all play a critical role in system performance. Mirkovic Electric designs and installs reference-grade audio infrastructure for clients who value sound quality, system reliability, and long-term flexibility. This service focuses on infrastructure, system topology, and bit-perfect signal delivery rather than consumer-grade audio packages.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'In-wall and in-ceiling audiophile speaker wiring',
          'Dedicated low-noise electrical circuits for audio systems',
          'Proper grounding and noise mitigation strategies',
          'Conduit planning for future system upgrades',
          'Bit-perfect digital audio distribution (Ethernet, USB, S/PDIF, AES)',
          'Multi-room audio endpoint planning and deployment',
          'Wired and wireless network design optimized for audio playback',
          'Centralized equipment locations and rack planning',
        ],
      },
      {
        heading: 'System Design & Custom Endpoints',
        content: 'Audio systems are designed around the client\'s equipment, listening goals, and space constraints. Custom endpoints and playback nodes may be specified or built as part of the system architecture, with attention to power supply quality, clocking, and network stability.',
      },
      {
        heading: 'Network Infrastructure for Audio',
        content: 'Reliable network performance is critical for modern audio systems. Network infrastructure is designed to support low-latency, low-interference audio playback across multiple endpoints while maintaining overall network reliability.',
      },
    ],
    applications: [
      'Dedicated listening rooms',
      'Whole-property and multi-room audio systems',
      'Residential and mixed-use properties',
      'Studios and private workspaces',
      'Projects requiring clean power and noise isolation',
    ],
    whoItFor: 'This service is intended for audiophiles, music professionals, and clients seeking high-performance audio systems built on a solid electrical and network foundation. Equipment sales are not the focus; design, infrastructure, and integration are prioritized.',
  },
}

export function getService(slug: string): Service | null {
  return services[slug] || null
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(services)
}
