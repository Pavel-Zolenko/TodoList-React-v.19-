import { useActionState, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

import { Task } from "../../shared/api";
import { deleteTaskAction } from "./actions";
import { ModalEditTask } from "./ModalEditTask";
import { formatTaskDate } from "../../entities/formatTaskDate";

export function TaskCard({
  task,
  refetchTasks,
}: {
  task: Task;
  refetchTasks: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteState, handleDelete, isPending] = useActionState(
    deleteTaskAction({ refetchTasks }),
    {}
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const priorityColor =
    task.priorities === "Low"
      ? "text-green-700 dark:text-green-500"
      : task.priorities === "Medium"
      ? "text-yellow-700 dark:text-yellow-500"
      : "text-rose-600 dark:text-rose-400";

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: -100, scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      key={task.id}
      className="flex gap-2 items-center justify-between p-2 bg-slate-300 dark:bg-zinc-700 rounded border border-slate-400 dark:border-zinc-600 shadow-inner"
    >
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="flex gap-2 text-sm">
          <div className="flex gap-1 text-cyan-800 dark:text-cyan-400 border-r border-slate-400 dark:border-zinc-600 pr-2">
            <p>{task.time}</p>
            <p>{task.date}</p>
          </div>
          <p className={priorityColor}>{task.priorities} Priorities</p>
        </div>

        <p className="break-words min-w-0 flex-1 overflow-hidden text-ellipsis">
          {task.title}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatTaskDate(task.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="hover:bg-yellow-500 dark:hover:bg-yellow-600 bg-yellow-600 dark:bg-yellow-700 border-yellow-600 hover:border-yellow-700 dark:border-yellow-700 bg-opacity-20 dark:bg-opacity-20 text-yellow-700 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700 px-2 py-1 rounded-md border-b-2 "
          disabled={isPending}
          onClick={openModal}
        >
          <FaRegPenToSquare size={22} />
        </button>
        <form action={handleDelete}>
          <input type="hidden" name="id" value={task.id} />
          <button
            className="hover:bg-rose-400 dark:hover:bg-rose-800 bg-rose-700 dark:bg-rose-500 border-rose-800 dark:border-rose-700 bg-opacity-30 dark:bg-opacity-20 text-rose-800 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700 px-2 py-1 rounded-md border-b-2"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center px-2">
                <Spinner size="sm" color="danger" />
              </div>
            ) : (
              "Delete"
            )}
          </button>

          {deleteState.error && <div className="text-rose-500">{deleteState.error}</div>}
        </form>
      </div>
      <ModalEditTask
        isOpen={isModalOpen}
        onClose={closeModal}
        task={task}
        refetchTasks={refetchTasks}
      />
    </motion.div>
  );
}
