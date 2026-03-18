"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { API_KEY_STORAGE_KEY } from "@/lib/playground-constants";

export default function PlaygroundPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = apiKey.trim();
    if (!key) return;
    setSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(API_KEY_STORAGE_KEY, key);
    }
    router.push("/protected");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/50">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Pages / API Playground
          </p>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            API Playground
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Enter your API key to validate and access the protected area.
          </p>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key"
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={submitting || !apiKey.trim()}
                className="rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {submitting ? "Redirecting…" : "Submit & go to /protected"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
