import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Animated } from 'react-native';
import { UserContext } from '../context/UserContext';
import ChameleonWrapper from '../components/ChameleonWrapper';
import { checkIn } from '../engines/AccountabilityEngine';
import { processPenalty, processReward } from '../engines/StakeEngine';

const CheckIn = ({ route, navigation }) => {
  const { intent } = route.params;
  const { processCheckIn, userProfile, setUserProfile } = useContext(UserContext);

  const [response, setResponse] = useState('');
  const [dataValue, setDataValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const handleCheckIn = async () => {
    setIsProcessing(true);

    // Prepare proof data for Lab roadmap
    const proofData = intent.roadmap === 'LAB' ? { value: parseFloat(dataValue) } : null;

    // Process through AccountabilityEngine
    const result = checkIn(intent, response, proofData);

    if (result.success) {
      // Process reward
      const rewardResult = await processReward(intent, userProfile);

      // Update user profile with credits
      setUserProfile({
        ...userProfile,
        credits: rewardResult.newCredits
      });

      // Update intent with new streak and history
      await processCheckIn(intent.id, {
        success: true,
        newStreak: result.newStreak,
        timestamp: new Date().toISOString(),
        data: proofData,
        message: result.message
      });

      // Show success feedback
      Alert.alert(
        '✅ Success!',
        `${result.message}\n\n${rewardResult.message}`,
        [{ text: 'Continue', onPress: () => navigation.goBack() }]
      );
    } else {
      // Process penalty
      if (result.penaltyTrigger) {
        const penaltyResult = await processPenalty(intent, userProfile);

        Alert.alert(
          '❌ Breach Detected',
          `${result.message}\n\n${penaltyResult.message || 'Penalty applied.'}`,
          [{ text: 'Understood', onPress: () => navigation.goBack() }]
        );
      }

      // Update intent with failure
      await processCheckIn(intent.id, {
        success: false,
        newStreak: result.newStreak,
        timestamp: new Date().toISOString(),
        message: result.message
      });
    }

    setIsProcessing(false);
  };

  const renderCheckInInterface = () => {
    switch (intent.roadmap) {
      case 'ASCENT':
        return (
          <View style={styles.ascentContainer}>
            <Text style={styles.question}>Did you maintain {intent.word.toUpperCase()} today?</Text>
            <Text style={styles.subtitle}>No excuses. Binary choice.</Text>

            <View style={styles.binaryButtons}>
              <TouchableOpacity
                style={[styles.binaryButton, styles.yesButton, response === 'YES' && styles.selectedYes]}
                onPress={() => setResponse('YES')}
              >
                <Text style={styles.binaryText}>YES</Text>
                <Text style={styles.binarySubtext}>I held the line</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.binaryButton, styles.noButton, response === 'NO' && styles.selectedNo]}
                onPress={() => setResponse('NO')}
              >
                <Text style={styles.binaryText}>NO</Text>
                <Text style={styles.binarySubtext}>I failed</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.warningText}>
              ⚠️ Choosing NO will reset your streak to Day 0 and trigger {intent.stake.toLowerCase()} penalty
            </Text>
          </View>
        );

      case 'LAB':
        return (
          <View style={styles.labContainer}>
            <Text style={styles.question}>Log your {intent.word.toUpperCase()} data</Text>
            <Text style={styles.subtitle}>Correlation requires measurement</Text>

            <TextInput
              style={styles.dataInput}
              placeholder="Enter value (e.g., 50, 2.5, 100)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={dataValue}
              onChangeText={setDataValue}
            />

            <Text style={styles.helperText}>
              📊 This data point will be added to your correlation analysis
            </Text>
          </View>
        );

      case 'FLOW':
        return (
          <View style={styles.flowContainer}>
            <Text style={styles.question}>Acknowledge your {intent.word.toUpperCase()} moment</Text>
            <Text style={styles.subtitle}>Presence is the practice</Text>

            <View style={styles.flowPrompt}>
              <Text style={styles.flowText}>🧘</Text>
              <Text style={styles.flowDescription}>
                Take a breath. You're here. This moment counts.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.flowButton}
              onPress={() => setResponse('PRESENT')}
            >
              <Text style={styles.flowButtonText}>I am present</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const canSubmit = () => {
    if (intent.roadmap === 'ASCENT') return response !== '';
    if (intent.roadmap === 'LAB') return dataValue !== '' && !isNaN(parseFloat(dataValue));
    if (intent.roadmap === 'FLOW') return response === 'PRESENT';
    return false;
  };

  return (
    <ChameleonWrapper activeRoadmap={intent.roadmap}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.streak}>Day {intent.streak}</Text>
        </View>

        <View style={styles.content}>
          {renderCheckInInterface()}

          <TouchableOpacity
            style={[styles.submitButton, !canSubmit() && styles.submitButtonDisabled]}
            onPress={handleCheckIn}
            disabled={!canSubmit() || isProcessing}
          >
            <Text style={styles.submitButtonText}>
              {isProcessing ? 'Processing...' : 'SUBMIT CHECK-IN'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ChameleonWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  backButton: { color: '#FFF', fontSize: 16 },
  streak: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'space-between', paddingBottom: 40 },

  // Common
  question: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#AAA', marginBottom: 40 },

  // Ascent
  ascentContainer: { flex: 1 },
  binaryButtons: { gap: 20 },
  binaryButton: {
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center'
  },
  yesButton: { backgroundColor: 'rgba(0,255,0,0.1)', borderColor: '#00FF00' },
  noButton: { backgroundColor: 'rgba(255,0,0,0.1)', borderColor: '#FF0000' },
  selectedYes: { backgroundColor: 'rgba(0,255,0,0.3)' },
  selectedNo: { backgroundColor: 'rgba(255,0,0,0.3)' },
  binaryText: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  binarySubtext: { fontSize: 14, color: '#AAA', marginTop: 5 },
  warningText: { fontSize: 12, color: '#FF3B30', marginTop: 20, textAlign: 'center' },

  // Lab
  labContainer: { flex: 1 },
  dataInput: {
    backgroundColor: '#1a1a1a',
    color: '#FFF',
    padding: 20,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#00D1FF'
  },
  helperText: { fontSize: 12, color: '#AAA', marginTop: 20, textAlign: 'center' },

  // Flow
  flowContainer: { flex: 1, alignItems: 'center' },
  flowPrompt: { alignItems: 'center', marginVertical: 60 },
  flowText: { fontSize: 80, marginBottom: 20 },
  flowDescription: { fontSize: 16, color: '#AAA', textAlign: 'center', lineHeight: 24 },
  flowButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 40
  },
  flowButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  // Submit
  submitButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  submitButtonDisabled: { backgroundColor: '#444', opacity: 0.5 },
  submitButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' }
});

export default CheckIn;
