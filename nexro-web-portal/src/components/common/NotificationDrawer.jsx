import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, AlertCircle, Sparkles, ShieldAlert, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function NotificationDrawer() {
  const { 
    notificationsOpen, 
    setNotificationsOpen, 
    role, 
    setRole, 
    setActiveTab, 
    setEmergencyDrawerOpen 
  } = useAuth();

  if (!notificationsOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      type: 'emergency',
      icon: <AlertCircle className="text-alertCoral" size={18} />,
      title: '2 Emergency Jobs Unassigned in Ward #42',
      body: 'Customer Ananya S. reporting sparking main MCB at 12th Main Indiranagar. Immediate dispatch requested.',
      time: '3 mins ago',
      action: 'Assign Worker',
      onClick: () => {
        setRole('society');
        setActiveTab('overview');
        setEmergencyDrawerOpen(true);
        setNotificationsOpen(false);
      }
    },
    {
      id: 'notif-2',
      type: 'ai_demand',
      icon: <Sparkles className="text-aiIndigo" size={18} />,
      title: 'Tomorrow: +18% Surge in Electrical Requests',
      body: 'AI model projects 63 technician deficit in North Bengaluru. Inter-society allocation proposal ready for review.',
      time: '14 mins ago',
      action: 'Review AI Allocation',
      onClick: () => {
        setRole('federation');
        setActiveTab('demand_ai');
        setNotificationsOpen(false);
      }
    },
    {
      id: 'notif-3',
      type: 'compliance',
      icon: <ShieldAlert className="text-yellowAccent" size={18} />,
      title: '4 NSQF Level 4 Certifications Expiring',
      body: 'Ramesh Kumar & 3 electricians due for statutory renewal before Sep 30 under Karnataka Co-op guidelines.',
      time: '1 hour ago',
      action: 'View Roster',
      onClick: () => {
        setRole('society');
        setActiveTab('people');
        setNotificationsOpen(false);
      }
    },
    {
      id: 'notif-4',
      type: 'welfare',
      icon: <CheckCircle2 className="text-coopGreen" size={18} />,
      title: '₹2,431 Welfare Escrow Credited',
      body: 'Completed 14 morning jobs settled successfully. Member healthcare funds locked in cooperative trust.',
      time: '2 hours ago',
      action: 'Open Ledger',
      onClick: () => {
        setRole('society');
        setActiveTab('welfare');
        setNotificationsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-darkCharcoal/30 backdrop-blur-sm transition-opacity"
        onClick={() => setNotificationsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-hairline shadow-elevated flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-hairline flex items-center justify-between bg-warmSurface">
            <div>
              <h2 className="text-base font-bold text-darkCharcoal font-serif">Real-Time Telemetry & Alerts</h2>
              <p className="text-xs text-neutral-500">Karnataka Cooperative Mesh Gateway</p>
            </div>
            <button 
              onClick={() => setNotificationsOpen(false)}
              className="p-2 rounded-full hover:bg-white text-neutral-500 hover:text-darkCharcoal transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-canvas/50">
            {notifications.map((n) => (
              <div 
                key={n.id}
                className="p-4 bg-white rounded-3xl border border-hairline shadow-subtle hover:shadow-card transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-2xl bg-canvas border border-hairline mt-0.5">
                    {n.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-darkCharcoal">{n.title}</h3>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{n.body}</p>
                    
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-hairline/60">
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <Clock size={10} /> {n.time}
                      </span>
                      <button
                        onClick={n.onClick}
                        className="text-xs font-bold text-darkCharcoal hover:text-coopDark flex items-center gap-1 group"
                      >
                        {n.action}
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-hairline bg-white text-center">
            <span className="text-[11px] text-neutral-500">
              ● All 126 Primary Societies Connected via Cryptographic Mesh
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
