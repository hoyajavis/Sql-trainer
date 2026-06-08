const fs = require('fs');
const challenges = JSON.parse(fs.readFileSync('src/data/challenges.json', 'utf8'));

const newChallenges = [
  { id: 'spt_select_cols', title: 'Select Specific Columns', description: 'Retrieve only the first name and last name of all players.', solution: 'SELECT first_name, last_name FROM players;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_limit', title: 'Limit Results', description: 'Retrieve the first 3 records from the matches table.', solution: 'SELECT * FROM matches LIMIT 3;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_order_by', title: 'Sort Venues', description: 'List all venues, ordered by their capacity descending.', solution: 'SELECT * FROM venues ORDER BY capacity DESC;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_distinct', title: 'Select Distinct', description: 'Find all unique position types in the players table.', solution: 'SELECT DISTINCT position FROM players;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_in', title: 'Filter with IN', description: 'Find all matches where the home_score is 0 or 1.', solution: 'SELECT * FROM matches WHERE home_score IN (0, 1);', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_between', title: 'Filter with BETWEEN', description: 'Find teams founded between the years 1900 and 1950.', solution: 'SELECT * FROM teams WHERE founded_year BETWEEN 1900 AND 1950;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_like', title: 'Filter with LIKE', description: "Find all venues whose city is 'London'.", solution: "SELECT * FROM venues WHERE city LIKE '%London%';", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_and', title: 'Filter with AND', description: "Find all players who are 'Forward' and have jersey_number greater than 10.", solution: "SELECT * FROM players WHERE position = 'Forward' AND jersey_number > 10;", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_or', title: 'Filter with OR', description: "Find all players who are 'Goalkeeper' or belong to team 'T002'.", solution: "SELECT * FROM players WHERE position = 'Goalkeeper' OR team_id = 'T002';", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'sports' },
  { id: 'spt_count', title: 'Aggregate: COUNT', description: 'Count the total number of players.', solution: 'SELECT COUNT(*) FROM players;', initialQuery: '-- Write your query here\n', category: 'aggregations', domain: 'sports' },
  { id: 'spt_sum', title: 'Aggregate: SUM', description: 'Calculate the total sum of all goals across all stats_log entries.', solution: 'SELECT SUM(goals) FROM stats_log;', initialQuery: '-- Write your query here\n', category: 'aggregations', domain: 'sports' },
  { id: 'spt_update_multiple', title: 'Update Multiple Fields', description: "Update the match with ID 'M001' to have a home_score of 2 and an away_score of 2.", solution: "UPDATE matches SET home_score = 2, away_score = 2 WHERE match_id = 'M001';", verifyQuery: "SELECT * FROM matches WHERE match_id = 'M001';", initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'sports' },
  { id: 'spt_add_constraints', title: 'Inline Constraints', description: "Create a `stadium_types` table with an `id` INTEGER PRIMARY KEY and a `type_name` TEXT NOT NULL.", solution: "CREATE TABLE stadium_types (id INTEGER PRIMARY KEY, type_name TEXT NOT NULL);", verifyQuery: "PRAGMA table_info(stadium_types);", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_relationship_checks', title: 'Relationship Checks', description: "Delete all stats_log entries for match_id 'M001' to simulate a match void.", solution: "DELETE FROM stats_log WHERE match_id = 'M001';", verifyQuery: "SELECT * FROM stats_log WHERE match_id = 'M001';", initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'sports' },
  { id: 'spt_not_ordered', title: 'Venues with No Matches', description: 'Find venues that have hosted no matches. Select venue_id and name using a LEFT JOIN with matches.', solution: 'SELECT v.venue_id, v.name FROM venues v LEFT JOIN matches m ON v.venue_id = m.venue_id WHERE m.match_id IS NULL;', initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_above_average', title: 'Advanced Subqueries', description: 'Find players whose jersey number is higher than the average jersey number among all players.', solution: 'SELECT * FROM players WHERE jersey_number > (SELECT AVG(jersey_number) FROM players);', initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_case_when', title: 'CASE WHEN', description: "Select player_id and a 'starter_status' column which is 'Starter' if minutes_played > 60 else 'Reserve'. Do this for stats_log.", solution: "SELECT player_id, CASE WHEN minutes_played > 60 THEN 'Starter' ELSE 'Reserve' END AS starter_status FROM stats_log;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_select_subquery', title: 'Select Subquery', description: "Select team names and the total number of players in the entire system as a column aliased as 'total_players_db'.", solution: "SELECT name, (SELECT COUNT(*) FROM players) AS total_players_db FROM teams;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_index', title: 'CREATE INDEX', description: "Create an index named `idx_player_position` on the `position` column in the `players` table.", solution: "CREATE INDEX idx_player_position ON players (position);", verifyQuery: "SELECT name FROM sqlite_master WHERE type='index';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_view', title: 'CREATE VIEW', description: "Create a view named `london_venues` to see only venues where city = 'London'.", solution: "CREATE VIEW london_venues AS SELECT * FROM venues WHERE city = 'London';", verifyQuery: "SELECT * FROM london_venues;", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_custom_view', title: 'Custom View', description: "Create a view named `forwards` showing only players with position = 'Forward'.", solution: "CREATE VIEW forwards AS SELECT * FROM players WHERE position = 'Forward';", verifyQuery: "SELECT * FROM forwards;", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_alter_view', title: 'Alter View', description: 'Drop the `forwards` view.', solution: 'DROP VIEW forwards;', verifyQuery: "SELECT name FROM sqlite_master WHERE type='view';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_recreation', title: 'The Recreation Pattern', description: "Recreate `venues_new` as `venue_id` TEXT PRIMARY KEY, `name` TEXT. Insert from `venues`. Drop `venues`. Rename `venues_new` to `venues`.", solution: "CREATE TABLE venues_new (venue_id TEXT PRIMARY KEY, name TEXT); INSERT INTO venues_new (venue_id, name) SELECT venue_id, name FROM venues; DROP TABLE venues; ALTER TABLE venues_new RENAME TO venues;", verifyQuery: "PRAGMA table_info(venues);", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' },
  { id: 'spt_ctes', title: 'CTEs (WITH clause)', description: "Use a WITH clause named `ForwardsOnly` to select all players WHERE position = 'Forward', then select all from ForwardsOnly.", solution: "WITH ForwardsOnly AS (SELECT * FROM players WHERE position = 'Forward') SELECT * FROM ForwardsOnly;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_window', title: 'Window Functions', description: "Select venue names and rank them by capacity descending using ROW_NUMBER. Give the rank column the alias 'rank'.", solution: "SELECT name, ROW_NUMBER() OVER(ORDER BY capacity DESC) AS rank FROM venues;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'sports' },
  { id: 'spt_drop_table', title: 'Drop Table', description: "Drop the 'referees' table if it exists.", solution: 'DROP TABLE IF EXISTS referees;', verifyQuery: "SELECT name FROM sqlite_master WHERE type='table';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'sports' }
];

let inserted = 0;
for (const nc of newChallenges) {
  const existing = challenges.find(c => c.id === nc.id);
  if (!existing) {
    challenges.push(nc);
    inserted++;
  } else {
    Object.assign(existing, nc);
  }
}

const modKeys = ['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'];
for (const c of challenges) {
    if (c.domain === 'sports') {
        const solutionStart = c.solution.trim().toUpperCase();
        let needsVerify = false;
        for (const k of modKeys) {
             if (solutionStart.startsWith(k)) {
                 needsVerify = true; break;
             }
        }
        if (needsVerify && !c.verifyQuery) {
            c.verifyQuery = 'SELECT 1;';
        }
        if (c.id === 'spt_42' || c.id === 'spt_29' || c.id === 'spt_43' || c.id === 'spt_44') {
             c.verifyQuery = "SELECT name FROM sqlite_master WHERE type='table';";
        }
    }
}

const spt_avg_max = { id: 'spt_min_max', title: 'Aggregate Insights', description: 'Find the minimum capacity and maximum capacity among all venues as min_capacity and max_capacity.', solution: 'SELECT MIN(capacity) as min_capacity, MAX(capacity) as max_capacity FROM venues;', initialQuery: '-- Write your query here\n', category: 'aggregations', domain: 'sports' };
const existing_spt_avg_max = challenges.find(c => c.id === 'spt_min_max');
if (!existing_spt_avg_max) {
     challenges.push(spt_avg_max);
} else {
     Object.assign(existing_spt_avg_max, spt_avg_max);
}

fs.writeFileSync('src/data/challenges.json', JSON.stringify(challenges, null, 2));
console.log('Inserted: ' + inserted);
