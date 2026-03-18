"use client";

import { useEffect, useState } from "react";
import { API_KEY_STORAGE_KEY } from "@/lib/playground-constants";

export default function ProtectedPage() {
  const [status, setStatus] = useState<"valid" | "invalid" | "loading" | "none">("loading");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const key = sessionStorage.getItem(API_KEY_STORAGE_KEY);
    sessionStorage.removeItem(API_KEY_STORAGE_KEY);

    if (!key) {
      setStatus("none");
      return;
    }

    fetch("/api/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data?.valid ? "valid" : "invalid");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, [mounted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Protected
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          This page is only accessible after validating your API key.
        </p>

        {status === "loading" && (
          <p className="text-zinc-500 dark:text-zinc-400">Validating API key…</p>
        )}

        {status === "none" && (
          <p className="text-zinc-500 dark:text-zinc-400">
            No API key was provided. Go to the API Playground to submit a key.
          </p>
        )}
      </div>

      {/* Green popup - valid */}
      {status === "valid" && (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white px-4 py-3 shadow-lg border border-emerald-500 dark:border-emerald-600"
        >
          <svg className="w-5 h-5 shrink-0 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Valid API key, /protected can be accessed.</span>
        </div>
      )}

      {/* Red popup - invalid */}
      {status === "invalid" && (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-lg bg-red-600 dark:bg-red-700 text-white px-4 py-3 shadow-lg border border-red-500 dark:border-red-600"
        >
          <svg className="w-5 h-5 shrink-0 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium">Invalid API Key</span>
        </div>
      )}

      <a
        href="/dashboards/playground"
        className="mt-8 text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline"
      >
        ← Back to API Playground
      </a>
    </div>
  );
}
