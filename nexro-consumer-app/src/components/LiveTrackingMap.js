import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function LiveTrackingMap({ currentStep = 1, eta = '14 min', proName = 'Rajesh Kumar' }) {
  const steps = [
    { key: 0, label: 'Assigned' },
    { key: 1, label: 'En Route' },
    { key: 2, label: 'Arrived' },
    { key: 3, label: 'In Progress' },
    { key: 4, label: 'Completed' },
  ];

  return (
    <View style={styles.container}>
      {/* Simulated Map Canvas */}
      <View style={styles.mapCanvas}>
        {/* Background Map Grid & Roads */}
        <View style={styles.roadHorizontal1} />
        <View style={styles.roadHorizontal2} />
        <View style={styles.roadDiagonal} />
        <View style={styles.parkZone} />

        {/* Live Route Line */}
        <View style={styles.routeLine} />

        {/* Customer Location Pin */}
        <View style={styles.customerPin}>
          <Ionicons name="home" size={14} color="#FFFFFF" />
          <View style={styles.pinLabel}>
            <Text style={styles.pinLabelText}>Your Location</Text>
          </View>
        </View>

        {/* Worker Moving Location Marker */}
        <View style={styles.workerPin}>
          <View style={styles.pulseRing} />
          <View style={styles.workerMarkerCenter}>
            <Ionicons name="bicycle" size={16} color="#FFFFFF" />
          </View>
          <View style={styles.workerPinLabel}>
            <Text style={styles.workerPinText}>{proName} ({eta})</Text>
          </View>
        </View>

        {/* Speed & ETA Floating Badge */}
        <View style={styles.etaFloatingBadge}>
          <Ionicons name="time" size={14} color={Colors.primary} />
          <Text style={styles.etaBadgeText}>ETA {eta}</Text>
          <Text style={styles.etaDot}>•</Text>
          <Text style={styles.distanceBadgeText}>1.2 km away</Text>
        </View>
      </View>

      {/* 5-Step Pipeline Stepper */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepsRow}>
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <React.Fragment key={step.key}>
                <View style={styles.stepItem}>
                  <View style={[
                    styles.stepDot,
                    isCompleted && styles.stepDotCompleted,
                    isCurrent && styles.stepDotCurrent,
                  ]}>
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    ) : (
                      <Text style={[styles.stepNum, isCurrent && styles.stepNumCurrent]}>
                        {idx + 1}
                      </Text>
                    )}
                  </View>
                  <Text style={[
                    styles.stepLabel,
                    isCurrent && styles.stepLabelCurrent,
                    isCompleted && styles.stepLabelCompleted,
                  ]}>
                    {step.label}
                  </Text>
                </View>
                {idx < steps.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    currentStep > idx && styles.stepLineActive,
                  ]} />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
    marginBottom: 16,
  },
  mapCanvas: {
    height: 190,
    backgroundColor: '#E5ECE8',
    position: 'relative',
    overflow: 'hidden',
  },
  roadHorizontal1: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#CBD7D0',
  },
  roadHorizontal2: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#CBD7D0',
  },
  roadDiagonal: {
    position: 'absolute',
    top: -20,
    left: '40%',
    width: 20,
    height: 250,
    backgroundColor: '#CBD7D0',
    transform: [{ rotate: '35deg' }],
  },
  parkZone: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 80,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#D1E6DA',
  },
  routeLine: {
    position: 'absolute',
    top: 80,
    left: 70,
    width: 170,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    transform: [{ rotate: '-18deg' }],
  },
  customerPin: {
    position: 'absolute',
    top: 105,
    right: 50,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  pinLabel: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'rgba(20, 24, 27, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    width: 80,
    alignItems: 'center',
  },
  pinLabelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  workerPin: {
    position: 'absolute',
    top: 55,
    left: 70,
    alignItems: 'center',
  },
  workerMarkerCenter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pulseRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(18, 128, 92, 0.25)',
  },
  workerPinLabel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  workerPinText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text,
  },
  etaFloatingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    gap: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  etaBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primaryDark,
  },
  etaDot: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  distanceBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  stepperContainer: {
    padding: 14,
    backgroundColor: Colors.card,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    width: 54,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepDotCurrent: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1.15 }],
  },
  stepDotCompleted: {
    backgroundColor: Colors.primary,
  },
  stepNum: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  stepNumCurrent: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '500',
    textAlign: 'center',
  },
  stepLabelCurrent: {
    color: Colors.primary,
    fontWeight: '700',
  },
  stepLabelCompleted: {
    color: Colors.text,
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginTop: -14,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
});
