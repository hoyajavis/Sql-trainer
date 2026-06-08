const fs = require('fs');
const challenges = JSON.parse(fs.readFileSync('src/data/challenges.json', 'utf8'));

const domains = {};
challenges.forEach((c) => {
  if (!domains[c.domain]) {
    domains[c.domain] = { count: 0, categories: {}, flow: [] };
  }
  domains[c.domain].count++;
  domains[c.domain].categories[c.category] = (domains[c.domain].categories[c.category] || 0) + 1;
  const lastCat = domains[c.domain].flow[domains[c.domain].flow.length - 1];
  if (lastCat !== c.category) {
    domains[c.domain].flow.push(c.category);
  }
});

console.log(JSON.stringify(domains, null, 2));
