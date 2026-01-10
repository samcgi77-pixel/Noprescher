import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import ChameleonWrapper from '../components/ChameleonWrapper';
import EggTimer from '../components/EggTimer';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const { intents, canCheckInToday } = useContext(UserContext);

  const handleCheckIn = (intent) => {
    if (!canCheckInToday(intent)) {
      Alert.alert(
        'Already Checked In',
        'You have already checked in today. Come back tomorrow!',
        [{ text: 'OK' }]
      );
      return;
    }
    navigation.navigate('CheckIn', { intent });
  };

  // EMPTY STATE: Show Quick Start Options
  if (intents.length === 0) {
    return (
      <ChameleonWrapper activeRoadmap="LAB">
        <View style={styles.centerContainer}>
          <Text style={styles.header}>Initialize Protocol</Text>
          <Text style={styles.subheader}>Choose your accountability path</Text>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#00D1FF' }]}
            onPress={() => navigation.navigate('Onboarding', { pack: 'EXECUTIVE' })}
          >
            <Text style={styles.cardTitle}>⚡ EXECUTIVE</Text>
            <Text style={styles.cardSub}>Lab Logic · Financial Stake · 21 Days</Text>
            <Text style={styles.cardDesc}>Data-driven accountability for focus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#8E8E93' }]}
            onPress={() => navigation.navigate('Onboarding', { pack: 'ZEN' })}
          >
            <Text style={styles.cardTitle}>🧘 ZEN</Text>
            <Text style={styles.cardSub}>Flow Logic · Internal Stake · 7 Days</Text>
            <Text style={styles.cardDesc}>Mindful presence and awareness</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#FF3B30' }]}
            onPress={() => navigation.navigate('Onboarding', { pack: 'IRONCLAD' })}
          >
            <Text style={styles.cardTitle}>🔥 IRONCLAD</Text>
            <Text style={styles.cardSub}>Ascent Logic · Social Stake · 30 Days</Text>
            <Text style={styles.cardDesc}>Maximum friction, zero excuses</Text>
          </TouchableOpacity>
        </View>
      </ChameleonWrapper>
    );
  }

  // ACTIVE STATE: Horizontal Carousel of Words
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Ironclad</Text>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => navigation.navigate('Stats')}
        >
          <Text style={styles.statsButtonText}>📊 Stats</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {intents.map((intent) => {
          const canCheckIn = canCheckInToday(intent);

          return (
            <View key={intent.id} style={{ width: width, flex: 1 }}>
              <ChameleonWrapper activeRoadmap={intent.roadmap}>
                <View style={styles.slideContainer}>
                  {/* Word Title */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('IntentDetail', { intent })}
                  >
                    <Text style={styles.wordTitle}>{intent.word.toUpperCase()}</Text>
                    <Text style={styles.protocolText}>{intent.roadmap} PROTOCOL</Text>
                  </TouchableOpacity>

                  {/* Current Streak */}
                  <View style={styles.streakBadge}>
                    <Text style={styles.streakNumber}>{intent.streak}</Text>
                    <Text style={styles.streakLabel}>DAY STREAK</Text>
                  </View>

                  {/* Egg Timer */}
                  <EggTimer hatchDate={intent.hatchDate} status={intent.status} />

                  {/* Check-in Status */}
                  {!canCheckIn && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✅ Checked in today</Text>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.checkInBtn,
                        !canCheckIn && styles.checkInBtnDisabled
                      ]}
                      onPress={() => handleCheckIn(intent)}
                      disabled={!canCheckIn}
                    >
                      <Text style={styles.checkInText}>
                        {canCheckIn ? 'INITIATE CHECK-IN' : 'COMPLETED TODAY'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.historyBtn}
                      onPress={() => navigation.navigate('History', { intent })}
                    >
                      <Text style={styles.historyText}>View History →</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Quick Stats */}
                  <View style={styles.quickStats}>
                    <View style={styles.quickStat}>
                      <Text style={styles.quickStatValue}>{intent.totalCheckIns}</Text>
                      <Text style={styles.quickStatLabel}>Total</Text>
                    </View>
                    <View style={styles.quickStat}>
                      <Text style={styles.quickStatValue}>{intent.successfulCheckIns}</Text>
                      <Text style={styles.quickStatLabel}>Success</Text>
                    </View>
                    <View style={styles.quickStat}>
                      <Text style={styles.quickStatValue}>
                        {intent.totalCheckIns > 0
                          ? ((intent.successfulCheckIns / intent.totalCheckIns) * 100).toFixed(0)
                          : 0}%
                      </Text>
                      <Text style={styles.quickStatLabel}>Rate</Text>
                    </View>
                  </View>

                  {/* Page Indicator */}
                  {intents.length > 1 && (
                    <View style={styles.pageIndicator}>
                      {intents.map((_, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.dot,
                            intents.indexOf(intent) === idx && styles.dotActive
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </ChameleonWrapper>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  topNavTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 2
  },
  statsButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20
  },
  statsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold'
  },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 },
  header: { fontSize: 28, marginBottom: 10, color: '#FFF', fontWeight: 'bold' },
  subheader: { fontSize: 14, marginBottom: 40, color: '#AAA' },
  card: { padding: 25, borderRadius: 15, marginBottom: 15, width: '90%' },
  cardTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 8, color: '#000' },
  cardSub: { textAlign: 'center', fontSize: 12, marginBottom: 8, color: '#000', opacity: 0.8 },
  cardDesc: { textAlign: 'center', fontSize: 13, color: '#000', opacity: 0.7 },

  slideContainer: { flex: 1, alignItems: 'center', paddingTop: 60 },
  wordTitle: { fontSize: 48, fontWeight: '900', color: '#FFF', textAlign: 'center' },
  protocolText: { textAlign: 'center', color: '#DDD', marginBottom: 30, letterSpacing: 2, fontSize: 12 },

  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'
  },
  streakLabel: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    letterSpacing: 1
  },

  completedBadge: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#00FF00'
  },
  completedText: {
    color: '#00FF00',
    fontSize: 14,
    fontWeight: 'bold'
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 15,
    marginTop: 30
  },
  checkInBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  checkInBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)'
  },
  checkInText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1
  },

  historyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  historyText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 14
  },

  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 40
  },
  quickStat: {
    alignItems: 'center'
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5
  },
  quickStatLabel: {
    fontSize: 11,
    color: '#AAA'
  },

  pageIndicator: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  dotActive: {
    backgroundColor: '#FFF',
    width: 24
  }
});

export default Dashboard;
