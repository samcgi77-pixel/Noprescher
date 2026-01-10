import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { UserContext } from '../context/UserContext';
import ChameleonWrapper from '../components/ChameleonWrapper';
import EggTimer from '../components/EggTimer';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const { intents } = useContext(UserContext);

  // EMPTY STATE: Show Quick Start Options
  if (intents.length === 0) {
    return (
      <ChameleonWrapper activeRoadmap="LAB">
        <View style={styles.centerContainer}>
          <Text style={styles.header}>Initialize Protocol</Text>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#00D1FF' }]}
            onPress={() => navigation.navigate('Onboarding', { pack: 'EXECUTIVE' })}
          >
            <Text style={styles.cardTitle}>QUICK START: EXECUTIVE</Text>
            <Text style={styles.cardSub}>Focus | Lab Logic | $5 Stake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#FF3B30' }]}
            onPress={() => navigation.navigate('Onboarding', { pack: 'IRONCLAD' })}
          >
            <Text style={styles.cardTitle}>FULL DIAGNOSTIC</Text>
            <Text style={styles.cardSub}>Custom Words | High Friction</Text>
          </TouchableOpacity>
        </View>
      </ChameleonWrapper>
    );
  }

  // ACTIVE STATE: Horizontal Carousel of Words
  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1, backgroundColor: '#000' }}>
      {intents.map((intent) => (
        <View key={intent.id} style={{ width: width, flex: 1 }}>
          <ChameleonWrapper activeRoadmap={intent.roadmap}>
            <View style={styles.slideContainer}>
              <Text style={styles.wordTitle}>{intent.word.toUpperCase()}</Text>
              <Text style={styles.protocolText}>{intent.roadmap} PROTOCOL</Text>

              <EggTimer hatchDate={intent.hatchDate} status={intent.status} />

              <TouchableOpacity
                style={styles.checkInBtn}
                onPress={() => console.log("Navigate to CheckIn Screen")}
              >
                <Text style={styles.checkInText}>INITIATE CHECK-IN</Text>
              </TouchableOpacity>
            </View>
          </ChameleonWrapper>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, marginBottom: 20, color: '#FFF' },
  card: { padding: 20, borderRadius: 10, marginBottom: 15, width: '90%' },
  cardTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  cardSub: { textAlign: 'center', fontSize: 12, marginTop: 5 },
  slideContainer: { flex: 1, alignItems: 'center', paddingTop: 100 },
  wordTitle: { fontSize: 40, fontWeight: '900', color: '#FFF', textAlign: 'center' },
  protocolText: { textAlign: 'center', color: '#DDD', marginBottom: 50, letterSpacing: 2 },
  checkInBtn: { marginTop: 60, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 30 },
  checkInText: { color: '#FFF', fontWeight: 'bold' }
});

export default Dashboard;
