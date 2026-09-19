import React from 'react';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  Wallet, 
  DollarSign, 
  PieChart, 
  Receipt, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { societyData } from '../../data/portalData';

export default function SocietyFinance() {
  const transactions = [
    { id: 'TX-9042', bookingId: 'NX-94812', worker: 'Ramesh Kumar', customer: 'Arjun S.', gross: '₹299', payout: '₹254.15 (85%)', welfare: '₹14.95 (5%)', society: '₹29.90 (10%)', status: 'Settled' },
    { id: 'TX-9041', bookingId: 'NX-94811', worker: 'Ramesh Kumar', customer: 'Pooja H.', gross: '₹599', payout: '₹509.15 (85%)', welfare: '₹29.95 (5%)', society: '₹59.90 (10%)', status: 'Settled' },
    { id: 'TX-9040', bookingId: 'NX-94810', worker: 'Mahesh G.', customer: 'Vikas S.', gross: '₹449', payout: '₹381.65 (85%)', welfare: '₹22.45 (5%)', society: '₹44.90 (10%)', status: 'Escrow Secured' },
    { id: 'TX-9039', bookingId: 'NX-94808', worker: 'Lakshmi Bai', customer: 'Deepak N.', gross: '₹799', payout: '₹679.15 (85%)', welfare: '₹39.95 (5%)', society: '₹79.90 (10%)', status: 'Settled' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Cooperative Financial Ledger</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Auditable 85/5/10 statutory split with zero private intermediary extraction.
          </p>
        </div>

        <button className="px-4 py-2 rounded-full bg-white hover:bg-canvas border border-hairline text-xs font-bold text-darkCharcoal flex items-center gap-1.5 shadow-subtle">
          <Download size={14} /> Download Statutory CA Audit Sheet
        </button>
      </div>

      {/* Top Level Financial Split Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Today's Gross Volume</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹48,620</p>
          <p className="text-[11px] text-neutral-500 mt-1">32 Verified Bookings</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-coopDark uppercase">Worker Payouts (85%)</p>
          <p className="font-serif text-3xl font-medium text-coopDark mt-1">₹41,327</p>
          <p className="text-[11px] text-coopDark font-semibold mt-1">Direct IMPS Bank Settlement</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-hairline shadow-subtle">
          <p className="text-[11px] font-bold text-neutral-500 uppercase">Welfare Escrow (5%)</p>
          <p className="font-serif text-3xl font-medium text-darkCharcoal mt-1">₹2,431</p>
          <p className="text-[11px] text-neutral-500 mt-1">Health & Accidental Pool</p>
        </div>

        <div className="bg-darkCharcoal text-white rounded-3xl p-6 border border-neutral-800 shadow-subtle">
          <p className="text-[11px] font-bold text-yellowAccent uppercase">Aggregator Commission</p>
          <p className="font-serif text-3xl font-medium text-white mt-1">₹0.00</p>
          <p className="text-[11px] text-neutral-400 mt-1">Zero Private Venture Cut</p>
        </div>

      </div>

      {/* Statutory Split Policy Explanation Card */}
      <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-bold text-darkCharcoal">Statutory Revenue Allocation Policy</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark">
            Karnataka Co-op Societies Act 1959
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-3xl bg-warmSurface border border-hairline">
            <span className="text-xs font-bold text-coopDark">85% Direct to Worker</span>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Paid immediately upon customer Start OTP verification and completion signoff. No lead fees, penalty cuts or platform throttling.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-warmSurface border border-hairline">
            <span className="text-xs font-bold text-darkCharcoal">5% Member Welfare Escrow</span>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Deposited into worker's owned social security passbook for ₹5L health shield, disability coverage, and 0% emergency tool advances.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-warmSurface border border-hairline">
            <span className="text-xs font-bold text-neutral-600">10% Society Ops & Tech</span>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Maintains local ward cooperative office, tools inventory, dispatcher telemetry, server bandwidth, and annual financial audits.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-4xl border border-hairline shadow-card overflow-hidden">
        <div className="p-5 border-b border-hairline bg-warmSurface flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-darkCharcoal">Today's Transaction Splits</h3>
          <span className="text-xs font-mono font-medium text-neutral-500">Real-time IMPS Escrow Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-bold text-neutral-500 uppercase">
              <tr>
                <th className="py-3 px-6">Tx ID</th>
                <th className="py-3 px-4">Worker Member</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Gross Collected</th>
                <th className="py-3 px-4">Worker Share (85%)</th>
                <th className="py-3 px-4">Welfare (5%)</th>
                <th className="py-3 px-4">Society Ops (10%)</th>
                <th className="py-3 px-6 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-canvas/60">
                  <td className="py-3.5 px-6 font-mono font-bold text-darkCharcoal">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-darkCharcoal">{t.worker}</td>
                  <td className="py-3.5 px-4 text-neutral-600">{t.customer}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-darkCharcoal">{t.gross}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-coopDark">{t.payout}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{t.welfare}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">{t.society}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-coopSoft text-coopDark font-bold text-[10px]">
                      {t.status}
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
