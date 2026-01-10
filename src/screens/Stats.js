import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';

const Stats = ({ navigation }) => {
  const { intents, getStats, userProfile } = useContext(UserContext);
  const stats = getStats();

  const renderIntentSummary = (intent) => {
    const successRate =
      intent.totalCheckIns > 0
        ? ((intent.successfulCheckIns / intent.totalCheckIns) * 100).toFixed(1)
        : 0;

    return (
      <TouchableOpacity
        key={intent.id}
        style={styles.intentCard}
        onPress={() => navigation.navigate('IntentDetail', { intent })}
      >
        <View style={styles.intentHeader}>
          <Text style={styles.intentWord}>{intent.word.toUpperCase()}</Text>
          <Text style={styles.intentRoadmap}>{intent.roadmap}</Text>
        </View>

        <View style={styles.intentStats}>
          <View style={styles.intentStat}>
            <Text style={styles.intentStatValue}>{intent.streak}</Text>
            <Text style={styles.intentStatLabel}>Streak</Text>
          </View>
          <View style={styles.intentStat}>
            <Text style={styles.intentStatValue}>{successRate}%</Text>
            <Text style={styles.intentStatLabel}>Success</Text>
          </View>
          <View style={styles.intentStat}>
            <Text style={styles.intentStatValue}>{intent.totalCheckIns}</Text>
            <Text style={styles.intentStatLabel}>Check-ins</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your Statistics</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Overall Stats */}
        <View style={styles.overallSection}>
          <Text style={styles.sectionTitle}>OVERALL PERFORMANCE</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalIntents}</Text>
              <Text style={styles.statLabel}>Active Intents</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalCheckIns}</Text>
              <Text style={styles.statLabel}>Total Check-ins</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.successRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.longestStreak}</Text>
              <Text style={styles.statLabel}>Longest Streak</Text>
            </View>
          </View>

          {/* Credits Display */}
          <View style={styles.creditsCard}>
            <Text style={styles.creditsLabel}>💎 Integrity Credits</Text>
            <Text style={styles.creditsValue}>{userProfile.credits}</Text>
            <Text style={styles.creditsSubtext}>
              Earned through discipline and consistency
            </Text>
          </View>
        </View>

        {/* Per-Intent Breakdown */}
        <View style={styles.intentsSection}>
          <Text style={styles.sectionTitle}>INTENT BREAKDOWN</Text>

          {intents.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>No intents yet</Text>
              <Text style={styles.emptySubtext}>Start your journey from the Dashboard</Text>
            </View>
          ) : (
            intents.map(renderIntentSummary)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  backButton: { color: '#FFF', fontSize: 16 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },

  overallSection: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 1.5,
    marginBottom: 15,
    fontWeight: 'bold'
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5
  },
  statLabel: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center'
  },

  creditsCard: {
    backgroundColor: 'linear-gradient(135deg, rgba(0,255,148,0.1), rgba(0,212,255,0.1))',
    backgroundColor: 'rgba(0,255,148,0.1)',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF94'
  },
  creditsLabel: {
    fontSize: 14,
    color: '#00FF94',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  creditsValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 5
  },
  creditsSubtext: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center'
  },

  intentsSection: { marginTop: 20 },
  intentCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00FF94'
  },
  intentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  intentWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  intentRoadmap: {
    fontSize: 12,
    color: '#00FF94',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  intentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  intentStat: {
    alignItems: 'center'
  },
  intentStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 3
  },
  intentStatLabel: {
    fontSize: 11,
    color: '#AAA'
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 60
  },
  emptyIcon: { fontSize: 60, marginBottom: 20 },
  emptyText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 5
  },
  emptySubtext: {
    fontSize: 14,
    color: '#AAA'
  }
});

export default Stats;
