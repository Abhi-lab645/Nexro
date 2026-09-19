import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function BookingsListScreen({ onTrackBooking, onRebook }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'

  const upcomingBookings = [
    {
      id: 'NX-94812',
      service: 'Electrical Diagnostics & Repair',
      proName: 'Rajesh Kumar',
      proRole: 'Lead Master Electrician',
      society: 'Indiranagar Society #42',
      status: 'Pro Dispatched',
      eta: '14 min',
      slot: 'Today, Instant Dispatch',
      amount: 400,
      active: true,
    },
  ];

  const pastBookings = [
    {
      id: 'NX-81729',
      service: 'Concealed Water Leak Repair',
      proName: 'Ravi Varma',
      proRole: 'Senior Certified Plumber',
      society: 'Koramangala Guild #07',
      status: 'Completed',
      date: 'Aug 28, 2026',
      amount: 349,
      ratingGiven: 5,
    },
    {
      id: 'NX-78210',
      service: 'Deep Kitchen Degreasing & Sanitization',
      proName: 'Meera Shankar',
      proRole: 'Sanitization Specialist',
      society: 'HSR Seva Samiti #19',
      status: 'Completed',
      date: 'Jul 14, 2026',
      amount: 599,
      ratingGiven: 5,
    },
  ];

  const handleDownloadInvoice = (id) => {
    Alert.alert('Cooperative Invoice', `Official GST & Cooperative Society receipt downloaded for #${id}.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cooperative Bookings</Text>
        <Text style={styles.headerSubtitle}>Direct patron receipts & job history</Text>
      </View>

      {/* Segmented Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'upcoming' && styles.tabBtnTextActive]}>
            Upcoming ({upcomingBookings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'past' && styles.tabBtnTextActive]}>
            Past ({pastBookings.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {activeTab === 'upcoming' ? (
          upcomingBookings.map((b) => (
            <View key={b.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.serviceTitle}>{b.service}</Text>
                  <Text style={styles.bookingId}>Booking #{b.id}</Text>
                </View>
                <View style={styles.liveStatusPill}>
                  <View style={styles.greenPulse} />
                  <Text style={styles.liveStatusText}>{b.status}</Text>
                </View>
              </View>

              <View style={styles.proInfoBox}>
                <View style={styles.avatarMini}>
                  <Ionicons name="person" size={18} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.proName}>{b.proName}</Text>
                  <Text style={styles.proSociety}>{b.society}</Text>
                </View>
                <Text style={styles.bookingAmount}>₹{b.amount}</Text>
              </View>

              <View style={styles.etaRow}>
                <Ionicons name="time" size={14} color={Colors.primary} />
                <Text style={styles.etaText}>Pro arriving in ~{b.eta} ({b.slot})</Text>
              </View>

              <TouchableOpacity
                style={styles.trackActionBtn}
                onPress={() => onTrackBooking(b)}
                activeOpacity={0.85}
              >
                <Ionicons name="navigate" size={16} color="#FFFFFF" />
                <Text style={styles.trackActionText}>Live Track & Contact Pro</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          pastBookings.map((b) => (
            <View key={b.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.serviceTitle}>{b.service}</Text>
                  <Text style={styles.bookingId}>Booking #{b.id} • {b.date}</Text>
                </View>
                <View style={styles.completedPill}>
                  <Ionicons name="checkmark-circle" size={12} color={Colors.primary} />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>

              <View style={styles.proInfoBox}>
                <View style={styles.avatarMini}>
                  <Ionicons name="person" size={18} color={Colors.textSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.proName}>{b.proName}</Text>
                  <Text style={styles.proSociety}>{b.society}</Text>
                </View>
                <Text style={styles.bookingAmount}>₹{b.amount}</Text>
              </View>

              <View style={styles.ratingRow}>
                <Text style={styles.ratedText}>Rated 5.0</Text>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={12} color={Colors.starGold} />
                  ))}
                </View>
              </View>

              <View style={styles.pastActionsRow}>
                <TouchableOpacity
                  style={styles.invoiceBtn}
                  onPress={() => handleDownloadInvoice(b.id)}
                >
                  <Ionicons name="document-text-outline" size={14} color={Colors.text} />
                  <Text style={styles.invoiceBtnText}>Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rebookBtn}
                  onPress={() => onRebook(b)}
                >
                  <Ionicons name="repeat" size={14} color={Colors.primary} />
                  <Text style={styles.rebookBtnText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: Radii.pill,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radii.pill,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...Shadows.card,
  },
  tabBtnText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabBtnTextActive: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 12,
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  bookingId: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  liveStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  liveStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 4,
  },
  completedText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
  proInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: Radii.md,
    gap: 10,
    marginBottom: 10,
  },
  avatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  proSociety: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  bookingAmount: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  etaText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  trackActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: Radii.pill,
    gap: 6,
  },
  trackActionText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  ratedText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pastActionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  invoiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  invoiceBtnText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text,
    fontWeight: '600',
  },
  rebookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.primaryLight,
    gap: 4,
  },
  rebookBtnText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '700',
  },
});
