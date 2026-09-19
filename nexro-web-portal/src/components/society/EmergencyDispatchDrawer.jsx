import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  AlertTriangle, 
  Zap, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight,
  Phone
} from 'lucide-react';

export default function EmergencyDispatchDrawer() {
  const { 
    emergencyDrawerOpen, 
    setEmergencyDrawerOpen, 
    emergencyJobs, 
    assignEmergencyJob, 
    workersList 
  } = useAuth();

  const [selectedJob, setSelectedJob] = useState(emergencyJobs[0]);
  const [successToast, setSuccessToast] = useState(null);

  if (!emergencyDrawerOpen) return null;

  const availableWorkers = workersList.filter(w => w.status === 'Available');

  const handleAssign = (jobId, worker) => {
    assignEmergencyJob(jobId, worker.id);
    setSuccessToast(`Dispatched ${worker.name} (${worker.trade}) to ${selectedJob.customer}. Customer notified via SMS with Start OTP.`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-darkCharcoal/40 backdrop-blur-sm transition-opacity"
        onClick={() => setEmergencyDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-hairline shadow-elevated flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-hairline flex items-center justify-between bg-darkCharcoal text-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-alertCoral text-white">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold font-serif">Emergency Proximity Dispatch</h2>
                <p className="text-xs text-neutral-400">Ward #42 Cluster Rapid Response Hub</p>
              </div>
            </div>
            <button 
              onClick={() => setEmergencyDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Success Banner */}
          {successToast && (
            <div className="p-4 bg-coopSoft border-b border-coopGreen/20 text-coopDark text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} />
              <span>{successToast}</span>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-canvas/40">
            
            {/* Active Emergency Requests */}
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                Unassigned Priority Incidents
              </h3>
              <div className="space-y-3">
                {emergencyJobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-3xl border transition cursor-pointer ${
                      selectedJob?.id === job.id 
                        ? 'bg-white border-darkCharcoal shadow-card ring-1 ring-darkCharcoal' 
                        : 'bg-white border-hairline hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          job.assignedWorker ? 'bg-coopSoft text-coopDark' : 'bg-alertCoralSoft text-alertCoral'
                        }`}>
                          {job.assignedWorker ? 'DISPATCHED' : 'UNASSIGNED'}
                        </span>
                        <span className="font-mono text-xs font-bold text-darkCharcoal">{job.id}</span>
                      </div>
                      <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                        <Clock size={12} /> {job.waitingMin}m waiting
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-darkCharcoal mt-2">{job.service}</h4>
                    <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1">
                      <MapPin size={12} className="text-neutral-400" /> {job.address} ({job.distanceKm} km away)
                    </p>

                    <div className="mt-3 p-2.5 rounded-2xl bg-warmSurface border border-hairline text-xs text-neutral-700">
                      <span className="font-bold text-darkCharcoal">AI Triage Brief:</span> "{job.aiBrief}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proximity Matching Workers */}
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Eligible Technicians Nearby ({availableWorkers.length} Available)</span>
                <span className="text-[10px] text-coopDark font-semibold">Non-Punitive Fair Rotation</span>
              </h3>

              <div className="space-y-3">
                {availableWorkers.length === 0 ? (
                  <div className="p-6 bg-white rounded-3xl border border-hairline text-center text-xs text-neutral-500">
                    All technicians currently engaged on active jobs. Standby standby list accessible via Federation Demand AI.
                  </div>
                ) : (
                  availableWorkers.map((w) => (
                    <div 
                      key={w.id}
                      className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={w.avatar} 
                          alt={w.name} 
                          className="w-10 h-10 rounded-full object-cover border border-hairline"
                        />
                        <div>
                          <p className="text-xs font-bold text-darkCharcoal">{w.name}</p>
                          <p className="text-[11px] text-neutral-500">{w.trade} · ⭐ {w.rating}</p>
                          <p className="text-[10px] text-coopDark font-semibold">1.2 km away · ETA ~8 min</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAssign(selectedJob?.id || 'EMG-901', w)}
                        className="px-4 py-2 rounded-full bg-darkCharcoal hover:bg-neutral-800 text-white text-xs font-bold shadow-pill transition flex items-center gap-1"
                      >
                        Assign <ArrowRight size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-hairline bg-white flex items-center justify-between text-xs text-neutral-500">
            <span>Customer SLA: Guaranteed Arrival Under 15 Mins</span>
            <button 
              onClick={() => setEmergencyDrawerOpen(false)}
              className="font-bold text-darkCharcoal hover:underline"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
