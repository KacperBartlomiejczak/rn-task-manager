import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import Bin from "@/assets/bin";
import { Button } from "../ui/button";

import { TaskContext } from "@/context/taskContext";

export default function DeleteDialogTaskCard({ taskId }: { taskId: string }) {
  const { handleDeleteTask } = useContext(TaskContext)!;

  if (!handleDeleteTask) {
    throw new Error("TaskCard must be used within TaskProvider");
  }

  const onDelete = () => {
    handleDeleteTask(taskId);
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <span className="hidden sm:inline">Delete Task</span>
          <span className="sm:hidden">Delete</span>
          <Bin size={16} color="#fff" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure?</DialogHeader>
        <p>This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
