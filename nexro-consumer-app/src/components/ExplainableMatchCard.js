import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function ExplainableMatchCard({ worker, triageReason }) {
  if (!worker) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Ionicons name="sparkles" size={16} color={Colors.aiAccent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Explainable Match</Text>
          <Text style={styles.subtitle}>
            Co-op AI Match Score: {worker.matchScore}%
          </Text>
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{worker.matchScore}%</Text>
        </View>
      </View>

      {triageReason && (
        <View style={styles.triageBanner}>
          <Text style={styles.triageText}>
            Problem Identified: <Text style={{ fontWeight: '700' }}>{triageReason}</Text>
          </Text>
        </View>
      )}

      <View style={styles.reasonsList}>
        {worker.whyMatched && worker.whyMatched.map((reason, index) => (
          <View key={index} style={styles.reasonRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.primary} style={styles.checkIcon} />
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
        <Text style={styles.footerText}>
          {worker.federationBadge || 'Karnataka Gig Cooperative Federation Verified'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.aiLight,
    borderWidth: 1.5,
    borderColor: Colors.aiBorder,
    borderRadius: Radii.card,
    padding: 16,
    marginVertical: 12,
    ...Shadows.aiGlow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.aiText,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scorePill: {
    backgroundColor: Colors.aiAccent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.xs,
  },
  triageBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.sm,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.aiBorder,
  },
  triageText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  reasonsList: {
    gap: 8,
    marginBottom: 12,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  reasonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    flex: 1,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.aiBorder,
  },
  footerText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: Typography.fontWeight.semiBold,
    flex: 1,
  },
});
