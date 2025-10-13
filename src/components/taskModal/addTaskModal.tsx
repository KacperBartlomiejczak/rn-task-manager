import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskButton from "../taskButton";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { useRef, useState, useContext } from "react";

import TaskCheckBoxes from "./tasksCheckboxes";
import { CheckBoxProvider } from "@/context/checkBoxContext";
import { TaskContext } from "@/context/taskContext";

interface Task {
  id: string;
  title: string;
}

export default function AddTaskModal() {
  const [taskName, setTaskName] = useState("");
  const taskTitleRef = useRef<HTMLInputElement>(null);

  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("AddTaskModal must be used within TaskProvider");
  }

  const { handleAddTask } = useContext(TaskContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TaskButton
          title="Add Task"
          className="bg-green-400 hover:bg-green-600 focus:bg-green-600 md:flex-2 lg:flex-3"
        />
      </DialogTrigger>
      <DialogContent>
        <CheckBoxProvider>
          <form className="flex flex-col mb-2">
            <h1 className="font-bold text-xl">Create new task</h1>
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
