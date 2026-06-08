const fs = require('fs');

const challenges = JSON.parse(fs.readFileSync('src/data/challenges.json', 'utf8'));

// Define logical progression
const categoryOrder = {
  'basic_queries': 1,
  'aggregations_joins': 2,
  'data_manipulation': 3,
  'schema_management': 4,
  'complex_queries': 5
};

// Sort challenges
challenges.sort((a, b) => {
  // First group by domain (optional, but keeps things organized if we want,
  // wait, the app might expect them to just be pulled by domain.
  // We should preserve the relative domain grouping or simply sort by domain then category then ID.
  if (a.domain < b.domain) return -1;
  if (a.domain > b.domain) return 1;
  
  // Within the same domain, sort by category order
  const orderA = categoryOrder[a.category] || 99;
  const orderB = categoryOrder[b.category] || 99;
  if (orderA !== orderB) {
    return orderA - orderB;
  }
  
  // Within the same category, sort by id length then id (alphanumeric)
  if (a.id.length !== b.id.length) {
    return a.id.length - b.id.length;
  }
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
});

// Update the IDs? No, just re-order the JSON array.
fs.writeFileSync('src/data/challenges.json', JSON.stringify(challenges, null, 2));

console.log('Successfully re-ordered challenges.json for optimal progression.');
