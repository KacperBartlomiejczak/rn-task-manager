import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import TaskProgressIcon from "@/assets/tasakProgressIcon";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskDailyProgressProps {
  totalTasks?: number;
  completedTasks?: number;
}

export default function TaskDailyProgress({
  totalTasks = 0,
  completedTasks = 0,
}: TaskDailyProgressProps) {
  const percentage = totalTasks > 0 ? (completedTasks! / totalTasks!) * 100 : 0;
  const isAllCompleted = totalTasks > 0 && completedTasks === totalTasks;

  // Animated progress
  const springProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    springProgress.set(percentage);
  }, [percentage, springProgress]);

  const progressWidth = useTransform(springProgress, (value) => `${value}%`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`mt-5 glass border-none text-white overflow-hidden relative transition-all duration-700 ${
          isAllCompleted
            ? "shadow-green-500/20 shadow-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5"
            : ""
        }`}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 pointer-events-none ${
            isAllCompleted
              ? "from-green-500/20 to-transparent opacity-100"
              : "from-primary/10 to-transparent opacity-100"
          }`}
          animate={
            isAllCompleted
              ? {
                  opacity: [0.5, 1, 0.5],
                  transition: { duration: 2, repeat: Infinity },
                }
              : {}
          }
        />

        <CardHeader className="flex justify-between relative z-10 flex-row items-center space-y-0 pb-2">
          <motion.div layout>
            <CardTitle
              className={`text-lg font-medium transition-colors duration-500 ${
                isAllCompleted ? "text-green-200" : "text-gray-200"
              }`}
            >
              {isAllCompleted ? "All Tasks Completed!" : "Today's Progress"}
            </CardTitle>
          </motion.div>
          <motion.div
            animate={
              isAllCompleted ? { rotate: [0, 360], scale: [1, 1.2, 1] } : {}
            }
            transition={{ duration: 0.6 }}
          >
            <TaskProgressIcon
              color={isAllCompleted ? "#4ade80" : "#c084fc"}
              size={24}
            />
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.h3
            className={`text-left font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r transition-all duration-700 ${
              isAllCompleted
                ? "from-green-300 to-emerald-500 scale-105 origin-left"
                : "from-white to-gray-400"
            }`}
            layout
          >
            <motion.span
              key={completedTasks}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {completedTasks}
            </motion.span>
            <span
              className={`text-lg font-normal ml-2 transition-colors duration-500 ${
                isAllCompleted ? "text-green-300" : "text-gray-400"
              }`}
            >
              / {totalTasks} Tasks
            </span>
          </motion.h3>

          <div className="mt-4 relative h-3 w-full overflow-hidden rounded-full bg-secondary/30">
            <motion.div
              className={`h-full bg-gradient-to-r shadow-[0_0_15px_rgba(0,0,0,0.3)] ${
                isAllCompleted
                  ? "from-green-400 via-emerald-500 to-teal-500 shadow-green-500/50"
                  : "from-indigo-500 via-purple-500 to-pink-500"
              }`}
              style={{ width: progressWidth }}
              initial={{ width: "0%" }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
