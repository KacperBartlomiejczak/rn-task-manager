import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface tasakButtonProps {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
export default function taskButton({
  title,
  onClick,
  children,
  className,
}: tasakButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="secondary"
        className={`mt-4 w-full cursor-pointer flex-wrap bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/20 transition-all duration-300 ${className}`}
        onClick={onClick}
      >
        {children}
        {title}
      </Button>
    </motion.div>
  );
}
