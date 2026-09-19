export const societyData = {
  id: 'SOC-0042',
  name: 'Karnataka Contract Labour & Transport Co-operative Society Ltd.',
  shortName: 'KCLS Society #42',
  registrationNo: 'KCS/BLR-E/4920/1988/W42',
  registeredAct: 'Karnataka Co-operative Societies Act, 1959',
  cluster: 'Ward #42 Indiranagar Cluster, Bengaluru Urban',
  auditGrade: 'Grade A (NABARD / RCS Audited 2024)',
  admin: {
    name: 'Shivakumar Swamy',
    designation: 'Chief Secretary & Operations Steward',
    phone: '+91 94481 20491',
    email: 'secretary@kcls-coop42.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  kpis: {
    activeWorkers: 84,
    totalWorkers: 108,
    workerTrend: '+6 this month',
    todaysJobs: 32,
    inProgress: 11,
    completed: 14,
    upcoming: 5,
    needsAttention: 2,
    todaysEarnings: '₹48,620',
    workerSharePercent: '85%+',
    avgWorkerPayout: '₹1,519',
    utilization: 78,
    utilizationNote: 'Peak capacity anticipated at 14:00'
  },
  operationsBreakdown: [
    { label: 'Completed', count: 14, percent: 44, color: 'bg-darkCharcoal', textColor: 'text-darkCharcoal', tab: 'completed' },
    { label: 'In Progress', count: 11, percent: 34, color: 'bg-yellowAccent', textColor: 'text-yellowAccent', tab: 'in_progress' },
    { label: 'Upcoming', count: 5, percent: 16, color: 'bg-coopGreen', textColor: 'text-coopGreen', tab: 'upcoming' },
    { label: 'Needs Attention', count: 2, percent: 6, color: 'bg-alertCoral', textColor: 'text-alertCoral', tab: 'attention' }
  ],
  attentionItems: [
    { id: 'att-1', title: '3 workers awaiting verification', subtitle: 'Aadhaar, trade cert & police clearances uploaded', action: 'Review', route: 'people_verification', type: 'verification' },
    { id: 'att-2', title: '2 emergency jobs unassigned', subtitle: 'Indiranagar Ward #42 — Sparking MCB & Concealed Pipe Burst', action: 'Assign', route: 'emergency_jobs', type: 'emergency' },
    { id: 'att-3', title: '4 certifications expiring this month', subtitle: 'NSQF Level 4 Electrical licenses due for bi-annual renewal', action: 'View list', route: 'certifications', type: 'cert' },
    { id: 'att-4', title: '1 payment escrow reconciliation', subtitle: 'Job #NX-94791 cash collection variance ₹120 to ledger', action: 'Reconcile', route: 'finance', type: 'finance' }
  ],
  schedule: [
    { id: 'sch-1', time: '09:00', service: 'AC Compressor Diagnostic', location: 'Whitefield', worker: 'Ramesh Kumar', role: 'Lead Master Electrician', rating: 4.94, status: 'completed' },
    { id: 'sch-2', time: '10:30', service: 'Circuit Breaker Tripping', location: 'Indiranagar', worker: 'Suresh M.', role: 'Electrician', rating: 4.88, status: 'in_progress' },
    { id: 'sch-3', time: '12:00', service: 'Concealed Pipe Leak', location: 'Domlur', worker: 'Mahesh G.', role: 'Senior Plumber', rating: 5.0, status: 'in_progress' },
    { id: 'sch-4', time: '15:30', service: 'Post-Monsoon Deep Cleaning', location: 'Koramangala', worker: 'Lakshmi Bai', role: 'Lead Cleaning Specialist', rating: 4.95, status: 'upcoming' }
  ],
  serviceDemand: [
    { id: 'elec', name: 'Electrical', requests: 28, capacity: 88, highlight: true },
    { id: 'plumb', name: 'Plumbing', requests: 21, capacity: 66, highlight: false },
    { id: 'clean', name: 'Cleaning', requests: 17, capacity: 53, highlight: false },
    { id: 'app', name: 'Appliance', requests: 13, capacity: 41, highlight: false },
    { id: 'carp', name: 'Carpentry', requests: 9, capacity: 28, highlight: false }
  ],
  workers: [
    {
      id: 'WRK-001',
      name: 'Ramesh Kumar',
      trade: 'Lead Master Electrician',
      status: 'Available',
      verification: 'Verified',
      jobsDone: 1280,
      rating: 4.94,
      earnings: '₹42,800',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      coopShares: 25,
      dividends: '₹8,450',
      welfareReserve: '₹14,820',
      nsqfLevel: 'NSQF Level 4 Electrical Specialist',
      certifications: [
        { title: 'ITI Electrician National Trade Certificate', year: 2016, issuer: 'NCVT Govt of India' },
        { title: 'Cooperative Safety & High Voltage License', year: 2023, issuer: 'Karnataka Co-op Registrar' }
      ],
      skills: ['Domestic Wiring', 'MCB Diagnostics', '3-Phase Industrial Panels', 'Solar Inverter Setup']
    },
    {
      id: 'WRK-002',
      name: 'Suresh M.',
      trade: 'Electrician',
      status: 'On Job',
      verification: 'Verified',
      jobsDone: 940,
      rating: 4.88,
      earnings: '₹36,200',
      phone: '+91 98765 43211',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      coopShares: 20,
      dividends: '₹6,750',
      welfareReserve: '₹11,400',
      nsqfLevel: 'NSQF Level 3 Electrical Technician',
      certifications: [
        { title: 'ITI Electrical Wireman', year: 2018, issuer: 'Karnataka Technical Board' }
      ],
      skills: ['Switchboard Wiring', 'Appliance Earthing', 'Emergency Generator Connectors']
    },
    {
      id: 'WRK-003',
      name: 'Mahesh G.',
      trade: 'Senior Plumber',
      status: 'On Job',
      verification: 'Verified',
      jobsDone: 810,
      rating: 5.0,
      earnings: '₹34,100',
      phone: '+91 98765 43212',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      coopShares: 22,
      dividends: '₹7,100',
      welfareReserve: '₹12,250',
      nsqfLevel: 'NSQF Level 4 Plumbing & Hydro',
      certifications: [
        { title: 'Plumbing Trade Certificate', year: 2017, issuer: 'National Skill Registry' }
      ],
      skills: ['Concealed Leak Detection', 'Pressure Pump Calibration', 'Drain Camera Inspection']
    },
    {
      id: 'WRK-004',
      name: 'Lakshmi Bai',
      trade: 'Lead Cleaning Specialist',
      status: 'Off Duty',
      verification: 'Verified',
      jobsDone: 1850,
      rating: 4.95,
      earnings: '₹48,900',
      phone: '+91 98765 43213',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      coopShares: 30,
      dividends: '₹9,800',
      welfareReserve: '₹16,400',
      nsqfLevel: 'Sanitation & Hygiene Protocol Lead',
      certifications: [
        { title: 'Industrial Degreasing & Sanitization Lead', year: 2019, issuer: 'Skill India / NSDC' }
      ],
      skills: ['Post-Monsoon Deep Clean', 'Kitchen Degreasing', 'Upholstery Steam Cleaning']
    },
    {
      id: 'WRK-005',
      name: 'Prakash R.',
      trade: 'Appliance Technician',
      status: 'Available',
      verification: 'Pending Review',
      jobsDone: 112,
      rating: 4.78,
      earnings: '₹12,400',
      phone: '+91 98765 43214',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      coopShares: 10,
      dividends: '₹2,100',
      welfareReserve: '₹3,400',
      nsqfLevel: 'NSQF Level 3 HVAC & Refrigerator',
      certifications: [
        { title: 'Appliance Repair Trade Certificate', year: 2022, issuer: 'Karnataka Technical Registry' }
      ],
      skills: ['Inverter PCB Diagnostics', 'Washing Machine Motors', 'Microwave Magnetron']
    }
  ],
  emergencyJobs: [
    {
      id: 'EMG-901',
      service: 'Sparking Main MCB & Smelling Plastic',
      customer: 'Ananya S.',
      address: 'Flat 402, Sai Residency, 12th Main Indiranagar',
      distanceKm: 1.2,
      waitingMin: 4,
      priority: 'CRITICAL',
      aiBrief: 'Overheating 32A DP switch with visible arc marks; immediate circuit disconnection required.',
      assignedWorker: null
    },
    {
      id: 'EMG-902',
      service: 'Basement Inundation & Sump Overflow',
      customer: 'Karthik Rao',
      address: 'Villa 14, Palm Grove, Domlur Inner Ring Rd',
      distanceKm: 2.4,
      waitingMin: 9,
      priority: 'HIGH',
      aiBrief: 'Sump non-return valve jammed open; flood pump tripping breaker.',
      assignedWorker: null
    }
  ]
};

export const federationData = {
  id: 'FED-001',
  name: 'Nexro Apex Labour Cooperative Federation',
  shortName: 'Nexro Apex Federation',
  registrationNo: 'MSCS/CR/82/2012 · In affiliation with NLCF New Delhi',
  jurisdiction: 'Karnataka & South Regional Federation Corridor',
  officer: {
    name: 'Dr. B.R. Hegde',
    designation: 'Apex Managing Director & Registrar Liaison',
    phone: '+91 94480 11002',
    email: 'md.hegde@nexro-federation.coop',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  kpis: {
    totalSocieties: 126,
    operationalSocieties: 118,
    auditPendingSocieties: 8,
    totalWorkers: 8420,
    workerTrend: '+142 this month',
    activeToday: 3284,
    jobsThisWeek: 4218,
    networkVolume: '₹18.4L',
    networkVolumeNote: '85%+ direct worker distribution via escrow',
    utilization: 78,
    fulfillmentRate: 96.4,
    avgSatisfaction: 4.82,
    emergencyResponseMin: 8
  },
  networkHealth: {
    societiesOperationalRatio: '118 / 126',
    workersActiveRatio: '3,284 / 8,420',
    fulfillmentRate: '96.4%',
    avgRating: '4.82 ★',
    emergencyResponse: '8 min'
  },
  societiesList: [
    { id: 'SOC-0042', name: 'Karnataka Contract Labour & Transport Co-op Ltd.', location: 'Bengaluru (Ward #42 Indiranagar)', workers: 84, activeToday: 61, jobsWeek: 142, utilization: 78, rating: 4.91, status: 'Operational', grade: 'A' },
    { id: 'SOC-0018', name: 'Domlur Labour Cooperative Society Ltd.', location: 'Bengaluru (Domlur & Old Airport Rd)', workers: 92, activeToday: 68, jobsWeek: 156, utilization: 82, rating: 4.89, status: 'Operational', grade: 'A' },
    { id: 'SOC-0009', name: 'Ulsoor Artisan & Handyman Co-operative Ltd.', location: 'Bengaluru (Ulsoor & Halasuru)', workers: 76, activeToday: 54, jobsWeek: 118, utilization: 75, rating: 4.85, status: 'Operational', grade: 'A' },
    { id: 'SOC-0031', name: 'Malleshwaram Trade Labour Co-operative Ltd.', location: 'Bengaluru West', workers: 110, activeToday: 82, jobsWeek: 184, utilization: 79, rating: 4.93, status: 'Operational', grade: 'A' },
    { id: 'SOC-0054', name: 'Koramangala Community Service Co-op Ltd.', location: 'Bengaluru South', workers: 128, activeToday: 96, jobsWeek: 212, utilization: 84, rating: 4.90, status: 'Operational', grade: 'A' },
    { id: 'SOC-0077', name: 'Whitefield Tech Corridor Labour Co-op Ltd.', location: 'Bengaluru East', workers: 144, activeToday: 104, jobsWeek: 248, utilization: 81, rating: 4.87, status: 'Operational', grade: 'B' },
    { id: 'SOC-10959', name: 'Uralungal Labour Contract Co-op Society (ULCCS)', location: 'Calicut / Regional Benchmark', workers: 1420, activeToday: 980, jobsWeek: 1840, utilization: 89, rating: 4.98, status: 'Operational', grade: 'A+' }
  ],
  demandAIForecast: {
    horizon: 'Tomorrow, Sep 13',
    expectedRequests: 2840,
    surgePercent: 18,
    modelConfidence: 87,
    reasoning: 'Monsoon lightning storm surge predicted across Hebbal, Yelahanka and North Bengaluru residential belts.',
    sectors: [
      { trade: 'Electrical Services', expected: 284, capacity: 221, diff: -63, status: 'acute_shortage', color: 'text-alertCoral' },
      { trade: 'Plumbing & Hydro', expected: 198, capacity: 205, diff: 7, status: 'surplus', color: 'text-coopGreen' },
      { trade: 'Deep Cleaning', expected: 410, capacity: 388, diff: -22, status: 'shortage', color: 'text-yellowAccent' },
      { trade: 'Appliance Repair', expected: 165, capacity: 170, diff: 5, status: 'balanced', color: 'text-coopGreen' }
    ],
    rebalancingRecommendation: {
      id: 'REC-2026-0913',
      sector: 'Electrical',
      targetCluster: 'North Bengaluru (Hebbal / Yelahanka)',
      deficitJobs: 63,
      allocationPlan: [
        { societyId: 'SOC-0042', societyName: 'Karnataka Contract Labour Co-op #42', allocated: 20, transitMin: 18, distanceKm: 4.2 },
        { societyId: 'SOC-0018', societyName: 'Domlur Labour Co-op #18', allocated: 16, transitMin: 22, distanceKm: 6.1 },
        { societyId: 'SOC-0009', societyName: 'Ulsoor Artisan Co-op #09', allocated: 14, transitMin: 20, distanceKm: 5.8 },
        { societyId: 'SOC-0031', societyName: 'Malleshwaram Co-op', allocated: 13, transitMin: 14, distanceKm: 3.4 }
      ],
      aiExplanation: 'Historical monsoon lightning trip surge (+32% in Hebbal/Yelahanka) · Technicians have active NSQF Level 4 certifications · Travel radius within 25 minutes · Average base utilization 64% allows safe overtime without worker fatigue violation.',
      approved: false
    }
  },
  welfareOverview: {
    totalWelfareReserve: '₹1.42 Crores',
    insuranceCoverage: '100% (₹5 Lakhs / Worker)',
    workersCovered: 8420,
    microLoansDisbursed: '₹18.6 Lakhs',
    pendingClaims: 3
  }
};
