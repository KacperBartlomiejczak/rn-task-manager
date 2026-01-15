import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./taskCard";
import type { Task } from "@/context/taskContext";

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
  return (
    <motion.div
      className="space-y-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
