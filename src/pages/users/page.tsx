import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { ThemeIcon } from "../../entities/theme-icon";
import { CreateUserForm } from "./CreateUserForm";
import { useUsers } from "./use-users";
import { UserList } from "./UserList";

export function UsersPage() {
  const { useUsersList, createUserAction, deleteUserAction } = useUsers();

  return (
    <div className="flex flex-col gap-2 bg-slate-100 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 p-3 bg-slate-200 dark:bg-zinc-800 rounded-2xl">
        <ThemeIcon />
        <h1 className="text-xl dark:text-slate-300 font-bold underline ">Users</h1>

        <CreateUserForm createUserAction={createUserAction} />
      </div>

      <div className="p-2 bg-slate-200 dark:bg-zinc-800 rounded-2xl">
        <ErrorBoundary
          fallbackRender={(e) => (
            <div className="text-red-500">Что-то пошло не так: {JSON.stringify(e)} </div>
          )}
        >
          <Suspense fallback={"loading..."}>
            <UserList useUsersList={useUsersList} deleteUserAction={deleteUserAction} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
