# SQL Mobile Trainer

A mobile-optimized SQL practice application featuring a built-in SQLite engine and interactive challenges. Build your SQL skills on the go!

## Features

- **Interactive Learning Modes:**
  - **Lessons & Concepts:** Learn structured SQL querying step-by-step.
  - **Guided Practice:** Follow along with guided interactive exercises.
  - **Drills:** Practice your rapid SQL skills.
  - **Sandbox:** A free-form environment to experiment with queries safely.
- **In-Browser Database Engine:** Runs entirely locally using `sql.js` (SQLite compiled to WebAssembly), requiring no backend database.
- **Visual Entity-Relationship Diagrams (ERD):** Understand database tables and their relationships through interactive diagrams using `reactflow`.
- **Mobile-Optimized Keyboard:** Features an on-screen custom SQL keyboard (`SQLKeyboard`) for rapid querying on touch devices.
- **Real-Time Execution & Results:** Evaluate queries and view results instantly.

## Tech Stack

This project uses modern web technologies:
- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database Engine:** [sql.js](https://sql.js.org/) (SQLite in WebAssembly)
- **Visualizations:** [React Flow](https://reactflow.dev/) (for database ERDs)
- **Animations:** [Motion](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

- `src/App.tsx`: Main application entry point and routing layout.
- `src/components/`: Core UI components including:
  - `Dashboard.tsx`: Main user hub.
  - `SQLKeyboard.tsx`: Custom virtual keyboard for SQL input.
  - `ReferenceSheet.tsx`: Schema reference and ERD visualization (using `reactflow`).
  - `QueryEvaluator.tsx` & `ResultsTable.tsx`: Execution logic and query output rendering.
- `src/hooks/useSQL.ts`: Custom hook that loads and manages the local `sql.js` database engine state.
- `src/data/`: Static data files containing challenges, lessons, and guided practice content.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

The application will be accessible at `http://localhost:3000` (or another port assigned by Vite).

## License

This project is created for educational and practice purposes.
