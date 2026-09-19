import React from 'react';
import { 
  Zap, 
  Wrench, 
  Sparkles, 
  Tv, 
  Hammer, 
  Paintbrush, 
  ArrowUpRight,
  TrendingUp,
  Users
} from 'lucide-react';
import { societyData } from '../../data/portalData';

export default function SocietyServices() {
  const services = [
    { id: 'elec', name: 'Electrical & Power Systems', icon: <Zap size={22} className="text-coopDark" />, workers: 24, requests: 28, capacity: 88, demand: 'High (+18%)', avgPrice: '₹299', avgTime: '35m', rating: 4.92 },
    { id: 'plumb', name: 'Plumbing & Concealed Piping', icon: <Wrench size={22} className="text-coopDark" />, workers: 18, requests: 21, capacity: 66, demand: 'Optimal', avgPrice: '₹349', avgTime: '42m', rating: 4.89 },
    { id: 'clean', name: 'Deep Sanitation & Cleaning', icon: <Sparkles size={22} className="text-coopDark" />, workers: 20, requests: 17, capacity: 53, demand: 'Normal', avgPrice: '₹599', avgTime: '90m', rating: 4.95 },
    { id: 'app', name: 'Appliance Repair & HVAC', icon: <Tv size={22} className="text-coopDark" />, workers: 12, requests: 13, capacity: 41, demand: 'Normal', avgPrice: '₹399', avgTime: '50m', rating: 4.81 },
    { id: 'carp', name: 'Carpentry & Architectural Wood', icon: <Hammer size={22} className="text-coopDark" />, workers: 10, requests: 9, capacity: 28, demand: 'Normal', avgPrice: '₹449', avgTime: '65m', rating: 4.85 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Service Lines & Trade Capacity</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Cluster service catalog, technician allocations, and real-time demand capacity tracking.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-warmSurface border border-hairline text-neutral-700">
          5 Core Trade Guilds Active
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-4xl p-6 border border-hairline shadow-card hover:shadow-elevated transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-coopSoft border border-coopGreen/20">
                {svc.icon}
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                svc.demand.includes('High') ? 'bg-yellowSoft text-darkCharcoal border border-yellowAccent/40' : 'bg-canvas text-neutral-600'
              }`}>
                {svc.demand}
              </span>
            </div>

            <h3 className="font-serif text-xl font-bold text-darkCharcoal">{svc.name}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Active Technicians:</span>
                <span className="font-bold text-darkCharcoal">{svc.workers} pros</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Today's Requests:</span>
                <span className="font-bold text-darkCharcoal">{svc.requests} bookings</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Average Base Price:</span>
                <span className="font-mono font-bold text-coopDark">{svc.avgPrice}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Customer Rating:</span>
                <span className="font-bold text-darkCharcoal">⭐ {svc.rating} / 5.0</span>
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="mt-5 pt-4 border-t border-hairline">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-neutral-600">Trade Capacity Utilization</span>
                <span className="text-darkCharcoal">{svc.capacity}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-canvas overflow-hidden border border-hairline/60">
                <div 
                  style={{ width: `${svc.capacity}%` }}
                  className={`h-full rounded-full ${svc.capacity > 80 ? 'bg-coopGreen' : 'bg-neutral-400'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
