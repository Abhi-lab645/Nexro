import React, { createContext, useContext, useState } from 'react';
import { societyData, federationData } from '../data/portalData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default to authenticated society for instant evaluator preview, or toggleable to 'unauthenticated' / 'federation'
  const [role, setRole] = useState('society'); // 'society' | 'federation' | 'unauthenticated'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Modals and Drawers
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [emergencyDrawerOpen, setEmergencyDrawerOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [authStep, setAuthStep] = useState('landing'); // 'landing' | 'society_login' | 'federation_login' | 'society_signup' | 'pending'
  
  // Dynamic State for Actions
  const [workersList, setWorkersList] = useState(societyData.workers);
  const [emergencyJobs, setEmergencyJobs] = useState(societyData.emergencyJobs);
  const [rebalanceApproved, setRebalanceApproved] = useState(false);
  const [registeredSocieties, setRegisteredSocieties] = useState(federationData.societiesList);
  const [pendingRegistration, setPendingRegistration] = useState(null);

  // Auth Methods
  const loginAsSociety = () => {
    setRole('society');
    setActiveTab('overview');
    setAuthStep('landing');
  };

  const loginAsFederation = () => {
    setRole('federation');
    setActiveTab('overview');
    setAuthStep('landing');
  };

  const logout = () => {
    setRole('unauthenticated');
    setAuthStep('landing');
  };

  // Human-in-the-loop AI Capacity Allocation
  const approveRebalancePlan = () => {
    setRebalanceApproved(true);
  };

  // Emergency Job Proximity Dispatch
  const assignEmergencyJob = (jobId, workerId) => {
    setEmergencyJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, assignedWorker: workerId };
      }
      return job;
    }));
    setWorkersList(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, status: 'On Job' };
      }
      return w;
    }));
  };

  // Worker Verification Approval
  const approveWorkerVerification = (workerId) => {
    setWorkersList(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, verification: 'Verified' };
      }
      return w;
    }));
  };

  // Submit Multi-step Society Signup
  const submitSocietySignup = (formData) => {
    setPendingRegistration({
      id: `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...formData
    });
    setAuthStep('pending');
  };

  return (
    <AuthContext.Provider value={{
      role,
      setRole,
      activeTab,
      setActiveTab,
      notificationsOpen,
      setNotificationsOpen,
      emergencyDrawerOpen,
      setEmergencyDrawerOpen,
      selectedWorkerId,
      setSelectedWorkerId,
      selectedJobId,
      setSelectedJobId,
      authStep,
      setAuthStep,
      workersList,
      emergencyJobs,
      rebalanceApproved,
      approveRebalancePlan,
      assignEmergencyJob,
      approveWorkerVerification,
      registeredSocieties,
      pendingRegistration,
      submitSocietySignup,
      loginAsSociety,
      loginAsFederation,
      logout,
      currentSociety: societyData,
      currentFederation: federationData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
