import "./App.css";
import { useContext } from "react";
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
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex flex-col md:flex-1">
            <TaskDailyProgress
              totalTasks={taskContext.taskList.length}
              completedTasks={taskContext.completedTasks}
            />
            <ViewDailySummaryDialog />
          </div>
          <div className="flex flex-col gap-2 md:flex-2 lg:flex-3">
            <AddTaskModal />
            {content}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
