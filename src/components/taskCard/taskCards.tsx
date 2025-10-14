import TaskCard from './taskCard';
import type { Task } from '@/context/taskContext';

interface TaskCardsProps {
  tasks: Task[];
}

export default function TaskCards({ tasks }: TaskCardsProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
