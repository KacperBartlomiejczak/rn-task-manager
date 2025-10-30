<p align="center">
  <img src="public/readmeImg.png" alt="Todo Manager Screenshot" width="600"/>
</p>

# Todo Manager

A modern and feature-rich Todo List application built with React, TypeScript, and Vite. It allows users to manage their daily tasks with advanced features like task recurrence, daily progress tracking, and historical performance summaries.

## Key Features

- **Create, Delete, and Complete Tasks:** Standard functionality for managing tasks.
- **Task Recurrence:** Set tasks as one-time, daily, or for specific days of the week.
- **Dynamic Task Filtering:** The task list automatically filters to show only the tasks relevant for the current day.
- **Daily Progress Tracking:** A visual progress bar and percentage score show how many of the day's tasks are complete.
- **Confetti Celebration:** A fun emoji confetti animation plays upon completing all tasks for the day.
- **Historical Summary:** View a history of daily performance in a dialog, showing completion percentages for past days.
- **Persistent State:** All tasks and historical summary data are saved in the browser's `localStorage`, ensuring your data is preserved across sessions.
- **Responsive Design:** The layout is designed to work seamlessly on both desktop and mobile devices.

## Tech Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animation:** [react-confetti](https://github.com/alampros/react-confetti)
- **Linting:** [ESLint](https://eslint.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) (which includes npm) installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/KacperBartlomiejczak/rn-task-manager.git
   ```
2. Navigate to the project directory:
   ```sh
   cd todo-manager
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

To start the application in development mode, run the following command. This will open the app on `http://localhost:5173` (or another port if 5173 is busy).

```sh
npm run dev
```

### Building for Production

To create a production-ready build of the application, run:

```sh
npm run build
```

This will create a `dist` folder in the project root with the optimized and minified files.