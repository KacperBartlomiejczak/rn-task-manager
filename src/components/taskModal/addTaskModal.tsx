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

  const { handleAddTask, taskList } = useContext(TaskContext)!;
  const { selectedRecurrence, selectedDays } = useCheckBoxContext();

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
    };

    handleAddTask(newTask);
    setIsOpen(false);
    setTaskName("");
  };

  console.log(taskList);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TaskButton
          title="Add Task"
          className="bg-green-400 hover:bg-green-600 focus:bg-green-600 "
        />
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <form className="flex flex-col mb-2" onSubmit={handleSubmitTask}>
          <DialogTitle className="font-bold text-xl">
            Create new task
          </DialogTitle>
          <p id="dialog-description" className="text-gray-500 mb-4">
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
