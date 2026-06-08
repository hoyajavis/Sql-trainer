import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Database, BookOpen, RefreshCcw, ChevronRight, GraduationCap, Code, ServerCrash, ArrowLeft, Trophy, CheckCircle2, ChevronDown, ChevronUp, Briefcase, FlaskConical, HeartPulse, PlaySquare, Plane, MapPin, BriefcaseBusiness } from 'lucide-react';
import Markdown from 'react-markdown';
import { useSQL } from '@/src/hooks/useSQL';
import { CHALLENGES, ChallengeDomain, SQLChallenge } from '@/src/types';
import SQLKeyboard from '@/src/components/SQLKeyboard';
import ResultsTable from '@/src/components/ResultsTable';
import ReferenceSheet from '@/src/components/ReferenceSheet';
import SyntaxGuide from '@/src/components/SyntaxGuide';
import QueryEvaluator from '@/src/components/QueryEvaluator';
import DomainSelectorModal from '@/src/components/DomainSelectorModal';
import GPData from '@/src/data/guidedPractice.json';

type EvalStatus = 'idle' | 'evaluating' | 'success' | 'fail' | 'error';

interface GuidedPracticeProps {
  onBack: () => void;
  activeDomain: ChallengeDomain | null;
  onDomainChange: (domain: ChallengeDomain) => void;
  addXp: (amount: number, msg: string) => void;
}

const PRAISE_MESSAGES = [
  "Fantastic!", "Spot on!", "Perfect query!", "You're a natural!", 
  "Nailed it!", "SQL Master!", "Excellent work!", "Query succeeded!"
];

export default function GuidedPractice({ onBack, activeDomain, onDomainChange, addXp }: GuidedPracticeProps) {
  const [showDomainModal, setShowDomainModal] = useState(activeDomain === null);
  
  // Track completions specifically for guided practice
  const [completedNodes, setCompletedNodes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sql_completed_guided');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const markAsCompleted = (pIdx: number, sIdx: number, isFirstTime: boolean) => {
    if (isFirstTime) {
      const id = `${pIdx}_${sIdx}`;
      const newCompleted = [...completedNodes, id];
      setCompletedNodes(newCompleted);
      localStorage.setItem('sql_completed_guided', JSON.stringify(newCompleted));
      addXp(15, "Lesson Complete!");
    }
  };

  const domainData = activeDomain && GPData[activeDomain as keyof typeof GPData] 
    ? GPData[activeDomain as keyof typeof GPData] 
    : null;

  // Which step the user is currently looking at
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const { isReady, lastResults, executeAndEvaluate, clearResults, resetDb } = useSQL(activeDomain);
  const [query, setQuery] = useState('');
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isSyntaxOpen, setIsSyntaxOpen] = useState(false);
  
  const [evalStatus, setEvalStatus] = useState<EvalStatus>('idle');
  const [evalMessage, setEvalMessage] = useState('');
  
  const [showNext, setShowNext] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

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

  // Derive the current active challenge and step from the ID
  let activeStep = null;
  let activeChallenge = null;
  let hasNextStep = false;
  let nextStepId: string | null = null;
  let activePIdx = -1;
  let activeSIdx = -1;
  
  if (domainData && activeStepId) {
    let found = false;
    for (let pIdx = 0; pIdx < domainData.passes.length; pIdx++) {
      const pass = domainData.passes[pIdx];
      for (let sIdx = 0; sIdx < pass.steps.length; sIdx++) {
        const s = pass.steps[sIdx];
        if (s.id === activeStepId) {
          activeStep = s;
          activePIdx = pIdx;
          activeSIdx = sIdx;
          activeChallenge = CHALLENGES.find(c => c.id === s.challenge_id);
          found = true;
          
          if (sIdx + 1 < pass.steps.length) {
             nextStepId = pass.steps[sIdx + 1].id;
             hasNextStep = true;
          } else if (pIdx + 1 < domainData.passes.length) {
             if (domainData.passes[pIdx + 1].steps.length > 0) {
               nextStepId = domainData.passes[pIdx + 1].steps[0].id;
               hasNextStep = true;
             }
          }
          break;
        }
      }
      if (found) break;
    }
  }

  // Derive whether we are in review mode
  const isReviewMode = activeStepId && activePIdx !== -1 ? completedNodes.includes(`${activePIdx}_${activeSIdx}`) : false;

  useEffect(() => {
    if (activeStep && activeChallenge) {
      setQuery(activeChallenge.initialQuery || '');
      setShowNext(false);
      setEvalStatus('idle');
      clearResults();
      
      // Auto-focus after render
      setTimeout(() => editorRef.current?.focus(), 100);
    }
  }, [activeStepId, activeStep, activeChallenge]);

  const handleRun = async () => {
    if (!activeChallenge) return;
    setEvalStatus('evaluating');
    setEvalMessage('Evaluating query...');
    setShowNext(false);

    // Artificial delay
    await new Promise(r => setTimeout(r, 400));

    const result = executeAndEvaluate(query, activeChallenge.solution, activeChallenge.verifyQuery);
    
    if (result.isValid) {
      const isFirstTime = !completedNodes.includes(`${activePIdx}_${activeSIdx}`);
      setEvalStatus('success');
      setEvalMessage(PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)] + (isFirstTime ? ' Earned XP!' : ''));
      setShowNext(true);
      
      markAsCompleted(activePIdx, activeSIdx, isFirstTime);
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
    
    const before = query.substring(0, start);
    const after = query.substring(end);
    const needSpaceBefore = start > 0 && !/[\s\n(]/.test(before[start-1]);
    const needSpaceAfter = end < query.length && !/[\s\n);,]/.test(after[0]);

    const insertion = (needSpaceBefore ? ' ' : '') + text + (needSpaceAfter ? ' ' : '');
    const newText = before + insertion + after;
    setQuery(newText);
    
    setTimeout(() => {
      editorRef.current?.focus();
      const pos = start + insertion.length;
      editorRef.current?.setSelectionRange(pos, pos);
    }, 0);
  }, [query]);

  const advanceStep = () => {
    if (nextStepId) {
      setActiveStepId(nextStepId);
    } else {
       addXp(100, "Domain Course Completed!");
       setActiveStepId(null);
    }
  };

  // Map View
  if (!activeStepId) {
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
            <div className="bg-amber-600 p-1 rounded shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Learn SQL</h1>
          </div>
          {DomainInfo && (
             <button 
               onClick={() => setShowDomainModal(true)}
               className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all rounded-full px-3 py-1 cursor-pointer"
             >
               <div className="text-amber-500">
                 {DomainInfo.icon}
               </div>
               <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{DomainInfo.label}</span>
             </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
          {!domainData ? (
             <div className="text-center mb-6 pt-4 space-y-4">
                <h2 className="text-amber-500 text-xl font-bold">Content Coming Soon</h2>
                <p className="text-sm text-zinc-400">Guided practice for {activeDomain} is not available yet.</p>
                <button
                  onClick={() => setShowDomainModal(true)}
                  className="px-4 py-2 bg-zinc-800 rounded-lg text-sm font-semibold"
                >
                  Switch Domain
                </button>
             </div>
          ) : (
            <>
              <div className="text-center mb-6 pt-4">
                <h2 className="text-2xl font-black mb-2 tracking-tight text-white">Guided Practice</h2>
                <p className="text-sm text-zinc-400 px-4">Master SQL concepts step-by-step through interactive lessons.</p>
              </div>

              <div className="space-y-6 pl-2">
                {domainData.passes.map((pass, pIdx) => (
                  <div key={pIdx} className="relative">
                    <h3 className="font-bold text-amber-500 text-sm tracking-wider uppercase mb-4">{pass.title}</h3>
                    <div className="absolute left-[11px] top-10 bottom-0 w-[2px] bg-zinc-800" />
                    
                    <div className="space-y-0 relative z-10">
                      {pass.steps.map((step, sIdx) => {
                         const stepIndexId = `${pIdx}_${sIdx}`;
                         const isCompleted = completedNodes.includes(stepIndexId);
                         
                         // Node is unlocked if it's the very first node OR if the previous node is completed
                         let isUnlocked = false;
                         if (pIdx === 0 && sIdx === 0) {
                           isUnlocked = true;
                         } else if (sIdx > 0) {
                           isUnlocked = completedNodes.includes(`${pIdx}_${sIdx - 1}`);
                         } else if (pIdx > 0) {
                           const prevPass = domainData.passes[pIdx - 1];
                           isUnlocked = completedNodes.includes(`${pIdx - 1}_${prevPass.steps.length - 1}`);
                         }

                         // Always unlock if we've completed this one already
                         if (isCompleted) isUnlocked = true;
                         
                         return (
                           <div key={step.id} className="relative flex items-center mb-4 min-h-[48px]">
                             <button
                               onClick={() => isUnlocked && setActiveStepId(step.id)}
                               disabled={!isUnlocked}
                               className={`
                                 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 
                                 z-10 transition-all ml-0
                                 ${isCompleted 
                                    ? 'bg-amber-500 border-amber-500 text-zinc-950' 
                                    : isUnlocked 
                                      ? 'bg-zinc-900 border-amber-500/50 hover:border-amber-500 hover:scale-110' 
                                      : 'bg-zinc-900 border-zinc-700 opacity-50'}
                               `}
                             >
                               {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                             </button>

                             <div className={`ml-6 flex-1 transition-all ${isUnlocked ? 'opacity-100' : 'opacity-40 select-none pointer-events-none'}`}>
                                <button
                                  onClick={() => isUnlocked && setActiveStepId(step.id)}
                                  className={`text-left w-full hover:bg-zinc-800/50 p-2 rounded-lg -ml-2 ${isCompleted ? 'text-zinc-300' : 'text-zinc-100 font-medium'}`}
                                >
                                  {step.title}
                                </button>
                             </div>
                           </div>
                         );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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

  // Active Step View
  if (!activeDomain || !isReady || !activeStep || !activeChallenge) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        <p className="font-mono text-sm text-zinc-500">Loading Step...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 font-sans text-white flex flex-col w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* 35% TOP: Lesson Content */}
      <section className="h-[35%] flex flex-col bg-zinc-900 border-b border-zinc-800 pointer-events-auto">
        <header className="p-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
               onClick={() => setActiveStepId(null)}
               className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors mr-1"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="bg-amber-600 p-1 rounded shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Guided Practice</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsRefOpen(true)}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <Database className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </header>
        
        {isReviewMode && (
          <div className="bg-amber-500/20 px-4 py-1.5 border-b border-amber-500/30 flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Review Mode</span>
          </div>
        )}

        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
          <h2 className="text-lg font-bold text-amber-400 mb-2">{activeStep.title}</h2>
          <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap markdown-body">
             <Markdown>{activeStep.lesson_content}</Markdown>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
             <div className="flex items-center gap-2 mb-2 text-emerald-400">
               <GraduationCap className="w-4 h-4" />
               <h3 className="text-xs font-bold uppercase tracking-wider">Challenge: {activeChallenge.title}</h3>
             </div>
             <p className="text-xs text-zinc-400 pl-6">
               {activeChallenge.description}
             </p>
          </div>
        </div>
      </section>

      {/* 35% MIDDLE: Text Area for SQL */}
      <section className="h-[35%] flex flex-col bg-zinc-950 relative">
        <textarea
          ref={editorRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="-- Write SQL here..."
          className="flex-1 w-full bg-transparent text-amber-100 font-mono text-lg p-6 outline-none resize-none caret-white"
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
        />
        
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
            className="col-span-4 bg-amber-600 hover:bg-amber-500 active:scale-95 transition-all text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-600/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RUN QUERY</span>
          </button>
          <button
            onClick={() => setQuery(activeChallenge!.initialQuery || '')}
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
            {showNext && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  if (isReviewMode) {
                    setActiveStepId(null);
                  } else {
                    advanceStep();
                  }
                }}
                className={`w-full ${isReviewMode ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 group transition-all`}
              >
                <span>{isReviewMode ? "BACK TO MAP" : (nextStepId ? "NEXT LESSON" : "COMPLETE COURSE")}</span>
                {!isReviewMode && <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
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
    </div>
  );
}
