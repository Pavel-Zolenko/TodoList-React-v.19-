import { use } from "react";
import { AnimatePresence } from "framer-motion";
import { TaskCard } from "./TaskCard";
import { Task } from "../../shared/api";

export function TaskList({
  tasksPromise,
  refetchTasks,
}: {
  tasksPromise: Promise<Task[]>;
  refetchTasks: () => void;
}) {
  const tasks = use(tasksPromise);

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
