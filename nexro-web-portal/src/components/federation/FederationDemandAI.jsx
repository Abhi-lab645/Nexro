import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Sliders,
  Info,
  ArrowRight
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationDemandAI() {
  const { rebalanceApproved, approveRebalancePlan } = useAuth();

  const [horizon, setHorizon] = useState('tomorrow');
  const [activeClusterFilter, setActiveClusterFilter] = useState('all');
  const [reasoningModalOpen, setReasoningModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const handleApprove = () => {
    approveRebalancePlan();
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 5000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-aiSoft text-aiIndigo text-xs font-bold border border-aiBorder">
              <Sparkles size={13} /> Predictive Engine Online · Karnataka State Federation Gateway
            </span>
            <span className="text-xs text-neutral-500 font-medium">Model: DemandNet-v4.2</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-darkCharcoal font-medium">
            Demand Intelligence & Network Capacity
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Predictive multi-society workforce allocation powered by verifiable demand modeling · Karnataka Region.
          </p>
        </div>

        {/* Horizon Toggle */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-hairline shadow-subtle">
          {[
            { id: 'tomorrow', label: 'Tomorrow, Sep 13' },
            { id: 'weekend', label: 'This Weekend' },
            { id: '7day', label: '7-Day Outlook' }
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => setHorizon(h.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                horizon === h.id 
                  ? 'bg-darkCharcoal text-white shadow-pill' 
                  : 'text-neutral-600 hover:text-darkCharcoal'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-3xl bg-coopSoft border border-coopGreen/30 text-coopDark text-xs font-bold flex items-center justify-between shadow-subtle animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-coopGreen" />
            <span>Inter-Society Allocation Ratified! Standby requests dispatched to 4 Primary Societies (63 Total Technicians).</span>
          </div>
          <span className="text-[11px] font-mono">Status: Broadcasted to Society Dispatchers</span>
        </div>
      )}

      {/* Top Level Forecast Hero (Asymmetric) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Forecast Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase">Tomorrow's Expected Service Requests</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-aiSoft text-aiIndigo border border-aiBorder">
                87% Model Confidence
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="font-serif text-5xl font-bold text-darkCharcoal">2,840</span>
              <span className="text-xs font-bold text-coopDark bg-coopSoft px-2.5 py-1 rounded-full">
                +18% vs Baseline
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
              Spike driven by heavy pre-monsoon convective thunderstorms across Bengaluru North corridor causing widespread residential circuit breaker tripping and low voltage fluctuations.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs text-neutral-500">
            <span>Peak Demand Window: 11:30 AM – 14:00 PM</span>
            <span className="font-bold text-darkCharcoal">Cluster: Bengaluru Urban</span>
          </div>
        </div>

        {/* Sector Health Strips (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Electrical Strip */}
          <div className="p-5 rounded-3xl bg-white border border-hairline shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-darkCharcoal text-sm">Electrical Services</span>
                <span className="px-2 py-0.5 rounded-full bg-alertCoralSoft text-alertCoral text-[10px] font-bold">
                  ACUTE DEFICIT
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">284 expected · 221 local capacity</p>
            </div>
            <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-hairline">
              <span className="text-xs font-bold text-neutral-600">Capacity Gap</span>
              <span className="font-mono font-bold text-lg text-alertCoral">-63 Techs</span>
            </div>
          </div>

          {/* Plumbing Strip */}
          <div className="p-5 rounded-3xl bg-white border border-hairline shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-darkCharcoal text-sm">Plumbing & Hydro</span>
                <span className="px-2 py-0.5 rounded-full bg-coopSoft text-coopDark text-[10px] font-bold">
                  SOLVENT SURPLUS
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">198 expected · 205 local capacity</p>
            </div>
            <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-hairline">
              <span className="text-xs font-bold text-neutral-600">Capacity Buffer</span>
              <span className="font-mono font-bold text-lg text-coopDark">+7 Surplus</span>
            </div>
          </div>

          {/* Cleaning Strip */}
          <div className="p-5 rounded-3xl bg-white border border-hairline shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-darkCharcoal text-sm">Deep Cleaning</span>
                <span className="px-2 py-0.5 rounded-full bg-yellowSoft text-darkCharcoal text-[10px] font-bold border border-yellowAccent/40">
                  MILD SHORTAGE
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">410 expected · 388 local capacity</p>
            </div>
            <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-hairline">
              <span className="text-xs font-bold text-neutral-600">Capacity Gap</span>
              <span className="font-mono font-bold text-lg text-darkCharcoal">-22 Techs</span>
            </div>
          </div>

          {/* Appliance Strip */}
          <div className="p-5 rounded-3xl bg-white border border-hairline shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-darkCharcoal text-sm">Appliance Repair</span>
                <span className="px-2 py-0.5 rounded-full bg-coopSoft text-coopDark text-[10px] font-bold">
                  BALANCED
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">165 expected · 170 local capacity</p>
            </div>
            <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-hairline">
              <span className="text-xs font-bold text-neutral-600">Capacity Buffer</span>
              <span className="font-mono font-bold text-lg text-coopDark">+5 Buffer</span>
            </div>
          </div>

        </div>

      </div>

      {/* Main 2-Column Body: Cluster Pressure Map vs Critical Human-in-the-Loop Rebalancing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Geographic Pressure Map */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-7 border border-hairline shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-darkCharcoal">Cluster Pressure & Deficit Map</h2>
              <p className="text-xs text-neutral-500">Real-time spatial density across Bengaluru urban cooperative clusters</p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-warmSurface rounded-full border border-hairline text-xs font-semibold">
              {['all', 'shortage_only', 'surplus'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveClusterFilter(filter)}
                  className={`px-3 py-1 rounded-full capitalize transition ${
                    activeClusterFilter === filter 
                      ? 'bg-darkCharcoal text-white shadow-sm' 
                      : 'text-neutral-600 hover:text-darkCharcoal'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Stylized Visual Map */}
          <div className="p-6 rounded-3xl bg-canvas border border-hairline relative min-h-[340px] flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#07945B_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Cluster Pins */}
            <div className="space-y-3 z-10">
              
              {/* North BLR Acute Deficit Node */}
              <div className="p-4 rounded-2xl bg-white border-2 border-alertCoral shadow-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-alertCoral text-white font-bold">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-darkCharcoal text-sm">North Bengaluru (Hebbal / Yelahanka)</span>
                      <span className="px-2 py-0.5 rounded-full bg-alertCoralSoft text-alertCoral text-[10px] font-bold">
                        ACUTE SHORTAGE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">Forecast Demand: 148 jobs · Capacity: 85 techs</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-alertCoral text-lg">-63 Deficit</span>
                  <p className="text-[10px] text-coopDark font-semibold">Standby Target</p>
                </div>
              </div>

              {/* Contributing Surplus Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/90 border border-hairline shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="font-bold text-darkCharcoal text-xs">Indiranagar #42</span>
                    <p className="text-[11px] text-neutral-500">4.2 km · 18m transit</p>
                  </div>
                  <span className="font-serif font-bold text-coopDark">+20 Standby</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-hairline shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="font-bold text-darkCharcoal text-xs">Domlur Labour Co-op #18</span>
                    <p className="text-[11px] text-neutral-500">6.1 km · 22m transit</p>
                  </div>
                  <span className="font-serif font-bold text-coopDark">+16 Standby</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-hairline shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="font-bold text-darkCharcoal text-xs">Ulsoor Artisan Co-op #09</span>
                    <p className="text-[11px] text-neutral-500">5.8 km · 20m transit</p>
                  </div>
                  <span className="font-serif font-bold text-coopDark">+14 Standby</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-hairline shadow-subtle flex items-center justify-between">
                  <div>
                    <span className="font-bold text-darkCharcoal text-xs">Malleshwaram Co-op</span>
                    <p className="text-[11px] text-neutral-500">3.4 km · 14m transit</p>
                  </div>
                  <span className="font-serif font-bold text-coopDark">+13 Standby</span>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs text-neutral-600 z-10">
              <span>Historical 30-Day Model Accuracy: 94.2%</span>
              <span className="font-mono text-coopDark font-semibold">MAE: 3.8%</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Critical Human-in-the-Loop AI Allocation Card */}
        <div className="lg:col-span-5 bg-darkCharcoal text-white rounded-4xl p-8 border border-neutral-800 shadow-elevated flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellowAccent/15 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-yellowAccent" />
                <h3 className="font-serif text-2xl font-bold text-white">
                  Rebalance Action
                </h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                rebalanceApproved ? 'bg-coopGreen text-white' : 'bg-yellowAccent text-darkCharcoal'
              }`}>
                {rebalanceApproved ? '✓ RATIFIED' : 'PENDING APPROVAL'}
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 my-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-neutral-400">Total Deficit to Offset:</span>
                <span className="font-mono font-bold text-alertCoral text-lg">63 Electrical Jobs</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-xs text-neutral-400">Pooled Standby Available:</span>
                <span className="font-mono font-bold text-coopGreen text-lg">63 Technicians (100%)</span>
              </div>
            </div>

            {/* 4 Contributing Societies */}
            <div className="space-y-2.5 my-4">
              {federationData.demandAIForecast.rebalancingRecommendation.allocationPlan.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.societyName}</span>
                    <span className="text-[10px] text-neutral-400">{item.distanceKm} km · {item.transitMin}m avg transit</span>
                  </div>
                  <span className="font-serif font-bold text-yellowAccent text-base">+{item.allocated}</span>
                </div>
              ))}
            </div>

            {/* Telemetry Rationale */}
            <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-300">
              <span className="font-bold text-yellowAccent">🧠 Telemetry Rationale:</span> All 63 technicians hold active NSQF Level 4 certificates. Transit travel times remain under 25 mins.
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-5 border-t border-neutral-800 space-y-3">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              <ShieldCheck size={14} className="text-coopGreen" />
              <span>Voluntary worker acceptance preserved under Co-op Acts.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {!rebalanceApproved ? (
                <>
                  <button
                    onClick={() => setReasoningModalOpen(true)}
                    className="w-full sm:w-1/3 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition"
                  >
                    Reasoning
                  </button>
                  <button
                    onClick={handleApprove}
                    className="w-full sm:w-2/3 py-2.5 rounded-full bg-yellowAccent hover:bg-yellow-400 text-xs font-bold text-darkCharcoal shadow-pill transition flex items-center justify-center gap-1.5"
                  >
                    Approve Allocation <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <div className="w-full py-3 rounded-full bg-coopGreen text-white text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Allocation Successfully Ratified & Broadcasted
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Reasoning Modal */}
      {reasoningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-lg w-full p-8 border border-hairline shadow-elevated relative">
            <h3 className="font-serif text-2xl font-bold text-darkCharcoal">Explainable AI Telemetry Rationale</h3>
            <p className="text-xs text-neutral-600 mt-1 mb-4">Statutory transparency audit for Recommendation #REC-2026-0913</p>

            <div className="space-y-3 text-xs text-neutral-700">
              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline">
                <span className="font-bold text-darkCharcoal block mb-1">1. Historical Weather & Lightning Surge</span>
                <p>IMD Doppler radar predicts convective cloudburst over Yelahanka/Hebbal corridor. Past 3 monsoon cycles demonstrate a 32% spike in 16A/32A breaker trips.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline">
                <span className="font-bold text-darkCharcoal block mb-1">2. Worker Safety & Overtime Boundaries</span>
                <p>Selected societies operate at 64% base utilization on Thursdays. Drawing 63 technicians maintains working hours within 8-hour statutory shifts.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-warmSurface border border-hairline">
                <span className="font-bold text-darkCharcoal block mb-1">3. Travel Radius & Emissions Control</span>
                <p>Maximum transit radius is restricted to 6.1 km (average 18.5 mins), minimizing travel stress and carbon footprint.</p>
              </div>
            </div>

            <button
              onClick={() => setReasoningModalOpen(false)}
              className="w-full mt-6 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold shadow-pill"
            >
              Close Rationale
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
