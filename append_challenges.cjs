const fs = require('fs');
const path = require('path');

const challengesFile = path.join(__dirname, 'src/data/challenges.json');
const challenges = JSON.parse(fs.readFileSync(challengesFile, 'utf8'));

const newChallenges = [
  {
    "id": "bus_cte_1",
    "domain": "business",
    "category": "advanced_analytics",
    "title": "Revenue Percentiles",
    "description": "Calculate the percent_rank of employees based on their salaries in each department using Window Functions.",
    "solution": "SELECT employee_id, department_id, salary, PERCENT_RANK() OVER(PARTITION BY department_id ORDER BY salary) as pct_rank FROM employees;",
    "initialQuery": "-- Write a query using PERCENT_RANK()\n"
  },
  {
    "id": "health_cte_1",
    "domain": "healthcare",
    "category": "advanced_analytics",
    "title": "Patient Visit Frequency Rankings",
    "description": "Rank patients by the total number of visits they have had, partitioned by their primary doctor using DENSE_RANK().",
    "solution": "SELECT patient_id, doctor_id, count(visit_id) as total_visits, DENSE_RANK() OVER(PARTITION BY doctor_id ORDER BY count(visit_id) DESC) as visit_rank FROM visits GROUP BY patient_id, doctor_id;",
    "initialQuery": "-- Use DENSE_RANK() with GROUP BY\n"
  },
  {
    "id": "sci_cte_1",
    "domain": "science",
    "category": "advanced_analytics",
    "title": "Common Table Expression Basics",
    "description": "Use a CTE named 'recent_observations' to select observations from 2023, then select all from the CTE.",
    "solution": "WITH recent_observations AS (SELECT * FROM observations WHERE date >= '2023-01-01') SELECT * FROM recent_observations;",
    "initialQuery": "-- Write a WITH clause\n"
  },
  {
    "id": "edu_cte_1",
    "domain": "education",
    "category": "advanced_analytics",
    "title": "Running Total of Credits",
    "description": "Calculate the running total of credits for a course schedule using the SUM() window function ordered by course_id.",
    "solution": "SELECT course_id, credits, SUM(credits) OVER(ORDER BY course_id) as running_total FROM courses;",
    "initialQuery": "-- Calculate a running total\n"
  }
];

// Check if already contains
if (!challenges.some(c => c.category === 'advanced_analytics')) {
    challenges.push(...newChallenges);
    fs.writeFileSync(challengesFile, JSON.stringify(challenges, null, 2));
    console.log("Added advanced_analytics challenges.");
} else {
    console.log("Already has advanced_analytics challenges.");
}
