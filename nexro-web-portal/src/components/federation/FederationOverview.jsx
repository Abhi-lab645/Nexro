import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Users, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Zap, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationOverview() {
  const { 
    setActiveTab, 
    rebalanceApproved, 
    approveRebalancePlan 
  } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Editorial Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-hairline/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellowSoft text-darkCharcoal text-xs font-bold border border-yellowAccent/40">
              <span className="w-2 h-2 rounded-full bg-coopGreen animate-ping" />
              Apex Federation Telemetry · All 126 Societies Synchronized (18ms)
            </span>
            <span className="text-xs text-neutral-500 font-medium">Karnataka Regional Command</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-darkCharcoal font-medium tracking-tight">
            Cooperative Network Operations
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Macro governance, inter-society workforce balancing, and statutory compliance across participating societies.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('demand_ai')}
            className="px-5 py-2.5 rounded-full bg-darkCharcoal hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-pill transition"
          >
            <Sparkles size={14} className="text-yellowAccent" />
            {rebalanceApproved ? 'Allocation Approved ✓' : 'Review AI Capacity Alert (63 Gap)'}
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-canvas border border-hairline text-darkCharcoal text-xs font-semibold transition flex items-center gap-1.5 shadow-subtle"
          >
            <FileSpreadsheet size={14} /> Download Network Audit
          </button>
        </div>
      </div>

      {/* Asymmetric Top 5-Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Metric 1: Total Workers */}
        <div 
          onClick={() => setActiveTab('workforce')}
          className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
            <span>NETWORK WORKFORCE</span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-darkCharcoal" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{federationData.kpis.totalWorkers.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[10px] font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full mt-2 inline-block">
            {federationData.kpis.workerTrend}
          </span>
        </div>

        {/* Metric 2: Affiliated Societies */}
        <div 
          onClick={() => setActiveTab('societies')}
          className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
            <span>SOCIETIES</span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-darkCharcoal" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{federationData.kpis.totalSocieties}</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2 font-medium">{federationData.kpis.operationalSocieties} Operational</p>
        </div>

        {/* Metric 3: Active Today */}
        <div 
          onClick={() => setActiveTab('workforce')}
          className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
            <span>ACTIVE TODAY</span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-darkCharcoal" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{federationData.kpis.activeToday.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-coopDark font-semibold mt-2">Peak Shift Active</p>
        </div>

        {/* Metric 4: Weekly Volume */}
        <div 
          onClick={() => setActiveTab('finance')}
          className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
            <span>WEEKLY ESCROW</span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-darkCharcoal" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{federationData.kpis.networkVolume}</span>
          </div>
          <p className="text-[10px] text-coopDark font-semibold mt-2 truncate">85% Direct to Workers</p>
        </div>

        {/* Metric 5: Network Utilization */}
        <div 
          onClick={() => setActiveTab('workforce')}
          className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
            <span>UTILIZATION</span>
            <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-darkCharcoal" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{federationData.kpis.utilization}%</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2 font-medium">22% Standby Buffer</p>
        </div>

      </div>

      {/* Bento Grid 1: Network Health & Cluster Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Network Health Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl text-darkCharcoal font-medium">Network Health</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-coopSoft text-coopDark">
                Solvent (Grade A)
              </span>
            </div>

            <div className="space-y-4 my-4">
              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline flex items-center justify-between">
                <span className="text-xs text-neutral-600 font-medium">Societies Operational:</span>
                <span className="font-mono font-bold text-darkCharcoal">{federationData.networkHealth.societiesOperationalRatio}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline flex items-center justify-between">
                <span className="text-xs text-neutral-600 font-medium">Active Duty Technicians:</span>
                <span className="font-mono font-bold text-darkCharcoal">{federationData.networkHealth.workersActiveRatio}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline flex items-center justify-between">
                <span className="text-xs text-neutral-600 font-medium">Network Job Fulfillment Rate:</span>
                <span className="font-mono font-bold text-coopDark">{federationData.networkHealth.fulfillmentRate}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline flex items-center justify-between">
                <span className="text-xs text-neutral-600 font-medium">Customer Rating Index:</span>
                <span className="font-bold text-darkCharcoal">{federationData.networkHealth.avgRating}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline flex items-center justify-between">
                <span className="text-xs text-neutral-600 font-medium">Emergency Response SLA:</span>
                <span className="font-mono font-bold text-darkCharcoal">{federationData.networkHealth.emergencyResponse} avg</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-500 pt-3 border-t border-hairline">
            ● Regulated under Multi-State Cooperative Societies Act & Karnataka Co-op Directorate
          </p>
        </div>

        {/* Workforce Network Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="font-serif text-2xl text-darkCharcoal font-medium">Workforce Regional Clusters</h2>
                <p className="text-xs text-neutral-500">Spatial telemetry across Bengaluru Urban & Rural federations</p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-warmSurface rounded-full border border-hairline text-[11px] font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-darkCharcoal text-white shadow-sm">Workers</span>
                <span className="px-2.5 py-0.5 rounded-full text-neutral-600 hover:text-darkCharcoal cursor-pointer">Demand</span>
                <span className="px-2.5 py-0.5 rounded-full text-neutral-600 hover:text-darkCharcoal cursor-pointer">Capacity</span>
              </div>
            </div>

            {/* Stylized Regional Cluster Nodes */}
            <div className="my-4 p-6 rounded-3xl bg-canvas border border-hairline relative min-h-[220px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#07945B_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-10">
                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full">Indiranagar #42</span>
                  <p className="font-serif text-lg font-bold text-darkCharcoal mt-1">84 Pros</p>
                  <p className="text-[10px] text-neutral-500">92% Utilization · Solvent</p>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full">Domlur #18</span>
                  <p className="font-serif text-lg font-bold text-darkCharcoal mt-1">92 Pros</p>
                  <p className="text-[10px] text-neutral-500">82% Utilization · Standby</p>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-alertCoral bg-alertCoralSoft px-2 py-0.5 rounded-full">North BLR (Hebbal)</span>
                  <p className="font-serif text-lg font-bold text-alertCoral mt-1">-63 Deficit</p>
                  <p className="text-[10px] text-neutral-500">Acute Surge Expected</p>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-neutral-600 bg-warmSurface px-2 py-0.5 rounded-full">Koramangala #54</span>
                  <p className="font-serif text-lg font-bold text-darkCharcoal mt-1">128 Pros</p>
                  <p className="text-[10px] text-neutral-500">84% Utilization · Normal</p>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-neutral-600 bg-warmSurface px-2 py-0.5 rounded-full">Whitefield #77</span>
                  <p className="font-serif text-lg font-bold text-darkCharcoal mt-1">144 Pros</p>
                  <p className="text-[10px] text-neutral-500">81% Utilization · Normal</p>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-hairline shadow-subtle">
                  <span className="text-[10px] font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full">Ulsoor #09</span>
                  <p className="font-serif text-lg font-bold text-darkCharcoal mt-1">76 Pros</p>
                  <p className="text-[10px] text-neutral-500">75% Utilization · Standby</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-600 z-10 pt-2 border-t border-hairline">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-coopGreen" /> Sufficient Capacity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellowAccent" /> Standby Buffer
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-alertCoral" /> Deficit Shortage
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
            <span>Cluster telemetry synchronized across 126 primary society dispatchers</span>
            <button 
              onClick={() => setActiveTab('workforce')}
              className="font-bold text-darkCharcoal hover:text-coopDark flex items-center gap-1"
            >
              Full Workforce Matrix →
            </button>
          </div>
        </div>

      </div>

      {/* Bento Grid 2: Critical AI Capacity Recommendation & Demand Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Human-in-the-loop AI Capacity Recommendation Card (Deep Charcoal 7 cols) */}
        <div className="lg:col-span-7 bg-darkCharcoal text-white rounded-4xl p-8 border border-neutral-800 shadow-elevated flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellowAccent/10 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-yellowAccent text-darkCharcoal font-bold">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    AI Capacity Rebalancing Proposal
                  </h3>
                  <p className="text-xs text-neutral-400">Inter-Society Operational Decision Support</p>
                </div>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                rebalanceApproved ? 'bg-coopGreen text-white' : 'bg-yellowAccent text-darkCharcoal'
              }`}>
                {rebalanceApproved ? '✓ ALLOCATION RATIFIED' : 'ACTION REQUIRED'}
              </span>
            </div>

            {/* Gap Statement */}
            <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 my-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">⚡ Acute Electrical Shortage Detected in North Bengaluru</span>
                <span className="text-xs font-mono font-bold text-alertCoral">Deficit: -63 Jobs</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Tomorrow's predicted demand (284 requests) exceeds North Bengaluru's local capacity (221). AI recommends drawing standby assistance from 4 adjacent surplus societies:
              </p>

              {/* 4 Society Transfer Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                {federationData.demandAIForecast.rebalancingRecommendation.allocationPlan.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-darkCharcoal border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-400 block truncate">{s.societyName.split(' ')[0]} Co-op</span>
                    <span className="font-serif text-xl font-bold text-yellowAccent">+{s.allocated}</span>
                    <span className="text-[9px] text-neutral-500 block">{s.transitMin}m transit</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainable Telemetry Rationale */}
            <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-xs text-neutral-300">
              <span className="font-bold text-yellowAccent">🧠 Explainable Telemetry Rationale:</span> {federationData.demandAIForecast.rebalancingRecommendation.aiExplanation}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-coopGreen" />
              Statutory Requirement: Human federation administrator approval required.
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {!rebalanceApproved ? (
                <>
                  <button
                    onClick={() => setActiveTab('demand_ai')}
                    className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition"
                  >
                    Review Reasoning
                  </button>
                  <button
                    onClick={approveRebalancePlan}
                    className="px-5 py-2 rounded-full bg-yellowAccent hover:bg-yellow-400 text-xs font-bold text-darkCharcoal shadow-pill transition"
                  >
                    Approve Inter-Society Allocation
                  </button>
                </>
              ) : (
                <div className="px-4 py-2 rounded-full bg-coopGreen text-white text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Allocation Issued to 4 Societies
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Demand Intelligence Tomorrow's Forecast (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-darkCharcoal">Demand Intelligence</h3>
                <p className="text-xs text-neutral-500">Tomorrow's Predictive Model Overview</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-warmSurface text-neutral-700 border border-hairline">
                87% Confidence
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-warmSurface border border-hairline my-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-darkCharcoal">Expected Service Requests</span>
                <span className="font-serif text-3xl font-bold text-darkCharcoal">{federationData.demandAIForecast.expectedRequests.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-xs font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full inline-block mt-1">
                +{federationData.demandAIForecast.surgePercent}% vs Weekly Average
              </span>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {federationData.demandAIForecast.reasoning}
              </p>
            </div>

            {/* Sector Status Strips */}
            <div className="space-y-2 mt-4">
              {federationData.demandAIForecast.sectors.map((sec, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-canvas border border-hairline flex items-center justify-between text-xs">
                  <span className="font-bold text-darkCharcoal">{sec.trade}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500">{sec.expected} req / {sec.capacity} cap</span>
                    <span className={`font-mono font-bold ${sec.color}`}>
                      {sec.diff > 0 ? `+${sec.diff} surplus` : `${sec.diff} deficit`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('demand_ai')}
            className="w-full mt-6 py-2.5 rounded-full bg-warmSurface hover:bg-canvas border border-hairline text-darkCharcoal text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            Explore Full Demand AI Forecaster →
          </button>
        </div>

      </div>

    </div>
  );
}
