import { useContext } from "react";
import { motion } from "framer-motion";

//components
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@/context/taskContext";
import DeleteDialogTaskCard from "./deleteDialogtaskCard";

import { TaskContext } from "@/context/taskContext";

export default function TaskCard({ task }: { task: Task }) {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("TaskCard must be used within TaskProvider");
  }

  const { handleMakeTaskComplete } = taskContext;

  const getRecurrenceText = () => {
    switch (task.recurrence) {
      case "one-time":
        return "One-time task";
      case "every-day":
        return "Daily task";
      case "specific-day":
        return `Repeats on: ${
          task.selectedDays?.join(", ") || "No days selected"
        }`;
      default:
        return "";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`w-full glass border-none transition-all duration-300 group ${
          task.isCompleted ? "opacity-60 bg-black/20" : "bg-card/40"
        }`}
      >
        <CardContent className="flex items-center gap-4 p-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Checkbox
              className="flex-shrink-0 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              checked={task.isCompleted}
              onCheckedChange={() => handleMakeTaskComplete(task.id)}
            />
          </motion.div>
          <div className="flex w-full items-center justify-between min-w-0">
            <div className="flex flex-col text-left flex-1 min-w-0 mr-4">
              <motion.span
                className={`font-medium text-lg truncate transition-colors ${
                  task.isCompleted
                    ? "line-through text-gray-500"
                    : "text-gray-100 group-hover:text-primary"
                }`}
                animate={task.isCompleted ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {task.title}
              </motion.span>
              <span className="text-sm text-gray-500 truncate">
                {getRecurrenceText()}
              </span>
            </div>
            <DeleteDialogTaskCard taskId={task.id} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
