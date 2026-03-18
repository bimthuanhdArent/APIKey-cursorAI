-- Fix: "new row violates row-level security policy for table api_keys"
-- Run this in Supabase Dashboard → SQL Editor.
-- This allows the anon key (your app without login) to read and write api_keys.

drop policy if exists "Allow anon to manage api_keys" on public.api_keys;
create policy "Allow anon to manage api_keys"
  on public.api_keys
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow authenticated to manage api_keys" on public.api_keys;
create policy "Allow authenticated to manage api_keys"
  on public.api_keys
  for all
  to authenticated
  using (true)
  with check (true);
