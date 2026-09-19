import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii } from '../theme';

export default function Header({ 
  location = 'Indiranagar, Bengaluru',
  society = 'Society #42',
  onLocationPress,
  onSosPress,
  onLangPress,
  currentLang = 'en',
  showSos = true,
  onSwitchRole,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.locationContainer} 
        onPress={onLocationPress}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.headerLogo} 
          resizeMode="contain" 
        />
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.locationTitle} numberOfLines={1}>{location}</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
          </View>
          <View style={styles.badgeRow}>
            <Ionicons name="shield-checkmark" size={11} color={Colors.primary} />
            <Text style={styles.societyText}>Verified Co-op {society}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.langBtn} 
          onPress={onLangPress}
          activeOpacity={0.7}
        >
          <Text style={styles.langText}>{currentLang.toUpperCase()}</Text>
        </TouchableOpacity>

        {showSos && (
          <TouchableOpacity 
            style={styles.sosBtn} 
            onPress={onSosPress}
            activeOpacity={0.7}
          >
            <Ionicons name="alert-circle" size={15} color={Colors.danger} />
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginRight: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  societyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semiBold,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  roleText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
  },
  sosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  sosText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
  },
});
