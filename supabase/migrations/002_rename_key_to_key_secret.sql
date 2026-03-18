-- Fix 400 on insert: "key" can cause issues with PostgREST. Rename to key_secret.
-- Run this ONLY if you already created the table with 001 that had column "key".
-- (If you created the table with 001 that already has key_secret, skip this.)

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'api_keys' and column_name = 'key'
  ) then
    alter table public.api_keys rename column key to key_secret;
  end if;
end $$;
