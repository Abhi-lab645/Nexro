import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationWelfare() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Statewide Social Safety & Welfare</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Centralized health shield, accidental insurance, and welfare passbook oversight.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark border border-coopGreen/20">
          8,420 Active Policies Registered
        </span>
      </div>

      {/* Welfare Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card">
          <p className="text-xs font-bold text-neutral-500 uppercase">Total Welfare Reserve</p>
          <p className="font-serif text-4xl font-bold text-coopDark mt-2">{federationData.welfareOverview.totalWelfareReserve}</p>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
            Accumulated from statutory 5% deductions across all network jobs. Managed in cooperative trust.
          </p>
        </div>

        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card">
          <p className="text-xs font-bold text-neutral-500 uppercase">Group Hospital Shield</p>
          <p className="font-serif text-4xl font-bold text-darkCharcoal mt-2">₹5,00,000</p>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
            100% active coverage across all 8,420 tradespeople in 126 societies with zero individual premium deductions.
          </p>
        </div>

        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card">
          <p className="text-xs font-bold text-neutral-500 uppercase">0% Emergency Advances</p>
          <p className="font-serif text-4xl font-bold text-darkCharcoal mt-2">{federationData.welfareOverview.microLoansDisbursed}</p>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
            Zero-interest micro-loans disbursed for tools, equipment and medical emergencies.
          </p>
        </div>
      </div>

    </div>
  );
}
