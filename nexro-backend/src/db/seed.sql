-- Seed Data for Nexro Cooperative Ecosystem
-- Primary Society: Karnataka Contract Labour Co-operative Society Ltd. (Ward #42)

-- 1. Standard Services
INSERT INTO services (id, category, title, description, floor_price, default_duration_mins, required_nsqf_level) VALUES
('srv_elec_diag', 'Electrical', 'Circuit Breaker Tripping & Load Diagnostic', 'Master diagnostic on tripping MCBs, phase imbalances and terminal resistance heating.', 299.00, 45, 'NSQF Level 4'),
('srv_ac_gas', 'Appliances', 'AC Compressor Gas Pressure Calibration', 'R32 / R410A refrigeration pressure optimization and copper flare joint leak check.', 599.00, 60, 'NSQF Level 5'),
('srv_plumb_leak', 'Plumbing', 'Concealed Bathroom Pipe Leak Detection', 'Acoustic thermal detection for hidden wall riser seepages and pressure loss.', 449.00, 60, 'NSQF Level 4'),
('srv_san_deep', 'Sanitation', 'Post-Monsoon Floor Scrubbing & Degreasing', 'Industrial rotary scrubbing with pH neutral anti-microbial sanitation.', 799.00, 90, 'NSQF Level 3'),
('srv_inv_ups', 'Electrical', 'Inverter Battery Deep Cycle Maintenance', 'Hydrometer electrolyte specific gravity calibration and terminal de-sulfation.', 649.00, 45, 'NSQF Level 4'),
('srv_pump_oh', 'Plumbing', 'Submersible Pump Bearing Overhaul', 'Dynamic impeller balance and single-phase starter capacitor replacement.', 899.00, 90, 'NSQF Level 4')
ON CONFLICT (id) DO NOTHING;

-- 2. Societies
INSERT INTO societies (id, name, registration_number, cluster, jurisdiction_geofence, address, contact_phone, contact_email, audit_grade, status, welfare_account_number) VALUES
('soc_kcls_42', 'Karnataka Contract Labour Co-operative Society Ltd.', 'DRB/CS/7412/1988', 'Bangalore East (Indiranagar)', 'Ward #42, #43, #44', '14, 2nd Floor, CMH Road, Indiranagar, Bengaluru - 560038', '+91 80 2521 4410', 'ops@kclcs.coop', 'A', 'operational', 'SB-COOP-8821-4401'),
('soc_bub_18', 'Bangalore Urban District Labour Co-op Union #18', 'DRB/CS/1892/1994', 'Bangalore South (Jayanagar)', 'Ward #18, #19, #20', 'Jayanagar 4th Block Complex, Bengaluru - 560011', '+91 80 2663 1180', 'contact@bulcu.coop', 'A', 'operational', 'SB-COOP-1892-3301'),
('soc_kor_29', 'Koramangala Technicians Labour Society #29', 'DRB/CS/4410/2002', 'Bangalore South (Koramangala)', 'Ward #29, #30', '80 Feet Road, 6th Block, Koramangala, Bengaluru - 560095', '+91 80 2552 2901', 'info@ktls.coop', 'A', 'operational', 'SB-COOP-4410-9912'),
('soc_whf_63', 'Whitefield Industrial & Domestic Guild #63', 'DRB/CS/6321/2011', 'Whitefield Tech Corridor', 'Ward #63, #64', 'ITPB Main Road, Whitefield, Bengaluru - 560066', '+91 80 2841 6300', 'admin@widg.coop', 'B', 'operational', 'SB-COOP-6321-7744'),
('soc_hub_04', 'Hubli-Dharwad Labour Workers Cooperative #04', 'KST/DRB/0411/1976', 'North Karnataka (Hubli)', 'Ward #04, #05', 'Station Road, Hubballi - 580020', '+91 836 226 0411', 'hubli@hdlwc.coop', 'A', 'operational', 'SB-COOP-0411-5511')
ON CONFLICT (id) DO NOTHING;

-- 3. Key Users (Society Admin, Federation MD, Certified Workers, Consumers)
INSERT INTO users (id, phone, email, password_hash, full_name, role, language_pref, avatar_url) VALUES
('usr_admin_kcls', '+919845012345', 'steward@kcls.coop', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Shri R. Ananthamurthy', 'society_admin', 'kn', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('usr_fed_md', '+919845099999', 'md@karnatakacoop.gov.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Dr. B.R. Hegde, IAS', 'federation_admin', 'en', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
('usr_wrk_ramesh', '+919845110001', 'ramesh.k@kcls.coop', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Ramesh Kumar', 'worker', 'kn', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'),
('usr_wrk_mahesh', '+919845110002', 'mahesh.g@kcls.coop', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Mahesh G.', 'worker', 'kn', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
('usr_wrk_lakshmi', '+919845110003', 'lakshmi.b@kcls.coop', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Lakshmi Bai', 'worker', 'kn', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'),
('usr_wrk_sunil', '+919845110004', 'sunil.r@kcls.coop', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Sunil Rao', 'worker', 'kn', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150'),
('usr_consumer_arjun', '+919900112233', 'arjun.s@gmail.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Arjun Sharma', 'consumer', 'en', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
ON CONFLICT (id) DO NOTHING;

-- 4. Certified Workers
INSERT INTO workers (id, user_id, society_id, membership_no, trade, nsqf_level, iti_cert_no, experience_years, police_verified, verification_status, status, current_lat, current_lng, rating, total_jobs, passbook_balance) VALUES
('wrk_ramesh_01', 'usr_wrk_ramesh', 'soc_kcls_42', 'MEM-KCLS-0412', 'Electrical', 'NSQF Level 4', 'ITI-ELEC-2018-842', 8, true, 'Verified', 'on_job', 12.9784, 77.6408, 4.95, 312, 14250.00),
('wrk_mahesh_02', 'usr_wrk_mahesh', 'soc_kcls_42', 'MEM-KCLS-0419', 'Plumbing', 'NSQF Level 4', 'ITI-PLMB-2019-109', 6, true, 'Verified', 'on_job', 12.9712, 77.6355, 4.88, 240, 11820.00),
('wrk_lakshmi_03', 'usr_wrk_lakshmi', 'soc_kcls_42', 'MEM-KCLS-0427', 'Sanitation', 'NSQF Level 3', 'NSDC-SANI-2020-551', 5, true, 'Verified', 'available', 12.9698, 77.6499, 4.98, 189, 9450.00),
('wrk_sunil_04', 'usr_wrk_sunil', 'soc_kcls_42', 'MEM-KCLS-0433', 'Appliances', 'NSQF Level 5', 'OEM-HVAC-2017-302', 9, true, 'Verified', 'available', 12.9810, 77.6450, 4.92, 410, 22100.00)
ON CONFLICT (id) DO NOTHING;

-- 5. Active and Completed Bookings
INSERT INTO bookings (id, consumer_id, worker_id, society_id, service_id, status, is_emergency, customer_problem, customer_lat, customer_lng, customer_address, scheduled_time, total_amount, worker_payout, welfare_amount, society_ops_amount, start_otp, worker_diagnosis, photo_proof_url) VALUES
('NX-94812', 'usr_consumer_arjun', 'wrk_ramesh_01', 'soc_kcls_42', 'srv_elec_diag', 'in_progress', true, 'Whenever AC and water heater run simultaneously, the main 32A MCB trips with a humming sound.', 12.9784, 77.6408, 'Flat 402, Sai Residency, 12th Main Indiranagar', CURRENT_TIMESTAMP, 299.00, 254.15, 14.95, 29.90, '5829', 'Terminal screw loose on pole #2 causing resistance heating; replacing with ISI certified 32A breaker.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300'),
('NX-94811', 'usr_consumer_arjun', 'wrk_ramesh_01', 'soc_kcls_42', 'srv_ac_gas', 'completed', false, '1.5 ton split AC blowing lukewarm air since yesterday morning.', 12.9698, 77.7499, 'Prestige Boulevard, Whitefield', CURRENT_TIMESTAMP - INTERVAL '2 hours', 599.00, 509.15, 29.95, 59.90, '4192', 'R32 gas pressure restored to 125 PSI. Flange valve leakage tightened.', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300'),
('NX-94810', 'usr_consumer_arjun', 'wrk_mahesh_02', 'soc_kcls_42', 'srv_plumb_leak', 'in_progress', false, 'Ceiling discoloration and dripping sound inside master bath duct.', 12.9610, 77.6380, 'Domlur Inner Ring Road, Bengaluru', CURRENT_TIMESTAMP, 449.00, 381.65, 22.45, 44.90, '8901', 'Thermal acoustic detector located hairline crack on CPVC hot water riser.', NULL),
('NX-94809', 'usr_consumer_arjun', 'wrk_lakshmi_03', 'soc_kcls_42', 'srv_san_deep', 'requested', false, 'Annual festival deep cleaning for 3BHK flat balcony and utility area.', 12.9352, 77.6245, 'Koramangala 4th Block', CURRENT_TIMESTAMP + INTERVAL '3 hours', 799.00, 679.15, 39.95, 79.90, '3310', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. Escrow Transactions
INSERT INTO escrow_transactions (id, booking_id, consumer_id, amount, status, gateway_txn_id) VALUES
('esc_94812', 'NX-94812', 'usr_consumer_arjun', 299.00, 'held', 'pay_NX94812_rzp_mock'),
('esc_94811', 'NX-94811', 'usr_consumer_arjun', 599.00, 'released', 'pay_NX94811_rzp_mock'),
('esc_94810', 'NX-94810', 'usr_consumer_arjun', 449.00, 'held', 'pay_NX94810_rzp_mock'),
('esc_94809', 'NX-94809', 'usr_consumer_arjun', 799.00, 'held', 'pay_NX94809_rzp_mock')
ON CONFLICT (id) DO NOTHING;

-- 7. Welfare Passbook Entries
INSERT INTO welfare_passbook_entries (id, worker_id, society_id, booking_id, entry_type, amount, description, balance_after) VALUES
('wpe_001', 'wrk_ramesh_01', 'soc_kcls_42', 'NX-94811', 'credit_job_5pct', 29.95, '5% Statutory Member Welfare Contribution (Job NX-94811)', 3840.00),
('wpe_002', 'wrk_mahesh_02', 'soc_kcls_42', NULL, 'credit_job_5pct', 22.45, '5% Statutory Member Welfare Contribution', 2910.00),
('wpe_003', 'wrk_ramesh_01', 'soc_kcls_42', NULL, 'debit_emergency_advance', 2000.00, '0% Interest Member Festival Micro-Advance (Repaid)', 3810.05)
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Demand Forecast
INSERT INTO demand_forecasts (id, cluster, target_date, predicted_bookings, confidence_score, sector_deficits, rebalance_plan, reasoning, status) VALUES
('fc_tomorrow', 'Bangalore East (Indiranagar)', CURRENT_DATE + INTERVAL '1 day', 2840, 0.87, 
 '{"Electrical": -63, "Plumbing": 7, "Sanitation": -22, "Appliances": -14, "Carpentry": 5}',
 '{"shiftSummary": "Rebalance +63 Electricians from surplus societies", "sources": [{"society": "Domlur Labour Co-op #18", "count": 16}, {"society": "Ulsoor Guild #09", "count": 14}, {"society": "Malleshwaram #03", "count": 13}, {"society": "KCLS #42 Indiranagar", "count": 20}]}',
 'Pre-monsoon humidity combined with Ugadi festival deep preparations triggers a 42% surge in AC servicing and electrical breaker diagnostics. East Bangalore faces a 63 technician deficit between 10:00 AM and 03:00 PM.',
 'pending_approval')
ON CONFLICT (id) DO NOTHING;
