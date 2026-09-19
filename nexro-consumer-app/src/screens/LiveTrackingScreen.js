import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import LiveTrackingMap from '../components/LiveTrackingMap';

export default function LiveTrackingScreen({ bookingId = 'NX-94812', worker, onBack, onSosPress }) {
  const [currentStep, setCurrentStep] = useState(1); // 0: Assigned, 1: En Route, 2: Arrived, 3: In Progress, 4: Completed
  const [eta, setEta] = useState('14 min');

  const pro = worker || {
    name: 'Rajesh Kumar',
    role: 'Lead Master Electrician',
    society: 'Indiranagar Gig Society #42',
    rating: 4.94,
    phone: '+91 98765 43210',
    distanceKm: 1.2,
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 0) setEta('12 min');
      if (currentStep === 1) setEta('Arrived at gate');
      if (currentStep === 2) setEta('Working on repair');
      if (currentStep === 3) setEta('Completed');
    }
  };

  const handleCallPro = () => {
    Alert.alert('Calling Pro', `Connecting to ${pro.name} via masked cooperative privacy proxy (${pro.phone})...`);
  };

  const handleMessagePro = () => {
    Alert.alert('Cooperative Chat', `Opening encrypted direct channel with ${pro.name}.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Live Dispatch Tracking</Text>
          <Text style={styles.headerSubtitle}>Booking #{bookingId}</Text>
        </View>
        <TouchableOpacity style={styles.sosPill} onPress={onSosPress}>
          <Ionicons name="alert-circle" size={15} color={Colors.danger} />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Native Live Map and Stepper */}
        <LiveTrackingMap
          currentStep={currentStep}
          eta={eta}
          proName={pro.name}
        />

        {/* Simulation step controller for testing all states */}
        <TouchableOpacity style={styles.simStepBtn} onPress={handleNextStep}>
          <Ionicons name="play-forward" size={14} color={Colors.primaryDark} />
          <Text style={styles.simStepText}>
            Simulate Next Status: Step {currentStep + 1}/5
          </Text>
        </TouchableOpacity>

        {/* Assigned Worker Profile Card */}
        <View style={styles.proCard}>
          <View style={styles.proRow}>
            <View style={styles.proAvatarWrap}>
              <Ionicons name="person" size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.proName}>{pro.name}</Text>
                <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
              </View>
              <Text style={styles.proRole}>{pro.role}</Text>
              <Text style={styles.proSociety}>{pro.society}</Text>
            </View>
          </View>

          {/* Direct Communication Buttons */}
          <View style={styles.commButtonsRow}>
            <TouchableOpacity style={styles.commBtn} onPress={handleCallPro}>
              <Ionicons name="call" size={16} color={Colors.primary} />
              <Text style={styles.commBtnText}>Call Pro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.commBtn} onPress={handleMessagePro}>
              <Ionicons name="chatbubble-ellipses" size={16} color={Colors.primary} />
              <Text style={styles.commBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cooperative Safety & Quality Shield */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
            <Text style={styles.safetyTitle}>Cooperative Safety Protocol</Text>
          </View>
          <Text style={styles.safetyDesc}>
            All jobs are monitored by the Ward #42 Emergency Response Hub. Live GPS check-ins & two-way verified OTP verification before job commencement.
          </Text>
        </View>

        {/* Job Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Service Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vertical:</Text>
            <Text style={styles.detailVal}>Electrical Diagnostics & Repair</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Destination:</Text>
            <Text style={styles.detailVal}>Indiranagar 2nd Stage</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailVal}>UPI Direct Pay</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={[styles.detailVal, { color: Colors.primaryDark, fontWeight: '800' }]}>₹400</Text>
          </View>
        </View>
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
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  sosPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  sosText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.danger,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  simStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  simStepText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  proCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  commButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  commBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    gap: 6,
  },
  commBtnText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  safetyCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  safetyTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  safetyDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  detailsTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  detailVal: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.text,
  },
});
