import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { WORKER_PROFILE, WELFARE_TRANSACTIONS } from '../data/workerData';

export default function WelfarePassbookScreen() {
  const handleApplyLoan = () => {
    Alert.alert(
      '0% Interest Co-op Loan',
      `As a verified member with ₹14,820 reserve, you are eligible for up to ₹25,000 zero-interest cooperative advance for tools or emergency medical expenses.`
    );
  };

  const handleFileClaim = () => {
    Alert.alert(
      'Emergency Insurance Claim',
      `Connecting to Karnataka Gig Federation 24x7 Cashless Hospital Desk. Policy #KGCF-MED-849102.`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welfare & Insurance</Text>
        <Text style={styles.headerSubtitle}>Cooperative social safety net</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Welfare Reserve Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>TOTAL WELFARE RESERVE</Text>
              <Text style={styles.heroBalance}>₹{WORKER_PROFILE.welfareReserve.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.coopBadge}>
              <Ionicons name="people" size={14} color="#A7F3D0" />
              <Text style={styles.coopBadgeText}>5% Escrow</Text>
            </View>
          </View>
          <Text style={styles.heroSub}>
            Accumulated democratically across {WORKER_PROFILE.completedJobs} completed jobs. Owned exclusively by you.
          </Text>

          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.loanBtn} onPress={handleApplyLoan}>
              <Ionicons name="sparkles" size={14} color={Colors.primaryDark} />
              <Text style={styles.loanBtnText}>0% Emergency Advance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Insurance Shield Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insHeader}>
            <View style={styles.shieldCircle}>
              <Ionicons name="shield-checkmark" size={24} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insTitle}>Active Group Insurance Shield</Text>
              <Text style={styles.policyNum}>Policy #{WORKER_PROFILE.insurancePolicyNo}</Text>
            </View>
            <View style={styles.activeTag}>
              <Text style={styles.activeTagText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.coverageBox}>
            <Text style={styles.coverageAmount}>₹5,00,000</Text>
            <Text style={styles.coverageLabel}>Hospitalization & Work-Duty Accidental Coverage</Text>
          </View>

          <TouchableOpacity style={styles.claimBtn} onPress={handleFileClaim}>
            <Ionicons name="medkit" size={16} color="#FFFFFF" />
            <Text style={styles.claimBtnText}>File Emergency Cashless Claim</Text>
          </TouchableOpacity>
        </View>

        {/* Passbook Ledger */}
        <Text style={styles.ledgerTitle}>Welfare Fund Passbook</Text>
        {WELFARE_TRANSACTIONS.map((tx) => (
          <View key={tx.id} style={styles.txItem}>
            <View style={styles.txLeft}>
              <View style={[
                styles.txDot,
                tx.type === 'dividend' && { backgroundColor: '#F59E0B' },
                tx.type === 'advance' && { backgroundColor: Colors.danger },
              ]} />
              <View>
                <Text style={styles.txDesc}>{tx.desc}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
            </View>
            <Text style={[
              styles.txAmount,
              tx.type === 'dividend' && { color: '#B45309' },
              tx.type === 'advance' && { color: Colors.danger },
            ]}>
              {tx.amount}
            </Text>
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
  heroCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: Radii.card,
    padding: 18,
    ...Shadows.card,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLabel: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroBalance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  coopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 4,
  },
  coopBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  heroSub: {
    color: '#A7F3D0',
    fontSize: Typography.fontSize.xs,
    marginTop: 8,
    lineHeight: 18,
  },
  heroActions: {
    marginTop: 14,
  },
  loanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: Radii.pill,
    gap: 6,
  },
  loanBtnText: {
    color: Colors.primaryDark,
    fontSize: Typography.fontSize.xs,
    fontWeight: '800',
  },
  insuranceCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  insHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  shieldCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
    color: Colors.text,
  },
  policyNum: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  activeTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  activeTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  coverageBox: {
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: 12,
    marginBottom: 12,
  },
  coverageAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  coverageLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: Radii.pill,
    gap: 6,
  },
  claimBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  ledgerTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 6,
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  txDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  txDesc: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  txDate: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  txAmount: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
});
