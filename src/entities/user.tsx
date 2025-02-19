import { createContext, startTransition, use, useState } from "react";
import { fetchUsers, User } from "../shared/api";

type UsersContextType = {
  usersPromise: Promise<User[]>;
  refetchUsers: () => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

const defaultUsersPromise = fetchUsers();

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);

  const refetchUsers = () => {
    startTransition(() => setUsersPromise(fetchUsers()));
  };

  return (
    <UsersContext.Provider value={{ usersPromise, refetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersGlobal() {
  const context = use(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}
