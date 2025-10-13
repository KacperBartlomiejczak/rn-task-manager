import { useState, createContext } from "react";

//Create context for all tasks

interface TaskContextType {
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
  handleAddTask: (taskData: Task) => void;
}
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleAddTask = (taskData: Task) => {
    setTaskList((prevTasks) => {
      
      return [...prevTasks, {...taskData}];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        completedTasks,
        setCompletedTasks,
        taskList,
        setTaskList,
        handleAddTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
