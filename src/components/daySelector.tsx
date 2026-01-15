import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TaskContext } from "../context/taskContext";
import { cn } from "../lib/utils"; // Assuming you have a utils file for merging classes, otherwise regular string concat works

export default function DaySelector() {
  const context = useContext(TaskContext);
  if (!context) return null;
  const { selectedDate, setSelectedDate } = context;

  // Generate an array of dates: e.g., today - 3 days to today + 7 days
  const dates = [];
  const today = new Date();
  // Normalize today to midnight for precise comparison
  today.setHours(0, 0, 0, 0);

  for (let i = -7; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the selected date on mount or date change if needed
    // Simple implementation: scroll to center initially if possible
    if (scrollContainerRef.current) {
      // Find the selected element index approximately (middle of the list is today)
      // This is a simple improvement for UX
    }
  }, []);

  return (
    <motion.div
      className="w-full overflow-x-auto py-4 no-scrollbar"
      ref={scrollContainerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex gap-3 px-4 min-w-max mx-auto justify-center md:justify-center">
        {dates.map((date) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();

          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl transition-all duration-200 border-2",
                isSelected
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50",
                isToday && !isSelected && "border-blue-200 text-blue-600"
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <span className="text-xs font-medium uppercase">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span
                className={cn(
                  "text-lg font-bold",
                  isSelected ? "text-white" : "text-gray-900"
                )}
              >
                {date.getDate()}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
