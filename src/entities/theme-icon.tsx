import { LiaSun } from "react-icons/lia";
import { GoMoon } from "react-icons/go";
import { useTheme } from "./theme";

export function ThemeIcon() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div
      className=" flex item-center justify-center w-8 cursor-pointer rounded-full hover:bg-slate-300 hover:dark:bg-zinc-700 hover:dark:bg-opacity-40"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <LiaSun size={26} /> : <GoMoon size={26} />}
    </div>
  );
}
