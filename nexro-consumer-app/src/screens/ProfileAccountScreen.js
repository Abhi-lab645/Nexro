import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function ProfileAccountScreen({ currentLang, onSelectLanguage, onOpenSos, t }) {
  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const handleShowCharter = () => {
    Alert.alert(
      'Cooperative Fair Wage Charter',
      'Nexro bylaws guarantee:\n1. 85%+ direct pro compensation.\n2. Zero surge exploitation.\n3. Democratic member representation on dispute resolution panels.'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          <Ionicons name="person" size={32} color={Colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>Abhinav Kumar</Text>
          <Text style={styles.memberId}>{t.memberId || 'Nexro Co-op Patron #NX-8821'}</Text>
          <View style={styles.societyRow}>
            <Ionicons name="shield-checkmark" size={12} color={Colors.primary} />
            <Text style={styles.societyText}>Indiranagar Cluster Ward #42</Text>
          </View>
        </View>
      </View>

      {/* Patron Impact Card */}
      <View style={styles.impactCard}>
        <View style={styles.impactHeader}>
          <Ionicons name="heart" size={20} color={Colors.primary} />
          <Text style={styles.impactTitle}>Your Cooperative Social Impact</Text>
        </View>
        <Text style={styles.impactSubtitle}>
          By booking through Nexro instead of private aggregators, you have contributed:
        </Text>
        <View style={styles.impactGrid}>
          <View style={styles.impactItem}>
            <Text style={styles.impactVal}>₹12,480</Text>
            <Text style={styles.impactLabel}>Direct Pro Pay</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactVal}>₹374</Text>
            <Text style={styles.impactLabel}>Worker Health Fund</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactVal}>18</Text>
            <Text style={styles.impactLabel}>Pros Supported</Text>
          </View>
        </View>
      </View>

      {/* Multilingual Selector (EN / HI / KN) */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="language" size={18} color={Colors.text} />
          <Text style={styles.sectionTitle}>{t.language || 'Language / भाषा / ಭಾಷೆ'}</Text>
        </View>
        <View style={styles.langList}>
          {languages.map((l) => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langOption, currentLang === l.code && styles.langOptionActive]}
              onPress={() => onSelectLanguage(l.code)}
            >
              <Text style={[styles.langText, currentLang === l.code && styles.langTextActive]}>
                {l.native} ({l.label})
              </Text>
              {currentLang === l.code && (
                <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Safety & Emergency Settings */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="alert-circle-outline" size={18} color={Colors.danger} />
          <Text style={styles.sectionTitle}>Safety & SOS Settings</Text>
        </View>
        <TouchableOpacity style={styles.menuRow} onPress={onOpenSos}>
          <View>
            <Text style={styles.menuTitle}>Emergency SOS Hotline</Text>
            <Text style={styles.menuSub}>Ward #42 24x7 cooperative rapid response</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Governance & Bylaws */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="document-text-outline" size={18} color={Colors.text} />
          <Text style={styles.sectionTitle}>Cooperative Governance</Text>
        </View>
        <TouchableOpacity style={styles.menuRow} onPress={handleShowCharter}>
          <View>
            <Text style={styles.menuTitle}>Fair Wage Charter & Bylaws</Text>
            <Text style={styles.menuSub}>Read our transparent rate & commission guidelines</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
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
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
    gap: 14,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  memberId: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  societyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  societyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  impactCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  impactTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  impactSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  impactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.md,
    padding: 12,
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactVal: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  impactLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  langList: {
    gap: 8,
  },
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radii.md,
    backgroundColor: Colors.background,
  },
  langOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  langText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  langTextActive: {
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  menuSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
