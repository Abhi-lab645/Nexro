import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';

export default function ServiceCard({ service, onPress, lang = 'en' }) {
  const getTitle = () => {
    if (lang === 'hi' && service.hindiTitle) return service.hindiTitle;
    if (lang === 'kn' && service.kannadaTitle) return service.kannadaTitle;
    return service.title;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(service)}
      activeOpacity={0.8}
    >
      {service.popular && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>POPULAR</Text>
        </View>
      )}
      
      <View style={styles.iconCircle}>
        <Ionicons name={service.icon || 'construct-outline'} size={24} color={Colors.primary} />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {getTitle()}
      </Text>

      <Text style={styles.etaText}>
        <Ionicons name="time-outline" size={11} color={Colors.textSecondary} /> {service.eta}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.price}>₹{service.startingPrice}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={Colors.starGold} />
          <Text style={styles.ratingText}>{service.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 14,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primaryDark,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  etaText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  price: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.extraBold,
    color: Colors.primaryDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
  },
});
