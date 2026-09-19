import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  DollarSign,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { societyData } from '../../data/portalData';

export default function SocietyWelfare() {
  const claims = [
    { id: 'CLM-102', worker: 'Ramesh Kumar', category: 'Health & Dental Checkup', amount: '₹1,800', date: 'Sep 04, 2026', status: 'Approved & Disbursed' },
    { id: 'CLM-103', worker: 'Mahesh G.', category: '0% Tool Purchase Advance', amount: '₹12,000', date: 'Aug 28, 2026', status: 'Active (Repaying via 5% jobs)' },
    { id: 'CLM-104', worker: 'Prakash R.', category: 'Duty Eyewear Prescription', amount: '₹2,400', date: 'Sep 09, 2026', status: 'Under Desk Review' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Worker Welfare & Social Security</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Democratic social safety net managed exclusively for cooperative member-owners.
          </p>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-coopSoft text-coopDark text-xs font-bold border border-coopGreen/20">
          <ShieldCheck size={14} /> 100% Members Covered under Group Insurance
        </span>
      </div>

      {/* Welfare Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Members Covered</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">84 / 84</p>
          <p className="text-[11px] text-coopDark font-semibold mt-1">100% Statutory Quorum</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Health Shield</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹5,00,000</p>
          <p className="text-[11px] text-neutral-500 mt-1">Hospitalization & Duty Accident</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-coopDark uppercase">Society Welfare Reserve</p>
          <p className="font-serif text-3xl font-medium text-coopDark mt-1">₹4,82,900</p>
          <p className="text-[11px] text-coopDark font-semibold mt-1">+₹2,431 Credited Today</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">0% Emergency Advances</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹48,000</p>
          <p className="text-[11px] text-neutral-500 mt-1">Non-predatory micro-credit</p>
        </div>

      </div>

      {/* Insurance Shield & Policy Banner */}
      <div className="bg-warmSurface rounded-4xl p-7 border border-hairline shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-4 rounded-3xl bg-yellowSoft border border-yellowAccent/40 text-darkCharcoal flex-shrink-0">
            <HeartHandshake size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-hairline text-darkCharcoal">
                Active Master Policy #KGCF-MED-849102
              </span>
              <span className="text-xs font-bold text-coopDark">● Cashless 24x7</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-darkCharcoal">Karnataka Gig Federation Group Hospital Shield</h3>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Provides comprehensive cashless hospitalization across 420+ empaneled hospitals in Bengaluru Urban. Covers in-patient care, occupational accidents, and emergency ICU without member copay.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="px-5 py-2.5 rounded-full bg-darkCharcoal hover:bg-neutral-800 text-white text-xs font-bold whitespace-nowrap shadow-pill transition">
            File Emergency Cashless Claim
          </button>
          <button className="px-5 py-2 rounded-full bg-white hover:bg-canvas border border-hairline text-neutral-700 text-xs font-semibold whitespace-nowrap transition text-center">
            Download Policy Charter
          </button>
        </div>
      </div>

      {/* Claims & Advances Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="p-5 border-b border-hairline bg-warmSurface flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-darkCharcoal">Welfare Claims & 0% Micro-Loan Passbook</h3>
          <span className="text-xs font-semibold text-coopDark">Disbursed Directly from Society Reserve</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase">
              <tr>
                <th className="py-3 px-6">Claim ID</th>
                <th className="py-3 px-4">Worker Member</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-6 text-right">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {claims.map((c) => (
                <tr key={c.id} className="hover:bg-canvas/60">
                  <td className="py-3.5 px-6 font-mono font-bold text-darkCharcoal">{c.id}</td>
                  <td className="py-3.5 px-4 font-bold text-darkCharcoal">{c.worker}</td>
                  <td className="py-3.5 px-4 text-neutral-600">{c.category}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-darkCharcoal">{c.amount}</td>
                  <td className="py-3.5 px-4 text-neutral-500">{c.date}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-coopSoft text-coopDark font-bold text-[10px]">
                      {c.status}
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
