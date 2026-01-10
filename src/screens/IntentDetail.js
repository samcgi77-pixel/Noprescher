import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import ChameleonWrapper from '../components/ChameleonWrapper';
import EggTimer from '../components/EggTimer';

const IntentDetail = ({ route, navigation }) => {
  const { intent } = route.params;
  const { getIntent, deleteIntent, updateIntent } = useContext(UserContext);

  const currentIntent = getIntent(intent.id) || intent;

  const isHatched = () => {
    const now = new Date();
    const hatch = new Date(currentIntent.hatchDate);
    return now >= hatch;
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Intent',
      `Are you sure you want to delete "${currentIntent.word.toUpperCase()}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteIntent(currentIntent.id);
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  const handleHatch = async () => {
    if (isHatched()) {
      await updateIntent(currentIntent.id, { status: 'HATCHED' });
      Alert.alert('🐣 Hatched!', 'Your intent has evolved. You can now modify settings.');
    }
  };

  const getRoadmapDescription = () => {
    const descriptions = {
      ASCENT: 'Binary Pass/Fail · High Friction · Sobriety Logic',
      LAB: 'Data-Driven · Correlations · Analytical',
      FLOW: 'Presence-Based · Mindfulness · Low Friction'
    };
    return descriptions[currentIntent.roadmap];
  };

  const getStakeDescription = () => {
    const descriptions = {
      FINANCIAL: 'Real money penalties on failure',
      SOCIAL: 'Teammates affected by your performance',
      INTERNAL: 'Privacy & journaling accountability'
    };
    return descriptions[currentIntent.stake];
  };

  return (
    <ChameleonWrapper activeRoadmap={currentIntent.roadmap}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Word Title */}
        <Text style={styles.wordTitle}>{currentIntent.word.toUpperCase()}</Text>
        <Text style={styles.roadmapLabel}>{currentIntent.roadmap} PROTOCOL</Text>

        {/* Egg Status */}
        <EggTimer hatchDate={currentIntent.hatchDate} status={currentIntent.status} />

        {isHatched() && currentIntent.status === 'INCUBATING' && (
          <TouchableOpacity style={styles.hatchButton} onPress={handleHatch}>
            <Text style={styles.hatchButtonText}>🐣 TAP TO HATCH</Text>
          </TouchableOpacity>
        )}

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>CURRENT STATUS</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Current Streak</Text>
            <Text style={styles.statValue}>{currentIntent.streak} days</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Check-ins</Text>
            <Text style={styles.statValue}>{currentIntent.totalCheckIns}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Successful</Text>
            <Text style={styles.statValue}>{currentIntent.successfulCheckIns}</Text>
          </View>

          {currentIntent.lastCheckIn && (
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Last Check-in</Text>
              <Text style={styles.statValue}>
                {new Date(currentIntent.lastCheckIn).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {/* Configuration */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>CONFIGURATION</Text>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Roadmap</Text>
            <Text style={styles.configValue}>{currentIntent.roadmap}</Text>
          </View>
          <Text style={styles.configDesc}>{getRoadmapDescription()}</Text>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Stake Path</Text>
            <Text style={styles.configValue}>{currentIntent.stake}</Text>
          </View>
          <Text style={styles.configDesc}>{getStakeDescription()}</Text>

          <View style={styles.configRow}>
            <Text style={styles.configLabel}>AI Persona</Text>
            <Text style={styles.configValue}>{currentIntent.aiPersona.replace('_', ' ')}</Text>
          </View>

          {currentIntent.status === 'INCUBATING' && (
            <View style={styles.lockNotice}>
              <Text style={styles.lockIcon}>🔒</Text>
              <Text style={styles.lockText}>
                Configuration locked during incubation period
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History', { intent: currentIntent })}
        >
          <Text style={styles.historyButtonText}>View Full History →</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ChameleonWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },
  backButton: { color: '#FFF', fontSize: 16 },
  deleteButton: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' },

  wordTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20
  },
  roadmapLabel: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 14,
    letterSpacing: 2,
    marginTop: 5,
    marginBottom: 20
  },

  hatchButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FF00'
  },
  hatchButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  statsSection: { marginTop: 40 },
  sectionTitle: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 1.5,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  statLabel: { fontSize: 14, color: '#AAA' },
  statValue: { fontSize: 14, color: '#FFF', fontWeight: 'bold' },

  configSection: { marginTop: 30 },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  configLabel: { fontSize: 14, color: '#AAA' },
  configValue: { fontSize: 14, color: '#FFF', fontWeight: 'bold' },
  configDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    lineHeight: 18
  },

  lockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  lockIcon: { fontSize: 24 },
  lockText: { flex: 1, fontSize: 12, color: '#AAA' },

  historyButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  historyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default IntentDetail;
