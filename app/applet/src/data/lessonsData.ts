export interface LessonBlock {
  type: 'text' | 'code';
  content: string;
}

export interface LessonPage {
  title?: string;
  blocks: LessonBlock[];
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  pages: LessonPage[];
}

export const LESSONS: LessonData[] = [
  {
    id: 'select_basics',
    title: 'The SELECT Statement',
    description: 'Learn how to retrieve data from a database.',
    pages: [
      {
        title: 'Basic Syntax',
        blocks: [
          { type: 'text', content: 'The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.' },
          { type: 'code', content: 'SELECT column1, column2 FROM table_name;' }
        ]
      },
      {
        title: 'Selecting All Columns',
        blocks: [
          { type: 'text', content: 'If you want to select all columns available in the table, use the asterisk (*) syntax:' },
          { type: 'code', content: 'SELECT * FROM table_name;' }
        ]
      },
      {
        title: 'Unique Values (DISTINCT)',
        blocks: [
          { type: 'text', content: 'The SELECT DISTINCT statement is used to return only distinct (different) values. Inside a table, a column often contains many duplicate values, and sometimes you only want to list the different values.' },
          { type: 'code', content: 'SELECT DISTINCT country FROM Customers;' }
        ]
      }
    ]
  },
  {
    id: 'filtering_where',
    title: 'Filtering with WHERE',
    description: 'Filter records that meet a certain condition.',
    pages: [
      {
        title: 'The WHERE Clause',
        blocks: [
          { type: 'text', content: 'The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition.' },
          { type: 'code', content: "SELECT * FROM Users WHERE age > 18;" }
        ]
      },
      {
        title: 'Operators',
        blocks: [
          { type: 'text', content: 'You can use operators like =, <>, >, <, >=, <=, BETWEEN, LIKE, and IN.' },
          { type: 'text', content: 'For example, to find a user by their exact name:' },
          { type: 'code', content: "SELECT * FROM Users WHERE name = 'Alice';" }
        ]
      },
      {
        title: 'Multiple Conditions (AND / OR)',
        blocks: [
          { type: 'text', content: 'The AND and OR operators are used to filter records based on more than one condition.' },
          { type: 'text', content: 'The AND operator displays a record if all the conditions separated by AND are TRUE.' },
          { type: 'code', content: "SELECT * FROM Users WHERE age > 18 AND country = 'USA';" },
          { type: 'text', content: 'The OR operator displays a record if any of the conditions separated by OR is TRUE.' },
          { type: 'code', content: "SELECT * FROM Users WHERE country = 'USA' OR country = 'UK';" }
        ]
      }
    ]
  },
  {
    id: 'sorting_order_by',
    title: 'Sorting Results',
    description: 'Sort your results in ascending or descending order.',
    pages: [
      {
        title: 'Ascending Order',
        blocks: [
          { type: 'text', content: 'The ORDER BY keyword is used to sort the result-set in ascending or descending order.' },
          { type: 'code', content: 'SELECT * FROM Users ORDER BY last_name ASC;' }
        ]
      },
      {
        title: 'Descending Order',
        blocks: [
          { type: 'text', content: 'It sorts records in ascending order by default. To sort the records in descending order, use the DESC keyword.' },
          { type: 'code', content: 'SELECT * FROM Users ORDER BY age DESC;' }
        ]
      }
    ]
  },
  {
    id: 'limit_offset',
    title: 'Limiting Results',
    description: 'Restrict the number of rows returned.',
    pages: [
      {
        title: 'The LIMIT Clause',
        blocks: [
          { type: 'text', content: 'The LIMIT clause is used to specify the number of records to return. It is very useful on large tables with thousands of records.' },
          { type: 'code', content: 'SELECT * FROM Customers\nLIMIT 5;' }
        ]
      },
      {
        title: 'Using OFFSET',
        blocks: [
          { type: 'text', content: 'You can use OFFSET to skip a number of rows before returning the limited results (useful for pagination).' },
          { type: 'code', content: 'SELECT * FROM Customers\nLIMIT 5 OFFSET 10;' }
        ]
      }
    ]
  },
  {
    id: 'aggregations',
    title: 'Aggregate Functions',
    description: 'Perform calculations on multiple rows to return a single value.',
    pages: [
      {
        title: 'Common Functions',
        blocks: [
          { type: 'text', content: 'SQL provides functions to perform calculations on your data. Common functions include COUNT(), SUM(), AVG(), MIN(), and MAX().' },
          { type: 'code', content: 'SELECT COUNT(*) as total_users,\n       AVG(age) as average_age,\n       MAX(score) as highest_score\nFROM Users;' }
        ]
      }
    ]
  },
  {
    id: 'grouping_data',
    title: 'Grouping Data',
    description: 'Group rows that have the same values into summary rows.',
    pages: [
      {
        title: 'The GROUP BY Statement',
        blocks: [
          { type: 'text', content: 'The GROUP BY statement groups rows that have the same values into summary rows, like "find the number of customers in each country".' },
          { type: 'text', content: 'It is often used with aggregate functions (COUNT(), MAX(), MIN(), SUM(), AVG()).' },
          { type: 'code', content: 'SELECT COUNT(customer_id), country\nFROM Customers\nGROUP BY country;' }
        ]
      }
    ]
  },
  {
    id: 'having_clause',
    title: 'Filtering Groups (HAVING)',
    description: 'Filter result sets that have been grouped.',
    pages: [
      {
        title: 'The HAVING Clause',
        blocks: [
          { type: 'text', content: 'The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions. Use it to filter groups.' },
          { type: 'code', content: 'SELECT country, COUNT(customer_id)\nFROM Customers\nGROUP BY country\nHAVING COUNT(customer_id) > 5;' }
        ]
      }
    ]
  },
  {
    id: 'joining_tables',
    title: 'Joining Tables',
    description: 'Combine rows from two or more tables.',
    pages: [
      {
        title: 'INNER JOIN',
        blocks: [
          { type: 'text', content: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them.' },
          { type: 'code', content: 'SELECT Orders.order_id, Customers.customer_name\nFROM Orders\nINNER JOIN Customers \n  ON Orders.customer_id = Customers.customer_id;' }
        ]
      },
      {
        title: 'Other Join Types',
        blocks: [
          { type: 'text', content: 'There are different types of joins:' },
          { type: 'text', content: '- INNER JOIN: Returns records that have matching values in both tables\n- LEFT JOIN: Returns all records from the left table, and matched records from the right table\n- RIGHT JOIN: Returns all records from the right table, and matched records from the left table\n- FULL JOIN: Returns all records when there is a match in either left or right table' }
        ]
      }
    ]
  },
  {
    id: 'subqueries',
    title: 'Subqueries',
    description: 'Use a query within another query.',
    pages: [
      {
        title: 'What is a Subquery?',
        blocks: [
          { type: 'text', content: 'A subquery is a query nested inside another query. It can be used to return data that will be used in the main query as a condition.' },
          { type: 'code', content: "SELECT first_name, last_name \nFROM Employees \nWHERE department_id IN (\n  SELECT id FROM Departments WHERE name = 'Engineering'\n);" }
        ]
      }
    ]
  },
  {
    id: 'string_functions',
    title: 'String Manipulation',
    description: 'Manipulate and format text data.',
    pages: [
      {
        title: 'Text Functions',
        blocks: [
          { type: 'text', content: 'SQL has various functions to manage strings. UPPER() converts text to uppercase, LOWER() to lowercase. The LIKE operator searches for patterns, usually with wildcards (%)' },
          { type: 'code', content: "SELECT CONCAT(first_name, ' ', last_name) AS full_name\nFROM Users\nWHERE email LIKE '%@gmail.com';" }
        ]
      }
    ]
  },
  {
    id: 'date_functions',
    title: 'Date & Time',
    description: 'Work with dates, times, and timestamps.',
    pages: [
      {
        title: 'Formatting Dates',
        blocks: [
          { type: 'text', content: 'SQLite stores dates as TEXT. You can use the strftime function to extract parts of the date or format it.' },
          { type: 'code', content: "SELECT strftime('%Y-%m', scheduled_departure) AS flight_month\nFROM flights;" },
          { type: 'text', content: "Note: In MySQL, you would use DATE_FORMAT() instead:" },
          { type: 'code', content: "SELECT DATE_FORMAT(scheduled_departure, '%Y-%m') AS flight_month;\n-- (Not supported in this SQLite environment)" }
        ]
      },
      {
        title: 'Current Date and Time',
        blocks: [
          { type: 'text', content: "Use functions like DATE('now') or DATETIME('now') to get the current date and time." },
          { type: 'code', content: "SELECT * FROM orders\nWHERE order_date > DATETIME('now', '-1 day');" },
          { type: 'text', content: "Note: In MySQL, you would use CURDATE() or NOW() and interval logic:" },
          { type: 'code', content: "SELECT * FROM orders\nWHERE order_date > NOW() - INTERVAL 1 DAY;\n-- (Not supported in this SQLite environment)" }
        ]
      }
    ]
  },
  {
    id: 'advanced_logic',
    title: 'Conditional Logic',
    description: 'Use logic like IF, CASE WHEN, and COALESCE.',
    pages: [
      {
        title: 'CASE WHEN Statements',
        blocks: [
          { type: 'text', content: 'The CASE statement goes through conditions and returns a value when the first condition is met (like an if-then-else statement).' },
          { type: 'code', content: "SELECT amount,\nCASE\n  WHEN amount > 100 THEN 'High'\n  WHEN amount > 50 THEN 'Medium'\n  ELSE 'Low'\nEND AS size\nFROM Orders;" }
        ]
      },
      {
        title: 'Handling NULLs',
        blocks: [
          { type: 'text', content: 'Use IFNULL() or COALESCE() to provide a default value if a column is NULL.' },
          { type: 'code', content: "SELECT product_name,\nCOALESCE(discount, 0) AS safe_discount\nFROM Products;" }
        ]
      }
    ]
  },
  {
    id: 'set_operations',
    title: 'Set Operations',
    description: 'Combine results from multiple queries.',
    pages: [
      {
        title: 'UNION & UNION ALL',
        blocks: [
          { type: 'text', content: 'The UNION operator is used to combine the result-set of two or more SELECT statements.' },
          { type: 'text', content: 'Every SELECT statement within UNION must have the same number of columns, with similar data types, in the same order.' },
          { type: 'code', content: "SELECT city FROM Customers\nUNION\nSELECT city FROM Suppliers;" },
          { type: 'text', content: 'Note: UNION selects only distinct values by default. Use UNION ALL to allow duplicate values.' }
        ]
      }
    ]
  },
  {
    id: 'ctes',
    title: 'Common Table Expressions',
    description: 'Create temporary named result sets with WITH.',
    pages: [
      {
        title: 'Using WITH',
        blocks: [
          { type: 'text', content: 'A CTE (Common Table Expression) allows you to define a temporary result set that you can reference within another statement.' },
          { type: 'code', content: 'WITH TopCustomers AS (\n  SELECT customer_id, SUM(amount) as total\n  FROM Orders\n  GROUP BY customer_id\n  HAVING SUM(amount) > 1000\n)\nSELECT Customers.name, TopCustomers.total\nFROM TopCustomers\nJOIN Customers \n  ON TopCustomers.customer_id = Customers.id;' }
        ]
      }
    ]
  },
  {
    id: 'insert_data',
    title: 'Inserting Data',
    description: 'Add new records into a table.',
    pages: [
      {
        title: 'The INSERT INTO Statement',
        blocks: [
          { type: 'text', content: 'The INSERT INTO statement is used to insert new records in a table. It is part of Data Manipulation queries.' },
          { type: 'code', content: "INSERT INTO Customers (name, country)\nVALUES ('John Doe', 'USA');" }
        ]
      }
    ]
  },
  {
    id: 'update_delete',
    title: 'Updating & Deleting',
    description: 'Modify existing records or remove them from a table.',
    pages: [
      {
        title: 'Updating Records',
        blocks: [
          { type: 'text', content: 'The UPDATE statement is used to modify existing records in a table. It uses the SET keyword to specify which columns should be changed.' },
          { type: 'code', content: "UPDATE Customers\nSET country = 'UK'\nWHERE name = 'John Doe';" }
        ]
      },
      {
        title: 'Updating Multiple Columns',
        blocks: [
          { type: 'text', content: 'You can update multiple columns at once by separating them with a comma in the SET clause.' },
          { type: 'code', content: "UPDATE Customers\nSET country = 'UK', status = 'active'\nWHERE customer_id = 105;" }
        ]
      },
      {
        title: 'The Danger of Missing WHERE',
        blocks: [
          { type: 'text', content: 'Warning: If you omit the WHERE clause in an UPDATE or DELETE statement, the operation will be applied to ALL records in the table! Always double-check your conditions.' },
          { type: 'code', content: "-- This updates every customer's country to UK!\nUPDATE Customers\nSET country = 'UK';" }
        ]
      },
      {
        title: 'Deleting Records',
        blocks: [
          { type: 'text', content: 'The DELETE FROM statement is used to remove existing rows from a table. Like UPDATE, it strongly relies on the WHERE clause to target specific records.' },
          { type: 'code', content: "DELETE FROM Customers\nWHERE name = 'John Doe';" }
        ]
      },
      {
        title: 'Conditional Deletion',
        blocks: [
          { type: 'text', content: 'You can use operators like IN, >, <, and others in the WHERE clause when deleting records to remove batches of data.' },
          { type: 'code', content: "DELETE FROM Customers\nWHERE last_login < '2023-01-01'\n  OR status = 'inactive';" }
        ]
      }
    ]
  },
  {
    id: 'create_table',
    title: 'Creating Tables',
    description: 'Define a new table and explore standard data types.',
    pages: [
      {
        title: 'Basic Structure',
        blocks: [
          { type: 'text', content: 'The CREATE TABLE statement is used to create a new table. You must define the table name and the columns.' },
          { type: 'code', content: 'CREATE TABLE Users (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  age INTEGER\n);' }
        ]
      },
      {
        title: 'Data Types & Options',
        blocks: [
          { type: 'text', content: 'You can define strict types for columns. Many systems support parenthetical options to specify length or precision:\n\n- CHAR(length): Fixed-length string, padded with spaces if shorter\n- VARCHAR(length): Variable-length string, e.g., VARCHAR(255)\n- DECIMAL(p, s): Exact numbers with precision (p) and scale (s)\n- INTEGER / BIGINT: Whole numbers of varying sizes\n- REAL: Floating point (decimal) values\n- BOOLEAN: True/false values (often 0 or 1 in SQLite)\n- DATE / TIMESTAMP: Dates and exact times\n- TEXT: Character strings of any length' },
          { type: 'code', content: 'CREATE TABLE Assets (\n  id BIGINT PRIMARY KEY,\n  price DECIMAL(10, 2),\n  size REAL,\n  created_at TIMESTAMP,\n  is_active BOOLEAN,\n  title VARCHAR(255),\n  currency CHAR(3)\n);' }
        ]
      }
    ]
  },
  {
    id: 'table_constraints',
    title: 'Table Constraints',
    description: 'Enforce rules using constraints and foreign keys.',
    pages: [
      {
        title: 'Inline Constraints',
        blocks: [
          { type: 'text', content: 'Constraints define rules for data validation. Inline constraints are defined directly alongside the column:\n\n- PRIMARY KEY: Uniquely identifies each record\n- NOT NULL: Column cannot be left empty (NULL)\n- UNIQUE: All values in the column must be distinct\n- DEFAULT: Sets a fallback value if none is specified\n- CHECK: Ensures values meet a specific condition' },
          { type: 'code', content: "CREATE TABLE Employees (\n  id INTEGER PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  age INTEGER CHECK (age >= 18),\n  status TEXT DEFAULT 'active'\n);" },
          { type: 'text', content: 'Note: In SQLite, "INTEGER PRIMARY KEY" automatically increments the ID. In MySQL, you explicitly add AUTO_INCREMENT:' },
          { type: 'code', content: "-- MySQL Example:\nCREATE TABLE Employees (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL\n);" }
        ]
      },
      {
        title: 'Out-of-Line Constraints',
        blocks: [
          { type: 'text', content: 'Constraints can also be defined "out-of-line" after all columns. This is useful for multi-column constraints, explicitly naming constraints (CONSTRAINT name ...), or using CHECK conditions based on multiple columns.' },
          { type: 'code', content: "CREATE TABLE Orders (\n  order_id INTEGER,\n  product_id INTEGER,\n  quantity INTEGER,\n  PRIMARY KEY (order_id, product_id),\n  CHECK (quantity >= 0)\n);" }
        ]
      },
      {
        title: 'Foreign Keys',
        blocks: [
          { type: 'text', content: 'When creating multiple related tables, you use FOREIGN KEY to link them together. The foreign key on a child table references the primary key of a parent table to enforce valid relationships.' },
          { type: 'code', content: "CREATE TABLE Departments (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(50)\n);\n\nCREATE TABLE Employees (\n  emp_id INTEGER PRIMARY KEY,\n  name VARCHAR(100),\n  dept_id INTEGER,\n  FOREIGN KEY (dept_id) REFERENCES Departments(id)\n);" }
        ]
      }
    ]
  },
  {
    id: 'alter_drop',
    title: 'Modifying Structure',
    description: 'Change existing tables by adding, renaming, or dropping columns, and deleting tables.',
    pages: [
      {
        title: 'Adding Columns',
        blocks: [
          { type: 'text', content: 'The ALTER TABLE statement allows you to add new columns to an existing table without deleting the data already inside it.' },
          { type: 'code', content: 'ALTER TABLE Users\nADD COLUMN phone_number VARCHAR(20);' },
          { type: 'text', content: 'You can also include constraints when adding a column, such as a DEFAULT value.' },
          { type: 'code', content: "ALTER TABLE Users\nADD COLUMN status TEXT DEFAULT 'active';" }
        ]
      },
      {
        title: 'Renaming Columns & Tables',
        blocks: [
          { type: 'text', content: 'You can rename an existing column to something more descriptive using RENAME COLUMN.' },
          { type: 'code', content: 'ALTER TABLE Users\nRENAME COLUMN phone_number TO contact_number;' },
          { type: 'text', content: 'You can also rename the entire table using RENAME TO.' },
          { type: 'code', content: 'ALTER TABLE Users\nRENAME TO Customers;' }
        ]
      },
      {
        title: 'Dropping Columns',
        blocks: [
          { type: 'text', content: 'If a column is no longer needed, you can remove it using DROP COLUMN. This will permanently delete the column and all the data it contains.' },
          { type: 'code', content: 'ALTER TABLE Customers\nDROP COLUMN contact_number;' }
        ]
      },
      {
        title: 'The "Recreation" Pattern',
        blocks: [
          { type: 'text', content: 'SQLite is relatively strict about what you can alter directly. For complex changes like changing a data type or removing constraints, you often need to recreate the table.' },
          { type: 'code', content: '-- 1. Rename the old table\nALTER TABLE Orders RENAME TO Orders_old;\n\n-- 2. Create the new table\nCREATE TABLE Orders (\n  id INTEGER PRIMARY KEY,\n  amount DECIMAL(10, 2)\n);\n\n-- 3. Copy data and drop the old table\nINSERT INTO Orders SELECT * FROM Orders_old;\nDROP TABLE Orders_old;' },
          { type: 'text', content: 'Note: In systems like MySQL or PostgreSQL, you do not need the Recreation Pattern. You can modify columns directly:' },
          { type: 'code', content: '-- MySQL Example (Not supported in this SQLite environment):\nALTER TABLE Orders MODIFY COLUMN amount DECIMAL(10, 2);\nALTER TABLE Orders DROP CONSTRAINT fk_user;' }
        ]
      },
      {
        title: 'Dropping Tables',
        blocks: [
          { type: 'text', content: 'To delete a table and all its data permanently, use DROP TABLE. The IF EXISTS clause prevents errors if the table is already gone. Be extremely careful!' },
          { type: 'code', content: 'DROP TABLE IF EXISTS Customers;' }
        ]
      }
    ]
  }
];
