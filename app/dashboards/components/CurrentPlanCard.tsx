"use client";

export function CurrentPlanCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Current plan
        </span>
        <button
          type="button"
          className="rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Manage Plan
        </button>
      </div>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        Developer
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        API keys and usage are managed below.
      </p>
    </div>
  );
}
