import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { INCOMING_JOB_REQUEST } from '../data/workerData';

export default function ActiveJobExecutionScreen({ onCompleteJob, onBack, onOpenSos }) {
  // 0: En Route, 1: Arrived at Gate, 2: In Progress (working), 3: Work Finished
  const [jobStage, setJobStage] = useState(0);
  const [inputOtp, setInputOtp] = useState('');
  const [photoProof, setPhotoProof] = useState(false);

  const stages = [
    { key: 0, title: 'En Route', desc: 'Heading to customer' },
    { key: 1, title: 'At Gate', desc: 'Arrived at residence' },
    { key: 2, title: 'Working', desc: 'Diagnosing & fixing' },
    { key: 3, title: 'Completed', desc: 'Verified & settled' },
  ];

  const handleNextStage = () => {
    if (jobStage === 0) {
      setJobStage(1);
    } else if (jobStage === 1) {
      if (inputOtp === INCOMING_JOB_REQUEST.startOtp || inputOtp.length >= 4) {
        setJobStage(2);
        setInputOtp('');
      } else {
        Alert.alert('Start OTP Required', `Please ask the customer for the 4-digit Start OTP (Test Demo OTP: ${INCOMING_JOB_REQUEST.startOtp}).`);
      }
    } else if (jobStage === 2) {
      setJobStage(3);
    } else if (jobStage === 3) {
      onCompleteJob();
    }
  };

  const handleCall = () => {
    Alert.alert('Calling Customer', `Calling Ananya S. via Cooperative Privacy Relay (${INCOMING_JOB_REQUEST.customerPhone}).`);
  };

  const handleChat = () => {
    Alert.alert('Cooperative Chat', `Direct chat connected with customer Ananya S.`);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Job #{INCOMING_JOB_REQUEST.id}</Text>
          <Text style={styles.headerSubtitle}>{INCOMING_JOB_REQUEST.service}</Text>
        </View>
        <TouchableOpacity style={styles.sosPill} onPress={onOpenSos}>
          <Ionicons name="alert-circle" size={14} color={Colors.danger} />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Route / Navigation Map Simulator */}
        <View style={styles.navMapBox}>
          <View style={styles.roadLine1} />
          <View style={styles.roadLine2} />
          <View style={styles.destinationMarker}>
            <Ionicons name="home" size={14} color="#FFFFFF" />
            <View style={styles.destLabel}>
              <Text style={styles.destLabelText}>Customer</Text>
            </View>
          </View>
          <View style={styles.proMarker}>
            <Ionicons name="bicycle" size={16} color="#FFFFFF" />
          </View>
          
          <View style={styles.navFloatingBar}>
            <Ionicons name="navigate" size={16} color={Colors.primary} />
            <Text style={styles.navEtaText}>ETA 6 min · 1.2 km</Text>
            <Text style={styles.navDot}>•</Text>
            <Text style={styles.navStreet}>12th Main, Indiranagar</Text>
          </View>
        </View>

        {/* 4-Stage Stepper */}
        <View style={styles.stepperCard}>
          <View style={styles.stepsRow}>
            {stages.map((st, idx) => {
              const isDone = jobStage > idx;
              const isCurrent = jobStage === idx;
              return (
                <React.Fragment key={st.key}>
                  <View style={styles.stepItem}>
                    <View style={[
                      styles.stepDot,
                      isDone && styles.stepDone,
                      isCurrent && styles.stepCurrent,
                    ]}>
                      {isDone ? (
                        <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                      ) : (
                        <Text style={[styles.stepNum, isCurrent && styles.stepNumCurrent]}>{idx + 1}</Text>
                      )}
                    </View>
                    <Text style={[styles.stepLabel, isCurrent && styles.stepLabelCurrent]}>{st.title}</Text>
                  </View>
                  {idx < stages.length - 1 && (
                    <View style={[styles.stepLine, jobStage > idx && styles.stepLineActive]} />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        </View>

        {/* Customer Contact & Address Card */}
        <View style={styles.customerCard}>
          <View style={styles.customerRow}>
            <View style={styles.custIcon}>
              <Ionicons name="person" size={20} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.custName}>{INCOMING_JOB_REQUEST.customerName}</Text>
              <Text style={styles.custAddress}>{INCOMING_JOB_REQUEST.address}</Text>
            </View>
          </View>

          <View style={styles.contactActions}>
            <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Ionicons name="call" size={15} color={Colors.primaryDark} />
              <Text style={styles.callBtnText}>Call Masked</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
              <Ionicons name="chatbubbles" size={15} color={Colors.primaryDark} />
              <Text style={styles.chatBtnText}>In-App Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Diagnostic Problem Brief */}
        <View style={styles.aiBriefCard}>
          <View style={styles.aiBadgeRow}>
            <Ionicons name="sparkles" size={13} color="#FFFFFF" />
            <Text style={styles.aiBadgeText}>AI CUSTOMER INTAKE BRIEF</Text>
          </View>
          <Text style={styles.briefText}>"{INCOMING_JOB_REQUEST.problemDiagnosis}"</Text>
        </View>

        {/* OTP Input for Stage 1 */}
        {jobStage === 1 && (
          <View style={styles.otpCard}>
            <Text style={styles.otpTitle}>Enter Customer 4-Digit Start OTP</Text>
            <Text style={styles.otpHint}>Ask customer for OTP to verify arrival (Demo: 5829)</Text>
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={4}
              placeholder="5 8 2 9"
              value={inputOtp}
              onChangeText={setInputOtp}
            />
            <TouchableOpacity onPress={() => setInputOtp('5829')}>
              <Text style={styles.quickFill}>Auto-fill Demo OTP (5829)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Photo Proof for Stage 2 / 3 */}
        {jobStage >= 2 && (
          <View style={styles.proofCard}>
            <Text style={styles.proofTitle}>Work Proof & Quality Record</Text>
            <TouchableOpacity 
              style={[styles.proofUploadBtn, photoProof && styles.proofUploaded]}
              onPress={() => setPhotoProof(!photoProof)}
            >
              <Ionicons 
                name={photoProof ? "checkmark-circle" : "camera"} 
                size={20} 
                color={photoProof ? Colors.primary : Colors.textSecondary} 
              />
              <Text style={[styles.proofUploadText, photoProof && { color: Colors.primary }]}>
                {photoProof ? 'Photo Attached (Circuit Breaker Fixed)' : 'Capture Completed Work Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Large Tactile Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.stageActionBtn}
          onPress={handleNextStage}
          activeOpacity={0.85}
        >
          <Text style={styles.stageActionText}>
            {jobStage === 0 && 'TAP WHEN ARRIVED AT GATE'}
            {jobStage === 1 && 'VERIFY START OTP & BEGIN'}
            {jobStage === 2 && 'MARK WORK COMPLETED'}
            {jobStage === 3 && 'SETTLE JOB & VIEW EARNINGS'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  backBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  sosPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 4,
  },
  sosText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.danger,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    gap: 12,
  },
  navMapBox: {
    height: 140,
    backgroundColor: '#E5ECE8',
    borderRadius: Radii.card,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roadLine1: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#CBD7D0',
  },
  roadLine2: {
    position: 'absolute',
    top: -10,
    left: '45%',
    width: 16,
    height: 180,
    backgroundColor: '#CBD7D0',
    transform: [{ rotate: '25deg' }],
  },
  destinationMarker: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destLabel: {
    position: 'absolute',
    bottom: -18,
    backgroundColor: 'rgba(20, 24, 27, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  destLabelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  proMarker: {
    position: 'absolute',
    top: 32,
    left: 60,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  navFloatingBar: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    ...Shadows.card,
  },
  navEtaText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  navDot: {
    color: Colors.textMuted,
  },
  navStreet: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    flex: 1,
  },
  stepperCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    width: 62,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCurrent: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1.15 }],
  },
  stepDone: {
    backgroundColor: Colors.primary,
  },
  stepNum: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  stepNumCurrent: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  stepLabelCurrent: {
    color: Colors.primary,
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginTop: -14,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  customerCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  custIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  custName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  custAddress: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    gap: 6,
  },
  callBtnText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    gap: 6,
  },
  chatBtnText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  aiBriefCard: {
    backgroundColor: Colors.aiLight,
    borderRadius: Radii.card,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  aiBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aiAccent,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    gap: 4,
    marginBottom: 6,
  },
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  briefText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.aiText,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  otpCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    ...Shadows.card,
  },
  otpTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  otpHint: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    borderRadius: Radii.md,
    paddingVertical: 10,
    fontSize: Typography.fontSize.xl,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '800',
    backgroundColor: Colors.background,
  },
  quickFill: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  proofCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  proofTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  proofUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radii.pill,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  proofUploaded: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  proofUploadText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 26,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.float,
  },
  stageActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
  },
  stageActionText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
});
