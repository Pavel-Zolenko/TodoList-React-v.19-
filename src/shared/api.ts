export type User = {
  id: string;
  email: string;
};

export function fetchUsers() {
  return fetch("http://localhost:3001/users").then(
    (res) => res.json() as Promise<User[]>
  );
}

export function createUser(user: User) {
  return fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export function deleteUser(id: string) {
  return fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
export function getCurrentUser(userId: string) {
  return fetch(`http://localhost:3001/users/${userId}`).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json() as Promise<User>;
  });
}

export type Task = {
  id: string;
  userId: string;
  title: string;
  date: string;
  time: string;
  priorities: string;
  createdAt: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  page: number;
  prev: number | null;
  pages: number;
};
export function fetchTasks({
  page = 1,
  per_page = 10,
  sort = { createdAt: "asc" },
  filters,
}: {
  page?: number;
  per_page?: number;

  filters?: {
    userId?: string;
    title?: string;
  };
  sort?: {
    createdAt: "asc" | "desc";
  };
}) {
  return fetch(
    `http://localhost:3001/tasks?_page=${page}&_per_page=${per_page}}&_sort=${
      sort.createdAt === "asc" ? "createdAt" : "-createdAt"
    }&userId=${filters?.userId}&title=${filters?.title}`
  ).then((res) => res.json() as Promise<PaginatedResponse<Task>>);
}

export function createTask(task: Omit<Task, "id" | "createdAt">) {
  return fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
}

export function updateTask(updateTitleTask: Task) {
  return fetch(`http://localhost:3001/tasks/${updateTitleTask.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateTitleTask),
  }).then((res) => res.json() as Promise<Task>);
}

export function deleteTask(id: string) {
  return fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export async function deleteAllTasksForUser(userId: string) {
  // Получаем все задачи пользователя
  const tasks = await fetch(`http://localhost:3001/tasks?userId=${userId}`).then(
    (res) => res.json() as Promise<Task[]>
  );
  if (tasks) {
    const deletePromises = tasks.map((task) => deleteTask(task.id));
    await Promise.all(deletePromises);
  }
  // Удаляем задачи по одной

  return { message: `All tasks for user ${userId} have been deleted` };
}
