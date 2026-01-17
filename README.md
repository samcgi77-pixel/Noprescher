# SoberFriend - The Ultimate Recovery PWA

A beautiful, compassionate Progressive Web App designed to support recovery with a "Bioluminescent Zen" design philosophy.

## 🌟 Features

### Core Philosophy
- **Compassionate Analytics**: Recovery Success Rate (no harsh day counters that reset to zero)
- **Fluid AI Persona**: Chat interface that feels like Friend + Therapist + Coach
- **Omni-Library**: Comprehensive resources at your fingertips
- **No Dead Ends**: Emergency support always available

### Visual Design
- **Bioluminescent Zen Theme**: Dark midnight blue background with glowing aurora effects
- **Glassmorphism**: Beautiful frosted glass containers with blur effects
- **Smooth Animations**: Framer Motion powered interactions
- **Mobile-First**: Optimized for touch and mobile devices

### Key Components

#### 1. Home Dashboard (Bento Grid)
- **Success Rate Ring**: Glowing circular progress showing recovery percentage
- **Daily Check-in**: Quick mood tracker with emoji buttons
- **Focus Card**: One-tap access to breathing exercises
- **Inspiration**: Random motivational quotes

#### 2. AI Chat Interface
- Conversational support system
- Keyboard-aware design (input never hidden)
- Compassionate, supportive responses
- Smooth message animations

#### 3. Omni-Library
- Big Book (AA)
- Holy Bible
- 432Hz Healing Audio
- Sleep Hypnosis Guides

#### 4. Recovery Tools
- **Breathing Bubble**: Animated breathing guide
- **Step 4 Inventory**: Track resentments and fears
- **Gratitude Journal**: Daily gratitude entries

#### 5. Profile & Stats
- Recovery success metrics
- **Sponsor Sidecar**: Share-link for accountability
- **Bio-Hacking Sim**: Heart rate monitoring (simulated)

#### 6. SOS Panic Button
- Floating red gradient button with heartbeat animation
- Full-screen panic overlay with:
  - 988 Crisis Hotline
  - Sponsor contact
  - Immediate breathing exercise

## 🚀 Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icon library
- **Recharts**: Data visualization

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors
- Background: `bg-slate-950` (Deep midnight)
- Aurora: Teal, Violet, Amber overlays
- Glass: `bg-white/10` with `backdrop-blur-xl`
- Gradients: Teal to Cyan, Rose to Orange, Violet to Purple

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Animations
- Heartbeat (SOS button)
- Breathe (4s cycle)
- Float (6s aurora movement)
- Scale on tap (0.95x)

## 🏗️ Project Structure

```
src/
├── App.jsx           # Main application component
├── main.jsx          # Entry point
└── index.css         # Global styles + Tailwind

public/
└── (static assets)

Configuration:
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 Usage

### Navigation
Five main tabs accessible via bottom navigation:
- **Home**: Dashboard with widgets
- **Library**: Resource library
- **Chat**: AI companion
- **Tools**: Recovery tools
- **Profile**: Stats and settings

### Key Interactions
- Tap mood emojis for daily check-in
- Press SOS button for emergency support
- Swipe to navigate between sections
- Type in chat for AI support
- Add gratitude/inventory items with Enter key

## 🌈 Key Design Decisions

1. **No Day Counter Reset**: Uses success rate percentage instead
2. **Always Accessible SOS**: Floating button present on all screens
3. **Glassmorphic UI**: Creates depth and premium feel
4. **Aurora Background**: Subtle, breathing effect for calm
5. **Mobile-First**: Touch-optimized with proper keyboard handling

## 🔒 Privacy & Security

- All data stored locally (no backend required)
- No tracking or analytics
- Offline-capable PWA
- Privacy-first design

## 📱 PWA Features

- Installable on mobile devices
- Offline functionality
- Fast loading with Vite
- Responsive design
- Touch-optimized

## 🙏 Philosophy

SoberFriend is built on the principle that recovery support should be:
- **Compassionate**: No shame, no judgment
- **Accessible**: Help is always one tap away
- **Beautiful**: Design that promotes calm and hope
- **Empowering**: Tools that build confidence

---

Built with ❤️ for those on the recovery journey.
