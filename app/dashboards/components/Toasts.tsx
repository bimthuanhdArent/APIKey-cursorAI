"use client";

import type { ActionToast } from "../hooks/useApiKeys";

interface ToastsProps {
  showCopyToast: boolean;
  actionToast: ActionToast | null;
}

export function Toasts({ showCopyToast, actionToast }: ToastsProps) {
  return (
    <>
      {showCopyToast && (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-lg bg-zinc-800 dark:bg-zinc-700 text-white px-4 py-3 shadow-lg border border-zinc-700 dark:border-zinc-600"
        >
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Copied to clipboard</span>
        </div>
      )}

      {actionToast && (
        <div
          role="alert"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg border ${
            actionToast.variant === "delete"
              ? "bg-red-600 dark:bg-red-700 text-white border-red-500 dark:border-red-600"
              : "bg-emerald-600 dark:bg-emerald-700 text-white border-emerald-500 dark:border-emerald-600"
          }`}
        >
          {actionToast.variant === "delete" ? (
            <svg className="w-5 h-5 shrink-0 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span className="text-sm font-medium">{actionToast.message}</span>
        </div>
      )}
    </>
  );
}
