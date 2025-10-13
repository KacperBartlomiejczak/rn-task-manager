import React, { useRef, useState, useContext } from "react";

//Context
import TaskCheckBoxes from "./tasksCheckboxes";
import { TaskContext } from "@/context/taskContext";
//Components
import TaskButton from "../taskButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckBoxProvider } from "@/context/checkBoxContext";

export default function AddTaskModal() {
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const taskTitleRef = useRef<HTMLInputElement>(null);

  const { handleAddTask} = useContext(TaskContext)!;

  if (!handleAddTask) {
    throw new Error("AddTaskModal must be used within TaskProvider");
  }

  const handleSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now().toString();
    setTaskName(taskTitleRef.current?.value || "");
    handleAddTask({ id, title: taskName, isCompleted: false });
    setIsOpen(false);
    setTaskName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TaskButton
          title="Add Task"
          className="bg-green-400 hover:bg-green-600 focus:bg-green-600 md:flex-2 lg:flex-3"
        />
      </DialogTrigger>
      <DialogContent>
        <CheckBoxProvider>
          <form className="flex flex-col mb-2" onSubmit={handleSubmitTask}>
            <DialogTitle className="font-bold text-xl">
              Create new task
            </DialogTitle>
            <p className="text-gray-500 mb-4">
              Add a task with optional recurring schedule
            </p>
            <Input
              placeholder="Task Name"
              required
              value={taskName}
              ref={taskTitleRef}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <h2 className="font-bold text-lg mt-4">Recurrence</h2>
            <TaskCheckBoxes />
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500"
              disabled={!taskName.trim()}
            >
              Create Task
            </Button>
          </form>
        </CheckBoxProvider>
      </DialogContent>
    </Dialog>
  );
}
