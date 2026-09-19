import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, 
  Settings, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  Building2, 
  Globe2,
  ExternalLink
} from 'lucide-react';

export default function TopNav() {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    setNotificationsOpen,
    currentSociety,
    currentFederation,
    logout,
    rebalanceApproved
  } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isSociety = role === 'society';
  const org = isSociety ? currentSociety : currentFederation;
  const adminUser = isSociety ? currentSociety.admin : currentFederation.officer;

  const societyTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'people', label: 'People' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'services', label: 'Services' },
    { id: 'finance', label: 'Finance' },
    { id: 'welfare', label: 'Welfare' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const federationTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'societies', label: 'Societies' },
    { id: 'workforce', label: 'Workforce' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'services', label: 'Services' },
    { id: 'finance', label: 'Finance' },
    { id: 'welfare', label: 'Welfare' },
    { id: 'demand_ai', label: 'Demand AI', hasAiBadge: true },
    { id: 'analytics', label: 'Analytics' }
  ];

  const tabs = isSociety ? societyTabs : federationTabs;

  return (
    <header className="sticky top-0 z-30 bg-canvas/90 backdrop-blur-md border-b border-hairline px-6 py-3.5 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Emblem & Role Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-1.5 bg-white rounded-full border border-hairline shadow-subtle">
            <img 
              src="/logo.png" 
              alt="Nexro Logo" 
              className="w-7 h-7 object-contain rounded-full"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-darkCharcoal tracking-tight">Nexro</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-coopSoft text-coopDark">
                {isSociety ? 'Society' : 'Federation'}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-warmSurface rounded-full border border-hairline text-xs font-medium text-darkCharcoal">
            <span className="w-2 h-2 rounded-full bg-coopGreen animate-pulse"></span>
            <span className="truncate max-w-[200px]">{isSociety ? 'Ward #42 Indiranagar' : 'Karnataka Apex'}</span>
          </div>
        </div>

        {/* Center: Floating Navigation Pill Dock */}
        <nav className="flex items-center p-1.5 bg-white rounded-full border border-hairline shadow-subtle overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive 
                    ? 'bg-darkCharcoal text-white shadow-pill font-bold' 
                    : 'text-neutral-600 hover:text-darkCharcoal hover:bg-canvas'
                }`}
              >
                {tab.label}
                {tab.hasAiBadge && (
                  <span className={`w-1.5 h-1.5 rounded-full ${rebalanceApproved ? 'bg-coopGreen' : 'bg-aiIndigo animate-ping'}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Tools, Notifications & User Profile */}
        <div className="flex items-center gap-2.5">
          
          {/* Notification Trigger with Badge */}
          <button 
            onClick={() => setNotificationsOpen(true)}
            className="relative p-2.5 bg-white hover:bg-canvas rounded-full border border-hairline text-neutral-700 hover:text-darkCharcoal transition shadow-subtle"
            title="Notifications & Telemetry"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-alertCoral ring-2 ring-white"></span>
          </button>

          {/* Profile & Role Switch Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-white hover:bg-canvas rounded-full border border-hairline shadow-subtle transition"
            >
              <img 
                src={adminUser.avatar} 
                alt={adminUser.name} 
                className="w-7 h-7 rounded-full object-cover border border-hairline"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-darkCharcoal leading-tight flex items-center gap-1">
                  {adminUser.name.split(' ')[0]}
                  <ChevronDown size={12} className="text-neutral-500" />
                </div>
                <div className="text-[10px] text-neutral-500 leading-tight">
                  {isSociety ? 'Co-op Steward' : 'Apex MD'}
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-card border border-hairline py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-hairline">
                  <p className="text-xs font-bold text-darkCharcoal">{adminUser.name}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{adminUser.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-coopSoft text-[10px] font-bold text-coopDark">
                    <ShieldCheck size={11} /> {org.shortName}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setRole(isSociety ? 'federation' : 'society');
                      setActiveTab('overview');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-darkCharcoal hover:bg-canvas flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {isSociety ? <Globe2 size={14} className="text-aiIndigo" /> : <Building2 size={14} className="text-coopGreen" />}
                      Switch to {isSociety ? 'Federation Apex' : 'Society Portal'}
                    </span>
                    <span className="text-[10px] text-neutral-400">⌘S</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-alertCoral hover:bg-alertCoralSoft flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Sign Out & Return to /auth
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
