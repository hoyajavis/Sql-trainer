import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';
import Home from '@/src/components/Home';
import Drills from '@/src/components/Drills';
import Concepts from '@/src/components/Concepts';
import GuidedPractice from '@/src/components/GuidedPractice';
import Dashboard from '@/src/components/Dashboard';
import Sandbox from '@/src/components/Sandbox';
import { ChallengeDomain } from '@/src/types';

export type Screen = 'home' | 'drills' | 'lessons' | 'concepts' | 'dashboard' | 'sandbox';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeDomain, setActiveDomain] = useState<ChallengeDomain | null>(null);
  
  const [isReady, setIsReady] = useState(false);

  // Gamification State
  const [xp, setXp] = useState(0);
  const [xpToasts, setXpToasts] = useState<{id: number, amount: number, message: string}[]>([]);

  useEffect(() => {
    const savedDomain = localStorage.getItem('sql_domain') as ChallengeDomain | null;
    if (savedDomain && ['business', 'science', 'education', 'healthcare', 'media', 'sports', 'aviation', 'real_estate', 'human_resources'].includes(savedDomain)) {
      setActiveDomain(savedDomain);
    }

    const savedXp = parseInt(localStorage.getItem('sql_xp') || '0', 10);
    setXp(savedXp);

    setIsReady(true);
  }, []);

  const handleDomainChange = (newDomain: ChallengeDomain) => {
    setActiveDomain(newDomain);
    localStorage.setItem('sql_domain', newDomain);
  };

  const addXp = useCallback((amount: number, message: string) => {
    setXp(prev => {
      const next = prev + amount;
      localStorage.setItem('sql_xp', next.toString());
      return next;
    });

    const id = Date.now();
    setXpToasts(prev => [...prev, { id, amount, message }]);
    
    setTimeout(() => {
      setXpToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  if (!isReady) return null;

  return (
    <div className="bg-zinc-950 min-h-screen text-white w-full mx-auto max-w-md shadow-2xl relative overflow-hidden flex flex-col">
      {/* Screens */}
      {currentScreen === 'home' && (
        <Home onNavigate={setCurrentScreen} xp={xp} />
      )}
      
      {currentScreen === 'drills' && (
        <Drills onBack={() => setCurrentScreen('home')} activeDomain={activeDomain} onDomainChange={handleDomainChange} addXp={addXp} />
      )}
      
      {currentScreen === 'lessons' && (
        <GuidedPractice onBack={() => setCurrentScreen('home')} activeDomain={activeDomain} onDomainChange={handleDomainChange} addXp={addXp} />
      )}
      
      {currentScreen === 'concepts' && (
        <Concepts onBack={() => setCurrentScreen('home')} addXp={addXp} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard onBack={() => setCurrentScreen('home')} xp={xp} />
      )}

      {currentScreen === 'sandbox' && (
        <Sandbox onBack={() => setCurrentScreen('home')} activeDomain={activeDomain} onDomainChange={handleDomainChange} />
      )}

      {/* XP Toasts Layer */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {xpToasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="bg-amber-500 text-amber-950 font-bold px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>{toast.message}</span>
              <span className="bg-amber-950/20 px-2 py-0.5 rounded text-sm ml-1">+{toast.amount} XP</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}


