import React, { useRef, useState, useContext, useEffect } from "react";
import { Pencil } from "lucide-react";
import { TASK_CATEGORIES } from "@/lib/constants";

//Context
import TaskCheckBoxes from "../taskModal/tasksCheckboxes";
import { TaskContext } from "@/context/taskContext";
import type { Task } from "@/context/taskContext";
//Components
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

interface EditTaskModalProps {
  task: Task;
}

function EditTaskForm({ task }: EditTaskModalProps) {
  const [taskName, setTaskName] = useState(task.title);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(
    task.emoji || TASK_CATEGORIES[0].emoji
  );
  const taskTitleRef = useRef<HTMLInputElement>(null);

  const { handleUpdateTask, selectedDate: contextDate } =
    useContext(TaskContext)!;
  const {
    selectedRecurrence,
    selectedDays,
    setSelectedRecurrence,
    setSelectedDays,
  } = useCheckBoxContext();

  // Initialize form with task data when modal opens
  useEffect(() => {
    if (isOpen) {
      setTaskName(task.title);
      setSelectedRecurrence(task.recurrence);
      setSelectedDays(task.selectedDays || []);
      setSelectedEmoji(task.emoji || TASK_CATEGORIES[0].emoji);
    }
  }, [isOpen, task, setSelectedRecurrence, setSelectedDays]);

  const handleSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = taskTitleRef.current?.value || "";

    const updatedTask: Task = {
      ...task,
      title,
      emoji: selectedEmoji,
      recurrence: selectedRecurrence,
      // Only include selectedDays if recurrence is "specific-day"
      selectedDays: selectedRecurrence === "specific-day" ? selectedDays : [],
      // Use parent context date for one-time tasks, or keep existing if it's already one-time
      date:
        selectedRecurrence === "one-time"
          ? task.recurrence === "one-time"
            ? task.date
            : contextDate.toISOString().split("T")[0]
          : undefined,
    };

    handleUpdateTask(updatedTask);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 text-white border-0"
        >
          <span className="hidden sm:inline">Edit</span>
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="edit-dialog-description">
        <form className="flex flex-col mb-2" onSubmit={handleSubmitTask}>
          <DialogTitle className="font-bold text-xl">Edit Task</DialogTitle>
          <p id="edit-dialog-description" className="text-gray-400 mb-4">
            Update task details and recurrence
          </p>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Task Name
              </label>
              <Input
                className="glass bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-violet-500/50"
                placeholder="Task Name"
                required
                value={taskName}
                ref={taskTitleRef}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Icon / Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10">
                {TASK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedEmoji(cat.emoji)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 border-2 h-20 ${
                      selectedEmoji === cat.emoji
                        ? "bg-violet-600/40 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        : "hover:bg-white/10 border-transparent bg-white/5"
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 truncate w-full text-center">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Recurrence
              </label>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <TaskCheckBoxes />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 hover:scale-[1.02]"
            disabled={!taskName.trim()}
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function EditTaskModal({ task }: EditTaskModalProps) {
  return (
    <CheckBoxProvider>
      <EditTaskForm task={task} />
    </CheckBoxProvider>
  );
}
