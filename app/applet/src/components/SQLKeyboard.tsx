interface SQLKeyboardProps {
  onInsert: (text: string) => void;
}

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'LIKE', 'IN', 'BETWEEN', 'AND', 'OR', 'IS NULL',
  'CREATE TABLE', 'CREATE VIEW', 'DROP TABLE', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'ALTER TABLE', 
  'VALUES', 'SET', 'ADD COLUMN', '*', ';'
];

export default function SQLKeyboard({ onInsert }: SQLKeyboardProps) {
  return (
    <div className="bg-zinc-800 border-y border-zinc-700 overflow-x-auto no-scrollbar py-2 px-3">
      <div className="flex gap-2 w-max">
        {KEYWORDS.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onInsert(keyword)}
            className="bg-zinc-700 hover:bg-zinc-600 active:scale-90 active:bg-indigo-600 transition-all px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-zinc-100 shadow-sm border border-zinc-600 flex-shrink-0"
            id={`kb-btn-${keyword.replace(' ', '-')}`}
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
}
