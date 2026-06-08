const fs = require('fs');
const challenges = JSON.parse(fs.readFileSync('src/data/challenges.json', 'utf8'));

const newChallenges = [
  { id: 'med_select_cols', title: 'Select Specific Columns', description: 'Retrieve only the username and email of all users.', solution: 'SELECT username, email FROM users;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_limit', title: 'Limit Results', description: 'Retrieve the first 5 records from the tracks table.', solution: 'SELECT * FROM tracks LIMIT 5;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_order_by', title: 'Sort Users', description: 'List all users, ordered by their join_date ascending.', solution: 'SELECT * FROM users ORDER BY join_date ASC;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_distinct', title: 'Select Distinct', description: 'Find all unique subscription tiers in the users table.', solution: 'SELECT DISTINCT subscription_tier FROM users;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_in', title: 'Filter with IN', description: "Find all artists whose genre is either 'Pop' or 'Rock'.", solution: "SELECT * FROM artists WHERE genre IN ('Pop', 'Rock');", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_between', title: 'Filter with BETWEEN', description: 'Find tracks where the duration is between 180 and 240 seconds.', solution: 'SELECT * FROM tracks WHERE duration_seconds BETWEEN 180 AND 240;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_like', title: 'Filter with LIKE', description: "Find all users whose email ends with '@example.com'.", solution: "SELECT * FROM users WHERE email LIKE '%@example.com';", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_and', title: 'Filter with AND', description: "Find all playlists that are public AND belong to user 'u1'.", solution: "SELECT * FROM playlists WHERE is_public = TRUE AND user_id = 'u1';", initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_or', title: 'Filter with OR', description: 'Find all tracks that were released in 2024 OR have a duration of 300 seconds.', solution: 'SELECT * FROM tracks WHERE release_year = 2024 OR duration_seconds = 300;', initialQuery: '-- Write your query here\n', category: 'basic_queries', domain: 'media' },
  { id: 'med_count', title: 'Aggregate: COUNT', description: 'Count the total number of listening history records.', solution: 'SELECT COUNT(*) FROM listening_history;', initialQuery: '-- Write your query here\n', category: 'aggregations', domain: 'media' },
  { id: 'med_sum', title: 'Aggregate: SUM', description: 'Calculate the total sum of duration_seconds of all tracks.', solution: 'SELECT SUM(duration_seconds) FROM tracks;', initialQuery: '-- Write your query here\n', category: 'aggregations', domain: 'media' },
  { id: 'med_update_multiple', title: 'Update Multiple Fields', description: "Update the playlist with ID 'p1' to be public (is_public = TRUE) and have the title 'Awesome Mix'.", solution: "UPDATE playlists SET is_public = TRUE, title = 'Awesome Mix' WHERE playlist_id = 'p1';", verifyQuery: "SELECT * FROM playlists WHERE playlist_id = 'p1';", initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  { id: 'med_add_constraints', title: 'Inline Constraints', description: "Create a `genres` table with an `id` INTEGER PRIMARY KEY and a `name` TEXT NOT NULL.", solution: "CREATE TABLE genres (id INTEGER PRIMARY KEY, name TEXT NOT NULL);", verifyQuery: "PRAGMA table_info(genres);", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_relationship_checks', title: 'Relationship Checks', description: "Delete all tracks by artist_id 'a1' to simulate removing a discography.", solution: "DELETE FROM tracks WHERE artist_id = 'a1';", verifyQuery: "SELECT * FROM tracks WHERE artist_id = 'a1';", initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  { id: 'med_not_ordered', title: 'Artists with No Tracks', description: 'Find artists that have no tracks. Select artist_id and name using a LEFT JOIN with tracks.', solution: 'SELECT a.artist_id, a.name FROM artists a LEFT JOIN tracks t ON a.artist_id = t.artist_id WHERE t.track_id IS NULL;', initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  { id: 'med_above_average', title: 'Advanced Subqueries', description: 'Find tracks that have a duration longer than the average duration of all tracks.', solution: 'SELECT * FROM tracks WHERE duration_seconds > (SELECT AVG(duration_seconds) FROM tracks);', initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  { id: 'med_case_when', title: 'CASE WHEN', description: "Select track_id and a 'length_category' column which is 'Long' if duration_seconds > 240 else 'Standard'.", solution: "SELECT track_id, CASE WHEN duration_seconds > 240 THEN 'Long' ELSE 'Standard' END AS length_category FROM tracks;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  { id: 'med_select_subquery', title: 'Select Subquery', description: "Select artist names and the total count of tracks in the system as a column aliased as 'total_tracks_db'.", solution: "SELECT name, (SELECT COUNT(*) FROM tracks) as total_tracks_db FROM artists;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  { id: 'med_index', title: 'CREATE INDEX', description: "Create an index named `idx_track_duration` on the `duration_seconds` column in the `tracks` table.", solution: "CREATE INDEX idx_track_duration ON tracks (duration_seconds);", verifyQuery: "SELECT name FROM sqlite_master WHERE type='index';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_view', title: 'CREATE VIEW', description: "Create a view named `pop_artists` to see only artists where genre = 'Pop'.", solution: "CREATE VIEW pop_artists AS SELECT * FROM artists WHERE genre = 'Pop';", verifyQuery: "SELECT * FROM pop_artists;", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_custom_view', title: 'Custom View', description: "Create a view named `premium_users` showing only users with subscription_tier = 'Premium'.", solution: "CREATE VIEW premium_users AS SELECT * FROM users WHERE subscription_tier = 'Premium';", verifyQuery: "SELECT * FROM premium_users;", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_alter_view', title: 'Alter View', description: 'Drop the `premium_users` view.', solution: 'DROP VIEW premium_users;', verifyQuery: "SELECT name FROM sqlite_master WHERE type='view';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_recreation', title: 'The Recreation Pattern', description: "Recreate `artists_new` as `artist_id` TEXT PRIMARY KEY, `name` TEXT, `genre` TEXT. Insert from `artists`. Drop `artists`. Rename `artists_new` to `artists`.", solution: "CREATE TABLE artists_new (artist_id TEXT PRIMARY KEY, name TEXT, genre TEXT); INSERT INTO artists_new (artist_id, name, genre) SELECT * FROM artists; DROP TABLE artists; ALTER TABLE artists_new RENAME TO artists;", verifyQuery: 'PRAGMA table_info(artists);', initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  { id: 'med_ctes', title: 'CTEs (WITH clause)', description: "Use a WITH clause named `RockArtists` to select artists WHERE genre = 'Rock', then select all from RockArtists.", solution: "WITH RockArtists AS (SELECT * FROM artists WHERE genre = 'Rock') SELECT * FROM RockArtists;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  { id: 'med_window', title: 'Window Functions', description: "Select artist names and rank them alphabetically by name descending using ROW_NUMBER. Give the rank column the alias 'rank'.", solution: "SELECT name, ROW_NUMBER() OVER(ORDER BY name DESC) as rank FROM artists;", initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  
  // Custom delete to replace m_19
  { id: 'm_19', title: 'Delete an Old Playlist', description: "Delete the playlist named 'Workout Jams' from the playlists table.", solution: "DELETE FROM playlists WHERE title = 'Workout Jams';", verifyQuery: 'SELECT * FROM playlists;', initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  
  // Custom update to replace m_18
  { id: 'm_18', title: 'Update User Subscription', description: "Update the user with username 'BobJohnson' to have a 'Premium' subscription tier.", solution: "UPDATE users SET subscription_tier = 'Premium' WHERE username = 'BobJohnson';", verifyQuery: 'SELECT * FROM users;', initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  
  // Custom update to replace m_21
  { id: 'm_21', title: 'Update Artist Genre', description: "Update the genre to 'Alternative Rock' for the artist with artist_id 'artist_3'.", solution: "UPDATE artists SET genre = 'Alternative Rock' WHERE artist_id = 'artist_3';", verifyQuery: 'SELECT * FROM artists;', initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  
  // Custom CREATE TABLE m_27
  { id: 'm_27', title: 'Create Albums Table', description: "Create a new table named 'albums' with columns: 'album_id' (TEXT PRIMARY KEY), 'title' (TEXT), 'artist_id' (TEXT), and 'release_date' (TEXT).", solution: "CREATE TABLE albums (album_id TEXT PRIMARY KEY, title TEXT, artist_id TEXT, release_date TEXT);", verifyQuery: 'PRAGMA table_info(albums);', initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  
  // Custom INSERT m_17
  { id: 'm_17', title: 'Add a New User', description: "Insert a new user into the users table. Use 'user_101' for user_id, 'AliceSmith' for username, 'alice.smith@example.com' for email, 'Free' for subscription_tier, and '2024-01-15' for join_date.", solution: "INSERT INTO users (user_id, username, email, subscription_tier, join_date) VALUES ('user_101', 'AliceSmith', 'alice.smith@example.com', 'Free', '2024-01-15');", verifyQuery: 'SELECT * FROM users;', initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  
  // Custom DROP TABLE 
  { id: 'med_drop_table', title: 'Drop Table', description: "Drop the 'albums' table if it exists.", solution: 'DROP TABLE IF EXISTS albums;', verifyQuery: "SELECT name FROM sqlite_master WHERE type='table';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  
  // Custom ALTER TABLE
  { id: 'm_25', title: 'Add last_login Column', description: "Add a new column called 'last_login' of type TEXT to the users table.", solution: "ALTER TABLE users ADD COLUMN last_login TEXT;", verifyQuery: 'PRAGMA table_info(users);', initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' },
  
  // Conditional delete
  { id: 'm_24', title: 'Remove Incomplete Listening History', description: 'Delete all listening history records where completed is FALSE.', solution: 'DELETE FROM listening_history WHERE completed = FALSE;', verifyQuery: 'SELECT * FROM listening_history;', initialQuery: '-- Write your query here\n', category: 'data_modification', domain: 'media' },
  
  // Join tasks
  { id: 'm_10', title: 'Tracks Per Artist', description: 'List artist names and their total track counts. Join artists with tracks. Return name and count of tracks as number_of_tracks. Group by name and order by number_of_tracks descending.', solution: 'SELECT a.name, COUNT(t.track_id) AS number_of_tracks FROM artists a JOIN tracks t ON a.artist_id = t.artist_id GROUP BY a.name ORDER BY number_of_tracks DESC;', initialQuery: '-- Write your query here\n', category: 'complex_queries', domain: 'media' },
  
  { id: 'm_42', title: 'Studio Productions', description: "Set up a studio tracking system. First, create a `studios` table featuring an in-line `studio_id` (INTEGER PRIMARY KEY) and `name` (TEXT NOT NULL UNIQUE). Next, create a `movies` table with `movie_id` (INTEGER), `title` (TEXT NOT NULL), `budget` (REAL), and `studio_id` (INTEGER). For `movies`, configure out-of-line constraints: a PRIMARY KEY on `movie_id` and a FOREIGN KEY on `studio_id` referencing `studios(studio_id)`. Separate the statements with a semicolon.", solution: "CREATE TABLE studios (studio_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE); CREATE TABLE movies (movie_id INTEGER, title TEXT NOT NULL, budget REAL, studio_id INTEGER, PRIMARY KEY (movie_id), FOREIGN KEY (studio_id) REFERENCES studios(studio_id));", verifyQuery: "SELECT name FROM sqlite_master WHERE type='table';", initialQuery: '-- Write your query here\n', category: 'schema_management', domain: 'media' }
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

// Modify existing queries if needed for constraints and joins
const med_min_max = challenges.find(c => c.id === 'm_11');
if (med_min_max) { 
    med_min_max.description = 'Find the minimum duration and maximum duration among all tracks as min_duration and max_duration.';
    med_min_max.solution = 'SELECT MIN(duration_seconds) as min_duration, MAX(duration_seconds) as max_duration FROM tracks;';
}

const modKeys = ['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'];

for (const c of challenges) {
    if (c.domain === 'media') {
        const solutionStart = c.solution.trim().toUpperCase();
        let needsVerify = false;
        for (const k of modKeys) {
             if (solutionStart.startsWith(k)) {
                 needsVerify = true; break;
             }
        }
        if (needsVerify && !c.verifyQuery) {
            console.log('Needs fixing: missing verify Query For:', c.id);
            c.verifyQuery = 'SELECT 1';
        }
    }
}

fs.writeFileSync('src/data/challenges.json', JSON.stringify(challenges, null, 2));
console.log('Inserted/Updated new challenges.');
