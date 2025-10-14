import { useState, createContext } from "react";

type RecurrenceType = "one-time" | "every-day" | "specific-day";

interface TaskContextType {
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
  handleAddTask: (taskData: Task) => void;
  handleDeleteTask: (taskId: string) => void;
}

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  recurrence: RecurrenceType;
  selectedDays?: string[]; // Only used when recurrence is "specific-day"
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleAddTask = (taskData: Task) => {
    setTaskList((prevTasks) => {
      return [...prevTasks, { ...taskData }];
    });
  };
  const handleDeleteTask = (taskId: string) => {
    setTaskList((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
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
        handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Export the types for use in other components
export type { Task, RecurrenceType };
