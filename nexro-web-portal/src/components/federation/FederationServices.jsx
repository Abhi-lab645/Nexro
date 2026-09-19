import React, { useState } from 'react';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sparkles, 
  Hammer, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function FederationServices() {
  const [selectedTrade, setSelectedTrade] = useState('all');

  const tradeCatalog = [
    {
      id: 'electrical',
      title: 'Electrical & Power Systems',
      icon: Zap,
      color: 'bg-yellowSoft text-yellowDark',
      baseFloor: '₹249',
      societyCount: 112,
      activeMembers: 2450,
      nsqfLevel: 'NSQF Level 4 Required',
      statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops',
      customerRating: 4.92,
      slaResponse: '8.4 mins'
    },
    {
      id: 'plumbing',
      title: 'Plumbing & Hydraulic Infrastructure',
      icon: Droplets,
      color: 'bg-blue-50 text-blue-700',
      baseFloor: '₹299',
      societyCount: 98,
      activeMembers: 1980,
      nsqfLevel: 'NSQF Level 3 & 4',
      statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops',
      customerRating: 4.88,
      slaResponse: '9.1 mins'
    },
    {
      id: 'sanitation',
      title: 'Deep Cleaning & Sanitation Services',
      icon: Sparkles,
      color: 'bg-coopSoft text-coopDark',
      baseFloor: '₹499',
      societyCount: 126,
      activeMembers: 2150,
      nsqfLevel: 'NSQF Level 3 Sanitization',
      statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops',
      customerRating: 4.95,
      slaResponse: '11.0 mins'
    },
    {
      id: 'appliances',
      title: 'HVAC & Domestic Appliance Diagnostics',
      icon: Wrench,
      color: 'bg-purple-50 text-purple-700',
      baseFloor: '₹349',
      societyCount: 84,
      activeMembers: 1120,
      nsqfLevel: 'OEM / NSQF Level 5',
      statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops',
      customerRating: 4.89,
      slaResponse: '10.2 mins'
    },
    {
      id: 'carpentry',
      title: 'Carpentry & Structural Woodwork',
      icon: Hammer,
      color: 'bg-amber-50 text-amber-800',
      baseFloor: '₹399',
      societyCount: 65,
      activeMembers: 720,
      nsqfLevel: 'Traditional Guild & NSQF Level 4',
      statutorySplit: '85% Worker / 5% Welfare / 10% Society Ops',
      customerRating: 4.91,
      slaResponse: '14.5 mins'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Statewide Cooperative Service Catalog</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Standardized trade definitions, statutory floor pricings, and NSQF skill benchmarks across Karnataka.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark border border-coopGreen/20">
          5 Core Trade Guilds · 8,420 Certified Workers
        </span>
      </div>

      {/* Grid of Standardized Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tradeCatalog.map((trade) => {
          const Icon = trade.icon;
          return (
            <div 
              key={trade.id} 
              className="bg-white rounded-4xl p-6 border border-hairline shadow-subtle hover:shadow-card transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${trade.color}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-serif font-bold text-darkCharcoal px-2.5 py-1 rounded-full bg-warmSurface border border-hairline">
                    Min Floor {trade.baseFloor}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-darkCharcoal mb-1">
                  {trade.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Enforced across {trade.societyCount} affiliated cooperative societies.
                </p>

                <div className="p-3.5 rounded-2xl bg-canvas border border-hairline space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Certified Workforce:</span>
                    <span className="font-bold text-darkCharcoal">{trade.activeMembers} workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Skill Standard:</span>
                    <span className="font-medium text-darkCharcoal">{trade.nsqfLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer CSAT:</span>
                    <span className="font-bold text-coopDark">★ {trade.customerRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Mean SLA:</span>
                    <span className="font-mono font-medium text-darkCharcoal">{trade.slaResponse}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between text-[11px]">
                <span className="text-coopDark font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} /> {trade.statutorySplit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
