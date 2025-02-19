import { useActionState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "../../shared/api";
import { DeleteUserAction } from "./actions";

export function UserCard({
  user,
  deleteUserAction,
}: {
  user: User;
  deleteUserAction: DeleteUserAction;
}) {
  const [state, handleDelete, isPending] = useActionState(deleteUserAction, {});

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: -100, scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
      key={user.id}
      className="flex gap-2 items-center justify-between p-2 bg-slate-300 dark:bg-zinc-700 rounded"
    >
      <p className="break-words w-0 flex-1">{user.email}</p>

      <form action={handleDelete} className="flex gap-2">
        <input type="hidden" name="id" value={user.id} />

        <Link to={`/${user.id}/tasks`}>
          <button className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-50 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600">
            Tasks
          </button>
        </Link>

        <button
          disabled={isPending}
          className="hover:bg-rose-400 dark:hover:bg-rose-800 bg-rose-700 dark:bg-rose-500 border-rose-800 dark:border-rose-700 bg-opacity-30 dark:bg-opacity-20 text-rose-800 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700 px-2 py-1 rounded-md border-b-2"
        >
          Delete
        </button>
        {state.error && <div className="text-red-500">{state.error}</div>}
      </form>
    </motion.div>
  );
}
