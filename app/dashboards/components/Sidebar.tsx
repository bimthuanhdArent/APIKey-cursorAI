"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CodeBracketIcon,
  BoltIcon,
  CreditCardIcon,
  CogIcon,
  DocumentIcon,
  LogoutIcon,
  ChevronDownIcon,
} from "./icons";

export function Sidebar() {
  const pathname = usePathname();
  const isOverview = pathname === "/dashboards";
  const isPlayground = pathname === "/dashboards/playground";

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          dandi
        </Link>
      </div>
      <div className="p-3">
        <button
          type="button"
          className="w-full flex items-center gap-2 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100 px-3 py-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/50 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            P
          </span>
          <span className="flex-1 truncate">Personal</span>
          <ChevronDownIcon className="shrink-0 text-zinc-400" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        <Link
          href="/dashboards"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isOverview
              ? "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/50"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          <HomeIcon />
          Overview
        </Link>
        <Link
          href="/dashboards/playground"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isPlayground
              ? "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/50"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          <CodeBracketIcon />
          API Playground
        </Link>
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <BoltIcon />
          Use Cases
        </a>
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <CreditCardIcon />
          Billing
        </a>
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <CogIcon />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <DocumentIcon />
          Documentation
        </a>
      </nav>
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-sm font-semibold text-white shrink-0">
          U
        </div>
        <span className="flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">User</span>
        <button
          type="button"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}
