import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { SERVICE_AREAS } from '../data/mockData';

export default function LocationScreen({ onLocationConfirmed }) {
  const [selectedPin, setSelectedPin] = useState('560038');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="navigate-circle" size={48} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Locate Your Cooperative Cluster</Text>
        <Text style={styles.subtitle}>
          Nexro pairs you with worker-managed societies operating in your municipal ward.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.gpsBtn}
        onPress={() => onLocationConfirmed('Indiranagar, Bengaluru (560038)')}
        activeOpacity={0.8}
      >
        <Ionicons name="locate" size={20} color="#FFFFFF" />
        <Text style={styles.gpsBtnText}>Use Current Device Location</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Or Select Active Service Cluster</Text>

      <View style={styles.areaList}>
        {SERVICE_AREAS.map((item) => (
          <TouchableOpacity
            key={item.pin}
            style={[
              styles.areaCard,
              selectedPin === item.pin && styles.areaCardActive,
              !item.active && styles.areaCardInactive,
            ]}
            onPress={() => {
              setSelectedPin(item.pin);
              if (item.active) {
                onLocationConfirmed(`${item.area}, Bengaluru (${item.pin})`);
              }
            }}
            activeOpacity={0.7}
          >
            <View style={styles.areaLeft}>
              <View style={styles.pinCircle}>
                <Ionicons
                  name={item.active ? 'checkmark-circle' : 'time-outline'}
                  size={18}
                  color={item.active ? Colors.primary : Colors.warning}
                />
              </View>
              <View>
                <Text style={styles.areaName}>{item.area}</Text>
                <Text style={styles.pinText}>PIN: {item.pin}</Text>
                {item.active ? (
                  <Text style={styles.societyText}>{item.society} • {item.activePros} Pros</Text>
                ) : (
                  <Text style={styles.waitlistText}>Expanding • {item.waitlistCount} on waitlist</Text>
                )}
              </View>
            </View>

            <View style={styles.areaRight}>
              {item.active ? (
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>ACTIVE</Text>
                </View>
              ) : (
                <View style={styles.waitlistPill}>
                  <Text style={styles.waitlistPillText}>JOIN WAITLIST</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
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
  content: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  gpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    marginBottom: 28,
  },
  gpsBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  areaList: {
    gap: 10,
    marginBottom: 30,
  },
  areaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  areaCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySurface,
  },
  areaCardInactive: {
    opacity: 0.85,
    backgroundColor: '#FAF9F6',
  },
  areaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaName: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  pinText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  societyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
    marginTop: 2,
  },
  waitlistText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.warning,
    fontWeight: '600',
    marginTop: 2,
  },
  activePill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  waitlistPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  waitlistPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
});
