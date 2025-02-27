import { AnimatePresence } from "framer-motion";
import { TaskCard } from "./TaskCard";
import { Task } from "../../shared/api";

export function TaskList({
  refetchTasks,
  tasks,
}: {
  refetchTasks: () => void;
  tasks: Task[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.length === 0 ? (
        <p className="text-lg text-gray-500 dark:text-gray-400">No tasks available</p>
      ) : (
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
