# The Accountable App (Ironclad)

A modular accountability platform built with React Native and Expo. Transform your goals into "Words" and let the app hold you accountable through psychological, social, or financial stakes.

## 🎯 Core Philosophy

**"User Option" is the Master Rule**

The app is a modular container for 1-3 "Words" (Intents) that adapt to your chosen accountability style.

## 🏗️ Architectural Pillars

### 1. The Chameleon UI
The app changes its entire visual theme based on your chosen "Roadmap":
- **Military Theme** (The Ascent): High contrast, gritty, stoic
- **Scientific Theme** (The Lab): Blueprint-style, data-focused
- **Zen Theme** (The Flow): Organic, soft, mindful

### 2. The Egg Mechanic
All goals are locked in an "Incubation Period" (7, 21, or 90 days). You cannot change settings until the egg hatches - this creates commitment.

### 3. The Meritocracy Model
Users pay a subscription but earn "Integrity Credits" for success, which can:
- Refund subscription costs
- Unlock premium features
- Build a reputation score

### 4. The 3 Roadmaps

#### The Ascent (Sobriety/Stoic Logic)
- Binary Pass/Fail system
- Immediate streak reset on failure
- High friction, maximum accountability
- Best for: Sobriety, discipline-based goals

#### The Lab (Analytical Logic)
- Tracks data and correlations
- Requires proof (numbers, metrics)
- Medium friction
- Best for: Financial goals, habits with measurable outcomes

#### The Flow (Mindfulness Logic)
- Presence-based check-ins
- Tracks "Moments" instead of streaks
- Low friction
- Best for: Meditation, creativity, wellness

### 5. The 3 Stake Paths

#### Financial Stakes
- Real money penalties for failures ($5-$50)
- Integration with payment providers
- Immediate charge on breach

#### Social Stakes
- "Hostage" mechanic: Teammates lose features if you fail
- Public accountability through friend networks
- Shared progress tracking

#### Internal Stakes
- Privacy-focused journaling
- Future-self video messages
- App lockouts for reflection periods

## 📁 Project Structure

```
accountable-app-ironclad/
├── App.js                          # Main app entry with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── src/
│   ├── context/
│   │   └── UserContext.js          # Global state management
│   ├── components/
│   │   ├── ChameleonWrapper.js     # Dynamic UI theming engine
│   │   └── EggTimer.js             # Incubation countdown display
│   ├── engines/
│   │   ├── AccountabilityEngine.js # Check-in logic (Pass/Fail)
│   │   ├── StakeEngine.js          # Consequences & rewards
│   │   └── NotificationEngine.js   # AI "Sponsor" notifications
│   └── screens/
│       ├── Dashboard.js            # Main carousel interface
│       └── Onboarding.js           # Quick start setup
└── assets/                         # Images, fonts, icons
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Web Browser
```

## 🧩 Core Components

### UserContext
Manages global state including:
- Active intents (Words)
- User profile and credits
- Subscription status
- Persistence to AsyncStorage

### ChameleonWrapper
Dynamic theming component that wraps screens and applies:
- Background colors
- Accent colors
- Typography
- Visual atmosphere based on active roadmap

### EggTimer
Visual countdown showing days until goal "hatches" and becomes editable.

### AccountabilityEngine
Logic brain that processes check-ins:
- Ascent: Binary YES/NO
- Lab: Requires data proof
- Flow: Presence acknowledgment

### StakeEngine
Handles consequences and rewards:
- Processes financial transactions
- Broadcasts social failures
- Manages internal lockouts
- Awards Integrity Credits

### NotificationEngine
AI-powered nudges with personality:
- Drill Sergeant (harsh motivation)
- Stoic (philosophical prompts)
- Friend (supportive reminders)

## 🎨 Quick Start Packs

### Executive Pack
- **Roadmap**: The Lab
- **Stake**: Financial ($5)
- **Duration**: 21 days
- **Persona**: Stoic
- **Best for**: Productivity, focus

### Zen Pack
- **Roadmap**: The Flow
- **Stake**: Internal
- **Duration**: 7 days
- **Persona**: Friend
- **Best for**: Meditation, wellness

### Ironclad Pack
- **Roadmap**: The Ascent
- **Stake**: Social
- **Duration**: 30 days
- **Persona**: Drill Sergeant
- **Best for**: Sobriety, discipline

## ✨ Fully Implemented Features

### Core Screens
- ✅ **Dashboard** - Horizontal carousel for multiple intents with quick stats
- ✅ **Onboarding** - Three quick-start packs (Executive, Zen, Ironclad)
- ✅ **CheckIn** - Roadmap-specific interfaces (Binary/Data/Flow)
- ✅ **History** - Complete check-in timeline with success/failure tracking
- ✅ **Intent Detail** - Full configuration and statistics view
- ✅ **Stats** - Aggregated analytics and Integrity Credits display

### Accountability Features
- ✅ **Daily Check-ins** - One check-in per day per intent
- ✅ **Streak Tracking** - Real-time streak counting with reset on failure
- ✅ **Success Rate Calculation** - Performance metrics per intent
- ✅ **History Logging** - Timestamped record of all check-ins
- ✅ **Egg Incubation** - Locked configuration during incubation period
- ✅ **Integrity Credits** - Earned rewards for successful check-ins

### Roadmap-Specific Logic
- ✅ **Ascent** - Binary YES/NO with immediate streak reset
- ✅ **Lab** - Numeric data input for correlation tracking
- ✅ **Flow** - Mindful presence acknowledgment

### Data Management
- ✅ **AsyncStorage Persistence** - All data saved locally
- ✅ **Auto-load on App Start** - Restore intents and profile
- ✅ **Real-time Updates** - Immediate state synchronization
- ✅ **Intent Management** - Create, read, update, delete operations

### UI/UX Polish
- ✅ **Chameleon Theming** - Dynamic backgrounds per roadmap
- ✅ **Smooth Animations** - Fade-ins and transitions
- ✅ **Visual Feedback** - Success/failure color coding
- ✅ **Disabled States** - Prevent duplicate check-ins
- ✅ **Empty States** - Helpful messaging when no data

## 📱 User Guide

### Getting Started

1. **Launch the app** - You'll see three Quick Start options
2. **Choose your pack:**
   - **Executive**: Data-driven, 21 days, financial stakes
   - **Zen**: Mindfulness, 7 days, internal reflection
   - **Ironclad**: Sobriety-style, 30 days, social accountability
3. **Enter your Intent Word** (e.g., "FOCUS", "SOBRIETY", "PRESENCE")
4. **Tap "Initiate Egg"** - Your intent begins incubation

### Daily Check-ins

1. **Open Dashboard** - View your active intents
2. **Tap "Initiate Check-In"** on any intent
3. **Complete the check-in:**
   - **Ascent**: Choose YES or NO
   - **Lab**: Enter a numeric value
   - **Flow**: Acknowledge presence
4. **Receive instant feedback** - Streak updates and credit rewards

### Viewing Progress

- **Tap the Intent Word** - View full details and configuration
- **Tap "View History"** - See timeline of all check-ins
- **Tap "Stats" button** - View overall performance across all intents

### Understanding the Egg Mechanic

- During incubation, settings are **locked** 🔒
- Countdown shows days until you can modify the intent
- When ready, tap "Tap to Hatch" to unlock customization

## 🔮 Roadmap

### Phase 1: Core Functionality ✅ COMPLETE
- [x] Core architecture
- [x] All UI screens and navigation
- [x] State management with persistence
- [x] Quick start flows
- [x] Check-in screens with roadmap logic
- [x] History and analytics
- [x] Integrity Credits system
- [x] Notification infrastructure

### Phase 2: Enhanced Features
- [ ] Photo/video proof submission
- [ ] Social team features (hostage mechanic)
- [ ] Payment integration (Stripe for financial stakes)
- [ ] Advanced notification scheduling
- [ ] Calendar view for check-ins

### Phase 3: Advanced
- [ ] AI coaching with GPT integration
- [ ] Data correlation visualizations (Lab roadmap)
- [ ] Community leaderboards
- [ ] Gamification elements
- [ ] Export/import functionality

## 📄 License

Proprietary - All rights reserved

## 🙏 Philosophy

> "The obstacle is the way. The app doesn't help you succeed - it makes failure uncomfortable enough that you choose to succeed."

This app is not about motivation. It's about **accountability through designed friction**.
