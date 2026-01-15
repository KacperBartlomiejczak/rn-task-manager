import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./taskCard";
import type { Task } from "@/context/taskContext";
import { TASK_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TaskCardsProps {
  tasks: Task[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TaskCards({ tasks }: TaskCardsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    if (!selectedCategory) return tasks;
    return tasks.filter((task) => task.emoji === selectedCategory);
  }, [tasks, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Category Filter Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Filter by Category
          </span>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mask-linear-right">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap border-2",
              !selectedCategory
                ? "bg-violet-600/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
            )}
          >
            All Tasks
          </button>
          {TASK_CATEGORIES.map((cat) => {
            const hasTasks = tasks.some((t) => t.emoji === cat.emoji);
            if (!hasTasks && selectedCategory !== cat.emoji) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.emoji)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap border-2 flex items-center gap-2",
                  selectedCategory === cat.emoji
                    ? "bg-violet-600/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 glass rounded-3xl border border-dashed border-white/10"
            >
              <p className="text-gray-500">No tasks in this category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
