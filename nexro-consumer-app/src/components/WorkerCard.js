import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function WorkerCard({ worker, onSelect, selected = false, compact = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.cardSelected,
        compact && styles.cardCompact,
      ]}
      onPress={() => onSelect(worker)}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <Image
          source={{ uri: worker.avatar }}
          style={styles.avatar}
          defaultSource={{ uri: 'https://via.placeholder.com/150' }}
        />
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{worker.name}</Text>
            {worker.verified && (
              <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
            )}
          </View>
          <Text style={styles.role}>{worker.role}</Text>
          <Text style={styles.societyText} numberOfLines={1}>{worker.societyShort}</Text>
        </View>

        <View style={styles.rateCol}>
          <Text style={styles.rateText}>₹{worker.hourlyRate}</Text>
          <Text style={styles.rateUnit}>base fee</Text>
        </View>
      </View>

      <View style={styles.badgesRow}>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={Colors.starGold} />
          <Text style={styles.ratingNum}>{worker.rating}</Text>
          <Text style={styles.reviewsCount}>({worker.reviewsCount})</Text>
        </View>

        <View style={styles.statBadge}>
          <Ionicons name="location-outline" size={12} color={Colors.primary} />
          <Text style={styles.statText}>{worker.distanceKm} km ({worker.etaMinutes} min)</Text>
        </View>

        <View style={styles.statBadge}>
          <Ionicons name="checkmark-done-circle-outline" size={12} color={Colors.success} />
          <Text style={styles.statText}>{worker.completedJobs}+ jobs</Text>
        </View>
      </View>

      {!compact && worker.insuranceCovered && (
        <View style={styles.guaranteeRow}>
          <Ionicons name="shield-outline" size={13} color={Colors.primaryDark} />
          <Text style={styles.guaranteeText} numberOfLines={1}>
            {worker.insuranceCovered}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySurface,
  },
  cardCompact: {
    padding: 10,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.border,
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  role: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  societyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 2,
  },
  rateCol: {
    alignItems: 'flex-end',
  },
  rateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
    color: Colors.primaryDark,
  },
  rateUnit: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 3,
  },
  ratingNum: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: '#92400E',
  },
  reviewsCount: {
    fontSize: 10,
    color: '#92400E',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 3,
  },
  statText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.sm,
    gap: 6,
  },
  guaranteeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    fontWeight: Typography.fontWeight.semiBold,
    flex: 1,
  },
});
