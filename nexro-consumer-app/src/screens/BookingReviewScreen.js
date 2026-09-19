import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import WorkerCard from '../components/WorkerCard';

export default function BookingReviewScreen({ worker, service, onProceedToPayment, onBack }) {
  const [slotType, setSlotType] = useState('instant');
  const [selectedSlot, setSelectedSlot] = useState('Today, 4:00 PM - 5:00 PM');
  const [address, setAddress] = useState('#402, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru');
  const [notes, setNotes] = useState('');

  const slots = [
    'Today, 4:00 PM - 5:00 PM',
    'Today, 6:00 PM - 7:00 PM',
    'Tomorrow, 10:00 AM - 11:00 AM',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Booking & Schedule</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {worker && <WorkerCard worker={worker} compact />}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dispatch Mode</Text>
          <View style={styles.modeTabs}>
            <TouchableOpacity
              style={[styles.modeTab, slotType === 'instant' && styles.modeTabActive]}
              onPress={() => setSlotType('instant')}
            >
              <Ionicons
                name="flash"
                size={16}
                color={slotType === 'instant' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.modeText, slotType === 'instant' && styles.modeTextActive]}>
                Instant (15-25m)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeTab, slotType === 'scheduled' && styles.modeTabActive]}
              onPress={() => setSlotType('scheduled')}
            >
              <Ionicons
                name="calendar"
                size={16}
                color={slotType === 'scheduled' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.modeText, slotType === 'scheduled' && styles.modeTextActive]}>
                Schedule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeTab, slotType === 'recurring' && styles.modeTabActive]}
              onPress={() => setSlotType('recurring')}
            >
              <Ionicons
                name="repeat"
                size={16}
                color={slotType === 'recurring' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.modeText, slotType === 'recurring' && styles.modeTextActive]}>
                Co-op Pass (-10%)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {slotType === 'scheduled' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Preferred Slot</Text>
            {slots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[styles.slotOption, selectedSlot === slot && styles.slotOptionActive]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Ionicons
                  name={selectedSlot === slot ? "radio-button-on" : "radio-button-off"}
                  size={18}
                  color={selectedSlot === slot ? Colors.primary : Colors.textMuted}
                />
                <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextActive]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {slotType === 'recurring' && (
          <View style={styles.recurringBanner}>
            <Ionicons name="sparkles" size={18} color={Colors.aiAccent} />
            <View style={{ flex: 1 }}>
              <Text style={styles.recurringTitle}>Cooperative Recurring Patronage</Text>
              <Text style={styles.recurringDesc}>
                Bi-weekly maintenance inspection. 10% discount on labor, guaranteed priority booking and society dividend credits.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionTitle}>Service Location</Text>
            <TouchableOpacity>
              <Text style={styles.changeLink}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions / Landmark (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="e.g. Ring bell 402, water valve is behind the washing machine"
            placeholderTextColor={Colors.textMuted}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceBig}>₹{worker?.hourlyRate || 299}</Text>
          <Text style={styles.priceSub}>Direct Worker Fee</Text>
        </View>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => onProceedToPayment(worker, { slotType, selectedSlot, address, notes })}
          activeOpacity={0.85}
        >
          <Text style={styles.proceedBtnText}>Fair Wage Breakdown</Text>
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
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: Radii.pill,
    padding: 4,
    gap: 4,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: Radii.pill,
    gap: 5,
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
    ...Shadows.card,
  },
  modeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  modeTextActive: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  slotOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    marginBottom: 6,
  },
  slotOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySurface,
  },
  slotText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  slotTextActive: {
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  recurringBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aiLight,
    padding: 14,
    borderRadius: Radii.card,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  recurringTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.aiText,
  },
  recurringDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeLink: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  addressTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  addressText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  notesInput: {
    backgroundColor: Colors.card,
    borderRadius: Radii.md,
    padding: 12,
    fontSize: Typography.fontSize.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
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
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    gap: 8,
  },
  proceedBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
});
