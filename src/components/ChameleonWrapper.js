import React from 'react';
import { View, StyleSheet } from 'react-native';

// THEME DEFINITIONS
const THEMES = {
  ASCENT: {
    // Military/Stoic - High Contrast, Grit
    backgroundColor: '#0F0F0F',
    accentColor: '#FF3B30',
    textColor: '#FFFFFF',
    fontFamily: 'System', // Placeholder for Roboto-Bold
    backgroundImage: null // In prod, use require('./assets/grit.png')
  },
  LAB: {
    // Scientific - Blueprint, Grid, Data
    backgroundColor: '#001429',
    accentColor: '#00D1FF',
    textColor: '#E0F7FA',
    fontFamily: 'System', // Placeholder for Courier
    backgroundImage: null
  },
  FLOW: {
    // Zen - Organic, Soft, Light
    backgroundColor: '#F5F5F5',
    accentColor: '#8E8E93',
    textColor: '#333333',
    fontFamily: 'System', // Placeholder for Lato
    backgroundImage: null
  }
};

const ChameleonWrapper = ({ children, activeRoadmap }) => {
  // Default to ASCENT if undefined
  const currentTheme = THEMES[activeRoadmap] || THEMES.ASCENT;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
       {/* Pass theme props down to children implicitly via context or style overrides if needed */}
       <View style={{ flex: 1, padding: 20 }}>
         {children}
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default ChameleonWrapper;
