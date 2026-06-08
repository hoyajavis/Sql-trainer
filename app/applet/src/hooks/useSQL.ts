import { useEffect, useState } from 'react';
import { initializeDatabase, evaluateAndRun, runQuery } from '@/src/lib/sqlEngine';
import { ChallengeDomain } from '@/src/types';

export function useSQL(domain: ChallengeDomain | null) {
  const [isReady, setIsReady] = useState(false);
  const [initMessage, setInitMessage] = useState('');
  const [lastResults, setLastResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      if (!domain) {
        setIsReady(false);
        return;
      }
      setIsReady(false);
      clearResults();
      const result = await initializeDatabase(domain);
      if (result.success) {
        setIsReady(true);
        setInitMessage(result.message);
      } else {
        setError(result.message);
      }
    }
    init();
  }, [domain]);

  const clearResults = () => {
    setLastResults([]);
    setError(null);
    setExecutionTimeMs(null);
  };

  const executeAndEvaluate = (userQuery: string, solutionQuery: string, verifyQuery?: string) => {
    setError(null);
    setExecutionTimeMs(null);
    const result = evaluateAndRun(userQuery, solutionQuery, verifyQuery);
    
    if (result.userResults) {
      setLastResults(result.userResults);
    } else {
      setLastResults([]);
    }

    if (!result.isValid && result.error) {
      setError(result.error);
    }
    
    setExecutionTimeMs(result.executionTimeMs);
    return result;
  };

  const executeSandboxQuery = (userQuery: string) => {
    setError(null);
    setExecutionTimeMs(null);
    const result = runQuery(userQuery);
    
    if (result.results) {
      setLastResults(result.results);
    } else {
      setLastResults([]);
    }

    if (!result.success && result.error) {
      setError(result.error);
    }
    
    setExecutionTimeMs(result.executionTimeMs);
    return result;
  };

  const resetDb = async () => {
    if (!domain) return false;
    setIsReady(false);
    clearResults();
    const result = await initializeDatabase(domain);
    if (result.success) {
      setIsReady(true);
      setInitMessage(result.message);
      return true;
    } else {
      setError(result.message);
      return false;
    }
  };

  return {
    isReady,
    initMessage,
    lastResults,
    error,
    executionTimeMs,
    executeAndEvaluate,
    executeSandboxQuery,
    clearResults,
    resetDb
  };
}
