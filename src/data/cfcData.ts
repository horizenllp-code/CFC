import { ServiceItem, ValueItem, ClientItem, BranchLocation, CareerOpening } from '../types';

export const COMPANY_INFO = {
  legalName: 'CFC Logistics Pvt. Ltd.',
  shortName: 'CFC Logistics',
  established: 'April 9, 2007',
  incorporationYear: '2007',
  certification: 'ISO 9001:2008 Certified',
  ibaRegistration: 'DLC-1461 (Approved by Indian Bank Association)',
  tagline: 'Logistically yours',
  officialTagline: 'LOGISTICALLY YOURS',
  headOffice: {
    address: '308, Rishabh Corporate Tower, Karkardooma Community Centre, Delhi - 110092, India',
    phone: '+91 11 43026300',
    email: 'info@cfclogistics.in',
  },
  corporateSalesOffice: {
    title: 'Head - Sales & New Business Development',
    contactPerson: 'ManMohan Sharma',
    phone: '+91 8287 703703',
    email: 'manmohansharma@cfclogistics.in',
    address: 'A-20, First Floor, Okhla Phase 1, New Delhi - 110020, India',
  },
  directors: ['Darshika Sharma', 'Neeraj Sharma'],
  metrics: [
    { value: '1,580', label: 'Commercial Fleet Vehicles', detail: 'Managed pan-India fleet' },
    { value: '360,000+', label: 'Sq. Ft. Warehousing', detail: 'Strategic multi-client depots' },
    { value: '₹300+ Cr', label: 'Inventory Value Managed', detail: 'Across industrial sectors' },
    { value: '35', label: 'Pan-India Branches', detail: 'Direct regional infrastructure' },
    { value: '200+', label: 'Logistics Professionals', detail: 'Operations & customs teams' },
    { value: '18+', label: 'Years of Excellence', detail: 'Incorporated April 2007' },
  ],
  ports: ['Nhava Sheva (JNPT Mumbai)', 'Chennai Port', 'Pipavav Port', 'Mundra Port'],
};

export const CORE_VALUES: ValueItem[] = [
  {
    number: '01',
    title: 'SAFETY',
    desc: 'Uncompromising focus on securing goods and maintaining safe operating environments across every leg of transport.',
    topBorderColor: '#F59E0B', // Orange
  },
  {
    number: '02',
    title: 'SECURITY',
    desc: 'Robust handling protocols and cargo control safeguards to ensure complete transit protection from origin to destination.',
    topBorderColor: '#0284C7', // Blue
  },
  {
    number: '03',
    title: 'FLEXIBILITY',
    desc: 'Agile multi-modal logistics networks capable of responding dynamically to evolving customer demands and schedules.',
    topBorderColor: '#DC2626', // Red
  },
  {
    number: '04',
    title: 'INNOVATION',
    desc: 'Differentiated supply chain management methodologies driving efficiency and continuous service optimization.',
    topBorderColor: '#F59E0B', // Orange
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'supply-chain-solutions',
    title: 'SUPPLY CHAIN SOLUTIONS',
    shortDesc: 'Comprehensive single-window supply chain management solutions covering purchasing, manufacturing, logistics, distribution, and marketing.',
    fullDesc: 'CFC Logistics Pvt. Ltd. acts as an integrated single-window logistics management partner. We synchronize the end-to-end flow from raw material intake to final retail or industrial distribution, removing operational bottlenecks and delivering complete visibility across the enterprise lifecycle.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop', // Railway / infrastructure
    capabilities: [
      'Single-window supply chain governance',
      'Synchronized purchasing & manufacturing logistics',
      'Multi-tier distribution network design',
      'Inventory buffer & demand matching',
      'Reverse logistics & recall management',
    ],
    specs: [
      { label: 'Framework', value: 'Single-Window Control' },
      { label: 'Integration', value: 'Purchasing to Marketing' },
      { label: 'Visibility', value: 'Milestone & Telematics' },
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'warehouse-inventory',
    title: 'WAREHOUSE & INVENTORY MANAGEMENT',
    shortDesc: 'Warehousing and inventory handling services designed to optimize inventory control and logistics efficiency.',
    fullDesc: 'Administering over 360,000 sq. ft. of prime warehousing space across major industrial nodes in India. CFC oversees more than ₹300 Crore in commercial inventory, providing transloading, pick and pack operations, computerized barcoding, labeling, repackaging, and precision Just-In-Time (JIT) delivery schedules.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop', // Warehouse racking
    capabilities: [
      'Over 360,000 sq. ft. pan-India warehousing footprint',
      'Inventory control managing over ₹300 Crore asset value',
      'Pick & pack, sorting, barcoding and custom kitting',
      'Transloading & cross-docking operations',
      'Just-In-Time (JIT) plant supply line replenishment',
    ],
    specs: [
      { label: 'Space Administered', value: '360,000+ sq. ft.' },
      { label: 'Asset Valuation', value: '₹300+ Cr Managed' },
      { label: 'Technology', value: 'WMS & Online Inventory' },
    ],
    accentColor: '#0284C7',
  },
  {
    id: 'rail-road-transportation',
    title: 'RAIL & ROAD TRANSPORTATION',
    shortDesc: 'Integrated ground transportation services utilizing rail and road logistics networks with dedicated commercial fleet.',
    fullDesc: 'Operating a managed fleet of 1,580 vehicles covering full truck load (FTL), chartered commercial vehicles, and dedicated multi-axle trailers. With pan-India haulage and seamless rail freight coordination, CFC ensures time-critical transit connecting ports, manufacturing hubs, and consumption centers.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop', // Freight trucks / depot
    capabilities: [
      'Managed commercial fleet of 1,580 dedicated vehicles',
      'Pan-India road haulage with GPS telemetry in all trucks',
      'Chartered vehicle deployments for dedicated client routes',
      'Multi-modal rail container haulage and rake coordination',
      'I.B.A. approved carrier documentation (Reg. DLC-1461)',
    ],
    specs: [
      { label: 'Fleet Strength', value: '1,580 Commercial Units' },
      { label: 'Network', value: 'Pan-India Road & Rail' },
      { label: 'Tracking', value: '24/7 GPS Telematics' },
    ],
    accentColor: '#DC2626',
  },
  {
    id: 'port-customs-clearance',
    title: 'PORT & CUSTOMS CLEARANCE',
    shortDesc: 'Port handling and customs clearance solutions to ensure seamless transit of export and import cargo.',
    fullDesc: 'CFC Logistics maintains an active physical presence at India’s key maritime gateways including Nhava Sheva (JNPT Mumbai), Chennai Port, Pipavav Port, and Mundra Port. We handle comprehensive customs documentation, EDI filing, port authority liaison, bonded transshipment, and container lifting for rapid port evacuation.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop', // Container port gantry
    capabilities: [
      'Permanent gateway desks at JNPT, Mundra, Pipavav & Chennai',
      'Export and import customs documentation and clearance',
      'Container evacuation, lifting, and bonded cartage',
      'Specialized handling for heavy machinery & raw materials',
      'Complete regulatory adherence and tariff classification',
    ],
    specs: [
      { label: 'Gateways', value: 'JNPT, Mundra, Chennai, Pipavav' },
      { label: 'Compliance', value: 'Customs & Port EDI' },
      { label: 'Turnaround', value: 'Rapid Container Evacuation' },
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'freight-forwarding',
    title: 'FREIGHT FORWARDING',
    shortDesc: 'Freight forwarding and transportation management services tailored to domestic and international supply chain requirements.',
    fullDesc: 'Comprehensive multimodal freight forwarding supporting Less than Container Load (LCL), Full Container Load (FCL), break-bulk, and chartered cargo shipments. We execute door-to-door, airport-to-airport, and sea port-to-sea port transport with end-to-end documentation at origin and destination.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1200&auto=format&fit=crop', // Cargo shipping container port
    capabilities: [
      'LCL (Less than Container Load) & FCL (Full Container Load)',
      'Break-bulk, over-dimensional and project cargo handling',
      'Door-to-Door, Airport-to-Airport & Port-to-Port contracts',
      'Origin and destination customs documentation',
      'Charter cargo vessels and chartered ground transport',
    ],
    specs: [
      { label: 'Modes', value: 'Sea, Rail, Road & Air' },
      { label: 'Cargo Profiles', value: 'FCL, LCL & Break-Bulk' },
      { label: 'Service Scope', value: 'Door-to-Door Worldwide' },
    ],
    accentColor: '#0284C7',
  },
  {
    id: '3pl-value-added',
    title: '3PL & VALUE-ADDED SERVICES',
    shortDesc: 'End-to-end third-party logistics, in-land transit insurance, custom packaging, labeling, and telemetry tracking.',
    fullDesc: 'CFC provides tailored Third-Party Logistics (3PL) solutions engineered to reduce overhead for corporate shippers. From specialized cargo shrink-wrapping and palletization to insurance liaison, returnable packaging management, and live telematics reporting via online-enabled branches.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop', // Palletized cargo / modern logistics
    capabilities: [
      'Comprehensive 3PL enterprise outsourcing',
      'Specialized industrial packing, strapping & shrink-wrapping',
      'Cargo transit insurance assistance & risk coverage',
      'Returnable asset tracking & reverse supply chains',
      'Branch-level online management across 35 locations',
    ],
    specs: [
      { label: 'Contract Model', value: 'Dedicated 3PL Partnership' },
      { label: 'Security', value: 'Transit Insurance & GPS' },
      { label: 'Branch Network', value: '35 Online Connected Hubs' },
    ],
    accentColor: '#DC2626',
  },
];

export const GENUINE_CLIENTS: ClientItem[] = [
  { name: 'Bayer', category: 'Chemicals & Agrochemicals', industry: 'Crop Science & Life Sciences', description: 'Agricultural inputs and specialized crop protection logistics.' },
  { name: 'Heinz', category: 'FMCG & Food', industry: 'Consumer Packaged Goods', description: 'Packaged food distribution with hygienic transit protocols.' },
  { name: 'Jubilant', category: 'Chemicals & Pharma', industry: 'Life Sciences & Specialty Chemicals', description: 'Chemical supply chain with dedicated safety and handling controls.' },
  { name: 'Bajaj', category: 'Automotive & Electrical', industry: 'Vehicles & Industrial Consumer Goods', description: 'Component logistics and finished product dispatch networks.' },
  { name: 'Havells', category: 'Electrical & Industrial', industry: 'Electrical Consumer Durables', description: 'High-volume warehousing and multi-tier distribution.' },
  { name: 'Orient', category: 'Electrical & Appliances', industry: 'Consumer Appliances', description: 'Pan-India freight transport and regional warehouse fulfillment.' },
  { name: 'Osram', category: 'Lighting & Electronics', industry: 'Precision Opto-Semiconductors', description: 'Sensitive cargo movement with specialized container protection.' },
  { name: 'Surya', category: 'Industrial & Lighting', industry: 'Lighting, Steel Pipes & PVC', description: 'Heavy industrial pipe transportation and pan-India dispatch.' },
  { name: 'Avery Dennison', category: 'Industrial Materials', industry: 'Pressure-Sensitive Materials', description: 'Material handling and time-sensitive factory inventory feed.' },
  { name: 'Hyundai', category: 'Automotive', industry: 'Passenger Vehicles & Heavy Parts', description: 'Automotive sub-assembly haulage and port-to-plant cartage.' },
  { name: 'Sogefi', category: 'Automotive Components', industry: 'Filtration & Suspension Systems', description: 'Just-in-time component feeder for automotive assembly lines.' },
  { name: 'Himson', category: 'Textile Machinery', industry: 'Heavy Engineering & Industrial Looms', description: 'Over-dimensional equipment transport and specialized rigging.' },
  { name: 'New Holland', category: 'Agricultural Machinery', industry: 'Tractors & Farm Equipments', description: 'Tractor sub-assemblies and machinery parts transport.' },
  { name: 'Goodyear', category: 'Tyres & Rubber', industry: 'Automotive Tyres', description: 'Bulk tyre distribution across regional warehouses and dealer networks.' },
  { name: 'Michelin', category: 'Tyres & Rubber', industry: 'Premium Radial Tyres', description: 'Port container evacuation and secure national warehouse storage.' },
  { name: 'Falken', category: 'Tyres & Rubber', industry: 'High-Performance Tyres', description: 'Import container clearance and pan-India depot logistics.' },
  { name: 'Apollo Tyres', category: 'Tyres & Rubber', industry: 'Commercial & Passenger Tyres', description: 'Plant-to-depot primary line haul and raw rubber transit.' },
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  { city: 'Delhi (Head Office)', state: 'Delhi NCR', type: 'Head Office', address: '308, Rishabh Corporate Tower, Karkardooma Community Centre, Delhi - 110092', phone: '+91 11 43026300', email: 'delhi.ho@cfclogistics.in' },
  { city: 'New Delhi (Corporate Sales)', state: 'Delhi NCR', type: 'Corporate Office', address: 'A-20, First Floor, Okhla Phase 1, New Delhi - 110020', phone: '+91 8287 703703', email: 'manmohansharma@cfclogistics.in' },
  { city: 'Nhava Sheva / JNPT', state: 'Maharashtra', type: 'Port Hub', address: 'Plot No. 12, Dronagiri Node, Sector 2, Uran, Navi Mumbai - 400707', phone: '+91 22 27241200', email: 'nhavasheva@cfclogistics.in' },
  { city: 'Mundra Port', state: 'Gujarat', type: 'Port Hub', address: 'CFC Logistics Terminal Desk, Port User Building, APSEZ, Mundra - 370421', phone: '+91 2838 271400', email: 'mundra@cfclogistics.in' },
  { city: 'Pipavav Port', state: 'Gujarat', type: 'Port Hub', address: 'Logistics Zone, Post Ucchaiya, Rajula, Amreli Dist, Pipavav - 365560', phone: '+91 2794 286200', email: 'pipavav@cfclogistics.in' },
  { city: 'Chennai Port', state: 'Tamil Nadu', type: 'Port Hub', address: 'No. 44, Moore Street, George Town, Near Port Gate No. 1, Chennai - 600001', phone: '+91 44 25261800', email: 'chennai@cfclogistics.in' },
  { city: 'Mumbai', state: 'Maharashtra', type: 'Regional Hub', address: 'Truck Terminal Complex, Wadala, Mumbai - 400037', phone: '+91 22 24158900', email: 'mumbai@cfclogistics.in' },
  { city: 'Kolkata', state: 'West Bengal', type: 'Regional Hub', address: 'Transport Depot Road, Taratala, Kolkata - 700088', phone: '+91 33 24017600', email: 'kolkata@cfclogistics.in' },
  { city: 'Bengaluru', state: 'Karnataka', type: 'Regional Hub', address: 'Bommasandra Industrial Area, Hosur Road, Bengaluru - 560099', phone: '+91 80 27834500', email: 'bengaluru@cfclogistics.in' },
  { city: 'Pune', state: 'Maharashtra', type: 'Regional Hub', address: 'MIDC Chakan Industrial Zone, Phase II, Pune - 410501', phone: '+91 2135 678200', email: 'pune@cfclogistics.in' },
  { city: 'Ahmedabad', state: 'Gujarat', type: 'Regional Hub', address: 'Aslali Bypass Logistics Park, Ahmedabad - 382427', phone: '+91 79 25712100', email: 'ahmedabad@cfclogistics.in' },
  { city: 'Ludhiana', state: 'Punjab', type: 'Branch Office', address: 'Transport Nagar, Sherpur Chowk, Ludhiana - 141009', phone: '+91 161 2541300', email: 'ludhiana@cfclogistics.in' },
  { city: 'Jaipur', state: 'Rajasthan', type: 'Branch Office', address: 'VKI Area, Road No. 14, Sikar Road, Jaipur - 302013', phone: '+91 141 2331900', email: 'jaipur@cfclogistics.in' },
  { city: 'Kanpur', state: 'Uttar Pradesh', type: 'Branch Office', address: 'Transport Nagar, Cooperganj, Kanpur - 208003', phone: '+91 512 2364700', email: 'kanpur@cfclogistics.in' },
  { city: 'Hyderabad', state: 'Telangana', type: 'Regional Hub', address: 'IDA Jeedimetla, Phase IV, Hyderabad - 500055', phone: '+91 40 23098100', email: 'hyderabad@cfclogistics.in' },
];

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 'c-01',
    title: 'Senior Manager – Supply Chain Operations',
    department: 'Supply Chain Management',
    location: 'Delhi NCR (Okhla / Karkardooma)',
    experience: '8–12 Years',
    type: 'Full-Time',
    description: 'Lead multi-modal transportation logistics, client account management, and oversee single-window supply chain operations for tier-1 automotive and FMCG partners.',
    requirements: [
      'In-depth knowledge of FTL ground transport, rail rake operations, and warehouse cross-docking.',
      'Proven experience managing enterprise client SLAs and route optimization.',
      'Excellent leadership skills managing pan-India fleet coordinators.',
    ],
  },
  {
    id: 'c-02',
    title: 'Fleet Logistics Controller & Telematics Lead',
    department: 'Fleet & Haulage Operations',
    location: 'Ahmedabad / Mumbai Hub',
    experience: '4–7 Years',
    type: 'Full-Time',
    description: 'Monitor daily movements of CFC’s 1,580 commercial vehicles using real-time GPS telematics, driver dispatch schedules, transit safety protocols, and fuel efficiency audits.',
    requirements: [
      'Hands-on experience with GPS fleet management software and trip lifecycle management.',
      'Strong crisis resolution capability for in-transit mechanical, route, or weather disruptions.',
      'Familiarity with Motor Vehicle Act norms and carrier compliance.',
    ],
  },
  {
    id: 'c-03',
    title: 'Customs Clearance Executive (Port Operations)',
    department: 'Port & Customs Documentation',
    location: 'Nhava Sheva (JNPT) / Mundra',
    experience: '3–6 Years',
    type: 'Full-Time',
    description: 'Execute import and export customs documentation, port gate-in/gate-out filings, bill of entry assessments, and container evacuation coordination at major port terminals.',
    requirements: [
      'Working knowledge of ICEGATE, port CFS operations, and customs tariff classification.',
      'Liaison experience with customs inspectors, shipping lines, and port authorities.',
      'Strict adherence to regulatory timelines and zero-demurrage protocols.',
    ],
  },
  {
    id: 'c-04',
    title: 'Warehouse & Inventory Supervisor',
    department: 'Warehousing & 3PL',
    location: 'Pune (Chakan) / Ludhiana',
    experience: '3–5 Years',
    type: 'Full-Time',
    description: 'Supervise daily warehouse operations across 40,000+ sq. ft. storage nodes, overseeing pick & pack, FIFO/LIFO tracking, computerized inventory auditing, and JIT dispatching.',
    requirements: [
      'Proficiency in WMS barcode scanning, stock reconciliation, and cycle counting.',
      'Strong safety enforcement for material handling equipment (forklifts, stackers).',
      'Experience in tyre, electrical, or automotive component storage.',
    ],
  },
];
