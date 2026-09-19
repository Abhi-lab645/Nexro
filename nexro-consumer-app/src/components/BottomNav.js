import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii } from '../theme';

export default function BottomNav({ currentScreen, onNavigate, t }) {
  const tabs = [
    { key: 'home', label: t.navHome || 'Home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'services', label: t.navServices || 'Services', icon: 'grid-outline', activeIcon: 'grid' },
    { key: 'ai_intake', label: t.navAskAI || 'Ask AI', icon: 'sparkles', isSpecial: true },
    { key: 'bookings', label: t.navBookings || 'Bookings', icon: 'calendar-outline', activeIcon: 'calendar' },
    { key: 'profile', label: t.navProfile || 'Account', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.key;
        
        if (tab.isSpecial) {
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.specialTabContainer}
              onPress={() => onNavigate(tab.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.specialTab, isActive && styles.specialTabActive]}>
                <Ionicons name={tab.icon} size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.specialLabel, isActive && styles.labelActiveAI]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onNavigate(tab.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? Colors.primary : Colors.textMuted}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.card,
    paddingVertical: 8,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: 3,
    fontWeight: Typography.fontWeight.medium,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  specialTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -16,
  },
  specialTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.aiAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.aiAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  specialTabActive: {
    backgroundColor: '#4338CA',
    transform: [{ scale: 1.05 }],
  },
  specialLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.aiAccent,
    marginTop: 4,
    fontWeight: Typography.fontWeight.bold,
  },
  labelActiveAI: {
    color: '#4338CA',
  },
});
