import { getSupabaseServerClient } from "./server";

export interface UserRecord {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Upsert a user into the Supabase users table (e.g. on first login).
 * Uses service role so it can run from NextAuth callbacks without RLS.
 * Resolves even if Supabase is not configured (no-op).
 */
export async function upsertUser(user: {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    const { error } = await supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email ?? null,
        name: user.name ?? null,
        image: user.image ?? null,
        updated_at: now,
      },
      {
        onConflict: "id",
        ignoreDuplicates: false,
      }
    );

    if (error) {
      console.error("[Supabase] Failed to upsert user:", error.message);
    }
  } catch (e) {
    // Service role key not set or Supabase unavailable — log and continue
    if (process.env.NODE_ENV === "development") {
      console.warn("[Supabase] User sync skipped:", (e as Error).message);
    }
  }
}
