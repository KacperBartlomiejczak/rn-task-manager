import { useState, createContext } from "react";

//Create context for all tasks

interface TaskContextType {
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
}
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  recurrence?: {
    enabled: boolean;
    days?: (
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday"
    )[];
  };
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <TaskContext.Provider
      value={{
        completedTasks,
        setCompletedTasks,
        taskList,
        setTaskList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
