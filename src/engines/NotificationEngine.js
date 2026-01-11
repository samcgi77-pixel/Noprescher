import * as Notifications from 'expo-notifications';

export const scheduleNudges = async (intent) => {
  const { word, cadence, triggerTime, aiPersona, id } = intent;

  // Generate the "Voice"
  const message = generateAIMessage(word, aiPersona);

  // Define Trigger
  let trigger = {};
  if (cadence === 'DAILY') {
    trigger = { hour: 8, minute: 0, repeats: true }; // Default 8am
  } else if (cadence === 'WEEKLY') {
    trigger = { weekday: 1, hour: 9, minute: 0, repeats: true }; // Default Mon 9am
  }

  // Schedule Local Notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${word.toUpperCase()} Checkpoint`,
      body: message,
      sound: 'default',
      data: { intentId: id },
    },
    trigger,
  });
};

const generateAIMessage = (word, persona) => {
  const prompts = {
    'DRILL_SERGEANT': `Get up. It's time to prove you're disciplined about ${word}.`,
    'STOIC': `The obstacle is the way. How will you practice ${word} today?`,
    'FRIEND': `Hey! Just checking in on your ${word} goal. You got this!`
  };
  return prompts[persona] || prompts['STOIC'];
};
