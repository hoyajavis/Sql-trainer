import challengesData from '@/src/data/challenges.json';
import conceptsExcelData from '@/src/data/concepts_excel.json';
import conceptsGeneralData from '@/src/data/concepts_general.json';

export interface SQLiteResult {
  columns: string[];
  values: (number | string | null | Uint8Array)[][];
}

export type ChallengeDomain = 'business' | 'science' | 'education' | 'healthcare' | 'media' | 'sports' | 'aviation' | 'real_estate' | 'human_resources';
export type ChallengeCategory = 'basic_queries' | 'aggregations_joins' | 'data_manipulation' | 'schema_management' | 'complex_queries';

export interface SQLChallenge {
  id: string;
  domain: ChallengeDomain;
  title: string;
  description: string;
  solution: string;
  initialQuery?: string;
  verifyQuery?: string;
  category: ChallengeCategory;
}

export interface ConceptQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: number;
}

export const CHALLENGES: SQLChallenge[] = challengesData as SQLChallenge[];
export const CONCEPTS_EXCEL: ConceptQuestion[] = conceptsExcelData;
export const CONCEPTS_GENERAL: ConceptQuestion[] = conceptsGeneralData;
