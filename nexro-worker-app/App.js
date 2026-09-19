import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Alert, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from './src/theme';

// Worker Screens
import WorkerDutyDashboardScreen from './src/screens/WorkerDutyDashboardScreen';
import IncomingJobModal from './src/screens/IncomingJobModal';
import ActiveJobExecutionScreen from './src/screens/ActiveJobExecutionScreen';
import WorkerEarningsLedgerScreen from './src/screens/WorkerEarningsLedgerScreen';
import WelfarePassbookScreen from './src/screens/WelfarePassbookScreen';
import DigitalSkillPassportScreen from './src/screens/DigitalSkillPassportScreen';

export default function WorkerApp() {
  const [activeTab, setActiveTab] = useState('duty'); // 'duty' | 'jobs' | 'welfare' | 'passport'
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [incomingJobVisible, setIncomingJobVisible] = useState(false);
  const [hasActiveJob, setHasActiveJob] = useState(false);
  const [inActiveJobExecution, setInActiveJobExecution] = useState(false);
  const [sosModalVisible, setSosModalVisible] = useState(false);

  // Tabs config
  const tabs = [
    { key: 'duty', label: 'Duty', icon: 'speedometer-outline', activeIcon: 'speedometer' },
    { key: 'jobs', label: 'Earnings', icon: 'cash-outline', activeIcon: 'cash' },
    { key: 'welfare', label: 'Welfare & Fund', icon: 'wallet-outline', activeIcon: 'wallet' },
    { key: 'passport', label: 'Skill Passport', icon: 'ribbon-outline', activeIcon: 'ribbon' },
  ];

  const handleToggleDuty = (val) => {
    setIsOnDuty(val);
    if (!val) {
      setIncomingJobVisible(false);
    }
  };

  const handleAcceptJob = () => {
    setIncomingJobVisible(false);
    setHasActiveJob(true);
    setInActiveJobExecution(true);
  };

  const handleDeclineJob = () => {
    setIncomingJobVisible(false);
    Alert.alert('Job Passed', 'Job passed to next available pro in Ward #42. Non-punitive cooperative algorithm maintains your priority rating.');
  };

  const handleCompleteJob = () => {
    setInActiveJobExecution(false);
    setHasActiveJob(false);
    Alert.alert(
      'Job Completed & Settled! 🎉',
      '₹299 direct base earnings credited to your bank account.\n+₹9 credited to your Cooperative Welfare Reserve.'
    );
  };

  const handleSwitchToCustomer = async () => {
    const url = 'nexro-consumer://';
    const canOpen = await Linking.canOpenURL(url).catch(() => false);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Launch Consumer App',
        'You can open the Consumer App from your Home Screen or run: npm run consumer'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Worker App Top Header */}
      {!inActiveJobExecution && (
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('./assets/logo.png')} 
              style={styles.headerLogo} 
              resizeMode="contain" 
            />
            <View>
              <Text style={styles.appTitle}>Nexro Worker</Text>
              <Text style={styles.societyText}>Karnataka Contract Labour Co-op #42</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.switchRoleBtn}
              onPress={handleSwitchToCustomer}
              activeOpacity={0.7}
            >
              <Ionicons name="person-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.switchRoleText}>Customer App</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sosBtn}
              onPress={() => setSosModalVisible(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="alert-circle" size={14} color={Colors.danger} />
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Screen Body */}
      <View style={styles.screenContainer}>
        {inActiveJobExecution ? (
          <ActiveJobExecutionScreen
            onCompleteJob={handleCompleteJob}
            onBack={() => setInActiveJobExecution(false)}
            onOpenSos={() => setSosModalVisible(true)}
          />
        ) : (
          <>
            {activeTab === 'duty' && (
              <WorkerDutyDashboardScreen
                isOnDuty={isOnDuty}
                onToggleDuty={handleToggleDuty}
                onTriggerJobDispatch={() => setIncomingJobVisible(true)}
                onViewActiveJob={() => setInActiveJobExecution(true)}
                hasActiveJob={hasActiveJob}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'jobs' && (
              <WorkerEarningsLedgerScreen />
            )}

            {activeTab === 'welfare' && (
              <WelfarePassbookScreen />
            )}

            {activeTab === 'passport' && (
              <DigitalSkillPassportScreen
                onSwitchRole={handleSwitchToCustomer}
              />
            )}
          </>
        )}
      </View>

      {/* Incoming Job Modal */}
      <IncomingJobModal
        visible={incomingJobVisible}
        onAccept={handleAcceptJob}
        onDecline={handleDeclineJob}
      />

      {/* Bottom Navigation */}
      {!inActiveJobExecution && (
        <View style={styles.bottomNav}>
          {tabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={styles.navTab}
                onPress={() => setActiveTab(t.key)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isActive ? t.activeIcon : t.icon}
                  size={22}
                  color={isActive ? Colors.primary : Colors.textMuted}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Worker Emergency SOS Modal */}
      <Modal
        visible={sosModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSosModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sosCard}>
            <View style={styles.sosAlertCircle}>
              <Ionicons name="warning" size={36} color={Colors.danger} />
            </View>
            <Text style={styles.sosTitle}>Worker Safety & SOS Alarm</Text>
            <Text style={styles.sosSub}>
              Immediate dispatch to Ward #42 Safety Marshals, Society Executive Helpline & Local Police Station.
            </Text>

            <TouchableOpacity 
              style={styles.broadcastBtn}
              onPress={() => {
                setSosModalVisible(false);
                Alert.alert('Worker Emergency Dispatched', 'Live GPS distress beacon transmitted. Society Marshal responding.');
              }}
            >
              <Ionicons name="radio" size={18} color="#FFFFFF" />
              <Text style={styles.broadcastText}>Transmit Emergency Distress Beacon</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelSosBtn}
              onPress={() => setSosModalVisible(false)}
            >
              <Text style={styles.cancelSosText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  coopIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '900',
    color: Colors.text,
  },
  societyText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchRoleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  switchRoleText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  sosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: '#FECDD3',
    gap: 3,
  },
  sosText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.danger,
  },
  screenContainer: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 3,
    fontWeight: '600',
  },
  navLabelActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sosCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    ...Shadows.float,
  },
  sosAlertCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sosTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '900',
    color: Colors.danger,
    marginBottom: 6,
  },
  sosSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  broadcastBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.danger,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    width: '100%',
    gap: 8,
  },
  broadcastText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xs,
    fontWeight: '800',
  },
  cancelSosBtn: {
    marginTop: 12,
    paddingVertical: 6,
  },
  cancelSosText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
