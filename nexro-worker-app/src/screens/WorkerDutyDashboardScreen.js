import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { WORKER_PROFILE } from '../data/workerData';

export default function WorkerDutyDashboardScreen({ 
  isOnDuty, 
  onToggleDuty, 
  onTriggerJobDispatch, 
  onViewActiveJob, 
  hasActiveJob, 
  onNavigateTab 
}) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Profile & Duty Bar */}
      <View style={styles.dutyHeader}>
        <View style={styles.workerBrief}>
          <Image source={{ uri: WORKER_PROFILE.avatar }} style={styles.avatar} />
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.workerName}>{WORKER_PROFILE.name}</Text>
              <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
            </View>
            <Text style={styles.tradeTitle}>{WORKER_PROFILE.trade}</Text>
            <Text style={styles.societyBadge}>{WORKER_PROFILE.society}</Text>
          </View>
        </View>

        {/* Tactical On-Duty Toggle */}
        <View style={[styles.dutyToggleCard, isOnDuty ? styles.dutyCardOn : styles.dutyCardOff]}>
          <View style={styles.toggleRow}>
            <View style={[styles.statusDot, isOnDuty ? styles.dotOn : styles.dotOff]} />
            <Text style={[styles.dutyStatusText, isOnDuty ? styles.textOn : styles.textOff]}>
              {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
            </Text>
            <Switch
              value={isOnDuty}
              onValueChange={onToggleDuty}
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={isOnDuty ? Colors.primary : '#9CA3AF'}
            />
          </View>
          <Text style={styles.beaconText}>
            {isOnDuty ? 'GPS Beacon Active · Receiving Jobs' : 'Offline · Tap to Go Online'}
          </Text>
        </View>
      </View>

      {/* Active Job Floating Ticker if accepted */}
      {hasActiveJob && (
        <TouchableOpacity 
          style={styles.activeJobBanner}
          onPress={onViewActiveJob}
          activeOpacity={0.85}
        >
          <View style={styles.pulseIconWrap}>
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activeJobTitle}>Active Dispatch in Progress</Text>
            <Text style={styles.activeJobSub}>Job #NX-94812 · 1.2km to Ananya S.</Text>
          </View>
          <View style={styles.resumePill}>
            <Text style={styles.resumePillText}>RESUME</Text>
            <Ionicons name="chevron-forward" size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      )}

      {/* Today's Earnings Hero Card */}
      <View style={styles.earningsHero}>
        <View style={styles.earningsTop}>
          <View>
            <Text style={styles.earningsLabel}>TODAY'S NET EARNINGS</Text>
            <Text style={styles.earningsAmount}>₹{WORKER_PROFILE.todayEarnings}</Text>
          </View>
          <View style={styles.payoutTag}>
            <Ionicons name="flash" size={12} color="#A7F3D0" />
            <Text style={styles.payoutTagText}>Instant Bank Payout</Text>
          </View>
        </View>

        <View style={styles.earningsDivider} />

        <View style={styles.earningsStatsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{WORKER_PROFILE.todayJobsCount}</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
          <View style={styles.statLine} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>★ {WORKER_PROFILE.rating}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statLine} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>85%+</Text>
            <Text style={styles.statLabel}>Direct Pro Cut</Text>
          </View>
        </View>
      </View>

      {/* Cooperative Ward Demand Cluster Indicator */}
      <View style={styles.wardStatusCard}>
        <View style={styles.wardHeader}>
          <Ionicons name="cellular" size={18} color={Colors.primary} />
          <Text style={styles.wardTitle}>Ward #42 Real-Time Demand Pulse</Text>
        </View>
        <Text style={styles.wardDesc}>
          Indiranagar / Domlur cluster has <Text style={{ fontWeight: '700', color: Colors.primaryDark }}>14 open electrical requests</Text>. High surge demand handled fairly with 0% customer gouging.
        </Text>
        
        {/* Simulate Incoming Dispatch Trigger for testing */}
        {isOnDuty && !hasActiveJob && (
          <TouchableOpacity 
            style={styles.simDispatchBtn}
            onPress={onTriggerJobDispatch}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications" size={16} color={Colors.aiAccent} />
            <Text style={styles.simDispatchText}>Simulate Incoming Real-Time Job Dispatch</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Welfare & Social Safety Passbook Bar */}
      <View style={styles.welfareRow}>
        <TouchableOpacity 
          style={styles.welfareCard}
          onPress={() => onNavigateTab('welfare')}
          activeOpacity={0.85}
        >
          <View style={styles.welfareIconBox}>
            <Ionicons name="wallet" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.welfareAmount}>₹{WORKER_PROFILE.welfareReserve.toLocaleString('en-IN')}</Text>
          <Text style={styles.welfareSub}>5% Job Welfare Reserve</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.welfareCard}
          onPress={() => onNavigateTab('welfare')}
          activeOpacity={0.85}
        >
          <View style={[styles.welfareIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="shield-checkmark" size={20} color="#D97706" />
          </View>
          <Text style={[styles.welfareAmount, { color: '#92400E' }]}>₹5,00,000</Text>
          <Text style={styles.welfareSub}>Group Hospital Shield</Text>
        </TouchableOpacity>
      </View>

      {/* Verified Skills & Shareholder Preview */}
      <View style={styles.passportPreviewCard}>
        <View style={styles.passportHeader}>
          <Ionicons name="ribbon" size={20} color={Colors.primary} />
          <Text style={styles.passportTitle}>Cooperative Shareholder Status</Text>
        </View>
        <Text style={styles.passportDesc}>
          You own {WORKER_PROFILE.coopShares} in {WORKER_PROFILE.society}. Cumulative annual profit dividends received: <Text style={{ fontWeight: '800', color: Colors.primaryDark }}>₹{WORKER_PROFILE.coopDividendsReceived.toLocaleString('en-IN')}</Text>.
        </Text>

        <TouchableOpacity 
          style={styles.viewPassportBtn}
          onPress={() => onNavigateTab('passport')}
        >
          <Text style={styles.viewPassportText}>View Digital Skill Passport & NSQF License</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  dutyHeader: {
    marginBottom: 14,
    gap: 12,
  },
  workerBrief: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workerName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  tradeTitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  societyBadge: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  dutyToggleCard: {
    borderRadius: Radii.card,
    padding: 12,
    borderWidth: 1.5,
    ...Shadows.card,
  },
  dutyCardOn: {
    backgroundColor: '#ECFDF5',
    borderColor: Colors.primary,
  },
  dutyCardOff: {
    backgroundColor: '#F3F4F6',
    borderColor: Colors.border,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  dotOn: {
    backgroundColor: '#10B981',
  },
  dotOff: {
    backgroundColor: '#9CA3AF',
  },
  dutyStatusText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
  textOn: {
    color: Colors.primaryDark,
  },
  textOff: {
    color: Colors.textSecondary,
  },
  beaconText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  activeJobBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    borderRadius: Radii.card,
    padding: 12,
    gap: 10,
    marginBottom: 14,
    ...Shadows.card,
  },
  pulseIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeJobTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  activeJobSub: {
    color: '#A7F3D0',
    fontSize: 10,
    marginTop: 1,
  },
  resumePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 2,
  },
  resumePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  earningsHero: {
    backgroundColor: Colors.primaryDark,
    borderRadius: Radii.card,
    padding: 18,
    marginBottom: 14,
    ...Shadows.card,
  },
  earningsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  earningsLabel: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  earningsAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  payoutTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 4,
  },
  payoutTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  earningsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  earningsStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    alignItems: 'center',
  },
  statNum: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
  statLabel: {
    color: '#A7F3D0',
    fontSize: 10,
    marginTop: 2,
  },
  statLine: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  wardStatusCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  wardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  wardTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  wardDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  simDispatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.aiLight,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    marginTop: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  simDispatchText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.aiText,
  },
  welfareRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  welfareCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  welfareIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  welfareAmount: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  welfareSub: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  passportPreviewCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C4E8D7',
    marginBottom: 30,
  },
  passportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  passportTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  passportDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  viewPassportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },
  viewPassportText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
});
