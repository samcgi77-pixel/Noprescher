import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { UserContext } from '../context/UserContext';
import * as Notifications from '../engines/NotificationEngine';

const Onboarding = ({ route, navigation }) => {
  const { addIntent } = useContext(UserContext);
  const { pack } = route.params; // 'EXECUTIVE', 'ZEN', 'IRONCLAD'
  const [word, setWord] = React.useState('');

  const activatePack = () => {
    if (!word) return;

    let config = {};

    // AUTO-CONFIGURE based on Pack Selection (User Option)
    switch (pack) {
      case 'EXECUTIVE':
        config = { roadmap: 'LAB', stake: 'FINANCIAL', egg: 21, persona: 'STOIC' };
        break;
      case 'ZEN':
        config = { roadmap: 'FLOW', stake: 'INTERNAL', egg: 7, persona: 'FRIEND' };
        break;
      case 'IRONCLAD':
        config = { roadmap: 'ASCENT', stake: 'SOCIAL', egg: 30, persona: 'DRILL_SERGEANT' };
        break;
    }

    // 1. Add to State
    const newIntent = addIntent(word, config.roadmap, config.stake, config.egg, config.persona);

    // 2. Schedule
    Notifications.scheduleNudges({ ...newIntent, word, ...config, cadence: 'DAILY' });

    // 3. Launch
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROTOCOL: {pack}</Text>
      <Text style={styles.subtitle}>Enter your Intent Word to begin incubation.</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. FOCUS"
        placeholderTextColor="#555"
        onChangeText={setWord}
        value={word}
      />

      <TouchableOpacity style={styles.button} onPress={activatePack}>
        <Text style={styles.btnText}>INITIATE EGG</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#AAA', marginTop: 10, marginBottom: 30 },
  input: { backgroundColor: '#222', color: '#FFF', width: '100%', padding: 20, borderRadius: 10, marginBottom: 20, textAlign: 'center', fontSize: 18 },
  button: { backgroundColor: '#FFF', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#000' }
});

export default Onboarding;
