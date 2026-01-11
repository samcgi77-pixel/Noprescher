import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { UserProvider } from './src/context/UserContext';
import Dashboard from './src/screens/Dashboard';
import Onboarding from './src/screens/Onboarding';
import CheckIn from './src/screens/CheckIn';
import History from './src/screens/History';
import IntentDetail from './src/screens/IntentDetail';
import Stats from './src/screens/Stats';

const Stack = createNativeStackNavigator();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    // Request notification permissions on mount
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
      }
    }
    requestPermissions();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="CheckIn" component={CheckIn} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="IntentDetail" component={IntentDetail} />
          <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
