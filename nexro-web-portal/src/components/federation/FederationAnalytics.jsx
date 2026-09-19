import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  ArrowUpRight, 
  BarChart3, 
  Calendar,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationAnalytics() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Statewide Econometric Analytics</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Macro welfare, direct cooperative worker earnings distribution, and service reliability across Karnataka.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-hairline text-darkCharcoal shadow-subtle flex items-center gap-1.5">
            <Calendar size={13} /> Fiscal Year 2026 YTD
          </span>
        </div>
      </div>

      {/* Hero Macro Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-6 bg-white rounded-3xl border border-hairline shadow-card">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
            Total Worker Payout (85%)
          </span>
          <div className="font-serif text-3xl font-bold text-darkCharcoal">₹1.84 Cr</div>
          <div className="flex items-center gap-1 text-[11px] text-coopDark font-semibold mt-2">
            <TrendingUp size={13} /> +19.4% YoY Growth
          </div>
          <p className="text-[10px] text-neutral-400 mt-1">Zero aggregator commission taken</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-hairline shadow-card">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
            Welfare Fund Accumulated (5%)
          </span>
          <div className="font-serif text-3xl font-bold text-darkCharcoal">₹12.60 Lakh</div>
          <div className="flex items-center gap-1 text-[11px] text-coopDark font-semibold mt-2">
            <ShieldCheck size={13} /> 100% Ringfenced
          </div>
          <p className="text-[10px] text-neutral-400 mt-1">Health cover & 0% interest advances</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-hairline shadow-card">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
            Network Job Completion Rate
          </span>
          <div className="font-serif text-3xl font-bold text-darkCharcoal">99.2%</div>
          <div className="flex items-center gap-1 text-[11px] text-coopDark font-semibold mt-2">
            <CheckCircle2 size={13} /> 0.8% Cancellation Rate
          </div>
          <p className="text-[10px] text-neutral-400 mt-1">Commercial gig benchmark is 14%</p>
        </div>

        <div className="p-6 bg-darkCharcoal text-white rounded-3xl shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              Active Member Base
            </span>
            <div className="font-serif text-3xl font-bold text-white">8,420</div>
            <p className="text-[11px] text-yellowAccent font-medium mt-1">Across 126 Primary Societies</p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-700 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Mean Monthly Income</span>
            <span className="font-mono font-bold text-white">₹34,850/mo</span>
          </div>
        </div>

      </div>

      {/* Asymmetric Deep Insights Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Monthly Earnings & Volume Distribution */}
        <div className="lg:col-span-2 p-6 bg-white rounded-4xl border border-hairline shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-darkCharcoal">Monthly Network Gross Payout Flow</h3>
              <p className="text-xs text-neutral-500">Track worker direct share vs society operations across last 6 months</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark">
              Statutory 85/5/10 Rule
            </span>
          </div>

          <div className="space-y-4">
            {[
              { month: 'Apr 2026', worker: '₹38.2L', welfare: '₹2.2L', ops: '₹4.5L', total: '₹44.9L', pct: 95 },
              { month: 'Mar 2026', worker: '₹35.8L', welfare: '₹2.1L', ops: '₹4.2L', total: '₹42.1L', pct: 88 },
              { month: 'Feb 2026', worker: '₹31.4L', welfare: '₹1.8L', ops: '₹3.7L', total: '₹36.9L', pct: 78 },
              { month: 'Jan 2026', worker: '₹29.1L', welfare: '₹1.7L', ops: '₹3.4L', total: '₹34.2L', pct: 72 },
              { month: 'Dec 2025', worker: '₹27.5L', welfare: '₹1.6L', ops: '₹3.2L', total: '₹32.3L', pct: 68 }
            ].map((row, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-canvas border border-hairline text-xs">
                <div className="flex items-center justify-between font-medium mb-2">
                  <span className="font-bold text-darkCharcoal">{row.month}</span>
                  <span className="font-mono text-darkCharcoal font-bold">Total: {row.total}</span>
                </div>
                <div className="w-full bg-hairline rounded-full h-2.5 flex overflow-hidden">
                  <div className="bg-coopGreen h-full" style={{ width: '85%' }} title="85% Direct Worker Payout"></div>
                  <div className="bg-yellowAccent h-full" style={{ width: '5%' }} title="5% Member Welfare"></div>
                  <div className="bg-darkCharcoal h-full" style={{ width: '10%' }} title="10% Primary Society Ops"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2">
                  <span className="text-coopDark font-semibold">Worker: {row.worker}</span>
                  <span className="text-yellowDark font-semibold">Welfare: {row.welfare}</span>
                  <span className="text-neutral-700 font-semibold">Ops: {row.ops}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Top Performing Clusters */}
        <div className="p-6 bg-white rounded-4xl border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-darkCharcoal mb-1">Top Cluster Throughput</h3>
            <p className="text-xs text-neutral-500 mb-5">By weekly booking velocity & member take-home</p>

            <div className="space-y-3.5">
              {[
                { name: 'Bangalore East (Indiranagar)', jobs: '1,420 jobs/wk', csat: '4.94 ★', color: 'bg-coopSoft text-coopDark' },
                { name: 'Bangalore South (Koramangala)', jobs: '1,180 jobs/wk', csat: '4.91 ★', color: 'bg-warmSurface text-darkCharcoal' },
                { name: 'Whitefield Tech Corridor', jobs: '980 jobs/wk', csat: '4.89 ★', color: 'bg-warmSurface text-darkCharcoal' },
                { name: 'Bangalore North (Hebbal)', jobs: '840 jobs/wk', csat: '4.88 ★', color: 'bg-warmSurface text-darkCharcoal' },
                { name: 'Hubli-Dharwad Urban', jobs: '520 jobs/wk', csat: '4.95 ★', color: 'bg-warmSurface text-darkCharcoal' }
              ].map((c, i) => (
                <div key={i} className="p-3 rounded-2xl bg-canvas border border-hairline flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-darkCharcoal">{c.name}</p>
                    <p className="text-[10px] text-neutral-500">{c.jobs}</p>
                  </div>
                  <span className="font-bold text-xs px-2 py-1 rounded-full bg-white border border-hairline text-darkCharcoal">
                    {c.csat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-coopSoft/50 border border-coopGreen/20 text-xs text-coopDark font-semibold mt-4 text-center">
            Statewide Federation Audit Passed: 100% Regulatory Compliance
          </div>
        </div>

      </div>

    </div>
  );
}
