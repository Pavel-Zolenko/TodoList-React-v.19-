import React, { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateTaskAction } from "./actions";
import { Task } from "../../shared/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchTasks: () => void;
  task: Task;
}

export const ModalEditTask: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  task,
  refetchTasks,
}) => {
  const [inputValue, setInputValue] = useState(task.title);

  const handleUpdate = (_: object, formData: FormData) => {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const updateTitleTask = { ...task, id, title };
    const res = updateTaskAction(updateTitleTask, refetchTasks);
    onClose();
    return res;
  };

  const [updateState, actionHandler] = useActionState(handleUpdate, {});

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "box",
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="fixed inset-0 bg-neutral-950 bg-opacity-80 dark:bg-neutral-950 dark:bg-opacity-90 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="bg-slate-200 dark:bg-zinc-800 p-4 rounded-md shadow-lg w-80 "
          >
            <form action={actionHandler} className="flex flex-col gap-3 items-end">
              <input type="hidden" name="id" value={task.id} />
              <input
                type="text"
                name="title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border border-b-2 p-2 rounded bg-slate-200 dark:bg-zinc-800 focus:bg-slate-300 hover:bg-slate-300 focus:dark:bg-zinc-700 hover:dark:bg-zinc-700 "
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Submit
              </button>
            </form>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              {updateState?.error && <div>{updateState?.error}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
