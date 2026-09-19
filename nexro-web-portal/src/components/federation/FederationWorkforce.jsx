import React from 'react';
import { 
  Users, 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationWorkforce() {
  const trades = [
    { trade: 'Electricians', count: 1240, utilization: 82, activeToday: 512, status: 'Tight Capacity (-63 gap in North)' },
    { trade: 'Plumbers & Hydro', count: 980, utilization: 74, activeToday: 390, status: 'Solvent Buffer' },
    { trade: 'Sanitation & Cleaners', count: 2140, utilization: 69, activeToday: 820, status: 'Mild Deficit (-22)' },
    { trade: 'Appliance Repair', count: 850, utilization: 71, activeToday: 310, status: 'Balanced' },
    { trade: 'Carpenters & Wood', count: 720, utilization: 65, activeToday: 240, status: 'Surplus Standby' },
    { trade: 'Painters & Wall Care', count: 940, utilization: 60, activeToday: 305, status: 'Surplus Standby' },
    { trade: 'Caregivers & Assistance', count: 820, utilization: 77, activeToday: 360, status: 'Balanced' },
    { trade: 'Technicians & Diagnostics', count: 730, utilization: 68, activeToday: 247, status: 'Normal' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Network Workforce Intelligence</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Regional trade capacity across 8,420 cooperative members in 126 primary societies.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-coopSoft text-coopDark border border-coopGreen/20">
          8,420 Certified Tradespeople
        </span>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trades.map((t, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-hairline shadow-subtle hover:shadow-card transition">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-darkCharcoal text-sm">{t.trade}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warmSurface text-neutral-600 border border-hairline">
                {t.utilization}% Utilized
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-darkCharcoal">{t.count.toLocaleString('en-IN')}</span>
              <span className="text-xs text-coopDark font-semibold">{t.activeToday} On Duty</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden mt-3 border border-hairline/60">
              <div 
                style={{ width: `${t.utilization}%` }}
                className={`h-full rounded-full ${t.utilization > 80 ? 'bg-alertCoral' : 'bg-coopGreen'}`}
              />
            </div>

            <p className="text-[10px] text-neutral-500 mt-3 truncate font-medium">
              ● {t.status}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
