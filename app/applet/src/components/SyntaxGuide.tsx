import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code2, Search, LayoutGrid, PlusCircle, FileSearch, Info } from 'lucide-react';

interface SyntaxGuideProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: string | null;
}

export default function SyntaxGuide({ isOpen, onClose, activeCategory }: SyntaxGuideProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'agg_join' | 'manipulation' | 'structure' | 'complex'>('basic');

  useEffect(() => {
    if (activeCategory && isOpen) {
      if (activeCategory === 'basic_queries') setActiveTab('basic');
      else if (activeCategory === 'aggregations_joins') setActiveTab('agg_join');
      else if (activeCategory === 'data_manipulation') setActiveTab('manipulation');
      else if (activeCategory === 'schema_management') setActiveTab('structure');
      else if (activeCategory === 'complex_queries') setActiveTab('complex');
    }
  }, [activeCategory, isOpen]);

  const highlightSQL = (sql: string) => {
    const keywords = /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|DISTINCT|INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN|ON|CREATE TABLE|ALTER TABLE|DROP TABLE|TRUNCATE TABLE|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|DELETE|CREATE VIEW|DROP VIEW|CREATE INDEX|DROP INDEX|PRIMARY KEY|FOREIGN KEY|CHECK|REFERENCES|ADD|DROP|CHANGE|MODIFY|AS|AND|OR|IN|BETWEEN|IS NULL|IF EXISTS|AUTO_INCREMENT|NOT NULL|NULL|DEFAULT|UNSIGNED|SIGNED|INTEGER|REAL|TEXT|DECIMAL|VARCHAR|CHAR|INT|BIGINT|BOOLEAN|DATE|TIMESTAMP|WITH|UNION|ALL|CASE|WHEN|THEN|ELSE|END|EXISTS|ANY|ALL|OVER|PARTITION BY|OFFSET|COALESCE|IFNULL|CONSTRAINT|RENAME|TO|COLUMN|DATE_FORMAT|CURDATE|NOW|INTERVAL)\b/g;
    const formatted = sql.replace(keywords, '<span class="text-emerald-400 font-bold">$1</span>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  const tabs = [
    { id: 'basic', label: 'Basic', icon: Search },
    { id: 'agg_join', label: 'Joins', icon: LayoutGrid },
    { id: 'manipulation', label: 'Data', icon: PlusCircle },
    { id: 'structure', label: 'Schema', icon: FileSearch },
    { id: 'complex', label: 'Advanced', icon: Code2 },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 bg-zinc-950 w-full max-w-md shadow-2xl z-50 flex flex-col border-l border-zinc-800"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-950 p-4 border-b border-zinc-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-100">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-base">SQL Syntax Guide</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs Grid */}
              <div className="grid grid-cols-5 gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-zinc-800/50'
                      }`}
                    >
                      <TabIcon className="w-4 h-4 mb-1" />
                      <span className="text-[10px] font-medium text-center truncate w-full">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar pb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {activeTab === 'basic' && (
                    <>
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <Search className="w-3.5 h-3.5" /> Select Queries
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Standard Select</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre">
                              {highlightSQL('SELECT * FROM table_name;')}
                            </pre>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Complete Query Structure</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`SELECT DISTINCT column_1, column_2, ... \nFROM table_name \nWHERE condition \nGROUP BY column \nHAVING condition \nORDER BY column [ASC|DESC] \nLIMIT number;`)}
                            </pre>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Join in Select</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`SELECT a.column_x, b.column_y \nFROM table1 AS a \n[INNER | LEFT | RIGHT] JOIN table2 AS b \nON a.column_name = b.column_name;`)}
                            </pre>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Filtering Helpers</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-md">
                          <ul className="text-xs font-mono text-zinc-400 space-y-3">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">LIKE '%a%'</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Matches values with "a" anywhere (wildcard).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">IN (val1, val2)</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Matches any value within a specified list.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">BETWEEN x AND y</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Matches values within an inclusive range.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">IS NULL</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Checks for missing or empty database values.</span>
                            </li>
                          </ul>
                        </div>
                      </section>
                    </>
                  )}

                  {activeTab === 'agg_join' && (
                    <>
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <LayoutGrid className="w-3.5 h-3.5" /> Aggregate Functions
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-md">
                            <ul className="text-xs font-mono text-zinc-400 space-y-2">
                              <li><span className="text-emerald-300 font-bold">COUNT(column)</span> - Counts the number of non-null rows</li>
                              <li><span className="text-emerald-300 font-bold">SUM(column)</span> - Sums the numeric values</li>
                              <li><span className="text-emerald-300 font-bold">AVG(column)</span> - Calculates the average value</li>
                              <li><span className="text-emerald-300 font-bold">MIN(column)</span> - Identifies the minimum value</li>
                              <li><span className="text-emerald-300 font-bold">MAX(column)</span> - Identifies the maximum value</li>
                            </ul>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Aggregate & Filtering Example</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`SELECT COUNT(column) \nFROM table_name \nWHERE condition \nHAVING MAX(column) condition;`)}
                            </pre>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Table Joins</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Join Queries Syntax</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`SELECT a.column_x, b.column_y \nFROM table1 AS a \n[INNER | LEFT | RIGHT] JOIN table2 AS b \nON a.column_name = b.column_name;`)}
                          </pre>
                        </div>
                      </section>
                    </>
                  )}

                  {activeTab === 'manipulation' && (
                    <>
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <PlusCircle className="w-3.5 h-3.5" /> Insert Data
                        </h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">INSERT Syntax</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`INSERT INTO table_name (column_1, column_2, ..., column_n) VALUES \n(value1_row1, value2_row1, ..., valuen_row1), \n(value1_row2, value2_row2, ..., valuen_row2), \n...;`)}
                          </pre>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Update Data</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">UPDATE Syntax</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`UPDATE table_name \nSET column_1 = value1, column_2 = value2 \nWHERE condition;`)}
                          </pre>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Delete Data</h4>
                        <div className="space-y-3">
                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Truncate Entire Table</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`DELETE FROM table_name;`)}
                            </pre>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Conditional Deletion</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`DELETE FROM table_name \nWHERE column_name operator value [AND/OR other_conditions];`)}
                            </pre>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {activeTab === 'structure' && (
                    <>
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <FileSearch className="w-3.5 h-3.5" /> Data Types
                        </h4>
                        <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-3 mb-3 flex items-start gap-2 shadow-sm">
                          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-[10px] text-amber-200/80 leading-relaxed">
                            <strong className="text-amber-400 block mb-1">SQLite vs MySQL: Data Types</strong>
                            SQLite uses dynamic typing with 5 storage classes (NULL, INTEGER, REAL, TEXT, BLOB) and ignores length constraints like <code className="bg-amber-950 px-1 rounded font-mono">VARCHAR(255)</code>. MySQL uses strictly enforced, static data types.
                          </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-md space-y-4 mb-4">
                          <ul className="text-xs font-mono text-zinc-400 space-y-3">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">INTEGER / INT</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Whole numbers (e.g., 42, -5).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">REAL / DECIMAL</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Floating point numbers (e.g., 3.14).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">TEXT / VARCHAR</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Strings. SQLite treats VARCHAR as TEXT.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">BOOLEAN</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">True/False. SQLite evaluates 1/0; MySQL uses TINYINT(1).</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 shadow-md space-y-4 mb-8">
                          <h5 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">Not Natively Supported in SQLite</h5>
                          <ul className="text-xs font-mono text-zinc-500 space-y-3">
                            <li className="flex items-start gap-2">
                              <span className="text-red-400/70 font-semibold min-w-[120px] inline-block">DATE / TIME / TIMESTAMP</span>
                              <span className="text-zinc-600">—</span>
                              <span className="text-zinc-400 flex-1">No separate type. Stored as TEXT (ISO8601 string), REAL (Julian day), or INTEGER (Unix epoch).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400/70 font-semibold min-w-[120px] inline-block">ENUM / SET</span>
                              <span className="text-zinc-600">—</span>
                              <span className="text-zinc-400 flex-1">Not supported. Use TEXT with a CHECK constraint instead.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400/70 font-semibold min-w-[120px] inline-block">JSON</span>
                              <span className="text-zinc-600">—</span>
                              <span className="text-zinc-400 flex-1">Stored as TEXT. SQLite provides JSON functions to query it.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400/70 font-semibold min-w-[120px] inline-block">UUID</span>
                              <span className="text-zinc-600">—</span>
                              <span className="text-zinc-400 flex-1">Stored as TEXT (string) or BLOB (16 bytes).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400/70 font-semibold min-w-[120px] inline-block">GEOSPATIAL (POINT, etc)</span>
                              <span className="text-zinc-600">—</span>
                              <span className="text-zinc-400 flex-1">Not supported. Requires the SpatiaLite extension, or stored as BLOB/TEXT.</span>
                            </li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <FileSearch className="w-3.5 h-3.5" /> Table Creation
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">CREATE TABLE</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                              {highlightSQL(`CREATE TABLE table_name ( \n  column_1 datatype_1 [in-line constraint], \n  column_2 datatype_2 [in-line constraint], \n  ... \n  column_n datatype_n [in-line constraint], \n  [out-of-line constraint] \n);`)}
                            </pre>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-md space-y-4">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-emerald-300 mb-2 tracking-wide">In-line Constraints</p>
                              <ul className="text-xs font-mono text-zinc-400 space-y-1">
                                <li>- <span className="text-zinc-300 font-bold">PRIMARY KEY</span>, <span className="text-zinc-300 font-bold">UNSIGNED</span>, <span className="text-zinc-300 font-bold">SIGNED</span></li>
                                <li>- <span className="text-zinc-300 font-bold">AUTO_INCREMENT</span>, <span className="text-zinc-300 font-bold">NOT NULL</span></li>
                                <li>- <span className="text-zinc-300 font-bold">DEFAULT default_value</span>, <span className="text-zinc-300 font-bold">UNIQUE</span></li>
                                <li>- <span className="text-zinc-300 font-bold">CHECK (column_name operator value)</span></li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-emerald-300 mb-2 tracking-wide">Out-of-line Constraints</p>
                              <ul className="text-xs font-mono text-zinc-400 space-y-1">
                                <li>- <span className="text-zinc-300 font-bold">PRIMARY KEY (column_name[, ...])</span></li>
                                <li>- <span className="text-zinc-300 font-bold">FOREIGN KEY (column_name) REFERENCES other_table(column_name)</span></li>
                              </ul>
                            </div>
                          </div>

                          <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-3 flex items-start gap-2 shadow-sm">
                            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div className="text-[10px] text-amber-200/80 leading-relaxed">
                              <strong className="text-amber-400 block mb-1">SQLite vs MySQL: AUTO_INCREMENT</strong>
                              In MySQL, use <code className="bg-amber-950 px-1 rounded font-mono">AUTO_INCREMENT</code>. In SQLite, use <code className="bg-amber-950 px-1 rounded font-mono">INTEGER PRIMARY KEY</code> or explicit <code className="bg-amber-950 px-1 rounded font-mono">AUTOINCREMENT</code> keyword.
                            </div>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Table Modification</h4>
                        <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-3 mb-3 flex items-start gap-2 shadow-sm">
                          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-[10px] text-amber-200/80 leading-relaxed">
                            <strong className="text-amber-400 block mb-1">SQLite vs MySQL: ALTER TABLE</strong>
                            SQLite has limited <code className="bg-amber-950 px-1 rounded font-mono">ALTER TABLE</code> support compared to MySQL. Most versions of SQLite cannot safely DROP or MODIFY column constraints natively.
                          </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">ALTER Commands</span>
                          </div>
                          <div className="p-4 space-y-4 font-mono text-xs overflow-x-auto">
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500 font-bold">// Add column</span>
                              <pre className="text-zinc-300">{highlightSQL(`ALTER TABLE table_name \nADD column_name datatype [constraint];`)}</pre>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500 font-bold">// Drop column</span>
                              <pre className="text-zinc-300">{highlightSQL(`ALTER TABLE table_name \nDROP column_name;`)}</pre>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500 font-bold">// Change column</span>
                              <pre className="text-zinc-300">{highlightSQL(`ALTER TABLE table_name \nCHANGE column_name new_column_name new_data_type;`)}</pre>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500 font-bold">// Add primary key</span>
                              <pre className="text-zinc-300">{highlightSQL(`ALTER TABLE table_name \nADD PRIMARY KEY (column_name);`)}</pre>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500 font-bold">// Add foreign key</span>
                              <pre className="text-zinc-300">{highlightSQL(`ALTER TABLE table_name \nADD FOREIGN KEY (column_name) REFERENCES other_table(column_name);`)}</pre>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Table Deletion</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Drop & Truncate</span>
                          </div>
                          <div className="p-4 space-y-3 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300">{highlightSQL(`DROP TABLE [IF EXISTS] table_name;`)}</pre>
                            <div className="border-t border-zinc-800 my-2"></div>
                            <pre className="text-zinc-300">{highlightSQL(`TRUNCATE TABLE table_name;`)}</pre>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Views</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Create & Drop View</span>
                          </div>
                          <div className="p-4 space-y-4 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300 leading-relaxed">{highlightSQL(`CREATE VIEW view_name AS \nSELECT column_1, column_2, ... \nFROM table_name \n[WHERE ...] \n[GROUP BY ...] \n[HAVING ...] \n[ORDER BY ...];`)}</pre>
                            <div className="border-t border-zinc-800 my-2"></div>
                            <pre className="text-zinc-300">{highlightSQL(`DROP VIEW [IF EXISTS] view_name;`)}</pre>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Indexes</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Create & Drop Index</span>
                          </div>
                          <div className="p-4 space-y-3 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300">{highlightSQL(`CREATE INDEX index_name ON table_name(column_name);`)}</pre>
                            <div className="border-t border-zinc-800 my-2"></div>
                            <pre className="text-zinc-300">{highlightSQL(`DROP INDEX index_name ON table_name;`)}</pre>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {activeTab === 'complex' && (
                    <>
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5" /> Subqueries
                        </h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Nested in WHERE Clause</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`SELECT column_1 \nFROM table_name \nWHERE column_2 IN ( \n  SELECT column_x \n  FROM another_table \n  WHERE condition \n);`)}
                          </pre>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">CTEs & WITH</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Common Table Expressions</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`WITH cte_name AS ( \n  SELECT column_1 \n  FROM table_name \n  WHERE condition \n) \nSELECT * FROM cte_name;`)}
                          </pre>
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Conditional Logic</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-850 flex justify-between items-center">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">CASE WHEN Statements</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre leading-relaxed">
                            {highlightSQL(`SELECT column_name, \nCASE \n  WHEN condition1 THEN result1 \n  WHEN condition2 THEN result2 \n  ELSE result3 \nEND AS alias_name \nFROM table_name;`)}
                          </pre>
                        </div>
                      </section>
                      
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Set Operations</h4>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-md">
                          <ul className="text-xs font-mono text-zinc-400 space-y-3">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">UNION</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Combines results of two SELECTs, removes duplicates.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-300 font-semibold min-w-[120px] inline-block">UNION ALL</span>
                              <span className="text-zinc-500">—</span>
                              <span className="text-zinc-300 flex-1">Combines results, keeping all duplicates.</span>
                            </li>
                          </ul>
                        </div>
                      </section>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
