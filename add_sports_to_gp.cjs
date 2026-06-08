const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/guidedPractice.json', 'utf8'));

data.sports = {
  "domain": "sports",
  "name": "Data Analyst (Sports)",
  "description": "Learn SQL by managing sports teams, venues, and match statistics.",
  "passes": [
    {
      "pass": 1,
      "title": "Pass 1: The Foundations (Surface Level)",
      "description": "Get comfortable reading and writing basic database structures and records.",
      "steps": [
        {
          "id": "gp_spt_1_1",
          "title": "Introduction to SELECT Statements",
          "lesson_content": "To retrieve data from a table, use the `SELECT` statement. The asterisk `*` means 'all columns'.\n\nExample:\n```sql\nSELECT *\nFROM employees;\n```",
          "challenge_id": "spt_1"
        },
        {
          "id": "gp_spt_1_2",
          "title": "Selecting Specific Columns",
          "lesson_content": "Instead of selecting all columns, you can specify exactly which columns you want to retrieve by separating their names with commas.\n\nExample:\n```sql\nSELECT first_name, last_name\nFROM employees;\n```",
          "challenge_id": "spt_select_cols"
        },
        {
          "id": "gp_spt_1_4",
          "title": "Filtering Rows with WHERE",
          "lesson_content": "The `WHERE` clause acts as a filter, allowing you to only retrieve rows that meet a specific condition.\n\nExample:\n```sql\nSELECT *\nFROM products\nWHERE price > 50;\n```",
          "challenge_id": "spt_2"
        },
        {
          "id": "gp_spt_1_5",
          "title": "Creating Your First Table",
          "lesson_content": "Use `CREATE TABLE` to define new structure.\n\nExample:\n```sql\nCREATE TABLE customers (\n  id INTEGER,\n  name TEXT\n);\n```",
          "challenge_id": "spt_29"
        },
        {
          "id": "gp_spt_1_6",
          "title": "Adding Data with INSERT",
          "lesson_content": "Use `INSERT INTO` followed by the table name and the `VALUES` you wish to insert.\n\nExample:\n```sql\nINSERT INTO customers (id, name) \nVALUES (1, 'Alice');\n```",
          "challenge_id": "spt_18"
        },
        {
          "id": "gp_spt_1_7",
          "title": "Deleting Basic Records",
          "lesson_content": "Use `DELETE FROM` to remove rows entirely. **Warning:** Always include a `WHERE` clause.\n\nExample:\n```sql\nDELETE FROM customers\nWHERE id = 1;\n```",
          "challenge_id": "spt_25"
        }
      ]
    },
    {
      "pass": 2,
      "title": "Pass 2: Aggregations & Data Manipulation",
      "description": "Summarize data and perform basic table modifications.",
      "steps": [
        {
          "id": "gp_spt_2_1",
          "title": "Sorting Data with ORDER BY",
          "lesson_content": "Use `ORDER BY` to sort your results. You can specify `ASC` (low to high, default) or `DESC` (high to low).\n\nExample:\n```sql\nSELECT *\nFROM products\nORDER BY price DESC;\n```",
          "challenge_id": "spt_order_by"
        },
        {
          "id": "gp_spt_2_1b",
          "title": "Limiting Results",
          "lesson_content": "Use the `LIMIT` clause at the very end of your query (after `ORDER BY` if present).\n\nExample:\n```sql\nSELECT *\nFROM orders\nORDER BY total_cost DESC\nLIMIT 5;\n```",
          "challenge_id": "spt_limit"
        },
        {
          "id": "gp_spt_2_2",
          "title": "Finding Unique Values with DISTINCT",
          "lesson_content": "Adding `DISTINCT` right after `SELECT` will remove duplicate rows from your results.\n\nExample:\n```sql\nSELECT DISTINCT department\nFROM employees;\n```",
          "challenge_id": "spt_distinct"
        },
        {
          "id": "gp_spt_2_3",
          "title": "Filtering with MULTIPLE Values (IN)",
          "lesson_content": "The `IN` operator lets you specify a list of values to match inside a `WHERE` clause.\n\nExample:\n```sql\nSELECT *\nFROM employees\nWHERE department IN ('Sales', 'Marketing');\n```",
          "challenge_id": "spt_in"
        },
        {
          "id": "gp_spt_2_4",
          "title": "Filtering within Ranges (BETWEEN)",
          "lesson_content": "The `BETWEEN` operator selects values within a given inclusive range.\n\nExample:\n```sql\nSELECT *\nFROM orders\nWHERE total_cost BETWEEN 50 AND 100;\n```",
          "challenge_id": "spt_between"
        },
        {
          "id": "gp_spt_2_5",
          "title": "Pattern Matching with LIKE",
          "lesson_content": "Use `LIKE` to search for a specified pattern in a column. The `%` wildcard matches any sequence of characters. `_` matches a single character.\n\nExample:\n```sql\nSELECT *\nFROM customers\nWHERE name LIKE 'S%';\n```",
          "challenge_id": "spt_like"
        },
        {
          "id": "gp_spt_2_6",
          "title": "Combining Filters (AND)",
          "lesson_content": "The `AND` operator displays a record if *all* conditions separated by `AND` are true.\n\nExample:\n```sql\nSELECT *\nFROM customers\nWHERE country = 'USA'\n  AND city = 'Seattle';\n```",
          "challenge_id": "spt_and"
        },
        {
          "id": "gp_spt_2_7",
          "title": "Alternative Filters (OR)",
          "lesson_content": "The `OR` operator displays a record if *any* of the conditions separated by `OR` is true.\n\nExample:\n```sql\nSELECT *\nFROM customers\nWHERE city = 'Seattle'\n  OR city = 'Portland';\n```",
          "challenge_id": "spt_or"
        },
        {
          "id": "gp_spt_2_8",
          "title": "Counting Rows (COUNT)",
          "lesson_content": "The `COUNT()` function returns the number of rows that match a specified criterion.\n\nExample:\n```sql\nSELECT COUNT(*)\nFROM orders;\n```",
          "challenge_id": "spt_count"
        },
        {
          "id": "gp_spt_2_9",
          "title": "Totaling Values (SUM)",
          "lesson_content": "The `SUM()` function returns the total sum of a numeric column.\n\nExample:\n```sql\nSELECT SUM(amount)\nFROM payments;\n```",
          "challenge_id": "spt_sum"
        },
        {
          "id": "gp_spt_2_10",
          "title": "Averages and Maximums",
          "lesson_content": "You can use `AVG()` to find the average and `MAX()` or `MIN()` to find the extremes of a numeric column.\n\nExample:\n```sql\nSELECT AVG(salary), MAX(salary)\nFROM employees;\n```",
          "challenge_id": "spt_min_max"
        },
        {
          "id": "gp_spt_2_11",
          "title": "Grouping Results (GROUP BY)",
          "lesson_content": "The `GROUP BY` statement groups rows that have the same values into summary rows.\n\nExample:\n```sql\nSELECT department, SUM(sales)\nFROM departments\nGROUP BY department;\n```",
          "challenge_id": "spt_14"
        },
        {
          "id": "gp_spt_2_12",
          "title": "Filtering Groups (HAVING)",
          "lesson_content": "The `HAVING` clause evaluates conditions *after* aggregates have been grouped.\n\nExample:\n```sql\nSELECT department, SUM(sales) FROM departments \nGROUP BY department \nHAVING SUM(sales) > 1000;\n```",
          "challenge_id": "spt_38"
        },
        {
          "id": "gp_spt_2_13",
          "title": "Updating Existing Records",
          "lesson_content": "Use `UPDATE` and `SET` to modify existing data. Always use a `WHERE` clause.\n\nExample:\n```sql\nUPDATE employees\nSET salary = 60000\nWHERE id = 5;\n```",
          "challenge_id": "spt_19"
        },
        {
          "id": "gp_spt_2_14",
          "title": "Updating Multiple Fields",
          "lesson_content": "You can update multiple columns at once by separating them with commas.\n\nExample:\n```sql\nUPDATE employees\nSET title = 'Manager', salary = 80000\nWHERE id = 5;\n```",
          "challenge_id": "spt_update_multiple"
        },
        {
          "id": "gp_spt_2_16",
          "title": "Altering Tables (Adding Columns)",
          "lesson_content": "If you need to add a new column to an existing table, use the `ALTER TABLE ... ADD COLUMN` statement.\n\nExample:\n```sql\nALTER TABLE customers\nADD COLUMN email VARCHAR(255);\n```",
          "challenge_id": "spt_26"
        },
        {
          "id": "gp_spt_2_17",
          "title": "Dropping Tables",
          "lesson_content": "Use `DROP TABLE` to permanently delete an entire table and all of its contents. This cannot be undone.\n\nExample:\n```sql\nDROP TABLE temp_reports;\n```",
          "challenge_id": "spt_drop_table"
        }
      ]
    },
    {
      "pass": 3,
      "title": "Pass 3: Relationships & Security",
      "description": "Connect multiple tables and enforce basic data integrity.",
      "steps": [
        {
          "id": "gp_spt_3_1",
          "title": "Introduction to Table Relationships (INNER JOIN)",
          "lesson_content": "An `INNER JOIN` returns records that have matching values in both tables.\n\nExample:\n```sql\nSELECT users.name, orders.amount\nFROM users\nINNER JOIN orders\n  ON users.id = orders.user_id;\n```",
          "challenge_id": "spt_6"
        },
        {
          "id": "gp_spt_3_2",
          "title": "Enforcing Table Architecture (Foreign Keys)",
          "lesson_content": "When creating tables, you can define a `FOREIGN KEY` to enforce a relationship.\n\nExample:\n```sql\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER,\n  FOREIGN KEY(user_id) REFERENCES users(id)\n);\n```",
          "challenge_id": "spt_42"
        },
        {
          "id": "gp_spt_3_3",
          "title": "Inline Data Constraints (NOT NULL, UNIQUE, CHECK)",
          "lesson_content": "Constraints prevent bad data. `NOT NULL` prevents empty values, `UNIQUE` ensures no duplicates.\n\nExample:\n```sql\nCREATE TABLE accounts (\n  email TEXT UNIQUE NOT NULL,\n  balance INTEGER CHECK(balance >= 0)\n);\n```",
          "challenge_id": "spt_add_constraints"
        },
        {
          "id": "gp_spt_3_4",
          "title": "Data Integrity (Constraint Violations / Cascades)",
          "lesson_content": "Trying to delete a parent row referenced by a `FOREIGN KEY` might violate constraints.",
          "challenge_id": "spt_relationship_checks"
        }
      ]
    },
    {
      "pass": 4,
      "title": "Pass 4: Advanced Queries & Subqueries",
      "description": "Tackle complex reporting and nested logic.",
      "steps": [
        {
          "id": "gp_spt_4_1",
          "title": "Including Unmatched Records (LEFT JOIN)",
          "lesson_content": "A `LEFT JOIN` returns all records from the left table, and the matched records from the right table.\n\nExample:\n```sql\nSELECT users.name, orders.amount\nFROM users\nLEFT JOIN orders\n  ON users.id = orders.user_id;\n```",
          "challenge_id": "spt_15"
        },
        {
          "id": "gp_spt_4_2",
          "title": "Multi-Table Chains",
          "lesson_content": "You can chain multiple `JOIN` statements together to connect distant tables.",
          "challenge_id": "spt_9"
        },
        {
          "id": "gp_spt_4_3",
          "title": "Finding Missing Data (IS NULL)",
          "lesson_content": "Combining LEFT JOIN with `WHERE ... IS NULL` allows you to find orphans.",
          "challenge_id": "spt_not_ordered"
        },
        {
          "id": "gp_spt_4_4",
          "title": "Filtering using Subqueries (Left Join/Subquery combos)",
          "lesson_content": "You can use a subquery in a `WHERE` clause to filter out records based on a secondary result set.",
          "challenge_id": "spt_34"
        },
        {
          "id": "gp_spt_4_5",
          "title": "Advanced Subquery Comparisons",
          "lesson_content": "You can evaluate values against dynamic aggregate subqueries.",
          "challenge_id": "spt_above_average"
        },
        {
          "id": "gp_spt_4_6",
          "title": "Conditional Logic with CASE WHEN",
          "lesson_content": "The `CASE` expression works like an IF-THEN-ELSE statement in SQL.",
          "challenge_id": "spt_case_when"
        },
        {
          "id": "gp_spt_4_7",
          "title": "Subqueries in the SELECT Clause",
          "lesson_content": "You can run an isolated subquery directly inside the `SELECT` sequence to pull in a single value alongside normal rows.",
          "challenge_id": "spt_select_subquery"
        }
      ]
    },
    {
      "pass": 5,
      "title": "Pass 5: Masterclass Architecture & Advanced Features",
      "description": "Database administration, performance, and advanced analytics.",
      "steps": [
        {
          "id": "gp_spt_5_1",
          "title": "Composite Primary Keys and Out-of-Line Constraints",
          "lesson_content": "A primary key can span multiple columns (a composite key).\n\nExample:\n```sql\nCREATE TABLE assignments (\n  user_id INTEGER,\n  role_id INTEGER,\n  PRIMARY KEY (user_id, role_id)\n);\n```",
          "challenge_id": "spt_43"
        },
        {
          "id": "gp_spt_5_2",
          "title": "Advanced Schema Planning",
          "lesson_content": "Designing normalized multi-table schemas requires forethought to reduce duplication.",
          "challenge_id": "spt_44"
        },
        {
          "id": "gp_spt_5_3",
          "title": "Speeding Up Lookups (CREATE INDEX)",
          "lesson_content": "Indexes improve the speed of data retrieval operations.",
          "challenge_id": "spt_index"
        },
        {
          "id": "gp_spt_5_4",
          "title": "Saving Complex Queries (CREATE VIEW)",
          "lesson_content": "A view is a virtual table based on the result-set of an SQL statement.",
          "challenge_id": "spt_view"
        },
        {
          "id": "gp_spt_5_5",
          "title": "Building Custom Views",
          "lesson_content": "Views can aggregate data, enforce logic, and act as a secure permissions layer.",
          "challenge_id": "spt_custom_view"
        },
        {
          "id": "gp_spt_5_6",
          "title": "Altering Existing Views",
          "lesson_content": "Some systems let you replace views, while others require you to drop and recreate them.",
          "challenge_id": "spt_alter_view"
        },
        {
          "id": "gp_spt_5_7",
          "title": "The Recreation Pattern for Complex Modfications",
          "lesson_content": "Because SQLite constraints limit `ALTER TABLE`, modifying columns often requires recreating the table.",
          "challenge_id": "spt_recreation"
        },
        {
          "id": "gp_spt_5_8",
          "title": "Common Table Expressions (CTEs/WITH clauses)",
          "lesson_content": "A CTE is a temporary named result set that you can reference within another statement.",
          "challenge_id": "spt_ctes"
        },
        {
          "id": "gp_spt_5_9",
          "title": "Window Functions",
          "lesson_content": "Window functions perform a calculation across a set of table rows that are somehow related to the current row.",
          "challenge_id": "spt_window"
        }
      ]
    }
  ]
};

fs.writeFileSync('src/data/guidedPractice.json', JSON.stringify(data, null, 2));
console.log('Successfully added Sports domain to guidedPractice.json');
