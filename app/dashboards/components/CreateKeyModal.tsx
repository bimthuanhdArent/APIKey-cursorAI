"use client";

import { CodeIcon, RocketIcon } from "./icons";

interface CreateKeyModalProps {
  open: boolean;
  onClose: () => void;
  newName: string;
  setNewName: (v: string) => void;
  newDescription: string;
  setNewDescription: (v: string) => void;
  newKeyType: "dev" | "production";
  setNewKeyType: (v: "dev" | "production") => void;
  limitMonthlyUsage: boolean;
  setLimitMonthlyUsage: (v: boolean) => void;
  monthlyUsageLimit: number;
  setMonthlyUsageLimit: (v: number) => void;
  onSubmit: () => void;
}

export function CreateKeyModal({
  open,
  onClose,
  newName,
  setNewName,
  newDescription,
  setNewDescription,
  newKeyType,
  setNewKeyType,
  limitMonthlyUsage,
  setLimitMonthlyUsage,
  monthlyUsageLimit,
  setMonthlyUsageLimit,
  onSubmit,
}: CreateKeyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl border border-zinc-200 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          Create a new API key
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Enter a name and limit for the new API key.
        </p>

        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Key Name - A unique name to identify this key
        </label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Key Name"
          className="w-full rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 mb-5"
        />

        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
          Key Type - Choose the environment for this key
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-950/20">
            <input
              type="radio"
              name="keyType"
              checked={newKeyType === "dev"}
              onChange={() => setNewKeyType("dev")}
              className="mt-1 w-4 h-4 text-blue-600 border-zinc-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CodeIcon className="text-zinc-500 dark:text-zinc-400" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Development</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Rate limited to 100 requests/minute
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-950/20">
            <input
              type="radio"
              name="keyType"
              checked={newKeyType === "production"}
              onChange={() => setNewKeyType("production")}
              className="mt-1 w-4 h-4 text-blue-600 border-zinc-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <RocketIcon className="text-zinc-500 dark:text-zinc-400" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Production</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Rate limited to 1,000 requests/minute
              </p>
            </div>
          </label>
        </div>

        <div className="mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={limitMonthlyUsage}
              onChange={(e) => setLimitMonthlyUsage(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Limit monthly usage*
            </span>
          </label>
        </div>
        {limitMonthlyUsage && (
          <input
            type="number"
            min={1}
            value={monthlyUsageLimit}
            onChange={(e) => setMonthlyUsageLimit(Number(e.target.value) || 1000)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
        )}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          If the combined usage of all your keys exceeds your account&apos;s allocated usage limit (plan, add-ons, and any pay-as-you-go limit), all requests will be rejected.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
