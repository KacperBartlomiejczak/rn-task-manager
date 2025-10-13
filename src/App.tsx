import "./App.css";
import { useContext } from "react";
import Header from "./components/Header";
import TaskDailyProgress from "./components/taskDailyProgress";
import TaskButton from "./components/taskButton";
import Calender from "./assets/calender";

import { TaskContext } from "./context/taskContext";
import NoTaskAvailable from "./components/noTaskAvailable";
import AddTaskModal from "./components/taskModal/addTaskModal";
import { TaskProvider } from "@/context/taskContext";

function App() {
  const taskContext = useContext(TaskContext);

  console.log(taskContext?.taskList);
  return (
    <TaskProvider>
      <main>
        <div className="container mx-auto">
          <Header />
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex flex-col md:flex-1">
              <TaskDailyProgress />
              <TaskButton
                title="View Daily Summary"
                onClick={() => {}}
                className="hover:bg-green-400 focus:bg-green-400"
              >
                <Calender size={24} color="#000000" />
              </TaskButton>
            </div>
            <AddTaskModal />
          </div>
          {taskContext?.taskList.length === 0 ? <NoTaskAvailable /> : null}
        </div>
      </main>
    </TaskProvider>
  );
}

export default App;
