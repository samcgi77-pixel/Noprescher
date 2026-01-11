// Triggered immediately after a failed check-in
export const processPenalty = async (intent, userProfile) => {
  const { stake } = intent;

  if (stake === 'FINANCIAL') {
    // Real money consequence
    return await executeTransaction(userProfile.paymentMethod, 5.00, 'PENALTY');
  }

  if (stake === 'SOCIAL') {
    // "Hostage" Consequence
    return await broadcastFailure(intent.teammateId, intent.word);
  }

  if (stake === 'INTERNAL') {
    // Psychological Consequence
    return { lockApp: true, duration: 24, message: "App locked for reflection." };
  }
};

// Triggered after success
export const processReward = async (intent, userProfile) => {
  // MERITOCRACY MODEL
  const creditValue = intent.roadmap === 'ASCENT' ? 2 : 1; // Harder roadmaps earn more
  const newBalance = userProfile.credits + creditValue;

  return {
    newCredits: newBalance,
    message: `+${creditValue} Integrity Credits Earned`
  };
};

// Mock Stripe API
const executeTransaction = async (method, amount, type) => {
  console.log(`Processing ${type} of $${amount} via ${method}`);
  return { success: true, transactionId: 'TXN_MOCK_123' };
};

// Mock Social API
const broadcastFailure = async (teammateId, word) => {
  console.log(`Sending alert to teammate: User failed ${word}`);
  return { sent: true };
};
