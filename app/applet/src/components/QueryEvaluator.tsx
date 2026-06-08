import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface QueryEvaluatorProps {
  status: 'idle' | 'evaluating' | 'success' | 'fail' | 'error';
  message: string;
}

export default function QueryEvaluator({ status, message }: QueryEvaluatorProps) {
  if (status === 'idle') return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status + message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`p-4 rounded-xl flex items-center gap-3 border shadow-sm ${
          status === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40' 
            : status === 'evaluating'
            ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
            : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/40'
        }`}
      >
        {status === 'evaluating' && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
        {(status === 'fail' || status === 'error') && <AlertCircle className="w-5 h-5" />}
        
        <div className="flex-1">
          <p className="text-sm font-bold tracking-wide">
            {message}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
