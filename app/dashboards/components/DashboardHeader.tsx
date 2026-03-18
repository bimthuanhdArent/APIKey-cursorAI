"use client";

import { GithubIcon, MoonIcon } from "./icons";

export function DashboardHeader() {
  return (
    <header className="shrink-0 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Operational
        </span>
        <a
          href="#"
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="GitHub"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <button
          type="button"
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Dark mode"
          aria-label="Toggle dark mode"
        >
          <MoonIcon />
        </button>
      </div>
    </header>
  );
}
