import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import ExplainableMatchCard from '../components/ExplainableMatchCard';
import WorkerCard from '../components/WorkerCard';
import { WORKERS } from '../data/mockData';

export default function WorkerMatchingScreen({ service, onSelectWorker, onBack }) {
  const [selectedWorker, setSelectedWorker] = useState(WORKERS[0]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Matched Cooperative Pros</Text>
          <Text style={styles.headerSubtitle}>
            {service?.title || 'Electrical Service'} • Ward #42
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Explainable Matching Header Banner */}
        <ExplainableMatchCard
          worker={selectedWorker}
          triageReason={`${service?.title || 'Selected Service'} in Indiranagar Ward`}
        />

        <Text style={styles.sectionTitle}>Available Verified Pros</Text>

        {WORKERS.map((worker) => (
          <WorkerCard
            key={worker.id}
            worker={worker}
            selected={selectedWorker?.id === worker.id}
            onSelect={(w) => setSelectedWorker(w)}
          />
        ))}
      </ScrollView>

      {/* Floating Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.bottomPrice}>₹{selectedWorker?.hourlyRate}</Text>
          <Text style={styles.bottomLabel}>Standard Cooperative Base</Text>
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => onSelectWorker(selectedWorker)}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue with {selectedWorker?.name.split(' ')[0]}</Text>
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
    fontSize: Typography.fontSize.lg,
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
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 12,
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
  priceContainer: {
    flex: 1,
  },
  bottomPrice: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  bottomLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    gap: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
});
