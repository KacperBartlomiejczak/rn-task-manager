//components

import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@/context/taskContext";

import DeleteDialogTaskCard from "./deleteDialogtaskCard";

export default function TaskCard({ task }: { task: Task }) {
  const getRecurrenceText = () => {
    switch (task.recurrence) {
      case "one-time":
        return "One-time task";
      case "every-day":
        return "Daily task";
      case "specific-day":
        return `Repeats on: ${
          task.selectedDays?.join(", ") || "No days selected"
        }`;
      default:
        return "";
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox className="flex-shrink-0" />
        <div className="flex w-full items-center justify-between min-w-0">
          <div className="flex flex-col text-left flex-1 min-w-0 mr-4">
            <span className="font-medium truncate">{task.title}</span>
            <span className="text-sm text-gray-500 truncate">
              {getRecurrenceText()}
            </span>
          </div>
          <DeleteDialogTaskCard taskId={task.id} />
        </div>
      </CardContent>
    </Card>
  );
}
