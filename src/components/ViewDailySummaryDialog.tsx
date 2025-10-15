import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskButton from "./taskButton";
import Calender from "@/assets/calender";
import { Progress } from "@/components/ui/progress";

interface Summary {
  date: string;
  completed: number;
  total: number;
}

export default function ViewDailySummaryDialog() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedSummaries = JSON.parse(localStorage.getItem('dailySummaries') || '[]');
      // sort by date descending
      storedSummaries.sort((a: Summary, b: Summary) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSummaries(storedSummaries);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TaskButton
          title="View Daily Summary"
          className="hover:bg-green-400 focus:bg-green-400"
        >
          <Calender size={24} color="#000000" />
        </TaskButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daily Summary History</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {summaries.length === 0 ? (
            <p className="text-center text-gray-500">No summary history yet.</p>
          ) : (
            <ul className="space-y-4">
              {summaries.map((summary) => {
                const percentage = summary.total > 0 ? (summary.completed / summary.total) * 100 : 0;
                return (
                  <li key={summary.date} className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{new Date(summary.date).toLocaleDateString()}</p>
                      <p className="text-sm font-bold">{Math.round(percentage)}%</p>
                    </div>
                    <Progress value={percentage} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1 text-right">{`${summary.completed} / ${summary.total} tasks`}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
