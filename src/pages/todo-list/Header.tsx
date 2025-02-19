import { Suspense, useState } from "react";
import { getCurrentUser } from "../../shared/api";
import { ErrorBoundary } from "react-error-boundary";
import { CurrentUser } from "../users/CurrentUser";

import { BsPersonCheckFill } from "react-icons/bs";
import { ThemeIcon } from "../../entities/theme-icon";

export function Header({ userId }: { userId: string }) {
  const [currentUserPromisse] = useState(getCurrentUser(userId));

  return (
    <header className="flex items-top justify-between gap-2 ">
      <BsPersonCheckFill size={24} />

      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={"loading..."}>
          <CurrentUser currentUserPromisse={currentUserPromisse} />
        </Suspense>
      </ErrorBoundary>

      <ThemeIcon />
    </header>
  );
}
