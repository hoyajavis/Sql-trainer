// Extracted from App.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Database, BookOpen, RefreshCcw, ChevronRight, GraduationCap, Code, ServerCrash, ArrowLeft, Search, PlusCircle, LayoutGrid, FileSearch, Briefcase, FlaskConical, HeartPulse, PlaySquare, Trophy, Plane, MapPin, BriefcaseBusiness } from 'lucide-react';
import { useSQL } from '@/src/hooks/useSQL';
import { CHALLENGES, ChallengeCategory, SQLChallenge, ChallengeDomain } from '@/src/types';
import SQLKeyboard from '@/src/components/SQLKeyboard';
import ResultsTable from '@/src/components/ResultsTable';
import ReferenceSheet from '@/src/components/ReferenceSheet';
import SyntaxGuide from '@/src/components/SyntaxGuide';
import QueryEvaluator from '@/src/components/QueryEvaluator';
import DomainSelectorModal from '@/src/components/DomainSelectorModal';

type EvalStatus = 'idle' | 'evaluating' | 'success' | 'fail' | 'error';
type DrillCategorySelection = ChallengeCategory | 'all' | null;

interface DrillsProps {
  onBack: () => void;
  activeDomain: ChallengeDomain | null;
  onDomainChange: (domain: ChallengeDomain) => void;
  addXp: (amount: number, msg: string) => void;
}

const PRAISE_MESSAGES = [
  "Fantastic!", "Spot on!", "Perfect query!", "You're a natural!", 
  "Nailed it!", "SQL Master!", "Excellent work!", "Query succeeded!"
];

export default function Drills({ onBack, activeDomain, onDomainChange, addXp }: DrillsProps) {
  const [showDomainModal, setShowDomainModal] = useState(activeDomain === null);
  const [selectedCategory, setSelectedCategory] = useState<DrillCategorySelection>(null);
  
  const { isReady, lastResults, executeAndEvaluate, clearResults, resetDb } = useSQL(activeDomain);
  const [currentChallenge, setCurrentChallenge] = useState<SQLChallenge | null>(null);
  const [query, setQuery] = useState('');
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isSyntaxOpen, setIsSyntaxOpen] = useState(false);
  
  const [evalStatus, setEvalStatus] = useState<EvalStatus>('idle');
  const [evalMessage, setEvalMessage] = useState('');
  
  const [showNext, setShowNext] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Initialize from local storage and migrate if necessary
  const [drillCounts, setDrillCounts] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('sql_completed_drills');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Migrate array of IDs to object map
          const migrated: Record<string, number> = {};
          parsed.forEach(id => {
            migrated[id] = 1;
          });
          localStorage.setItem('sql_completed_drills', JSON.stringify(migrated));
          return migrated;
        }
        return parsed as Record<string, number>;
      }
      return {};
    } catch {
      return {};
    }
  });

  const markAsCompleted = (id: string) => {
    const newCounts = { ...drillCounts, [id]: (drillCounts[id] || 0) + 1 };
    setDrillCounts(newCounts);
    localStorage.setItem('sql_completed_drills', JSON.stringify(newCounts));
    return newCounts[id] === 1; // Return true if it was the first completion
  };

  const getNextChallenge = (category: DrillCategorySelection) => {
    let pool = CHALLENGES.filter(c => c.domain === activeDomain);
    if (category && category !== 'all') {
      pool = pool.filter(c => c.category === category);
    }
    
    if (pool.length === 0) return null;

    // Sort by inverse completion count, with a bit of randomness among the lowest
    const scoredPool = pool.map(c => ({
      challenge: c,
      count: drillCounts[c.id] || 0
    })).sort((a, b) => a.count - b.count);

    const minCount = scoredPool[0].count;
    const candidates = scoredPool.filter(c => c.count === minCount);
    
    const next = candidates[Math.floor(Math.random() * candidates.length)].challenge;
    
    // Prevent strictly repeating the exact same one if there are alternatives
    if (currentChallenge && candidates.length > 1 && next.id === currentChallenge.id) {
       const others = candidates.filter(c => c.challenge.id !== currentChallenge.id);
       if (others.length > 0) return others[Math.floor(Math.random() * others.length)].challenge;
    }

    return next;
  };

  const startCategory = (category: DrillCategorySelection) => {
    const next = getNextChallenge(category);
    setCurrentChallenge(next);
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (currentChallenge) {
      setQuery(currentChallenge.initialQuery || '');
      setShowNext(false);
      setEvalStatus('idle');
      clearResults();
      
      // Auto-focus after render
      setTimeout(() => editorRef.current?.focus(), 100);
    }
  }, [currentChallenge]);

  const handleRun = async () => {
    if (!currentChallenge) return;
    setEvalStatus('evaluating');
    setEvalMessage('Evaluating query...');
    setShowNext(false);

    // Artificial delay
    await new Promise(r => setTimeout(r, 400));

    const result = executeAndEvaluate(query, currentChallenge.solution, currentChallenge.verifyQuery);
    
    if (result.isValid) {
      const isFirstTime = markAsCompleted(currentChallenge.id);
      setEvalStatus('success');
      setEvalMessage(PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)] + (isFirstTime ? ' Earned XP!' : ''));
      setShowNext(true);
      
      addXp(15, "Drill Completed");
    } else if (result.error) {
      setEvalStatus('error');
      if (result.error.startsWith("Hint:") || result.error.startsWith("Your ") || result.error.startsWith("The data")) {
        setEvalMessage(result.error);
      } else {
        setEvalMessage(`SQL Error: ${result.error}`);
      }
    } else {
      setEvalStatus('fail');
      setEvalMessage('Output does not match the expected result. Try again.');
    }
  };

  const handleInsert = useCallback((text: string) => {
    if (!editorRef.current) return;
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    
    // Smart whitespace
    const before = query.substring(0, start);
    const after = query.substring(end);
    const needSpaceBefore = start > 0 && !/[\s\n(]/.test(before[start-1]);
    const needSpaceAfter = end < query.length && !/[\s\n);,]/.test(after[0]);

    const insertion = (needSpaceBefore ? ' ' : '') + text + (needSpaceAfter ? ' ' : '');
    const newText = before + insertion + after;
    setQuery(newText);
    
    // Preserve focus and position
    setTimeout(() => {
      editorRef.current?.focus();
      const pos = start + insertion.length;
      editorRef.current?.setSelectionRange(pos, pos);
    }, 0);
  }, [query]);

  const DomainInfo = activeDomain ? {
    business: { icon: <Briefcase className="w-4 h-4" />, label: 'Business' },
    human_resources: { icon: <BriefcaseBusiness className="w-4 h-4" />, label: 'HR' },
    science: { icon: <FlaskConical className="w-4 h-4" />, label: 'Science' },
    education: { icon: <GraduationCap className="w-4 h-4" />, label: 'Education' },
    healthcare: { icon: <HeartPulse className="w-4 h-4" />, label: 'Healthcare' },
    media: { icon: <PlaySquare className="w-4 h-4" />, label: 'Media' },
    sports: { icon: <Trophy className="w-4 h-4" />, label: 'Sports' },
    aviation: { icon: <Plane className="w-4 h-4" />, label: 'Aviation' },
    real_estate: { icon: <MapPin className="w-4 h-4" />, label: 'Real Estate' }
  }[activeDomain] : null;

  const nextChallenge = () => {
    startCategory(selectedCategory);
  };

  if (!selectedCategory) {
    const categories = [
      {
        id: 'basic_queries' as ChallengeCategory,
        title: 'Basic Queries',
        description: 'Learn SELECT, WHERE, LIKE, and ORDER BY.',
        icon: <Search className="w-6 h-6 text-emerald-400" />,
        hoverTextClass: 'group-hover:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        progressClass: 'bg-emerald-500'
      },
      {
        id: 'aggregations_joins' as ChallengeCategory,
        title: 'Aggregations & Joins',
        description: 'Master GROUP BY, SUM, MAX, and INNER / LEFT JOINs.',
        icon: <LayoutGrid className="w-6 h-6 text-indigo-400" />,
        hoverTextClass: 'group-hover:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        progressClass: 'bg-indigo-500'
      },
      {
        id: 'data_manipulation' as ChallengeCategory,
        title: 'Data Manipulation',
        description: 'Modify records using INSERT, UPDATE, and DELETE.',
        icon: <PlusCircle className="w-6 h-6 text-rose-400" />,
        hoverTextClass: 'group-hover:text-rose-400',
        bgClass: 'bg-rose-500/10',
        progressClass: 'bg-rose-500'
      },
      {
        id: 'schema_management' as ChallengeCategory,
        title: 'Database Structure',
        description: 'Create and alter tables; build indexes for performance.',
        icon: <FileSearch className="w-6 h-6 text-amber-400" />,
        hoverTextClass: 'group-hover:text-amber-400',
        bgClass: 'bg-amber-500/10',
        progressClass: 'bg-amber-500'
      },
      {
        id: 'complex_queries' as ChallengeCategory,
        title: 'Real-world Scenarios',
        description: 'Combine multiple concepts to solve business cases like subqueries and complex joins.',
        icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
        hoverTextClass: 'group-hover:text-cyan-400',
        bgClass: 'bg-cyan-500/10',
        progressClass: 'bg-cyan-500'
      }
    ];

    return (
      <div className="h-screen bg-zinc-950 flex flex-col font-sans text-white max-w-md mx-auto w-full relative">
        <header className="p-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors mr-1"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="bg-indigo-600 p-1 rounded shadow-lg">
              <Database className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">SQL Drills</h1>
          </div>
          {DomainInfo && (
            <button 
              onClick={() => setShowDomainModal(true)}
              className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all rounded-full px-3 py-1 cursor-pointer"
            >
              <div className="text-indigo-400">
                {DomainInfo.icon}
              </div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{DomainInfo.label}</span>
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-8 flex flex-col pt-8 custom-scrollbar">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-white tracking-tight">Spaced Repetition</h2>
            <p className="text-sm text-zinc-400">Master SQL through continuous, adaptive practice.</p>
          </div>

          <button
            onClick={() => {
              if (!activeDomain) {
                setShowDomainModal(true);
                return;
              }
              startCategory('all');
            }}
            className="w-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 active:scale-95 transition-all rounded-3xl p-6 flex flex-col items-center justify-center group"
          >
            <div className="bg-indigo-500/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <RefreshCcw className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-indigo-300">Practice All Skills</h3>
            <p className="text-xs text-indigo-400/70 mt-2 uppercase tracking-widest font-bold">Recommended</p>
          </button>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-2">Focus on a Specific Category</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (!activeDomain) {
                      setShowDomainModal(true);
                      return;
                    }
                    startCategory(cat.id);
                  }}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-4 flex flex-col items-center text-center group"
                >
                  <div className={`${cat.bgClass} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h4 className={`text-sm font-bold text-zinc-300 ${cat.hoverTextClass} transition-colors`}>{cat.title}</h4>
                </button>
              ))}
            </div>
          </div>
        </main>

        <DomainSelectorModal 
          isOpen={showDomainModal}
          currentDomain={activeDomain || undefined}
          onSelect={(domain) => {
            onDomainChange(domain);
            setShowDomainModal(false);
          }}
          onClose={activeDomain ? () => setShowDomainModal(false) : undefined}
          isOnboarding={!activeDomain}
        />
      </div>
    );
  }

  if (!activeDomain || !isReady) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="font-mono text-sm text-zinc-500">Booting SQL Engine...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 font-sans text-white flex flex-col w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* 30% TOP: Problem Description */}
      <section className="h-[30%] flex flex-col bg-zinc-900 border-b border-zinc-800 pointer-events-auto">
        <header className="p-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
               onClick={() => setSelectedCategory(null)}
               className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors mr-1"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="bg-indigo-600 p-1 rounded shadow-lg">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Drill</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSyntaxOpen(true)}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors flex items-center justify-center"
            >
              <Code className="w-4 h-4 text-emerald-400" />
            </button>
            <button 
              onClick={() => setIsRefOpen(true)}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </header>
        
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-2 text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider">{currentChallenge?.title}</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {currentChallenge?.description}
          </p>
        </div>
      </section>

      {/* 40% MIDDLE: Text Area for SQL */}
      <section className="h-[40%] flex flex-col bg-zinc-950 relative">
        <textarea
          ref={editorRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="-- Write SQL here..."
          className="flex-1 w-full bg-transparent text-indigo-300 font-mono text-lg p-6 outline-none resize-none caret-white"
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
        />
        
        {/* Horizontal SQL Toolbar above keyboard area */}
        <SQLKeyboard onInsert={handleInsert} />
      </section>

      {/* 30% BOTTOM: Actions & Feedback */}
      <section className="h-[30%] flex flex-col bg-zinc-900/50 border-t border-zinc-800 overflow-y-auto no-scrollbar pb-6">
        <div className="p-4 grid grid-cols-6 gap-3">
          <button
            onClick={resetDb}
            title="Reset Database to Default"
            className="col-span-1 bg-zinc-800 hover:bg-rose-900/50 active:scale-95 transition-all rounded-xl flex items-center justify-center text-rose-400"
          >
            <ServerCrash className="w-5 h-5" />
          </button>
          <button
            onClick={handleRun}
            className="col-span-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RUN QUERY</span>
          </button>
          <button
            onClick={() => setQuery(currentChallenge?.initialQuery || '')}
            className="col-span-1 bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all rounded-xl flex items-center justify-center text-zinc-400"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 space-y-4">
          <QueryEvaluator 
            status={evalStatus}
            message={evalMessage}
          />

          <AnimatePresence>
            {showNext && currentChallenge && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={nextChallenge}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 group transition-all"
              >
                <span>NEXT DRILL</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            )}
          </AnimatePresence>

          {lastResults.length > 0 && (
            <div className="pb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Query Result</span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>
              <ResultsTable results={lastResults} />
            </div>
          )}
        </div>
      </section>

      {/* Slide-over Drawers */}
      <ReferenceSheet isOpen={isRefOpen} onClose={() => setIsRefOpen(false)} activeDomain={activeDomain} />
      <SyntaxGuide isOpen={isSyntaxOpen} onClose={() => setIsSyntaxOpen(false)} activeCategory={selectedCategory} />
    </div>
  );
}
