import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Modal, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from './src/theme';
import { translations } from './src/data/translations';
import { WORKERS, SERVICES } from './src/data/mockData';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import LocationScreen from './src/screens/LocationScreen';
import HomeScreen from './src/screens/HomeScreen';
import AskNexroAIScreen from './src/screens/AskNexroAIScreen';
import AllServicesScreen from './src/screens/AllServicesScreen';
import WorkerMatchingScreen from './src/screens/WorkerMatchingScreen';
import WorkerProfileScreen from './src/screens/WorkerProfileScreen';
import BookingReviewScreen from './src/screens/BookingReviewScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen';
import LiveTrackingScreen from './src/screens/LiveTrackingScreen';
import BookingsListScreen from './src/screens/BookingsListScreen';
import ProfileAccountScreen from './src/screens/ProfileAccountScreen';

// Components
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState(['home']);
  const screenToRender = null; // Interactive mode

  // Global App State
  const [language, setLanguage] = useState('en');
  const [userLocation, setUserLocation] = useState('Indiranagar, Bengaluru');
  const [society, setSociety] = useState('Society #42');
  const [selectedService, setSelectedService] = useState(SERVICES[1]); // Default Electrical
  const [selectedWorker, setSelectedWorker] = useState(WORKERS[0]); // Default Rajesh Kumar
  const [bookingDetails, setBookingDetails] = useState(null);
  const [sosModalVisible, setSosModalVisible] = useState(false);

  const t = translations[language] || translations.en;

  const navigateTo = (screenName) => {
    setScreenHistory((prev) => [...prev, screenName]);
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Handlers
  const handleSelectService = (service) => {
    setSelectedService(service);
    navigateTo('matching');
  };

  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
    navigateTo('worker_profile');
  };

  const handleProceedToBooking = (worker, serviceOrTriage) => {
    setSelectedWorker(worker);
    navigateTo('booking_review');
  };

  const handleProceedToPayment = (worker, details) => {
    setSelectedWorker(worker);
    setBookingDetails(details);
    navigateTo('payment');
  };

  const handlePaymentSuccess = () => {
    navigateTo('booking_confirmation');
  };

  const handleTrackLive = () => {
    navigateTo('live_tracking');
  };

  const handleCycleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('kn');
    else setLanguage('en');
  };

  const activeScreen = screenToRender || currentScreen;
  const isMainTab = ['home', 'services', 'ai_intake', 'bookings', 'profile'].includes(activeScreen);
  const showHeader = !['splash', 'login', 'location', 'booking_confirmation', 'live_tracking'].includes(activeScreen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={currentScreen === 'splash' ? 'light-content' : 'dark-content'} />

      {/* Top Header */}
      {showHeader && (
        <Header
          location={userLocation}
          society={society}
          onLocationPress={() => navigateTo('location')}
          onSosPress={() => setSosModalVisible(true)}
          onLangPress={handleCycleLanguage}
          currentLang={language}
          showSos={true}
        />
      )}

      {/* Screen Body */}
      <View style={styles.screenContainer}>
        {activeScreen === 'splash' && (
          <SplashScreen onProceed={() => navigateTo('login')} t={t} />
        )}

        {activeScreen === 'login' && (
          <LoginScreen onLoginSuccess={() => navigateTo('location')} />
        )}

        {activeScreen === 'location' && (
          <LocationScreen
            onLocationConfirmed={(loc) => {
              setUserLocation(loc);
              navigateTo('home');
            }}
          />
        )}

        {activeScreen === 'home' && (
          <HomeScreen
            onSelectService={handleSelectService}
            onSelectWorker={handleSelectWorker}
            onAskAI={() => navigateTo('ai_intake')}
            onViewAllServices={() => navigateTo('services')}
            onViewActiveTracking={() => navigateTo('live_tracking')}
            t={t}
            lang={language}
          />
        )}

        {activeScreen === 'ai_intake' && (
          <AskNexroAIScreen
            onProceedToBooking={handleProceedToBooking}
            t={t}
          />
        )}

        {activeScreen === 'services' && (
          <AllServicesScreen
            onSelectService={handleSelectService}
            onBack={goBack}
          />
        )}

        {activeScreen === 'matching' && (
          <WorkerMatchingScreen
            service={selectedService}
            onSelectWorker={(w) => {
              setSelectedWorker(w);
              navigateTo('booking_review');
            }}
            onBack={goBack}
          />
        )}

        {activeScreen === 'worker_profile' && (
          <WorkerProfileScreen
            worker={selectedWorker}
            onProceedToBooking={handleProceedToBooking}
            onBack={goBack}
          />
        )}

        {activeScreen === 'booking_review' && (
          <BookingReviewScreen
            worker={selectedWorker}
            service={selectedService}
            onProceedToPayment={handleProceedToPayment}
            onBack={goBack}
          />
        )}

        {activeScreen === 'payment' && (
          <PaymentScreen
            worker={selectedWorker}
            bookingDetails={bookingDetails}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={goBack}
          />
        )}

        {activeScreen === 'booking_confirmation' && (
          <BookingConfirmationScreen
            worker={selectedWorker}
            onTrackLive={handleTrackLive}
            onGoHome={() => navigateTo('home')}
          />
        )}

        {activeScreen === 'live_tracking' && (
          <LiveTrackingScreen
            worker={selectedWorker}
            onBack={goBack}
            onSosPress={() => setSosModalVisible(true)}
          />
        )}

        {activeScreen === 'bookings' && (
          <BookingsListScreen
            onTrackBooking={() => navigateTo('live_tracking')}
            onRebook={(b) => navigateTo('ai_intake')}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileAccountScreen
            currentLang={language}
            onSelectLanguage={(l) => setLanguage(l)}
            onOpenSos={() => setSosModalVisible(true)}
            t={t}
          />
        )}
      </View>

      {/* Fixed Bottom Navigation Bar on main tabs */}
      {isMainTab && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screenKey) => navigateTo(screenKey)}
          t={t}
        />
      )}

      {/* Emergency SOS Modal */}
      <Modal
        visible={sosModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSosModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sosModalCard}>
            <View style={styles.sosIconCircle}>
              <Ionicons name="alert" size={36} color={Colors.danger} />
            </View>
            <Text style={styles.sosModalTitle}>Cooperative Emergency SOS</Text>
            <Text style={styles.sosModalSubtitle}>
              Ward #42 Rapid Response Unit & Local Police dispatch. Use in cases of medical distress, physical hazard, or safety violations.
            </Text>

            <TouchableOpacity
              style={styles.sosTriggerBtn}
              onPress={() => {
                setSosModalVisible(false);
                Alert.alert(
                  'Emergency Broadcast Sent',
                  'Cooperative Rapid Safety Marshal & Local Ward Team dispatched to your current GPS coordinates. Pro job paused immediately.'
                );
              }}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={20} color="#FFFFFF" />
              <Text style={styles.sosTriggerBtnText}>Broadcast Immediate Emergency</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sosCancelBtn}
              onPress={() => setSosModalVisible(false)}
            >
              <Text style={styles.sosCancelText}>Cancel</Text>
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
  screenContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sosModalCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    ...Shadows.float,
  },
  sosIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  sosModalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: Colors.danger,
    marginBottom: 8,
  },
  sosModalSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  sosTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.danger,
    paddingVertical: 14,
    width: '100%',
    borderRadius: Radii.pill,
    gap: 8,
  },
  sosTriggerBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },
  sosCancelBtn: {
    marginTop: 12,
    paddingVertical: 8,
  },
  sosCancelText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
