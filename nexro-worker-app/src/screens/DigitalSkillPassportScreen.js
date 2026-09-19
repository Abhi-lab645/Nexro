import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import { WORKER_PROFILE } from '../data/workerData';

export default function DigitalSkillPassportScreen({ onSwitchRole }) {
  const [lang, setLang] = useState('en');

  const handleShowCertificate = (cert) => {
    Alert.alert(
      cert.title,
      `Verified by Society Registrar (${cert.issuer}, ${cert.year}).\nStatus: Active & Registered on National Skill Registry.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: WORKER_PROFILE.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{WORKER_PROFILE.name}</Text>
            <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.trade}>{WORKER_PROFILE.trade}</Text>
          <Text style={styles.society}>{WORKER_PROFILE.society}</Text>
          <Text style={styles.regNo}>Reg: {WORKER_PROFILE.societyRegNo}</Text>
        </View>
      </View>

      {/* Cooperative Shareholder Ownership */}
      <View style={styles.shareholderCard}>
        <View style={styles.shareHeader}>
          <Ionicons name="people-circle" size={24} color={Colors.primaryDark} />
          <View style={{ flex: 1 }}>
            <Text style={styles.shareTitle}>Cooperative Member-Owner</Text>
            <Text style={styles.shareSub}>{WORKER_PROFILE.coopShares}</Text>
          </View>
        </View>
        <Text style={styles.shareDesc}>
          Unlike corporate gig workers who are classified as independent contractors without rights, you are an equity shareholder with voting rights in annual society elections.
        </Text>
        <View style={styles.dividendBox}>
          <Text style={styles.dividendLabel}>CUMULATIVE ANNUAL DIVIDENDS EARNED</Text>
          <Text style={styles.dividendVal}>₹{WORKER_PROFILE.coopDividendsReceived.toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Digital Skill Passport Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="ribbon" size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Digital Skill Passport (NSQF & ITI)</Text>
        </View>

        {WORKER_PROFILE.certifications.map((c, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.certCard}
            onPress={() => handleShowCertificate(c)}
          >
            <View style={styles.certIconWrap}>
              <Ionicons name="school" size={20} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.certTop}>
                <Text style={styles.certTitle}>{c.title}</Text>
                <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
              </View>
              <Text style={styles.certIssuer}>{c.issuer}</Text>
              <Text style={styles.certYear}>Certified {c.year} · Society Verified</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sub-Skill Proficiencies */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Verified Skill Specializations</Text>
        <View style={styles.skillsWrap}>
          {WORKER_PROFILE.skills.map((s, i) => (
            <View key={i} style={styles.skillChip}>
              <Ionicons name="checkmark" size={12} color={Colors.primaryDark} />
              <Text style={styles.skillChipText}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Voice & App Language Toggle */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Language & Voice Assistance</Text>
        <View style={styles.langRow}>
          {[
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिन्दी' },
            { code: 'kn', label: 'ಕನ್ನಡ' },
          ].map((l) => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langBtn, lang === l.code && styles.langBtnActive]}
              onPress={() => setLang(l.code)}
            >
              <Text style={[styles.langText, lang === l.code && styles.langTextActive]}>
                {l.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Role Switcher back to Consumer App */}
      <TouchableOpacity 
        style={styles.switchRoleBtn}
        onPress={onSwitchRole}
        activeOpacity={0.85}
      >
        <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
        <Text style={styles.switchRoleText}>Switch to Customer (Patron) App</Text>
      </TouchableOpacity>
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
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  trade: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  society: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  regNo: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 1,
  },
  shareholderCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C4E8D7',
  },
  shareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  shareTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  shareSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  shareDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  dividendBox: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: Radii.md,
  },
  dividendLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividendVal: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '900',
    color: Colors.primaryDark,
    marginTop: 2,
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
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
    marginBottom: 8,
  },
  certIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  certTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  certIssuer: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  certYear: {
    fontSize: 9,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
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
  skillChipText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  langRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  langBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  langText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  langTextActive: {
    color: Colors.primaryDark,
    fontWeight: '800',
  },
  switchRoleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryDark,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    marginTop: 10,
    ...Shadows.card,
  },
  switchRoleText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
});
