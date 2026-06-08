import initSqlJs, { Database } from 'sql.js';
import { ChallengeDomain } from '../types';
import { SEED_SCRIPTS } from './seedScripts';

let db: Database | null = null;
let SQL: any = null;

/**
 * Initializes the SQL engine and returns a success message if SELECT * works.
 */
export async function initializeDatabase(domain: ChallengeDomain = 'business') {
  try {
    if (!SQL) {
      SQL = await initSqlJs({
        // Use unpkg for more reliable WASM fetching in this environment
        locateFile: (file) => `https://unpkg.com/sql.js@1.14.1/dist/${file}`,
      });
    }
    
    // Close existing database if any
    if (db) {
        db.close();
    }
    
    db = new SQL.Database();
    
    // Execute seed script for the chosen domain
    const seedScript = SEED_SCRIPTS[domain];
    db.run(seedScript);
    
    // Verify by getting table names and data
    console.log(`SQL Engine initialized successfully for domain: ${domain}`);
    return {
      success: true,
      message: "Database initialized and seeded successfully. Connection verified.",
      tables: [] // The frontend uses sqlite_master to get tables, so this isn't strictly necessary
    };
  } catch (error) {
    console.error("SQL Initialization failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error during initialization"
    };
  }
}

function enrichErrorMessage(errorMsg: string): string {
  const msg = errorMsg.toLowerCase();
  let hint = "";
  if (msg.includes("no such table")) {
    hint = "\nHint: Did you misspell the table name? Check the schema reference.";
  } else if (msg.includes("no such column")) {
    hint = "\nHint: Did you misspell the column name? Check the schema reference.";
  } else if (msg.includes("ambiguous column name")) {
    hint = "\nHint: Multiple tables have this column. Use a table alias (e.g., 'table.column').";
  } else if (msg.includes("syntax error")) {
    hint = "\nHint: Check your syntax. Missing a comma, quote, or keyword?";
  } else if (msg.includes("group by")) {
    hint = "\nHint: Ensure selected columns are either grouped or aggregated.";
  }
  return errorMsg + hint;
}

/**
 * Executes a query directly on the main database and returns results.
 * Used for Sandbox mode where we don't need validation against a solution.
 */
export function runQuery(query: string) {
  if (!db || !SQL) return { success: false, error: "Database not initialized", executionTimeMs: 0 };

  try {
    const start = performance.now();
    const results = db.exec(query);
    const executionTimeMs = performance.now() - start;
    return {
      success: true,
      results,
      error: null,
      executionTimeMs
    };
  } catch (error) {
    const rawError = error instanceof Error ? error.message : "Query failed";
    return {
      success: false,
      error: enrichErrorMessage(rawError),
      results: null,
      executionTimeMs: 0
    };
  }
}

/**
 * Executes a query and returns the results.
 */
export function evaluateAndRun(userQuery: string, solutionQuery: string, verifyQuery?: string) {

  if (!db || !SQL) return { isValid: false, error: "Database not initialized", executionTimeMs: 0 };

  try {
    const currentState = db.export();
    
    const userDb = new SQL.Database(currentState);
    let userRes, userVerifyRes;
    const start = performance.now();
    try {
      userRes = userDb.exec(userQuery);
      if (verifyQuery) userVerifyRes = userDb.exec(verifyQuery);
    } catch (e) {
      userDb.close();
      const rawError = e instanceof Error ? e.message : "Syntax Error";
      return { isValid: false, error: enrichErrorMessage(rawError), executionTimeMs: 0 };
    }
    const executionTimeMs = performance.now() - start;
    
    const solDb = new SQL.Database(currentState);
    let solRes, solVerifyRes;
    try {
      solRes = solDb.exec(solutionQuery);
      if (verifyQuery) solVerifyRes = solDb.exec(verifyQuery);
    } catch (e) {
      solDb.close();
      userDb.close();
      return { isValid: false, error: "Internal Solution Error", userResults: userRes };
    }

    const uJson = JSON.stringify(verifyQuery ? userVerifyRes : userRes);
    const sJson = JSON.stringify(verifyQuery ? solVerifyRes : solRes);

    const isValid = uJson === sJson;

    let diffHint = null;
    if (!isValid && !verifyQuery) {
       // Perform basic diffing on the first result set
       const uCols = userRes && userRes.length > 0 ? userRes[0].columns : [];
       const sCols = solRes && solRes.length > 0 ? solRes[0].columns : [];
       
       const uVals = userRes && userRes.length > 0 ? userRes[0].values : [];
       const sVals = solRes && solRes.length > 0 ? solRes[0].values : [];

       if (uCols.length !== sCols.length) {
          diffHint = `Your query returned ${uCols.length} columns, but the solution expects ${sCols.length} columns.`;
       } else if (uVals.length !== sVals.length) {
          diffHint = `Your query returned ${uVals.length} rows, but the solution expects ${sVals.length} rows.`;
       } else if (JSON.stringify(uCols) !== JSON.stringify(sCols)) {
          diffHint = `Your columns don't match the expected schema. Check the order and names of your SELECT list.`;
       } else {
          diffHint = `The data in your rows does not perfectly match the expected output. Double check your filtering or sorting.`;
       }
    }

    // Apply the query to the main DB ONLY if it's correct so the user doesn't permanently ruin the state with incorrect queries
    if (isValid) {
      db.exec(userQuery); 
    }
    
    userDb.close();
    solDb.close();

    return {
      isValid,
      userResults: userRes,
      error: diffHint,
      executionTimeMs
    };

  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Validation failed",
      executionTimeMs: 0
    };
  }
}
