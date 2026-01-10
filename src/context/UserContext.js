import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // CORE DATA STRUCTURE
  // intents = Array of { id, word, roadmap, stake, hatchDate, streak, history, aiPersona }
  const [intents, setIntents] = useState([]);

  const [userProfile, setUserProfile] = useState({
    name: 'User',
    credits: 0, // Currency earned by discipline
    subscriptionStatus: 'ACTIVE', // 'ACTIVE', 'FREE_MONTH_EARNED', 'LOCKED'
    paymentMethod: 'visa_1234' // Mock token
  });

  // INITIAL LOAD
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedIntents = await AsyncStorage.getItem('@intents');
      if (storedIntents) setIntents(JSON.parse(storedIntents));
    } catch (e) {
      console.error("Failed to load accountability data.");
    }
  };

  // PERSISTENCE
  const saveData = async (newIntents) => {
    try {
      await AsyncStorage.setItem('@intents', JSON.stringify(newIntents));
      setIntents(newIntents);
    } catch (e) {
      console.error("Failed to save data.");
    }
  };

  // THE "QUICK START" BUILDER
  const addIntent = (word, roadmap, stake, eggDuration, persona) => {
    const newIntent = {
      id: Date.now(),
      word: word,
      roadmap: roadmap, // 'ASCENT', 'LAB', 'FLOW'
      stake: stake,    // 'INTERNAL', 'SOCIAL', 'FINANCIAL'
      hatchDate: new Date(Date.now() + eggDuration * 86400000).toISOString(),
      streak: 0,
      status: 'INCUBATING', // 'INCUBATING', 'HATCHED', 'TABLED'
      aiPersona: persona, // 'DRILL_SERGEANT', 'STOIC', 'FRIEND'
      history: [] // Array of daily results
    };

    const updatedIntents = [...intents, newIntent];
    saveData(updatedIntents);
    return newIntent;
  };

  return (
    <UserContext.Provider value={{ intents, addIntent, userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
