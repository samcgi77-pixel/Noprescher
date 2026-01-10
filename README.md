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

## 🔮 Roadmap

### Phase 1: MVP (Current)
- [x] Core architecture
- [x] Basic UI components
- [x] State management
- [x] Quick start flows

### Phase 2: Enhanced Features
- [ ] Check-in screens
- [ ] Proof submission (photos, data)
- [ ] Social team features
- [ ] Payment integration (Stripe)

### Phase 3: Advanced
- [ ] AI coaching improvements
- [ ] Analytics dashboard
- [ ] Community features
- [ ] Gamification elements

## 📄 License

Proprietary - All rights reserved

## 🙏 Philosophy

> "The obstacle is the way. The app doesn't help you succeed - it makes failure uncomfortable enough that you choose to succeed."

This app is not about motivation. It's about **accountability through designed friction**.
