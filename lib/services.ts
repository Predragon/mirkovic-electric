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
  'load-management': {
    slug: 'load-management',
    title: 'Load Management & Power Planning',
    subtitle: 'Electrical Capacity Planning for Modern Properties',
    description: 'Modern residential and commercial properties place increasing demands on electrical systems. EV chargers, heat pumps, induction cooking, solar, battery storage, and advanced audio or networked systems often exceed the capacity of existing electrical services if not properly planned. Mirkovic Electric provides load management and power planning services designed to safely integrate new electrical loads while minimizing unnecessary service upgrades and avoiding permitting or inspection issues.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'NEC-compliant electrical load calculations',
          'Evaluation of existing service capacity (100A, 125A, 200A and above)',
          'Identification of system constraints and limiting factors',
          'EV charger load management (Tesla Neurio and load-sharing systems)',
          'Smart load shedding and prioritization strategies',
          'Coordination between EV charging, HVAC, and other major electrical loads',
          'Planning to support future electrical expansion',
          'Determination of when a panel or service upgrade is truly required',
          'Alternatives to full service upgrades when feasible',
          'Integration with smart panels and energy monitoring systems',
        ],
      },
      {
        heading: 'Why This Matters',
        content: 'Improper planning can lead to failed inspections, project delays, and unnecessary service upgrades. Our planning-first approach allows electrical installations to proceed efficiently, compliantly, and with long-term reliability in mind.',
      },
      {
        heading: 'Utility & Permitting Coordination',
        content: 'When required, load management and power planning services may include documentation and coordination to support permit submittals and utility requirements, including load documentation, service capacity letters, PG&E coordination, and inspection support.',
      },
    ],
    applications: [
      'EV charger installations in capacity-limited properties',
      'Solar- and battery-ready electrical planning',
      'Residential remodels and additions',
      'Multi-unit and mixed-use properties',
      'Commercial tenant improvements',
      'Pre-construction feasibility assessments',
    ],
    whoItFor: 'This service is intended for property owners, business owners, architects, and contractors who need to add significant electrical loads, require permit-ready documentation, or want to avoid unnecessary upgrades while planning for future electrical needs.',
  },
  'smart-panels': {
    slug: 'smart-panels',
    title: 'Smart Electrical Panels & Energy Monitoring',
    subtitle: 'Advanced Control and Visibility for Modern Electrical Systems',
    description: 'Electrical panels are no longer passive distribution equipment. Modern smart panels provide real-time visibility into energy usage, enable intelligent load control, and support the integration of EV charging, solar, battery storage, and future electrical loads. Mirkovic Electric designs and installs smart electrical panel solutions that improve system awareness, increase flexibility, and support long-term power planning for residential and commercial properties.',
    sections: [
      {
        heading: 'What This Service Includes',
        content: [
          'Smart electrical panel installation and configuration (including SPAN panels)',
          'Circuit-level energy monitoring and usage analysis',
          'Load prioritization and intelligent circuit control',
          'Integration with EV chargers, solar, and battery systems',
          'Retrofit installations and new construction applications',
          'Coordination with load management strategies',
          'Support for future electrical expansion and system changes',
          'Clear labeling and system documentation',
        ],
      },
      {
        heading: 'Integration With Other Services',
        content: 'Smart panels are often deployed as part of a broader electrical strategy. They integrate directly with load management planning, EV charging systems, and utility coordination to provide a cohesive, future-ready electrical infrastructure.',
      },
      {
        heading: 'Why Choose a Smart Panel',
        content: 'Smart panels provide actionable insight into electrical usage while enabling control strategies that can reduce the need for costly service upgrades. When properly designed and installed, they add flexibility, transparency, and long-term value to the electrical system.',
      },
    ],
    applications: [
      'EV charger installations requiring intelligent load control',
      'Properties preparing for solar or battery integration',
      'Homes and businesses seeking energy usage transparency',
      'Projects requiring flexible power management',
      'Clients planning phased electrical upgrades',
    ],
    whoItFor: 'This service is ideal for property owners, business owners, and project teams who want greater control over electrical usage, plan to add major electrical loads, or require an adaptable system that can evolve over time.',
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
