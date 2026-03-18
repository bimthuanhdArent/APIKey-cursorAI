# Supabase setup for API keys and users

1. Create a project at [supabase.com](https://supabase.com) if you haven’t already.

2. **Create the tables (required):** In the Supabase Dashboard, open **SQL Editor** and run:
   - **New project:** Run the full contents of `migrations/001_create_api_keys.sql`.
   - **Users (first-login sync):** Run `migrations/005_create_users_table.sql` so Google sign-in can store user details.
   - **If you already ran an older 001** that had a column named `key`: then run `migrations/002_rename_key_to_key_secret.sql` so renames it to `key_secret` (fixes 400 when creating an API key).
   - **If you get “new row violates row-level security policy” (401)** when creating a key: run `migrations/003_api_keys_allow_anon.sql` to allow the anon key to manage `api_keys`.
   - **If edit or delete fails** (permission or nothing happens): run `migrations/004_api_keys_rls_update_delete.sql` to add explicit UPDATE/DELETE policies.

3. In your project root, set these in `.env.local` (from Dashboard → **Project Settings → API**):
   - `NEXT_PUBLIC_SUPABASE_URL` – **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – **anon public** (JWT) or **Publishable** key
   - `SUPABASE_SERVICE_ROLE_KEY` – **service_role** key (same page, under "Project API keys"). Required for syncing user details to the `users` table on first login. Do not expose this in the client.

4. Restart the Next.js dev server after changing env vars.
