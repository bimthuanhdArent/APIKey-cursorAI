"use client";

import { useState, useEffect, useCallback } from "react";
import type { ApiKey } from "@/lib/supabase/api-keys";
import {
  fetchApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
} from "@/lib/supabase/api-keys";
import { generateApiKey } from "@/lib/api-keys-utils";

const TOAST_DURATION_MS = 2500;

export type ActionToast = { message: string; variant: "success" | "delete" };

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newKeyType, setNewKeyType] = useState<"dev" | "production">("dev");
  const [limitMonthlyUsage, setLimitMonthlyUsage] = useState(false);
  const [monthlyUsageLimit, setMonthlyUsageLimit] = useState(1000);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [showCopyToast, setShowCopyToast] = useState(false);
  const [actionToast, setActionToast] = useState<ActionToast | null>(null);

  const loadKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiKeys();
      setKeys(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load API keys");
      setKeys([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const openCreateModal = useCallback(() => {
    setShowCreate(true);
    setNewName("");
    setNewDescription("");
    setNewKeyType("dev");
    setLimitMonthlyUsage(false);
    setMonthlyUsageLimit(1000);
    setNewlyCreatedKey(null);
  }, []);

  const handleCreate = useCallback(async () => {
    const name = newName.trim() || "default";
    const description = newDescription.trim() || undefined;
    const type = newKeyType === "production" ? "production" : "dev";
    const key = generateApiKey();
    setError(null);
    try {
      await createApiKey({
        name,
        type,
        usage: 0,
        key,
        description: description || null,
        monthly_limit: limitMonthlyUsage ? monthlyUsageLimit : null,
      });
      setNewlyCreatedKey(key);
      setNewName("");
      setNewDescription("");
      setNewKeyType("dev");
      setLimitMonthlyUsage(false);
      setMonthlyUsageLimit(1000);
      setShowCreate(false);
      await loadKeys();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create API key");
    }
  }, [newName, newDescription, newKeyType, limitMonthlyUsage, monthlyUsageLimit, loadKeys]);

  const handleUpdate = useCallback(async (id: string) => {
    const name = editName.trim() || "Unnamed key";
    const description = editDescription.trim() || undefined;
    setError(null);
    try {
      await updateApiKey(id, { name, description });
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, name, description } : k))
      );
      setEditingId(null);
      setEditName("");
      setEditDescription("");
      setActionToast({ message: "API key updated", variant: "success" });
      setTimeout(() => setActionToast(null), TOAST_DURATION_MS);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update API key");
    }
  }, [editName, editDescription]);

  const handleDelete = useCallback(async (id: string) => {
    setError(null);
    try {
      await deleteApiKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      setDeleteConfirmId(null);
      setNewlyCreatedKey(null);
      if (editingId === id) setEditingId(null);
      setRevealedId((rid) => (rid === id ? null : rid));
      setActionToast({ message: "API key deleted", variant: "delete" });
      setTimeout(() => setActionToast(null), TOAST_DURATION_MS);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete API key");
    }
  }, [editingId]);

  const copyToClipboard = useCallback(async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedId(id);
      setShowCopyToast(true);
      setTimeout(() => setCopiedId(null), 2000);
      setTimeout(() => setShowCopyToast(false), TOAST_DURATION_MS);
    } catch {
      setError("Failed to copy to clipboard");
    }
  }, []);

  const showCopyNotification = useCallback(() => {
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), TOAST_DURATION_MS);
  }, []);

  const startEdit = useCallback((item: ApiKey) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDescription(item.description ?? "");
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  }, []);

  return {
    keys,
    loading,
    error,
    showCreate,
    setShowCreate,
    editingId,
    deleteConfirmId,
    setDeleteConfirmId,
    revealedId,
    setRevealedId,
    copiedId,
    newlyCreatedKey,
    setNewlyCreatedKey,
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
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    showCopyToast,
    actionToast,
    loadKeys,
    openCreateModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    copyToClipboard,
    showCopyNotification,
    startEdit,
    cancelEdit,
    setError,
  };
}
