import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Globe2, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  FileCheck,
  ChevronRight,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { societyData, federationData } from '../../data/portalData';

export default function AuthLanding() {
  const { 
    loginAsSociety, 
    loginAsFederation, 
    submitSocietySignup, 
    pendingRegistration 
  } = useAuth();

  const [activeModal, setActiveModal] = useState(null); // 'society_login' | 'federation_login' | 'society_signup' | 'pending'
  
  // Registration Form State
  const [signupStep, setSignupStep] = useState(1);
  const [signupForm, setSignupForm] = useState({
    societyName: 'Bengaluru East Labour Workers Co-operative Society Ltd.',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    address: '14, 100ft Rd, HAL 2nd Stage, Indiranagar',
    regNo: 'KCS/BLR-E/5120/2014',
    regAuthority: 'Registrar of Co-operative Societies, Karnataka',
    adminName: 'Manjunath K.',
    designation: 'Elected Secretary & Operations Steward',
    mobile: '+91 98450 33219',
    email: 'admin@blr-east-labour.coop'
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    submitSocietySignup(signupForm);
    setActiveModal('pending');
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between py-12 px-6 relative overflow-hidden">
      
      {/* Subtle ambient golden/warm glow at corners */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellowAccent/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-coopSoft/50 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full text-center z-10">
        
        {/* Emblem */}
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-3xl border border-hairline shadow-subtle mb-6">
          <img 
            src="/logo.png" 
            alt="Nexro Logo" 
            className="w-14 h-14 object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warmSurface border border-hairline text-[11px] font-bold text-darkCharcoal uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-coopGreen animate-ping" />
          Autonomous Cooperative Operating System
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-darkCharcoal font-normal tracking-tight">
          Welcome to Nexro
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-sans leading-relaxed">
          Cooperative technology for better services, stronger workers, and democratic self-governed communities.
        </p>
      </div>

      {/* Main Dual Organization Selector Cards */}
      <div className="max-w-5xl mx-auto w-full my-10 grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        
        {/* Card 1: Labour Cooperative Society */}
        <div className="bg-white rounded-4xl p-8 border border-hairline shadow-card hover:shadow-elevated transition duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl bg-coopSoft text-coopDark border border-coopGreen/20">
                <Building2 size={28} />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-coopSoft text-coopDark">
                Primary Society
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-darkCharcoal font-medium">
              Labour Cooperative Society
            </h2>
            <p className="text-sm text-neutral-600 mt-2.5 leading-relaxed">
              Operational workspace for registered primary societies. Manage verified worker-members, local bookings, fair dispatching, society welfare passbooks, and statutory finances.
            </p>

            {/* Feature Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Worker Member Rosters', 'Real-Time Dispatch', '85%+ Payout Accounting', 'Member Welfare Escrow'].map((chip, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1 rounded-full bg-warmSurface text-neutral-700 border border-hairline">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hairline flex flex-col gap-3">
            <button
              onClick={() => setActiveModal('society_login')}
              className="w-full py-3.5 px-6 rounded-full bg-darkCharcoal text-white hover:bg-neutral-800 text-sm font-bold flex items-center justify-center gap-2 shadow-pill transition"
            >
              Continue as Society <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                setActiveModal('society_signup');
                setSignupStep(1);
              }}
              className="text-xs font-semibold text-coopDark hover:text-darkCharcoal transition text-center py-1"
            >
              New society? Register for network affiliation →
            </button>
          </div>
        </div>

        {/* Card 2: Cooperative Federation */}
        <div className="bg-white rounded-4xl p-8 border border-hairline shadow-card hover:shadow-elevated transition duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl bg-yellowSoft text-darkCharcoal border border-yellowAccent/40">
                <Globe2 size={28} className="text-darkCharcoal" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellowSoft text-darkCharcoal">
                Apex Regional Body
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-darkCharcoal font-medium">
              Cooperative Federation
            </h2>
            <p className="text-sm text-neutral-600 mt-2.5 leading-relaxed">
              Command center for state and regional apex federations. Oversee network health across 126 affiliated societies, monitor regional workforce capacity, review audit compliance, and access AI demand forecasting.
            </p>

            {/* Feature Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['126 Societies Telemetry', 'Multi-Society Balancing', 'Demand AI Intelligence', 'Regulatory Audits'].map((chip, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1 rounded-full bg-warmSurface text-neutral-700 border border-hairline">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hairline flex flex-col gap-3">
            <button
              onClick={() => setActiveModal('federation_login')}
              className="w-full py-3.5 px-6 rounded-full bg-darkCharcoal text-white hover:bg-neutral-800 text-sm font-bold flex items-center justify-center gap-2 shadow-pill transition"
            >
              Continue as Federation <ArrowRight size={16} />
            </button>

            <button
              onClick={loginAsFederation}
              className="text-xs font-semibold text-darkCharcoal hover:text-coopDark transition text-center py-1"
            >
              Direct Apex MD Evaluator Access →
            </button>
          </div>
        </div>

      </div>

      {/* Quick Evaluator Bar */}
      <div className="max-w-2xl mx-auto w-full text-center z-10">
        <div className="p-4 bg-white/90 backdrop-blur-md rounded-3xl border border-hairline shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-600 font-medium">
            ⚡ One-Click Evaluator Sign-In:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={loginAsSociety}
              className="px-4 py-1.5 rounded-full bg-coopSoft text-coopDark text-xs font-bold hover:bg-coopGreen hover:text-white transition"
            >
              Sign in as Society #42
            </button>
            <button
              onClick={loginAsFederation}
              className="px-4 py-1.5 rounded-full bg-yellowSoft text-darkCharcoal text-xs font-bold hover:bg-yellowAccent transition"
            >
              Sign in as Apex MD
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Footer */}
      <footer className="max-w-4xl mx-auto w-full mt-10 pt-6 border-t border-hairline text-center text-xs text-neutral-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-coopGreen" />
          <span>Statutory Authority: Karnataka Co-operative Societies Act, 1959</span>
        </div>
        <div className="flex items-center gap-4">
          <span>256-bit Encrypted Session</span>
          <span>•</span>
          <span className="hover:text-darkCharcoal cursor-pointer">English · ಕನ್ನಡ · हिन्दी</span>
        </div>
      </footer>

      {/* Modal: Society Login */}
      {activeModal === 'society_login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-md w-full p-8 border border-hairline shadow-elevated relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2.5 rounded-2xl bg-coopSoft text-coopDark">
                <Building2 size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-warmSurface text-neutral-600 border border-hairline">
                Society Sign-In
              </span>
            </div>

            <h3 className="font-serif text-2xl text-darkCharcoal font-medium">Welcome Back, Steward</h3>
            <p className="text-xs text-neutral-600 mt-1">
              Sign in to manage Karnataka Contract Labour Co-operative Society #42.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1.5">Registered Mobile Number / Email</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input 
                    type="text" 
                    defaultValue="+91 94481 20491"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-hairline bg-canvas focus:bg-white focus:outline-none focus:ring-2 focus:ring-coopGreen text-xs font-medium text-darkCharcoal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1.5">Password / Member Passkey</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input 
                    type="password" 
                    defaultValue="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-hairline bg-canvas focus:bg-white focus:outline-none focus:ring-2 focus:ring-coopGreen text-xs font-medium text-darkCharcoal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-500">Demo Account: Society Admin #42</span>
                <span className="text-coopDark font-semibold cursor-pointer hover:underline">Forgot password?</span>
              </div>

              <button
                onClick={loginAsSociety}
                className="w-full py-3 rounded-full bg-darkCharcoal text-white hover:bg-neutral-800 text-xs font-bold shadow-pill transition"
              >
                Sign In to Society Dashboard
              </button>

              <button
                onClick={loginAsSociety}
                className="w-full py-3 rounded-full bg-warmSurface border border-hairline text-darkCharcoal hover:bg-canvas text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} className="text-yellowAccent" /> Continue with Instant OTP (Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Federation Login */}
      {activeModal === 'federation_login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-md w-full p-8 border border-hairline shadow-elevated relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2.5 rounded-2xl bg-yellowSoft text-darkCharcoal">
                <Globe2 size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-warmSurface text-neutral-600 border border-hairline">
                Apex Portal Access
              </span>
            </div>

            <h3 className="font-serif text-2xl text-darkCharcoal font-medium">Federation Workspace</h3>
            <p className="text-xs text-neutral-600 mt-1">
              Command gateway for Karnataka & Regional Labour Cooperative Federation.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1.5">Apex Officer Email / Mobile</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input 
                    type="text" 
                    defaultValue="md.hegde@nexro-federation.coop"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-hairline bg-canvas focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellowAccent text-xs font-medium text-darkCharcoal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-darkCharcoal block mb-1.5">Cryptographic Security Passkey</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input 
                    type="password" 
                    defaultValue="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-hairline bg-canvas focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellowAccent text-xs font-medium text-darkCharcoal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-500">Authenticated as: Dr. B.R. Hegde</span>
                <span className="text-darkCharcoal font-semibold cursor-pointer hover:underline">Support Desk</span>
              </div>

              <button
                onClick={loginAsFederation}
                className="w-full py-3 rounded-full bg-darkCharcoal text-white hover:bg-neutral-800 text-xs font-bold shadow-pill transition"
              >
                Sign In to Federation Command Center
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: 5-Step Society Registration */}
      {activeModal === 'society_signup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-xl w-full p-8 border border-hairline shadow-elevated relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-canvas text-neutral-500 hover:text-darkCharcoal"
            >
              <X size={18} />
            </button>

            {/* Stepper Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coopSoft text-coopDark">
                Step 0{signupStep} of 05
              </span>
              <span className="text-xs text-neutral-500 font-medium">Cooperative Affiliation Application</span>
            </div>

            <h3 className="font-serif text-2xl text-darkCharcoal font-medium">
              {signupStep === 1 && "Tell us about your society"}
              {signupStep === 2 && "Cooperative Registration Details"}
              {signupStep === 3 && "Administrator Account"}
              {signupStep === 4 && "Verify Contact via OTP"}
              {signupStep === 5 && "Review Statutory Application"}
            </h3>

            {/* Step 1: Organization */}
            {signupStep === 1 && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-darkCharcoal block mb-1">Legal Society Name</label>
                  <input 
                    type="text" 
                    value={signupForm.societyName}
                    onChange={(e) => setSignupForm({ ...signupForm, societyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-darkCharcoal block mb-1">State</label>
                    <input 
                      type="text" 
                      value={signupForm.state}
                      disabled
                      className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-neutral-100 text-xs font-medium text-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-darkCharcoal block mb-1">District</label>
                    <input 
                      type="text" 
                      value={signupForm.district}
                      onChange={(e) => setSignupForm({ ...signupForm, district: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-darkCharcoal block mb-1">Registered Address</label>
                  <input 
                    type="text" 
                    value={signupForm.address}
                    onChange={(e) => setSignupForm({ ...signupForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                  />
                </div>
                <button
                  onClick={() => setSignupStep(2)}
                  className="w-full mt-4 py-3 rounded-full bg-darkCharcoal text-white hover:bg-neutral-800 text-xs font-bold shadow-pill"
                >
                  Continue to Registration Details →
                </button>
              </div>
            )}

            {/* Step 2: Statutory Registration */}
            {signupStep === 2 && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-darkCharcoal block mb-1">Cooperative Registration Number</label>
                  <input 
                    type="text" 
                    value={signupForm.regNo}
                    onChange={(e) => setSignupForm({ ...signupForm, regNo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-darkCharcoal block mb-1">Registering Authority</label>
                  <input 
                    type="text" 
                    value={signupForm.regAuthority}
                    onChange={(e) => setSignupForm({ ...signupForm, regAuthority: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                  />
                </div>
                <div className="p-4 rounded-2xl border border-dashed border-hairline bg-warmSurface text-center">
                  <FileCheck size={24} className="mx-auto text-coopGreen mb-1" />
                  <p className="text-xs font-bold text-darkCharcoal">Registration Certificate Uploaded</p>
                  <p className="text-[11px] text-neutral-500">kcls_registration_cert_1959.pdf (1.8 MB)</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSignupStep(1)}
                    className="w-1/3 py-3 rounded-full bg-canvas text-darkCharcoal text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setSignupStep(3)}
                    className="w-2/3 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold"
                  >
                    Continue to Administrator →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Administrator */}
            {signupStep === 3 && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-darkCharcoal block mb-1">Steward / Administrator Full Name</label>
                  <input 
                    type="text" 
                    value={signupForm.adminName}
                    onChange={(e) => setSignupForm({ ...signupForm, adminName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-darkCharcoal block mb-1">Official Mobile</label>
                    <input 
                      type="text" 
                      value={signupForm.mobile}
                      onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-darkCharcoal block mb-1">Official Email</label>
                    <input 
                      type="email" 
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-hairline bg-canvas text-xs font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSignupStep(2)} className="w-1/3 py-3 rounded-full bg-canvas text-darkCharcoal text-xs font-bold">Back</button>
                  <button onClick={() => setSignupStep(4)} className="w-2/3 py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold">Verify via OTP →</button>
                </div>
              </div>
            )}

            {/* Step 4: OTP */}
            {signupStep === 4 && (
              <div className="mt-6 text-center space-y-4">
                <p className="text-xs text-neutral-600">Enter the 6-digit verification code sent to {signupForm.mobile}</p>
                <div className="flex justify-center gap-2 my-4">
                  {['8', '4', '9', '2', '1', '0'].map((digit, i) => (
                    <div key={i} className="w-10 h-12 rounded-xl border border-hairline bg-canvas flex items-center justify-center font-mono font-bold text-lg text-darkCharcoal">
                      {digit}
                    </div>
                  ))}
                </div>
                <button onClick={() => setSignupStep(5)} className="w-full py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold">Verify & Review →</button>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {signupStep === 5 && (
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-3xl bg-warmSurface border border-hairline text-xs space-y-2">
                  <div className="flex justify-between"><span className="text-neutral-500">Society:</span><span className="font-bold text-darkCharcoal">{signupForm.societyName}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Reg No:</span><span className="font-mono font-bold text-darkCharcoal">{signupForm.regNo}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Steward:</span><span className="font-bold text-darkCharcoal">{signupForm.adminName}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Contact:</span><span className="font-medium text-darkCharcoal">{signupForm.mobile}</span></div>
                </div>

                <p className="text-[11px] text-neutral-500 leading-normal">
                  By submitting this application, you declare compliance with the Karnataka Cooperative Societies Act, 1959 and agree to the statutory 85% worker compensation and 5% member welfare escrow reserve policy.
                </p>

                <button
                  onClick={handleSignupSubmit}
                  className="w-full py-3.5 rounded-full bg-coopGreen hover:bg-coopDark text-white text-xs font-bold shadow-pill transition"
                >
                  Submit Registration for Federation Ratification
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Modal: Pending Approval */}
      {activeModal === 'pending' && pendingRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkCharcoal/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-4xl max-w-md w-full p-8 border border-hairline shadow-elevated text-center relative">
            <div className="w-14 h-14 rounded-full bg-yellowSoft text-darkCharcoal flex items-center justify-center mx-auto mb-4 border border-yellowAccent/40">
              <CheckCircle2 size={28} className="text-darkCharcoal" />
            </div>

            <span className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-yellowSoft text-darkCharcoal">
              ● Under Federation Review
            </span>

            <h3 className="font-serif text-2xl text-darkCharcoal font-medium mt-3">
              Application Under Review
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Your society registration application has been submitted to the Apex Federation Registrar Desk.
            </p>

            <div className="my-6 p-4 rounded-3xl bg-warmSurface border border-hairline text-left text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-neutral-500">Application ID:</span><span className="font-mono font-bold text-darkCharcoal">{pendingRegistration.id}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Society:</span><span className="font-bold text-darkCharcoal truncate max-w-[200px]">{pendingRegistration.societyName}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Submitted:</span><span className="text-darkCharcoal">{pendingRegistration.date}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Status:</span><span className="font-bold text-yellowAccent">Statutory Verification In Progress</span></div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-full bg-darkCharcoal text-white text-xs font-bold shadow-pill"
            >
              Return to Nexro Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
