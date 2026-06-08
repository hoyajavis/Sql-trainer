# Human Resources Domain Implementation Plan

To successfully implement a new "Human Resources" domain (modeled after a retailer like H&M) and ensure it integrates seamlessly with the existing mechanisms, we will follow a structured, **batched approach**. This ensures we avoid token limit truncations when generating or modifying large arrays in data files (`challenges.json`, `guidedPractice.json`).

## Phase 1: Core Architecture & Schema Initialization
*Goal: Establish the database, types, and UI wiring for the specific domain without adding any challenge text yet.*
1. **Type Definitions (`src/types.ts`)**: Add `'human_resources'` to the `ChallengeDomain` union type.
2. **Seed Data Setup (`src/lib/seedScripts.ts`)**: Add a new key `human_resources` to `SEED_SCRIPTS` with `CREATE TABLE` and `INSERT INTO` statements.
   - Target schemas: `departments`, `stores`, `employees`, `payrolls`, `performance_reviews`.
3. **UI Domain Selection (`src/components/DomainSelectorModal.tsx`)**: Add the `human_resources` configuration (Icon: `BriefcaseBusiness`).
4. **ERD / Schema Helper (`src/components/ReferenceSheet.tsx`)**: Add schema metadata to `DOMAIN_SCHEMAS['human_resources']` ensuring robust `(FK)` target parsing for the visual node edge styling.

## Phase 2: Drills Batch 1 - Foundations & Aggregations
*Goal: Seed the challenge bank with fundamental operations, isolated in a single update step.*
1. **Target**: `src/data/challenges.json`
2. **Action**: Implement the first batch of 5-7 challenges.
   - *Concepts*: Filtering (`WHERE`), Sorting (`ORDER BY`), and Aggregations (`GROUP BY`).
   - *Examples*: "Find all employees hired after 2023", "Calculate the total store payroll budget".
   - *IDs*: `hr_1` through `hr_7`.

### Intermediate Step 2.5: Schema Validation (Foundations)
*Goal: Ensure the database schema seeded in Phase 1 has sufficient data types and complexities to support the initial challenges.*
- **Action**: Review the table structures. Are the `hire_date` columns properly formatted? Do payroll and budget columns use appropriate numeric types (e.g., DECIMAL or standard REAL/INTEGER in SQLite)? Are there adequate nulls or edge cases to demonstrate filtering logic? If deficient, update `src/lib/seedScripts.ts` and `ReferenceSheet.tsx`.

## Phase 3: Drills Batch 2 - Joins & Subqueries
*Goal: Expand the challenge bank with advanced HR scenarios in a separate chunked update.*
1. **Target**: `src/data/challenges.json`
2. **Action**: Implement a second batch of 5-7 advanced challenges.
   - *Concepts*: `INNER/LEFT JOIN`, `Subclauses`, `Window Functions` (if supported).
   - *Examples*: "List all Store Managers alongside their store location", "Identify employees receiving the highest performance rating but lowest bonus".
   - *IDs*: `hr_8` through `hr_14`.

### Intermediate Step 3.5: Schema Validation (Relational Complexity)
*Goal: Verify the schema can handle the complex joins and subqueries introduced in Batch 2.*
- **Action**: Examine the foreign key relationships. Does the `store_manager_id` correctly reference the `employees` table? Is there sufficient overlap and variety in the `performance_reviews` and `payrolls` tables to make subqueries meaningful? Ensure we haven't created a "too perfect" dataset where `INNER` and `LEFT` JOIN yield identical results. Adjust `seedScripts.ts` as needed.

## Phase 4: Guided Practice Implementation
*Goal: Assemble the created challenges into structured learning tracks.*
1. **Target**: `src/data/guidedPractice.json`
2. **Action**: Create a top-level `human_resources` object.
   - **Pass 1 (HR Foundations)**: Link steps to the foundational IDs generated in Phase 2.
   - **Pass 2 (Advanced HR Analytics)**: Link steps to the relational IDs generated in Phase 3.
   - Validate that concept hints tie correctly back to the core lesson modules.

### Intermediate Step 4.5: Schema Validation (Pedagogical Cohesion)
*Goal: Final check to guarantee the schema aligns with the structured learning paths.*
- **Action**: Re-evaluate the entire `human_resources` ERD against the pedagogical progression defined in Guided Practice. Ensure the data variations actively support the progressive "Hints" mechanisms (e.g., Step-by-Step Scaffolding and Misconception traps). If a guided lesson aims to teach `NULL` handling, we must ensure the schema includes `NULL` values in relevant fields like `bonus` or `title`. Update seed data if required.

## Execution Strategy
By isolating our updates (Types/UI ➔ Data Batch 1 ➔ Validation ➔ Data Batch 2 ➔ Validation ➔ Guided Practice ➔ Final Validation), we protect against file truncation drops and ensure pedagogical robustness. We will confirm after each phase and intermediate step before starting the next batch.
