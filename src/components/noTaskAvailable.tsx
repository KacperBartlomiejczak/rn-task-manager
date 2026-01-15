import { motion } from "framer-motion";
import SadEmoji from "@/assets/sadEmoji";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function NoTaskAvailable() {
  return (
    <motion.div
      className="flex flex-col justify-center items-center p-4 mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SadEmoji size={64} color="#9ca3af" />
      </motion.div>
      <motion.h4 className="font-bold text-lg" variants={itemVariants}>
        No tasks available
      </motion.h4>
      <motion.p className="font-light" variants={itemVariants}>
        Add your first task to get started
      </motion.p>
    </motion.div>
  );
}
