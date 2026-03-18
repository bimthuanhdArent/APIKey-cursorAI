-- Users table for NextAuth (Google SSO) — synced on first login
-- Run this in Supabase Dashboard → SQL Editor

create table if not exists public.users (
  id text primary key,
  email text,
  name text,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Allow service_role full access (used by server to upsert on first login)
alter table public.users enable row level security;

create policy "Service role can manage users"
  on public.users for all
  to service_role
  using (true)
  with check (true);

-- Optional: allow anon to read so client can show user list if needed
-- grant select on public.users to anon;

comment on table public.users is 'Users synced from NextAuth (Google SSO) on first login';
