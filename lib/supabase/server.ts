import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client with service role.
 * Use for operations that must bypass RLS (e.g. upserting users on first login).
 * Do not expose this client to the browser.
 */
export function getSupabaseServerClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase server env: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (service key is in Dashboard → Project Settings → API)"
    );
  }
  return createClient(supabaseUrl, serviceRoleKey);
}
