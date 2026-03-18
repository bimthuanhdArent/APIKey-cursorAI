"use client";

import type { ApiKey } from "@/lib/supabase/api-keys";
import { maskKey } from "@/lib/api-keys-utils";
import { PlusIcon, EyeIcon, CopyIcon, PencilIcon, TrashIcon } from "./icons";

interface ApiKeysCardProps {
  keys: ApiKey[];
  loading: boolean;
  showCreate: boolean;
  onOpenCreate: () => void;
  /** When false, create button is hidden and empty state asks user to sign in. */
  isLoggedIn?: boolean;
  editingId: string | null;
  editName: string;
  setEditName: (v: string) => void;
  editDescription: string;
  setEditDescription: (v: string) => void;
  revealedId: string | null;
  setRevealedId: (fn: (id: string | null) => string | null) => void;
  copiedId: string | null;
  newlyCreatedKey: string | null;
  setNewlyCreatedKey: (v: string | null) => void;
  onCopy: (key: string, id: string) => void;
  onCopyAndDismiss: () => void;
  onStartEdit: (item: ApiKey) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  deleteConfirmId: string | null;
  setDeleteConfirmId: (v: string | null) => void;
}

export function ApiKeysCard({
  keys,
  loading,
  onOpenCreate,
  isLoggedIn = true,
  editingId,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  revealedId,
  setRevealedId,
  copiedId,
  newlyCreatedKey,
  setNewlyCreatedKey,
  onCopy,
  onCopyAndDismiss,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onConfirmDelete,
  deleteConfirmId,
  setDeleteConfirmId,
}: ApiKeysCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          API Keys
        </h2>
        {isLoggedIn && (
          <button
            type="button"
            onClick={onOpenCreate}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:border-sky-200 dark:hover:border-sky-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            title="Create API key"
          >
            <PlusIcon />
          </button>
        )}
      </div>

      {loading ? (
        <div className="px-5 py-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">Loading API keys…</p>
        </div>
      ) : keys.length === 0 ? (
        <div className="px-5 py-12 text-center">
          {isLoggedIn ? (
            <>
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">No API keys yet.</p>
              <button
                type="button"
                onClick={onOpenCreate}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <PlusIcon className="w-4 h-4" />
                Create API key
              </button>
            </>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">Sign in to view and manage your API keys.</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Usage</th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Key</th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider w-28">Options</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30"
                >
                  <td className="px-5 py-3">
                    {editingId === item.id ? (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Key name"
                          className="rounded border border-zinc-300 dark:border-zinc-600 bg-transparent px-2 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description (optional)"
                          className="rounded border border-zinc-300 dark:border-zinc-600 bg-transparent px-2 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                        />
                      </div>
                    ) : (
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.type}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.usage}</span>
                  </td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    {revealedId === item.id ? item.key : maskKey(item.key, item.type)}
                  </td>
                  <td className="px-5 py-3">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onSaveEdit(item.id)}
                          className="p-1.5 rounded text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          title="Save"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={onCancelEdit}
                          className="p-1.5 rounded text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => setRevealedId((id) => (id === item.id ? null : item.id))}
                          className="p-2 rounded-lg text-zinc-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                          title={revealedId === item.id ? "Hide key" : "Reveal key"}
                        >
                          <EyeIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => onCopy(item.key, item.id)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                          title={copiedId === item.id ? "Copied!" : "Copy"}
                        >
                          {copiedId === item.id ? (
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Copied!</span>
                          ) : (
                            <CopyIcon />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onStartEdit(item)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                          title="Edit"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {newlyCreatedKey && (
        <div className="mx-5 mt-4 mb-5 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
            Key created. Copy it now — you won’t see it again in full.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <code className="flex-1 min-w-0 rounded bg-amber-100 dark:bg-amber-900/50 px-3 py-2 font-mono text-sm break-all">
              {newlyCreatedKey}
            </code>
            <button
              type="button"
              onClick={onCopyAndDismiss}
              className="rounded-lg bg-amber-200 dark:bg-amber-800 px-3 py-2 text-sm font-medium hover:opacity-90"
            >
              Copy & dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
