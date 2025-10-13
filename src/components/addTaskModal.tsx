import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskButton from "./taskButton";
import { Input } from "./ui/input";

export default function AddTaskModal() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TaskButton
          title="Add Task"
          onClick={() => {}}
          className="bg-green-400 hover:bg-green-600 focus:bg-green-600 md:flex-2 lg:flex-3"
        ></TaskButton>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex flex-col mb-2">
          <h1 className="font-bold text-xl">Create new task</h1>
          <p className="text-gray-500 mb-4">
            Add a task with optional recurring schedule
          </p>
          <Input placeholder="Task Name" required />
          <h2 className="font-bold text-lg mt-4">Recurrence</h2>
          
        </form>
      </DialogContent>
    </Dialog>
  );
}
