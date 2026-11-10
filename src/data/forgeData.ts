export type ProjectCategory = 'All' | 'Branding' | 'Logos' | 'Digital' | 'Print';

export interface ForgeProject {
  id: number;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  image: string;
  hasMockup?: boolean;
  mockupPath?: string;
  originalImage?: string;
  client: string;
  duration: string;
  desc: string;
  what: string[];
  aspect: 'tall' | 'square' | 'wide' | 'portrait';
  palette: {
    bg: string;
    fg: string;
    accent: string;
  };
  specimenCode: string;
  featured?: boolean;
}

export interface ForgeService {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  desc: string;
  deliverables: string[];
  timeline: string;
}

export interface QuestPreset {
  id: string;
  title: string;
  description: string;
  commandQuery: string;
  categories: Exclude<ProjectCategory, 'All'>[];
  highlightIds: number[];
}

export interface StudioValue {
  num: string;
  title: string;
  desc: string;
}

export interface ProcessStep {
  num: string;
  command: string;
  title: string;
  desc: string;
  detail: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  role: string;
  rating: number;
  likedMost?: string;
  feedback?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
}

export const STUDIO_METRICS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '95%', label: 'Client Retention' },
  { value: '6+', label: 'Years Active' },
  { value: '4.5★', label: 'Average Rating' },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Branding',
  'Logos',
  'Digital',
  'Print',
];

export const FORGE_PROJECTS: ForgeProject[] = [
  {
    id: 8,
    title: 'Elysium Logo',
    category: 'Logos',
    image: '/assets/mockups/Design Forge Brand Kit (7).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (7).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770141043/Elysium_Logo_1_l5lcjr.png',
    client: 'Elysium',
    duration: '1 week',
    desc: 'Swiss-discipline logo system with industrial clarity and modern appeal.',
    what: [
      'Brand discovery session',
      'Multiple concepts refined',
      'Scalable vector mark',
      'Complete brand guidelines',
    ],
    aspect: 'tall',
    palette: { bg: "#901A1D", fg: "#FFFFFF", accent: "#000000" },
    specimenCode: 'DF-08 · ELYSIUM',
    featured: true,
  },
  {
    id: 15,
    title: 'Oh Wow Gifts Logo',
    category: 'Logos',
    image: '/assets/mockups/Oh Wow Gifts.png',
    hasMockup: true,
    mockupPath: '/assets/mockups/Oh Wow Gifts.png',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_700/v1772372786/7_afa8xi.png',
    client: 'Oh Wow Gifts',
    duration: '3 days',
    desc: 'Distinctive botanical circular logo mark for a personalized gifting brand on outdoor signage.',
    what: [
      'Unique visual identity',
      'Memorable botanical mark',
      'Scalable vector branding',
      'Storefront signage implementation',
    ],
    aspect: 'wide',
    palette: { bg: "#0D0D0D", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-15 · OH WOW GIFTS',
    featured: true,
  },
  {
    id: 5,
    title: 'T-Shirt Designs',
    category: 'Branding',
    image: '/assets/mockups/Design Forge Brand Kit (4).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (4).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770141045/tshirt_designs_2_ylervv.png',
    client: 'Namespace BPIT',
    duration: '1 week',
    desc: 'Original streetwear apparel graphics with 3D isometric cube illustrations for a tech community collective.',
    what: [
      'Original vector illustrations',
      'Screen-print ready master files',
      'Isometric wireframe composition',
      'DTG print specifications',
    ],
    aspect: 'portrait',
    palette: { bg: "#901A1D", fg: "#FFFFFF", accent: "#000000" },
    specimenCode: 'DF-05 · NAMESPACE',
    featured: true,
  },
  {
    id: 2,
    title: 'Festival Story Design',
    category: 'Digital',
    image: '/assets/mockups/Design Forge Brand Kit (6).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (6).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_700/v1772371218/Untitled_design_23_t4txfw.jpg',
    client: 'Rotaract District 3012',
    duration: '2 days',
    desc: 'Vibrant Instagram story creative for the Ganesh Chaturthi celebrations across district chapters.',
    what: [
      'Social-first visual design',
      'Traditional illustration & typography',
      'Multiple size exports',
      'Engagement-optimized layout',
    ],
    aspect: 'wide',
    palette: { bg: "#0D0D0D", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-02 · ROTARACT 3012',
    featured: true,
  },
  {
    id: 6,
    title: 'Safdurjung Photowalk',
    category: 'Digital',
    image: '/assets/mockups/PHOTOWALK (1).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/PHOTOWALK (1).jpg',
    originalImage: '/assets/PHOTOWALK.png',
    client: 'Opticlick',
    duration: '3 days',
    desc: 'Monochromatic architectural event poster for the Opticlick Safdurjung Tomb photowalk finale.',
    what: [
      'Architectural visual treatment',
      'Typographic event hierarchy',
      'Instagram campaign integration',
      'Print & digital promotional assets',
    ],
    aspect: 'tall',
    palette: { bg: "#0A0A0A", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-06 · OPTICLICK',
    featured: true,
  },
  {
    id: 10,
    title: 'Cirola Pamphlet',
    category: 'Print',
    image: '/assets/mockups/Design Forge Brand Kit (9).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (9).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770141509/Cirola_Front_1_qxbppt.jpg',
    client: 'Ciróla',
    duration: '4 days',
    desc: 'Tactile fresh-produce commercial pamphlet with compelling photography and brand consistency.',
    what: [
      'Strong visual narrative',
      'Brand element integration',
      'Product photography curation',
      'Print-ready folds & bleeds',
    ],
    aspect: 'tall',
    palette: { bg: "#0D0D0D", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-10 · CIROLA',
    featured: true,
  },
  {
    id: 11,
    title: 'Aggarwal PG',
    category: 'Print',
    image: '/assets/mockups/Aggarwal PG.jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Aggarwal PG.jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770141643/AGGARWAL_LIVING_cjuq9v.jpg',
    client: 'Aggarwal Living',
    duration: '3 days',
    desc: 'Premium living hospitality stationery and brand cards on polished marble surface.',
    what: [
      'Stationery identity system',
      'Distance-readable typography',
      'Table presentation styling',
      'High-res outdoor and indoor print files',
    ],
    aspect: 'wide',
    palette: { bg: "#000000", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-11 · AGGARWAL',
    featured: true,
  },
  {
    id: 26,
    title: 'Aggarwal Living Mural',
    category: 'Branding',
    image: '/assets/mockups/aggarwal living mockup.jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/aggarwal living mockup.jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770141643/AGGARWAL_LIVING_cjuq9v.jpg',
    client: 'Aggarwal Living',
    duration: '2 weeks',
    desc: 'Large-scale reception lobby mural featuring modular jigsaw puzzle illustrations of student living amenities.',
    what: [
      'Environmental graphics & spatial layout',
      '16 custom amenity vector puzzle illustrations',
      'Large-format high-resolution wall print masters',
      'Architectural interior brand experience',
    ],
    aspect: 'wide',
    palette: { bg: "#0D0D0D", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-26 · AGGARWAL MURAL',
    featured: true,
  },
  {
    id: 12,
    title: 'Darima Cheese',
    category: 'Print',
    image: '/assets/mockups/cirola.jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/cirola.jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_800/v1770727329/Darima_1_vqnl6a.jpg',
    client: 'Darima Cheese',
    duration: '1 week',
    desc: 'Artisanal cheese marketing flyer held in hands reflecting handcrafted gourmet values.',
    what: [
      'Full promotional flyer design',
      'Color & typography hierarchy',
      'Gourmet visual brand alignment',
      'Print delivery specifications',
    ],
    aspect: 'tall',
    palette: { bg: "#FFFFFF", fg: "#000000", accent: "#901A1D" },
    specimenCode: 'DF-12 · DARIMA',
    featured: true,
  },
  {
    id: 3,
    title: 'Take A Brain Break',
    category: 'Print',
    image: '/assets/mockups/Design Forge Brand Kit (5).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (5).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_700/v1770141057/Peace_1_qge5wo.jpg',
    client: 'Mental Health Initiative',
    duration: '2 days',
    desc: 'Mental health stationery flyer with bold circular typography and red envelope presentation.',
    what: [
      'Conceptual visual narrative',
      'Iconography & typographic balance',
      'Emotion-driven color palette',
      'High-res print output',
    ],
    aspect: 'wide',
    palette: { bg: "#000000", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-03 · BRAIN BREAK',
  },
  {
    id: 9,
    title: 'Quantum Cybershield',
    category: 'Print',
    image: '/assets/mockups/Design Forge Brand Kit (3).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (3).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_700/v1770141054/Orange_Blue_and_Yellow_Minimal_Geometry_Landscape_University_Research_Poster_z9rcfh.jpg',
    client: 'BPIT Research',
    duration: '5 days',
    desc: 'Academic research poster on quantum cybersecurity, encryption, and QKD protocols in a sleek gallery frame.',
    what: [
      'Quantum cybersecurity data visualization',
      'Comparative matrix design',
      'Academic structure & timeline',
      'Large-format print prep',
    ],
    aspect: 'wide',
    palette: { bg: "#000000", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-09 · QUANTUM NSQP',
  },
  {
    id: 20,
    title: 'Education Poster',
    category: 'Print',
    image: '/assets/mockups/Design Forge Brand Kit (8).jpg',
    hasMockup: true,
    mockupPath: '/assets/mockups/Design Forge Brand Kit (8).jpg',
    originalImage: 'https://res.cloudinary.com/dfxvrqxkh/image/upload/f_auto,q_auto,w_700/v1772372772/tips_to_tackle_lack_of_education_zvpwkq.jpg',
    client: 'S.D. Public School',
    duration: '2 days',
    desc: 'Civic educational infographic poster in wooden frame with clear visual hierarchy and instructional infographics.',
    what: [
      'Impactful awareness design',
      'Clear message hierarchy',
      'Compelling visual layout',
      'High-res print output',
    ],
    aspect: 'tall',
    palette: { bg: "#000000", fg: "#FFFFFF", accent: "#901A1D" },
    specimenCode: 'DF-20 · CIVIC POSTER',
  },
];

export const QUEST_PRESETS: QuestPreset[] = [
  {
    id: 'identity-marks',
    title: 'Brand identity & logo systems',
    description: 'Swiss-discipline vector marks, monograms, apparel graphics, and brand guidelines built to endure.',
    commandQuery: 'Logos & Brand Identity Systems',
    categories: ['Logos', 'Branding'],
    highlightIds: [8, 5, 15, 26],
  },
  {
    id: 'print-tactile',
    title: 'Tactile print, collateral & posters',
    description: 'Artisanal cheese pamphlets, hospitality stationery, academic posters, and framed civic infographics.',
    commandQuery: 'Print Collateral, Signage & Posters',
    categories: ['Print'],
    highlightIds: [10, 11, 12, 3, 9, 20],
  },
  {
    id: 'digital-editorial',
    title: 'Digital systems & photowalk campaigns',
    description: 'High-retention social carousels, photowalk event campaigns, and festival stories.',
    commandQuery: 'Digital Social & Campaigns',
    categories: ['Digital'],
    highlightIds: [2, 6],
  },
];

export const FORGE_SERVICES: ForgeService[] = [
  {
    num: '01',
    slug: 'logo-design',
    title: 'Logo Design',
    tagline: 'Marks that define you.',
    shortDesc: 'Distinctive marks that define who you are.',
    desc: 'Distinctive, memorable logos that capture your brand essence and stand the test of time. We explore multiple concepts and refine until every vector curve is exact.',
    deliverables: [
      'Custom Vector Concepts',
      'Primary & Secondary Marks',
      'Brand Usage Guidelines',
      'All File Formats (AI, EPS, SVG, PNG)',
    ],
    timeline: '1-2 weeks',
  },
  {
    num: '02',
    slug: 'brand-identity',
    title: 'Brand Identity',
    tagline: 'Complete visual systems.',
    shortDesc: 'Complete visual systems for modern brands.',
    desc: 'End-to-end brand identity systems that create cohesive experiences across every touchpoint - digital and physical.',
    deliverables: [
      'Logo Suite',
      'Color Palette',
      'Typography System',
      'Brand Guidelines Document',
    ],
    timeline: '3-4 weeks',
  },
  {
    num: '03',
    slug: 'social-media',
    title: 'Social Media Design',
    tagline: 'Content that stops the scroll.',
    shortDesc: 'Scroll-stopping content that converts.',
    desc: 'Engaging social media graphics, post templates, and ad creatives designed to amplify your brand message and drive interaction.',
    deliverables: [
      'Post Templates',
      'Story Designs',
      'Ad Creatives',
      'Profile Kit',
    ],
    timeline: '1-2 weeks',
  },
  {
    num: '04',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Interfaces that feel alive.',
    shortDesc: 'Interfaces that feel intuitive and alive.',
    desc: 'Intuitive, purposeful interfaces designed for conversion. From web apps to mobile products - we design digital experiences people return to.',
    deliverables: [
      'Wireframes',
      'High-Fidelity Designs',
      'Interactive Prototype',
      'Component Design System',
    ],
    timeline: '4-6 weeks',
  },
  {
    num: '05',
    slug: 'poster-print',
    title: 'Poster & Print',
    tagline: 'Bold work that commands attention.',
    shortDesc: 'Bold print work that commands attention.',
    desc: 'Eye-catching print and physical materials - menus, pamphlets, posters, flyers, brochures, and large-format banners - engineered for tactile visual impact.',
    deliverables: [
      'Print-Ready Files',
      'Digital Versions',
      'Multiple Format Sizes',
      'Bleed & Trim Setup',
    ],
    timeline: '3-5 days',
  },
  {
    num: '06',
    slug: 'design-consultancy',
    title: 'Design Consultancy',
    tagline: 'Strategic creative direction.',
    shortDesc: 'Strategy and direction for your creative vision.',
    desc: 'Not sure where to start? We guide you through your brand’s visual landscape with strategic audits, competitor research, and creative direction sessions.',
    deliverables: [
      'Brand Audit',
      'Competitor Analysis',
      'Design Strategy',
      'Creative Brief',
    ],
    timeline: '1 week',
  },
];

export const STUDIO_VALUES: StudioValue[] = [
  {
    num: '01',
    title: 'Mission',
    desc: 'To craft distinctive visual identities that empower brands to stand out, connect authentically, and leave lasting impressions.',
  },
  {
    num: '02',
    title: 'Philosophy',
    desc: 'Great design emerges from the fusion of creative fire and disciplined precision. Every pixel is intentional, every choice deliberate.',
  },
  {
    num: '03',
    title: 'Approach',
    desc: 'We dive deep into your brand’s essence, understanding your vision before crafting solutions that are both striking and strategic.',
  },
  {
    num: '04',
    title: 'Commitment',
    desc: 'Excellence is non-negotiable. We pour craft into every project, ensuring each deliverable exceeds your expectations and ships on schedule.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    command: '01 · Research',
    title: 'Research',
    desc: 'Brand audit, market analysis, competitor research.',
    detail: 'We examine your sector, audience positioning, and visual whitespace before sketching a single mark.',
  },
  {
    num: '02',
    command: '02 · Sketch',
    title: 'Sketch',
    desc: 'Rapid ideation, mood boards, concept exploration.',
    detail: 'Structural directions are mapped across typographic specimens, geometric grids, and tonal studies.',
  },
  {
    num: '03',
    command: '03 · Forge',
    title: 'Forge',
    desc: 'Precision crafting, digital refinement, color systems.',
    detail: 'Raw concepts are tempered into mathematically balanced vector marks, palettes, and layout rules.',
  },
  {
    num: '04',
    command: '04 · Polish',
    title: 'Polish',
    desc: 'Iteration, client review, quality assurance.',
    detail: 'Every optical weight, kerning pair, and print bleed is stress-tested across real-world substrates.',
  },
  {
    num: '05',
    command: '05 · Deliver',
    title: 'Deliver',
    desc: 'Final files, brand guidelines, ongoing support.',
    detail: 'Complete production packages in AI, EPS, SVG, PNG, and comprehensive usage manuals ready to deploy.',
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'voice-1',
    quote:
      'Absolutely thrilled with the service! The team was professional, creative and attentive to every detail. They delivered ahead of time and even the smallest changes were made happily. Highly recommend their work to anyone looking for unique and high quality designs.',
    likedMost:
      'Absolutely thrilled with the service! The team was professional, creative and attentive to every detail. They delivered ahead of time and even the smallest changes were made happily.',
    feedback:
      'Highly recommend their work to anyone looking for unique and high quality designs',
    role: 'Verified Client · Logo Design',
    rating: 5,
  },
  {
    id: 'voice-2',
    quote:
      'Couldn’t see any difficulty while coordinating with work, everything seems perfectly. Loved everything about the process.',
    likedMost: 'Everything',
    feedback:
      'Couldn’t see any difficulty while coordinating with work, everything seems perfectly.',
    role: 'Verified Client · Brand Coordination',
    rating: 5,
  },
  {
    id: 'voice-3',
    quote:
      'Discipline and commitment at the highest level. Everything was delivered to perfection.',
    likedMost: 'Discipline and commitment',
    feedback: 'Everything is perfect.',
    role: 'Verified Client · Design Consultancy',
    rating: 5,
  },
  {
    id: 'voice-4',
    quote:
      'Timely delivery and really great designs. Prompt turnaround and attentive team on all printable collateral.',
    likedMost: 'Timely delivery',
    feedback:
      'Can go through the final checkboxes twice before submitting the printable files.',
    role: 'Verified Client · Print & Production',
    rating: 5,
  },
  {
    id: 'voice-5',
    quote:
      'Loved the designs — nothing to improve, very satisfied with the creative output and visual execution.',
    likedMost: 'Designs',
    feedback: 'Nothing',
    role: 'Verified Client · Poster & Visual Identity',
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-df',
    question: 'What is Design Forge?',
    answer: [
      'Design Forge is a Delhi-based visual identity and graphic design studio founded on a simple belief: great design is forged, not found. Like skilled blacksmiths transforming raw metal into refined masterpieces, we take your ideas and shape them into logos, brand identities, print collateral, and digital experiences built to last.',
      'Over 6+ active years, we have delivered 150+ projects with a 95% client retention rate and a 4.5★ average client rating.',
    ],
  },
  {
    id: 'how-different',
    question: 'How is Design Forge different from template agencies or crowd platforms?',
    answer: [
      'Template marketplaces hand you generic marks anyone can generate before lunch. Knowing which visual direction carries authority - and why - requires human judgement.',
      'Every Design Forge identity is built from primary research, custom vector geometry, and optical refinement tailored to your specific market and medium.',
    ],
  },
  {
    id: 'services-timelines',
    question: 'What services do you forge, and how long do they take?',
    answer: [
      'We specialize in six core disciplines: Logo Design (1-2 weeks), Complete Brand Identity Systems (3-4 weeks), Social Media Design (1-2 weeks), UI/UX Design (4-6 weeks), Poster & Print Collateral (3-5 days), and Strategic Design Consultancy (1 week).',
    ],
  },
  {
    id: 'process-steps',
    question: 'What happens after I submit a project brief?',
    answer: [
      'We review every brief within 24-48 hours and respond with a scoped direction, timeline, and next steps.',
      'Once initiated, every commission moves through our five-stage forging process: 01 Research (brand audit & competitor analysis), 02 Sketch (mood boards & concept exploration), 03 Forge (precision vector crafting & color systems), 04 Polish (client review & quality assurance), and 05 Deliver (final files & brand guidelines).',
    ],
  },
  {
    id: 'deliverables-formats',
    question: 'What files and deliverables do I receive at handoff?',
    answer: [
      'For Logo and Brand Identity projects, you receive primary and secondary marks, color palettes, typography systems, a comprehensive Brand Guidelines document, and master production files in AI, EPS, SVG, PDF, and high-resolution PNG.',
      'For Print projects, we deliver press-ready files with exact bleed and trim setups alongside digital versions.',
    ],
  },
  {
    id: 'accelerate-review',
    question: 'What should I share to accelerate my project review?',
    answer: [
      'When using the Start a Project brief form or emailing us directly, sharing three things accelerates scoping: your existing brand or website links, your target timeline priority, and the primary decision-maker contact.',
    ],
  },
  {
    id: 'hours-location',
    question: 'Where are you based, and what are your working hours?',
    answer: [
      'We are based in Delhi, India, working with startups, institutions, and modern businesses worldwide. Studio hours are Monday - Friday (9:00 AM - 6:00 PM IST) and Saturday (10:00 AM - 2:00 PM IST).',
      'You can reach the studio directly at designforge250@gmail.com or via phone at +91 93183 78900, +91 99106 95553, and +91 83687 63677.',
    ],
  },
];

export const CONTACT_INFO = {
  email: 'designforge250@gmail.com',
  phones: ['+91 93183 78900', '+91 99106 95553', '+91 83687 63677'],
  location: 'Delhi, India',
  responseTime: '24-48 hours',
  workingHours: [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};
