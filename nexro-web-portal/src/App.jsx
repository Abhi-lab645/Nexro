import React from 'react';
import { useAuth } from './context/AuthContext';
import TopNav from './components/common/TopNav';
import NotificationDrawer from './components/common/NotificationDrawer';
import AuthLanding from './components/auth/AuthLanding';

// Society Components
import SocietyOverview from './components/society/SocietyOverview';
import SocietyPeople from './components/society/SocietyPeople';
import SocietyJobs from './components/society/SocietyJobs';
import SocietyServices from './components/society/SocietyServices';
import SocietyFinance from './components/society/SocietyFinance';
import SocietyWelfare from './components/society/SocietyWelfare';
import SocietyAnalytics from './components/society/SocietyAnalytics';
import EmergencyDispatchDrawer from './components/society/EmergencyDispatchDrawer';

// Federation Components
import FederationOverview from './components/federation/FederationOverview';
import FederationDemandAI from './components/federation/FederationDemandAI';
import FederationSocieties from './components/federation/FederationSocieties';
import FederationWorkforce from './components/federation/FederationWorkforce';
import FederationJobs from './components/federation/FederationJobs';
import FederationServices from './components/federation/FederationServices';
import FederationFinance from './components/federation/FederationFinance';
import FederationWelfare from './components/federation/FederationWelfare';
import FederationAnalytics from './components/federation/FederationAnalytics';

export default function App() {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    emergencyDrawerOpen, 
    setEmergencyDrawerOpen 
  } = useAuth();

  // If unauthenticated, render the full Auth & Registration portal
  if (role === 'unauthenticated') {
    return <AuthLanding />;
  }

  return (
    <div className="min-h-screen bg-canvas text-darkCharcoal selection:bg-yellowAccent selection:text-darkCharcoal font-sans antialiased">
      
      {/* Editorial Crextio Top Navigation Dock */}
      <TopNav />

      {/* Slide-over Drawers */}
      <NotificationDrawer />
      {role === 'society' && (
        <EmergencyDispatchDrawer 
          isOpen={emergencyDrawerOpen} 
          onClose={() => setEmergencyDrawerOpen(false)} 
        />
      )}

      {/* Main Workspace Canvas Container */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {role === 'society' ? (
          <>
            {activeTab === 'overview' && <SocietyOverview />}
            {activeTab === 'people' && <SocietyPeople />}
            {activeTab === 'jobs' && <SocietyJobs />}
            {activeTab === 'services' && <SocietyServices />}
            {activeTab === 'finance' && <SocietyFinance />}
            {activeTab === 'welfare' && <SocietyWelfare />}
            {activeTab === 'analytics' && <SocietyAnalytics />}
          </>
        ) : (
          <>
            {activeTab === 'overview' && <FederationOverview />}
            {activeTab === 'societies' && <FederationSocieties />}
            {activeTab === 'workforce' && <FederationWorkforce />}
            {activeTab === 'jobs' && <FederationJobs />}
            {activeTab === 'services' && <FederationServices />}
            {activeTab === 'finance' && <FederationFinance />}
            {activeTab === 'welfare' && <FederationWelfare />}
            {activeTab === 'demand_ai' && <FederationDemandAI />}
            {activeTab === 'analytics' && <FederationAnalytics />}
          </>
        )}
      </main>

      {/* Discreet Fast Role Switcher Pill for Evaluators */}
      <aside 
        aria-label="Evaluator Controls" 
        className="fixed bottom-4 right-6 z-40 bg-darkCharcoal/95 backdrop-blur-md text-white px-4 py-2 rounded-full border border-neutral-700 shadow-elevated flex items-center gap-3 text-xs"
      >
        <span className="w-2 h-2 rounded-full bg-coopGreen animate-pulse" />
        <span className="text-neutral-400 font-medium">Active Mode:</span>
        <button
          onClick={() => {
            setRole('society');
            setActiveTab('overview');
          }}
          className={`px-2.5 py-1 rounded-full font-bold transition ${
            role === 'society' ? 'bg-yellowAccent text-darkCharcoal shadow-sm' : 'text-neutral-300 hover:text-white'
          }`}
        >
          Society (Ward #42)
        </button>
        <button
          onClick={() => {
            setRole('federation');
            setActiveTab('overview');
          }}
          className={`px-2.5 py-1 rounded-full font-bold transition ${
            role === 'federation' ? 'bg-yellowAccent text-darkCharcoal shadow-sm' : 'text-neutral-300 hover:text-white'
          }`}
        >
          Federation Apex
        </button>
        <span className="text-neutral-600">|</span>
        <button
          onClick={() => setRole('unauthenticated')}
          className="text-neutral-400 hover:text-white transition font-medium"
        >
          Auth Page
        </button>
      </aside>

    </div>
  );
}
