const fs = require('fs');
const path = require('path');

const gpFile = path.join(__dirname, 'src/data/guidedPractice.json');
const gpData = JSON.parse(fs.readFileSync(gpFile, 'utf8'));

// The mapping of domain to the CTE challenges we created:
const cteChallenges = {
  business: "bus_cte_1",
  healthcare: "health_cte_1",
  science: "sci_cte_1",
  education: "edu_cte_1"
};

const domains = ['business', 'healthcare', 'science', 'education', 'media', 'sports', 'aviation', 'real_estate'];

for (const d of domains) {
   if (gpData[d] && gpData[d].passes) {
       // Check if pass 6 exists
       const hasPass6 = gpData[d].passes.some(p => p.title.includes('Pass 6') || p.title.includes('Advanced Analytics'));
       if (!hasPass6) {
           const challengeId = cteChallenges[d] || "bus_cte_1";
           gpData[d].passes.push({
             "title": "Pass 6: Advanced Analytics",
             "steps": [
               {
                 "id": `gp_${d}_advanced_1`,
                 "title": "Introduction to Common Table Expressions",
                 "lesson_content": "A Common Table Expression (CTE) allows you to define a temporary result set using the `WITH` clause. This result set can be queried just like a regular table, making complex queries easier to read.\n\n```sql\nWITH recent_data AS (\n  SELECT * FROM table WHERE date > '2023-01-01'\n)\nSELECT * FROM recent_data;\n```\n\nTry using a CTE or related advanced concept in this exercise.",
                 "challenge_id": challengeId
               }
             ]
           });
       }
   }
}

fs.writeFileSync(gpFile, JSON.stringify(gpData, null, 2));
console.log("Added advanced passes.");
