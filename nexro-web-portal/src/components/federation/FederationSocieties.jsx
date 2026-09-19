import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Award, 
  ExternalLink,
  Users,
  Briefcase
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationSocieties() {
  const [search, setSearch] = useState('');
  const [selectedSociety, setSelectedSociety] = useState(null);

  const filtered = federationData.societiesList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Affiliated Societies Directory</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Network-level registry of 126 registered primary labour cooperatives across Karnataka.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark border border-coopGreen/20">
          118 Operational · 8 Annual Audit
        </span>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search societies by legal name or cluster location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-canvas border border-hairline text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellowAccent text-darkCharcoal"
          />
        </div>
        <span className="text-xs text-neutral-500 font-medium">Showing {filtered.length} of 126 Societies</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmSurface border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase">
              <tr>
                <th className="py-4 px-6">Society Legal Name</th>
                <th className="py-4 px-4">Jurisdiction Cluster</th>
                <th className="py-4 px-4">Total Workforce</th>
                <th className="py-4 px-4">Active Today</th>
                <th className="py-4 px-4">Weekly Jobs</th>
                <th className="py-4 px-4">Utilization</th>
                <th className="py-4 px-4">Audit Grade</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-canvas/60 transition group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-darkCharcoal text-sm">{s.name}</p>
                    <span className="font-mono text-[10px] text-neutral-500">{s.id}</span>
                  </td>
                  <td className="py-4 px-4 text-neutral-600 font-medium">{s.location}</td>
                  <td className="py-4 px-4 font-bold text-darkCharcoal">{s.workers} members</td>
                  <td className="py-4 px-4 font-semibold text-coopDark">{s.activeToday} on duty</td>
                  <td className="py-4 px-4 font-mono font-bold text-darkCharcoal">{s.jobsWeek}</td>
                  <td className="py-4 px-4 font-bold text-darkCharcoal">{s.utilization}%</td>
                  <td className="py-4 px-4">
                    <span className="font-serif font-bold text-xs px-2 py-0.5 rounded-full bg-warmSurface border border-hairline text-darkCharcoal">
                      Grade {s.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-coopSoft text-coopDark font-bold text-[10px]">
                      ● {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
