import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { INCOMING_JOB_REQUEST } from '../data/workerData';

export default function IncomingJobModal({ visible, onAccept, onDecline }) {
  const [timeLeft, setTimeLeft] = useState(48);

  useEffect(() => {
    if (!visible) {
      setTimeLeft(48);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onDecline}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dispatchCard}>
          {/* Header & 60s Countdown Timer */}
          <View style={styles.timerRow}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerNum}>{timeLeft}s</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.badgeRow}>
                <Ionicons name="flash" size={13} color="#FFFFFF" />
                <Text style={styles.badgeText}>REAL-TIME DISPATCH</Text>
              </View>
              <Text style={styles.headerTitle}>New Job Request in Cluster</Text>
            </View>
            <View style={styles.distancePill}>
              <Ionicons name="location" size={12} color={Colors.primary} />
              <Text style={styles.distanceText}>{INCOMING_JOB_REQUEST.distanceKm} km</Text>
            </View>
          </View>

          {/* Service & Problem Intake Diagnosis */}
          <View style={styles.serviceSection}>
            <Text style={styles.serviceTitle}>{INCOMING_JOB_REQUEST.service}</Text>
            <Text style={styles.customerLoc}>{INCOMING_JOB_REQUEST.address}</Text>

            <View style={styles.aiCard}>
              <View style={styles.aiTag}>
                <Ionicons name="sparkles" size={12} color="#FFFFFF" />
                <Text style={styles.aiTagText}>{INCOMING_JOB_REQUEST.aiTriageTag}</Text>
              </View>
              <Text style={styles.problemText}>"{INCOMING_JOB_REQUEST.problemDiagnosis}"</Text>
            </View>
          </View>

          {/* Transparent Fair Pay Breakdown */}
          <View style={styles.payoutCard}>
            <Text style={styles.payoutTitle}>Cooperative Guaranteed Earnings</Text>
            <View style={styles.payoutRow}>
              <View>
                <Text style={styles.payoutBig}>₹{INCOMING_JOB_REQUEST.directPayout}</Text>
                <Text style={styles.payoutSub}>85%+ Direct Worker Compensation</Text>
              </View>
              <View style={styles.welfarePill}>
                <Ionicons name="shield-checkmark" size={12} color={Colors.primary} />
                <Text style={styles.welfareText}>+₹{INCOMING_JOB_REQUEST.welfareContribution} to Welfare</Text>
              </View>
            </View>
          </View>

          {/* Large Tactile Accept / Decline Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={onAccept}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              <Text style={styles.acceptText}>ACCEPT JOB ({timeLeft}s)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.declineBtn}
              onPress={onDecline}
              activeOpacity={0.8}
            >
              <Text style={styles.declineText}>Pass to Next Co-op Pro (Non-Punitive)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  dispatchCard: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 36,
    ...Shadows.float,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  timerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  timerNum: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '900',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    gap: 4,
    marginBottom: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.text,
  },
  distancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    gap: 4,
  },
  distanceText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  serviceSection: {
    marginBottom: 14,
  },
  serviceTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  customerLoc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  aiCard: {
    backgroundColor: Colors.aiLight,
    borderRadius: Radii.card,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  aiTag: {
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
  aiTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  problemText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.aiText,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  payoutCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  payoutTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 6,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutBig: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  payoutSub: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  welfarePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    gap: 4,
  },
  welfareText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  actions: {
    gap: 10,
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    ...Shadows.card,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
  },
  declineBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  declineText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
