import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Database, RefreshCcw, ArrowLeft, Download, Code2, Layers, Activity, Briefcase, FlaskConical, GraduationCap, HeartPulse, PlaySquare, Trophy, Plane, MapPin, BriefcaseBusiness } from 'lucide-react';
import { useSQL } from '@/src/hooks/useSQL';
import { ChallengeDomain } from '@/src/types';
import SQLKeyboard from '@/src/components/SQLKeyboard';
import ResultsTable from '@/src/components/ResultsTable';
import ReferenceSheet from '@/src/components/ReferenceSheet';
import DomainSelectorModal from '@/src/components/DomainSelectorModal';

interface SandboxProps {
  onBack: () => void;
  activeDomain: ChallengeDomain | null;
  onDomainChange: (domain: ChallengeDomain) => void;
}

export default function Sandbox({ onBack, activeDomain, onDomainChange }: SandboxProps) {
  const [showDomainModal, setShowDomainModal] = useState(activeDomain === null);
  const { isReady, lastResults, error, executionTimeMs, executeSandboxQuery, clearResults, resetDb } = useSQL(activeDomain);
  
  const [query, setQuery] = useState('');
  const [isRefOpen, setIsRefOpen] = useState(false);
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

  const handleRun = () => {
    if (!query.trim()) return;
    executeSandboxQuery(query);
  };

  const handleAnalyze = () => {
    if (!query.trim()) return;
    executeSandboxQuery(`EXPLAIN QUERY PLAN ${query}`);
  };

  const handleInsert = (text: string) => {
    if (!editorRef.current) return;
    const { selectionStart, selectionEnd } = editorRef.current;
    const newQuery = query.substring(0, selectionStart) + text + query.substring(selectionEnd);
    setQuery(newQuery);
    
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
      }
    }, 0);
  };

  const handleDownloadCsv = () => {
    if (!lastResults || lastResults.length === 0) return;
    const res = lastResults[0];
    const header = res.columns.join(',');
    const rows = res.values.map((row: any[]) => 
      row.map(cell => typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell).join(',')
    );
    const csvContext = [header, ...rows].join('\n');
    const blob = new Blob([csvContext], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      if (lines.length === 0) return;

      const headers = lines[0].split(',').map(h => h.trim().replace(/[^a-zA-Z0-9_]/g, '') || 'col');
      const tableName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_]/g, '') || 'custom_table';
      
      let createSql = `CREATE TABLE ${tableName} (\n  ${headers.map(h => `${h} TEXT`).join(',\n  ')}\n);`;
      let insertSql = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n`;
      
      const values = [];
      for (let i = 1; i < lines.length; i++) {
         const cols = lines[i].split(',').map(c => `'${c.trim().replace(/'/g, "''")}'`);
         values.push(`(${cols.join(', ')})`);
      }
      insertSql += values.join(',\n') + ';';
      
      const fullSql = `${createSql}\n\n${insertSql}`;
      setQuery(fullSql);
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="absolute inset-0 bg-zinc-950 flex flex-col z-20 h-[100dvh] overflow-hidden">
      {/* HEADER */}
      <header className="h-[10%] flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900 shadow-md z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-full text-zinc-300">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-rose-400">
            <Code2 className="w-5 h-5" />
            <h1 className="font-bold text-lg hidden sm:block">Sandbox</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
             type="file" 
             accept=".csv" 
             className="hidden" 
             ref={fileInputRef} 
             onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            title="Import CSV"
            className="hidden sm:flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors px-3 py-1.5 rounded-full border border-emerald-500/20"
          >
            <Download className="w-4 h-4 rotate-180" />
            <span className="text-xs font-medium">Import CSV</span>
          </button>
          
          <button 
            onClick={() => setShowDomainModal(true)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors px-3 py-1.5 rounded-full border border-zinc-700"
          >
            {DomainInfo ? DomainInfo.icon : <Layers className="w-4 h-4 text-zinc-400" />}
            <span className="text-xs font-medium text-zinc-300 capitalize">{DomainInfo ? DomainInfo.label : 'Select Domain'}</span>
          </button>
          <button 
            onClick={() => setIsRefOpen(true)}
            className="p-2 border border-zinc-700 hover:bg-zinc-800 transition-colors rounded-xl text-zinc-400"
          >
            <Database className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* DOMAIN SELECTOR MODAL */}
      {showDomainModal && (
        <DomainSelectorModal 
          currentDomain={activeDomain}
          onSelect={(d) => {
             onDomainChange(d);
             setShowDomainModal(false);
          }}
          onClose={activeDomain !== null ? () => setShowDomainModal(false) : undefined}
        />
      )}

      {/* WORKSPACE AREA */}
      <div className="flex-1 flex flex-col h-[90%] relative">
        
        {/* EDITOR SPLIT */}
        <section className="h-[40%] flex flex-col relative bg-zinc-950">
          <textarea
            ref={editorRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="-- Write SQL here to experiment..."
            className="flex-1 w-full bg-transparent text-rose-300 font-mono text-lg p-6 outline-none resize-none caret-white"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
          />
          {/* Toolbar above keyboard area */}
          <SQLKeyboard onInsert={handleInsert} />
        </section>

        {/* CONTROLS SPLIT */}
        <section className="h-[15%] flex flex-col border-y border-zinc-800 bg-zinc-900/50 justify-center">
            <div className="px-4 py-2 flex items-center justify-between gap-3">
                <button
                    onClick={resetDb}
                    title="Reset Database to Default"
                    className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl shrink-0"
                >
                    <RefreshCcw className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={handleAnalyze}
                    className="flex-[0.4] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
                >
                    <Activity className="w-4 h-4" />
                    <span>Analyze</span>
                </button>

                <button 
                    onClick={handleRun}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 transition-all"
                >
                    <Play className="w-5 h-5" fill="currentColor" />
                    <span>Run Query</span>
                </button>
            </div>
        </section>

        {/* RESULTS SPLIT */}
        <section className="h-[45%] flex flex-col bg-zinc-950 overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
             <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Results</span>
             {lastResults.length > 0 && (
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                    <span>Rows: <strong className="text-zinc-300">{lastResults[0]?.values?.length || 0}</strong></span>
                    {executionTimeMs !== null && (
                      <span>Time: <strong className="text-rose-400">{executionTimeMs.toFixed(1)}ms</strong></span>
                    )}
                    <button 
                       onClick={handleDownloadCsv}
                       className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors block ml-2"
                       title="Download as CSV"
                    >
                       <Download className="w-4 h-4" />
                    </button>
                </div>
             )}
          </div>
          <div className="p-4 flex-1 overflow-auto no-scrollbar">
              {error ? (
                 <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl whitespace-pre-wrap font-mono text-sm">
                   {error}
                 </div>
              ) : (
                lastResults.length > 0 ? (
                  <ResultsTable results={lastResults} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                     <Code2 className="w-12 h-12 opacity-20" />
                     <p className="border border-zinc-800 px-4 py-2 rounded-full text-sm">No results to display</p>
                  </div>
                )
              )}
          </div>
        </section>

      </div>

      {isRefOpen && activeDomain && (
        <ReferenceSheet domain={activeDomain} onClose={() => setIsRefOpen(false)} />
      )}
    </div>
  );
}
