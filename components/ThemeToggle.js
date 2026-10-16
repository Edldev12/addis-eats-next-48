
"use client";

import { useTheme } from "@/app/providers";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      <span className="ml-2 hidden text-sm font-semibold sm:inline">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
