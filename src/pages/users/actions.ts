import { startTransition } from "react";
import { createUser, deleteAllTasksForUser, deleteUser, User } from "../../shared/api";

type CreateActionsState = {
  error?: string;
  email: string;
};

export type CreateUserAction = (
  state: CreateActionsState,
  formData: FormData
) => Promise<CreateActionsState>;

export function createUserAction({
  refetchUsers,
  optimisticCreate,
}: {
  refetchUsers: () => void;
  optimisticCreate: (user: User) => void;
}): CreateUserAction {
  return async (_, formData) => {
    const email = formData.get("email") as string;

    if (!email) {
      return { email, error: "Email is required" };
    }

    try {
      const user = {
        email,
        id: crypto.randomUUID(),
      };
      optimisticCreate(user);

      await createUser(user);
      startTransition(() => {
        refetchUsers();
      });

      return { email: "" };
    } catch {
      return {
        email,
        error: "Error while creating user",
      };
    }
  };
}

type DeleteUserActionState = {
  error?: string;
};

export type DeleteUserAction = (
  state: DeleteUserActionState,
  formData: FormData
) => Promise<DeleteUserActionState>;

export function deleteUserAction({
  refetchUsers,
  optimisticDelete,
}: {
  refetchUsers: () => void;
  optimisticDelete: (id: string) => void;
}): DeleteUserAction {
  return async (_, formData) => {
    const id = formData.get("id") as string;
    try {
      optimisticDelete(id);

      await deleteAllTasksForUser(id);

      await deleteUser(id);
      startTransition(() => {
        refetchUsers();
      });
      return {};
    } catch {
      return {
        error: "Error while deleting user",
      };
    }
  };
}
