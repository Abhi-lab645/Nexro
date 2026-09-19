import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function WorkerProfileScreen({ worker, onProceedToBooking, onBack }) {
  if (!worker) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Worker Profile & Accreditation</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Profile Hero Card */}
        <View style={styles.heroCard}>
          <Image source={{ uri: worker.avatar }} style={styles.avatar} />
          <View style={styles.verifiedRow}>
            <Text style={styles.workerName}>{worker.name}</Text>
            <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.roleText}>{worker.role}</Text>
          <Text style={styles.societyText}>{worker.society}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <View style={styles.statValRow}>
                <Ionicons name="star" size={15} color={Colors.starGold} />
                <Text style={styles.statBig}>{worker.rating}</Text>
              </View>
              <Text style={styles.statLabel}>{worker.reviewsCount} reviews</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statBig}>{worker.completedJobs}+</Text>
              <Text style={styles.statLabel}>Jobs Completed</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <Text style={styles.statBig}>{worker.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        {/* Cooperative Ownership & Governance Badge */}
        <View style={styles.coopCard}>
          <View style={styles.coopHeader}>
            <Ionicons name="people" size={20} color={Colors.primaryDark} />
            <Text style={styles.coopTitle}>Cooperative Ownership Status</Text>
          </View>
          <Text style={styles.coopBody}>
            {worker.name} is a voting member-owner of {worker.societyShort}. Unlike private gig platforms, he receives 85%+ of bookings directly plus annual profit dividends.
          </Text>
          <View style={styles.coopGrid}>
            <View style={styles.coopGridItem}>
              <Text style={styles.coopGridLabel}>Co-op Tenure</Text>
              <Text style={styles.coopGridVal}>{worker.coopTenure}</Text>
            </View>
            <View style={styles.coopGridItem}>
              <Text style={styles.coopGridLabel}>Dividends Earned</Text>
              <Text style={styles.coopGridVal}>{worker.coopDividendsPaid}</Text>
            </View>
          </View>
        </View>

        {/* Verified Skills & Certifications */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Verified Skills & Licenses</Text>
          <View style={styles.skillsWrap}>
            {worker.skills?.map((skill, index) => (
              <View key={index} style={styles.skillPill}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Welfare & Insurance Coverage */}
        <View style={styles.insuranceCard}>
          <Ionicons name="medkit" size={20} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.insuranceTitle}>Federation Welfare & Safety Shield</Text>
            <Text style={styles.insuranceDesc}>{worker.insuranceCovered}</Text>
          </View>
        </View>

        {/* Customer Feedback Sample */}
        <View style={styles.reviewsCard}>
          <Text style={styles.sectionHeading}>Recent Patron Feedback</Text>
          <View style={styles.reviewItem}>
            <View style={styles.reviewUserRow}>
              <Text style={styles.reviewUserName}>Ananya S. • Indiranagar</Text>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="star" size={12} color={Colors.starGold} />
                <Ionicons name="star" size={12} color={Colors.starGold} />
                <Ionicons name="star" size={12} color={Colors.starGold} />
                <Ionicons name="star" size={12} color={Colors.starGold} />
                <Ionicons name="star" size={12} color={Colors.starGold} />
              </View>
            </View>
            <Text style={styles.reviewComment}>
              "Arrived precisely on time. Fixed the concealed wiring without digging into the wall. Very transparent about materials cost. Proud to support a cooperative pro!"
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceBig}>₹{worker.hourlyRate}</Text>
          <Text style={styles.priceSub}>Direct Pro Base Rate</Text>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => onProceedToBooking(worker)}
          activeOpacity={0.85}
        >
          <Text style={styles.bookBtnText}>Book Appointment</Text>
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
    fontWeight: '700',
    color: Colors.text,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    gap: 14,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.border,
    marginBottom: 12,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workerName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  roleText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  societyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statCol: {
    alignItems: 'center',
  },
  statValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statBig: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  coopCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  coopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  coopTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  coopBody: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  coopGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  coopGridItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: Radii.sm,
  },
  coopGridLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  coopGridVal: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeading: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    gap: 5,
    borderWidth: 1,
    borderColor: '#D1EAE0',
  },
  skillText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  insuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  insuranceTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  insuranceDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reviewsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewItem: {
    backgroundColor: Colors.background,
    borderRadius: Radii.sm,
    padding: 12,
  },
  reviewUserRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewUserName: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewComment: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 17,
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
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  priceSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    gap: 8,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
});
