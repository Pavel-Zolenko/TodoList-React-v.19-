import { Route, Routes } from "react-router-dom";
import { TodoListPage } from "../pages/todo-list";
import { UsersPage } from "../pages/users";
import { UsersProvider } from "../entities/user";
import { Layout } from "../pages/layout";

export function App() {
  return (
    <UsersProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<UsersPage />} />
          <Route path="/:userId/tasks" element={<TodoListPage />} />
        </Route>
      </Routes>
    </UsersProvider>
  );
}
