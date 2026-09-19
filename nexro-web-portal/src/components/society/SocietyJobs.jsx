import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Phone,
  Camera,
  ExternalLink
} from 'lucide-react';

export default function SocietyJobs() {
  const { setEmergencyDrawerOpen } = useAuth();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const mockJobs = [
    {
      id: 'NX-94812',
      service: 'Circuit Breaker Tripping & Load Diagnostic',
      customer: 'Arjun Sharma',
      worker: 'Ramesh Kumar',
      workerRole: 'Master Electrician',
      location: '12th Main, Indiranagar, Ward #42',
      schedule: 'Today · 10:30 AM',
      amount: '₹299',
      workerPayout: '₹254 (85%)',
      welfareCredit: '₹15 (5%)',
      societyOps: '₹30 (10%)',
      status: 'in_progress',
      escrowSecured: true,
      startOtp: '5829',
      customerProblem: 'Whenever AC and water heater run simultaneously, the main 32A MCB trips with a humming sound.',
      workerDiagnosis: 'Terminal screw loose on pole #2 causing resistance heating; replaced with ISI certified 32A breaker.',
      photoProof: true
    },
    {
      id: 'NX-94811',
      service: 'AC Compressor Gas Pressure Calibration',
      customer: 'Pooja Hegde',
      worker: 'Ramesh Kumar',
      workerRole: 'Master Electrician',
      location: 'Prestige Boulevard, Whitefield',
      schedule: 'Today · 09:00 AM',
      amount: '₹599',
      workerPayout: '₹509 (85%)',
      welfareCredit: '₹30 (5%)',
      societyOps: '₹60 (10%)',
      status: 'completed',
      escrowSecured: true,
      startOtp: '4192',
      customerProblem: '1.5 ton split AC blowing lukewarm air since yesterday morning.',
      workerDiagnosis: 'R32 gas pressure restored to 125 PSI. Flange valve leakage tightened.',
      photoProof: true
    },
    {
      id: 'NX-94810',
      service: 'Concealed Bathroom Pipe Leak Detection',
      customer: 'Vikas Swamy',
      worker: 'Mahesh G.',
      workerRole: 'Senior Plumber',
      location: 'Domlur Inner Ring Road',
      schedule: 'Today · 12:00 PM',
      amount: '₹449',
      workerPayout: '₹381 (85%)',
      welfareCredit: '₹22 (5%)',
      societyOps: '₹46 (10%)',
      status: 'in_progress',
      escrowSecured: true,
      startOtp: '8901',
      customerProblem: 'Ceiling discoloration and dripping sound inside master bath duct.',
      workerDiagnosis: 'Thermal acoustic detector located hairline crack on CPVC hot water riser.',
      photoProof: false
    },
    {
      id: 'NX-94809',
      service: 'Post-Monsoon Floor Scrubbing & Degreasing',
      customer: 'Deepak N.',
      worker: 'Lakshmi Bai',
      workerRole: 'Lead Sanitation Pro',
      location: 'Koramangala 4th Block',
      schedule: 'Today · 03:30 PM',
      amount: '₹799',
      workerPayout: '₹679 (85%)',
      welfareCredit: '₹40 (5%)',
      societyOps: '₹80 (10%)',
      status: 'upcoming',
      escrowSecured: true,
      startOtp: '3310',
      customerProblem: 'Annual festival deep cleaning for 3BHK flat balcony and utility area.',
      workerDiagnosis: 'Scheduled dispatch; sanitation equipment kit pre-allocated.',
      photoProof: false
    }
  ];

  const filteredJobs = mockJobs.filter(j => {
    const matchesFilter = activeFilter === 'all' || j.status === activeFilter;
    const matchesSearch = j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.worker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Job Operations Queue</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Track real-time bookings, worker arrival OTP verification, and escrow settlement status.
          </p>
        </div>

        <button
          onClick={() => setEmergencyDrawerOpen(true)}
          className="px-4 py-2.5 rounded-full bg-alertCoral hover:bg-red-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
        >
          <AlertCircle size={14} />
          Emergency Job Queue (2 Unassigned)
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search booking ID, customer or worker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-canvas border border-hairline text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-coopGreen text-darkCharcoal"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All (32)' },
            { id: 'in_progress', label: 'In Progress (11)' },
            { id: 'completed', label: 'Completed (14)' },
            { id: 'upcoming', label: 'Upcoming (5)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeFilter === tab.id 
                  ? 'bg-darkCharcoal text-white shadow-pill' 
                  : 'bg-warmSurface text-neutral-600 hover:bg-canvas border border-hairline'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmSurface border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-4">Service Required</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Assigned Worker</th>
                <th className="py-4 px-4">Location & Schedule</th>
                <th className="py-4 px-4">Cooperative Fee</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-canvas/60 transition group">
                  <td className="py-4 px-6 font-mono font-bold text-darkCharcoal">
                    {job.id}
                  </td>
                  <td className="py-4 px-4 font-bold text-darkCharcoal">
                    {job.service}
                  </td>
                  <td className="py-4 px-4 text-neutral-600 font-medium">
                    {job.customer}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-darkCharcoal">{job.worker}</span>
                    <p className="text-[10px] text-neutral-500">{job.workerRole}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-darkCharcoal font-medium">{job.location}</p>
                    <p className="text-[10px] text-neutral-500">{job.schedule}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-darkCharcoal">{job.amount}</span>
                    <p className="text-[10px] text-coopDark font-semibold">85% Direct Worker Cut</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      job.status === 'completed' ? 'bg-darkCharcoal text-white' :
                      job.status === 'in_progress' ? 'bg-yellowSoft text-darkCharcoal border border-yellowAccent/40' :
                      'bg-coopSoft text-coopDark'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        job.status === 'completed' ? 'bg-white' :
                        job.status === 'in_progress' ? 'bg-yellowAccent' :
                        'bg-coopGreen'
                      }`} />
                      {job.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-1.5 rounded-full bg-warmSurface hover:bg-canvas border border-hairline text-darkCharcoal font-bold text-xs transition"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Audit Detail Modal (4-column information hierarchy from prompt) */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-2xl w-full p-8 border border-hairline shadow-elevated relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-neutral-500">{selectedJob.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-coopSoft text-coopDark text-[10px] font-bold">
                Escrow Secured
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-darkCharcoal">{selectedJob.service}</h3>
            
            {/* 4-Column Information Hierarchy */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-warmSurface border border-hairline my-6 text-xs">
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Customer</p>
                <p className="font-bold text-darkCharcoal mt-0.5">{selectedJob.customer}</p>
                <p className="text-[11px] text-neutral-500">Indiranagar</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Worker</p>
                <p className="font-bold text-darkCharcoal mt-0.5">{selectedJob.worker}</p>
                <p className="text-[11px] text-coopDark font-semibold">Start OTP: {selectedJob.startOtp}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Schedule</p>
                <p className="font-bold text-darkCharcoal mt-0.5">{selectedJob.schedule}</p>
                <p className="text-[11px] text-neutral-500">Live GPS Monitored</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Co-op Payout</p>
                <p className="font-mono font-bold text-darkCharcoal mt-0.5">{selectedJob.workerPayout}</p>
                <p className="text-[11px] text-coopDark font-semibold">+₹15 to Welfare</p>
              </div>
            </div>

            {/* Diagnostic & Work Proof */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-canvas border border-hairline text-xs">
                <span className="font-bold text-darkCharcoal block mb-1">Customer Problem Intake Description:</span>
                <p className="text-neutral-700 leading-relaxed font-sans">"{selectedJob.customerProblem}"</p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-hairline text-xs">
                <span className="font-bold text-darkCharcoal block mb-1">Worker Technical Diagnostic & Resolution:</span>
                <p className="text-neutral-700 leading-relaxed font-sans">"{selectedJob.workerDiagnosis}"</p>
              </div>

              {selectedJob.photoProof && (
                <div className="p-4 rounded-2xl bg-coopSoft/30 border border-coopGreen/20 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-coopDark font-bold">
                    <Camera size={16} /> Completed Work Photographic Proof Verified
                  </div>
                  <span className="text-[11px] text-neutral-500">Tamper-Proof Timestamped</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="w-full mt-6 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold shadow-pill"
            >
              Close Inspection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
