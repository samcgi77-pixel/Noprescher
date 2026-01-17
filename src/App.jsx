import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Library, MessageCircle, Wrench, User,
  Heart, Phone, Wind, Book, Music, Moon,
  Clipboard, Sparkles, Share2, Activity,
  Smile, Meh, Frown, Send, X, AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showPanic, setShowPanic] = useState(false);
  const [moodToday, setMoodToday] = useState(null);
  const [successRate, setSuccessRate] = useState(98);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hello friend! I\'m here to support you. How are you feeling today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);
  const [resentments, setResentments] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  const [isBreathing, setIsBreathing] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Quotes for inspiration
  const quotes = [
    "One day at a time.",
    "Progress, not perfection.",
    "You are stronger than you think.",
    "This too shall pass.",
    "I can do hard things."
  ];
  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  // Handle chat send
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);

    setTimeout(() => {
      const responses = [
        "I hear you. That's a brave thing to share.",
        "Thank you for trusting me with this. How does that make you feel?",
        "You're doing great. Every day is a victory.",
        "Remember, progress isn't always linear. Be kind to yourself.",
        "I'm proud of you for showing up today."
      ];
      setChatMessages(prev => [...prev, {
        role: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1000);

    setChatInput('');
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float"
             style={{ top: '10%', left: '20%' }} />
        <div className="absolute w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-float"
             style={{ top: '50%', right: '10%', animationDelay: '2s' }} />
        <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float"
             style={{ bottom: '10%', left: '50%', animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col pb-20">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SoberFriend
          </motion.h1>
          <motion.div
            className="text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </motion.div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <AnimatePresence mode="wait">
            {/* HOME VIEW */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Bento Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Success Rate - Large */}
                  <div className="col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <div className="flex flex-col items-center">
                      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Recovery Success</h3>
                      <div className="relative w-32 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[{ value: successRate }, { value: 100 - successRate }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={60}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            >
                              <Cell fill="url(#gradient1)" />
                              <Cell fill="rgba(255,255,255,0.1)" />
                            </Pie>
                            <defs>
                              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                              </linearGradient>
                            </defs>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">{successRate}%</span>
                        </div>
                      </div>
                      <p className="text-white/80 mt-4 text-sm">You're crushing it this year!</p>
                    </div>
                  </div>

                  {/* Daily Check-in */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">How are you?</h3>
                    <div className="flex justify-around">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMoodToday('happy')}
                        className={`text-3xl ${moodToday === 'happy' ? 'scale-125' : ''} transition-transform`}
                      >
                        <Smile className={moodToday === 'happy' ? 'text-green-400' : 'text-white/40'} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMoodToday('neutral')}
                        className={`text-3xl ${moodToday === 'neutral' ? 'scale-125' : ''} transition-transform`}
                      >
                        <Meh className={moodToday === 'neutral' ? 'text-yellow-400' : 'text-white/40'} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMoodToday('sad')}
                        className={`text-3xl ${moodToday === 'sad' ? 'scale-125' : ''} transition-transform`}
                      >
                        <Frown className={moodToday === 'sad' ? 'text-red-400' : 'text-white/40'} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Focus Card */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">Quick Tool</h3>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setActiveTab('tools'); setIsBreathing(true); }}
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-white font-semibold text-sm"
                    >
                      <Wind className="inline mr-2" size={16} />
                      Breathe Now
                    </motion.button>
                  </div>

                  {/* Inspiration */}
                  <div className="col-span-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <Sparkles className="text-amber-400 mb-2" size={20} />
                    <p className="text-white italic text-lg">"{currentQuote}"</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LIBRARY VIEW */}
            {activeTab === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Omni-Library</h2>

                {/* Resource Cards */}
                {[
                  { icon: <Book />, title: 'Big Book', desc: 'Alcoholics Anonymous text' },
                  { icon: <Book />, title: 'Holy Bible', desc: 'Spiritual guidance' },
                  { icon: <Music />, title: '432Hz Healing', desc: 'Calming frequencies' },
                  { icon: <Moon />, title: 'Sleep Hypnosis', desc: 'Guided rest' }
                ].map((resource, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-violet-500 rounded-2xl flex items-center justify-center text-white">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{resource.title}</h3>
                      <p className="text-white/60 text-sm">{resource.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CHAT VIEW */}
            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Your AI Companion</h2>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-3xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                          : 'bg-white/10 backdrop-blur-xl border border-white/10 text-white'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input - Fixed at bottom */}
                <div className="sticky bottom-0 bg-slate-950 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white"
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TOOLS VIEW */}
            {activeTab === 'tools' && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Recovery Tools</h2>

                {/* Breathing Bubble */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Wind className="text-teal-400" />
                    Breathing Exercise
                  </h3>
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={isBreathing ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                      transition={{ duration: 4, repeat: isBreathing ? Infinity : 0 }}
                      className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full opacity-60"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsBreathing(!isBreathing)}
                      className="mt-6 px-6 py-3 bg-white/20 rounded-full text-white font-semibold"
                    >
                      {isBreathing ? 'Stop' : 'Start Breathing'}
                    </motion.button>
                  </div>
                </div>

                {/* Step 4 Inventory */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Clipboard className="text-violet-400" />
                    Step 4 Inventory
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Add a resentment..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          setResentments([...resentments, e.target.value]);
                          e.target.value = '';
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <div className="mt-4 space-y-2">
                      {resentments.map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-xl px-4 py-2 text-white/80 text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gratitude Journal */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="text-amber-400" />
                    Gratitude Journal
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="I'm grateful for..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          setGratitude([...gratitude, e.target.value]);
                          e.target.value = '';
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="mt-4 space-y-2">
                      {gratitude.map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-xl px-4 py-2 text-white/80 text-sm flex items-start gap-2">
                          <Sparkles size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROFILE VIEW */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <h2 className="text-2xl font-bold text-white">Your Profile</h2>
                  <p className="text-white/60">Recovery Warrior</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">{successRate}%</div>
                    <div className="text-white/60 text-sm">Success Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">365</div>
                    <div className="text-white/60 text-sm">Days Tracked</div>
                  </div>
                </div>

                {/* Sponsor Sidecar */}
                <div className="bg-gradient-to-br from-rose-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="text-rose-400" />
                    Sponsor Sidecar
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Share your progress with your sponsor via a read-only link.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl text-white font-semibold"
                  >
                    Generate Share Link
                  </motion.button>
                </div>

                {/* Bio-Hacking Sim */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Activity className="text-cyan-400" />
                    Health Check
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60">Heart Rate</span>
                    <span className="text-white font-bold">72 BPM</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <p className="text-white/60 text-sm mt-3">Looking good! Keep it up.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-50">
          <div className="max-w-md mx-auto flex justify-around items-center">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'library', icon: Library, label: 'Library' },
              { id: 'chat', icon: MessageCircle, label: 'Chat' },
              { id: 'tools', icon: Wrench, label: 'Tools' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors ${
                  activeTab === tab.id
                    ? 'text-teal-400'
                    : 'text-white/40'
                }`}
              >
                <tab.icon size={24} />
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="w-1 h-1 bg-teal-400 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </nav>
      </div>

      {/* SOS FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPanic(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center z-40 animate-heartbeat"
      >
        <Heart className="text-white" size={28} />
      </motion.button>

      {/* Panic Overlay */}
      <AnimatePresence>
        {showPanic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowPanic(false)}
              className="absolute top-6 right-6 text-white/60"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6 w-full max-w-sm"
            >
              <div className="text-center mb-8">
                <AlertCircle className="text-rose-400 mx-auto mb-4" size={64} />
                <h2 className="text-3xl font-bold text-white mb-2">You're Not Alone</h2>
                <p className="text-white/60">We're here to help. Choose an option:</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                Call 988 (Crisis Line)
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                Call My Sponsor
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowPanic(false); setActiveTab('tools'); setIsBreathing(true); }}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3"
              >
                <Wind size={24} />
                Breathe With Me
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
