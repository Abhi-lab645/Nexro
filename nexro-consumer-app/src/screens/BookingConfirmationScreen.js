import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function BookingConfirmationScreen({ bookingId = 'NX-94812', worker, onTrackLive, onGoHome }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated Checkmark Circle */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark-sharp" size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.bookingIdText}>Booking ID: #{bookingId}</Text>
        
        <Text style={styles.successSubtitle}>
          Your service has been scheduled directly with {worker?.societyShort || 'Indiranagar Society #42'}.
        </Text>

        {/* Pro Card Preview */}
        <View style={styles.proCard}>
          <View style={styles.proHeader}>
            <View style={styles.proIcon}>
              <Ionicons name="person" size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{worker?.name || 'Rajesh Kumar'}</Text>
              <Text style={styles.proRole}>{worker?.role || 'Lead Master Electrician'}</Text>
              <Text style={styles.proSociety}>{worker?.societyShort || 'Society #42'}</Text>
            </View>
            <View style={styles.etaPill}>
              <Ionicons name="time" size={12} color={Colors.primaryDark} />
              <Text style={styles.etaText}>15-20 min</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.guaranteeRow}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
            <Text style={styles.guaranteeText}>
              Backed by ₹5L Group Accident & Quality Guarantee
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={onTrackLive}
          activeOpacity={0.85}
        >
          <Ionicons name="navigate" size={18} color="#FFFFFF" />
          <Text style={styles.trackBtnText}>Live Track Your Pro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={onGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  successTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  bookingIdText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '700',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    marginTop: 8,
  },
  successSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  proCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    marginTop: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  proRole: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  proSociety: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  etaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 4,
  },
  etaText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guaranteeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    ...Shadows.card,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  homeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  homeBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
  },
});
