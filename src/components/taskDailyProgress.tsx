import TaskProgressIcon from "@/assets/tasakProgressIcon";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskDailyProgressProps {
  totalTasks?: number;
  completedTasks?: number;
}
export default function TaskDailyProgress({
  totalTasks = 0,
  completedTasks = 0,
}: TaskDailyProgressProps) {
  const precentage = totalTasks > 0 ? (completedTasks! / totalTasks!) * 100 : 0;

  return (
    <Card className="mt-5 shadow-xl">
      <CardHeader className="flex justify-between ">
        <CardTitle>Today's progress</CardTitle>
        <TaskProgressIcon color="#4ade80" size={24} />
      </CardHeader>
      <CardContent>
        <h3 className="text-left font-bold text-xl">
          {`${completedTasks}`}{" "}
          <span className="text-base text-gray-500">{`/ ${totalTasks} Tasks`}</span>
        </h3>
        <Progress value={precentage} className="mt-2 " />
      </CardContent>
    </Card>
  );
}
