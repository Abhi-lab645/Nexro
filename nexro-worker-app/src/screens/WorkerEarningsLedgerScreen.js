import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { WORKER_PROFILE, RECENT_JOB_LEDGER } from '../data/workerData';

export default function WorkerEarningsLedgerScreen() {
  const [filterPeriod, setFilterPeriod] = useState('today');

  const handleWithdraw = () => {
    Alert.alert(
      'Instant Settlement',
      `₹${WORKER_PROFILE.todayEarnings} transferred directly to Bank Account (Canara Bank **4821) via IMPS. Cooperative fee: ₹0.`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings & Payouts</Text>
        <Text style={styles.headerSubtitle}>Direct cooperative bank transfers</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>AVAILABLE FOR WITHDRAWAL</Text>
          <Text style={styles.balanceAmount}>₹{WORKER_PROFILE.todayEarnings}</Text>

          <View style={styles.guaranteePill}>
            <Ionicons name="shield-checkmark" size={13} color="#A7F3D0" />
            <Text style={styles.guaranteeText}>85%+ Direct Worker Retained Share</Text>
          </View>

          <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw} activeOpacity={0.85}>
            <Ionicons name="cash" size={18} color={Colors.primaryDark} />
            <Text style={styles.withdrawText}>Withdraw to Bank (IMPS Instant)</Text>
          </TouchableOpacity>
        </View>

        {/* Period Filter Tabs */}
        <View style={styles.periodTabs}>
          {['today', 'weekly', 'monthly'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.tab, filterPeriod === period && styles.tabActive]}
              onPress={() => setFilterPeriod(period)}
            >
              <Text style={[styles.tabText, filterPeriod === period && styles.tabTextActive]}>
                {period.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Revenue Split Transparency Card */}
        <View style={styles.splitCard}>
          <Text style={styles.splitTitle}>Cooperative Split Policy</Text>
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Your Direct Share:</Text>
            <Text style={[styles.splitVal, { color: Colors.primaryDark }]}>85%+</Text>
          </View>
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Your Healthcare & Welfare Escrow:</Text>
            <Text style={[styles.splitVal, { color: Colors.primaryDark }]}>3% - 5%</Text>
          </View>
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Society Admin & Tech Infra:</Text>
            <Text style={styles.splitVal}>10% - 12%</Text>
          </View>
          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>Private Aggregator Commission:</Text>
            <Text style={[styles.splitVal, { color: Colors.success, fontWeight: '800' }]}>₹0 (Zero Cut)</Text>
          </View>
        </View>

        {/* Completed Jobs Ledger */}
        <Text style={styles.ledgerHeader}>Recent Job Settlements</Text>
        {RECENT_JOB_LEDGER.map((job) => (
          <View key={job.id} style={styles.jobItem}>
            <View style={styles.jobTop}>
              <View>
                <Text style={styles.jobService}>{job.service}</Text>
                <Text style={styles.jobMeta}>Job #{job.id} · {job.time}</Text>
              </View>
              <Text style={styles.jobNet}>+₹{job.netEarned}</Text>
            </View>

            <View style={styles.jobBottom}>
              <View style={styles.creditPill}>
                <Ionicons name="checkmark-circle" size={11} color={Colors.primary} />
                <Text style={styles.creditText}>+₹{job.welfareCredit} to Welfare Pool</Text>
              </View>
              <Text style={styles.settledText}>{job.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  balanceCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: Radii.card,
    padding: 20,
    alignItems: 'center',
    ...Shadows.card,
  },
  balanceLabel: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginVertical: 6,
  },
  guaranteePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
    marginBottom: 16,
  },
  guaranteeText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: Radii.pill,
    gap: 8,
  },
  withdrawText: {
    color: Colors.primaryDark,
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: Radii.pill,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radii.pill,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    ...Shadows.card,
  },
  tabText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primaryDark,
  },
  splitCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  splitTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  splitLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  splitVal: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  ledgerHeader: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  jobItem: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  jobTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobService: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  jobMeta: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  jobNet: {
    fontSize: Typography.fontSize.md,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  jobBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  creditPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creditText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '600',
  },
  settledText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
