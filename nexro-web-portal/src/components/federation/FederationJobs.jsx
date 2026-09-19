import React, { useState } from 'react';
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
  ExternalLink,
  Building2
} from 'lucide-react';

export default function FederationJobs() {
  const [activeCluster, setActiveCluster] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const mockJobs = [
    {
      id: 'NX-94812',
      society: 'Karnataka Contract Labour Co-op #42',
      service: 'Circuit Breaker Tripping & Load Diagnostic',
      customer: 'Arjun Sharma (Indiranagar)',
      worker: 'Ramesh Kumar (Master Electrician)',
      cluster: 'Indiranagar Cluster',
      timestamp: 'Today · 10:30 AM',
      amount: '₹299',
      workerPayout: '₹254 (85%)',
      status: 'in_progress',
      escrowStatus: 'Secured in Escrow'
    },
    {
      id: 'NX-94811',
      society: 'Karnataka Contract Labour Co-op #42',
      service: 'AC Compressor Gas Pressure Calibration',
      customer: 'Pooja Hegde (Whitefield)',
      worker: 'Ramesh Kumar (Master Electrician)',
      cluster: 'Whitefield Cluster',
      timestamp: 'Today · 09:00 AM',
      amount: '₹599',
      workerPayout: '₹509 (85%)',
      status: 'completed',
      escrowStatus: 'Settled to Passbook'
    },
    {
      id: 'NX-94808',
      society: 'Bangalore Urban Labour Co-op #18',
      service: 'Emergency Water Tank Overflow Sensor Repair',
      customer: 'Suresh Rao (Jayanagar)',
      worker: 'Anand Murthy (Plumbing Lead)',
      cluster: 'Jayanagar Cluster',
      timestamp: 'Today · 11:15 AM',
      amount: '₹499',
      workerPayout: '₹424 (85%)',
      status: 'in_progress',
      escrowStatus: 'Secured in Escrow'
    },
    {
      id: 'NX-94805',
      society: 'Koramangala Technicians Society #29',
      service: 'Inverter Battery Deep Cycle Maintenance',
      customer: 'Kavita Menon (Koramangala)',
      worker: 'Sunil Rao (Solar & UPS Specialist)',
      cluster: 'Koramangala Cluster',
      timestamp: 'Today · 08:45 AM',
      amount: '₹649',
      workerPayout: '₹551 (85%)',
      status: 'completed',
      escrowStatus: 'Settled to Passbook'
    },
    {
      id: 'NX-94802',
      society: 'Hubli Labour Cooperative #04',
      service: 'Submersible Pump Bearing Overhaul',
      customer: 'Ganesh Patil (Vidyanagar)',
      worker: 'Basavaraj K. (Senior Mechanic)',
      cluster: 'North Karnataka Cluster',
      timestamp: 'Today · 11:00 AM',
      amount: '₹899',
      workerPayout: '₹764 (85%)',
      status: 'upcoming',
      escrowStatus: 'Secured in Escrow'
    }
  ];

  const filteredJobs = mockJobs.filter(j => {
    const matchesCluster = activeCluster === 'all' || j.cluster.toLowerCase().includes(activeCluster.toLowerCase());
    const matchesSearch = j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCluster && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Statewide Booking Operations</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Real-time audit across 126 primary labour cooperative societies in Karnataka.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark border border-coopGreen/20">
            ● 2,840 Active Today
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-warmSurface border border-hairline text-darkCharcoal">
            Avg SLA Response: 9.2 mins
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search booking ID, society or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-canvas border border-hairline text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellowAccent text-darkCharcoal"
          />
        </div>

        {/* Cluster Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All Clusters' },
            { id: 'indiranagar', label: 'Indiranagar' },
            { id: 'koramangala', label: 'Koramangala' },
            { id: 'whitefield', label: 'Whitefield' },
            { id: 'jayanagar', label: 'Jayanagar' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCluster(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeCluster === tab.id 
                  ? 'bg-darkCharcoal text-white shadow-pill' 
                  : 'bg-warmSurface text-neutral-600 hover:bg-canvas border border-hairline'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmSurface border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-4">Primary Society</th>
                <th className="py-4 px-4">Service & Customer</th>
                <th className="py-4 px-4">Assigned Member</th>
                <th className="py-4 px-4">Cluster & Time</th>
                <th className="py-4 px-4">Fee Breakdown</th>
                <th className="py-4 px-4">Escrow Status</th>
                <th className="py-4 px-6 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-canvas/60 transition group">
                  <td className="py-4 px-6 font-mono font-bold text-darkCharcoal">
                    {job.id}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-darkCharcoal">{job.society}</p>
                    <span className="text-[10px] text-neutral-500">{job.cluster}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-darkCharcoal">{job.service}</p>
                    <p className="text-[10px] text-neutral-500">{job.customer}</p>
                  </td>
                  <td className="py-4 px-4 font-medium text-darkCharcoal">
                    {job.worker}
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-darkCharcoal font-medium">{job.cluster}</p>
                    <p className="text-[10px] text-neutral-500">{job.timestamp}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-darkCharcoal">{job.amount}</span>
                    <p className="text-[10px] text-coopDark font-semibold">{job.workerPayout} cut</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-coopSoft text-coopDark font-bold text-[10px]">
                      <ShieldCheck size={12} /> {job.escrowStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 rounded-full bg-warmSurface hover:bg-canvas border border-hairline text-darkCharcoal font-bold text-xs"
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

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-lg w-full p-8 border border-hairline shadow-elevated relative">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-neutral-500">{selectedJob.id}</span>
              <span className="px-2 py-0.5 rounded-full bg-coopSoft text-coopDark text-[10px] font-bold">
                Federation Verified
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-darkCharcoal">{selectedJob.service}</h3>
            
            <div className="mt-4 p-4 rounded-2xl bg-warmSurface border border-hairline space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Operating Society:</span>
                <span className="font-bold text-darkCharcoal">{selectedJob.society}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Jurisdiction Cluster:</span>
                <span className="font-semibold text-darkCharcoal">{selectedJob.cluster}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Assigned Member:</span>
                <span className="font-semibold text-darkCharcoal">{selectedJob.worker}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Statutory Worker Payout (85%):</span>
                <span className="font-mono font-bold text-coopDark">{selectedJob.workerPayout}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="w-full mt-6 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold shadow-pill"
            >
              Close Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
