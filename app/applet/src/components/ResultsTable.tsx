import { SQLiteResult } from '@/src/types';

interface ResultsTableProps {
  results: SQLiteResult[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  if (!results || results.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        No results to display. Run a SELECT query to see data.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, idx) => (
        <div key={idx} className="overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-900">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700">
                {result.columns.map((col) => (
                  <th key={col} className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {result.values.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                      {cell === null ? (
                        <span className="text-gray-300 italic">NULL</span>
                      ) : cell.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
