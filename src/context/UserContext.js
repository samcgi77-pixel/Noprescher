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
      const storedProfile = await AsyncStorage.getItem('@userProfile');

      if (storedIntents) setIntents(JSON.parse(storedIntents));
      if (storedProfile) setUserProfile(JSON.parse(storedProfile));
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

  const saveProfile = async (newProfile) => {
    try {
      await AsyncStorage.setItem('@userProfile', JSON.stringify(newProfile));
      setUserProfile(newProfile);
    } catch (e) {
      console.error("Failed to save profile.");
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
      history: [], // Array of daily results
      lastCheckIn: null,
      totalCheckIns: 0,
      successfulCheckIns: 0
    };

    const updatedIntents = [...intents, newIntent];
    saveData(updatedIntents);
    return newIntent;
  };

  // GET INTENT BY ID
  const getIntent = (intentId) => {
    return intents.find(i => i.id === intentId);
  };

  // PROCESS CHECK-IN
  const processCheckIn = async (intentId, checkInResult) => {
    const updatedIntents = intents.map(intent => {
      if (intent.id === intentId) {
        const historyEntry = {
          timestamp: checkInResult.timestamp,
          success: checkInResult.success,
          streak: checkInResult.newStreak,
          data: checkInResult.data,
          message: checkInResult.message
        };

        return {
          ...intent,
          streak: checkInResult.newStreak,
          history: [...intent.history, historyEntry],
          lastCheckIn: checkInResult.timestamp,
          totalCheckIns: intent.totalCheckIns + 1,
          successfulCheckIns: checkInResult.success
            ? intent.successfulCheckIns + 1
            : intent.successfulCheckIns
        };
      }
      return intent;
    });

    await saveData(updatedIntents);
  };

  // UPDATE INTENT (for settings changes after hatch)
  const updateIntent = async (intentId, updates) => {
    const updatedIntents = intents.map(intent => {
      if (intent.id === intentId) {
        return { ...intent, ...updates };
      }
      return intent;
    });
    await saveData(updatedIntents);
  };

  // DELETE INTENT
  const deleteIntent = async (intentId) => {
    const updatedIntents = intents.filter(i => i.id !== intentId);
    await saveData(updatedIntents);
  };

  // CHECK IF CAN CHECK IN TODAY
  const canCheckInToday = (intent) => {
    if (!intent.lastCheckIn) return true;

    const lastCheckIn = new Date(intent.lastCheckIn);
    const today = new Date();

    // Check if last check-in was before today
    return lastCheckIn.toDateString() !== today.toDateString();
  };

  // GET STATS
  const getStats = () => {
    const totalIntents = intents.length;
    const totalCheckIns = intents.reduce((sum, i) => sum + i.totalCheckIns, 0);
    const successRate = totalCheckIns > 0
      ? (intents.reduce((sum, i) => sum + i.successfulCheckIns, 0) / totalCheckIns * 100).toFixed(1)
      : 0;
    const longestStreak = Math.max(...intents.map(i => i.streak), 0);

    return {
      totalIntents,
      totalCheckIns,
      successRate,
      longestStreak,
      credits: userProfile.credits
    };
  };

  return (
    <UserContext.Provider value={{
      intents,
      addIntent,
      getIntent,
      processCheckIn,
      updateIntent,
      deleteIntent,
      canCheckInToday,
      getStats,
      userProfile,
      setUserProfile: saveProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};
