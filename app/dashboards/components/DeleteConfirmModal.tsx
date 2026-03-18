"use client";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ open, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Revoke API key?
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          This key will stop working immediately. Any apps using it will no longer be able to authenticate. This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700"
          >
            Revoke key
          </button>
        </div>
      </div>
    </div>
  );
}
