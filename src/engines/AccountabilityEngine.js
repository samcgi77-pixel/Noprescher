export const checkIn = (intent, userResponse, proofData) => {
  const { roadmap } = intent;

  switch (roadmap) {
    case 'ASCENT':
      return handleAscentLogic(intent, userResponse);
    case 'LAB':
      return handleLabLogic(intent, userResponse, proofData);
    case 'FLOW':
      return handleFlowLogic(intent);
    default:
      return { success: false, message: "Error: Unknown Roadmap" };
  }
};

// 1. THE ASCENT (Binary, No Excuses)
const handleAscentLogic = (intent, userResponse) => {
  if (userResponse === 'YES') {
    return {
      success: true,
      newStreak: intent.streak + 1,
      message: "Strength verified. Streak continues."
    };
  } else {
    // Immediate Reset - The "Sobriety" Mechanic
    return {
      success: false,
      newStreak: 0,
      penaltyTrigger: true,
      message: "Breach detected. Resetting to Day 0."
    };
  }
};

// 2. THE LAB (Data Driven, asks 'Why')
const handleLabLogic = (intent, userResponse, proofData) => {
  // Lab requires specific data points (e.g. 'I spent $50')
  if (proofData && proofData.value) {
    return {
      success: true,
      newStreak: intent.streak + 1,
      dataPoint: proofData.value,
      message: "Data point correlated."
    };
  }
  return { success: false, message: "Insufficient Data Input." };
};

// 3. THE FLOW (Presence Based)
const handleFlowLogic = (intent) => {
  // Flow doesn't track streaks, it tracks "Moments"
  return {
    success: true,
    newStreak: intent.streak, // Streak doesn't matter
    message: "Moment captured."
  };
};
