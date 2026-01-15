import "./App.css";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import TaskDailyProgress from "./components/taskDailyProgress";

import { TaskContext } from "./context/taskContext";
import NoTaskAvailable from "./components/noTaskAvailable";
import AddTaskModal from "./components/taskModal/addTaskModal";
import TaskCards from "./components/taskCard/taskCards";

import ViewDailySummaryDialog from "./components/ViewDailySummaryDialog";
import DaySelector from "./components/daySelector";

function App() {
  let content = <NoTaskAvailable />;
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("App must be used within TaskProvider");
  }

  if (taskContext?.taskList.length) {
    content = <TaskCards tasks={taskContext.taskList} />;
  }

  return (
    <main>
      <div className="container mx-auto">
        <Header />
        <DaySelector />
        <motion.div
          className="flex flex-col md:flex-row md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-1">
            <TaskDailyProgress
              totalTasks={taskContext.taskList.length}
              completedTasks={taskContext.completedTasks}
            />
            <ViewDailySummaryDialog />
          </div>
          <div className="flex flex-col gap-2 md:flex-2 lg:flex-3">
            <AddTaskModal />
            <AnimatePresence mode="wait">
              <motion.div
                key={taskContext.taskList.length > 0 ? "tasks" : "empty"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default App;
