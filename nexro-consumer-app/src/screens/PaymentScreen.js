import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function PaymentScreen({ worker, bookingDetails, onPaymentSuccess, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const baseFare = worker?.hourlyRate || 299;
  const materials = 49;
  const welfarePool = Math.round(baseFare * 0.03); // 3%
  const platformFee = Math.round(baseFare * 0.12); // 12%
  const total = baseFare + materials + welfarePool + platformFee;

  const paymentOptions = [
    { id: 'upi', label: 'UPI (Google Pay / PhonePe / Paytm)', icon: 'phone-portrait-outline', popular: true },
    { id: 'wallet', label: 'Nexro Co-op Patron Balance (₹1,250)', icon: 'wallet-outline', popular: false },
    { id: 'cash', label: 'Pay Cash to Pro after Service', icon: 'cash-outline', popular: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fair Wage Transparent Receipt</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Fair Wage Guarantee Shield */}
        <View style={styles.shieldCard}>
          <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.shieldTitle}>100% Transparent Fee Guarantee</Text>
            <Text style={styles.shieldDesc}>
              Unlike aggregator platforms where workers get less than 50%, 85%+ of this booking goes directly to {worker?.name || 'your pro'}.
            </Text>
          </View>
        </View>

        {/* Itemized Breakdown Card */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptHeader}>Bill Summary</Text>

          <View style={styles.receiptRow}>
            <View>
              <Text style={styles.itemTitle}>Direct Pro Base Pay (85%+)</Text>
              <Text style={styles.itemSub}>Transferred directly to worker bank account</Text>
            </View>
            <Text style={styles.itemAmount}>₹{baseFare}</Text>
          </View>

          <View style={styles.receiptRow}>
            <View>
              <Text style={styles.itemTitle}>Standard Consumables & Kit</Text>
              <Text style={styles.itemSub}>Safety tape, tester, insulation supplies</Text>
            </View>
            <Text style={styles.itemAmount}>₹{materials}</Text>
          </View>

          <View style={styles.receiptRow}>
            <View>
              <Text style={styles.itemTitle}>Co-op Welfare & Health Fund (3%)</Text>
              <Text style={styles.itemSub}>Funds ₹5L group hospitalization shield</Text>
            </View>
            <Text style={styles.itemAmount}>₹{welfarePool}</Text>
          </View>

          <View style={styles.receiptRow}>
            <View>
              <Text style={styles.itemTitle}>Tech & Platform Maintenance (12%)</Text>
              <Text style={styles.itemSub}>Server hosting & GPS dispatch systems</Text>
            </View>
            <Text style={styles.itemAmount}>₹{platformFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalTitle}>Total To Pay</Text>
              <Text style={styles.noSurgeText}>0% Surge Pricing Applied</Text>
            </View>
            <Text style={styles.totalAmount}>₹{total}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Mode</Text>
          {paymentOptions.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.payOption, paymentMethod === opt.id && styles.payOptionActive]}
              onPress={() => setPaymentMethod(opt.id)}
            >
              <View style={styles.optionLeft}>
                <Ionicons
                  name={paymentMethod === opt.id ? "radio-button-on" : "radio-button-off"}
                  size={18}
                  color={paymentMethod === opt.id ? Colors.primary : Colors.textMuted}
                />
                <Ionicons name={opt.icon} size={20} color={Colors.text} />
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </View>
              {opt.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>INSTANT</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceBig}>₹{total}</Text>
          <Text style={styles.priceSub}>All-inclusive price</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => onPaymentSuccess({ total, method: paymentMethod })}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm & Book Pro</Text>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
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
    fontWeight: '700',
    color: Colors.text,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  shieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: Radii.card,
    gap: 12,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  shieldTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  shieldDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginTop: 2,
  },
  receiptCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  receiptHeader: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  itemTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  itemSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  itemAmount: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.text,
  },
  noSurgeText: {
    fontSize: 10,
    color: Colors.success,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  payOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  payOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySurface,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  optionLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  popularBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.float,
  },
  priceBig: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  priceSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    gap: 8,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
});
