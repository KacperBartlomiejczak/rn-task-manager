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
  const precentage = totalTasks > 0 ? (completedTasks! / totalTasks!) * 100 : 0;
  const isAllCompleted = totalTasks > 0 && completedTasks === totalTasks;

  return (
    <Card
      className={`mt-5 glass border-none text-white overflow-hidden relative transition-all duration-700 ${
        isAllCompleted
          ? "shadow-green-500/20 shadow-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5"
          : ""
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 pointer-events-none ${
          isAllCompleted
            ? "from-green-500/20 to-transparent opacity-100"
            : "from-primary/10 to-transparent opacity-100"
        }`}
      />

      <CardHeader className="flex justify-between relative z-10 flex-row items-center space-y-0 pb-2">
        <CardTitle
          className={`text-lg font-medium transition-colors duration-500 ${
            isAllCompleted ? "text-green-200" : "text-gray-200"
          }`}
        >
          {isAllCompleted ? "All Tasks Completed!" : "Today's Progress"}
        </CardTitle>
        <TaskProgressIcon
          color={isAllCompleted ? "#4ade80" : "#c084fc"}
          size={24}
        />
      </CardHeader>

      <CardContent className="relative z-10">
        <h3
          className={`text-left font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r transition-all duration-700 ${
            isAllCompleted
              ? "from-green-300 to-emerald-500 scale-105 origin-left"
              : "from-white to-gray-400"
          }`}
        >
          {`${completedTasks}`}
          <span
            className={`text-lg font-normal ml-2 transition-colors duration-500 ${
              isAllCompleted ? "text-green-300" : "text-gray-400"
            }`}
          >
            / {totalTasks} Tasks
          </span>
        </h3>

        <div className="mt-4 relative h-3 w-full overflow-hidden rounded-full bg-secondary/30">
          <div
            className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.3)] ${
              isAllCompleted
                ? "from-green-400 via-emerald-500 to-teal-500 shadow-green-500/50"
                : "from-indigo-500 via-purple-500 to-pink-500"
            }`}
            style={{ width: `${precentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
