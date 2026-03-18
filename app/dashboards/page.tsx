"use client";

import { signIn, useSession } from "next-auth/react";
import { useApiKeys } from "./hooks/useApiKeys";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { CurrentPlanCard } from "./components/CurrentPlanCard";
import { Toasts } from "./components/Toasts";
import { ApiKeysCard } from "./components/ApiKeysCard";
import { CreateKeyModal } from "./components/CreateKeyModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { GoogleIcon } from "./components/icons";

export default function DashboardsPage() {
  const { data: session, status } = useSession();
  // Only fetch keys when explicitly authenticated (avoids using cached/stale session on deploy)
  const isAuthenticated = status === "authenticated" && !!session;
  const api = useApiKeys({ enabled: isAuthenticated });

  const handleCopyAndDismissNewKey = async () => {
    if (!api.newlyCreatedKey) return;
    try {
      await navigator.clipboard.writeText(api.newlyCreatedKey);
      api.showCopyNotification();
      api.setNewlyCreatedKey(null);
    } catch {
      api.setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative">
      <Toasts showCopyToast={api.showCopyToast} actionToast={api.actionToast} />

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/50">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Pages / Overview
          </p>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Overview
          </h1>

          <div className="mb-6 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
            Manage your API keys below. Create keys for different environments and revoke them anytime.
          </div>

          {status !== "loading" && !isAuthenticated && (
            <div className="mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Sign in with your Google account to manage API keys and access the dashboard.
              </p>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-colors shrink-0"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          )}

          {api.error && (
            <div className="mb-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-200">
              {api.error}
            </div>
          )}

          <CurrentPlanCard />

          <ApiKeysCard
            keys={api.keys}
            loading={api.loading}
            showCreate={api.showCreate}
            onOpenCreate={api.openCreateModal}
            isLoggedIn={isAuthenticated}
            editingId={api.editingId}
            editName={api.editName}
            setEditName={api.setEditName}
            editDescription={api.editDescription}
            setEditDescription={api.setEditDescription}
            revealedId={api.revealedId}
            setRevealedId={api.setRevealedId}
            copiedId={api.copiedId}
            newlyCreatedKey={api.newlyCreatedKey}
            setNewlyCreatedKey={api.setNewlyCreatedKey}
            onCopy={api.copyToClipboard}
            onCopyAndDismiss={handleCopyAndDismissNewKey}
            onStartEdit={api.startEdit}
            onCancelEdit={api.cancelEdit}
            onSaveEdit={api.handleUpdate}
            onConfirmDelete={api.handleDelete}
            deleteConfirmId={api.deleteConfirmId}
            setDeleteConfirmId={api.setDeleteConfirmId}
          />
        </main>
      </div>

      <CreateKeyModal
        open={api.showCreate}
        onClose={() => api.setShowCreate(false)}
        newName={api.newName}
        setNewName={api.setNewName}
        newDescription={api.newDescription}
        setNewDescription={api.setNewDescription}
        newKeyType={api.newKeyType}
        setNewKeyType={api.setNewKeyType}
        limitMonthlyUsage={api.limitMonthlyUsage}
        setLimitMonthlyUsage={api.setLimitMonthlyUsage}
        monthlyUsageLimit={api.monthlyUsageLimit}
        setMonthlyUsageLimit={api.setMonthlyUsageLimit}
        onSubmit={api.handleCreate}
      />

      <DeleteConfirmModal
        open={Boolean(api.deleteConfirmId)}
        onClose={() => api.setDeleteConfirmId(null)}
        onConfirm={() => api.deleteConfirmId && api.handleDelete(api.deleteConfirmId)}
      />
    </div>
  );
}
