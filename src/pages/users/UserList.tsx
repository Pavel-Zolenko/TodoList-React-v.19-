import { AnimatePresence } from "motion/react";
import { DeleteUserAction } from "./actions";
import { User } from "../../shared/api";
import { UserCard } from "./UserCard";

export function UserList({
  useUsersList,
  deleteUserAction,
}: {
  useUsersList: () => User[];
  deleteUserAction: DeleteUserAction;
}) {
  const users = useUsersList();

  return (
    <div className="flex flex-col gap-2">
      {users.length === 0 ? (
        <p className="text-center">No users have been created yet</p>
      ) : (
        <AnimatePresence>
          {users.map((user) => (
            <UserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
