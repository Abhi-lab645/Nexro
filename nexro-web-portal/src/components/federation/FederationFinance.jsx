import React from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  Download, 
  FileSpreadsheet, 
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import { federationData } from '../../data/portalData';

export default function FederationFinance() {
  const societyLedgers = [
    { name: 'Karnataka Contract Labour Co-op #42', weeklyVol: '₹1,42,800', workerCut: '₹1,21,380', welfare: '₹7,140', ops: '₹14,280', status: 'Reconciled' },
    { name: 'Domlur Labour Cooperative Society #18', weeklyVol: '₹1,56,400', workerCut: '₹1,32,940', welfare: '₹7,820', ops: '₹15,640', status: 'Reconciled' },
    { name: 'Ulsoor Artisan Handyman Co-op #09', weeklyVol: '₹1,18,200', workerCut: '₹1,00,470', welfare: '₹5,910', ops: '₹11,820', status: 'Reconciled' },
    { name: 'Malleshwaram Trade Labour Co-op', weeklyVol: '₹1,84,000', workerCut: '₹1,56,400', welfare: '₹9,200', ops: '₹18,400', status: 'Reconciled' },
    { name: 'Koramangala Community Service Co-op', weeklyVol: '₹2,12,000', workerCut: '₹1,80,200', welfare: '₹10,600', ops: '₹21,200', status: 'Reconciled' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Network Treasury & Escrow Settlement</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Aggregated financial clearing across 126 primary labour cooperative societies.
          </p>
        </div>

        <button className="px-4 py-2 rounded-full bg-white hover:bg-canvas border border-hairline text-xs font-bold text-darkCharcoal flex items-center gap-1.5 shadow-subtle">
          <Download size={14} /> Export Registrar Clearing Statement
        </button>
      </div>

      {/* Macro Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Weekly Network Volume</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹18,42,000</p>
          <p className="text-[11px] text-coopDark font-semibold mt-1">4,218 Completed Jobs</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-coopDark uppercase">Direct Worker Payouts (85%)</p>
          <p className="font-serif text-3xl font-medium text-coopDark mt-1">₹15,65,700</p>
          <p className="text-[11px] text-coopDark font-semibold mt-1">Direct to 3,284 Bank Accounts</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Welfare Escrow (5%)</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹92,100</p>
          <p className="text-[11px] text-neutral-500 mt-1">Statewide Safety Net Fund</p>
        </div>

        <div className="bg-darkCharcoal text-white rounded-3xl p-6 border border-neutral-800 shadow-subtle">
          <p className="text-[11px] font-bold text-yellowAccent uppercase">Aggregator Extractive Cut</p>
          <p className="font-serif text-3xl font-medium text-white mt-1">₹0.00</p>
          <p className="text-[11px] text-neutral-400 mt-1">Cooperative Retained Value</p>
        </div>
      </div>

      {/* Societies Ledger */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="p-5 border-b border-hairline bg-warmSurface flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-darkCharcoal">Primary Societies Settlement Clearing</h3>
          <span className="text-xs text-neutral-500">Karnataka Co-op Banking Network Clearing</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase">
              <tr>
                <th className="py-3 px-6">Primary Society</th>
                <th className="py-3 px-4">Weekly Escrow Volume</th>
                <th className="py-3 px-4">Worker Disbursals (85%)</th>
                <th className="py-3 px-4">Welfare Fund (5%)</th>
                <th className="py-3 px-4">Society Ops (10%)</th>
                <th className="py-3 px-6 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {societyLedgers.map((s, i) => (
                <tr key={i} className="hover:bg-canvas/60">
                  <td className="py-3.5 px-6 font-bold text-darkCharcoal">{s.name}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-darkCharcoal">{s.weeklyVol}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-coopDark">{s.workerCut}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{s.welfare}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{s.ops}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-coopSoft text-coopDark font-bold text-[10px]">
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
