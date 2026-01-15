import { useContext, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

//components
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@/context/taskContext";
import DeleteDialogTaskCard from "./deleteDialogtaskCard";

import { TaskContext } from "@/context/taskContext";

// Task type icons/emojis
const getTaskTypeIcon = (recurrence: Task["recurrence"]) => {
  switch (recurrence) {
    case "one-time":
      return "📅";
    case "every-day":
      return "🔄";
    case "specific-day":
      return "📆";
    default:
      return "✓";
  }
};

// Animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: -100,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
    },
  },
};

const completionVariants = {
  complete: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

export default function TaskCard({ task }: { task: Task }) {
  const taskContext = useContext(TaskContext);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (!taskContext) {
    throw new Error("TaskCard must be used within TaskProvider");
  }

  const { handleMakeTaskComplete } = taskContext;

  const getRecurrenceText = () => {
    switch (task.recurrence) {
      case "one-time":
        return task.date
          ? `Due: ${new Date(task.date).toLocaleDateString()}`
          : "One-time task";
      case "every-day":
        return "Every day";
      case "specific-day":
        return task.selectedDays?.join(", ") || "No days selected";
      default:
        return "";
    }
  };

  const getAccentColor = () => {
    if (task.isCompleted) return "from-green-500/50 to-emerald-500/50";
    return "from-violet-500/50 via-purple-500/50 to-pink-500/50";
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={
        !shouldReduceMotion
          ? {
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : {}
      }
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`w-full relative overflow-hidden border-none transition-all duration-500 group ${
          task.isCompleted
            ? "bg-black/30 backdrop-blur-md"
            : "bg-card/60 backdrop-blur-xl glass-hover"
        }`}
        style={{
          boxShadow:
            isHovered && !task.isCompleted
              ? "0 8px 32px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : task.isCompleted
              ? "0 4px 16px rgba(16, 185, 129, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Accent border gradient */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getAccentColor()}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        />

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <CardContent className="flex items-center gap-4 p-4 relative z-10">
          {/* Checkbox with enhanced animation */}
          <motion.div
            whileHover={!shouldReduceMotion ? { scale: 1.15, rotate: 5 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.85 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            animate={task.isCompleted ? completionVariants.complete : {}}
          >
            <Checkbox
              className="flex-shrink-0 h-5 w-5 border-2 border-white/30 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-violet-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-violet-400 transition-all duration-300"
              checked={task.isCompleted}
              onCheckedChange={() => handleMakeTaskComplete(task.id)}
            />
          </motion.div>

          {/* Task content */}
          <div className="flex w-full items-center justify-between min-w-0 gap-3">
            <div className="flex flex-col text-left flex-1 min-w-0">
              {/* Title with gradient on hover */}
              <motion.div className="flex items-center gap-2 mb-1">
                <motion.span
                  className="text-xl leading-none"
                  animate={
                    !shouldReduceMotion && isHovered && !task.isCompleted
                      ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.2, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {getTaskTypeIcon(task.recurrence)}
                </motion.span>
                <motion.h3
                  className={`font-semibold text-base sm:text-lg truncate transition-all duration-300 ${
                    task.isCompleted
                      ? "line-through text-gray-500"
                      : isHovered
                      ? "text-gradient"
                      : "text-gray-100"
                  }`}
                  layout
                >
                  {task.title}
                </motion.h3>
              </motion.div>

              {/* Recurrence info with icon */}
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span
                  className={`text-xs sm:text-sm font-medium truncate ${
                    task.isCompleted ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {getRecurrenceText()}
                </span>
              </motion.div>
            </div>

            {/* Delete button - shows on hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered || task.isCompleted ? 1 : 0.7,
                scale: isHovered ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              <DeleteDialogTaskCard taskId={task.id} />
            </motion.div>
          </div>
        </CardContent>

        {/* Completion celebration effect */}
        {task.isCompleted && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
