-- API keys table for the dashboard
-- Run this in Supabase Dashboard → SQL Editor

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'dev' check (type in ('dev', 'production')),
  usage integer not null default 0,
  key_secret text not null,
  description text,
  monthly_limit integer,
  created_at timestamptz not null default now(),
  user_id uuid
);

-- Allow the Supabase anon key to read/write this table
grant all on public.api_keys to anon;
grant all on public.api_keys to authenticated;

-- Optional: when you add Supabase Auth, enable RLS and add:
--   alter table public.api_keys enable row level security;
--   create policy "Users can manage own api keys"
--     on public.api_keys for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

comment on table public.api_keys is 'User API keys for the dandi dashboard';
