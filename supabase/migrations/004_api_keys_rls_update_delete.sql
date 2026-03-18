-- Explicit RLS policies for UPDATE and DELETE (in case "for all" is not enough)
-- Run in Supabase Dashboard → SQL Editor if edit/delete still fail with permission errors.

drop policy if exists "Allow anon to update api_keys" on public.api_keys;
create policy "Allow anon to update api_keys"
  on public.api_keys for update to anon
  using (true)
  with check (true);

drop policy if exists "Allow anon to delete api_keys" on public.api_keys;
create policy "Allow anon to delete api_keys"
  on public.api_keys for delete to anon
  using (true);

drop policy if exists "Allow authenticated to update api_keys" on public.api_keys;
create policy "Allow authenticated to update api_keys"
  on public.api_keys for update to authenticated
  using (true)
  with check (true);

drop policy if exists "Allow authenticated to delete api_keys" on public.api_keys;
create policy "Allow authenticated to delete api_keys"
  on public.api_keys for delete to authenticated
  using (true);
