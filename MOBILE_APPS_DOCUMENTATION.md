# Nexro Platform — Mobile Applications Comprehensive Documentation
**Product Version:** 1.0.0 (Expo / React Native)  
**Cooperative Framework:** Primary Labour Cooperative Society & Apex Federation Architecture  
**Target OS:** iOS (Universal Simulator & Device) / Android  

---

## 1. Executive Summary & Ecosystem Architecture

The **Nexro Platform** is a cooperative gig-economy ecosystem engineered to replace extractive intermediary platforms with worker-owned, cooperative enterprise infrastructure. Instead of taking 40–50% corporate aggregator cuts and imposing punitive algorithmic throttling, Nexro connects verified local Primary Labour Cooperative Societies (e.g., *Karnataka Contract Labour Co-operative Society Ltd. #42*) directly to consumers.

The mobile ecosystem is bifurcated into two independent, standalone mobile codebases:
1. **Nexro Consumer App (`nexro-consumer-app`)**: Customer booking, explainable AI diagnosis, transparent price breakdown, live worker tracking, and patronage rebate tracking.
2. **Nexro Worker App (`nexro-worker-app`)**: Tactical duty dashboard, non-punitive real-time dispatch, 4-stage job execution with OTP verification & photo proof, instant earnings ledger, social security welfare passbook, and digital skill passport.

```
                     ┌────────────────────────────────────────┐
                     │          Nexro Mobile Ecosystem        │
                     └───────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │    Nexro Consumer App     │ ◄──Deep Links──►  │     Nexro Worker App      │
   │  (`nexro-consumer-app`)   │   (Role Switch)   │   (`nexro-worker-app`)    │
   └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                 │                                               │
       [14 Modular Screens]                            [6 Core Tactical Screens]
       - Splash & Onboarding                           - Duty & Real-Time Beacon
       - OTP Login & Ward Match                        - 48s Dispatch Intake Modal
       - Home & Ward Demand Pulse                      - 4-Stage Active Execution
       - Multimodal AI Intake                          - 85% Direct Earnings Ledger
       - Explainable Matching                          - ₹5L Welfare & Loan Passbook
       - 85/5/10 Price Breakdown                       - Digital Skill Passport
       - Live Map & Relay Tracking                     - Emergency Safety SOS
```

---

## 2. Nexro Consumer App (`nexro-consumer-app`)

### 2.1 Complete Screen Breakdown & Feature Matrix

| Screen Name | File Path | Core Implemented Features |
| :--- | :--- | :--- |
| **Splash & Value Screen** | [`SplashScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/SplashScreen.js) | • Cooperative brand emblem with official logo<br>• Core value pillars: *100% Worker Owned*, *Zero Surge Gouging*, *85%+ Direct to Workers*, *₹5L Health Shield*<br>• 1-Tap language preview & fast onboarding entry |
| **Authentication & Auth** | [`LoginScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/LoginScreen.js) | • Phone number entry with auto-formatted +91 prefix<br>• 4-Digit OTP verification mock system<br>• Instant "Explore as Guest" bypass for rapid evaluator walkthrough<br>• Cooperative Consumer Patronage identification |
| **Ward & Society Selector** | [`LocationScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/LocationScreen.js) | • Geo-location selection across Bangalore clusters (Indiranagar, Domlur, Koramangala, Whitefield, Jayanagar)<br>• Dynamic binding to jurisdiction: *Indiranagar Gig Society #42*<br>• Proximity badge display with ETA calibrations |
| **Home Dashboard** | [`HomeScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/HomeScreen.js) | • Location & verified society banner pill with quick-switcher<br>• **"Ask Nexro AI" Hero Card**: One-tap trigger for natural language diagnostic intake<br>• **Active Live Tracking Float**: Persistent badge alerting if a technician is en-route<br>• **Service Grid**: Electrical, Plumbing, Appliance, Cleaning, Carpentry, Painting, Emergency<br>• **Cooperative Trust & Fair Pay Pill**: Transparency metrics on worker payouts<br>• **Top Verified Cooperative Pros**: Carousel displaying real verified master tradespeople |
| **Service Catalog** | [`AllServicesScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/AllServicesScreen.js) | • Search filter with real-time text query<br>• Multi-category filtering chips (All, Essential, Electronics, Home Care, Craftsmanship)<br>• Detailed cards with starting prices, average ETAs, cooperative star ratings, and review counts |
| **Ask Nexro AI Intake** | [`AskNexroAIScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/AskNexroAIScreen.js) | • **Multimodal Issue Description**: Multiline text input for customer symptoms<br>• **Photo Attachment Simulation**: Toggle photo upload (e.g., leaking pipe, blown fuse)<br>• **Voice Intake Simulation**: Fast speech-to-text prompt filling<br>• **Interactive Template Chips**: Quick-tap common issues (*MCB tripping repeatedly*, *Water dripping under sink*, *AC warm air*)<br>• **Inference Simulation**: Automated symptom classification into trade category, urgency level, transparent cost estimate, and root-cause summary<br>• **Direct Match Pipeline**: Directly embeds the matched specialist via `ExplainableMatchCard` |
| **Worker Matching** | [`WorkerMatchingScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/WorkerMatchingScreen.js) | • Proximity-based fair-dispatch algorithm display<br>• Queue sorting by distance, skill certifications, and fair allocation rules<br>• Direct worker selection with detailed badges (*Lead Master Electrician*, *Verified Society #42*) |
| **Worker Profile** | [`WorkerProfileScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/WorkerProfileScreen.js) | • Complete cooperative credentials view<br>• National Skill Qualification Framework (NSQF Level 4) & ITI trade certificates<br>• Lifetime completed jobs, customer rating (4.94/5.0), and police background check verification<br>• Direct "Proceed to Booking" CTA |
| **Transparent Booking Review** | [`BookingReviewScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/BookingReviewScreen.js) | • **Itemized Cooperative Cost Breakdown**: Displays exact distribution of service price (e.g., ₹299 total = ₹254 to worker direct (85%), ₹15 to worker healthcare reserve (5%), ₹30 to society logistics (10%), ₹0 private aggregator profit)<br>• Time slot scheduling (Immediate Emergency Dispatch vs Scheduled Slot)<br>• Job instructions & address confirmation |
| **Escrow Payment** | [`PaymentScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/PaymentScreen.js) | • Multi-gateway payment options: UPI (GPay/PhonePe/Paytm), Credit/Debit Card, Netbanking, Cash on Completion<br>• **Cooperative Escrow Guarantee**: Explicit disclosure that payment remains locked in cooperative escrow until customer signs off on the completed work |
| **Booking Confirmation** | [`BookingConfirmationScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/BookingConfirmationScreen.js) | • Digital cooperative service receipt with unique Booking ID (`NX-94812`)<br>• **Customer Start OTP Display**: Generates a 4-digit code (e.g., `5829`) required by the worker to initiate billing upon arrival<br>• Direct button to launch live GPS tracking |
| **Live Dispatch Tracking** | [`LiveTrackingScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/LiveTrackingScreen.js) | • Embedded interactive map component ([`LiveTrackingMap.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/components/LiveTrackingMap.js))<br>• 5-Stage Live Stepper: *Assigned* $\rightarrow$ *En Route* $\rightarrow$ *At Gate* $\rightarrow$ *In Progress* $\rightarrow$ *Completed*<br>• Dynamic ETA countdown (e.g., 14 mins $\rightarrow$ 6 mins $\rightarrow$ At gate)<br>• Privacy-masked direct phone call & cooperative in-app chat<br>• Emergency SOS button connecting to 24/7 hub |
| **Bookings & History** | [`BookingsListScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/BookingsListScreen.js) | • Segmented tabs: *Active Jobs* & *Past Completed Bookings*<br>• Past invoices with downloadable cooperative receipts<br>• Re-book specialist in 1-tap |
| **Profile & Settings** | [`ProfileAccountScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/ProfileAccountScreen.js) | • Customer membership ID & accumulated cooperative patronage points<br>• Multilingual preference switcher (English, हिन्दी, ಕನ್ನಡ)<br>• Emergency contact configuration & cooperative bylaws review |

---

## 3. Nexro Worker App (`nexro-worker-app`)

### 3.1 Complete Screen Breakdown & Feature Matrix

The Worker App provides a dignity-first tool designed for member-owners of the cooperative.

```
+---------------------------------------------------------------+
|  Nexro Worker - Karnataka Contract Labour Co-op #42           |
+---------------------------------------------------------------+
|  [ON DUTY Toggle: GPS Beacon Active]                          |
|  TODAY'S NET EARNINGS: ₹1,840 (Instant Bank Payout)           |
|  Ward #42 Cluster Pulse: 14 Open Electrical Requests          |
|  Welfare Reserve: ₹14,820 (5% Escrow) | Group Shield: ₹5,00,000|
+---------------------------------------------------------------+
|  [Duty]          [Earnings]         [Welfare]      [Passport] |
+---------------------------------------------------------------+
```

| Screen Name | File Path | Core Implemented Features |
| :--- | :--- | :--- |
| **Tactical Duty Dashboard** | [`WorkerDutyDashboardScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/WorkerDutyDashboardScreen.js) | • **Tactical On/Off Duty Switch**: Controls GPS beacon broadcasting; switches worker from idle to available state<br>• **Active Job Banner**: Sticky notification displaying current en-route job with one-tap resume<br>• **Today's Earnings Hero**: Live calculation of daily earnings (₹1,840 across 4 jobs), 4.94 rating, and guaranteed 85%+ retention<br>• **Cooperative Ward Demand Pulse**: Indiranagar/Domlur cluster live demand counter (14 open requests)<br>• **Simulate Job Dispatch Button**: Test trigger to evaluate the real-time incoming job dispatch modal<br>• **Quick Welfare Preview**: Direct counters for ₹14,820 reserve and ₹5,00,000 hospitalization shield<br>• **Shareholder Ownership Card**: Displays cooperative shares owned (25 shares in Society #42) and cumulative annual dividends (₹8,450) |
| **Real-Time Job Dispatch Modal** | [`IncomingJobModal.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/IncomingJobModal.js) | • **48-Second Interactive Countdown Timer**: Prominent circular timer showing remaining response window<br>• **Proximity & Address**: Exact distance in km (1.2 km) and localized customer address<br>• **AI Problem Diagnosis Intake**: Displays customer symptom analysis before accepting (*"Sparking MCB and ground fault on 16A breaker"*), allowing worker to prepare tools<br>• **Guaranteed Base Payout**: Explicit display of guaranteed earnings (₹299 net) + ₹9 welfare credit<br>• **Non-Punitive Decline**: Worker can decline or let timer expire without penalty, cancellation fees, or algorithmic demotion |
| **4-Stage Active Execution** | [`ActiveJobExecutionScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/ActiveJobExecutionScreen.js) | • **Interactive Navigation Map Simulator**: Route preview with ETA (6 min) and distance (1.2 km)<br>• **4-Stage Progression Stepper**:<br>&nbsp;&nbsp;1. *En Route* (Tap when arrived at gate)<br>&nbsp;&nbsp;2. *At Gate* (Requires customer's 4-digit Start OTP `5829` before job can begin)<br>&nbsp;&nbsp;3. *Working* (Allows uploading photo proof of completed repair)<br>&nbsp;&nbsp;4. *Completed* (Settle job & trigger instant bank credit)<br>• **Customer Contact**: Masked call relay and in-app messaging<br>• **Photo Work Proof**: Toggle camera capture for tamper-proof work quality archive<br>• **Emergency SOS**: Rapid trigger for technician safety issues |
| **Worker Earnings Ledger** | [`WorkerEarningsLedgerScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/WorkerEarningsLedgerScreen.js) | • **Available for Withdrawal Card**: Live balance ready for settlement<br>• **Instant Bank Transfer (IMPS)**: 1-Tap withdrawal directly to linked bank account (Canara Bank **4821) with zero cooperative deduction fees<br>• **Time Period Filter**: Segmented view for Today, Weekly, and Monthly aggregates<br>• **Cooperative Revenue Split Policy**: Visual breakdown showing 85%+ worker cut, 3–5% welfare reserve, 10–12% society tech & logistics, and **₹0 aggregator profit**<br>• **Completed Jobs Ledger**: Transactional itemized history with service name, job ID, time, net earnings, and welfare credits |
| **Welfare & Insurance Passbook** | [`WelfarePassbookScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/WelfarePassbookScreen.js) | • **Total Welfare Reserve**: Balance accumulated from 5% escrow deductions across all completed jobs (₹14,820)<br>• **0% Interest Cooperative Advance**: One-tap application for up to ₹25,000 emergency tool/medical advance<br>• **Group Health & Accident Insurance**: Active policy card (`#KGCF-MED-849102`) providing ₹5,00,000 hospitalization and duty accidental coverage<br>• **Emergency Cashless Claim**: One-tap escalation to the 24/7 Karnataka Gig Federation Hospital Desk<br>• **Passbook Ledger**: Complete audit trail of credits, dividend allocations, and welfare advances |
| **Digital Skill Passport** | [`DigitalSkillPassportScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/DigitalSkillPassportScreen.js) | • **Verified Co-op Profile**: Official registry details (Reg: `KCS/BLR-E/4920/1988/W42`)<br>• **Cooperative Shareholder Ownership**: Member-owner certificate displaying equity shares and cumulative annual patronage dividends (₹8,450)<br>• **NSQF & ITI Digital Credentials**: Verifiable certifications with issuer, passing year, and registrar stamp (National Skill Registry)<br>• **Sub-Skill Specializations**: Verified chips (Domestic Wiring, 3-Phase Industrial Panels, MCB Troubleshooting, Solar Inverter Setup)<br>• **Voice & App Language Toggle**: Fast switching between English, हिन्दी, and ಕನ್ನಡ |
| **Safety & Emergency Hub** | [`App.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/App.js#L20-L28) | • Global SOS Modal accessible from top bar and active job screen<br>• One-tap emergency dispatch to Cooperative Ward #42 Security Cell and Dial 112 Karnataka Police Relay |

---

## 4. Cooperative Socio-Economic Architecture

Unlike predatory gig platforms that maximize investor return through opaque algorithmic management, the Nexro codebase hardcodes democratic cooperative principles:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          COOPERATIVE REVENUE SPLIT                          │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ Extractive Gig Platform  │ Nexro Cooperative Model  │ Impact on Gig Worker  │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ Aggregator Cut: 25%–35%  │ Aggregator Cut: 0%       │ +40% to 60% Take-Home │
│ Hidden Surge Deductions  │ Fixed Fair-Share Policy  │ Pay                   │
│ Marketing/Lead Fees: 15% │ Society Ops: 10%–12%     │ Transparent Accounting│
│ Worker Retains: ~45%–55% │ Worker Retained: 85%+    │ Direct Bank Transfer  │
│ Worker Welfare: None     │ Welfare Reserve: 3%–5%   │ ₹5L Health/Life Cover │
│ Status: 1099 Contractor │ Status: Equity Member    │ Annual Dividends      │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

1. **85%+ Direct Payout**: Embedded across [`BookingReviewScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/screens/BookingReviewScreen.js) and [`WorkerEarningsLedgerScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/WorkerEarningsLedgerScreen.js).
2. **5% Social Security & Healthcare Escrow**: Automatically deducted into the worker's personalized, owned welfare passbook ([`WelfarePassbookScreen.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/WelfarePassbookScreen.js)).
3. **Zero Surge Pricing Exploitation**: Algorithmic surge pricing is disabled. High demand in Ward #42 triggers cooperative queue re-balancing instead of consumer price gouging.
4. **Non-Punitive Worker Dispatch**: In [`IncomingJobModal.js`](file:///Users/abhinavkumar/Nexrop/nexro-worker-app/src/screens/IncomingJobModal.js), declining a job passes the opportunity to the next cooperative member without algorithmically penalizing or shadow-banning the worker.
5. **Two-Way Cryptographic OTP Verification**: Safety protection for both consumer and worker. Work cannot commence until the customer provides the 4-digit code generated upon booking.

---

## 5. UI/UX Design System & Theme Specifications

Both applications implement a shared, accessible design system defined in [`theme/index.js`](file:///Users/abhinavkumar/Nexrop/nexro-consumer-app/src/theme/index.js):

- **Primary Colors**:
  - `Colors.primary` (`#059669` - Cooperative Emerald Green)
  - `Colors.primaryDark` (`#065F46` - Forest Green)
  - `Colors.primaryLight` (`#E6F4FE` / `#D1FAE5` - Mint Wash)
- **AI Triage Colors**:
  - `Colors.aiAccent` (`#4F46E5` - Indigo AI Neural)
  - `Colors.aiLight` (`#EEF2FF` - Lavender Background)
  - `Colors.aiBorder` (`#C7D2FE` - Stroke Accent)
- **Safety & Alerts**:
  - `Colors.danger` (`#EF4444` - Emergency Red)
  - `Colors.warning` (`#F59E0B` - Amber Shield)
- **Typography**:
  - System font stack with weight hierarchy (`700` Bold, `800` Extrabold, `900` Heavy)
  - High-contrast accessibility compliance for sunlight/outdoor worker visibility
- **Tactile Touch Targets**:
  - Minimum button heights: 52px–56px for one-handed operation on mobile devices.

---

## 6. How to Run & Verify

### Running the Consumer App:
```bash
cd /Users/abhinavkumar/Nexrop
npm run consumer
# Or directly via script:
./open-consumer.sh
```
*Port: `8081` | Scheme: `nexro-consumer://`*

### Running the Worker App:
```bash
cd /Users/abhinavkumar/Nexrop
npm run worker
# Or directly via script:
./open-worker.sh
```
*Port: `8082` | Scheme: `nexro-worker://`*

### Interactive Walkthrough Verification:
1. **Consumer Flow**: Launch Consumer App $\rightarrow$ Tap "Proceed" on Splash $\rightarrow$ Tap "Quick Guest Access" $\rightarrow$ Confirm Indiranagar Ward #42 $\rightarrow$ Tap "Ask Nexro AI" $\rightarrow$ Tap sample prompt *"MCB tripping repeatedly"* $\rightarrow$ View Explainable Match $\rightarrow$ Proceed to Booking $\rightarrow$ View 85/5/10 transparent split $\rightarrow$ Select UPI and Pay $\rightarrow$ Note the 4-Digit OTP (`5829`) $\rightarrow$ Tap "Track Live" to view Map.
2. **Worker Flow**: Launch Worker App $\rightarrow$ Toggle Duty Switch to ON $\rightarrow$ Tap "Simulate Incoming Real-Time Job Dispatch" $\rightarrow$ Note 48s countdown & AI brief $\rightarrow$ Tap "Accept Job" $\rightarrow$ Tap "Arrived at Gate" $\rightarrow$ Enter Demo OTP `5829` $\rightarrow$ Tap "Mark Work Completed" $\rightarrow$ View Instant Bank Settlement $\rightarrow$ Switch tabs to "Welfare" and "Passport" to view cooperative shares and NSQF credentials.
