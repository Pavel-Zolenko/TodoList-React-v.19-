import { startTransition } from "react";
import { createTask, deleteTask, Task, updateTask } from "../../shared/api";

type CreateActionsState = {
  error?: string;
  title: string;
};

export type CreateTaskAction = (
  state: CreateActionsState,
  formData: FormData
) => Promise<CreateActionsState>;

export function createTaskAction({
  refetchTasks,
  userId,
  onClose,
}: {
  refetchTasks: () => void;
  userId: string;
  onClose: () => void;
}): CreateTaskAction {
  return async (_, formData) => {
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const priorities = formData.get("priorities") as string;

    const formatDate = (date: string) => {
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year.slice(-2)}`;
    };

    const formatTime = (time: string) => time.substring(0, 5);

    try {
      const task: Task = {
        createdAt: Date.now(),
        userId,
        title,
        date: formatDate(date),
        time: formatTime(time),
        priorities,
        id: crypto.randomUUID(),
      };

      const res = await createTask(task);

      if (res) {
        onClose();
      }

      startTransition(() => {
        refetchTasks();
      });

      return { title: "" };
    } catch {
      return {
        title,
        error: "Failed to create task. Please try again later.",
      };
    }
  };
}

type DeleteTaskActionState = {
  error?: string;
};

export type DeleteTaskAction = (
  state: DeleteTaskActionState,
  formData: FormData
) => Promise<DeleteTaskActionState>;

export function deleteTaskAction({
  refetchTasks,
}: {
  refetchTasks: () => void;
}): DeleteTaskAction {
  return async (_, formData) => {
    const id = formData.get("id") as string;
    try {
      await deleteTask(id);
      startTransition(() => {
        refetchTasks();
      });
      return {};
    } catch {
      return {
        error: "Error while deleting task",
      };
    }
  };
}

export async function updateTaskAction(
  updateTitleTask: Task,
  refetchTasks: () => void
): Promise<{ error?: string }> {
  try {
    await updateTask(updateTitleTask);
    startTransition(() => {
      refetchTasks();
    });
    return {};
  } catch {
    return {
      error: "Error updating task",
    };
  }
}
