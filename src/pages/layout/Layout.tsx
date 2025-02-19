import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export function Layout() {
  return (
    <main className=" min-h-screen py-10 bg-slate-100 dark:bg-zinc-900 text-slate-950 dark:text-slate-300 ">
      <div className="container mx-auto flex flex-col gap-4 max-w-md bg-slate-200 dark:bg-zinc-800  rounded-md ">
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
