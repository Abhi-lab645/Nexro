import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { societyData } from '../../data/portalData';

export default function SocietyOverview() {
  const { 
    setActiveTab, 
    setEmergencyDrawerOpen, 
    setSelectedWorkerId,
    emergencyJobs 
  } = useAuth();

  const unassignedCount = emergencyJobs.filter(j => !j.assignedWorker).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Editorial Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-hairline/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coopSoft text-coopDark text-xs font-bold border border-coopGreen/20">
              <span className="w-2 h-2 rounded-full bg-coopGreen animate-pulse" />
              Society Operational · Ward #42 Indiranagar Cluster
            </span>
            <span className="text-xs text-neutral-500 font-medium">Wednesday, September 12, 2026</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-darkCharcoal font-medium tracking-tight">
            Good morning, Karnataka Contract Labour Society
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Registered under Karnataka Co-op Societies Act, 1959 · 84 active members on duty across cluster.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setEmergencyDrawerOpen(true)}
            className="px-5 py-2.5 rounded-full bg-darkCharcoal hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-pill transition"
          >
            <Plus size={14} className="text-yellowAccent" />
            Dispatch Emergency Job ({unassignedCount})
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-canvas border border-hairline text-darkCharcoal text-xs font-semibold transition"
          >
            Export Shift Ledger
          </button>
        </div>
      </div>

      {/* Top Level KPI Strip (Asymmetric & Editorial) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Active Workers */}
        <div 
          onClick={() => setActiveTab('people')}
          className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-2">
            <span>ACTIVE WORKERS</span>
            <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-darkCharcoal transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl sm:text-5xl font-medium text-darkCharcoal">{societyData.kpis.activeWorkers}</span>
            <span className="text-xs font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full">
              {societyData.kpis.workerTrend}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2 font-medium">of {societyData.kpis.totalWorkers} registered members</p>
        </div>

        {/* Metric 2: Today's Jobs */}
        <div 
          onClick={() => setActiveTab('jobs')}
          className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-2">
            <span>TODAY'S JOBS</span>
            <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-darkCharcoal transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl sm:text-5xl font-medium text-darkCharcoal">{societyData.kpis.todaysJobs}</span>
            <span className="text-xs font-bold text-darkCharcoal bg-yellowSoft px-2 py-0.5 rounded-full">
              {societyData.kpis.inProgress} In Progress
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2 font-medium">{societyData.kpis.completed} completed · {societyData.kpis.upcoming} upcoming</p>
        </div>

        {/* Metric 3: Today's Volume */}
        <div 
          onClick={() => setActiveTab('finance')}
          className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-2">
            <span>TODAY'S VOLUME</span>
            <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-darkCharcoal transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-medium text-darkCharcoal">{societyData.kpis.todaysEarnings}</span>
            <span className="text-xs font-bold text-coopDark bg-coopSoft px-2 py-0.5 rounded-full">
              {societyData.kpis.workerSharePercent} Direct
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Avg {societyData.kpis.avgWorkerPayout} / worker payout</p>
        </div>

        {/* Metric 4: Workforce Utilization */}
        <div 
          onClick={() => setActiveTab('people')}
          className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle hover:shadow-card transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-2">
            <span>UTILIZATION RATE</span>
            <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-darkCharcoal transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl sm:text-5xl font-medium text-darkCharcoal">{societyData.kpis.utilization}%</span>
            <span className="text-xs font-bold text-neutral-600 bg-warmSurface px-2 py-0.5 rounded-full">
              Healthy
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2 font-medium truncate">{societyData.kpis.utilizationNote}</p>
        </div>

      </div>

      {/* Main Asymmetric Bento Row: Operations vs Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Today's Operations Card */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-2xl text-darkCharcoal font-medium">Today's Operations</h2>
                <p className="text-xs text-neutral-500">Real-time breakdown of all 32 cluster bookings</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-warmSurface text-neutral-700 border border-hairline">
                32 Total Dispatches
              </span>
            </div>

            {/* Clickable Multi-Segmented Progress Bar */}
            <div className="my-6">
              <div className="w-full h-4 rounded-full bg-canvas overflow-hidden flex p-0.5 gap-1 border border-hairline">
                {societyData.operationsBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percent}%` }}
                    className={`${item.color} h-full rounded-full transition-all duration-300`}
                    title={`${item.label}: ${item.count} jobs (${item.percent}%)`}
                  />
                ))}
              </div>

              {/* Segment Legend Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {societyData.operationsBreakdown.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab('jobs')}
                    className="p-3 rounded-2xl bg-canvas hover:bg-warmSurface border border-hairline text-left transition group"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs font-semibold text-neutral-600">{item.label}</span>
                    </div>
                    <div className="text-lg font-bold text-darkCharcoal mt-1 group-hover:text-coopDark">
                      {item.count} <span className="text-xs font-normal text-neutral-400">({item.percent}%)</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs text-neutral-500">
            <span>Cooperative Dispatching: Fair-queue rotation active</span>
            <button 
              onClick={() => setActiveTab('jobs')} 
              className="font-bold text-darkCharcoal hover:text-coopDark flex items-center gap-1"
            >
              View Full Job Queue →
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Needs Attention Priority Hub */}
        <div className="lg:col-span-5 bg-darkCharcoal text-white rounded-4xl p-7 border border-neutral-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-yellowAccent" size={20} />
                <h2 className="font-serif text-2xl text-white font-medium">Needs Attention</h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellowAccent text-darkCharcoal">
                4 Action Items
              </span>
            </div>

            <div className="space-y-3 my-4">
              {societyData.attentionItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (item.type === 'emergency') setEmergencyDrawerOpen(true);
                      else if (item.type === 'verification') setActiveTab('people');
                      else if (item.type === 'finance') setActiveTab('finance');
                      else setActiveTab('people');
                    }}
                    className="px-3 py-1.5 rounded-full bg-yellowAccent text-darkCharcoal text-xs font-bold hover:bg-yellow-400 transition whitespace-nowrap shadow-sm"
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-neutral-500 pt-3 border-t border-neutral-800">
            ● Priority queue refreshed automatically via WebSocket gateway
          </p>
        </div>

      </div>

      {/* Secondary Bento Grid: Today's Schedule & Service Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Schedule Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-7 border border-hairline shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-darkCharcoal font-medium">Today's Schedule</h2>
              <p className="text-xs text-neutral-500">Chronological service timeline across Indiranagar & Domlur</p>
            </div>
            <button 
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-bold text-darkCharcoal hover:text-coopDark flex items-center gap-1"
            >
              View All Jobs →
            </button>
          </div>

          <div className="space-y-3.5">
            {societyData.schedule.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveTab('jobs')}
                className="p-4 rounded-3xl bg-warmSurface hover:bg-canvas border border-hairline transition cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1.5 rounded-2xl bg-white border border-hairline font-mono font-bold text-xs text-darkCharcoal shadow-subtle">
                    {item.time}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-darkCharcoal group-hover:text-coopDark transition-colors">
                      {item.service}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {item.location} · {item.worker} ({item.role} · ⭐ {item.rating})
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  item.status === 'completed' ? 'bg-darkCharcoal text-white' :
                  item.status === 'in_progress' ? 'bg-yellowSoft text-darkCharcoal border border-yellowAccent/30' :
                  'bg-coopSoft text-coopDark'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Demand & Workforce Dial (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Service Demand Card */}
          <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-darkCharcoal font-medium">Service Demand Today</h2>
              <span className="text-[11px] text-neutral-400 font-medium">Ward #42 Cluster</span>
            </div>

            <div className="space-y-3">
              {societyData.serviceDemand.map((svc) => (
                <div key={svc.id}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-darkCharcoal">{svc.name}</span>
                    <span className="text-neutral-500">{svc.requests} requests</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-canvas overflow-hidden border border-hairline/60">
                    <div 
                      style={{ width: `${svc.capacity}%` }}
                      className={`h-full rounded-full ${svc.highlight ? 'bg-coopGreen' : 'bg-neutral-400'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight Pill */}
            <div className="mt-5 p-3.5 rounded-2xl bg-yellowSoft border border-yellowAccent/40 flex items-start gap-2.5">
              <Zap size={16} className="text-darkCharcoal mt-0.5 flex-shrink-0" />
              <p className="text-xs font-medium text-darkCharcoal leading-relaxed">
                <span className="font-bold">Demand Insight:</span> Electrical demand is <span className="font-bold text-coopDark">18% above this week's average</span>. Standby technicians available in roster.
              </p>
            </div>
          </div>

          {/* Workforce Utilization Card */}
          <div className="bg-white rounded-4xl p-6 border border-hairline shadow-card">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Workforce Availability</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-coopSoft/50 border border-coopGreen/20">
                <span className="font-serif text-2xl font-bold text-coopDark">18</span>
                <p className="text-[11px] text-neutral-600 font-medium">Available</p>
              </div>
              <div className="p-3 rounded-2xl bg-yellowSoft/50 border border-yellowAccent/30">
                <span className="font-serif text-2xl font-bold text-darkCharcoal">41</span>
                <p className="text-[11px] text-neutral-600 font-medium">On Job</p>
              </div>
              <div className="p-3 rounded-2xl bg-canvas border border-hairline">
                <span className="font-serif text-2xl font-bold text-neutral-600">25</span>
                <p className="text-[11px] text-neutral-500 font-medium">Off Duty</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
