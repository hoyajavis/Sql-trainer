import { motion } from 'motion/react';
import { Database, Lightbulb, ChevronRight, PlaySquare, Zap, BookOpen, Activity, Code2 } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: 'drills' | 'lessons' | 'concepts' | 'dashboard' | 'sandbox') => void;
  xp?: number;
}

export default function Home({ onNavigate, xp = 0 }: HomeProps) {
  
  // Calculate generic level
  const currentLevel = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col p-6 text-white relative">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center z-20 mb-8 pt-2">
        <button 
           onClick={() => onNavigate('dashboard')}
           className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all rounded-full px-4 py-2 cursor-pointer group"
        >
          <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm text-zinc-200">{xp} <span className="text-zinc-500 font-medium">XP</span></span>
        </button>
        <button 
           onClick={() => onNavigate('dashboard')}
           className="p-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all rounded-full text-zinc-400 hover:text-zinc-200"
        >
           <Activity className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-sm mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="bg-indigo-600 p-3 rounded-2xl inline-block shadow-lg shadow-indigo-600/20 mb-2">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">SQL Mobile Trainer</h1>
            <p className="text-zinc-400 text-sm mb-4">Master databases from your phone.</p>
            
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all rounded-xl p-3 mt-4 mx-auto w-4/5 text-left block cursor-pointer group"
            >
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    <span className="group-hover:text-zinc-300 transition-colors">Level {currentLevel}</span>
                    <span>{xpInLevel} / 100 XP</span>
                </div>
                <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${xpInLevel}%` }} />
                </div>
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onNavigate('concepts')}
              className="w-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group relative overflow-hidden flex items-center text-left"
            >
              <div className="bg-emerald-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">Concept Practice</h2>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  New to SQL? Learn the concepts with spreadsheet analogies.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </button>

            <button
              onClick={() => onNavigate('lessons')}
              className="w-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group relative overflow-hidden flex items-center text-left"
            >
              <div className="bg-amber-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">Learn SQL</h2>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  Learn SQL syntax step-by-step with interactive examples.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
            </button>

            <button
              onClick={() => onNavigate('drills')}
              className="w-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group relative overflow-hidden flex items-center text-left"
            >
              <div className="bg-indigo-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">SQL Drills</h2>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  Write real SQL queries against an interactive SQLite database.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
            </button>

            <button
              onClick={() => onNavigate('sandbox')}
              className="w-full bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group relative overflow-hidden flex items-center text-left"
            >
              <div className="bg-rose-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-rose-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-rose-400 transition-colors">SQL Sandbox</h2>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  Free-form query editor to experiment with tables.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-rose-400 transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Privacy Disclaimer Footer */}
      <div className="mt-8 text-center pb-4 z-20">
        <p className="text-[10px] text-zinc-600 leading-tight">
          Disclaimer: Data provided in challenges is simulated for educational purposes. 
          All practice inputs run locally on your device in WebAssembly and are reset each session.
        </p>
      </div>
    </div>
  );
}
