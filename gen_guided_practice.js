const fs = require('fs');

const data = {
  "business": {
    "domain": "business",
    "name": "Data Analyst (Business)",
    "description": "Learn SQL by managing corporate databases, supply chains, and employee records.",
    "passes": [
      {
        "pass": 1,
        "title": "Pass 1: The Foundations (Surface Level)",
        "description": "Get comfortable reading and writing basic database structures and records.",
        "steps": [
          {
            "id": "gp_bus_1_1",
            "title": "Introduction to SELECT Statements",
            "lesson_content": "To retrieve data from a table, use the `SELECT` statement. The asterisk `*` means 'all columns'.\n\nExample:\n```sql\nSELECT * FROM employees;\n```",
            "challenge_id": "business_1"
          },
          {
            "id": "gp_bus_1_2",
            "title": "Selecting Specific Columns",
            "lesson_content": "Instead of selecting all columns, you can specify exactly which columns you want to retrieve by separating their names with commas.\n\nExample:\n```sql\nSELECT first_name, last_name FROM employees;\n```",
            "challenge_id": "business_28"
          },
          {
            "id": "gp_bus_1_3",
            "title": "Limiting Results",
            "lesson_content": "If a table is large, you might only want to see the first few rows. Use the `LIMIT` clause at the end of your query.\n\nExample:\n```sql\nSELECT * FROM orders LIMIT 5;\n```",
            "challenge_id": "business_24"
          },
          {
            "id": "gp_bus_1_4",
            "title": "Filtering Rows with WHERE",
            "lesson_content": "The `WHERE` clause acts as a filter, allowing you to only retrieve rows that meet a specific condition (like matching an ID, or a value greater than a number).\n\nExample:\n```sql\nSELECT * FROM products WHERE price > 50;\n```",
            "challenge_id": "business_2"
          },
          {
            "id": "gp_bus_1_5",
            "title": "Creating Your First Table",
            "lesson_content": "Use `CREATE TABLE` to define new structure. You must specify the column names and their data types (like `TEXT` for words or `INTEGER` for whole numbers).\n\nExample:\n```sql\nCREATE TABLE customers (\n  id INTEGER,\n  name TEXT\n);\n```",
            "challenge_id": "business_7"
          },
          {
            "id": "gp_bus_1_6",
            "title": "Adding Data with INSERT",
            "lesson_content": "Use `INSERT INTO` followed by the table name and the `VALUES` you wish to insert, in the exact order the columns were defined.\n\nExample:\n```sql\nINSERT INTO customers (id, name) \nVALUES (1, 'Alice');\n```",
            "challenge_id": "business_8"
          },
          {
            "id": "gp_bus_1_7",
            "title": "Deleting Basic Records",
            "lesson_content": "Use `DELETE FROM` to remove rows entirely. **Warning:** Always include a `WHERE` clause, otherwise all rows in a table will be deleted!\n\nExample:\n```sql\nDELETE FROM customers WHERE id = 1;\n```",
            "challenge_id": "business_11"
          }
        ]
      },
      {
        "pass": 2,
        "title": "Pass 2: Aggregations & Data Manipulation",
        "description": "Summarize data and perform basic table modifications.",
        "steps": [
          {
            "id": "gp_bus_2_1",
            "title": "Sorting Data with ORDER BY",
            "lesson_content": "Use `ORDER BY` to sort your results. You can specify `ASC` (low to high, default) or `DESC` (high to low).\n\nExample:\n```sql\nSELECT * FROM products ORDER BY price DESC;\n```",
            "challenge_id": "business_14"
          },
          {
            "id": "gp_bus_2_2",
            "title": "Finding Unique Values with DISTINCT",
            "lesson_content": "Adding `DISTINCT` right after `SELECT` will remove duplicate rows from your results.\n\nExample:\n```sql\nSELECT DISTINCT department FROM employees;\n```",
            "challenge_id": "business_18"
          },
          {
            "id": "gp_bus_2_3",
            "title": "Filtering with MULTIPLE Values (IN)",
            "lesson_content": "The `IN` operator lets you specify a list of values to match inside a `WHERE` clause, rather than using multiple `OR` statements.\n\nExample:\n```sql\nSELECT * FROM employees WHERE department IN ('Sales', 'Marketing');\n```",
            "challenge_id": "business_19"
          },
          {
            "id": "gp_bus_2_4",
            "title": "Filtering within Ranges (BETWEEN)",
            "lesson_content": "The `BETWEEN` operator selects values within a given inclusive range.\n\nExample:\n```sql\nSELECT * FROM orders WHERE total_cost BETWEEN 50 AND 100;\n```",
            "challenge_id": "business_20"
          },
          {
            "id": "gp_bus_2_5",
            "title": "Pattern Matching with LIKE",
            "lesson_content": "Use `LIKE` to search for a specified pattern in a column. The `%` wildcard matches any sequence of characters.\n\nExample (find names starting with 'S'):\n```sql\nSELECT * FROM customers WHERE name LIKE 'S%';\n```",
            "challenge_id": "business_15"
          },
          {
            "id": "gp_bus_2_6",
            "title": "Combining Filters (AND)",
            "lesson_content": "The `AND` operator displays a record if *all* conditions separated by `AND` are true.\n\nExample:\n```sql\nSELECT * FROM customers WHERE country = 'USA' AND city = 'Seattle';\n```",
            "challenge_id": "business_29"
          },
          {
            "id": "gp_bus_2_7",
            "title": "Alternative Filters (OR)",
            "lesson_content": "The `OR` operator displays a record if *any* of the conditions separated by `OR` is true.\n\nExample:\n```sql\nSELECT * FROM customers WHERE city = 'Seattle' OR city = 'Portland';\n```",
            "challenge_id": "business_30"
          },
          {
            "id": "gp_bus_2_8",
            "title": "Counting Rows (COUNT)",
            "lesson_content": "The `COUNT()` function returns the number of rows that match a specified criterion (or all rows if `*` is used).\n\nExample:\n```sql\nSELECT COUNT(*) FROM orders;\n```",
            "challenge_id": "business_5"
          },
          {
            "id": "gp_bus_2_9",
            "title": "Totaling Values (SUM)",
            "lesson_content": "The `SUM()` function returns the total sum of a numeric column.\n\nExample:\n```sql\nSELECT SUM(amount) FROM payments;\n```",
            "challenge_id": "business_6"
          },
          {
            "id": "gp_bus_2_10",
            "title": "Averages and Maximums",
            "lesson_content": "You can use `AVG()` to find the average and `MAX()` or `MIN()` to find the extremes of a numeric column.\n\nExample:\n```sql\nSELECT AVG(salary), MAX(salary) FROM employees;\n```",
            "challenge_id": "business_12"
          },
          {
            "id": "gp_bus_2_11",
            "title": "Grouping Results (GROUP BY)",
            "lesson_content": "The `GROUP BY` statement groups rows that have the same values into summary rows, often used with aggregate functions like `COUNT` or `SUM`.\n\nExample (Total sales per department):\n```sql\nSELECT department, SUM(sales) FROM departments GROUP BY department;\n```",
            "challenge_id": "business_13"
          },
          {
            "id": "gp_bus_2_12",
            "title": "Filtering Groups (HAVING)",
            "lesson_content": "The `HAVING` clause is like a `WHERE` clause, but it evaluates conditions *after* aggregates have been grouped.\n\nExample (Departments with high sales):\n```sql\nSELECT department, SUM(sales) FROM departments GROUP BY department HAVING SUM(sales) > 1000;\n```",
            "challenge_id": "business_21"
          },
          {
            "id": "gp_bus_2_13",
            "title": "Updating Existing Records",
            "lesson_content": "Use `UPDATE` and `SET` to modify existing data. Always use a `WHERE` clause to avoid updating every record!\n\nExample:\n```sql\nUPDATE employees SET salary = 60000 WHERE id = 5;\n```",
            "challenge_id": "business_9"
          },
          {
            "id": "gp_bus_2_14",
            "title": "Updating Multiple Fields",
            "lesson_content": "You can update multiple columns at once by separating them with commas in the `SET` block.\n\nExample:\n```sql\nUPDATE employees SET title = 'Manager', salary = 80000 WHERE id = 5;\n```",
            "challenge_id": "business_33"
          },
          {
            "id": "gp_bus_2_15",
            "title": "Conditional Deletions",
            "lesson_content": "You can use conditionals (like `<`, `>`, `AND`) in a `DELETE` statement to clear out ranges of unwanted data.\n\nExample:\n```sql\nDELETE FROM orders WHERE order_date < '2022-01-01' AND status = 'cancelled';\n```",
            "challenge_id": "business_34"
          },
          {
            "id": "gp_bus_2_16",
            "title": "Altering Tables (Adding Columns)",
            "lesson_content": "If you need to add a new column to an existing table, use the `ALTER TABLE ... ADD COLUMN` statement.\n\nExample:\n```sql\nALTER TABLE customers ADD COLUMN email VARCHAR(255);\n```",
            "challenge_id": "business_10"
          },
          {
            "id": "gp_bus_2_17",
            "title": "Dropping Tables",
            "lesson_content": "Use `DROP TABLE` to permanently delete an entire table and all of its contents. This cannot be undone.\n\nExample:\n```sql\nDROP TABLE temp_reports;\n```",
            "challenge_id": "business_36"
          }
        ]
      },
      {
        "pass": 3,
        "title": "Pass 3: Relationships & Security",
        "description": "Connect multiple tables and enforce basic data integrity.",
        "steps": [
          {
            "id": "gp_bus_3_1",
            "title": "Introduction to Table Relationships (INNER JOIN)",
            "lesson_content": "An `INNER JOIN` returns records that have matching values in both tables. This allows you to combine data mapped by an ID.\n\nExample:\n```sql\nSELECT users.name, orders.amount \nFROM users \nINNER JOIN orders ON users.id = orders.user_id;\n```",
            "challenge_id": "business_3"
          },
          {
            "id": "gp_bus_3_2",
            "title": "Enforcing Table Architecture (Foreign Keys)",
            "lesson_content": "When creating tables, you can define a `FOREIGN KEY` to enforce a relationship and ensure you can't insert orphaned data.\n\nExample:\n```sql\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER,\n  FOREIGN KEY(user_id) REFERENCES users(id)\n);\n```",
            "challenge_id": "business_42"
          },
          {
            "id": "gp_bus_3_3",
            "title": "Inline Data Constraints (NOT NULL, UNIQUE, CHECK)",
            "lesson_content": "Constraints prevent bad data. `NOT NULL` prevents empty values, `UNIQUE` ensures no duplicates, and `CHECK` evaluates a rule.\n\nExample:\n```sql\nCREATE TABLE accounts (\n  email TEXT UNIQUE NOT NULL,\n  balance INTEGER CHECK(balance >= 0)\n);\n```",
            "challenge_id": "todo_business_add_constraints"
          },
          {
            "id": "gp_bus_3_4",
            "title": "Data Integrity (Constraint Violations / Cascades)",
            "lesson_content": "Trying to insert a null value into a `NOT NULL` column or deleting a parent row referenced by a `FOREIGN KEY` will actively block the query in a strict system, throwing a constraint violation error.",
            "challenge_id": "todo_business_relationship_checks"
          }
        ]
      },
      {
        "pass": 4,
        "title": "Pass 4: Advanced Queries & Subqueries",
        "description": "Tackle complex reporting and nested logic.",
        "steps": [
          {
            "id": "gp_bus_4_1",
            "title": "Including Unmatched Records (LEFT JOIN)",
            "lesson_content": "A `LEFT JOIN` returns all records from the left table, and the matched records from the right table. The result is `NULL` from the right side if there is no match.\n\nExample:\n```sql\nSELECT users.name, orders.amount \nFROM users \nLEFT JOIN orders ON users.id = orders.user_id;\n```",
            "challenge_id": "business_4"
          },
          {
            "id": "gp_bus_4_2",
            "title": "Multi-Table Chains",
            "lesson_content": "You can chain multiple `JOIN` statements together to connect distant tables through intermediate relationships.",
            "challenge_id": "business_16"
          },
          {
            "id": "gp_bus_4_3",
            "title": "Finding Missing Data (IS NULL)",
            "lesson_content": "Because `LEFT JOIN` produces `NULL` fields for missing right-side data, combining it with `WHERE ... IS NULL` allows you to find 'orphans' (e.g., users who have never ordered).",
            "challenge_id": "business_37"
          },
          {
            "id": "gp_bus_4_4",
            "title": "Filtering using Subqueries (Left Join/Subquery combos)",
            "lesson_content": "A subquery is a query nested inside another. You can use it in a `WHERE` clause to filter out records based on a secondary result set.\n\nExample:\n```sql\nSELECT * FROM employees WHERE id NOT IN (SELECT employee_id FROM fired_log);\n```",
            "challenge_id": "business_39"
          },
          {
            "id": "gp_bus_4_5",
            "title": "Advanced Subquery Comparisons",
            "lesson_content": "You can evaluate values against dynamic aggregate subqueries, such as finding products priced higher than the company's average.\n\nExample:\n```sql\nSELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);\n```",
            "challenge_id": "business_40"
          },
          {
            "id": "gp_bus_4_6",
            "title": "Conditional Logic with CASE WHEN",
            "lesson_content": "The `CASE` expression goes through conditions and returns a value when the first condition is met. It works like an IF-THEN-ELSE statement.\n\nExample:\n```sql\nSELECT name, \n  CASE \n    WHEN count > 10 THEN 'High'\n    ELSE 'Low'\n  END AS capacity\nFROM stock;\n```",
            "challenge_id": "todo_business_case_when"
          },
          {
            "id": "gp_bus_4_7",
            "title": "Subqueries in the SELECT Clause",
            "lesson_content": "You can run an isolated subquery directly inside the `SELECT` sequence to pull in a single value alongside normal rows.\n\nExample:\n```sql\nSELECT name, (SELECT MAX(price) FROM competitors) AS competitor_high FROM products;\n```",
            "challenge_id": "todo_business_select_subquery"
          }
        ]
      },
      {
        "pass": 5,
        "title": "Pass 5: Masterclass Architecture & Advanced Features",
        "description": "Database administration, performance, and advanced analytics.",
        "steps": [
          {
            "id": "gp_bus_5_1",
            "title": "Composite Primary Keys and Out-of-Line Constraints",
            "lesson_content": "A primary key can span multiple columns (a composite key). This is usually defined out-of-line at the end of the `CREATE TABLE` statement.\n\nExample:\n```sql\nCREATE TABLE assignments (\n  user_id INTEGER,\n  role_id INTEGER,\n  PRIMARY KEY (user_id, role_id)\n);\n```",
            "challenge_id": "business_43"
          },
          {
            "id": "gp_bus_5_2",
            "title": "Advanced Schema Planning",
            "lesson_content": "Designing normalized multi-table schemas requires forethought to reduce duplication, enforce constraints, and establish clear logical connections between domains.",
            "challenge_id": "business_44"
          },
          {
            "id": "gp_bus_5_3",
            "title": "Speeding Up Lookups (CREATE INDEX)",
            "lesson_content": "Indexes improve the speed of data retrieval operations on a table at the cost of additional storage and slower `INSERT`s.\n\nExample:\n```sql\nCREATE INDEX idx_user_email ON users (email);\n```",
            "challenge_id": "business_17"
          },
          {
            "id": "gp_bus_5_4",
            "title": "Saving Complex Queries (CREATE VIEW)",
            "lesson_content": "A view is a virtual table based on the result-set of an SQL statement. It allows you to save a complex query and query *it* like a normal table later.\n\nExample:\n```sql\nCREATE VIEW ActiveUsers AS SELECT * FROM users WHERE status = 'active';\n```",
            "challenge_id": "business_22"
          },
          {
            "id": "gp_bus_5_5",
            "title": "Building Custom Views",
            "lesson_content": "Views can aggregate data, enforce logic, and act as a secure permissions layer by hiding sensitive columns.",
            "challenge_id": "business_45"
          },
          {
            "id": "gp_bus_5_6",
            "title": "Altering Existing Views",
            "lesson_content": "Some systems let you replace views (`CREATE OR REPLACE VIEW`), while others require you to `DROP VIEW` and recreate it.",
            "challenge_id": "business_46"
          },
          {
            "id": "gp_bus_5_7",
            "title": "The Recreation Pattern for Complex Modfications",
            "lesson_content": "Because SQLite constraints limit `ALTER TABLE`, dropping a column or changing a data type requires you to rename the table, create the new structure, copy the data, and drop the old table.",
            "challenge_id": "todo_business_recreation"
          },
          {
            "id": "gp_bus_5_8",
            "title": "Common Table Expressions (CTEs/WITH clauses)",
            "lesson_content": "A CTE is a temporary named result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. It makes recursive or extremely nested logic more readable.\n\nExample:\n```sql\nWITH HighEarners AS (SELECT * FROM employees WHERE salary > 100k)\nSELECT * FROM HighEarners WHERE department = 'IT';\n```",
            "challenge_id": "todo_business_ctes"
          },
          {
            "id": "gp_bus_5_9",
            "title": "Window Functions",
            "lesson_content": "Window functions perform a calculation across a set of table rows that are somehow related to the current row, without grouping them into a single aggregate row.\n\nExample:\n```sql\nSELECT name, salary, ROW_NUMBER() OVER(ORDER BY salary DESC) as rank FROM employees;\n```",
            "challenge_id": "todo_business_window_functions"
          }
        ]
      }
    ]
  }
};

fs.writeFileSync('src/data/guidedPractice.json', JSON.stringify(data, null, 2));

