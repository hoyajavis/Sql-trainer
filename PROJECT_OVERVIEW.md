# Project Overview: Interactive SQL Learning Environment

## Background
This project was developed to provide an accessible, deeply interactive platform for learning and practicing Structured Query Language (SQL). Recognizing that traditional database management education often relies on static textbook examples or cumbersome local database setups, this application was built as a lightweight, frictionless alternative. It allows learners to immediately jump into writing and executing queries without any environmental configuration.

## Purpose
The primary purpose of this application is to support students mastering relational databases at the introductory and intermediate levels. It bridges the gap between theoretical knowledge and practical execution by providing a secure, immediate feedback loop for hands-on query writing. 

Through carefully structured lesson passes and domain-specific challenges, it guides users from basic `SELECT` statements up through complex joins, aggregations, subqueries, and advanced analytics (such as Common Table Expressions and Window Functions).

## Intended Audience
This application is designed specifically for **students of Computer Science, Data Analytics, and Information Technology in the School of Technology at WGU (Western Governors University)**. 

It directly assists with the core competencies evaluated in two major courses:
*   **Foundations of Data Management**: Covering the basics of database architecture, surface-level queries, data filtering, and elementary schema design.
*   **Applications of Data Management**: Covering complex reporting, multi-table relationships (Joins), data integrity, subqueries, and advanced SQL features.

## What It Contains
The application offers three core modes of interaction, all personalized across 9 unique professional domains (Business, Science, Education, Healthcare, Media, Sports, Aviation, Real Estate, and Human Resources):

1.  **Guided Practice**: A step-by-step curriculum encompassing 6 distinct passes (The Foundations, Aggregations & Data Manipulation, Relationships & Security, Advanced Queries, Masterclass Architecture, and Advanced Analytics). Each step offers brief lesson context alongside a practical exercise.
2.  **Drills**: An open-ended challenge board for testing knowledge without the lesson scaffolding.
3.  **Sandbox / Reference**: A free-form query editor where students can experiment with the current domain's schema, paired with a comprehensive cheat sheet.

## How It Was Built
*   **Architecture**: Built as a mobile-first, client-side Single Page Application (SPA).
*   **Framework**: React 18 with TypeScript and Vite.
*   **Styling**: Tailwind CSS, utilizing a clean, highly scannable, and touch-friendly interface optimized for learning rather than visual distraction.
*   **Database Engine**: Uses **sql.js** (SQLite compiled to WebAssembly) to run a complete relational database engine directly inside the user's browser. This allows for instantaneous query execution, safe structural modifications (like `DROP TABLE`), and automatic session resetting without the need for a dedicated backend server or cloud database.
*   **Evaluation Engine**: Custom evaluation logic intercepts user queries, runs them against the internal SQLite memory state, and compares the resulting data frames against predefined solution queries to verify correctness intelligently.
