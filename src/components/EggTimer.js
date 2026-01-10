import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EggTimer = ({ hatchDate, status }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hatch = new Date(hatchDate);
      const diff = hatch - now;

      if (diff <= 0) {
        setTimeLeft('READY TO HATCH');
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days} Days until Evolution`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hatchDate]);

  return (
    <View style={styles.container}>
      <View style={styles.eggShell}>
        <Text style={{ fontSize: 40 }}>
          {status === 'INCUBATING' ? '🔒' : '🐣'}
        </Text>
      </View>
      <Text style={styles.timerText}>{timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  eggShell: {
    width: 100, height: 140, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFF'
  },
  timerText: { marginTop: 10, fontWeight: 'bold', color: '#FFF' }
});

export default EggTimer;
