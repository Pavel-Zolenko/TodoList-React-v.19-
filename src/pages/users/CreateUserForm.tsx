import { useActionState } from "react";
import { CreateUserAction } from "./actions";

export function CreateUserForm({
  createUserAction,
}: {
  createUserAction: CreateUserAction;
}) {
  const [state, dispatch, isPending] = useActionState(createUserAction, { email: "" });

  return (
    <form className="flex gap-2 " action={dispatch}>
      <input
        name="email"
        type="email"
        className="border border-b-2 p-2 rounded bg-slate-200 dark:bg-zinc-800 focus:bg-slate-300 hover:bg-slate-300 focus:dark:bg-zinc-700 hover:dark:bg-zinc-700"
        disabled={isPending}
        defaultValue={state.email}
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-40 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600"
      >
        add user
      </button>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
}
