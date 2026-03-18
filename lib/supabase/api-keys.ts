import { supabase } from "./client";

/** Matches your Supabase table: id, created_at, name, value, usage */
export interface ApiKeyRow {
  id: string;
  created_at: string;
  name: string | null;
  value: string | null;
  usage: number | null;
}

export interface ApiKey {
  id: string;
  name: string;
  type: string;
  usage: number;
  key: string;
  createdAt: string;
  description?: string;
  monthlyLimit?: number | null;
}

export function rowToApiKey(row: ApiKeyRow): ApiKey {
  return {
    id: row.id,
    name: row.name ?? "Unnamed",
    type: "dev",
    usage: row.usage ?? 0,
    key: row.value ?? "",
    createdAt: row.created_at,
    description: undefined,
    monthlyLimit: undefined,
  };
}

/** Error message when the api_keys table doesn't exist yet (run migration in Supabase) */
export const API_KEYS_TABLE_MISSING =
  "API keys table not found. In Supabase Dashboard go to SQL Editor and run the migration in supabase/migrations/001_create_api_keys.sql";

export async function fetchApiKeys(): Promise<ApiKey[]> {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    const msg = error.message ?? "";
    const code = (error as { code?: string }).code;
    if (
      code === "PGRST205" ||
      msg.includes("relation") ||
      msg.includes("does not exist") ||
      error.details?.includes("api_keys")
    ) {
      throw new Error(API_KEYS_TABLE_MISSING);
    }
    throw error;
  }
  return (data ?? []).map(rowToApiKey);
}

export interface InsertApiKey {
  name: string;
  type: string;
  usage: number;
  key: string;
  description?: string | null;
  monthly_limit?: number | null;
}

export async function createApiKey(row: InsertApiKey): Promise<ApiKey> {
  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      name: row.name,
      value: row.key,
      usage: row.usage,
    })
    .select()
    .single();

  if (error) {
    const detail = (error as { details?: string }).details ?? error.message;
    throw new Error(detail || "Failed to create API key");
  }
  return rowToApiKey(data as ApiKeyRow);
}

export async function updateApiKey(
  id: string,
  updates: { name?: string; description?: string | null }
): Promise<void> {
  const { data, error } = await supabase
    .from("api_keys")
    .update({ name: updates.name ?? null })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    const msg = (error as { details?: string }).details ?? error.message;
    throw new Error(msg || "Failed to update API key");
  }
  if (!data) {
    throw new Error("API key not found or you don’t have permission to update it");
  }
}

export async function deleteApiKey(id: string): Promise<void> {
  const { data, error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    const msg = (error as { details?: string }).details ?? error.message;
    throw new Error(msg || "Failed to delete API key");
  }
  if (!data) {
    throw new Error("API key not found or you don’t have permission to delete it");
  }
}
