import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function LoginScreen({ onLoginSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      setOtp('4829'); // Pre-fill test OTP for frictionless experience
    }
  };

  const handleVerify = () => {
    if (otp === '4829' || otp.length === 4) {
      onLoginSuccess();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.badgeCircle}>
            <Ionicons name="people" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Join the Cooperative</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to access verified cooperative gig services.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Mobile Phone Number</Text>
          <View style={styles.phoneInputRow}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.countryCode}>+91</Text>
            </View>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="Enter 10-digit number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!otpSent}
            />
          </View>

          {otpSent && (
            <View style={styles.otpSection}>
              <View style={styles.otpHeaderRow}>
                <Text style={styles.inputLabel}>Enter 4-Digit OTP</Text>
                <Text style={styles.autoFilledHint}>Auto-filled for demo (4829)</Text>
              </View>
              <TextInput
                style={[styles.textInput, styles.otpInput]}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="4 8 2 9"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity onPress={() => setOtpSent(false)} style={styles.resendBtn}>
                <Text style={styles.resendText}>Edit phone number or resend</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={otpSent ? handleVerify : handleSendOtp}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnText}>
              {otpSent ? 'Verify & Continue' : 'Get Cooperative OTP'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.coopGuaranteeBox}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.guaranteeTitle}>Democratic Governance</Text>
            <Text style={styles.guaranteeText}>
              Your patronage supports local worker societies with fair baseline rates and retirement security.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 50,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    borderRadius: Radii.md,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    gap: 6,
  },
  flag: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: Typography.fontSize.md,
    color: Colors.text,
  },
  otpSection: {
    marginTop: 20,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  autoFilledHint: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    borderRadius: Radii.md,
    backgroundColor: Colors.background,
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
  },
  resendBtn: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  resendText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radii.pill,
    paddingVertical: 16,
    marginTop: 24,
    gap: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  coopGuaranteeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: Radii.card,
    marginTop: 24,
    gap: 12,
  },
  guaranteeTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  guaranteeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
});
