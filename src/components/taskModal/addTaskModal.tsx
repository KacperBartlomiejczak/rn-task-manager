import React, { useRef, useState, useContext } from "react";

//Context
import TaskCheckBoxes from "./tasksCheckboxes";
import { TaskContext } from "@/context/taskContext";
import type { Task } from "@/context/taskContext";
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
import {
  CheckBoxProvider,
  useCheckBoxContext,
} from "@/context/checkBoxContext";

function AddTaskForm() {
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const taskTitleRef = useRef<HTMLInputElement>(null);

  const { handleAddTask, selectedDate } = useContext(TaskContext)!;
  const {
    selectedRecurrence,
    selectedDays,
    setSelectedRecurrence,
    setSelectedDays,
  } = useCheckBoxContext();

  if (!handleAddTask) {
    throw new Error("AddTaskModal must be used within TaskProvider");
  }

  const handleSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = Date.now().toString();
    const title = taskTitleRef.current?.value || "";

    // Create the task object with recurrence data
    const newTask: Task = {
      id,
      title,
      isCompleted: false,
      recurrence: selectedRecurrence,
      // Only include selectedDays if recurrence is "specific-day"
      ...(selectedRecurrence === "specific-day" && { selectedDays }),
      // Strict date for one-time tasks
      ...(selectedRecurrence === "one-time" && {
        date: selectedDate.toISOString().split("T")[0],
      }),
    };

    handleAddTask(newTask);
    setIsOpen(false);
    setTaskName("");
    setSelectedRecurrence("one-time");
    setSelectedDays([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TaskButton title="Add Task" />
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <form className="flex flex-col mb-2" onSubmit={handleSubmitTask}>
          <DialogTitle className="font-bold text-xl">
            Create new task
          </DialogTitle>
          <p id="dialog-description" className="text-gray-400 mb-4">
            Add a task with optional recurring schedule
          </p>
          <Input
            className="glass bg-black/20 border-white/10 text-white placeholder:text-gray-500"
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
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 hover:scale-[1.02]"
            disabled={!taskName.trim()}
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AddTaskModal() {
  return (
    <CheckBoxProvider>
      <AddTaskForm />
    </CheckBoxProvider>
  );
}
