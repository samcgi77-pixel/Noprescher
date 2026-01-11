import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import ChameleonWrapper from '../components/ChameleonWrapper';

const History = ({ route, navigation }) => {
  const { intent } = route.params;
  const { getIntent } = useContext(UserContext);

  // Get fresh intent data
  const currentIntent = getIntent(intent.id) || intent;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderHistoryItem = (item, index) => {
    return (
      <View
        key={index}
        style={[
          styles.historyItem,
          item.success ? styles.successItem : styles.failureItem
        ]}
      >
        <View style={styles.historyLeft}>
          <Text style={styles.historyIcon}>
            {item.success ? '✅' : '❌'}
          </Text>
          <View>
            <Text style={styles.historyDate}>{formatDate(item.timestamp)}</Text>
            <Text style={styles.historyMessage}>{item.message}</Text>
            {item.data && (
              <Text style={styles.historyData}>Data: {item.data.value}</Text>
            )}
          </View>
        </View>
        <View style={styles.historyRight}>
          <Text style={styles.historyStreak}>Day {item.streak}</Text>
        </View>
      </View>
    );
  };

  const calculateSuccessRate = () => {
    if (currentIntent.totalCheckIns === 0) return 0;
    return ((currentIntent.successfulCheckIns / currentIntent.totalCheckIns) * 100).toFixed(1);
  };

  return (
    <ChameleonWrapper activeRoadmap={currentIntent.roadmap}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{currentIntent.word.toUpperCase()} History</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{currentIntent.totalCheckIns}</Text>
            <Text style={styles.statLabel}>Total Check-ins</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{calculateSuccessRate()}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{currentIntent.streak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
        </View>

        {/* History List */}
        <ScrollView style={styles.historyList}>
          {currentIntent.history.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>No check-ins yet</Text>
              <Text style={styles.emptySubtext}>
                Your journey begins with the first step
              </Text>
            </View>
          ) : (
            [...currentIntent.history].reverse().map(renderHistoryItem)
          )}
        </ScrollView>
      </View>
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
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 5 },
  statLabel: { fontSize: 11, color: '#AAA', textAlign: 'center' },

  historyList: { flex: 1 },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4
  },
  successItem: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderLeftColor: '#00FF00'
  },
  failureItem: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderLeftColor: '#FF0000'
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1 },
  historyIcon: { fontSize: 24 },
  historyDate: { fontSize: 12, color: '#AAA', marginBottom: 3 },
  historyMessage: { fontSize: 14, color: '#FFF' },
  historyData: { fontSize: 12, color: '#00D1FF', marginTop: 3 },
  historyRight: { alignItems: 'flex-end' },
  historyStreak: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },

  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 60, marginBottom: 20 },
  emptyText: { fontSize: 18, color: '#FFF', fontWeight: 'bold', marginBottom: 5 },
  emptySubtext: { fontSize: 14, color: '#AAA' }
});

export default History;
