import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { LESSONS } from '@/src/data/lessonsData';

interface LessonsProps {
  onBack: () => void;
  addXp: (amount: number, msg: string) => void;
}

const highlightSQL = (sql: string) => {
  const keywords = /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|DISTINCT|INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN|ON|CREATE TABLE|ALTER TABLE|DROP TABLE|TRUNCATE TABLE|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|DELETE|CREATE VIEW|DROP VIEW|CREATE INDEX|DROP INDEX|PRIMARY KEY|FOREIGN KEY|CHECK|REFERENCES|ADD|DROP|CHANGE|MODIFY|AS|AND|OR|IN|BETWEEN|IS NULL|IF EXISTS|AUTO_INCREMENT|NOT NULL|NULL|DEFAULT|UNSIGNED|SIGNED|INTEGER|REAL|TEXT|DECIMAL|VARCHAR|CHAR|INT|BIGINT|BOOLEAN|DATE|TIMESTAMP|WITH|UNION|ALL|CASE|WHEN|THEN|ELSE|END|EXISTS|ANY|ALL|OVER|PARTITION BY|OFFSET|COALESCE|IFNULL|CONSTRAINT|RENAME|TO|COLUMN|DATE_FORMAT|CURDATE|NOW|INTERVAL)\b/g;
  const formatted = sql.replace(keywords, '<span class="text-emerald-400 font-bold">$1</span>');
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export default function Lessons({ onBack, addXp }: LessonsProps) {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('sql_completed_lessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const openLesson = (id: string) => {
    setActiveLesson(id);
    setCurrentPage(0);
  };

  const markAsCompleted = (id: string) => {
    if (!completedLessons.includes(id)) {
      const newCompleted = [...completedLessons, id];
      setCompletedLessons(newCompleted);
      localStorage.setItem('sql_completed_lessons', JSON.stringify(newCompleted));
      addXp(20, 'Lesson Completed!');
    }
    setActiveLesson(null);
  };

  if (activeLesson) {
    const lesson = LESSONS.find(l => l.id === activeLesson);
    if (!lesson) return null;

    const page = lesson.pages[currentPage];
    const isLastPage = currentPage === lesson.pages.length - 1;

    return (
      <div className="h-screen flex flex-col bg-zinc-950 p-6 text-white overflow-hidden relative">
        <header className="flex items-center mb-6 pt-2 z-10 shrink-0">
          <button 
            onClick={() => setActiveLesson(null)}
            className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-800 hover:text-white text-zinc-400 transition-all font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="ml-4 flex-1">
            <h1 className="font-bold tracking-tight text-lg leading-tight truncate">{lesson.title}</h1>
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mt-1">
              Part {currentPage + 1} of {lesson.pages.length}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full max-w-sm mx-auto pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              {page.title && (
                <h2 className="text-xl font-black text-amber-400 mb-6">{page.title}</h2>
              )}

              <div className="space-y-6">
                {page.blocks.map((block, idx) => {
                  if (block.type === 'text') {
                    return <p key={idx} className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{block.content}</p>;
                  }
                  if (block.type === 'code') {
                    return (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-xs overflow-x-auto whitespace-pre shadow-md">
                        {highlightSQL(block.content)}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent z-10">
          <div className="w-full max-w-sm mx-auto flex gap-3">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-14 h-14 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-800/80 rounded-2xl flex items-center justify-center transition-all shrink-0"
              >
                <ChevronLeft className="w-6 h-6 text-zinc-300" />
              </button>
            )}

            {isLastPage ? (
              <button
                onClick={() => markAsCompleted(lesson.id)}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold h-14 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Finish
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex-1 bg-zinc-100 hover:bg-white text-zinc-900 font-bold h-14 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 p-6 text-white overflow-hidden relative">
      <header className="flex items-center mb-8 pt-2 z-10 shrink-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-800 hover:text-white text-zinc-400 transition-all font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="ml-4 font-bold tracking-tight text-lg">Learn SQL</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-8 w-full max-w-sm mx-auto z-10">
        <div className="space-y-4">
          {LESSONS.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                onClick={() => openLesson(lesson.id)}
                className="w-full text-left bg-zinc-900 border border-zinc-800 hover:border-zinc-500/50 hover:bg-zinc-800/80 transition-all rounded-2xl p-5 group relative overflow-hidden flex flex-col"
              >
                {isCompleted && (
                  <div className="absolute top-0 right-0 p-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${isCompleted ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-zinc-100">{lesson.title}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-snug pr-8">{lesson.description}</p>
                <div className="mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  {lesson.pages.length} Parts
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
