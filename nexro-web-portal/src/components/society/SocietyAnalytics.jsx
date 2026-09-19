import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  Download,
  Calendar
} from 'lucide-react';

export default function SocietyAnalytics() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="font-serif text-3xl text-darkCharcoal font-medium">Operations & Welfare Analytics</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Practical operational indicators answering real cooperative governance questions.
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-hairline shadow-subtle">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '3m', label: '3 Months' },
            { id: '12m', label: '12 Months' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setPeriod(t.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                period === t.id 
                  ? 'bg-darkCharcoal text-white shadow-pill' 
                  : 'text-neutral-600 hover:text-darkCharcoal'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Question 1 */}
        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-coopDark bg-coopSoft px-2.5 py-1 rounded-full">
              SLA Performance
            </span>
            <h3 className="font-serif text-xl font-bold text-darkCharcoal mt-3">Average Job Completion Time</h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-serif text-4xl font-bold text-darkCharcoal">38 min</span>
              <span className="text-xs font-bold text-coopDark">-14 min vs private apps</span>
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Localized ward proximity and pre-screened tools reduce turnaround friction.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-[11px] text-neutral-400">
            <span>Customer satisfaction: 99.2%</span>
            <span>Benchmark: 52 min</span>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-darkCharcoal bg-yellowSoft px-2.5 py-1 rounded-full">
              Worker Retention
            </span>
            <h3 className="font-serif text-xl font-bold text-darkCharcoal mt-3">Monthly Worker Take-Home</h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-serif text-4xl font-bold text-coopDark">₹38,420</span>
              <span className="text-xs font-bold text-coopDark">+78% vs aggregators</span>
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Due to 85%+ statutory retention and zero arbitrary platform fines.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-[11px] text-neutral-400">
            <span>+₹2,400 welfare escrow</span>
            <span>Aggregator avg: ₹19,200</span>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white rounded-4xl p-7 border border-hairline shadow-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-darkCharcoal bg-warmSurface px-2.5 py-1 rounded-full border border-hairline">
              Non-Punitive Reliability
            </span>
            <h3 className="font-serif text-xl font-bold text-darkCharcoal mt-3">Job Cancellation Rate</h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-serif text-4xl font-bold text-darkCharcoal">0.4%</span>
              <span className="text-xs font-bold text-coopDark">Near Zero</span>
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Fair work rotation allows passing jobs without algorithmic demotion.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-[11px] text-neutral-400">
            <span>32 jobs fulfilled today</span>
            <span>Private app avg: 12.8%</span>
          </div>
        </div>

      </div>

    </div>
  );
}
