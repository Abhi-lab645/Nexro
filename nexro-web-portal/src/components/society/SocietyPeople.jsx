import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  Star, 
  Phone, 
  CheckCircle2, 
  X, 
  Clock, 
  Plus, 
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function SocietyPeople() {
  const { 
    workersList, 
    approveWorkerVerification, 
    selectedWorkerId, 
    setSelectedWorkerId 
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrade, setFilterTrade] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [addWorkerModalOpen, setAddWorkerModalOpen] = useState(false);

  const filteredWorkers = workersList.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.trade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrade = filterTrade === 'all' || w.trade.toLowerCase().includes(filterTrade.toLowerCase());
    return matchesSearch && matchesTrade;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">People & Member Rosters</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Manage cooperative shareholder-workers, NSQF certifications, and daily shifts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddWorkerModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-darkCharcoal hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-pill transition"
          >
            <Plus size={14} className="text-yellowAccent" />
            Add Worker Member
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by worker name, trade or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-canvas border border-hairline text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-coopGreen text-darkCharcoal"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['all', 'electrician', 'plumber', 'cleaning', 'appliance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterTrade(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
                filterTrade === cat 
                  ? 'bg-darkCharcoal text-white shadow-pill' 
                  : 'bg-warmSurface text-neutral-600 hover:bg-canvas border border-hairline'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Workers Roster Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmSurface border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Worker Member</th>
                <th className="py-4 px-4">Primary Trade</th>
                <th className="py-4 px-4">Verification</th>
                <th className="py-4 px-4">Availability</th>
                <th className="py-4 px-4">Jobs & Rating</th>
                <th className="py-4 px-4">Cumulative Earnings</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-canvas/60 transition group">
                  
                  {/* Worker identity */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={w.avatar} 
                        alt={w.name} 
                        className="w-10 h-10 rounded-full object-cover border border-hairline"
                      />
                      <div>
                        <div className="font-bold text-darkCharcoal text-sm flex items-center gap-1.5">
                          {w.name}
                          {w.verification === 'Verified' && (
                            <ShieldCheck size={14} className="text-coopGreen" />
                          )}
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono">{w.id} · {w.coopShares} Co-op Shares</span>
                      </div>
                    </div>
                  </td>

                  {/* Trade */}
                  <td className="py-4 px-4">
                    <span className="font-semibold text-darkCharcoal">{w.trade}</span>
                    <p className="text-[10px] text-neutral-500">{w.nsqfLevel}</p>
                  </td>

                  {/* Verification */}
                  <td className="py-4 px-4">
                    {w.verification === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-coopSoft text-coopDark font-bold text-[11px]">
                        <CheckCircle2 size={12} /> Verified Member
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellowSoft text-darkCharcoal font-bold text-[11px] border border-yellowAccent/40">
                        <Clock size={12} /> Pending Review
                      </span>
                    )}
                  </td>

                  {/* Availability */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      w.status === 'Available' ? 'bg-coopSoft text-coopDark' :
                      w.status === 'On Job' ? 'bg-yellowSoft text-darkCharcoal border border-yellowAccent/30' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        w.status === 'Available' ? 'bg-coopGreen' :
                        w.status === 'On Job' ? 'bg-yellowAccent' :
                        'bg-neutral-400'
                      }`} />
                      {w.status}
                    </span>
                  </td>

                  {/* Jobs & Rating */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-darkCharcoal">{w.jobsDone} jobs</div>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <Star size={11} className="fill-yellowAccent text-yellowAccent" /> {w.rating} / 5.0
                    </div>
                  </td>

                  {/* Earnings */}
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-darkCharcoal">{w.earnings}</div>
                    <div className="text-[10px] text-coopDark font-semibold">+₹{w.welfareReserve} Welfare</div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {w.verification !== 'Verified' && (
                        <button
                          onClick={() => approveWorkerVerification(w.id)}
                          className="px-3 py-1 rounded-full bg-coopGreen hover:bg-coopDark text-white text-xs font-bold transition shadow-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedWorker(w)}
                        className="px-3 py-1 rounded-full bg-warmSurface hover:bg-canvas border border-hairline text-darkCharcoal font-semibold text-xs transition"
                      >
                        Profile
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-xl w-full p-8 border border-hairline shadow-elevated relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedWorker(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <img 
                src={selectedWorker.avatar} 
                alt={selectedWorker.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-coopGreen"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-bold text-darkCharcoal">{selectedWorker.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-coopSoft text-coopDark text-xs font-bold">
                    {selectedWorker.verification}
                  </span>
                </div>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">{selectedWorker.trade}</p>
                <p className="text-[11px] text-neutral-500">ID: {selectedWorker.id} · Society #42 Shareholder Member</p>
              </div>
            </div>

            {/* Cooperative Equity & Dividends */}
            <div className="p-4 rounded-3xl bg-warmSurface border border-hairline my-4 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Co-op Shares</p>
                <p className="font-serif text-xl font-bold text-darkCharcoal mt-0.5">{selectedWorker.coopShares}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Annual Dividends</p>
                <p className="font-serif text-xl font-bold text-coopDark mt-0.5">{selectedWorker.dividends}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase">Welfare Reserve</p>
                <p className="font-serif text-xl font-bold text-darkCharcoal mt-0.5">₹{selectedWorker.welfareReserve}</p>
              </div>
            </div>

            {/* Certifications & NSQF */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-darkCharcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award size={14} className="text-coopGreen" /> Statutory Trade Certifications
              </h4>
              <div className="space-y-2">
                {selectedWorker.certifications.map((c, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-canvas border border-hairline flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-darkCharcoal">{c.title}</p>
                      <p className="text-[11px] text-neutral-500">{c.issuer}</p>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-neutral-600 bg-white px-2 py-0.5 rounded-full border border-hairline">
                      {c.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-darkCharcoal uppercase tracking-wider mb-2">Verified Sub-Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWorker.skills.map((s, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-canvas text-darkCharcoal border border-hairline">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedWorker(null)}
              className="w-full mt-6 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold shadow-pill"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Add Worker Modal */}
      {addWorkerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-md w-full p-8 border border-hairline shadow-elevated relative">
            <button 
              onClick={() => setAddWorkerModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-darkCharcoal mb-2">Onboard Worker Member</h3>
            <p className="text-xs text-neutral-600 mb-6">Enroll a verified tradesperson into Karnataka Contract Labour Co-op #42.</p>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1">Full Legal Name</label>
                <input type="text" placeholder="e.g. Prakash Rao" className="w-full px-4 py-2 rounded-2xl border border-hairline bg-canvas text-xs" />
              </div>
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1">Primary Trade</label>
                <select className="w-full px-4 py-2 rounded-2xl border border-hairline bg-canvas text-xs font-medium">
                  <option>Electrician (NSQF Level 4)</option>
                  <option>Plumber & Hydro Specialist</option>
                  <option>Lead Sanitation Worker</option>
                  <option>Appliance Technician</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1">Mobile (Aadhaar Linked)</label>
                <input type="text" placeholder="+91 98450 00000" className="w-full px-4 py-2 rounded-2xl border border-hairline bg-canvas text-xs" />
              </div>
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1">Cooperative Equity Shares Subscribed</label>
                <input type="number" defaultValue="20" className="w-full px-4 py-2 rounded-2xl border border-hairline bg-canvas text-xs" />
              </div>

              <button
                onClick={() => setAddWorkerModalOpen(false)}
                className="w-full mt-4 py-3 rounded-full bg-coopGreen text-white text-xs font-bold shadow-pill hover:bg-coopDark transition"
              >
                Submit for Registrar Verification
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
