export const WORKER_PROFILE = {
  id: 'w1',
  name: 'Rajesh Kumar',
  trade: 'Lead Master Electrician & Wireman',
  society: 'Indiranagar Gig Workers Co-op #42',
  societyRegNo: 'DRB-3/RGN/COOP/2022/42',
  federation: 'Karnataka State Gig Cooperative Federation (Verified)',
  rating: 4.94,
  reviewsCount: 684,
  completedJobs: 1420,
  onTimeRate: '99.2%',
  avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
  
  // Financial & Welfare
  todayEarnings: 1420,
  todayJobsCount: 4,
  weeklyEarnings: 8940,
  welfareReserve: 14820,
  coopDividendsReceived: 62400,
  coopShares: '25 Class-A Member Shares',
  insurancePolicyNo: 'KGCF-MED-849102',
  insuranceCoverage: '₹5,00,000 Group Hospitalization & Accidental Shield',
  
  // Certifications
  certifications: [
    { title: 'NSQF Level 5 Master Wireman', issuer: 'National Skill Development Corporation (Govt of India)', year: 2021, verified: true },
    { title: 'ITI Diploma in Electrical Trades', issuer: 'Govt Industrial Training Institute Bengaluru', year: 2018, verified: true },
    { title: 'Concealed Conduit & Fire Safety License', issuer: 'Karnataka Electrical Inspectorate', year: 2022, verified: true },
  ],
  skills: ['3-Phase Circuit Balancing', 'MCB Diagnostics', 'Solar Inverter Setup', 'Concealed Conduit Wiring', 'Smart Meter Integration'],
};

export const INCOMING_JOB_REQUEST = {
  id: 'NX-94812',
  service: 'Electrical & Circuit Diagnostics',
  customerName: 'Ananya S.',
  customerPhone: '+91 98450 12345 (Masked)',
  address: '#402, 12th Main, HAL 2nd Stage, Indiranagar',
  distanceKm: 1.2,
  etaMinutes: 6,
  problemDiagnosis: 'Water dripping onto main switchboard; MCB tripping repeatedly.',
  aiTriageTag: 'HIGH PRIORITY HAZARD',
  directPayout: 299,
  welfareContribution: 9,
  estimatedDuration: '30-45 mins',
  startOtp: '5829',
  completionOtp: '9142',
};

export const RECENT_JOB_LEDGER = [
  { id: 'NX-94810', service: 'Ceiling Fan Rewiring', time: '1:30 PM', directPay: 249, welfareCredit: 8, netEarned: 249, status: 'Settled to Bank' },
  { id: 'NX-94808', service: 'Geyser MCB Replacement', time: '11:15 AM', directPay: 399, welfareCredit: 12, netEarned: 399, status: 'Settled to Bank' },
  { id: 'NX-94801', service: 'Living Room 3-Phase Check', time: '9:45 AM', directPay: 449, welfareCredit: 14, netEarned: 449, status: 'Settled to Bank' },
  { id: 'NX-94794', service: 'Switchboard Socket Fix', time: 'Yesterday', directPay: 199, welfareCredit: 6, netEarned: 199, status: 'Settled to Bank' },
];

export const WELFARE_TRANSACTIONS = [
  { id: 'WT-8401', desc: 'Welfare Contribution (Job #NX-94812)', date: 'Today', amount: '+₹9', type: 'credit' },
  { id: 'WT-8399', desc: 'Welfare Contribution (Job #NX-94810)', date: 'Today', amount: '+₹8', type: 'credit' },
  { id: 'WT-8380', desc: 'Annual Society Profit Dividend Share', date: 'Aug 2026', amount: '+₹4,200', type: 'dividend' },
  { id: 'WT-8120', desc: 'Zero-Interest Health Equipment Advance', date: 'Jun 2026', amount: '-₹5,000', type: 'advance' },
];
