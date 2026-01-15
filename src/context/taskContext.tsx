import { useState, createContext, useEffect, type ReactNode } from "react";

type RecurrenceType = "one-time" | "every-day" | "specific-day";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  recurrence: RecurrenceType;
  selectedDays?: string[]; // e.g., ["Monday", "Tuesday"]
  date?: string; // ISO Date string YYYY-MM-DD for one-time tasks
}

interface TaskContextType {
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
  handleAddTask: (taskData: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleMakeTaskComplete: (taskId: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>(() => {
    try {
      let initialTasks: Task[] = [];
      const localData = localStorage.getItem("allTasks");
      if (localData) {
        initialTasks = JSON.parse(localData);
      } else {
        // Handle migration from old key 'taskList'
        const oldData = localStorage.getItem("taskList");
        if (oldData) {
          initialTasks = JSON.parse(oldData);
          localStorage.setItem("allTasks", oldData);
          localStorage.removeItem("taskList");
        }
      }

      const lastVisit = localStorage.getItem("lastVisitDate");
      const today = new Date().toISOString().split("T")[0];

      if (lastVisit && lastVisit !== today) {
        // Save summary for the previous day before cleaning up
        const total = initialTasks.length;
        if (total > 0) {
          const completed = initialTasks.filter((t) => t.isCompleted).length;
          const newSummary = { date: lastVisit, completed, total };
          const summaries = JSON.parse(
            localStorage.getItem("dailySummaries") || "[]"
          );
          summaries.push(newSummary);
          localStorage.setItem("dailySummaries", JSON.stringify(summaries));
        }

        // Perform cleanup for the new day
        localStorage.setItem("lastVisitDate", today);
        return initialTasks
          .filter(
            (task) => !(task.recurrence === "one-time" && task.isCompleted)
          )
          .map((task) => {
            if (
              task.recurrence === "every-day" ||
              task.recurrence === "specific-day"
            ) {
              return { ...task, isCompleted: false };
            }
            return task;
          });
      } else if (!lastVisit) {
        // First visit ever
        localStorage.setItem("lastVisitDate", today);
      }

      return initialTasks;
    } catch (error) {
      console.error("Error initializing tasks from localStorage", error);
      return [];
    }
  });

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    const dayName = selectedDate
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const visibleTasks = allTasks.filter((task) => {
      if (task.recurrence === "specific-day") {
        return task.selectedDays?.includes(dayName);
      }
      if (task.recurrence === "one-time") {
        // Strict filtering: if it has a date, it must match.
        if (task.date) {
          // Compare only the YYYY-MM-DD part
          const selectedDateString = selectedDate.toISOString().split("T")[0];
          return task.date === selectedDateString;
        }
        // Legacy tasks (no date) show on Today only
        const todayString = new Date().toISOString().split("T")[0];
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        return todayString === selectedDateString;
      }
      return true;
    });
    setTaskList(visibleTasks);

    const completed = visibleTasks.filter((task) => task.isCompleted).length;
    setCompletedTasks(completed);
  }, [allTasks, selectedDate]);

  const handleAddTask = (taskData: Task) => {
    setAllTasks((prevTasks) => [...prevTasks, taskData]);
  };

  const handleDeleteTask = (taskId: string) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleMakeTaskComplete = (taskId: string) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        completedTasks,
        setCompletedTasks: () => {}, // setCompletedTasks is now derived, provide a no-op
        taskList,
        setTaskList: setAllTasks, // setTaskList now modifies the master list
        handleAddTask,
        handleDeleteTask,
        handleMakeTaskComplete,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export type { Task, RecurrenceType };
