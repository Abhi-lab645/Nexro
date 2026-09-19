import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import ServiceCard from '../components/ServiceCard';
import WorkerCard from '../components/WorkerCard';
import { SERVICES, WORKERS } from '../data/mockData';

export default function HomeScreen({ 
  onSelectService, 
  onSelectWorker, 
  onAskAI, 
  onViewAllServices, 
  onViewActiveTracking, 
  t, 
  lang 
}) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            placeholder={t.searchPlaceholder || 'Search "geyser repair", "fan wiring"...'}
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={onAskAI} style={styles.aiMicBtn}>
            <Ionicons name="sparkles" size={16} color={Colors.aiAccent} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Booking Live Ticker */}
      <TouchableOpacity 
        style={styles.activeBookingBanner}
        onPress={onViewActiveTracking}
        activeOpacity={0.85}
      >
        <View style={styles.livePulseCircle}>
          <View style={styles.liveDot} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.activeBookingTitle}>{t.activeBookingBanner || 'Active Booking in Progress'}</Text>
          <Text style={styles.activeBookingSubtitle}>Rajesh Kumar is on the way • ETA 14 min</Text>
        </View>
        <View style={styles.trackPill}>
          <Text style={styles.trackPillText}>TRACK</Text>
          <Ionicons name="chevron-forward" size={12} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* Ask Nexro AI Hero Banner (Strictly Signal Indigo #5B4FE8) */}
      <TouchableOpacity 
        style={styles.aiHeroCard}
        onPress={onAskAI}
        activeOpacity={0.9}
      >
        <View style={styles.aiGlowOrb} />
        <View style={styles.aiCardHeader}>
          <View style={styles.aiTag}>
            <Ionicons name="sparkles" size={13} color="#FFFFFF" />
            <Text style={styles.aiTagText}>NEXRO AI PROBLEM INTAKE</Text>
          </View>
        </View>

        <Text style={styles.aiCardTitle}>{t.aiBannerTitle || 'Got an issue? Describe it to AI'}</Text>
        <Text style={styles.aiCardSubtitle}>
          {t.aiBannerSubtitle || 'Tell us what happened. Our cooperative AI identifies the exact fault & matches the top local pro.'}
        </Text>

        <View style={styles.aiInputPreview}>
          <Ionicons name="mic-outline" size={18} color={Colors.aiText} />
          <Text style={styles.aiInputPlaceholder}>
            "Water leaking from under kitchen sink..."
          </Text>
          <View style={styles.aiCtaPill}>
            <Text style={styles.aiCtaText}>Diagnose</Text>
            <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Cooperative Vertical Services Grid */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>{t.categoriesTitle || 'Cooperative Services'}</Text>
            <Text style={styles.sectionSubtitle}>Direct bookings with verified guild members</Text>
          </View>
          <TouchableOpacity onPress={onViewAllServices}>
            <Text style={styles.viewAllText}>{t.viewAll || 'View All'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {SERVICES.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={onSelectService}
              lang={lang}
            />
          ))}
        </View>
      </View>

      {/* Why Nexro Cooperative Model Card */}
      <View style={styles.coopModelCard}>
        <View style={styles.coopModelHeader}>
          <Ionicons name="people-circle" size={26} color={Colors.primary} />
          <Text style={styles.coopModelTitle}>How Nexro Is Different</Text>
        </View>
        <Text style={styles.coopModelSubtitle}>
          Traditional aggregator apps take 30–50% commission. Nexro is a cooperative owned by the workers themselves.
        </Text>
        
        <View style={styles.coopStatsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statBig}>85%+</Text>
            <Text style={styles.statLabel}>Direct Pro Pay</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statBig}>0%</Text>
            <Text style={styles.statLabel}>Surge Exploitation</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statBig}>₹5L</Text>
            <Text style={styles.statLabel}>Health Shield</Text>
          </View>
        </View>
      </View>

      {/* Nearby Verified Pros */}
      <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>{t.nearbyProsTitle || 'Verified Pros in Indiranagar'}</Text>
            <Text style={styles.sectionSubtitle}>Vetted by Ward Society #42</Text>
          </View>
        </View>

        {WORKERS.map((worker) => (
          <WorkerCard
            key={worker.id}
            worker={worker}
            onSelect={onSelectWorker}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    marginLeft: 8,
  },
  aiMicBtn: {
    padding: 6,
    backgroundColor: Colors.aiLight,
    borderRadius: 14,
  },
  activeBookingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: Radii.card,
    padding: 12,
    gap: 10,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  livePulseCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  activeBookingTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
  activeBookingSubtitle: {
    color: '#A7F3D0',
    fontSize: Typography.fontSize.xs,
    marginTop: 1,
  },
  trackPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    gap: 2,
  },
  trackPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  aiHeroCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: Colors.aiAccent,
    borderRadius: Radii.card,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.aiGlow,
  },
  aiGlowOrb: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  aiCardHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 4,
  },
  aiTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  aiCardTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    marginBottom: 4,
  },
  aiCardSubtitle: {
    color: '#E0E7FF',
    fontSize: Typography.fontSize.xs,
    lineHeight: 17,
    marginBottom: 14,
  },
  aiInputPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  aiInputPlaceholder: {
    flex: 1,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  aiCtaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aiAccent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    gap: 4,
  },
  aiCtaText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  viewAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '700',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coopModelCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  coopModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  coopModelTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  coopModelSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  coopStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.md,
    paddingVertical: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statBig: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
});
