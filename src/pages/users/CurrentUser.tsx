import { use } from "react";
import { User } from "../../shared/api";

interface CurrentUserProps {
  currentUserPromisse: Promise<User>;
}

export function CurrentUser({ currentUserPromisse }: CurrentUserProps) {
  const { email } = use(currentUserPromisse);
  return (
    <p className="break-words w-0 flex-1 min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
      {email}
    </p>
  );
}
