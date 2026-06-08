import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, ChevronRight, Calculator, BookOpen } from 'lucide-react';
import { CONCEPTS_EXCEL, CONCEPTS_GENERAL, ConceptQuestion } from '@/src/types';

interface ConceptsProps {
  onBack: () => void;
  addXp: (amount: number, msg: string) => void;
}

type ConceptMode = 'excel' | 'general' | null;

const PRAISE_MESSAGES = [
  "Brilliant!", "Spot on!", "Exactly right!", "You got it!", 
  "Perfect!", "Great understanding!", "Knowledge is power!", "Correct!"
];

export default function Concepts({ onBack, addXp }: ConceptsProps) {
  const [mode, setMode] = useState<ConceptMode>(null);
  const [sessionQuestions, setSessionQuestions] = useState<ConceptQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize from local storage
  const [completedConcepts, setCompletedConcepts] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sql_completed_concepts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Function to save to local storage
  const markAsCompleted = (id: string, isFirstTime: boolean) => {
    if (isFirstTime) {
      const newCompleted = [...completedConcepts, id];
      setCompletedConcepts(newCompleted);
      localStorage.setItem('sql_completed_concepts', JSON.stringify(newCompleted));
    }
  };

  const startSession = (selectedMode: 'excel' | 'general') => {
    setMode(selectedMode);
    
    const source = selectedMode === 'excel' ? CONCEPTS_EXCEL : CONCEPTS_GENERAL;
    
    // Group questions by difficulty
    const byDifficulty: Record<number, ConceptQuestion[]> = {};
    for (const q of source) {
      if (!byDifficulty[q.difficulty]) byDifficulty[q.difficulty] = [];
      byDifficulty[q.difficulty].push(q);
    }

    // Select 2 random questions from each difficulty (levels 1 to 5)
    // to create a progression, prioritizing unseen questions
    const selected: ConceptQuestion[] = [];
    for (let level = 1; level <= 5; level++) {
      if (byDifficulty[level]) {
        const pool = byDifficulty[level];
        const unseen = pool.filter(q => !completedConcepts.includes(q.id));
        const seen = pool.filter(q => completedConcepts.includes(q.id));
        
        // Shuffle both
        const shuffledUnseen = [...unseen].sort(() => 0.5 - Math.random());
        const shuffledSeen = [...seen].sort(() => 0.5 - Math.random());
        
        // Prioritize unseen, fill with seen if needed
        const combined = [...shuffledUnseen, ...shuffledSeen];
        selected.push(...combined.slice(0, 2)); 
      }
    }
    
    setSessionQuestions(selected);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const question = sessionQuestions[currentIdx];

  const isCorrect = selectedAnswer === question?.answer;

  const handleSelect = (idx: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(idx);
    setShowExplanation(true);
    
    if (idx === question.answer) {
      const isFirstTime = !completedConcepts.includes(question.id);
      if (isFirstTime) {
        addXp(10, PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)]);
      }
      markAsCompleted(question.id, isFirstTime);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentIdx < sessionQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished
      addXp(25, "Session Complete!");
      setMode(null);
      setSessionQuestions([]);
      setCurrentIdx(0);
    }
  };

  if (!mode) {
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
            <div className="bg-emerald-600 p-1 rounded shadow-lg">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Concept Selection</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-center">
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">Choose Your Path</h2>
                <p className="text-sm text-zinc-400">How do you prefer to learn SQL concepts?</p>
            </div>

            <button
                onClick={() => startSession('excel')}
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group flex items-start text-left"
            >
                <div className="bg-emerald-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">Excel Analogies</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    Connect SQL concepts to spreadsheet features like VLOOKUP, Filters, and Pivot Tables.
                </p>
                </div>
            </button>

            <button
                onClick={() => startSession('general')}
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group flex items-start text-left"
            >
                <div className="bg-indigo-500/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">No Prior Knowledge</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    Start from the beginning using straightforward real-world analogies like filing cabinets.
                </p>
                </div>
            </button>

            <div className="pt-6 border-t border-zinc-800/50 mt-4">
              <h3 className="text-sm font-bold text-zinc-300 mb-4 tracking-wide uppercase">Your Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-400 mb-2">
                    <span>Excel Analogies ({CONCEPTS_EXCEL.filter(q => completedConcepts.includes(q.id)).length}/{CONCEPTS_EXCEL.length})</span>
                    <span className="text-emerald-400">{Math.round((CONCEPTS_EXCEL.filter(q => completedConcepts.includes(q.id)).length / CONCEPTS_EXCEL.length) * 100) || 0}%</span>
                  </div>
                  <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.round((CONCEPTS_EXCEL.filter(q => completedConcepts.includes(q.id)).length / CONCEPTS_EXCEL.length) * 100) || 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-400 mb-2">
                    <span>No Prior Knowledge ({CONCEPTS_GENERAL.filter(q => completedConcepts.includes(q.id)).length}/{CONCEPTS_GENERAL.length})</span>
                    <span className="text-indigo-400">{Math.round((CONCEPTS_GENERAL.filter(q => completedConcepts.includes(q.id)).length / CONCEPTS_GENERAL.length) * 100) || 0}%</span>
                  </div>
                  <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.round((CONCEPTS_GENERAL.filter(q => completedConcepts.includes(q.id)).length / CONCEPTS_GENERAL.length) * 100) || 0}%` }} />
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 flex flex-col font-sans text-white max-w-md mx-auto w-full relative">
      <header className="p-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(null)}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors mr-1"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div className="bg-emerald-600 p-1 rounded shadow-lg">
             {mode === 'excel' ? <Calculator className="w-4 h-4 text-white" /> : <BookOpen className="w-4 h-4 text-white" />}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Concept {currentIdx + 1}/{sessionQuestions.length}</h1>
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Lvl {question?.difficulty}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Question Area */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold leading-relaxed">{question.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = idx === question.answer;
            
            let buttonClass = "w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden ";
            
            if (selectedAnswer === null) {
              buttonClass += "bg-zinc-900 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80";
            } else if (isCorrectOption) {
              buttonClass += "bg-emerald-950/40 border-emerald-500/50 text-emerald-100";
            } else if (isSelected && !isCorrectOption) {
              buttonClass += "bg-rose-950/40 border-rose-500/50 text-rose-100";
            } else {
              buttonClass += "bg-zinc-900/50 border-zinc-800/50 text-zinc-600 opacity-50";
            }

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelect(idx)}
                className={buttonClass}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border ${selectedAnswer === null ? 'border-zinc-700' : isCorrectOption ? 'border-emerald-500 bg-emerald-500/20' : isSelected ? 'border-rose-500 bg-rose-500/20' : 'border-zinc-800'}`}>
                     {selectedAnswer !== null && isCorrectOption && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                     {selectedAnswer !== null && isSelected && !isCorrectOption && <XCircle className="w-3 h-3 text-rose-400" />}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-zinc-800"
            >
              <div className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-200' : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">Explanation</h3>
                <p className="text-sm leading-relaxed">{question.explanation}</p>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
              >
                <span>{currentIdx < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Practice'}</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
