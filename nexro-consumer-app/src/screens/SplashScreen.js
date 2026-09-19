import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii } from '../theme';

export default function SplashScreen({ onProceed, t }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.emblemContainer}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>

        <Text style={styles.brandTitle}>Nexro</Text>
        <Text style={styles.tagline}>{t.tagline || 'Cooperative Gig Services Platform'}</Text>

        <View style={styles.coopPill}>
          <Ionicons name="ribbon-outline" size={14} color="#A7F3D0" />
          <Text style={styles.coopPillText}>100% Worker Owned • Zero Surge Gouging</Text>
        </View>

        <View style={styles.featureCards}>
          <View style={styles.featureRow}>
            <Ionicons name="cash-outline" size={20} color="#A7F3D0" />
            <Text style={styles.featureText}>85%+ Direct to Workers (vs 40-50% on apps)</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="sparkles-outline" size={20} color="#C5CEFA" />
            <Text style={styles.featureText}>Explainable AI Diagnosis & Transparent Pricing</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="medkit-outline" size={20} color="#A7F3D0" />
            <Text style={styles.featureText}>₹5L Cooperative Health & Accident Shield</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onProceed}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Get Started with Nexro</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.federationNotice}>
          Affiliated with Karnataka State Gig Workers Cooperative Federation
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  emblemContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  logoImage: {
    width: 104,
    height: 104,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#A7F3D0',
  },
  coopRing: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#064E3B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: Typography.fontSize.md,
    color: '#A7F3D0',
    marginTop: 6,
    textAlign: 'center',
  },
  coopPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    gap: 6,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  coopPillText: {
    color: '#E6FFFA',
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  featureCards: {
    marginTop: 36,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.card,
    padding: 16,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    gap: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: Colors.primaryDark,
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  federationNotice: {
    color: '#84BAA7',
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
  },
});
