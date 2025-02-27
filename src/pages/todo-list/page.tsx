import {
  startTransition,
  useTransition,
  useState,
  Suspense,
  useMemo,
  use,
  useEffect,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { useDisclosure, Button } from "@heroui/react";

import { fetchTasks, PaginatedResponse, Task } from "../../shared/api";
import { ModalCreateTaskForm } from "./ModalCreateTask";
import { TaskList } from "./TaskList";
import { Header } from "./Header";

export function TodoListPage() {
  const { userId = "" } = useParams<{ userId: string }>();

  const [createdAtSort, setCreatedAtSort] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedTaskPromise, setTasksPromise] = useState(
    fetchTasks({ filters: { userId: userId, title: search } })
  );
  const [filtredTask, setFiltredTask] = useState<Task[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    paginatedTaskPromise.then((r) => {
      setFiltredTask(r.data);
    });
  }, [paginatedTaskPromise]);

  const refetchTasks = () =>
    startTransition(() =>
      setTasksPromise(fetchTasks({ filters: { userId, title: search }, page }))
    );

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    setTasksPromise(fetchTasks({ filters: { userId, title: search }, page: newPage }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debounce<T extends (...args: any[]) => void>(callback: T, delay = 1000) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedFetchTasks(e.target.value);
  };

  const debouncedFetchTasks = useMemo(
    () =>
      debounce((query: string) => {
        startTransition(() => {
          if (query.trim() === "") {
            fetchTasks({
              filters: { userId, title: query },
              page,
              sort: { createdAt: createdAtSort },
            }).then((r) => {
              setFiltredTask(r.data);
            });
          } else {
            setFiltredTask(
              filtredTask.filter((task) =>
                task.title.toLowerCase().includes(query.toLowerCase())
              )
            );
          }
        });
      }),
    [userId, page, createdAtSort, filtredTask]
  );

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreatedAtSort(e.target.value as "asc" | "desc");

    setTasksPromise(
      fetchTasks({
        filters: { userId, title: search },
        page,
        sort: { createdAt: e.target.value as "asc" | "desc" },
      })
    );
  };

  return (
    <div className="relative flex flex-col gap-3 justify-between bg-slate-100 dark:bg-zinc-900">
      <div className="relative w-[106%] h-36 bg-slate-200 dark:bg-zinc-800 rounded-2xl after:z-10  after:shadow-[-4px_4px_#f1f5f9] dark:after:shadow-[-4px_4px_#18181b] after:absolute after:-bottom-[0.05rem] after:left-[4.39rem] after:rounded-bl-full after:bg-transparent after:w-4 after:h-4 before:absolute before:top-[40%] before:-left-[0.04rem] before:rounded-bl-full before:bg-transparent before:w-4 before:h-4  before:shadow-[-4px_4px_#f1f5f9] dark:before:shadow-[-4px_4px_#18181b]">
        <div className="absolute z-10 top-1/2 -translate-x-1/2 w-36 h-36 border-[0.75rem] border-slate-100 dark:border-zinc-900 rounded-full overflow-hidden">
          <img
            src="https://api.dicebear.com/9.x/personas/svg?seed=Christopher&backgroundType=gradientLinear&backgroundColor=c0c0c9,505050,383840,"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 p-2">
          <Header userId={userId} />
          <Link
            to={`/`}
            className="flex gap-2 items-center w-16 hover:text-slate-600 hover:dark:text-slate-400"
          >
            <IoMdArrowRoundBack className="group-hover:text-blue-500 dark:group-hover:text-zinc-900" />
            <p>back</p>
          </Link>
          <Button
            onPress={onOpen}
            startContent={<BsPlusCircle size={24} />}
            variant="ghost"
            className="absolute max-w-fit right-2 bottom-2"
          >
            Create task
          </Button>

          <ModalCreateTaskForm
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            refetchTasks={refetchTasks}
            userId={userId}
          />
        </div>
      </div>
      <div className="relative bg-slate-200 dark:bg-zinc-800 rounded-2xl after:z-30 after:shadow-[-4px_-4px_#f1f5f9] dark:after:shadow-[-4px_-4px_#18181b] after:absolute after:-top-[0.05rem] after:left-[4.22rem] after:rounded-tl-full after:bg-transparent after:w-4 after:h-4 before:shadow-[-4px_-4px_#f1f5f9] dark:before:shadow-[-4px_-4px_#18181b] before:absolute before:top-[3.7rem] before:-left-[0.04rem] before:rounded-tl-full before:bg-transparent before:w-4 before:h-4">
        <div className="flex flex-col gap-3 py-6 px-2">
          <div className="flex gap-2 justify-end">
            <input
              placeholder="Search"
              type="text"
              value={search}
              onChange={handleChangeSearch}
              className="border border-b-2 border-slate-400 p-2 rounded bg-slate-200 dark:bg-zinc-800 focus:bg-slate-300 hover:bg-slate-300 focus:dark:bg-zinc-700 hover:dark:bg-zinc-700"
            />
            <select
              className="border border-b-2 border-slate-400 p-2 rounded bg-slate-200 dark:bg-zinc-800 focus:bg-slate-300 hover:bg-slate-300 focus:dark:bg-zinc-700 hover:dark:bg-zinc-700"
              onChange={handleChangeSort}
              value={createdAtSort}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desс</option>
            </select>
          </div>

          <ErrorBoundary
            fallbackRender={(e) => (
              <div className="text-red-500">
                Что-то пошло не так: {JSON.stringify(e)}{" "}
              </div>
            )}
          >
            <Suspense fallback={"loading..."}>
              <TaskList refetchTasks={refetchTasks} tasks={filtredTask} />
              <Pagination
                page={page}
                taskPaginated={paginatedTaskPromise}
                onPageChange={onPageChange}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

function Pagination<T>({
  page,
  taskPaginated,
  onPageChange,
}: {
  taskPaginated: Promise<PaginatedResponse<T>>;
  page: number;
  onPageChange?: (newPage: number) => void;
}) {
  const [isLoading, startTransition] = useTransition();
  const { last, first, next, prev, pages } = use(taskPaginated);

  const handlePageChange = (newPage: number) => () => {
    startTransition(() => onPageChange?.(newPage));
  };

  return (
    <nav className={`${isLoading ? "opasity-50" : ""} flex items-center gap-10`}>
      <div className="flex gap-2">
        <button
          onClick={handlePageChange(first)}
          disabled={isLoading}
          className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-50 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600"
        >
          First ({first})
        </button>
        {prev && (
          <button
            onClick={handlePageChange(prev)}
            disabled={isLoading}
            className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-50 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600"
          >
            Prev ({prev})
          </button>
        )}
        {next && (
          <button
            onClick={handlePageChange(next)}
            disabled={isLoading}
            className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-50 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600"
          >
            Next ({next})
          </button>
        )}
        <button
          onClick={handlePageChange(last)}
          disabled={isLoading}
          className="bg-cyan-400 dark:hover:bg-opacity-30 bg-opacity-30 hover:bg-opacity-50 dark:bg-opacity-20 text-cyan-800 dark:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 px-2 py-1 rounded-md shadow-sm border-b-2 border-cyan-600 dark:border-cyan-700 dark:hover:border-cyan-600"
        >
          Last ({last})
        </button>
      </div>
      <span className="text-sm">
        Page {page} of {pages}
      </span>
    </nav>
  );
}
