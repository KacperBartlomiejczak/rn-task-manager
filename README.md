# 📜 Task Manager

> A modern, persistent todo list manager built with React, TypeScript, and a Deep Space Glassmorphism aesthetic.

<p align="center">
  <img src="public/readmeImg.png" alt="Task Manager Screenshot" width="800" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />
</p>

## 🚀 Overview

Task Manager is a beautiful and functional application designed to help you organize your daily life. It allows you to create tasks for specific days, manage recurring daily habits, and track your progress with visual feedback. With its "Deep Space" theme, managing tasks feels like navigating the cosmos.

## 🌟 Key Features

- **📅 Smart Day Selection**: Easily navigate between days to plan ahead or review past achievements.
- **🔄 Renewable Tasks**: Create "Daily" tasks that automatically reappear every day, perfect for building habits.
- **⚡ One-Time Tasks**: Add specific tasks for selected dates.
- **📊 Visual Progress**: Track your daily completion rate with a dynamic progress bar.
- **🎉 Confetti Celebration**: Get rewarded with a confetti animation when you complete 100% of your daily tasks!
- **💾 Local Storage**: All your tasks and progress are saved locally in your browser, so you never lose data.
- **🎨 Deep Space Design**: Enjoy a premium, glassmorphism-inspired UI with smooth gradients and animations.

## 🛠️ Tech Stack

This project is built using the latest web technologies for speed and scalability:

- **[React 19](https://react.dev/)**: The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: For type-safe code and better developer experience.
- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible components for building high-quality design systems (Dialog, Progress, Checkbox).
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icons.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready motion library for React with spring physics and gesture animations.

## 🏃‍♂️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KacperBartlomiejczak/rn-task-manager.git
    cd rn-task-manager
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

A quick look at the top-level files and directories you'll encounter.

```
src/
├── components/        # Reusable UI components (Header, TaskCards, Modals)
├── context/           # React Context for global state management (TaskContext)
├── lib/               # Utility functions (Tailwind class merger)
├── App.tsx            # Main application component layout
├── App.css            # Global styles and CSS variables
└── main.tsx           # Entry point
```

## 🔮 Future Improvements

We are constantly working to improve the Task Manager. Here are some features planned for the future:

- [ ] **Backlog / Inbox**: A place for tasks not yet assigned to a specific day.
- [ ] **Time Scheduling**: Set exact hours and minutes for tasks.
- [ ] **Push Notifications**: Browser notifications to remind you when it's time to work.
- [ ] **Drag & Drop**: Reorder tasks easily.
- [ ] **Categories/Tags**: Group tasks by work, personal, health, etc.

---

Made with ❤️ by [Kacper Bartłomiejczak](https://github.com/KacperBartlomiejczak)
