"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GithubIcon, GoogleIcon, LogoutIcon, MoonIcon } from "./icons";

export function DashboardHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="shrink-0 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Operational
        </span>
        {status === "loading" ? (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</span>
        ) : session?.user ? (
          <>
            <span className="text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[140px]" title={session.user.email ?? undefined}>
              {session.user.name ?? session.user.email}
            </span>
            <button
              type="button"
              onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Sign out"
            >
              <LogoutIcon />
              Sign out
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            title="Sign in with Google"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        )}
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
