"use client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as any,
    },
  },
};

export default function Header() {
  return (
    <motion.div
      className="text-center py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-bold text-3xl md:text-5xl lg:text-6xl mb-3 tracking-tight"
        variants={itemVariants}
      >
        <motion.span
          className="text-gradient inline-block"
          variants={floatingVariants}
          animate="animate"
        >
          Start Your Day
        </motion.span>{" "}
        & <br className="md:hidden" />
        <span className="text-white drop-shadow-lg">Be Productive</span>
      </motion.h1>
      <motion.p
        className="text-gray-400 font-light md:text-xl max-w-lg mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Track your progress and build consistent habits in style.
      </motion.p>
    </motion.div>
  );
}
