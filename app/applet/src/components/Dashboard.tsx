import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Target, BookOpen, BrainCircuit, Activity, BarChart3, Search, LayoutGrid, PlusCircle, FileSearch } from 'lucide-react';
import CHALLENGES from '@/src/data/challenges.json';
import GUIDED_PRACTICE from '@/src/data/guidedPractice.json';
import { CONCEPTS_GENERAL, CONCEPTS_EXCEL } from '@/src/types';

interface DashboardProps {
  onBack: () => void;
  xp: number;
}

export default function Dashboard({ onBack, xp }: DashboardProps) {
  const currentLevel = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  
  const metrics = useMemo(() => {
    // 1. Gather all concepts
    const totalConcepts = CONCEPTS_GENERAL.length + CONCEPTS_EXCEL.length;
    let completedConceptsCount = 0;
    try {
      const cc = JSON.parse(localStorage.getItem('sql_completed_concepts') || '[]');
      completedConceptsCount = cc.length;
    } catch {}

    // 2. Gather Guided Practice
    let totalGuided = 0;
    const domainActivity: Record<string, number> = {};
    const gpDomainTotals: Record<string, number> = {};
    Object.keys(GUIDED_PRACTICE).forEach(domain => {
      domainActivity[domain] = 0;
      gpDomainTotals[domain] = 0;
      const gpDomain = (GUIDED_PRACTICE as any)[domain];
      gpDomain.passes.forEach((pass: any) => {
        totalGuided += pass.steps.length;
        gpDomainTotals[domain] += pass.steps.length;
      });
    });

    let completedGuidedCount = 0;
    const gpDomainCompleted: Record<string, number> = {};
    Object.keys(GUIDED_PRACTICE).forEach(d => gpDomainCompleted[d] = 0);

    try {
      const cg = JSON.parse(localStorage.getItem('sql_completed_guided') || '[]');
      completedGuidedCount = cg.length;
      
      // Update Domain Activity for guided
      cg.forEach((stepId: string) => {
         // Step IDs are usually gp_domain_x_y
         const parts = stepId.split('_');
         if (parts.length >= 2) {
            let domainHint = parts[1];
            // Just lookup from gp definitions:
            for(const [domain, ds] of Object.entries(GUIDED_PRACTICE)) {
                 for(const pass of (ds as any).passes) {
                     if (pass.steps.some((s: any) => s.id === stepId)) {
                          domainActivity[domain] += 1;
                          gpDomainCompleted[domain] += 1;
                          break;
                     }
                 }
            }
         }
      });
    } catch {}

    let highestGPDomain = 'business';
    let highestGPCount = -1;
    Object.entries(gpDomainCompleted).forEach(([domain, count]) => {
         if (count > highestGPCount) {
             highestGPCount = count;
             highestGPDomain = domain;
         }
    });
    
    if (highestGPCount === 0) {
        highestGPDomain = 'business';
    }

    const highestGPObj = {
         name: highestGPDomain,
         completed: gpDomainCompleted[highestGPDomain] || 0,
         total: gpDomainTotals[highestGPDomain] || 1
    };
    
    const otherGPObj = {
         completed: completedGuidedCount - (gpDomainCompleted[highestGPDomain] || 0),
         total: Math.max(totalGuided - (gpDomainTotals[highestGPDomain] || 0), 1)
    };

    // 3. Gather Drills
    const totalDrillChallenges = CHALLENGES.length;
    let totalDrillReps = 0;
    let uniqueDrillsSeen = 0;
    let masteredDrills = 0;
    
    const repsByCategory: Record<string, number> = {
      basic_queries: 0,
      aggregations_joins: 0,
      data_manipulation: 0,
      schema_management: 0,
      complex_queries: 0
    };

    const getCategoryMapping = (category: string) => {
        if (category === 'aggregations' || category === 'joins') return 'aggregations_joins';
        if (category === 'data_modification') return 'data_manipulation';
        return category;
    };
    
    try {
      const cd = JSON.parse(localStorage.getItem('sql_completed_drills') || '{}');
      if (!Array.isArray(cd)) {
          Object.entries(cd).forEach(([chalId, count]) => {
              const countNum = count as number;
              totalDrillReps += countNum;
              uniqueDrillsSeen += 1;
              if (countNum >= 3) masteredDrills += 1;
              
              // Find domain for this challenge
              const chal = CHALLENGES.find((c: any) => c.id === chalId);
              if (chal) {
                 if (chal.domain && domainActivity[chal.domain] !== undefined) {
                    domainActivity[chal.domain] += countNum; // weighted by reps
                 }
                 if (chal.category) {
                    const mappedCat = getCategoryMapping(chal.category);
                    if (repsByCategory[mappedCat] !== undefined) {
                        repsByCategory[mappedCat] += countNum;
                    } else {
                        repsByCategory[mappedCat] = countNum;
                    }
                 }
              }
          });
      }
    } catch {}
    
    // Sort Domain Affinity
    const sortedDomains = Object.entries(domainActivity)
        .sort((a, b) => b[1] - a[1])
        .filter(d => d[1] > 0);

    return {
       totalConcepts,
       completedConceptsCount,
       totalGuided,
       completedGuidedCount,
       highestGPObj,
       otherGPObj,
       totalDrillChallenges,
       totalDrillReps,
       uniqueDrillsSeen,
       masteredDrills,
       sortedDomains,
       repsByCategory
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col text-white relative">
      <header className="flex items-center gap-4 p-4 z-20 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800/50 sticky top-0">
        <button onClick={onBack} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Learner Dashboard
        </h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-5 pb-12 space-y-8 custom-scrollbar">
          
          {/* Global XP & Level */}
          <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1">Global Progress</h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                  
                  <div className="flex items-center justify-center gap-6 mb-4">
                      <div className="relative">
                          <svg className="w-24 h-24 transform -rotate-90">
                              <circle className="text-zinc-800" strokeWidth="6" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" />
                              <circle className="text-amber-500 transition-all duration-1000 ease-out" strokeWidth="6" strokeDasharray="264" strokeDashoffset={264 - (264 * xpInLevel) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <Trophy className="w-6 h-6 text-amber-500 mb-1" />
                              <span className="font-bold text-xl leading-none">{currentLevel}</span>
                          </div>
                      </div>
                      
                      <div className="flex flex-col text-left">
                          <span className="text-sm font-medium text-zinc-400">Total XP</span>
                          <span className="text-3xl font-bold tracking-tight">{xp}</span>
                          <span className="text-xs text-amber-500 font-medium mt-1">{100 - xpInLevel} XP to next level</span>
                      </div>
                  </div>
              </div>
          </section>

          {/* Core Tracks Overview */}
          <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1">Curriculum Completion</h2>
              <div className="grid grid-cols-2 gap-3">
                  
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center text-center">
                      <div className="bg-emerald-500/10 p-3 rounded-xl mb-3">
                        <BookOpen className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-300">Learn SQL</h3>
                      <p className="text-xs text-zinc-500 mt-1 mb-3">Guided Practice</p>
                      
                      <div className="w-full space-y-3 mt-1">
                          <div>
                              <div className="flex justify-between text-[10px] font-bold text-zinc-500 mb-1">
                                  <span className="capitalize">{metrics.highestGPObj.name.replace('_', ' ')}</span>
                                  <span>{metrics.highestGPObj.completed} / {metrics.highestGPObj.total}</span>
                              </div>
                              <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(metrics.highestGPObj.completed / Math.max(metrics.highestGPObj.total, 1)) * 100}%` }} />
                              </div>
                          </div>
                          
                          <div>
                              <div className="flex justify-between text-[10px] font-bold text-zinc-500 mb-1">
                                  <span>All Other Domains</span>
                                  <span>{metrics.otherGPObj.completed} / {metrics.otherGPObj.total}</span>
                              </div>
                              <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-700/50 rounded-full transition-all duration-1000" style={{ width: `${(metrics.otherGPObj.completed / Math.max(metrics.otherGPObj.total, 1)) * 100}%` }} />
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center text-center h-full">
                      <div className="bg-amber-500/10 p-3 rounded-xl mb-3">
                        <Target className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-300">Concepts</h3>
                      <p className="text-xs text-zinc-500 mt-1 mb-3">Flashcards</p>
                      <div className="w-full mt-auto">
                          <div className="flex justify-between text-[10px] font-bold text-zinc-500 mb-1">
                              <span>{metrics.completedConceptsCount}</span>
                              <span>{metrics.totalConcepts}</span>
                          </div>
                          <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${(metrics.completedConceptsCount / Math.max(metrics.totalConcepts, 1)) * 100}%` }} />
                          </div>
                      </div>
                  </div>

              </div>
          </section>

          {/* Spaced Repetition Stats */}
          <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1">Spaced Repetition (Drills)</h2>
              <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-3xl p-6">
                 <div className="flex items-center gap-3 mb-6">
                     <div className="bg-indigo-500/20 p-2 rounded-lg">
                        <BrainCircuit className="w-5 h-5 text-indigo-400" />
                     </div>
                     <p className="text-sm text-indigo-100/70">Continuous practice builds long-term retention.</p>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 divide-x divide-zinc-800 mb-6">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-2xl font-bold text-indigo-400">{metrics.totalDrillReps}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Total Reps</span>
                    </div>
                    <div className="flex flex-col items-center text-center pl-4">
                        <span className="text-2xl font-bold text-zinc-200">{metrics.uniqueDrillsSeen}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Unique Drills</span>
                    </div>
                    <div className="flex flex-col items-center text-center pl-4">
                        <span className="text-2xl font-bold text-emerald-400">{metrics.masteredDrills}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Mastered (3+)</span>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-indigo-500/10">
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 text-center">Focus Areas</h3>
                     <div className="grid grid-cols-2 gap-3">
                         {[
                             { id: 'basic_queries', title: 'Basic Queries', icon: <Search className="w-4 h-4 text-emerald-400" />, bg: 'bg-emerald-500/10' },
                             { id: 'aggregations_joins', title: 'Aggregations & Joins', icon: <LayoutGrid className="w-4 h-4 text-indigo-400" />, bg: 'bg-indigo-500/10' },
                             { id: 'data_manipulation', title: 'Data Manipulation', icon: <PlusCircle className="w-4 h-4 text-rose-400" />, bg: 'bg-rose-500/10' },
                             { id: 'schema_management', title: 'Database Structure', icon: <FileSearch className="w-4 h-4 text-amber-400" />, bg: 'bg-amber-500/10' },
                             { id: 'complex_queries', title: 'Real-world Scenarios', icon: <BookOpen className="w-4 h-4 text-cyan-400" />, bg: 'bg-cyan-500/10' }
                         ].map(cat => (
                             <div key={cat.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col lg:flex-row items-center sm:items-start lg:items-center gap-3">
                                 <div className={`${cat.bg} p-2.5 rounded-xl shrink-0`}>
                                     {cat.icon}
                                 </div>
                                 <div className="flex flex-col text-center lg:text-left">
                                     <span className="text-sm font-bold text-zinc-300">{cat.title}</span>
                                     <span className="text-xs text-zinc-500 mt-0.5">{metrics.repsByCategory[cat.id] || 0} reps</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
              </div>
          </section>

          {/* Domain Affinity */}
          <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1 flex items-center gap-2">
                 <BarChart3 className="w-4 h-4" />
                 Domain Affinities
              </h2>
              {metrics.sortedDomains.length === 0 ? (
                  <p className="text-sm text-zinc-500 p-4 border border-dashed border-zinc-800 rounded-2xl text-center">
                     Complete lessons and drills to discover your domain affinities.
                  </p>
              ) : (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4">
                      {metrics.sortedDomains.map(([domain, score], idx) => {
                          const maxScore = metrics.sortedDomains[0][1];
                          const widthPct = Math.max((score / maxScore) * 100, 5);
                          return (
                              <div key={domain} className="space-y-1.5">
                                  <div className="flex justify-between text-xs font-medium">
                                      <span className="capitalize text-zinc-300">{domain.replace('_', ' ')}</span>
                                      <span className="text-zinc-500">{score} interactions</span>
                                  </div>
                                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${idx === 0 ? 'bg-indigo-500' : 'bg-zinc-700'}`} 
                                        style={{ width: `${widthPct}%` }}
                                      />
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              )}
          </section>

      </main>
    </div>
  );
}
